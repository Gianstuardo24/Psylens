import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../constants/colors';
import { typography, spacing, radius } from '../../constants/typography';
import { authors, blocks, glossaryTerms } from '../../constants/data';

const PROGRESS_KEY     = 'psylens_progress';
const DAYS_VISITED_KEY = 'psylens_days_visited';
const NAME_KEY         = 'psylens_user_name';

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

const LAYERS = [
  { key: 'surface' as const, label: 'Superficie' },
  { key: 'concept' as const, label: 'Concepto'  },
  { key: 'fondo'   as const, label: 'Fondo'     },
];

// ── Screen ────────────────────────────────────────────────────────────────────

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const [progress,    setProgress]    = useState<ProgressMap>({});
  const [daysVisited, setDaysVisited] = useState<string[]>([]);
  const [refreshing,  setRefreshing]  = useState(false);
  const [userName,    setUserName]    = useState('');

  useEffect(() => {
    AsyncStorage.getItem(NAME_KEY)
      .then(n => { if (n) setUserName(n); })
      .catch(() => {});
  }, []);

  async function loadData() {
    const [rawProg, rawDays] = await Promise.all([
      AsyncStorage.getItem(PROGRESS_KEY).catch(() => null),
      AsyncStorage.getItem(DAYS_VISITED_KEY).catch(() => null),
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

  const completedInBlock = activeBlock.authors.filter(id => isComplete(progress, id)).length;
  const blockPct         = Math.round((completedInBlock / activeBlock.authors.length) * 100);

  // Streak chips
  const last7 = getLast7Days();

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
          tintColor={colors.dark.text}
          colors={[colors.dark.green]}
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
        <Text style={styles.sectionLabel}>Racha</Text>
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

          <Text style={styles.layerCount}>Capa {currentLayer} de 3</Text>

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
            style={styles.nextCard}
            onPress={() => router.push(`/autor/${nextAuthor.id}`)}
            activeOpacity={0.85}
          >
            <View style={styles.nextBlockChip}>
              <Text style={styles.nextBlockChipText}>{nextBlock?.name}</Text>
            </View>
            <Text style={styles.nextAuthorName}>{nextAuthor.name}</Text>
            <Text style={styles.nextDates}>{nextAuthor.dates}</Text>
          </TouchableOpacity>
        </View>
      )}

    </ScrollView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.dark.bg,
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
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  greeting: {
    ...typography.bodyS,
    color: colors.dark.text2,
  },
  date: {
    ...typography.bodyXS,
    color: colors.dark.text3,
    marginTop: spacing.xs,
    textTransform: 'capitalize',
  },

  // Section wrapper
  section: {
    marginBottom: spacing.xxl,
  },
  sectionLabel: {
    ...typography.label,
    color: colors.dark.text3,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.md,
  },

  // Streak
  streakRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  streakChip: {
    flex: 1,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.dark.bg3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakChipDone: {
    backgroundColor: colors.dark.greenBg,
  },
  streakLabel: {
    ...typography.label,
    color: colors.dark.text3,
  },
  streakLabelDone: {
    color: colors.dark.green,
  },

  // Continuar card
  continueCard: {
    backgroundColor: colors.dark.bg2,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.dark.border,
    padding: spacing.lg,
  },
  blockChip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.dark.greenBg,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
  },
  blockChipText: {
    ...typography.label,
    color: colors.dark.green,
    textTransform: 'uppercase',
  },
  continueAuthorName: {
    fontSize: typography.h2.fontSize,
    lineHeight: typography.h2.lineHeight,
    fontWeight: '700',
    fontFamily: 'PlayfairDisplay_700Bold',
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  continueDates: {
    ...typography.bodyS,
    color: colors.dark.text3,
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
    backgroundColor: colors.dark.bg3,
  },
  layerChipDone: {
    backgroundColor: colors.dark.greenBg,
  },
  layerChipText: {
    ...typography.bodyXS,
    color: colors.dark.text3,
  },
  layerChipTextDone: {
    color: colors.dark.green,
  },
  layerCount: {
    ...typography.bodyXS,
    color: colors.dark.text3,
    marginBottom: spacing.lg,
  },
  readButton: {
    backgroundColor: colors.dark.green,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  readButtonText: {
    ...typography.body,
    color: colors.dark.text,
    fontWeight: '600',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.dark.bg2,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.dark.border,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
  },
  statValue: {
    ...typography.h2,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.bodyXS,
    color: colors.dark.text3,
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
    backgroundColor: colors.dark.bg2,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.dark.border,
    padding: spacing.md,
  },
  conceptBlock: {
    ...typography.bodyXS,
    color: colors.dark.text3,
    marginBottom: spacing.xs,
  },
  conceptTerm: {
    ...typography.bodyS,
    color: colors.dark.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  conceptAuthor: {
    ...typography.bodyXS,
    color: colors.dark.text2,
  },

  // Próximo card
  nextCard: {
    backgroundColor: colors.dark.bg2,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.dark.border,
    padding: spacing.lg,
    opacity: 0.7,
  },
  nextBlockChip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.dark.bg3,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
  },
  nextBlockChipText: {
    ...typography.label,
    color: colors.dark.text3,
    textTransform: 'uppercase',
  },
  nextAuthorName: {
    ...typography.h3,
    color: colors.dark.text2,
    marginBottom: spacing.xs,
  },
  nextDates: {
    ...typography.bodyS,
    color: colors.dark.text3,
  },
});
