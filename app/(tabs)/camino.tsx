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
import { colors } from '../../constants/colors';
import { typography, spacing, radius } from '../../constants/typography';
import { authors, blocks } from '../../constants/data';
import { PaywallSheet } from '../../components/PaywallSheet';
import { useTheme } from '../../hooks/useTheme';

type Theme = typeof colors.dark;

// ─── Types ────────────────────────────────────────────────────────────────────

type AuthorState = 'active' | 'locked' | 'done';
type BlockStatus  = 'active' | 'locked';
type LayerProgress = { surface?: boolean; concept?: boolean; fondo?: boolean };
type ProgressMap   = Record<string, LayerProgress>;

const PROGRESS_KEY     = 'psylens_progress';
const UNLOCK_KEY       = 'psylens_unlocked';
const PREMIUM_KEY      = 'psylens_is_premium';
const INTRO_AUTHOR_IDS = ['intro-1', 'intro-2', 'intro-3', 'intro-4'];

// ─── Portrait images ──────────────────────────────────────────────────────────

const PORTRAIT_HERACLITO = require('../../assets/portraits/heraclito.png');
const PORTRAIT_DEMOCRITO = require('../../assets/portraits/democrito.png');

const PORTRAITS: Record<string, number | null> = {
  'heraclito-democrito': null,
  'platon':       require('../../assets/portraits/platon.png'),
  'aristoteles':  require('../../assets/portraits/aristoteles.png'),
  'hipocrates':   require('../../assets/portraits/hipocrates.png'),
  'descartes':    require('../../assets/portraits/descartes.png'),
  'kant':         require('../../assets/portraits/kant.png'),
  'schopenhauer': require('../../assets/portraits/schopenhauer.png'),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const authorById: Record<string, typeof authors[0]> =
  Object.fromEntries(authors.map((a) => [a.id, a]));

function isAuthorDone(p: LayerProgress | undefined): boolean {
  return !!(p?.surface && p?.concept && p?.fondo);
}

function getBlockStatus(block: typeof blocks[0], isPremium: boolean, progress: ProgressMap): BlockStatus {
  if (block.id === 'intro') return 'active';
  if (block.id === 'b0') {
    const introDone = INTRO_AUTHOR_IDS.every(id => isAuthorDone(progress[id]));
    return introDone ? 'active' : 'locked';
  }
  if (block.isFree) return 'active';
  return isPremium ? 'active' : 'locked';
}

function getAuthorState(
  authorId: string,
  authorIndex: number,
  blockId: string,
  blockAuthorIds: string[],
  progress: ProgressMap,
  unlocked: string[],
  isPremium: boolean,
): AuthorState {
  if (isAuthorDone(progress[authorId])) return 'done';
  if (blockId === 'intro') {
    if (authorIndex === 0) return 'active';
    const prevId = blockAuthorIds[authorIndex - 1];
    return isAuthorDone(progress[prevId]) ? 'active' : 'locked';
  }
  if (blockId === 'b0') {
    const introDone = INTRO_AUTHOR_IDS.every(id => isAuthorDone(progress[id]));
    if (!introDone) return 'locked';
    if (authorIndex === 0) return 'active';
    const prevId = blockAuthorIds[authorIndex - 1];
    return isAuthorDone(progress[prevId]) ? 'active' : 'locked';
  }
  if (isPremium) return 'active';
  return 'locked';
}

// ─── AuthorCard ───────────────────────────────────────────────────────────────

function AuthorCard({
  author,
  state,
}: {
  author: typeof authors[0];
  state: AuthorState;
}) {
  const { theme } = useTheme();
  const ac = useMemo(() => makeAcStyles(theme), [theme]);

  const portrait  = PORTRAITS[author.id] ?? null;
  const isDual    = author.id === 'heraclito-democrito';
  const isIntro   = author.id.startsWith('intro-');

  const inner = (
    <View
      style={[
        ac.card,
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
          <View style={[ac.portrait, { borderWidth: 2, borderColor: '#0f6e56' }]}>
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
        {state === 'active' && (
          <View style={ac.badgePurple}>
            <Text style={ac.badgePurpleText}>Activo</Text>
          </View>
        )}
        {state === 'done' && (
          <View style={ac.badgeGreen}>
            <Text style={ac.badgeGreenText}>✓</Text>
          </View>
        )}
      </View>
    </View>
  );

  if (state === 'locked') return inner;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/autor/${author.id}`)}
      activeOpacity={0.8}
    >
      {inner}
    </TouchableOpacity>
  );
}

// ─── BlockNode ────────────────────────────────────────────────────────────────

// Map symbol names to simple Unicode glyphs (replaced by SVG icons later)
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
  const { theme } = useTheme();
  const bn = useMemo(() => makeBnStyles(theme), [theme]);

  const status    = getBlockStatus(block, isPremium, progress);
  const isActive  = status === 'active';
  const isLocked  = status === 'locked';

  const blockAuthors = block.authors
    .map((id) => authorById[id])
    .filter(Boolean) as (typeof authors[0])[];

  const completed = blockAuthors.filter(a => isAuthorDone(progress[a.id])).length;
  const total     = block.authors.length;
  const pct       = Math.round((completed / total) * 100);

  return (
    <View style={[bn.wrapper, isLocked && bn.wrapperLocked]}>

      {/* ── Block header ──────────────────────────────────── */}
      <TouchableOpacity
        style={bn.header}
        onPress={isLocked
          ? (block.id === 'b0'
              ? () => Alert.alert('Introducción requerida', 'Completa la Introducción primero para desbloquear este bloque.')
              : onPaywall)
          : (isActive ? onToggle : undefined)}
        activeOpacity={0.7}
      >
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
            <Text style={[bn.name, isLocked && bn.nameLocked]} numberOfLines={1}>
              {block.name}
            </Text>
            {block.isFree ? (
              <View style={bn.freeTag}>
                <Text style={bn.freeTagText}>Gratis</Text>
              </View>
            ) : (
              <View style={bn.premiumTag}>
                <Text style={bn.premiumTagText}>Premium</Text>
              </View>
            )}
          </View>

          <Text style={[bn.era, isLocked && bn.eraLocked]}>{block.era}</Text>

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
      </TouchableOpacity>

      {/* ── Authors list (expanded) ───────────────────────── */}
      {isActive && isExpanded && (
        <View style={bn.authorsList}>
          {blockAuthors.map((author, i) => (
            <AuthorCard
              key={author.id}
              author={author}
              state={getAuthorState(author.id, i, block.id, block.authors, progress, unlocked, isPremium)}
            />
          ))}
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
      <View style={styles.header}>
        <Text style={styles.title}>Camino</Text>
        <Text style={styles.subtitle}>
          {blocks.length} bloques · {totalAuthors} autores
        </Text>
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
      borderRadius: radius.xl,           // 16px
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
      borderColor: theme.green,
    },
    cardLocked: {
      opacity: 0.45,
    },

    // Portrait
    leftCol: {
      width: 100,
      alignItems: 'center',
      justifyContent: 'center',
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

    // Info
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

    // Trailing badges
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

    // Header row
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.lg,
      gap: spacing.md,
    },

    // Symbol icon box
    icon: {
      width: 44,
      height: 44,
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

    // Text meta area
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

    // Tags
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

    // Progress bar
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

    // Chevron / lock indicator
    chevron: {
      ...typography.body,
      color: theme.text2,
      paddingLeft: spacing.xs,
    },
    chevronLocked: {
      color: theme.text3,
      fontSize: typography.bodyS.fontSize,
    },

    // Authors list (expanded)
    authorsList: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
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
    header: {
      marginBottom: spacing.xxl,
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
  });
}
