import { useCallback, useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  RefreshControl,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';

const SCREEN_WIDTH    = Dimensions.get('window').width;
const CARD_WIDTH      = SCREEN_WIDTH - 32;
const TITLE_MAX_WIDTH = CARD_WIDTH * 0.58;
import Svg, { Circle, Ellipse, Line, Path } from 'react-native-svg';
import { router, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, blockColors } from '../../constants/colors';
import { typography, spacing, radius } from '../../constants/typography';
import { authors, blocks, glossaryTerms, subBlocks, revolutionCards } from '../../constants/data';
import { HelenisticasIllustration } from '../../components/IntroIllustrations';
import { useTheme } from '../../hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';

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

// Combined entry sequence matching Camino screen order
type CEntry =
  | { type: 'author';     data: typeof authors[0] }
  | { type: 'revolution'; data: typeof revolutionCards[0] };

const _authorById    = Object.fromEntries(authors.map(a => [a.id, a]));
const _revBySubBlock = Object.fromEntries(revolutionCards.map(r => [r.subBlockId, r]));

function buildAllEntries(): CEntry[] {
  const result: CEntry[] = [];
  for (const block of blocks) {
    const blockAuthorSet  = new Set(block.authors);
    const blockSubBlocks  = subBlocks.filter(sb => sb.blockId === block.id);
    if (blockSubBlocks.length > 0) {
      for (const sb of blockSubBlocks) {
        const rev = _revBySubBlock[sb.id];
        if (rev) result.push({ type: 'revolution', data: rev });
        for (const id of sb.authorIds) {
          if (blockAuthorSet.has(id) && _authorById[id]) {
            result.push({ type: 'author', data: _authorById[id] });
          }
        }
      }
    } else {
      for (const id of block.authors) {
        if (_authorById[id]) result.push({ type: 'author', data: _authorById[id] });
      }
    }
  }
  return result;
}

const ALL_ENTRIES: CEntry[] = buildAllEntries();

function isEntryDone(e: CEntry, prog: ProgressMap): boolean {
  return e.type === 'author'
    ? isComplete(prog, e.data.id)
    : !!prog[e.data.id]?.concept;
}

function formatTitle(id: string, name: string): string {
  const titles: Record<string, string> = {
    'intro-1': 'El origen de\nla pregunta',
    'intro-2': 'Qué es y qué no\nes la psicología',
    'intro-3': 'Por qué este\ncamino tiene\neste orden',
    'intro-4': 'Así funciona\ncada capa',
    'rev-0a': '¿Qué somos si\nno somos dioses?',
    'rev-0b': 'La mente tiene\npartes — y no siempre\nse ponen de acuerdo',
    'rev-0c': 'Pensar no es\nsuficiente para\nentenderse',
    'rev-0d': 'Algo nos mueve\nantes de que\nlo decidamos',
    'rev-1a': 'Por primera vez,\nla mente entra\nal laboratorio',
    'rev-1b': 'Si no puedes\nverlo, no puedes\nestudiarlo',
    'schopenhauer': 'Arthur\nSchopenhauer',
    'helenisticas': 'Las filosofías\nhelenísticas',
    'heraclito-democrito': 'Los presocráticos',
    'ebbinghaus': 'Hermann\nEbbinghaus',
  };
  return titles[id] ?? name;
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

function getCurrentWeekDays(): { iso: string; label: string }[] {
  const DOW = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  const today = new Date();
  const dow = today.getDay(); // 0=Sun, 1=Mon … 6=Sat
  const offsetToMonday = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(today);
  monday.setDate(today.getDate() + offsetToMonday);
  const result = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    result.push({ iso: d.toISOString().slice(0, 10), label: DOW[d.getDay()] });
  }
  return result;
}

// Static portrait map — Metro requires literal require() paths
const PORTRAITS: Record<string, number | null> = {
  'heraclito-democrito': require('../../assets/portraits/heraclito.png'),
  'platon':              require('../../assets/portraits/platon.png'),
  'aristoteles':         require('../../assets/portraits/aristoteles.png'),
  'helenisticas':        null,
  'hipocrates':          require('../../assets/portraits/hipocrates.png'),
  'descartes':           require('../../assets/portraits/descartes.png'),
  'spinoza':             require('../../assets/portraits/spinoza.png'),
  'kant':                require('../../assets/portraits/kant.png'),
  'schopenhauer':        require('../../assets/portraits/schopenhauer.png'),
  'darwin':              require('../../assets/portraits/darwin.png'),
  'ebbinghaus':          require('../../assets/portraits/ebbinghaus.png'),
  'thorndike':           require('../../assets/portraits/thorndike.png'),
};

function PortraitCircle({ authorId, size }: { authorId: string; size: number }) {
  const { theme, isDark } = useTheme();
  const [errored, setErrored] = useState(false);
  const source = PORTRAITS[authorId];

  if (authorId === 'helenisticas') {
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden' }}>
        <HelenisticasIllustration size={size} isDark={isDark} />
      </View>
    );
  }

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
  const { theme, isDark } = useTheme();
  const [progress,    setProgress]    = useState<ProgressMap>({});
  const [daysVisited, setDaysVisited] = useState<string[]>([]);
  const [refreshing,  setRefreshing]  = useState(false);
  const [userName,    setUserName]    = useState('');
  const [streak,      setStreak]      = useState(0);
  const [selectedTerm, setSelectedTerm] = useState<typeof glossaryTerms[0] | null>(null);

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

  // Active = first incomplete entry (author or rev card); fall back to last
  const activeEntryIdx = ALL_ENTRIES.findIndex(e => !isEntryDone(e, progress));
  const activeEntry    = activeEntryIdx >= 0 ? ALL_ENTRIES[activeEntryIdx] : ALL_ENTRIES[ALL_ENTRIES.length - 1];
  const activeRevCard  = activeEntry.type === 'revolution' ? activeEntry.data : null;
  const activeAuthor   = activeEntry.type === 'author'     ? activeEntry.data : null;

  const activeBlock  = blocks.find(b => b.id === activeEntry.data.blockId)!;
  const activeProg   = activeAuthor ? (progress[activeAuthor.id] ?? {}) : {};
  const isTwoLayer   = activeAuthor?.layerType === 'two';
  const doneLayers   = LAYERS.filter(l => activeProg[l.key]).length;
  const currentLayer = Math.min(doneLayers + 1, isTwoLayer ? 2 : 3);

  // Next = entry right after active (any type)
  const nextEntry   = activeEntryIdx >= 0 && activeEntryIdx < ALL_ENTRIES.length - 1
    ? ALL_ENTRIES[activeEntryIdx + 1] : null;
  const nextRevCard = nextEntry?.type === 'revolution' ? nextEntry.data : null;
  const nextAuthor  = nextEntry?.type === 'author'     ? nextEntry.data : null;
  const nextBlock   = nextEntry ? blocks.find(b => b.id === nextEntry.data.blockId) ?? null : null;

  // Stats
  const completedAuthors = authors.filter(a => isComplete(progress, a.id)).length;
  const unlockedConcepts = glossaryTerms.filter(t => isComplete(progress, t.authorId));
  const lastConcepts     = [...unlockedConcepts]
    .reverse()
    .filter((t, i, arr) => arr.findIndex(x => x.term === t.term) === i)
    .slice(0, 5);
  const selectedAuthor   = authors.find(a => a.id === selectedTerm?.authorId);

  const completedInBlock  = activeBlock.authors.filter(id => isComplete(progress, id)).length;
  const blockPct          = Math.round((completedInBlock / activeBlock.authors.length) * 100);
  const isActiveComplete  = activeRevCard
    ? !!progress[activeRevCard.id]?.concept
    : isComplete(progress, activeAuthor!.id);

  const activeSubBlock = activeRevCard
    ? (subBlocks.find(sb => sb.id === activeRevCard.subBlockId) ?? null)
    : (activeAuthor ? (subBlocks.find(sb => sb.authorIds.includes(activeAuthor.id)) ?? null) : null);
  const subBlockVisibleIds  = activeSubBlock
    ? activeSubBlock.authorIds.filter(id => activeBlock.authors.includes(id))
    : [];
  const completedInSubBlock = subBlockVisibleIds.filter(id => isComplete(progress, id)).length;

  // Streak chips
  const last7 = getCurrentWeekDays();

  const styles = useMemo(() => makeStyles(theme), [theme]);

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <>
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

      {/* ── PROGRESO ────────────────────────────────────────────────────────── */}
      <View style={styles.progressSection}>
        {/* Bloque actual */}
        <View>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressLabel}>{activeBlock.name}</Text>
            <Text style={[styles.progressLabel, { color: blockColors[activeBlock.id]?.text ?? theme.text3 }]}>
              {completedInBlock} de {activeBlock.authors.length}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 3, height: 8 }}>
            {activeBlock.authors.map((authorId) => {
              const done = isComplete(progress, authorId);
              return (
                <View
                  key={authorId}
                  style={{
                    flex: 1,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: done
                      ? (blockColors[activeBlock.id]?.base ?? theme.green)
                      : theme.bg3,
                    shadowColor: done ? (blockColors[activeBlock.id]?.base ?? theme.green) : 'transparent',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: done ? 0.4 : 0,
                    shadowRadius: 2,
                    elevation: done ? 2 : 0,
                  }}
                />
              );
            })}
          </View>
        </View>

        {/* Etapa actual (sub-block) */}
        {activeSubBlock && subBlockVisibleIds.length > 0 && (
          <View>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>{activeSubBlock.name}</Text>
              <Text style={[styles.progressLabel, { color: blockColors[activeBlock.id]?.text ?? theme.text3 }]}>
                {completedInSubBlock} de {subBlockVisibleIds.length}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 3, height: 8 }}>
              {subBlockVisibleIds.map((authorId) => {
                const done = isComplete(progress, authorId);
                return (
                  <View
                    key={authorId}
                    style={{
                      flex: 1,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: done
                        ? (blockColors[activeBlock.id]?.base ?? theme.green)
                        : theme.bg3,
                      shadowColor: done ? (blockColors[activeBlock.id]?.base ?? theme.green) : 'transparent',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: done ? 0.4 : 0,
                      shadowRadius: 2,
                      elevation: done ? 2 : 0,
                    }}
                  />
                );
              })}
            </View>
          </View>
        )}
      </View>

      {/* ── CONTINUAR ──────────────────────────────────────────────────────── */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Continuar</Text>
        <TouchableOpacity
          style={styles.continueCard}
          onPress={() => router.push(`/autor/${activeEntry.data.id}`)}
          activeOpacity={0.85}
        >
          <View style={styles.continuePortrait}>
            {activeRevCard ? (
              <View style={{
                width: 112, height: 112, borderRadius: 56,
                borderWidth: 2, borderColor: blockColors[activeBlock.id]?.base ?? theme.green,
                backgroundColor: theme.bg3,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Svg width={56} height={56} viewBox="0 0 44 44">
                  <Path
                    d="M22 4 L40 22 L22 40 L4 22 Z"
                    stroke={blockColors[activeBlock.id]?.base ?? theme.green}
                    strokeWidth="1.5"
                    fill="none"
                  />
                </Svg>
              </View>
            ) : (
              <PortraitCircle authorId={activeAuthor!.id} size={112} />
            )}
          </View>

          <View style={styles.blockChip}>
            <Text style={styles.blockChipText}>{activeBlock.name}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={[styles.continueAuthorName, { maxWidth: '60%', flexWrap: 'wrap' }]}>
              {formatTitle(activeEntry.data.id, activeRevCard ? activeRevCard.name : activeAuthor!.name)}
            </Text>
            {(activeRevCard ? activeRevCard.dates : activeAuthor!.dates)?.trim() ? (
              <Text style={styles.continueDates}>
                {activeRevCard ? activeRevCard.dates : activeAuthor!.dates}
              </Text>
            ) : null}
          </View>

          <>
            <View style={styles.layerRow}>
              {((activeRevCard || isTwoLayer)
                ? [{ key: 'surface' as const, label: 'Entrada' }, { key: 'concept' as const, label: 'Profundidad' }]
                : LAYERS
              ).map(({ key, label }) => {
                const prog = activeRevCard ? (progress[activeRevCard.id] ?? {}) : activeProg;
                const done = !!(prog[key]);
                return (
                  <View key={key} style={[styles.layerChip, done && styles.layerChipDone]}>
                    <Text style={[styles.layerChipText, done && styles.layerChipTextDone]}>
                      {done ? `${label} ✓` : label}
                    </Text>
                  </View>
                );
              })}
            </View>

            {!activeRevCard && (
              <Text style={styles.layerCount}>
                Capa {currentLayer} de {isTwoLayer ? 2 : 3}
              </Text>
            )}
          </>

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
        <View style={[styles.section, { paddingBottom: 9, marginBottom: 0 }]}>
          <Text style={[styles.sectionLabel, { marginBottom: 0 }]}>Últimos conceptos</Text>
          <View style={{ position: 'relative', overflow: 'hidden', paddingBottom: 8 }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.conceptsRow}
              style={{ overflow: 'visible' }}
            >
              {lastConcepts.map(term => {
                const termAuthor = authors.find(a => a.id === term.authorId);
                const termBlock  = blocks.find(b => b.authors.includes(term.authorId));
                return (
                  <TouchableOpacity
                    key={term.id}
                    style={styles.conceptChip}
                    onPress={() => setSelectedTerm(term)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.conceptBlock} numberOfLines={1}>{termBlock?.name}</Text>
                    <Text style={styles.conceptTerm}>{term.term}</Text>
                    <Text style={styles.conceptAuthor} numberOfLines={1}>{termAuthor?.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <LinearGradient
              colors={[isDark ? '#0f0f0e' : '#f0ece3', isDark ? '#0f0f0e00' : '#f0ece300']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 32, zIndex: 2, pointerEvents: 'none' }}
            />
            <LinearGradient
              colors={[isDark ? '#0f0f0e00' : '#f0ece300', isDark ? '#0f0f0e' : '#f0ece3']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 32, zIndex: 2, pointerEvents: 'none' }}
            />
          </View>
        </View>
      )}

      {/* ── PRÓXIMO EN EL CAMINO ───────────────────────────────────────────── */}
      {nextEntry && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Próximo en el camino</Text>
          <TouchableOpacity
            style={[styles.nextCard, { flexDirection: 'row', alignItems: 'center' }, !isActiveComplete && { opacity: 0.5 }]}
            onPress={isActiveComplete
              ? () => router.push(`/autor/${nextEntry.data.id}`)
              : () => Alert.alert('Pendiente', `Completa "${activeRevCard ? activeRevCard.name : activeAuthor?.name}" primero para continuar`)
            }
            activeOpacity={0.85}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.nextBlockChip}>
                <Text style={styles.nextBlockChipText}>{nextBlock?.name}</Text>
              </View>
              <Text style={styles.nextAuthorName}>
                {formatTitle(nextEntry.data.id, nextRevCard ? nextRevCard.name : nextAuthor!.name)}
              </Text>
              <Text style={styles.nextDates}>
                {nextRevCard ? nextRevCard.dates : nextAuthor!.dates}
              </Text>
            </View>
            <View style={{ marginRight: 20, overflow: 'hidden', borderRadius: 40 }}>
              {nextRevCard ? (
                <View style={{
                  width: 80, height: 80, borderRadius: 40,
                  borderWidth: 2, borderColor: blockColors[nextBlock?.id ?? '']?.base ?? theme.green,
                  backgroundColor: theme.bg3,
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Svg width={40} height={40} viewBox="0 0 44 44">
                    <Path
                      d="M22 4 L40 22 L22 40 L4 22 Z"
                      stroke={blockColors[nextBlock?.id ?? '']?.base ?? theme.green}
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </Svg>
                </View>
              ) : (
                <PortraitCircle authorId={nextAuthor!.id} size={80} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}

    </ScrollView>

    <Modal
      visible={selectedTerm !== null}
      transparent
      animationType="fade"
      onRequestClose={() => setSelectedTerm(null)}
    >
      <View
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', padding: 20 }}
      >
        <Pressable style={StyleSheet.absoluteFillObject} onPress={() => setSelectedTerm(null)} />
        <View
          style={{ width: '100%', maxHeight: 320, backgroundColor: theme.bg2, borderRadius: 16, paddingTop: 20, paddingHorizontal: 20, paddingBottom: 28 }}
        >
          <TouchableOpacity
            onPress={() => setSelectedTerm(null)}
            style={{ position: 'absolute', top: 12, right: 12, width: 28, height: 28, borderRadius: 14, backgroundColor: theme.bg3, alignItems: 'center', justifyContent: 'center', zIndex: 1 }}
          >
            <Text style={{ fontSize: 13, color: theme.text2 }}>✕</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 20, fontFamily: 'PlayfairDisplay_700Bold', color: theme.text, marginBottom: 4, paddingRight: 32 }}>
            {selectedTerm?.term}
          </Text>
          <Text style={{ fontSize: 11, color: theme.green, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 16 }}>
            {selectedAuthor?.name ?? ''}
          </Text>

          <View style={{ maxHeight: 240 }}>
            <LinearGradient
              colors={[theme.bg2 + 'FF', theme.bg2 + 'FF', theme.bg2 + '00']}
              locations={[0, 0.4, 1]}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 22, pointerEvents: 'none', zIndex: 1 }}
            />
            <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true} nestedScrollEnabled={true} bounces={true} alwaysBounceVertical={true} style={{ height: 180 }}>
              <Text style={{ fontSize: 14, color: theme.text, lineHeight: 22, fontFamily: 'PlayfairDisplay_400Regular', paddingTop: 12, paddingBottom: 12 }}>
                {selectedTerm?.definition}
              </Text>
            </ScrollView>
            <LinearGradient
              colors={[theme.bg2 + '00', theme.bg2 + 'FF', theme.bg2 + 'FF']}
              locations={[0, 0.6, 1]}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 22, pointerEvents: 'none' }}
            />
          </View>
        </View>
      </View>
    </Modal>
    </>
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
      backgroundColor: theme.bg2,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 3,
    },
    streakChipDone: {
      backgroundColor: theme.green,
    },
    streakLabel: {
      ...typography.label,
      color: theme.text3,
    },
    streakLabelDone: {
      color: '#ffffff',
    },

    // Continuar card
    continueCard: {
      backgroundColor: theme.bg2,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: theme.border,
      paddingVertical: spacing.lg,
      paddingHorizontal: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 3,
    },
    continuePortrait: {
      position: 'absolute',
      top: 24,
      right: 24,
      zIndex: 1,
      overflow: 'hidden',
      borderRadius: 56,
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
      marginTop: 10,
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
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 3,
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
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    conceptChip: {
      width: 148,
      backgroundColor: theme.bg2,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: theme.border,
      padding: spacing.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 3,
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
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 3,
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

    // Progress bars
    progressSection: {
      paddingVertical: 12,
      gap: 16,
      marginBottom: spacing.xxl,
    },
    progressLabelRow: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      marginBottom: 4,
    },
    progressLabel: {
      ...typography.bodyXS,
      color: theme.text3,
    },
  });
}
