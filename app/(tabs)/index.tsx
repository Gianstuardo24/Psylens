import { useCallback, useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import Svg, { Circle, Ellipse, Line } from 'react-native-svg';
import { router, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../constants/colors';
import { typography, spacing, radius } from '../../constants/typography';
import { authors, blocks, glossaryTerms } from '../../constants/data';
import { useTheme } from '../../hooks/useTheme';

type Theme = typeof colors.dark;

const PROGRESS_KEY     = 'psylens_progress';
const DAYS_VISITED_KEY = 'psylens_days_visited';
const NAME_KEY         = 'psylens_user_name';
const STREAK_KEY       = 'psylens_streak';
const LAST_ACTIVE_KEY  = 'psylens_last_active';

type LayerProgress = { surface?: boolean; concept?: boolean; fondo?: boolean };
type ProgressMap   = Record<string, LayerProgress>;

// ── Helpers ───────────────────────────────────────────────────────────────────

function isComplete(prog: ProgressMap, authorId: string): boolean {
  const p = prog[authorId];
  return !!(p?.surface && p?.concept && p?.fondo);
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12)  return 'Buenos días';
  if (h >= 12 && h < 20) return 'Buenas tardes';
  return 'Buenas noches';
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function diffDays(isoEarlier: string, isoLater: string): number {
  const a = new Date(isoEarlier + 'T00:00:00').getTime();
  const b = new Date(isoLater   + 'T00:00:00').getTime();
  return Math.round((b - a) / 86_400_000);
}

function formattedDate(): string {
  return new Date().toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long',
  });
}

function getLast7Days(): { iso: string; label: string }[] {
  const DOW = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    result.push({ iso: d.toISOString().slice(0, 10), label: DOW[d.getDay()] });
  }
  return result;
}

// Static portrait map — Metro requires literal require() paths
const PORTRAITS: Record<string, number> = {
  'heraclito-democrito': require('../../assets/portraits/heraclito.png'),
  'platon':              require('../../assets/portraits/platon.png'),
  'aristoteles':         require('../../assets/portraits/aristoteles.png'),
  'hipocrates':          require('../../assets/portraits/hipocrates.png'),
  'descartes':           require('../../assets/portraits/descartes.png'),
  'kant':                require('../../assets/portraits/kant.png'),
  'schopenhauer':        require('../../assets/portraits/schopenhauer.png'),
};

function PortraitCircle({ authorId, size }: { authorId: string; size: number }) {
  const { theme } = useTheme();
  const [errored, setErrored] = useState(false);
  const source = PORTRAITS[authorId];

  if (authorId.startsWith('intro-')) {
    const svgSize = Math.round(size * 0.6);
    return (
      <View style={{
        width: size, height: size, borderRadius: size / 2,
        borderWidth: 2, borderColor: '#0f6e56',
        backgroundColor: theme.bg3,
        alignItems: 'center', justifyContent: 'center',
      }}>
        {authorId === 'intro-1' && (
          <Svg width={svgSize} height={svgSize} viewBox="0 0 120 120">
            <Ellipse cx="60" cy="60" rx="50" ry="28" stroke="#0f6e56" strokeWidth="2" fill="none" />
            <Circle cx="60" cy="60" r="14" stroke="#0f6e56" strokeWidth="2" fill="none" />
          </Svg>
        )}
        {authorId === 'intro-2' && (
          <Svg width={svgSize} height={svgSize} viewBox="0 0 22 14">
            <Circle cx="5" cy="7" r="4" stroke="#0f6e56" strokeWidth="1.8" fill="none" />
            <Circle cx="17" cy="7" r="4" stroke="#0f6e56" strokeWidth="1.8" fill="none" />
            <Line x1="9" y1="7" x2="13" y2="7" stroke="#0f6e56" strokeWidth="1.8" />
          </Svg>
        )}
        {authorId === 'intro-3' && (
          <Svg width={svgSize} height={svgSize} viewBox="0 0 120 120">
            <Line x1="15" y1="60" x2="105" y2="60" stroke="#0f6e56" strokeWidth="2" />
            <Circle cx="22" cy="60" r="4" fill="#0f6e56" />
            <Circle cx="48" cy="60" r="6" fill="#0f6e56" />
            <Circle cx="74" cy="60" r="8" fill="#0f6e56" />
            <Circle cx="100" cy="60" r="10" fill="#0f6e56" />
          </Svg>
        )}
        {authorId === 'intro-4' && (
          <Svg width={svgSize} height={svgSize} viewBox="0 0 120 120">
            <Circle cx="60" cy="60" r="18" stroke="#0f6e56" strokeWidth="2" fill="none" />
            <Circle cx="60" cy="60" r="34" stroke="#0f6e56" strokeWidth="2" fill="none" />
            <Circle cx="60" cy="60" r="50" stroke="#0f6e56" strokeWidth="2" fill="none" />
          </Svg>
        )}
      </View>
    );
  }

  return (
    <View style={{
      width: size, height: size, borderRadius: size / 2,
      borderWidth: 2, borderColor: theme.green,
      backgroundColor: theme.bg3, overflow: 'hidden',
    }}>
      {!errored && source && (
        <Image
          source={source}
          style={{ width: size, height: size }}
          resizeMode="cover"
          onError={() => setErrored(true)}
        />
      )}
    </View>
  );
}

const LAYERS = [
  { key: 'surface' as const, label: 'Superficie' },
  { key: 'concept' as const, label: 'Concepto'  },
  { key: 'fondo'   as const, label: 'Fondo'     },
];

// ── Screen ────────────────────────────────────────────────────────────────────

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const [progress,    setProgress]    = useState<ProgressMap>({});
  const [daysVisited, setDaysVisited] = useState<string[]>([]);
  const [refreshing,  setRefreshing]  = useState(false);
  const [userName,    setUserName]    = useState('');
  const [streak,      setStreak]      = useState(0);

  useEffect(() => {
    AsyncStorage.getItem(NAME_KEY)
      .then(n => { if (n) setUserName(n); })
      .catch(() => {});
  }, []);

  async function loadData() {
    const [rawProg, rawDays, rawStreak, lastActive] = await Promise.all([
      AsyncStorage.getItem(PROGRESS_KEY).catch(() => null),
      AsyncStorage.getItem(DAYS_VISITED_KEY).catch(() => null),
      AsyncStorage.getItem(STREAK_KEY).catch(() => null),
      AsyncStorage.getItem(LAST_ACTIVE_KEY).catch(() => null),
    ]);

    const prog: ProgressMap = rawProg ? JSON.parse(rawProg) : {};
    setProgress(prog);

    const today = todayISO();
    const days: string[] = rawDays ? JSON.parse(rawDays) : [];
    if (!days.includes(today)) {
      days.push(today);
      AsyncStorage.setItem(DAYS_VISITED_KEY, JSON.stringify(days)).catch(() => {});
    }
    setDaysVisited([...days]);

    // Reset streak to 0 if 2+ days have passed since last layer completion.
    // last_active is only updated when a layer is completed, not on open.
    let currentStreak = rawStreak ? parseInt(rawStreak, 10) : 0;
    if (lastActive && diffDays(lastActive, today) >= 2) {
      currentStreak = 0;
      AsyncStorage.setItem(STREAK_KEY, '0').catch(() => {});
    }
    setStreak(currentStreak);
  }

  useFocusEffect(useCallback(() => { loadData(); }, []));

  async function handleRefresh() {
    setRefreshing(true);
    try {
      await loadData();
    } finally {
      setRefreshing(false);
    }
  }

  // ── Derived data ─────────────────────────────────────────────────────────────

  // Active = first incomplete author; fall back to last if all done
  const activeIdx    = authors.findIndex(a => !isComplete(progress, a.id));
  const activeAuthor = activeIdx >= 0 ? authors[activeIdx] : authors[authors.length - 1];
  const activeBlock  = blocks.find(b => b.id === activeAuthor.blockId)!;
  const activeProg   = progress[activeAuthor.id] ?? {};
  const doneLayers   = LAYERS.filter(l => activeProg[l.key]).length;
  const currentLayer = Math.min(doneLayers + 1, 3);

  // Next = the author right after the active one
  const nextAuthor = activeIdx >= 0 && activeIdx < authors.length - 1
    ? authors[activeIdx + 1] : null;
  const nextBlock  = nextAuthor ? blocks.find(b => b.id === nextAuthor.blockId) ?? null : null;

  // Stats
  const completedAuthors = authors.filter(a => isComplete(progress, a.id)).length;
  const unlockedConcepts = glossaryTerms.filter(t => isComplete(progress, t.authorId));
  const lastConcepts     = [...unlockedConcepts].reverse().slice(0, 3);

  const completedInBlock  = activeBlock.authors.filter(id => isComplete(progress, id)).length;
  const blockPct          = Math.round((completedInBlock / activeBlock.authors.length) * 100);
  const isActiveComplete  = isComplete(progress, activeAuthor.id);

  // Streak chips
  const last7 = getLast7Days();

  const styles = useMemo(() => makeStyles(theme), [theme]);

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.xl }]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={theme.text}
          colors={[theme.green]}
        />
      }
    >

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Text style={styles.wordmark}>Psylens</Text>
        <Text style={styles.greeting}>
          {userName ? `${getGreeting()}, ${userName}` : getGreeting()}
        </Text>
        <Text style={styles.date}>{formattedDate()}</Text>
      </View>

      {/* ── RACHA ──────────────────────────────────────────────────────────── */}
      <View style={styles.section}>
        <View style={styles.streakHeader}>
          <Text style={[styles.sectionLabel, { marginBottom: 0 }]}>Racha</Text>
          <Text style={styles.streakCount}>
            {streak} {streak === 1 ? 'día' : 'días'}
          </Text>
        </View>
        <View style={styles.streakRow}>
          {last7.map(({ iso, label }) => {
            const done = daysVisited.includes(iso);
            return (
              <View key={iso} style={[styles.streakChip, done && styles.streakChipDone]}>
                <Text style={[styles.streakLabel, done && styles.streakLabelDone]}>{label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* ── CONTINUAR ──────────────────────────────────────────────────────── */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Continuar</Text>
        <TouchableOpacity
          style={styles.continueCard}
          onPress={() => router.push(`/autor/${activeAuthor.id}`)}
          activeOpacity={0.85}
        >
          <View style={styles.continuePortrait}>
            <PortraitCircle authorId={activeAuthor.id} size={112} />
          </View>

          <View style={styles.blockChip}>
            <Text style={styles.blockChipText}>{activeBlock.name}</Text>
          </View>

          <Text style={styles.continueAuthorName}>{activeAuthor.name}</Text>
          <Text style={styles.continueDates}>{activeAuthor.dates}</Text>

          <View style={styles.layerRow}>
            {LAYERS.map(({ key, label }) => {
              const done = !!(activeProg[key]);
              return (
                <View key={key} style={[styles.layerChip, done && styles.layerChipDone]}>
                  <Text style={[styles.layerChipText, done && styles.layerChipTextDone]}>
                    {done ? `${label} ✓` : label}
                  </Text>
                </View>
              );
            })}
          </View>

          <Text style={styles.layerCount}>
            Capa {currentLayer} de {activeAuthor.id === 'intro-4' ? 3 : activeAuthor.id.startsWith('intro-') ? 2 : 3}
          </Text>

          <View style={styles.readButton}>
            <Text style={styles.readButtonText}>Seguir leyendo →</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ── TU PROGRESO ────────────────────────────────────────────────────── */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Tu progreso</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{completedAuthors}</Text>
            <Text style={styles.statLabel}>Autores{'\n'}completados</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{unlockedConcepts.length}</Text>
            <Text style={styles.statLabel}>Conceptos{'\n'}desbloqueados</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{blockPct}%</Text>
            <Text style={styles.statLabel}>Bloque{'\n'}actual</Text>
          </View>
        </View>
      </View>

      {/* ── ÚLTIMOS CONCEPTOS ──────────────────────────────────────────────── */}
      {lastConcepts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Últimos conceptos</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.conceptsRow}
          >
            {lastConcepts.map(term => {
              const termAuthor = authors.find(a => a.id === term.authorId);
              const termBlock  = blocks.find(b => b.authors.includes(term.authorId));
              return (
                <View key={term.id} style={styles.conceptChip}>
                  <Text style={styles.conceptBlock} numberOfLines={1}>{termBlock?.name}</Text>
                  <Text style={styles.conceptTerm}>{term.term}</Text>
                  <Text style={styles.conceptAuthor} numberOfLines={1}>{termAuthor?.name}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* ── PRÓXIMO EN EL CAMINO ───────────────────────────────────────────── */}
      {nextAuthor && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Próximo en el camino</Text>
          <TouchableOpacity
            style={[styles.nextCard, { flexDirection: 'row', alignItems: 'center' }, !isActiveComplete && { opacity: 0.5 }]}
            onPress={isActiveComplete
              ? () => router.push(`/autor/${nextAuthor.id}`)
              : () => Alert.alert('Autor bloqueado', `Completa a ${activeAuthor.name} primero para continuar`)
            }
            activeOpacity={0.85}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.nextBlockChip}>
                <Text style={styles.nextBlockChipText}>{nextBlock?.name}</Text>
              </View>
              <Text style={styles.nextAuthorName}>{nextAuthor.name}</Text>
              <Text style={styles.nextDates}>{nextAuthor.dates}</Text>
            </View>
            <View style={{ marginRight: 20 }}>
              <PortraitCircle authorId={nextAuthor.id} size={80} />
            </View>
          </TouchableOpacity>
        </View>
      )}

    </ScrollView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    scroll: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    content: {
      paddingHorizontal: spacing.xl,
      paddingBottom: spacing.xxxl,
    },

    // Header
    header: {
      alignItems: 'center',
      marginBottom: spacing.xxl,
    },
    wordmark: {
      ...typography.h2,
      color: theme.text,
      marginBottom: spacing.xs,
    },
    greeting: {
      ...typography.bodyS,
      color: theme.text2,
    },
    date: {
      ...typography.bodyXS,
      color: theme.text3,
      marginTop: spacing.xs,
      textTransform: 'capitalize',
    },

    // Section wrapper
    section: {
      marginBottom: spacing.xxl,
    },
    sectionLabel: {
      ...typography.label,
      color: theme.text3,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: spacing.md,
    },

    // Streak
    streakHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    streakCount: {
      ...typography.bodyS,
      color: theme.green,
      fontWeight: '600',
    },
    streakRow: {
      flexDirection: 'row',
      gap: spacing.xs,
    },
    streakChip: {
      flex: 1,
      height: 44,
      borderRadius: radius.md,
      backgroundColor: theme.bg3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    streakChipDone: {
      backgroundColor: theme.greenBg,
    },
    streakLabel: {
      ...typography.label,
      color: theme.text3,
    },
    streakLabelDone: {
      color: theme.green,
    },

    // Continuar card
    continueCard: {
      backgroundColor: theme.bg2,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: theme.border,
      padding: spacing.lg,
    },
    continuePortrait: {
      position: 'absolute',
      top: 24,
      right: 24,
      zIndex: 1,
    },
    blockChip: {
      alignSelf: 'flex-start',
      backgroundColor: theme.greenBg,
      borderRadius: radius.full,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      marginBottom: spacing.md,
    },
    blockChipText: {
      ...typography.label,
      color: theme.green,
      textTransform: 'uppercase',
    },
    continueAuthorName: {
      fontSize: typography.h2.fontSize,
      lineHeight: typography.h2.lineHeight,
      fontWeight: '700',
      fontFamily: 'PlayfairDisplay_700Bold',
      color: theme.text,
      paddingRight: 130,
      marginBottom: spacing.xs,
    },
    continueDates: {
      ...typography.bodyS,
      color: theme.text3,
      marginBottom: spacing.lg,
    },
    layerRow: {
      flexDirection: 'row',
      gap: spacing.xs,
      marginBottom: spacing.sm,
    },
    layerChip: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: radius.full,
      backgroundColor: theme.bg3,
    },
    layerChipDone: {
      backgroundColor: theme.greenBg,
    },
    layerChipText: {
      ...typography.bodyXS,
      color: theme.text3,
    },
    layerChipTextDone: {
      color: theme.green,
    },
    layerCount: {
      ...typography.bodyXS,
      color: theme.text3,
      marginBottom: spacing.lg,
    },
    readButton: {
      backgroundColor: theme.green,
      borderRadius: radius.lg,
      paddingVertical: spacing.md,
      alignItems: 'center',
    },
    readButtonText: {
      ...typography.body,
      color: '#ffffff',
      fontWeight: '600',
    },

    // Stats
    statsRow: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    statBox: {
      flex: 1,
      backgroundColor: theme.bg2,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: theme.border,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.sm,
      alignItems: 'center',
    },
    statValue: {
      ...typography.h2,
      color: theme.text,
      marginBottom: spacing.xs,
    },
    statLabel: {
      ...typography.bodyXS,
      color: theme.text3,
      textAlign: 'center',
      lineHeight: 16,
    },

    // Últimos conceptos
    conceptsRow: {
      gap: spacing.sm,
      paddingRight: spacing.xl,
    },
    conceptChip: {
      width: 148,
      backgroundColor: theme.bg2,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: theme.border,
      padding: spacing.md,
    },
    conceptBlock: {
      ...typography.bodyXS,
      color: theme.text3,
      marginBottom: spacing.xs,
    },
    conceptTerm: {
      ...typography.bodyS,
      color: theme.text,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    conceptAuthor: {
      ...typography.bodyXS,
      color: theme.text2,
    },

    // Próximo card
    nextCard: {
      backgroundColor: theme.bg2,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: theme.border,
      padding: spacing.lg,
      opacity: 0.7,
    },
    nextBlockChip: {
      alignSelf: 'flex-start',
      backgroundColor: theme.bg3,
      borderRadius: radius.full,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      marginBottom: spacing.md,
    },
    nextBlockChipText: {
      ...typography.label,
      color: theme.text3,
      textTransform: 'uppercase',
    },
    nextAuthorName: {
      ...typography.h3,
      color: theme.text2,
      marginBottom: spacing.xs,
    },
    nextDates: {
      ...typography.bodyS,
      color: theme.text3,
    },
  });
}
