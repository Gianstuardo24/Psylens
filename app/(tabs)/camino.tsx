import { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { typography, spacing, radius } from '../../constants/typography';
import { authors, blocks } from '../../constants/data';
import { PaywallSheet } from '../../components/PaywallSheet';

// ─── Types ────────────────────────────────────────────────────────────────────

type AuthorState = 'active' | 'locked' | 'done';
type BlockStatus  = 'active' | 'locked';
type LayerProgress = { surface?: boolean; concept?: boolean; fondo?: boolean };
type ProgressMap   = Record<string, LayerProgress>;

const PROGRESS_KEY = 'psylens_progress';
const UNLOCK_KEY   = 'psylens_unlocked';
const PREMIUM_KEY  = 'psylens_is_premium';

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

function getBlockStatus(block: typeof blocks[0], isPremium: boolean): BlockStatus {
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
  if (blockId === 'b0') {
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
  const portrait  = PORTRAITS[author.id] ?? null;
  const isDual    = author.id === 'heraclito-democrito';

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
  const status    = getBlockStatus(block, isPremium);
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
        onPress={isLocked ? onPaywall : (isActive ? onToggle : undefined)}
        activeOpacity={0.7}
      >
        {/* Symbol icon */}
        <View style={[bn.icon, isLocked && bn.iconLocked]}>
          <Text style={[bn.iconGlyph, isLocked && bn.iconGlyphLocked]}>
            {SYMBOL[block.symbol] ?? block.symbol[0].toUpperCase()}
          </Text>
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
  const [expandedId,  setExpandedId]  = useState<string | null>('b0');
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

const ac = StyleSheet.create({
  card: {
    height: 110,
    borderRadius: radius.xl,           // 16px
    backgroundColor: colors.dark.bg,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: spacing.sm,
  },
  cardActive: {
    borderWidth: 1.5,
    borderColor: colors.dark.purple,
    shadowColor: colors.dark.purple,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardDone: {
    borderWidth: 1,
    borderColor: colors.dark.green,
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
    backgroundColor: colors.dark.bg3,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  dualCircleRight: {
    marginLeft: -16,
    borderWidth: 2,
    borderColor: colors.dark.bg,
  },
  dualImage: {
    width: 64,
    height: 64,
  },
  portrait: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.dark.bg3,
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
    backgroundColor: colors.dark.bg2,
    opacity: 0.6,
  },
  initial: {
    ...typography.h3,
    color: colors.dark.text2,
  },

  // Info
  info: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xs,
  },
  name: {
    ...typography.bodyS,
    color: colors.dark.text,
    fontWeight: '600',
  },
  subtitle: {
    ...typography.bodyXS,
    color: colors.dark.text2,
  },
  dates: {
    ...typography.bodyXS,
    color: colors.dark.text3,
  },
  dimText: {
    color: colors.dark.text3,
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
    backgroundColor: colors.dark.purpleBg,
  },
  badgePurpleText: {
    ...typography.label,
    color: colors.dark.purple,
  },
  badgeGreen: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.dark.greenBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeGreenText: {
    ...typography.bodyS,
    color: colors.dark.green,
    fontWeight: '700',
  },
});

// ─── BlockNode styles ─────────────────────────────────────────────────────────

const bn = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.dark.bg2,
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
    backgroundColor: colors.dark.bg3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLocked: {
    backgroundColor: colors.dark.bg,
  },
  iconGlyph: {
    fontSize: typography.h3.fontSize,
    color: colors.dark.text2,
  },
  iconGlyphLocked: {
    color: colors.dark.text3,
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
    color: colors.dark.text,
    fontWeight: '600',
    flexShrink: 1,
  },
  nameLocked: {
    color: colors.dark.text3,
  },
  era: {
    ...typography.bodyXS,
    color: colors.dark.text3,
  },
  eraLocked: {
    color: colors.dark.text3,
  },

  // Tags
  freeTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.dark.greenBg,
  },
  freeTagText: {
    ...typography.label,
    color: colors.dark.green,
  },
  premiumTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.dark.purpleBg,
  },
  premiumTagText: {
    ...typography.label,
    color: colors.dark.purple,
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
    backgroundColor: colors.dark.bg3,
    overflow: 'hidden',
  },
  progressFill: {
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.dark.green,
  },
  progressText: {
    ...typography.label,
    color: colors.dark.text3,
    minWidth: 28,
    textAlign: 'right',
  },

  // Chevron / lock indicator
  chevron: {
    ...typography.body,
    color: colors.dark.text2,
    paddingLeft: spacing.xs,
  },
  chevronLocked: {
    color: colors.dark.text3,
    fontSize: typography.bodyS.fontSize,
  },

  // Authors list (expanded)
  authorsList: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
});

// ─── Screen styles ────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.dark.bg,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.dark.bg,
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
    color: colors.dark.text,
  },
  subtitle: {
    ...typography.bodyS,
    color: colors.dark.text3,
    marginTop: spacing.xs,
  },
});
