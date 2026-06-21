import { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Svg, { Circle, Ellipse, Line, Path } from 'react-native-svg';
import { router, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, blockColors } from '../../constants/colors';
import { typography, spacing, radius } from '../../constants/typography';
import { authors, blocks, subBlocks, revolutionCards, isSubBlockFree } from '../../constants/data';
import { PaywallSheet } from '../../components/PaywallSheet';
import { useTheme } from '../../hooks/useTheme';

type Theme = typeof colors.dark;

// ─── Types ────────────────────────────────────────────────────────────────────

type AuthorState    = 'active' | 'locked' | 'done';
type BlockStatus    = 'active' | 'locked';
type SubBlockStatus = 'active' | 'locked';
type LayerProgress  = { surface?: boolean; concept?: boolean; fondo?: boolean };
type ProgressMap    = Record<string, LayerProgress>;

const PROGRESS_KEY     = 'psylens_progress';
const UNLOCK_KEY       = 'psylens_unlocked';
const PREMIUM_KEY      = 'psylens_is_premium';
const INTRO_AUTHOR_IDS = ['intro-1', 'intro-2', 'intro-3', 'intro-4'];

// ─── Portrait images ──────────────────────────────────────────────────────────

const PORTRAIT_HERACLITO = require('../../assets/portraits/heraclito.png');
const PORTRAIT_DEMOCRITO = require('../../assets/portraits/democrito.png');

const PORTRAITS: Record<string, number | null> = {
  // b0
  'heraclito-democrito': null,
  'platon':         require('../../assets/portraits/platon.png'),
  'aristoteles':    require('../../assets/portraits/aristoteles.png'),
  'helenisticas':   null,
  'avicena':        require('../../assets/portraits/avicena.png'),
  'hipocrates':     require('../../assets/portraits/hipocrates.png'),
  'descartes':      require('../../assets/portraits/descartes.png'),
  'spinoza':        require('../../assets/portraits/spinoza.png'),
  'kant':           require('../../assets/portraits/kant.png'),
  'schopenhauer':   require('../../assets/portraits/schopenhauer.png'),
  'darwin':         null,
  // b1
  'ebbinghaus':     null,
  'fechner':        require('../../assets/portraits/fechner.png'),
  'wundt':          require('../../assets/portraits/wundt.png'),
  'james':          require('../../assets/portraits/james.png'),
  'thorndike':      null,
};

// ─── Sub-block revolution card lookup ─────────────────────────────────────────

const revolutionCardBySubBlock: Record<string, typeof revolutionCards[0]> =
  Object.fromEntries(revolutionCards.map((r) => [r.subBlockId, r]));

// ─── Helpers ──────────────────────────────────────────────────────────────────

const authorById: Record<string, typeof authors[0]> =
  Object.fromEntries(authors.map((a) => [a.id, a]));

function isAuthorDone(p: LayerProgress | undefined): boolean {
  return !!(p?.surface && p?.concept && p?.fondo);
}

function isRevCardDone(subBlockId: string, progress: ProgressMap): boolean {
  const rev = revolutionCardBySubBlock[subBlockId];
  if (!rev) return true;
  return !!progress[rev.id]?.concept;
}

// Blocks beyond b1 aren't built yet — always shown as "coming soon",
// regardless of premium status (this isn't a paywall, it's missing content).
function isComingSoonBlock(blockId: string): boolean {
  return !['intro', 'b0', 'b1'].includes(blockId);
}

function getBlockStatus(block: typeof blocks[0], isPremium: boolean, progress: ProgressMap): BlockStatus {
  if (block.id === 'intro') return 'active';
  if (block.id === 'b0') {
    const introDone = INTRO_AUTHOR_IDS.every(id => isAuthorDone(progress[id]));
    return introDone ? 'active' : 'locked';
  }
  if (isComingSoonBlock(block.id)) return 'locked';
  if (block.isFree) return 'active';
  return isPremium ? 'active' : 'locked';
}

function getSubBlockStatus(
  subBlockId: string,
  block: typeof blocks[0],
  blockStatus: BlockStatus,
  progress: ProgressMap,
  isPremium: boolean,
): SubBlockStatus {
  if (blockStatus === 'locked') return 'locked';
  if (!isSubBlockFree(subBlockId, block.id) && !isPremium) return 'locked';

  const blockSubBlocks = subBlocks.filter(sb => sb.blockId === block.id);
  const idx = blockSubBlocks.findIndex(sb => sb.id === subBlockId);

  // First sub-block of a non-initial block must wait for the previous
  // block's last sub-block to be fully completed (cross-block sequencing).
  if (idx === 0 && block.id !== 'b0') {
    const blockIdx  = blocks.findIndex(b => b.id === block.id);
    const prevBlock = blockIdx > 0 ? blocks[blockIdx - 1] : null;
    if (prevBlock) {
      const prevBlockSubBlocks = subBlocks.filter(sb => sb.blockId === prevBlock.id);
      const lastSubBlock = prevBlockSubBlocks[prevBlockSubBlocks.length - 1];
      const prevRequiredIds = lastSubBlock
        ? lastSubBlock.authorIds.filter(id => prevBlock.authors.includes(id))
        : prevBlock.authors;
      if (!prevRequiredIds.every(id => isAuthorDone(progress[id]))) return 'locked';
    }
  }

  if (idx <= 0) return 'active';
  const prevSubBlock = blockSubBlocks[idx - 1];
  const blockAuthorSet = new Set(block.authors);
  const prevAuthorIds = prevSubBlock.authorIds.filter(id => blockAuthorSet.has(id));
  return prevAuthorIds.every(id => isAuthorDone(progress[id])) ? 'active' : 'locked';
}

function computeAuthorState(
  authorId: string,
  indexInGroup: number,
  groupAuthorIds: string[],
  groupStatus: 'active' | 'locked',
  sequential: boolean,
  progress: ProgressMap,
  subBlockId?: string,
): AuthorState {
  if (isAuthorDone(progress[authorId])) return 'done';
  if (groupStatus === 'locked') return 'locked';
  if (!sequential) return 'active';
  if (indexInGroup === 0) {
    if (subBlockId && !isRevCardDone(subBlockId, progress)) return 'locked';
    return 'active';
  }
  const prevId = groupAuthorIds[indexInGroup - 1];
  return isAuthorDone(progress[prevId]) ? 'active' : 'locked';
}

// ─── AuthorCard ───────────────────────────────────────────────────────────────

function AuthorCard({
  author,
  state,
  blockBaseColor,
  premiumLocked,
  onPaywall,
}: {
  author: typeof authors[0];
  state: AuthorState;
  blockBaseColor?: string;
  premiumLocked?: boolean;
  onPaywall?: () => void;
}) {
  const { theme } = useTheme();
  const ac = useMemo(() => makeAcStyles(theme), [theme]);
  const cardBorderColor     = blockBaseColor ? blockBaseColor + '33' : undefined;
  const portraitBorderColor = blockBaseColor ? blockBaseColor + '80' : undefined;

  const portrait     = PORTRAITS[author.id] ?? null;
  const isDual       = author.id === 'heraclito-democrito';
  const isIntro      = author.id.startsWith('intro-');
  const isComingSoon = author.subtitle === 'Contenido próximamente';

  const inner = (
    <View
      style={[
        ac.card,
        cardBorderColor ? { borderColor: cardBorderColor } : null,
        state === 'active'  && ac.cardActive,
        state === 'done'    && ac.cardDone,
        state === 'locked'  && ac.cardLocked,
      ]}
    >
      {/* Left column: portrait */}
      <View style={[ac.leftCol, isDual && ac.leftColDual]}>
        {isDual ? (
          <View style={ac.dualWrap}>
            <View style={ac.dualCircle}>
              {PORTRAIT_HERACLITO ? (
                <Image source={PORTRAIT_HERACLITO} style={ac.dualImage} resizeMode="cover" />
              ) : (
                <Text style={ac.initial}>H</Text>
              )}
            </View>
            <View style={[ac.dualCircle, ac.dualCircleRight]}>
              {PORTRAIT_DEMOCRITO ? (
                <Image source={PORTRAIT_DEMOCRITO} style={ac.dualImage} resizeMode="cover" />
              ) : (
                <Text style={ac.initial}>D</Text>
              )}
            </View>
          </View>
        ) : isIntro ? (
          <View style={[ac.portrait, { borderWidth: 2, borderColor: portraitBorderColor ?? '#0f6e56' }]}>
            {author.id === 'intro-1' && (
              <Svg width={38} height={38} viewBox="0 0 120 120">
                <Ellipse cx="60" cy="60" rx="50" ry="28" stroke="#0f6e56" strokeWidth="2" fill="none" />
                <Circle cx="60" cy="60" r="14" stroke="#0f6e56" strokeWidth="2" fill="none" />
              </Svg>
            )}
            {author.id === 'intro-2' && (
              <Svg width={38} height={38} viewBox="0 0 22 14">
                <Circle cx="5" cy="7" r="4" stroke="#0f6e56" strokeWidth="1.8" fill="none" />
                <Circle cx="17" cy="7" r="4" stroke="#0f6e56" strokeWidth="1.8" fill="none" />
                <Line x1="9" y1="7" x2="13" y2="7" stroke="#0f6e56" strokeWidth="1.8" />
              </Svg>
            )}
            {author.id === 'intro-3' && (
              <Svg width={38} height={38} viewBox="0 0 120 120">
                <Line x1="15" y1="60" x2="105" y2="60" stroke="#0f6e56" strokeWidth="2" />
                <Circle cx="22" cy="60" r="4" fill="#0f6e56" />
                <Circle cx="48" cy="60" r="6" fill="#0f6e56" />
                <Circle cx="74" cy="60" r="8" fill="#0f6e56" />
                <Circle cx="100" cy="60" r="10" fill="#0f6e56" />
              </Svg>
            )}
            {author.id === 'intro-4' && (
              <Svg width={38} height={38} viewBox="0 0 120 120">
                <Circle cx="60" cy="60" r="18" stroke="#0f6e56" strokeWidth="2" fill="none" />
                <Circle cx="60" cy="60" r="34" stroke="#0f6e56" strokeWidth="2" fill="none" />
                <Circle cx="60" cy="60" r="50" stroke="#0f6e56" strokeWidth="2" fill="none" />
              </Svg>
            )}
            {state === 'locked' && <View style={ac.portraitOverlay} />}
          </View>
        ) : (
          <View style={ac.portrait}>
            {portrait ? (
              <Image
                source={portrait}
                style={ac.portraitImage}
                resizeMode="cover"
              />
            ) : (
              <Text style={ac.initial}>{author.name[0]}</Text>
            )}
            {state === 'locked' && <View style={ac.portraitOverlay} />}
          </View>
        )}
      </View>

      {/* Info */}
      <View style={ac.info}>
        <Text style={[ac.name, state === 'locked' && ac.dimText]} numberOfLines={1}>
          {author.name}
        </Text>
        <Text style={[ac.subtitle, state === 'locked' && ac.dimText]} numberOfLines={1}>
          {author.subtitle}
        </Text>
        <Text style={ac.dates}>{author.dates}</Text>
      </View>

      {/* Trailing badge */}
      <View style={ac.trailing}>
        {isComingSoon ? (
          <View style={ac.badgeSoon}>
            <Text style={ac.badgeSoonText}>Próximo</Text>
          </View>
        ) : state === 'active' ? (
          <View style={[ac.badgePurple, blockBaseColor ? { backgroundColor: blockBaseColor + '33' } : null]}>
            <Text style={[ac.badgePurpleText, blockBaseColor ? { color: blockBaseColor } : null]}>Activo</Text>
          </View>
        ) : state === 'done' ? (
          <View style={ac.badgeGreen}>
            <Text style={ac.badgeGreenText}>✓</Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  if (state === 'locked') {
    if (premiumLocked && onPaywall) {
      return (
        <TouchableOpacity onPress={onPaywall} activeOpacity={0.8}>
          {inner}
        </TouchableOpacity>
      );
    }
    return inner;
  }

  return (
    <TouchableOpacity
      onPress={() => router.push(`/autor/${author.id}`)}
      activeOpacity={0.8}
    >
      {inner}
    </TouchableOpacity>
  );
}

// ─── RevolutionCard ───────────────────────────────────────────────────────────

function RevolutionCard({
  rev,
  state,
  subBlockName,
  blockBaseColor,
  premiumLocked,
  onPaywall,
}: {
  rev: typeof revolutionCards[0];
  state: AuthorState;
  subBlockName: string;
  blockBaseColor: string;
  premiumLocked?: boolean;
  onPaywall?: () => void;
}) {
  const { theme } = useTheme();
  const ac = useMemo(() => makeAcStyles(theme), [theme]);

  const inner = (
    <View
      style={[
        ac.card,
        state === 'active' && ac.cardActive,
        state === 'done'   && ac.cardDone,
        state === 'locked' && ac.cardLocked,
      ]}
    >
      <View style={ac.leftCol}>
        <View style={[ac.portrait, { borderWidth: 1.5, borderColor: state === 'locked' ? theme.text3 : blockBaseColor + '80' }]}>
          <Svg width={22} height={22} viewBox="0 0 44 44">
            <Path
              d="M22 4 L40 22 L22 40 L4 22 Z"
              stroke={state === 'locked' ? theme.text3 : blockBaseColor}
              strokeWidth="1.5"
              fill="none"
            />
          </Svg>
        </View>
      </View>

      <View style={ac.info}>
        <Text style={[ac.name, state === 'locked' && ac.dimText]} numberOfLines={1}>
          {subBlockName}
        </Text>
        <Text style={[ac.subtitle, state === 'locked' && ac.dimText]}>
          Introducción
        </Text>
      </View>

      <View style={ac.trailing}>
        {state === 'active' ? (
          <View style={[ac.badgePurple, { backgroundColor: blockBaseColor + '33' }]}>
            <Text style={[ac.badgePurpleText, { color: blockBaseColor }]}>Activo</Text>
          </View>
        ) : state === 'done' ? (
          <View style={ac.badgeGreen}>
            <Text style={ac.badgeGreenText}>✓</Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  if (state === 'locked') {
    if (premiumLocked && onPaywall) {
      return (
        <TouchableOpacity onPress={onPaywall} activeOpacity={0.8}>
          {inner}
        </TouchableOpacity>
      );
    }
    return inner;
  }

  return (
    <TouchableOpacity onPress={() => router.push(`/autor/${rev.id}`)} activeOpacity={0.8}>
      {inner}
    </TouchableOpacity>
  );
}

// ─── SubBlockHeader ───────────────────────────────────────────────────────────

function SubBlockHeader({
  subBlock,
  status,
  blockColor,
  showFreeTag,
  isFree,
  premiumLocked,
  onPaywall,
}: {
  subBlock: typeof subBlocks[0];
  status: SubBlockStatus;
  blockColor: { base: string; light: string; text: string };
  showFreeTag?: boolean;
  isFree?: boolean;
  premiumLocked?: boolean;
  onPaywall?: () => void;
}) {
  const { theme } = useTheme();
  const sbh = useMemo(() => makeSbhStyles(theme), [theme]);
  const isLocked = status === 'locked';

  const content = (
    <View style={[
      sbh.container,
      { borderLeftColor: isLocked ? theme.text3 : blockColor.base },
      isLocked && sbh.containerLocked,
    ]}>
      <View style={sbh.headerRow}>
        <View style={sbh.iconWrap}>
          <Svg width={16} height={16} viewBox="0 0 16 16">
            <Path
              d="M8 1 L15 8 L8 15 L1 8 Z"
              stroke={isLocked ? theme.text3 : '#0f6e56'}
              strokeWidth="1.5"
              fill="none"
            />
          </Svg>
        </View>
        <Text
          style={[sbh.name, !isLocked && { color: blockColor.text }, isLocked && sbh.nameLocked]}
          numberOfLines={2}
        >
          {subBlock.name}
        </Text>
        {showFreeTag && (
          isFree ? (
            <View style={sbh.freeTag}>
              <Text style={sbh.freeTagText}>Gratis</Text>
            </View>
          ) : (
            <View style={sbh.premiumTag}>
              <Text style={sbh.premiumTagText}>Premium</Text>
            </View>
          )
        )}
      </View>
    </View>
  );

  if (premiumLocked && onPaywall) {
    return (
      <TouchableOpacity onPress={onPaywall} activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    );
  }
  return content;
}

// ─── BlockNode ────────────────────────────────────────────────────────────────

const SYMBOL: Record<string, string> = {
  eye:     '◎',
  atom:    '⊛',
  spiral:  '◉',
  circles: '○',
  diamond: '◆',
  network: '⊕',
};

function BlockNode({
  block,
  blockIndex,
  isExpanded,
  onToggle,
  onPaywall,
  progress,
  unlocked,
  isPremium,
}: {
  block: typeof blocks[0];
  blockIndex: number;
  isExpanded: boolean;
  onToggle: () => void;
  onPaywall: () => void;
  progress: ProgressMap;
  unlocked: string[];
  isPremium: boolean;
}) {
  const { theme, isDark } = useTheme();
  const bn = useMemo(() => makeBnStyles(theme), [theme]);
  const bc = blockColors[block.id] ?? blockColors['intro'];
  const comingSoon = isComingSoonBlock(block.id);
  const headerBg = comingSoon ? theme.bg3 : (isDark ? bc.base + '26' : bc.light);
  const listBg   = isDark ? bc.base + '26' : bc.light;

  const status   = getBlockStatus(block, isPremium, progress);
  const isActive = status === 'active';
  const isLocked = status === 'locked';

  const blockAuthors = block.authors
    .map((id) => authorById[id])
    .filter(Boolean) as (typeof authors[0])[];

  const completed = blockAuthors.filter(a => isAuthorDone(progress[a.id])).length;
  const total     = block.authors.length;
  const pct       = Math.round((completed / total) * 100);

  const blockSubBlocks = subBlocks.filter(sb => sb.blockId === block.id);
  const blockAuthorSet = new Set(block.authors);

  return (
    <View style={[bn.wrapper, isLocked && bn.wrapperLocked]}>

      {/* ── Block header ──────────────────────────────────── */}
      <TouchableOpacity
        style={[bn.header, { backgroundColor: headerBg }]}
        onPress={isLocked
          ? (block.id === 'b0'
              ? () => Alert.alert('Introducción requerida', 'Completa la Introducción para continuar.')
              : comingSoon
                ? () => Alert.alert('Próximamente', 'Este bloque estará disponible próximamente.')
                : onPaywall)
          : (isActive ? onToggle : undefined)}
        activeOpacity={0.7}
      >
        {comingSoon ? (
          <View style={bn.comingSoonRow}>
            <Text style={bn.comingSoonIcon}>🔒</Text>
            <Text style={bn.comingSoonText}>Próximamente</Text>
          </View>
        ) : (
          <>
            {/* Symbol icon */}
            <View style={[bn.icon, isLocked && bn.iconLocked]}>
              {block.symbol === 'lens' ? (
                <Svg width={28} height={28} viewBox="0 0 28 28">
                  <Path d="M14 4 Q4 14 14 24" stroke="#0f6e56" strokeWidth="1.5" fill="none" />
                  <Path d="M14 4 Q24 14 14 24" stroke="#0f6e56" strokeWidth="1.5" fill="none" />
                </Svg>
              ) : (
                <Text style={[bn.iconGlyph, isLocked && bn.iconGlyphLocked]}>
                  {SYMBOL[block.symbol] ?? block.symbol[0].toUpperCase()}
                </Text>
              )}
            </View>

            {/* Name + era + progress */}
            <View style={bn.meta}>
              <View style={bn.titleRow}>
                <Text style={[bn.name, !isLocked && { color: bc.text }, isLocked && bn.nameLocked]} numberOfLines={1}>
                  {block.name}
                </Text>
                {block.id !== 'b0' && (
                  block.isFree ? (
                    <View style={bn.freeTag}>
                      <Text style={bn.freeTagText}>Gratis</Text>
                    </View>
                  ) : (
                    <View style={bn.premiumTag}>
                      <Text style={bn.premiumTagText}>Premium</Text>
                    </View>
                  )
                )}
              </View>

              <Text style={[bn.era, !isLocked && { color: bc.text }, isLocked && bn.eraLocked]}>
                {block.era}
              </Text>

              {/* Progress bar */}
              <View style={bn.progressRow}>
                <View style={bn.progressTrack}>
                  <View style={[bn.progressFill, { width: `${pct}%` }]} />
                </View>
                <Text style={bn.progressText}>{completed}/{total}</Text>
              </View>
            </View>

            {/* Expand / lock indicator */}
            <Text style={[bn.chevron, isLocked && bn.chevronLocked]}>
              {isLocked ? '⊘' : isExpanded ? '▾' : '▸'}
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* ── Authors list (expanded) ───────────────────────── */}
      {isActive && isExpanded && (
        <View style={[bn.authorsList, { backgroundColor: listBg }]}>
          {blockSubBlocks.length > 0 ? (
            blockSubBlocks.map(sb => {
              const sbFree          = isSubBlockFree(sb.id, block.id);
              const sbPremiumLocked = !sbFree && !isPremium;
              const sbStatus    = getSubBlockStatus(sb.id, block, status, progress, isPremium);
              const sbAuthorIds = sb.authorIds.filter(id => blockAuthorSet.has(id));
              const sbAuthors   = sbAuthorIds
                .map(id => authorById[id])
                .filter(Boolean) as (typeof authors[0])[];
              const rev = revolutionCardBySubBlock[sb.id];
              const revState: AuthorState = sbStatus === 'locked'
                ? 'locked'
                : isRevCardDone(sb.id, progress) ? 'done' : 'active';
              return (
                <View key={sb.id}>
                  <SubBlockHeader
                    subBlock={sb}
                    status={sbStatus}
                    blockColor={bc}
                    showFreeTag={block.id === 'b0'}
                    isFree={sbFree}
                    premiumLocked={sbPremiumLocked}
                    onPaywall={onPaywall}
                  />
                  {rev && (
                    <RevolutionCard
                      rev={rev}
                      state={revState}
                      subBlockName={sb.name}
                      blockBaseColor={bc.base}
                      premiumLocked={sbPremiumLocked}
                      onPaywall={onPaywall}
                    />
                  )}
                  {sbAuthors.map((author, i) => (
                    <AuthorCard
                      key={author.id}
                      author={author}
                      state={computeAuthorState(author.id, i, sbAuthorIds, sbStatus, true, progress, sb.id)}
                      blockBaseColor={bc.base}
                      premiumLocked={sbPremiumLocked}
                      onPaywall={onPaywall}
                    />
                  ))}
                </View>
              );
            })
          ) : (
            blockAuthors.map((author, i) => (
              <AuthorCard
                key={author.id}
                author={author}
                state={computeAuthorState(
                  author.id, i, block.authors, status,
                  block.id === 'intro',
                  progress,
                )}
                blockBaseColor={bc.base}
              />
            ))
          )}
        </View>
      )}

    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function CaminoScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const [expandedId,  setExpandedId]  = useState<string | null>('intro');
  const [progress,    setProgress]    = useState<ProgressMap>({});
  const [unlocked,    setUnlocked]    = useState<string[]>([]);
  const [isPremium,   setIsPremium]   = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  useFocusEffect(
    useCallback(() => {
      Promise.all([
        AsyncStorage.getItem(PROGRESS_KEY).catch(() => null),
        AsyncStorage.getItem(UNLOCK_KEY).catch(() => null),
        AsyncStorage.getItem(PREMIUM_KEY).catch(() => null),
      ]).then(([rawProg, rawUnlock, rawPremium]) => {
        if (rawProg)   setProgress(JSON.parse(rawProg));
        if (rawUnlock) setUnlocked(JSON.parse(rawUnlock));
        setIsPremium(rawPremium === 'true');
      });
    }, []),
  );

  function toggleBlock(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  const totalAuthors = blocks.reduce((sum, b) => sum + b.authors.length, 0);
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.root}>
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing.lg },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.header}>
          <Text style={styles.title}>Camino</Text>
          <Text style={styles.subtitle}>
            {blocks.length} etapas · {totalAuthors} autores
          </Text>
        </View>
        <TouchableOpacity
          style={styles.glossaryButton}
          onPress={() => router.push('/glosario')}
          activeOpacity={0.7}
          hitSlop={8}
        >
          <Text style={styles.glossaryButtonText}>Aa</Text>
        </TouchableOpacity>
      </View>

      {/* Block list */}
      {blocks.map((block, index) => (
        <BlockNode
          key={block.id}
          block={block}
          blockIndex={index}
          isExpanded={expandedId === block.id}
          onToggle={() => toggleBlock(block.id)}
          onPaywall={() => setShowPaywall(true)}
          progress={progress}
          unlocked={unlocked}
          isPremium={isPremium}
        />
      ))}

    </ScrollView>

    <PaywallSheet
      visible={showPaywall}
      onClose={() => setShowPaywall(false)}
      onUnlock={() => setIsPremium(true)}
    />
    </View>
  );
}

// ─── AuthorCard styles ────────────────────────────────────────────────────────

function makeAcStyles(theme: Theme) {
  return StyleSheet.create({
    card: {
      height: 110,
      borderRadius: radius.xl,
      backgroundColor: theme.bg,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'transparent',
      marginBottom: spacing.sm,
    },
    cardActive: {
      borderWidth: 1.5,
      borderColor: theme.purple,
      shadowColor: theme.purple,
      shadowOpacity: 0.15,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    cardDone: {
      borderWidth: 1,
    },
    cardLocked: {
      opacity: 0.45,
    },

    leftCol: {
      width: 100,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 12,
    },
    leftColDual: {
      width: 120,
    },
    dualWrap: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dualCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.bg3,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    dualCircleRight: {
      marginLeft: -16,
      borderWidth: 2,
      borderColor: theme.bg,
    },
    dualImage: {
      width: 64,
      height: 64,
    },
    portrait: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.bg3,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    portraitImage: {
      width: 64,
      height: 64,
    },
    portraitOverlay: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: theme.bg2,
      opacity: 0.6,
    },
    initial: {
      ...typography.h3,
      color: theme.text2,
    },

    info: {
      flex: 1,
      justifyContent: 'center',
      gap: spacing.xs,
    },
    name: {
      ...typography.bodyS,
      color: theme.text,
      fontWeight: '600',
    },
    subtitle: {
      ...typography.bodyXS,
      color: theme.text2,
    },
    dates: {
      ...typography.bodyXS,
      color: theme.text3,
    },
    dimText: {
      color: theme.text3,
    },

    trailing: {
      paddingRight: spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 56,
    },
    badgePurple: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: radius.full,
      backgroundColor: theme.purpleBg,
    },
    badgePurpleText: {
      ...typography.label,
      color: theme.purple,
    },
    badgeGreen: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.greenBg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeGreenText: {
      ...typography.bodyS,
      color: theme.green,
      fontWeight: '700',
    },
    badgeSoon: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: radius.full,
      backgroundColor: theme.bg3,
    },
    badgeSoonText: {
      ...typography.label,
      color: theme.text3,
    },
  });
}

// ─── BlockNode styles ─────────────────────────────────────────────────────────

function makeBnStyles(theme: Theme) {
  return StyleSheet.create({
    wrapper: {
      marginBottom: spacing.lg,
      borderRadius: radius.xl,
      backgroundColor: theme.bg2,
      overflow: 'hidden',
    },
    wrapperLocked: {
      opacity: 0.55,
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.lg,
      gap: spacing.md,
    },

    icon: {
      width: 48,
      height: 48,
      borderRadius: radius.md,
      backgroundColor: theme.bg3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconLocked: {
      backgroundColor: theme.bg,
    },
    iconGlyph: {
      fontSize: typography.h3.fontSize,
      color: theme.text2,
    },
    iconGlyphLocked: {
      color: theme.text3,
    },

    meta: {
      flex: 1,
      gap: spacing.xs,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    name: {
      ...typography.bodyS,
      color: theme.text,
      fontWeight: '600',
      flexShrink: 1,
    },
    nameLocked: {
      color: theme.text3,
    },
    era: {
      ...typography.bodyXS,
      color: theme.text3,
    },
    eraLocked: {
      color: theme.text3,
    },

    freeTag: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: radius.full,
      backgroundColor: theme.greenBg,
    },
    freeTagText: {
      ...typography.label,
      color: theme.green,
    },
    premiumTag: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: radius.full,
      backgroundColor: theme.purpleBg,
    },
    premiumTagText: {
      ...typography.label,
      color: theme.purple,
    },

    progressRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginTop: spacing.xs,
    },
    progressTrack: {
      flex: 1,
      height: 3,
      borderRadius: 2,
      backgroundColor: theme.bg3,
      overflow: 'hidden',
    },
    progressFill: {
      height: 3,
      borderRadius: 2,
      backgroundColor: theme.green,
    },
    progressText: {
      ...typography.label,
      color: theme.text3,
      minWidth: 28,
      textAlign: 'right',
    },

    chevron: {
      ...typography.body,
      color: theme.text2,
      paddingLeft: spacing.xs,
    },
    chevronLocked: {
      color: theme.text3,
      fontSize: typography.bodyS.fontSize,
    },

    comingSoonRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
    },
    comingSoonIcon: {
      fontSize: typography.h3.fontSize,
      color: theme.text3,
    },
    comingSoonText: {
      ...typography.bodyS,
      color: theme.text3,
      fontWeight: '600',
    },

    authorsList: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
  });
}

// ─── SubBlockHeader styles ────────────────────────────────────────────────────

function makeSbhStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      borderLeftWidth: 2,
      borderLeftColor: '#0f6e56',
      paddingLeft: spacing.md,
      paddingTop: spacing.md,
      paddingBottom: spacing.sm,
      marginBottom: spacing.xs,
      marginTop: spacing.md,
    },
    containerLocked: {
      opacity: 0.4,
      borderLeftColor: theme.text3,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginBottom: spacing.sm,
    },
    iconWrap: {
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: {
      ...typography.bodyS,
      color: theme.text,
      fontWeight: '600',
      flex: 1,
    },
    nameLocked: {
      color: theme.text3,
    },
    freeTag: {
      paddingHorizontal: spacing.sm,
      paddingVertical: 2,
      borderRadius: radius.full,
      backgroundColor: theme.greenBg,
    },
    freeTagText: {
      ...typography.label,
      color: theme.green,
    },
    premiumTag: {
      paddingHorizontal: spacing.sm,
      paddingVertical: 2,
      borderRadius: radius.full,
      backgroundColor: theme.purpleBg,
    },
    premiumTagText: {
      ...typography.label,
      color: theme.purple,
    },
  });
}

// ─── Screen styles ────────────────────────────────────────────────────────────

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    scroll: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    content: {
      paddingHorizontal: spacing.xl,
      paddingBottom: spacing.xxxl,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: spacing.xxl,
    },
    header: {
      flex: 1,
    },
    title: {
      ...typography.h2,
      color: theme.text,
    },
    subtitle: {
      ...typography.bodyS,
      color: theme.text3,
      marginTop: spacing.xs,
    },
    glossaryButton: {
      width: 40,
      height: 40,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.bg2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    glossaryButtonText: {
      ...typography.body,
      fontWeight: '700',
      color: theme.text,
    },
  });
}
