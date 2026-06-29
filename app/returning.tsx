import { useEffect, useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { colors } from '../constants/colors';
import { typography, spacing, radius } from '../constants/typography';
import { authors, returningContent, savableQuotes } from '../constants/data';
import { useTheme } from '../hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { HelenisticasIllustration } from '../components/IntroIllustrations';
import { SaveQuoteButton } from '../components/SaveQuoteButton';
import { appendJournalEntry, getJournalEntries, JournalEntry } from '../utils/journal';
import { getSavedQuotes, SavedQuote } from '../utils/savedQuotes';

type Theme = typeof colors.dark;

const PROGRESS_KEY               = 'psylens_progress';
const STREAK_KEY                 = 'psylens_streak';
const LAST_COMPLETED_AUTHOR_KEY  = 'psylens_last_completed_author';
const LAST_COMPLETED_DATE_KEY    = 'psylens_last_completed_date';
const RETURNING_LAST_SHOWN_KEY   = 'psylens_returning_last_shown';
const RETURNING_LAST_TYPE_KEY    = 'psylens_returning_last_type';
const RETURNING_LAST_AUTHOR_KEY  = 'psylens_returning_last_author';
const RETURNING_DEBUG_FORCE_KEY  = 'psylens_returning_debug_force';
const TYPE5_LAST_SHOWN_KEY       = 'psylens_type5_last_shown';

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

const AUTHOR_NAMES: Record<string, string> = Object.fromEntries(authors.map(a => [a.id, a.name]));

const PORTRAITS: Record<string, number | null> = {
  'heraclito-democrito': require('../assets/portraits/heraclito.png'),
  'platon':       require('../assets/portraits/platon.png'),
  'aristoteles':  require('../assets/portraits/aristoteles.png'),
  'helenisticas': null,
  'hipocrates':   require('../assets/portraits/hipocrates.png'),
  'avicena':      require('../assets/portraits/avicena.png'),
  'descartes':    require('../assets/portraits/descartes.png'),
  'spinoza':      require('../assets/portraits/spinoza.png'),
  'kant':         require('../assets/portraits/kant.png'),
  'schopenhauer': require('../assets/portraits/schopenhauer.png'),
  'darwin':       require('../assets/portraits/darwin.png'),
  'ebbinghaus':   require('../assets/portraits/ebbinghaus.png'),
  'fechner':      require('../assets/portraits/fechner.png'),
  'wundt':        require('../assets/portraits/wundt.png'),
  'james':        require('../assets/portraits/james.png'),
  'thorndike':    require('../assets/portraits/thorndike.png'),
};

function getStreakPhrase(n: number): string {
  const exact = returningContent.streakPhrases.find(p => p.days === n);
  if (exact) return exact.text;
  if (n >= 50) return `Llevas ${n} días. Este recorrido ya es tuyo.`;
  return `Llevas ${n} días seguidos. El recorrido sigue contigo.`;
}

type Selection =
  | { kind: 'skip' }
  | { kind: 1; streak: number }
  | { kind: 3; authorId: string; quoteIndex: number; recentlyCompleted: boolean }
  | { kind: 4; quotes: SavedQuote[] }
  | { kind: 5; authorId: string };

// Picks 2 saved quotes, preferring different authors when possible.
function pickTwoSavedQuotes(saved: SavedQuote[]): SavedQuote[] {
  const shuffled = [...saved].sort(() => Math.random() - 0.5);
  const first = shuffled[0];
  const second = shuffled.find(q => q.authorId !== first.authorId) ?? shuffled[1];
  return [first, second];
}

function randomQuoteIndex(): number {
  return Math.floor(Math.random() * 3);
}

// "Para [Nombre], [frase con primera letra en minúscula]"
function withAuthorPrefix(authorName: string, quote: string): string {
  const lowered = quote.charAt(0).toLowerCase() + quote.slice(1);
  return `Para ${authorName}, ${lowered}`;
}

async function resolveSelection(): Promise<Selection> {
  const today     = todayISO();
  const yesterday = isoOffset(today, -1);

  const [
    rawProgress, lastShown, lastType, lastAuthor,
    lastCompletedAuthor, lastCompletedDate, rawStreak, debugForce, rawType5LastShown, savedQuotes,
  ] = await Promise.all([
    AsyncStorage.getItem(PROGRESS_KEY).catch(() => null),
    AsyncStorage.getItem(RETURNING_LAST_SHOWN_KEY).catch(() => null),
    AsyncStorage.getItem(RETURNING_LAST_TYPE_KEY).catch(() => null),
    AsyncStorage.getItem(RETURNING_LAST_AUTHOR_KEY).catch(() => null),
    AsyncStorage.getItem(LAST_COMPLETED_AUTHOR_KEY).catch(() => null),
    AsyncStorage.getItem(LAST_COMPLETED_DATE_KEY).catch(() => null),
    AsyncStorage.getItem(STREAK_KEY).catch(() => null),
    AsyncStorage.getItem(RETURNING_DEBUG_FORCE_KEY).catch(() => null),
    AsyncStorage.getItem(TYPE5_LAST_SHOWN_KEY).catch(() => null),
    getSavedQuotes().catch(() => [] as SavedQuote[]),
  ]);

  const progress = rawProgress ? JSON.parse(rawProgress) : {};
  const completedAuthorIds = authors.filter(a => isComplete(progress, a.id)).map(a => a.id);

  if (debugForce) {
    await AsyncStorage.removeItem(RETURNING_DEBUG_FORCE_KEY).catch(() => {});
    const forcedType = parseInt(debugForce, 10);
    const forced = resolveDebugForcedSelection(
      forcedType, completedAuthorIds, rawStreak, lastCompletedAuthor, lastCompletedDate, today, savedQuotes,
    );
    if (forced) return persistSelection(forced, today);
    if (forcedType === 4) {
      Alert.alert('Debug', 'Necesitas al menos 2 frases guardadas para ver esta pantalla.');
      return { kind: 'skip' };
    }
  }

  if (lastShown === today) return { kind: 'skip' };

  if (completedAuthorIds.length === 0) return { kind: 'skip' };

  let selection: Selection | null = null;

  // Priority 1 — streak
  const streak = rawStreak ? parseInt(rawStreak, 10) : 0;
  if (streak >= 2 && !(lastShown === yesterday && lastType === '1')) {
    selection = { kind: 1, streak };
  }

  // Priority 2 — "Tu recorrido hasta ahora" — probabilistic, needs 2+ saved quotes
  if (!selection && savedQuotes.length >= 2 && Math.random() < 0.25) {
    selection = { kind: 4, quotes: pickTwoSavedQuotes(savedQuotes) };
  }

  // Bank — random completed author, avoiding yesterday's pick. Kind is decided
  // before the author so Type 5 can draw from its own (spacing-restricted) pool.
  if (!selection) {
    const type5LastShown: Record<string, string> = rawType5LastShown ? JSON.parse(rawType5LastShown) : {};
    const type5Cutoff = isoOffset(today, -13);

    const quoteBank = completedAuthorIds.filter(id => savableQuotes[id]);
    const reflectionBank = completedAuthorIds
      .filter(id => returningContent.reflectionQuestions[id])
      .filter(id => !type5LastShown[id] || type5LastShown[id] < type5Cutoff);

    const pickQuote = () => {
      const pool = quoteBank.length > 1 ? quoteBank.filter(id => id !== lastAuthor) : quoteBank;
      const chosenAuthor = pool[Math.floor(Math.random() * pool.length)];
      const recentlyCompleted = chosenAuthor === lastCompletedAuthor
        && !!lastCompletedDate && lastCompletedDate >= isoOffset(today, -2);
      return { kind: 3 as const, authorId: chosenAuthor, quoteIndex: randomQuoteIndex(), recentlyCompleted };
    };
    const pickReflection = () => {
      const pool = reflectionBank.length > 1 ? reflectionBank.filter(id => id !== lastAuthor) : reflectionBank;
      const chosenAuthor = pool[Math.floor(Math.random() * pool.length)];
      return { kind: 5 as const, authorId: chosenAuthor };
    };

    if (Math.random() < 0.5 && quoteBank.length > 0) {
      selection = pickQuote();
    } else if (reflectionBank.length > 0) {
      selection = pickReflection();
    } else if (quoteBank.length > 0) {
      selection = pickQuote();
    }
  }

  if (!selection) return { kind: 'skip' };

  return persistSelection(selection, today);
}

async function persistSelection(selection: Selection, today: string): Promise<Selection> {
  const writes: Promise<void>[] = [
    AsyncStorage.setItem(RETURNING_LAST_SHOWN_KEY, today),
    AsyncStorage.setItem(RETURNING_LAST_TYPE_KEY, String(selection.kind)),
  ];
  if ('authorId' in selection) {
    writes.push(AsyncStorage.setItem(RETURNING_LAST_AUTHOR_KEY, selection.authorId));
  }
  if (selection.kind === 5) {
    writes.push(updateType5LastShown(selection.authorId, today));
  }
  await Promise.all(writes).catch(() => {});

  return selection;
}

async function updateType5LastShown(authorId: string, today: string): Promise<void> {
  const raw = await AsyncStorage.getItem(TYPE5_LAST_SHOWN_KEY).catch(() => null);
  const map: Record<string, string> = raw ? JSON.parse(raw) : {};
  map[authorId] = today;
  await AsyncStorage.setItem(TYPE5_LAST_SHOWN_KEY, JSON.stringify(map));
}

function pickRandomAuthorWithQuotes(completedAuthorIds: string[]): string | null {
  const pool = completedAuthorIds.filter(id => savableQuotes[id]);
  if (pool.length > 0) return pool[Math.floor(Math.random() * pool.length)];
  return completedAuthorIds[0] ?? null;
}

function pickRandomAuthorWithReflection(completedAuthorIds: string[]): string | null {
  const pool = completedAuthorIds.filter(id => returningContent.reflectionQuestions[id]);
  if (pool.length > 0) return pool[Math.floor(Math.random() * pool.length)];
  return null;
}

function resolveDebugForcedSelection(
  type: number,
  completedAuthorIds: string[],
  rawStreak: string | null,
  lastCompletedAuthor: string | null,
  lastCompletedDate: string | null,
  today: string,
  savedQuotes: SavedQuote[],
): Selection | null {
  switch (type) {
    case 1: {
      const streak = rawStreak ? parseInt(rawStreak, 10) : 0;
      return { kind: 1, streak: streak >= 2 ? streak : 3 };
    }
    case 2: {
      const authorId = pickRandomAuthorWithQuotes(completedAuthorIds);
      if (!authorId) return null;
      const recentlyCompleted = authorId === lastCompletedAuthor
        && !!lastCompletedDate && lastCompletedDate >= isoOffset(today, -2);
      return { kind: 3, authorId, quoteIndex: randomQuoteIndex(), recentlyCompleted };
    }
    case 4: {
      return savedQuotes.length >= 2 ? { kind: 4, quotes: pickTwoSavedQuotes(savedQuotes) } : null;
    }
    case 5: {
      const authorId = pickRandomAuthorWithReflection(completedAuthorIds);
      return authorId ? { kind: 5, authorId } : null;
    }
    default:
      return null;
  }
}

function PortraitCircle({ authorId, size, theme, isDark, borderWidth = 2 }: { authorId: string; size: number; theme: Theme; isDark: boolean; borderWidth?: number }) {
  const [errored, setErrored] = useState(false);
  const source = PORTRAITS[authorId];

  if (authorId === 'helenisticas') {
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden' }}>
        <HelenisticasIllustration size={size} isDark={isDark} />
      </View>
    );
  }

  if (!source || errored) {
    const initial = (AUTHOR_NAMES[authorId] ?? '?').trim().charAt(0).toUpperCase();
    return (
      <View style={{
        width: size, height: size, borderRadius: size / 2,
        borderWidth, borderColor: theme.green,
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
      borderWidth, borderColor: theme.green,
      backgroundColor: theme.bg3, overflow: 'hidden',
    }}>
      <Image source={source} style={{ width: size, height: size }} resizeMode="cover" onError={() => setErrored(true)} />
    </View>
  );
}

export default function ReturningScreen() {
  const { theme, isDark } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const [selection, setSelection]     = useState<Selection | null>(null);
  const [savedQuotesCount, setSavedQuotesCount] = useState(0);
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [reflectionSaved, setReflectionSaved]   = useState(false);
  const [previousReflection, setPreviousReflection] = useState<JournalEntry | null>(null);

  async function handleSaveReflection() {
    if (selection?.kind !== 5 || !reflectionAnswer.trim()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setReflectionSaved(true);
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
      setSelection(sel);
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!selection || selection.kind !== 5) return;
    let active = true;
    getJournalEntries(selection.authorId).then(entries => {
      if (!active) return;
      const question = returningContent.reflectionQuestions[selection.authorId];
      const matches = entries.filter(e => e.question === question);
      setPreviousReflection(matches.length > 0 ? matches[matches.length - 1] : null);
    }).catch(() => {});
    return () => { active = false; };
  }, [selection]);

  if (!selection || selection.kind === 'skip') {
    return <SafeAreaView style={styles.safe} />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.content}>
          {selection.kind === 1 && (
            <View style={styles.streakBlock}>
              <Text style={styles.streakNumber}>{selection.streak}</Text>
              <Text style={styles.streakUnit}>días seguidos</Text>
              <Text style={styles.streakPhrase}>{getStreakPhrase(selection.streak)}</Text>
            </View>
          )}

          {selection.kind === 3 && (
            <View style={styles.quoteBlock}>
              <View style={{ marginBottom: 28 }}>
                <PortraitCircle authorId={selection.authorId} size={140} borderWidth={4} theme={theme} isDark={isDark} />
              </View>
              {selection.recentlyCompleted ? (
                <Text style={styles.introLine}>
                  Ya conociste a {AUTHOR_NAMES[selection.authorId]}.
                </Text>
              ) : (
                <Text style={styles.authorName}>{AUTHOR_NAMES[selection.authorId]}</Text>
              )}
              <Text style={styles.quoteType2}>
                "{withAuthorPrefix(AUTHOR_NAMES[selection.authorId], savableQuotes[selection.authorId][selection.quoteIndex])}"
              </Text>
              <SaveQuoteButton
                authorId={selection.authorId}
                authorName={AUTHOR_NAMES[selection.authorId]}
                quote={savableQuotes[selection.authorId][selection.quoteIndex]}
                onSaved={() => setSavedQuotesCount(c => c + 1)}
                onUnsaved={() => setSavedQuotesCount(c => c - 1)}
                style={{ marginTop: 8 }}
                heartStyle={{ fontSize: 16 }}
                labelStyle={{ fontSize: 16, fontWeight: '600' }}
              />
            </View>
          )}

          {selection.kind === 4 && (
            <View style={styles.type4Block}>
              <Text style={styles.type4Heart}>♥</Text>
              <Text style={styles.type4Heading}>Tu recorrido hasta ahora</Text>
              {selection.quotes.map((q, i) => (
                <View key={`${q.authorId}-${i}`} style={i === 1 ? styles.type4QuoteEntryWithDivider : styles.type4QuoteEntry}>
                  <Text style={styles.type4QuoteText}>"{q.quote}"</Text>
                  <Text style={styles.type4QuoteAuthor}>{q.authorName}</Text>
                </View>
              ))}
            </View>
          )}

          {selection.kind === 5 && (
            <View style={styles.quoteBlock}>
              <View style={{ marginBottom: 28 }}>
                <PortraitCircle authorId={selection.authorId} size={140} borderWidth={4} theme={theme} isDark={isDark} />
              </View>
              <Text style={[styles.authorName, { marginBottom: 10 }]}>{AUTHOR_NAMES[selection.authorId]}</Text>
              {previousReflection && (
                <Text style={styles.repeatNotice}>{'Ya respondiste esto antes.\n¿Qué dirías hoy?'}</Text>
              )}
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
            </View>
          )}
        </View>

        {(savedQuotesCount > 0 || reflectionSaved) && (
          <TouchableOpacity
            style={styles.viewDiaryButton}
            onPress={() => router.push('/(tabs)/diario?tab=frases')}
            activeOpacity={0.7}
          >
            <Text style={styles.viewDiaryButtonText}>Ver mi diario</Text>
          </TouchableOpacity>
        )}

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={() => router.replace('/(tabs)')}
        >
          <LinearGradient
            colors={['#1a8a6a', '#0F6E56', '#0a5a45']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
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
    streakBlock: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    streakNumber: {
      fontFamily: 'PlayfairDisplay_700Bold',
      fontSize: 135,
      color: '#0F6E56',
      textAlign: 'center',
    },
    streakUnit: {
      fontSize: 21,
      color: theme.text2,
      letterSpacing: 1,
      marginTop: 8,
      textAlign: 'center',
    },
    streakPhrase: {
      ...typography.h2,
      fontFamily: 'PlayfairDisplay_400Regular_Italic',
      fontWeight: '400',
      fontStyle: 'italic',
      fontSize: 22,
      color: theme.text,
      textAlign: 'center',
      lineHeight: 32,
      marginTop: 18,
      maxWidth: 260,
    },

    // Type 2/3 — isolated layout (own block, no shared content gap)
    quoteBlock: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Type 4 — "Tu recorrido hasta ahora"
    type4Block: {
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 300,
    },
    type4Heart: {
      fontSize: 40,
      color: '#0F6E56',
      textAlign: 'center',
      marginBottom: 24,
    },
    type4Heading: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text2,
      textAlign: 'center',
      marginBottom: 20,
    },
    type4QuoteEntry: {
      alignItems: 'center',
    },
    type4QuoteEntryWithDivider: {
      alignItems: 'center',
      marginTop: 20,
      paddingTop: 20,
      borderTopWidth: 0.5,
      borderTopColor: theme.border,
    },
    type4QuoteText: {
      fontFamily: 'Georgia',
      fontStyle: 'italic',
      fontSize: 18,
      lineHeight: 25,
      color: theme.text,
      textAlign: 'center',
    },
    type4QuoteAuthor: {
      fontSize: 13,
      color: theme.text2,
      marginTop: 6,
      textAlign: 'center',
    },

    // Type 2 — framing line
    introLine: {
      ...typography.bodyS,
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
      maxWidth: 300,
      color: theme.text2,
      textAlign: 'center',
    },
    authorName: {
      ...typography.h3,
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 8,
      color: theme.text,
      textAlign: 'center',
    },

    // Type 5 — reflection question
    phrase: {
      ...typography.h2,
      fontFamily: 'PlayfairDisplay_400Regular_Italic',
      fontWeight: '400',
      fontStyle: 'italic',
      fontSize: 20,
      lineHeight: 29,
      maxWidth: 270,
      color: theme.text,
      textAlign: 'center',
      marginBottom: 17,
    },

    // Type 2/3 — quote (smaller, capped width)
    quoteType2: {
      ...typography.h2,
      fontFamily: 'PlayfairDisplay_400Regular_Italic',
      fontWeight: '400',
      fontStyle: 'italic',
      fontSize: 20,
      lineHeight: 29,
      maxWidth: 280,
      color: theme.text,
      textAlign: 'center',
    },

    // Type 5 — previous answer (revisit)
    repeatNotice: {
      ...typography.bodyXS,
      fontSize: 18,
      lineHeight: 24,
      color: theme.text3,
      textAlign: 'center',
      marginBottom: 8,
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
      borderRadius: radius.lg,
      paddingVertical: spacing.xl,
      alignItems: 'center',
      overflow: 'hidden',
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
