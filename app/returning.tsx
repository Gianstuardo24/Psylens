import { useEffect, useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { colors } from '../constants/colors';
import { typography, spacing, radius } from '../constants/typography';
import { authors, blocks, subBlocks, returningContent, savableQuotes } from '../constants/data';
import { useTheme } from '../hooks/useTheme';
import { SaveQuoteButton } from '../components/SaveQuoteButton';
import { appendJournalEntry } from '../utils/journal';

type Theme = typeof colors.dark;

const PROGRESS_KEY               = 'psylens_progress';
const STREAK_KEY                 = 'psylens_streak';
const DAYS_VISITED_KEY           = 'psylens_days_visited';
const LAST_COMPLETED_AUTHOR_KEY  = 'psylens_last_completed_author';
const LAST_COMPLETED_DATE_KEY    = 'psylens_last_completed_date';
const RETURNING_LAST_SHOWN_KEY   = 'psylens_returning_last_shown';
const RETURNING_LAST_TYPE_KEY    = 'psylens_returning_last_type';
const RETURNING_LAST_AUTHOR_KEY  = 'psylens_returning_last_author';

type LayerProgress = { surface?: boolean; concept?: boolean; fondo?: boolean };
type ProgressMap   = Record<string, LayerProgress>;

function isComplete(prog: ProgressMap, authorId: string): boolean {
  const p = prog[authorId];
  return !!(p?.surface && p?.concept && p?.fondo);
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function isoOffset(iso: string, days: number): string {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function getCurrentWeekDays(): { iso: string; label: string }[] {
  const DOW = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  const today = new Date();
  const dow = today.getDay();
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

// Journey order — mirrors the Dashboard/Camino sequencing: subBlock author
// order where a sub-block exists, otherwise the block's raw author order.
function buildOrderedAuthorIds(): string[] {
  const result: string[] = [];
  for (const block of blocks) {
    const blockAuthorSet = new Set(block.authors);
    const blockSubBlocks = subBlocks.filter(sb => sb.blockId === block.id);
    if (blockSubBlocks.length > 0) {
      for (const sb of blockSubBlocks) {
        for (const id of sb.authorIds) {
          if (blockAuthorSet.has(id)) result.push(id);
        }
      }
    } else {
      result.push(...block.authors);
    }
  }
  return result;
}

const ORDERED_AUTHOR_IDS = buildOrderedAuthorIds();
const AUTHOR_NAMES: Record<string, string> = Object.fromEntries(authors.map(a => [a.id, a.name]));

const PORTRAITS: Record<string, number> = {
  'heraclito-democrito': require('../assets/portraits/heraclito.png'),
  'platon':       require('../assets/portraits/platon.png'),
  'aristoteles':  require('../assets/portraits/aristoteles.png'),
  'hipocrates':   require('../assets/portraits/hipocrates.png'),
  'avicena':      require('../assets/portraits/avicena.png'),
  'descartes':    require('../assets/portraits/descartes.png'),
  'spinoza':      require('../assets/portraits/spinoza.png'),
  'kant':         require('../assets/portraits/kant.png'),
  'schopenhauer': require('../assets/portraits/schopenhauer.png'),
  'fechner':      require('../assets/portraits/fechner.png'),
  'wundt':        require('../assets/portraits/wundt.png'),
  'james':        require('../assets/portraits/james.png'),
  'watson':       require('../assets/portraits/watson.png'),
  'skinner':      require('../assets/portraits/skinner.png'),
};

function getStreakPhrase(n: number): string {
  const exact = returningContent.streakPhrases.find(p => p.days === n);
  if (exact) return exact.text;
  if (n >= 50) return `Llevas ${n} días. Este recorrido ya es tuyo.`;
  return `Llevas ${n} días seguidos. El recorrido sigue contigo.`;
}

function getProgressPhrase(remaining: number, completed: number, total: number): string {
  if (remaining <= 3 && returningContent.progressPhrases[remaining] !== undefined) {
    return returningContent.progressPhrases[remaining];
  }
  return `Llevas ${completed} de ${total} en esta etapa. Sigue.`;
}

type Selection =
  | { kind: 'skip' }
  | { kind: 1; streak: number }
  | { kind: 2; authorId: string; quoteIndex: number }
  | { kind: 3; authorId: string; quoteIndex: number }
  | { kind: 4; remaining: number; completed: number; total: number }
  | { kind: 5; authorId: string };

function randomQuoteIndex(): number {
  return Math.floor(Math.random() * 3);
}

// "Para [Nombre], [frase con primera letra en minúscula]"
function withAuthorPrefix(authorName: string, quote: string): string {
  const lowered = quote.charAt(0).toLowerCase() + quote.slice(1);
  return `Para ${authorName}, ${lowered}`;
}

function findActiveAuthorId(progress: ProgressMap): string | null {
  return ORDERED_AUTHOR_IDS.find(id => !isComplete(progress, id)) ?? null;
}

async function resolveSelection(): Promise<Selection> {
  const today     = todayISO();
  const yesterday = isoOffset(today, -1);

  const [
    rawProgress, lastShown, lastType, lastAuthor,
    lastCompletedAuthor, lastCompletedDate, rawStreak,
  ] = await Promise.all([
    AsyncStorage.getItem(PROGRESS_KEY).catch(() => null),
    AsyncStorage.getItem(RETURNING_LAST_SHOWN_KEY).catch(() => null),
    AsyncStorage.getItem(RETURNING_LAST_TYPE_KEY).catch(() => null),
    AsyncStorage.getItem(RETURNING_LAST_AUTHOR_KEY).catch(() => null),
    AsyncStorage.getItem(LAST_COMPLETED_AUTHOR_KEY).catch(() => null),
    AsyncStorage.getItem(LAST_COMPLETED_DATE_KEY).catch(() => null),
    AsyncStorage.getItem(STREAK_KEY).catch(() => null),
  ]);

  if (lastShown === today) return { kind: 'skip' };

  const progress = rawProgress ? JSON.parse(rawProgress) : {};
  const completedAuthorIds = authors.filter(a => isComplete(progress, a.id)).map(a => a.id);

  if (completedAuthorIds.length === 0) return { kind: 'skip' };

  let selection: Selection | null = null;

  // Priority 1 — streak
  const streak = rawStreak ? parseInt(rawStreak, 10) : 0;
  if (streak >= 2 && !(lastShown === yesterday && lastType === '1')) {
    selection = { kind: 1, streak };
  }

  // Priority 2 — author completed yesterday
  if (!selection && lastCompletedDate === yesterday && lastCompletedAuthor
      && savableQuotes[lastCompletedAuthor]) {
    selection = { kind: 2, authorId: lastCompletedAuthor, quoteIndex: randomQuoteIndex() };
  }

  // Priority 3 — sub-block progress
  if (!selection) {
    const activeAuthorId = findActiveAuthorId(progress);
    if (activeAuthorId === null) {
      selection = { kind: 4, remaining: 0, completed: 0, total: 0 };
    } else {
      const subBlock = subBlocks.find(sb => sb.authorIds.includes(activeAuthorId));
      if (subBlock) {
        const ids       = subBlock.authorIds.filter(id => ORDERED_AUTHOR_IDS.includes(id));
        const completed = ids.filter(id => isComplete(progress, id)).length;
        const remaining = ids.length - completed;
        if (remaining > 0 && remaining <= 3) {
          selection = { kind: 4, remaining, completed, total: ids.length };
        }
      }
    }
  }

  // Bank — random completed author with available content, avoiding yesterday's pick
  if (!selection) {
    const bank = completedAuthorIds.filter(id => savableQuotes[id]);
    if (bank.length > 0) {
      const pool = bank.length > 1 ? bank.filter(id => id !== lastAuthor) : bank;
      const chosenAuthor = pool[Math.floor(Math.random() * pool.length)];
      selection = Math.random() < 0.5
        ? { kind: 3, authorId: chosenAuthor, quoteIndex: randomQuoteIndex() }
        : { kind: 5, authorId: chosenAuthor };
    }
  }

  if (!selection) return { kind: 'skip' };

  const writes: Promise<void>[] = [
    AsyncStorage.setItem(RETURNING_LAST_SHOWN_KEY, today),
    AsyncStorage.setItem(RETURNING_LAST_TYPE_KEY, String(selection.kind)),
  ];
  if ('authorId' in selection) {
    writes.push(AsyncStorage.setItem(RETURNING_LAST_AUTHOR_KEY, selection.authorId));
  }
  await Promise.all(writes).catch(() => {});

  return selection;
}

function PortraitCircle({ authorId, size, theme }: { authorId: string; size: number; theme: Theme }) {
  const [errored, setErrored] = useState(false);
  const source = PORTRAITS[authorId];

  if (!source || errored) {
    const initial = (AUTHOR_NAMES[authorId] ?? '?').trim().charAt(0).toUpperCase();
    return (
      <View style={{
        width: size, height: size, borderRadius: size / 2,
        borderWidth: 2, borderColor: theme.green,
        backgroundColor: theme.bg3, alignItems: 'center', justifyContent: 'center',
      }}>
        <Text style={{ fontSize: size * 0.36, fontFamily: 'PlayfairDisplay_700Bold', color: theme.green }}>
          {initial}
        </Text>
      </View>
    );
  }

  return (
    <View style={{
      width: size, height: size, borderRadius: size / 2,
      borderWidth: 2, borderColor: theme.green,
      backgroundColor: theme.bg3, overflow: 'hidden',
    }}>
      <Image source={source} style={{ width: size, height: size }} resizeMode="cover" onError={() => setErrored(true)} />
    </View>
  );
}

export default function ReturningScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const [selection, setSelection]     = useState<Selection | null>(null);
  const [daysVisited, setDaysVisited] = useState<string[]>([]);
  const [justSaved, setJustSaved]             = useState(false);
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [reflectionSaved, setReflectionSaved]   = useState(false);

  async function handleSaveReflection() {
    if (selection?.kind !== 5 || !reflectionAnswer.trim()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setReflectionSaved(true);
    setJustSaved(true);
    await appendJournalEntry({
      authorId:   selection.authorId,
      authorName: AUTHOR_NAMES[selection.authorId],
      question:   returningContent.reflectionQuestions[selection.authorId],
      answer:     reflectionAnswer.trim(),
      date:       todayISO(),
    });
  }

  useEffect(() => {
    let active = true;
    (async () => {
      const sel = await resolveSelection();
      if (!active) return;
      if (sel.kind === 'skip') {
        router.replace('/(tabs)');
        return;
      }
      if (sel.kind === 1) {
        const raw = await AsyncStorage.getItem(DAYS_VISITED_KEY).catch(() => null);
        if (active) setDaysVisited(raw ? JSON.parse(raw) : []);
      }
      setSelection(sel);
    })();
    return () => { active = false; };
  }, []);

  if (!selection || selection.kind === 'skip') {
    return <SafeAreaView style={styles.safe} />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.content}>
          {selection.kind === 1 && (
            <>
              <Text style={styles.streakHeading}>
                {selection.streak} {selection.streak === 1 ? 'día' : 'días'} seguidos
              </Text>
              <View style={styles.streakRow}>
                {getCurrentWeekDays().map(({ iso, label }) => {
                  const done = daysVisited.includes(iso);
                  return (
                    <View key={iso} style={[styles.streakChip, done && styles.streakChipDone]}>
                      <Text style={[styles.streakLabel, done && styles.streakLabelDone]}>{label}</Text>
                    </View>
                  );
                })}
              </View>
              <Text style={styles.phrase}>{getStreakPhrase(selection.streak)}</Text>
            </>
          )}

          {(selection.kind === 2 || selection.kind === 3) && (
            <>
              <PortraitCircle authorId={selection.authorId} size={120} theme={theme} />
              {selection.kind === 2 ? (
                <Text style={styles.introLine}>
                  Ayer conociste a {AUTHOR_NAMES[selection.authorId]}.
                </Text>
              ) : (
                <Text style={styles.authorName}>{AUTHOR_NAMES[selection.authorId]}</Text>
              )}
              <Text style={styles.phrase}>
                "{withAuthorPrefix(AUTHOR_NAMES[selection.authorId], savableQuotes[selection.authorId][selection.quoteIndex])}"
              </Text>
              <Text style={styles.quoteCaption}>inspirada en su pensamiento</Text>
              <SaveQuoteButton
                authorId={selection.authorId}
                authorName={AUTHOR_NAMES[selection.authorId]}
                quote={savableQuotes[selection.authorId][selection.quoteIndex]}
                onSaved={() => setJustSaved(true)}
              />
            </>
          )}

          {selection.kind === 4 && (
            <>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, {
                  width: selection.total > 0 ? `${Math.round((selection.completed / selection.total) * 100)}%` : '100%',
                }]} />
              </View>
              <Text style={styles.progressPhrase}>
                {getProgressPhrase(selection.remaining, selection.completed, selection.total)}
              </Text>
            </>
          )}

          {selection.kind === 5 && (
            <>
              <PortraitCircle authorId={selection.authorId} size={120} theme={theme} />
              <Text style={styles.introLine}>Sobre {AUTHOR_NAMES[selection.authorId]}...</Text>
              <Text style={styles.phrase}>{returningContent.reflectionQuestions[selection.authorId]}</Text>
              <TextInput
                style={styles.reflectionInput}
                multiline
                value={reflectionAnswer}
                onChangeText={setReflectionAnswer}
                placeholder="Escribe tu respuesta (opcional)..."
                placeholderTextColor={theme.text3}
                textAlignVertical="top"
                editable={!reflectionSaved}
              />
              {reflectionAnswer.trim().length > 0 && !reflectionSaved && (
                <TouchableOpacity style={styles.saveReflectionButton} onPress={handleSaveReflection} activeOpacity={0.85}>
                  <Text style={styles.saveReflectionButtonText}>Guardar respuesta</Text>
                </TouchableOpacity>
              )}
              {reflectionSaved && (
                <Text style={styles.reflectionSavedText}>Respuesta guardada en tu diario</Text>
              )}
            </>
          )}
        </View>

        {justSaved && (
          <TouchableOpacity
            style={styles.viewDiaryButton}
            onPress={() => router.push('/(tabs)/diario?tab=diario')}
            activeOpacity={0.7}
          >
            <Text style={styles.viewDiaryButtonText}>Ver mi diario</Text>
          </TouchableOpacity>
        )}

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.buttonText}>Continuar →</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingHorizontal: spacing.xxl,
      paddingBottom: spacing.xxl,
      justifyContent: 'space-between',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.xl,
    },

    // Type 1 — streak
    streakHeading: {
      ...typography.h3,
      color: theme.green,
    },
    streakRow: {
      flexDirection: 'row',
      gap: spacing.xs,
      width: '100%',
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
      backgroundColor: theme.green,
    },
    streakLabel: {
      ...typography.label,
      color: theme.text3,
    },
    streakLabelDone: {
      color: '#ffffff',
    },

    // Type 2/3/5 — author
    introLine: {
      ...typography.bodyS,
      color: theme.text2,
      textAlign: 'center',
    },
    authorName: {
      ...typography.h3,
      color: theme.text,
      textAlign: 'center',
    },

    // Type 4 — progress
    progressTrack: {
      width: '100%',
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.bg3,
      overflow: 'hidden',
    },
    progressFill: {
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.green,
    },
    progressPhrase: {
      ...typography.h3,
      fontFamily: 'PlayfairDisplay_400Regular',
      fontWeight: '400',
      color: theme.text,
      textAlign: 'center',
      lineHeight: 28,
    },

    // Shared phrase (types 1, 2, 3, 5)
    phrase: {
      ...typography.h2,
      fontFamily: 'PlayfairDisplay_400Regular_Italic',
      fontWeight: '400',
      fontStyle: 'italic',
      color: theme.text,
      textAlign: 'center',
      lineHeight: 32,
    },

    // Type 2/3 — quote caption
    quoteCaption: {
      ...typography.bodyS,
      color: theme.text3,
      textAlign: 'center',
    },

    // Type 5 — reflection input
    reflectionInput: {
      width: '100%',
      backgroundColor: theme.bg3,
      borderRadius: radius.lg,
      padding: spacing.lg,
      ...typography.bodyS,
      color: theme.text,
      borderWidth: 1,
      borderColor: theme.border,
      minHeight: 100,
      lineHeight: 22,
    },
    saveReflectionButton: {
      backgroundColor: theme.bg3,
      borderRadius: radius.lg,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.green,
    },
    saveReflectionButtonText: {
      ...typography.bodyS,
      color: theme.green,
      fontWeight: '600',
    },
    reflectionSavedText: {
      ...typography.bodyS,
      color: theme.text3,
    },

    // "Ver mi diario" (Type 2/3/5, shown once something was saved this session)
    viewDiaryButton: {
      alignSelf: 'center',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: theme.green,
      marginBottom: spacing.md,
    },
    viewDiaryButtonText: {
      ...typography.bodyS,
      color: theme.green,
      fontWeight: '600',
    },

    button: {
      backgroundColor: theme.green,
      borderRadius: radius.lg,
      paddingVertical: spacing.xl,
      alignItems: 'center',
    },
    buttonPressed: {
      opacity: 0.8,
    },
    buttonText: {
      ...typography.body,
      color: '#ffffff',
      fontWeight: '600',
    },
  });
}
