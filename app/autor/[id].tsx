import { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, blockColors } from '../../constants/colors';
import { typography, spacing, radius } from '../../constants/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import Svg, { Path } from 'react-native-svg';
import { authors, blocks, glossaryTerms, revolutionCards, savableQuotes, subBlocks, QuizQuestion } from '../../constants/data';
import BottomSheet from '../../components/BottomSheet';
import { BlockCompleteModal } from '../../components/BlockCompleteModal';
import { PaywallSheet } from '../../components/PaywallSheet';
import { IntroIllustration } from '../../components/IntroIllustrations';
import { SaveQuoteButton } from '../../components/SaveQuoteButton';
import { useTheme } from '../../hooks/useTheme';
import { appendJournalEntry, getJournalEntries, JournalEntry } from '../../utils/journal';

type Theme = typeof colors.dark;

const GLOBAL_SEQUENCE: string[] = (() => {
  const introBlock = blocks.find(b => b.id === 'intro');
  const seq: string[] = introBlock ? [...introBlock.authors] : [];
  for (const sb of subBlocks) {
    const rev = revolutionCards.find(r => r.subBlockId === sb.id);
    if (rev) seq.push(rev.id);
    const blk = blocks.find(b => b.id === sb.blockId);
    const blockAuthorSet = blk ? new Set(blk.authors) : null;
    const visibleIds = blockAuthorSet
      ? sb.authorIds.filter(aid => blockAuthorSet.has(aid))
      : sb.authorIds;
    seq.push(...visibleIds);
  }
  return seq;
})();

const PROGRESS_KEY       = 'psylens_progress';
const UNLOCK_KEY         = 'psylens_unlocked';
const BLOCK_STARTED_KEY  = 'psylens_block_started';
const PREMIUM_KEY        = 'psylens_is_premium';
const STREAK_KEY         = 'psylens_streak';
const LAST_ACTIVE_KEY    = 'psylens_last_active';
const LAST_COMPLETED_AUTHOR_KEY = 'psylens_last_completed_author';
const LAST_COMPLETED_DATE_KEY   = 'psylens_last_completed_date';

function diffDays(isoEarlier: string, isoLater: string): number {
  const a = new Date(isoEarlier + 'T00:00:00').getTime();
  const b = new Date(isoLater   + 'T00:00:00').getTime();
  return Math.round((b - a) / 86_400_000);
}

type LayerProgress = { surface?: boolean; concept?: boolean; fondo?: boolean };
type ProgressMap   = Record<string, LayerProgress>;

// Portrait images — require() paths relative to this file (app/autor/)
// Metro bundles these statically; they must live here, not in a .ts data file.
const PORTRAIT_HERACLITO = require('../../assets/portraits/heraclito.png');
const PORTRAIT_DEMOCRITO = require('../../assets/portraits/democrito.png');

const PORTRAITS: Record<string, number | null> = {
  'heraclito-democrito': PORTRAIT_HERACLITO,
  'platon':        require('../../assets/portraits/platon.png'),
  'aristoteles':   require('../../assets/portraits/aristoteles.png'),
  'hipocrates':    require('../../assets/portraits/hipocrates.png'),
  'descartes':     require('../../assets/portraits/descartes.png'),
  'spinoza':       require('../../assets/portraits/spinoza.png'),
  'kant':          require('../../assets/portraits/kant.png'),
  'schopenhauer':  require('../../assets/portraits/schopenhauer.png'),
};

type TabKey = 'surface' | 'concept' | 'fondo' | 'reflexion';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'surface', label: 'Superficie' },
  { key: 'concept', label: 'Concepto' },
  { key: 'fondo',   label: 'Fondo' },
];

interface Term {
  id: string;
  term: string;
  authorId: string;
}

function stripAccents(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function HighlightedText({
  text,
  terms,
  onTermPress,
  styles,
}: {
  text: string;
  terms: Term[];
  onTermPress: (termId: string) => void;
  styles: { contentText: object; termLink: object };
}) {
  if (!terms.length) {
    return <Text style={styles.contentText}>{text}</Text>;
  }

  // Build the regex from accent-stripped term strings so that e.g. "noumeno"
  // matches "nóumeno" and vice-versa. The 'g' flag is enough because
  // stripAccents already lowercases everything.
  const escaped = terms.map(t =>
    stripAccents(t.term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g');
  const strippedText = stripAccents(text);

  // NFC input → NFD-then-strip preserves 1:1 index correspondence with the
  // original string, so we can slice `text` (with its accents) using the
  // indices found in `strippedText`.
  type Segment = { start: number; end: number; termId?: string };
  const segments: Segment[] = [];
  let cursor = 0;
  let m: RegExpExecArray | null;

  while ((m = pattern.exec(strippedText)) !== null) {
    const strippedMatch = m[0];
    const term = terms.find(t => stripAccents(t.term) === strippedMatch);
    if (!term) continue;
    if (m.index > cursor) segments.push({ start: cursor, end: m.index });
    segments.push({ start: m.index, end: m.index + m[0].length, termId: term.id });
    cursor = m.index + m[0].length;
  }
  if (cursor < text.length) segments.push({ start: cursor, end: text.length });

  return (
    <Text style={styles.contentText}>
      {segments.map((seg, i) => {
        const slice = text.slice(seg.start, seg.end);
        return seg.termId ? (
          <Text key={i} style={styles.termLink} onPress={() => onTermPress(seg.termId!)}>
            {slice}
          </Text>
        ) : (
          slice
        );
      })}
    </Text>
  );
}

export default function AutorScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<TabKey>('surface');
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [progress,          setProgress]          = useState<ProgressMap>({});
  const [isPremium,         setIsPremium]         = useState(false);
  const [showCelebration,   setShowCelebration]   = useState(false);
  const [showBlockComplete, setShowBlockComplete] = useState(false);
  const [blockCompleteDays, setBlockCompleteDays] = useState(1);
  const [showPaywall,       setShowPaywall]       = useState(false);
  const [pendingAuthorId,   setPendingAuthorId]   = useState<string | null>(null);

  const animScale      = useRef(new Animated.Value(0.85)).current;
  const animOpacity    = useRef(new Animated.Value(0)).current;
  const quizTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [showQuiz,       setShowQuiz]       = useState(false);
  const [quizStep,       setQuizStep]       = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [tfAnswered,     setTfAnswered]     = useState(false);
  const [tfWasCorrect,   setTfWasCorrect]   = useState(false);
  const [openAnswer,     setOpenAnswer]     = useState('');

  const [journalEntries,    setJournalEntries]    = useState<JournalEntry[]>([]);
  const [savedAnyQuote,     setSavedAnyQuote]     = useState(false);
  const savedJournalEntry = journalEntries[journalEntries.length - 1] ?? null;

  const styles = useMemo(() => makeStyles(theme), [theme]);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(PROGRESS_KEY).catch(() => null),
      AsyncStorage.getItem(PREMIUM_KEY).catch(() => null),
    ]).then(([rawProg, rawPremium]) => {
      if (rawProg) setProgress(JSON.parse(rawProg));
      setIsPremium(rawPremium === 'true');
    });
  }, []);

  useEffect(() => {
    return () => {
      if (quizTimeoutRef.current) clearTimeout(quizTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    Promise.all([
      getJournalEntries(id as string).catch(() => [] as JournalEntry[]),
      AsyncStorage.getItem(`psylens_quiz_step_${id}`).catch(() => null),
      AsyncStorage.getItem(`psylens_quiz_open_${id}`).catch(() => null),
    ]).then(([entries, rawStep, rawOpen]) => {
      setJournalEntries(entries);
      if (rawStep !== null) setQuizStep(parseInt(rawStep, 10));
      if (rawOpen) setOpenAnswer(rawOpen);
    });
  }, [id]);

  useEffect(() => {
    if (showCelebration) {
      setSavedAnyQuote(false);
      animScale.setValue(0.85);
      animOpacity.setValue(0);
      Animated.parallel([
        Animated.spring(animScale, { toValue: 1, useNativeDriver: true, damping: 15, stiffness: 180 }),
        Animated.timing(animOpacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      ]).start();
    }
  }, [showCelebration]);

  const revCard     = revolutionCards.find(r => r.id === id) ?? null;
  const author      = revCard ? null : (authors.find(a => a.id === id) ?? null);
  const block       = revCard
    ? (blocks.find(b => b.id === revCard.blockId) ?? null)
    : author ? (blocks.find(b => b.id === author.blockId) ?? null) : null;
  const authorTerms = glossaryTerms.filter(t => t.authorId === id);
  const nextDest: { id: string; name: string } | null = (() => {
    if (!author) return null;
    const pos = GLOBAL_SEQUENCE.indexOf(author.id);
    if (pos < 0 || pos >= GLOBAL_SEQUENCE.length - 1) return null;
    const nextId = GLOBAL_SEQUENCE[pos + 1];
    const nextRev = revolutionCards.find(r => r.id === nextId);
    if (nextRev) return { id: nextId, name: nextRev.name };
    const nextAuth = authors.find(a => a.id === nextId);
    return nextAuth ? { id: nextId, name: nextAuth.name } : null;
  })();

  // Block-level derived values (safe to compute before the null guard)
  const blockIdx      = block ? blocks.findIndex(b => b.id === block.id) : -1;
  const nextBlock     = blockIdx >= 0 && blockIdx < blocks.length - 1 ? blocks[blockIdx + 1] : null;
  const blockConcepts = block ? glossaryTerms.filter(t => block.authors.includes(t.authorId)).length : 0;

  // Record the first time this block is accessed so we can compute days taken
  useEffect(() => {
    if (!block || revCard) return;
    AsyncStorage.getItem(BLOCK_STARTED_KEY).then(raw => {
      const started: Record<string, string> = raw ? JSON.parse(raw) : {};
      if (!started[block.id]) {
        started[block.id] = new Date().toISOString().slice(0, 10);
        AsyncStorage.setItem(BLOCK_STARTED_KEY, JSON.stringify(started)).catch(() => {});
      }
    }).catch(() => {});
  }, [block?.id]);

  const isRevComplete = revCard ? !!progress[revCard.id]?.concept : false;

  const revFirstAuthorId = (() => {
    if (!revCard) return null;
    const pos = GLOBAL_SEQUENCE.indexOf(revCard.id);
    if (pos < 0 || pos >= GLOBAL_SEQUENCE.length - 1) return null;
    return GLOBAL_SEQUENCE[pos + 1];
  })();

  async function markRevDone() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const updated: ProgressMap = {
      ...progress,
      [revCard!.id]: { concept: true },
    };
    setProgress(updated);
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(updated)).catch(() => {});

    const today = new Date().toISOString().slice(0, 10);
    const [rawStreak, lastActive] = await Promise.all([
      AsyncStorage.getItem(STREAK_KEY).catch(() => null),
      AsyncStorage.getItem(LAST_ACTIVE_KEY).catch(() => null),
    ]);
    if (lastActive !== today) {
      const prev = rawStreak ? parseInt(rawStreak, 10) : 0;
      const newStreak = lastActive && diffDays(lastActive, today) === 1 ? prev + 1 : 1;
      await Promise.all([
        AsyncStorage.setItem(STREAK_KEY, String(newStreak)),
        AsyncStorage.setItem(LAST_ACTIVE_KEY, today),
      ]).catch(() => {});
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setShowCelebration(true);
  }

  // ─── Revolution card render ────────────────────────────────────────────────
  if (revCard) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.backButton, { top: insets.top + spacing.sm }]}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <View style={[styles.header, { paddingTop: insets.top + 48 }]}>
          <View style={styles.revIconCircle}>
            <Svg width={44} height={44} viewBox="0 0 44 44">
              <Path d="M22 4 L40 22 L22 40 L4 22 Z" stroke="#0f6e56" strokeWidth="1.5" fill="none" />
            </Svg>
          </View>
          <View style={styles.blockChip}>
            <Text style={styles.blockChipText}>{block?.name ?? ''}</Text>
          </View>
          <Text style={styles.authorName}>{revCard.name}</Text>
        </View>

        {/* Single tab */}
        <View style={styles.tabBar}>
          <View style={[styles.tabItem, { flex: 1 }]}>
            <Text style={[styles.tabLabel, styles.tabLabelActive]}>Profundidad</Text>
            <View style={styles.tabUnderline} />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 88 }]}
            showsVerticalScrollIndicator={false}
          >
            {revCard.concept.question ? (
              <>
                <Text style={styles.question}>{revCard.concept.question}</Text>
                <View style={styles.divider} />
              </>
            ) : null}
            {revCard.concept.text.split('\n\n').map((para, i) => (
              <View key={i} style={styles.paragraph}>
                <Text style={styles.contentText}>{para}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing.sm }]}>
          {isRevComplete ? (
            <>
              <TouchableOpacity style={[styles.readButton, styles.readButtonDone]} activeOpacity={1}>
                <Text style={[styles.readButtonText, styles.readButtonTextDone]}>Leído ✓</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.nextButton, { marginTop: spacing.sm }]}
                onPress={() => revFirstAuthorId ? router.replace(`/autor/${revFirstAuthorId}`) : router.back()}
                activeOpacity={0.85}
              >
                <Text style={styles.nextButtonText}>Continuar →</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.readButton} onPress={markRevDone} activeOpacity={0.85}>
              <Text style={styles.readButtonText}>Marcar como leído ✓</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Celebration modal */}
        <Modal visible={showCelebration} transparent statusBarTranslucent animationType="none">
          <View style={styles.celebOverlay}>
            <Animated.View style={[styles.celebCard, { opacity: animOpacity, transform: [{ scale: animScale }] }]}>
              <View style={styles.celebRevIcon}>
                <Svg width={48} height={48} viewBox="0 0 48 48">
                  <Path d="M24 4 L44 24 L24 44 L4 24 Z" stroke="#0f6e56" strokeWidth="2" fill="none" />
                </Svg>
              </View>
              <Text style={styles.celebBadge}>Introducción completada</Text>
              <Text style={styles.celebAuthorName}>{revCard.name}</Text>
              <Text style={styles.celebSubtitle}>Comenzar esta etapa</Text>
              <TouchableOpacity
                style={styles.celebNextButton}
                onPress={() => {
                  setShowCelebration(false);
                  if (revFirstAuthorId) router.replace(`/autor/${revFirstAuthorId}`);
                  else router.back();
                }}
                activeOpacity={0.85}
              >
                <Text style={styles.celebNextText}>Continuar →</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      </View>
    );
  }
  // ──────────────────────────────────────────────────────────────────────────

  if (!author || !block) {
    return (
      <View style={styles.errorContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backButton, { top: insets.top + spacing.sm }]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>Autor no encontrado.</Text>
      </View>
    );
  }

  const tabBg          = isDark ? (blockColors[author.blockId]?.base ?? theme.green) + '1F' : theme.bg;
  const content        = { surface: author.surface, concept: author.concept, fondo: author.fondo }[activeTab];
  const PLACEHOLDER_TEXT = 'Este contenido estará disponible pronto.';
  const isPlaceholder  = !content?.text || content.text === PLACEHOLDER_TEXT;
  const portrait       = PORTRAITS[author.id] ?? null;
  const isDual         = author.id === 'heraclito-democrito';
  const isIntroAuthor  = author.id.startsWith('intro-');
  const isTwoLayer     = author.layerType === 'two';
  const activeTabs     = isTwoLayer
    ? [{ key: 'surface' as TabKey, label: 'Entrada' }, { key: 'concept' as TabKey, label: 'Profundidad' }]
    : isAuthorComplete && hasQuiz
      ? [...TABS, { key: 'reflexion' as TabKey, label: 'Reflexión' }]
      : TABS;
  const isLastTab      = isTwoLayer ? activeTab === 'concept' : activeTab === 'fondo';

  const authorQuiz: QuizQuestion[] | undefined = (author as any)?.quiz;
  const hasQuiz  = !isIntroAuthor && Array.isArray(authorQuiz) && authorQuiz.length > 0;
  const currentQ = authorQuiz?.[quizStep] ?? null;

  const isAuthorComplete = !!(
    progress[author.id]?.surface &&
    progress[author.id]?.concept &&
    progress[author.id]?.fondo
  );

  // Concepto + Fondo are premium-gated for non-free blocks
  const isContentLocked =
    !block.isFree && !isPremium && (activeTab === 'concept' || activeTab === 'fondo');

  async function completeAuthor() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const updated: ProgressMap = {
      ...progress,
      [author!.id]: { surface: true, concept: true, fondo: true },
    };
    setProgress(updated);
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(updated)).catch(() => {});

    const today = new Date().toISOString().slice(0, 10);
    const [rawStreak, lastActive] = await Promise.all([
      AsyncStorage.getItem(STREAK_KEY).catch(() => null),
      AsyncStorage.getItem(LAST_ACTIVE_KEY).catch(() => null),
    ]);
    if (lastActive !== today) {
      const prev = rawStreak ? parseInt(rawStreak, 10) : 0;
      const newStreak = lastActive && diffDays(lastActive, today) === 1 ? prev + 1 : 1;
      await Promise.all([
        AsyncStorage.setItem(STREAK_KEY, String(newStreak)),
        AsyncStorage.setItem(LAST_ACTIVE_KEY, today),
      ]).catch(() => {});
    }

    await Promise.all([
      AsyncStorage.setItem(LAST_COMPLETED_AUTHOR_KEY, author!.id),
      AsyncStorage.setItem(LAST_COMPLETED_DATE_KEY, today),
    ]).catch(() => {});

    if (nextDest) {
      const raw      = await AsyncStorage.getItem(UNLOCK_KEY).catch(() => null);
      const unlocked: string[] = raw ? JSON.parse(raw) : [];
      if (!unlocked.includes(nextDest.id)) {
        unlocked.push(nextDest.id);
        await AsyncStorage.setItem(UNLOCK_KEY, JSON.stringify(unlocked)).catch(() => {});
      }
    }

    const blockDone = block
      ? block.authors.every(aid =>
          aid === author!.id
            ? true
            : !!(updated[aid]?.surface && updated[aid]?.concept && updated[aid]?.fondo)
        )
      : false;

    let days = 1;
    if (blockDone) {
      const raw = await AsyncStorage.getItem(BLOCK_STARTED_KEY).catch(() => null);
      const started: Record<string, string> = raw ? JSON.parse(raw) : {};
      const startStr = started[block!.id];
      days = startStr
        ? Math.max(1, Math.ceil(
            (Date.now() - new Date(startStr + 'T00:00:00').getTime()) / 86_400_000
          ))
        : 1;
    }

    if (blockDone) {
      setBlockCompleteDays(days);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setShowBlockComplete(true);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      setShowCelebration(true);
    }
  }

  async function markAllDone() {
    await completeAuthor();
  }

  async function dismissQuiz() {
    await AsyncStorage.setItem(`psylens_quiz_step_${author!.id}`, String(quizStep)).catch(() => {});
    if (openAnswer.trim()) {
      await AsyncStorage.setItem(`psylens_quiz_open_${author!.id}`, openAnswer).catch(() => {});
    }
    setShowQuiz(false);
  }

  function navigateToNext() {
    if (!nextDest) return;
    setShowCelebration(false);
    router.replace(`/autor/${nextDest.id}`);
  }

  function advanceQuiz() {
    const total = authorQuiz?.length ?? 0;
    if (quizStep < total - 1) {
      setQuizStep(s => s + 1);
      setSelectedOption(null);
      setTfAnswered(false);
      setTfWasCorrect(false);
    } else {
      finishQuiz();
    }
  }

  function handleTFAnswer(answer: boolean) {
    if (!currentQ || currentQ.type !== 'true_false') return;
    setTfWasCorrect(answer === currentQ.correct);
    setTfAnswered(true);
  }

  async function finishQuiz() {
    const openQ = authorQuiz?.find(q => q.type === 'open');
    if (openQ && openAnswer.trim().length >= 20) {
      const entries = await appendJournalEntry({
        authorId:   author!.id,
        authorName: author!.name,
        question:   openQ.question,
        answer:     openAnswer.trim(),
        date:       new Date().toISOString().slice(0, 10),
      });
      setJournalEntries(entries);
    }
    await Promise.all([
      AsyncStorage.removeItem(`psylens_quiz_step_${author!.id}`),
      AsyncStorage.removeItem(`psylens_quiz_open_${author!.id}`),
    ]).catch(() => {});
    setShowQuiz(false);
    setQuizStep(0);
    setSelectedOption(null);
    setTfAnswered(false);
    setTfWasCorrect(false);
    setOpenAnswer('');
    await completeAuthor();
  }

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={[styles.backButton, { top: insets.top + spacing.sm }]}
        onPress={() => router.back()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Centered header */}
      <View style={[styles.header, { paddingTop: insets.top + 48 }]}>
        {isDual ? (
          <View style={[styles.dualPortraitWrap, { marginBottom: spacing.lg }]}>
            <View style={styles.dualPortraitCircle}>
              <Image source={PORTRAIT_HERACLITO} style={styles.dualPortraitImage} resizeMode="cover" />
            </View>
            <View style={[styles.dualPortraitCircle, styles.dualPortraitCircleRight]}>
              <Image source={PORTRAIT_DEMOCRITO} style={styles.dualPortraitImage} resizeMode="cover" />
            </View>
          </View>
        ) : isIntroAuthor ? (
          <View style={styles.introIllustrationWrap}>
            <IntroIllustration authorId={author.id} />
          </View>
        ) : (
          <View style={styles.portraitCircle}>
            {portrait ? (
              <Image source={portrait} style={styles.portraitImage} resizeMode="cover" />
            ) : (
              <Text style={styles.portraitInitial}>{author.name[0]}</Text>
            )}
          </View>
        )}
        <View style={styles.blockChip}>
          <Text style={styles.blockChipText}>{block.name}</Text>
        </View>
        <Text style={styles.authorName}>{author.name}</Text>
        <Text style={styles.authorDates}>{author.dates}</Text>
      </View>

      {/* Tab bar */}
      <View style={[styles.tabBar, { backgroundColor: tabBg }]}>
        {activeTabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setActiveTab(tab.key);
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </Text>
            {activeTab === tab.key && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Scrollable content + lock overlay */}
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 88 }]}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === 'reflexion' ? (
            <View>
              {authorQuiz!.map((q, i) => (
                <View
                  key={i}
                  style={[styles.reflexionBlock, i === authorQuiz!.length - 1 && { borderBottomWidth: 0 }]}
                >
                  <Text style={styles.reflexionQLabel}>Pregunta {i + 1}</Text>
                  <Text style={styles.reflexionQText}>{q.question}</Text>
                  {q.type === 'multiple_choice' && q.options.map((opt, j) => (
                    <View key={j} style={styles.reflexionOption}>
                      <Text style={styles.reflexionOptionText}>{opt}</Text>
                    </View>
                  ))}
                  {q.type === 'true_false' && (
                    <View style={styles.reflexionTFRow}>
                      <View style={styles.reflexionTFChip}>
                        <Text style={styles.reflexionTFText}>Verdadero</Text>
                      </View>
                      <View style={styles.reflexionTFChip}>
                        <Text style={styles.reflexionTFText}>Falso</Text>
                      </View>
                    </View>
                  )}
                  {q.type === 'open' && (
                    <View style={styles.reflexionAnswerBox}>
                      <Text style={styles.reflexionAnswerText}>
                        {savedJournalEntry?.answer ?? '—'}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ) : isPlaceholder ? (
            <View style={styles.placeholderContainer}>
              <View style={styles.placeholderCircle}>
                {portrait ? (
                  <Image source={portrait} style={styles.placeholderPortraitImage} resizeMode="cover" />
                ) : (
                  <Text style={styles.placeholderInitial}>{author.name[0]}</Text>
                )}
              </View>
              <Text style={styles.placeholderTitle}>Contenido en preparación</Text>
              <Text style={styles.placeholderSub}>
                El contenido de este autor estará disponible próximamente.
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.question}>{content!.question}</Text>
              <View style={styles.divider} />
              {content!.text.split('\n\n').map((para, i) => (
                <View key={i} style={styles.paragraph}>
                  <HighlightedText
                    text={para}
                    terms={authorTerms}
                    onTermPress={setSelectedTermId}
                    styles={{ contentText: styles.contentText, termLink: styles.termLink }}
                  />
                </View>
              ))}
              <Text style={styles.closingLine}>{content!.closingLine}</Text>
            </>
          )}
        </ScrollView>

        {isContentLocked && (
          <View style={[StyleSheet.absoluteFillObject, styles.lockOverlay]}>
            <View style={styles.lockContent}>
              <View style={styles.lockIconCircle}>
                <Text style={styles.lockIconGlyph}>⊘</Text>
              </View>
              <Text style={styles.lockTitle}>Contenido Premium</Text>
              <Text style={styles.lockSub}>
                Desbloquea todas las capas y autores con Premium.
              </Text>
              <TouchableOpacity
                style={styles.lockButton}
                onPress={() => setShowPaywall(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.lockButtonText}>Ver planes →</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Fixed bottom bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing.sm }]}>
        {isContentLocked ? (
          <TouchableOpacity style={styles.paywallButton} onPress={() => setShowPaywall(true)} activeOpacity={0.85}>
            <Text style={styles.paywallButtonText}>Ver planes →</Text>
          </TouchableOpacity>
        ) : activeTab === 'surface' ? (
          <TouchableOpacity
            style={styles.deeperButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setActiveTab('concept');
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.deeperButtonText}>Ir más profundo →</Text>
          </TouchableOpacity>
        ) : activeTab === 'concept' && !isTwoLayer ? (
          <TouchableOpacity
            style={styles.deeperButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setActiveTab('fondo');
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.deeperButtonText}>Ir más profundo →</Text>
          </TouchableOpacity>
        ) : isLastTab && !isAuthorComplete ? (
          hasQuiz && !savedJournalEntry ? (
            <TouchableOpacity style={styles.readButton} onPress={() => setShowQuiz(true)} activeOpacity={0.85}>
              <Text style={styles.readButtonText}>Completar reflexión →</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.readButton} onPress={markAllDone} activeOpacity={0.85}>
              <Text style={styles.readButtonText}>Marcar como leído ✓</Text>
            </TouchableOpacity>
          )
        ) : (
          <>
            <TouchableOpacity style={[styles.readButton, styles.readButtonDone]} activeOpacity={1}>
              <Text style={[styles.readButtonText, styles.readButtonTextDone]}>Leído ✓</Text>
            </TouchableOpacity>
            {nextDest && (
              <TouchableOpacity style={[styles.nextButton, { marginTop: spacing.sm }]} onPress={navigateToNext} activeOpacity={0.85}>
                <Text style={styles.nextButtonText}>Siguiente →</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>

      {/* Celebration modal */}
      <Modal visible={showCelebration} transparent statusBarTranslucent animationType="none">
        <View style={styles.celebOverlay}>
          <Animated.View style={[styles.celebCard, { opacity: animOpacity, transform: [{ scale: animScale }] }]}>
            {isDual ? (
              <View style={[styles.dualPortraitWrap, { marginBottom: spacing.xl }]}>
                <View style={styles.dualPortraitCircle}>
                  <Image source={PORTRAIT_HERACLITO} style={styles.dualPortraitImage} resizeMode="cover" />
                </View>
                <View style={[styles.dualPortraitCircle, styles.dualPortraitCircleRight, { borderColor: theme.bg2 }]}>
                  <Image source={PORTRAIT_DEMOCRITO} style={styles.dualPortraitImage} resizeMode="cover" />
                </View>
              </View>
            ) : isIntroAuthor ? (
              <View style={styles.celebIntroCircle}>
                <IntroIllustration authorId={author.id} size={80} />
              </View>
            ) : (
              <View style={styles.celebCircle}>
                {portrait ? (
                  <Image source={portrait} style={styles.celebPortrait} resizeMode="cover" />
                ) : (
                  <Text style={styles.celebInitial}>{author.name[0]}</Text>
                )}
              </View>
            )}
            <Text style={styles.celebBadge}>Completado</Text>
            <Text style={styles.celebAuthorName}>{author.name}</Text>
            <Text style={styles.celebSubtitle}>{isTwoLayer ? 'Has leído las dos capas' : 'Has leído las tres capas'}</Text>

            {savableQuotes[author.id] && (
              <View style={styles.quotesSection}>
                <Text style={styles.quotesHeading}>¿Alguna de estas ideas se queda contigo?</Text>
                {savableQuotes[author.id].map((quote, i) => (
                  <View key={i} style={styles.quoteBlock}>
                    <Text style={styles.quoteText}>"{quote}"</Text>
                    <SaveQuoteButton
                      authorId={author.id}
                      authorName={author.name}
                      quote={quote}
                      onSaved={() => setSavedAnyQuote(true)}
                    />
                  </View>
                ))}
                <Text style={styles.quotesFooter}>
                  Inspiradas en el pensamiento de {author.name}
                </Text>
                {savedAnyQuote && (
                  <TouchableOpacity
                    style={styles.viewDiaryButton}
                    onPress={() => router.push('/(tabs)/glosario?tab=diario')}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.viewDiaryButtonText}>Ver mi diario</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {nextDest ? (
              <TouchableOpacity style={styles.celebNextButton} onPress={navigateToNext} activeOpacity={0.85}>
                <Text style={styles.celebNextText}>Siguiente →</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.celebDismiss}
                onPress={() => setShowCelebration(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.celebDismissText}>Volver</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        </View>
      </Modal>

      {/* Quiz modal */}
      <Modal visible={showQuiz} transparent statusBarTranslucent animationType="fade">
        <TouchableOpacity style={styles.quizOverlay} activeOpacity={1} onPress={dismissQuiz}>
          <TouchableOpacity activeOpacity={1} style={styles.quizCard} onPress={() => {}}>
            <Text style={styles.quizProgress}>Pregunta {quizStep + 1} de {authorQuiz?.length ?? 3}</Text>

            {currentQ?.type === 'multiple_choice' && (
              <>
                <Text style={styles.quizQuestion}>{currentQ.question}</Text>
                {currentQ.options.map((opt, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[styles.quizOption, selectedOption === i && styles.quizOptionSelected]}
                    onPress={() => {
                      if (selectedOption !== null) return;
                      setSelectedOption(i);
                      quizTimeoutRef.current = setTimeout(() => advanceQuiz(), 500);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.quizOptionText, selectedOption === i && styles.quizOptionTextSelected]}>
                      {opt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </>
            )}

            {currentQ?.type === 'true_false' && (
              <>
                <Text style={styles.quizQuestion}>{currentQ.question}</Text>
                {!tfAnswered ? (
                  <View style={styles.quizTFRow}>
                    <TouchableOpacity style={styles.quizTFBtn} onPress={() => handleTFAnswer(true)} activeOpacity={0.8}>
                      <Text style={styles.quizTFText}>Verdadero</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quizTFBtn} onPress={() => handleTFAnswer(false)} activeOpacity={0.8}>
                      <Text style={styles.quizTFText}>Falso</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <View style={[styles.quizFeedback, tfWasCorrect ? styles.quizFeedbackCorrect : styles.quizFeedbackWrong]}>
                      <Text style={styles.quizFeedbackLabel}>{tfWasCorrect ? '✓ Correcto' : '✗ Incorrecto'}</Text>
                      <Text style={styles.quizFeedbackText}>{currentQ.explanation}</Text>
                    </View>
                    <TouchableOpacity style={styles.quizContinue} onPress={advanceQuiz} activeOpacity={0.85}>
                      <Text style={styles.quizContinueText}>Continuar →</Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}

            {currentQ?.type === 'open' && (
              <>
                <Text style={styles.quizQuestion}>{currentQ.question}</Text>
                <TextInput
                  style={styles.quizOpenInput}
                  multiline
                  value={openAnswer}
                  onChangeText={setOpenAnswer}
                  placeholder="Escribe tu reflexión..."
                  placeholderTextColor={theme.text3}
                  textAlignVertical="top"
                />
                <TouchableOpacity
                  style={[styles.quizContinue, openAnswer.trim().length < 20 && styles.quizContinueDisabled]}
                  onPress={() => { if (openAnswer.trim().length >= 20) advanceQuiz(); }}
                  activeOpacity={openAnswer.trim().length >= 20 ? 0.85 : 1}
                >
                  <Text style={[styles.quizContinueText, openAnswer.trim().length < 20 && { color: theme.text3 }]}>
                    Continuar →
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Reusable term bottom sheet */}
      <BottomSheet
        visible={selectedTermId !== null}
        termId={selectedTermId}
        onClose={() => setSelectedTermId(null)}
      />

      {/* Premium paywall */}
      <PaywallSheet
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        onUnlock={() => {
          setIsPremium(true);
          if (pendingAuthorId) {
            const target = pendingAuthorId;
            setPendingAuthorId(null);
            setShowPaywall(false);
            router.replace(`/autor/${target}`);
          }
        }}
      />

      {/* Block completion celebration */}
      {block && (
        <BlockCompleteModal
          visible={showBlockComplete}
          block={block}
          nextBlock={nextBlock}
          nextBlockNumber={nextBlock ? blockIdx + 2 : null}
          authorsCount={block.authors.length}
          conceptsCount={blockConcepts}
          daysTaken={blockCompleteDays}
          onContinue={() => {
            if (!nextBlock) {
              setShowBlockComplete(false);
              return;
            }
            const firstEntryId = GLOBAL_SEQUENCE.find(entryId => {
              const rev = revolutionCards.find(r => r.id === entryId && r.blockId === nextBlock.id);
              if (rev) return true;
              return nextBlock.authors.includes(entryId);
            }) ?? null;
            if (!firstEntryId) {
              setShowBlockComplete(false);
              router.replace('/(tabs)/camino');
              return;
            }
            if (!nextBlock.isFree && !isPremium) {
              setShowBlockComplete(false);
              setPendingAuthorId(firstEntryId);
              setShowPaywall(true);
              return;
            }
            setShowBlockComplete(false);
            router.replace(`/autor/${firstEntryId}`);
          }}
          onViewSummary={() => {
            setShowBlockComplete(false);
            router.replace('/(tabs)/camino');
          }}
        />
      )}
    </View>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    errorContainer: {
      flex: 1,
      backgroundColor: theme.bg,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      ...typography.h3,
      color: theme.text2,
    },
    // Header
    header: {
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    backButton: {
      position: 'absolute',
      left: spacing.lg,
      zIndex: 10,
      padding: spacing.xs,
    },
    backButtonText: {
      fontSize: 26,
      color: theme.text,
      lineHeight: 32,
    },
    revIconCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.bg3,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.lg,
    },
    celebRevIcon: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: theme.bg3,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.xl,
      borderWidth: 2,
      borderColor: '#0f6e56',
    },
    introIllustrationWrap: {
      width: 120,
      height: 120,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.lg,
    },
    portraitCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.bg3,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.lg,
    },
    portraitImage: {
      width: 120,
      height: 120,
    },
    portraitInitial: {
      ...typography.h1,
      fontSize: 48,
      color: theme.text3,
      lineHeight: 56,
    },
    dualPortraitWrap: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dualPortraitCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.bg3,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dualPortraitCircleRight: {
      marginLeft: -16,
      borderWidth: 2,
      borderColor: theme.bg,
    },
    dualPortraitImage: {
      width: 64,
      height: 64,
    },
    blockChip: {
      alignSelf: 'center',
      backgroundColor: theme.greenBg,
      borderRadius: radius.full,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      marginBottom: spacing.sm,
    },
    blockChipText: {
      ...typography.label,
      color: theme.green,
      textTransform: 'uppercase',
    },
    authorName: {
      ...typography.h1,
      color: theme.text,
      marginBottom: spacing.xs,
      textAlign: 'center',
    },
    authorDates: {
      ...typography.bodyS,
      color: theme.text2,
      textAlign: 'center',
    },
    // Tabs
    tabBar: {
      flexDirection: 'row',
      backgroundColor: theme.bg,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.md,
      position: 'relative',
    },
    tabLabel: {
      ...typography.bodyS,
      color: theme.text3,
    },
    tabLabelActive: {
      color: theme.text,
      fontWeight: '600',
    },
    tabUnderline: {
      position: 'absolute',
      bottom: 0,
      left: spacing.xl,
      right: spacing.xl,
      height: 2,
      backgroundColor: theme.green,
      borderRadius: radius.full,
    },
    // Content
    scroll: {
      flex: 1,
    },
    scrollContent: {
      padding: spacing.lg,
    },
    question: {
      ...typography.h4,
      fontSize: 21,
      color: theme.text,
      fontFamily: 'PlayfairDisplay_400Regular_Italic',
      marginBottom: spacing.lg,
    },
    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginBottom: spacing.lg,
    },
    paragraph: {
      marginBottom: spacing.lg,
    },
    contentText: {
      ...typography.body,
      color: theme.text2,
      lineHeight: 26,
    },
    termLink: {
      color: theme.green,
      fontWeight: '600',
    },
    closingLine: {
      ...typography.bodyS,
      fontSize: 16,
      color: theme.text3,
      fontFamily: 'PlayfairDisplay_400Regular_Italic',
      marginTop: spacing.md,
      paddingTop: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    // Bottom bar
    bottomBar: {
      backgroundColor: theme.bg,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
    },
    deeperButton: {
      backgroundColor: theme.bg3,
      borderRadius: radius.lg,
      paddingVertical: spacing.lg,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
    },
    deeperButtonText: {
      ...typography.body,
      color: theme.text,
      fontWeight: '600',
    },
    readButton: {
      backgroundColor: theme.green,
      borderRadius: radius.lg,
      paddingVertical: spacing.lg,
      alignItems: 'center',
    },
    readButtonDone: {
      backgroundColor: theme.greenBg,
    },
    readButtonText: {
      ...typography.body,
      color: '#ffffff',
      fontWeight: '600',
    },
    readButtonTextDone: {
      color: theme.text,
    },
    nextButton: {
      backgroundColor: theme.bg3,
      borderRadius: radius.lg,
      paddingVertical: spacing.lg,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.green,
    },
    nextButtonText: {
      ...typography.body,
      color: theme.green,
      fontWeight: '600',
    },
    // Placeholder state
    placeholderContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: spacing.xxxl,
      paddingHorizontal: spacing.xxl,
    },
    placeholderCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.bg3,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.xl,
      borderWidth: 1,
      borderColor: theme.border,
    },
    placeholderPortraitImage: {
      width: 80,
      height: 80,
    },
    placeholderInitial: {
      ...typography.h2,
      color: theme.text3,
    },
    placeholderTitle: {
      ...typography.h3,
      color: theme.text,
      textAlign: 'center',
      marginBottom: spacing.md,
    },
    placeholderSub: {
      ...typography.bodyS,
      color: theme.text2,
      textAlign: 'center',
      lineHeight: 22,
    },
    // Premium lock overlay
    lockOverlay: {
      backgroundColor: 'rgba(15,15,14,0.94)',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.xxl,
    },
    lockContent: {
      alignItems: 'center',
      width: '100%',
    },
    lockIconCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.purpleBg,
      borderWidth: 1.5,
      borderColor: theme.purple,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.lg,
    },
    lockIconGlyph: {
      fontSize: 28,
      lineHeight: 36,
      color: theme.purple,
    },
    lockTitle: {
      ...typography.h3,
      color: theme.text,
      textAlign: 'center',
      marginBottom: spacing.sm,
    },
    lockSub: {
      ...typography.bodyS,
      color: theme.text2,
      textAlign: 'center',
      lineHeight: 22,
      marginBottom: spacing.xl,
    },
    lockButton: {
      backgroundColor: theme.purple,
      borderRadius: radius.lg,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xxl,
      alignItems: 'center',
    },
    lockButtonText: {
      ...typography.body,
      color: theme.text,
      fontWeight: '600',
    },
    // Paywall CTA in bottom bar
    paywallButton: {
      backgroundColor: theme.purpleBg,
      borderRadius: radius.lg,
      paddingVertical: spacing.lg,
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: theme.purple,
    },
    paywallButtonText: {
      ...typography.body,
      color: theme.purple,
      fontWeight: '600',
    },
    // Celebration modal
    celebOverlay: {
      flex: 1,
      backgroundColor: 'rgba(15,15,14,0.92)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.xxl,
    },
    celebCard: {
      width: '100%',
      backgroundColor: theme.bg2,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: theme.border,
      alignItems: 'center',
      paddingVertical: spacing.xxxl,
      paddingHorizontal: spacing.xxl,
    },
    celebCircle: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: theme.bg3,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.xl,
      borderWidth: 2,
      borderColor: theme.green,
    },
    celebIntroCircle: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: theme.bg3,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.xl,
      borderWidth: 2,
      borderColor: theme.green,
      overflow: 'hidden',
    },
    celebPortrait: {
      width: 96,
      height: 96,
    },
    celebInitial: {
      ...typography.h1,
      fontSize: 40,
      color: theme.text3,
      lineHeight: 48,
    },
    celebBadge: {
      ...typography.label,
      color: theme.green,
      textTransform: 'uppercase',
      letterSpacing: 1.2,
      marginBottom: spacing.sm,
    },
    celebAuthorName: {
      ...typography.h2,
      color: theme.text,
      textAlign: 'center',
      marginBottom: spacing.xs,
    },
    celebSubtitle: {
      ...typography.bodyS,
      color: theme.text3,
      textAlign: 'center',
      marginBottom: spacing.xxl,
    },
    celebNextButton: {
      width: '100%',
      backgroundColor: theme.green,
      borderRadius: radius.lg,
      paddingVertical: spacing.lg,
      paddingHorizontal: 20,
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    celebNextText: {
      ...typography.body,
      color: '#ffffff',
      fontWeight: '600',
      paddingHorizontal: 8,
      textAlign: 'center',
    },
    celebDismiss: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
    },
    celebDismissText: {
      ...typography.bodyS,
      color: theme.text3,
    },
    // Post-quiz savable quotes (inside celebration modal)
    quotesSection: {
      width: '100%',
      marginTop: spacing.lg,
      marginBottom: spacing.lg,
      paddingTop: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    quotesHeading: {
      ...typography.bodyS,
      fontWeight: '600',
      color: theme.text,
      marginBottom: spacing.md,
      textAlign: 'center',
    },
    quoteBlock: {
      marginBottom: spacing.md,
    },
    quoteText: {
      ...typography.bodyS,
      color: theme.text2,
      lineHeight: 20,
      marginBottom: spacing.xs,
      fontFamily: 'PlayfairDisplay_400Regular_Italic',
    },
    quotesFooter: {
      ...typography.label,
      color: theme.text3,
      textAlign: 'center',
      marginTop: spacing.xs,
      marginBottom: spacing.md,
    },
    viewDiaryButton: {
      alignSelf: 'center',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: theme.green,
      marginBottom: spacing.sm,
    },
    viewDiaryButtonText: {
      ...typography.bodyS,
      color: theme.green,
      fontWeight: '600',
    },
    // Quiz modal
    quizOverlay: {
      flex: 1,
      backgroundColor: 'rgba(15,15,14,0.95)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.xl,
    },
    quizCard: {
      width: '100%',
      backgroundColor: theme.bg2,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: theme.border,
      padding: spacing.xxl,
    },
    quizProgress: {
      ...typography.label,
      color: theme.text3,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: spacing.lg,
    },
    quizQuestion: {
      ...typography.h4,
      color: theme.text,
      marginBottom: spacing.xl,
      lineHeight: 28,
    },
    quizOption: {
      backgroundColor: theme.bg3,
      borderRadius: radius.lg,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.sm,
      borderWidth: 1,
      borderColor: theme.border,
    },
    quizOptionSelected: {
      backgroundColor: theme.greenBg,
      borderColor: theme.green,
    },
    quizOptionText: {
      ...typography.bodyS,
      color: theme.text2,
    },
    quizOptionTextSelected: {
      color: theme.green,
      fontWeight: '600',
    },
    quizTFRow: {
      flexDirection: 'row',
      gap: spacing.md,
    },
    quizTFBtn: {
      flex: 1,
      backgroundColor: theme.bg3,
      borderRadius: radius.lg,
      paddingVertical: spacing.lg,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
    },
    quizTFText: {
      ...typography.body,
      color: theme.text,
      fontWeight: '600',
    },
    quizFeedback: {
      borderRadius: radius.lg,
      padding: spacing.lg,
      marginBottom: spacing.lg,
    },
    quizFeedbackCorrect: {
      backgroundColor: theme.greenBg,
      borderWidth: 1,
      borderColor: theme.green,
    },
    quizFeedbackWrong: {
      backgroundColor: theme.bg3,
      borderWidth: 1,
      borderColor: theme.coral,
    },
    quizFeedbackLabel: {
      ...typography.label,
      fontWeight: '700',
      color: theme.text,
      marginBottom: spacing.sm,
    },
    quizFeedbackText: {
      ...typography.bodyS,
      color: theme.text2,
      lineHeight: 20,
    },
    quizContinue: {
      backgroundColor: theme.green,
      borderRadius: radius.lg,
      paddingVertical: spacing.lg,
      alignItems: 'center',
      marginTop: spacing.sm,
    },
    quizContinueDisabled: {
      backgroundColor: theme.bg3,
      borderColor: theme.border,
      borderWidth: 1,
    },
    quizContinueText: {
      ...typography.body,
      color: '#ffffff',
      fontWeight: '600',
    },
    quizOpenInput: {
      backgroundColor: theme.bg3,
      borderRadius: radius.lg,
      padding: spacing.lg,
      ...typography.bodyS,
      color: theme.text,
      borderWidth: 1,
      borderColor: theme.border,
      minHeight: 120,
      marginBottom: spacing.lg,
      lineHeight: 22,
    },
    // Reflexión tab (read-only review)
    reflexionBlock: {
      marginBottom: spacing.xl,
      paddingBottom: spacing.xl,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    reflexionQLabel: {
      ...typography.label,
      color: theme.text3,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: spacing.sm,
    },
    reflexionQText: {
      ...typography.body,
      color: theme.text,
      marginBottom: spacing.lg,
      lineHeight: 26,
    },
    reflexionOption: {
      backgroundColor: theme.bg3,
      borderRadius: radius.lg,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.sm,
      borderWidth: 1,
      borderColor: theme.border,
    },
    reflexionOptionText: {
      ...typography.bodyS,
      color: theme.text3,
    },
    reflexionTFRow: {
      flexDirection: 'row',
      gap: spacing.md,
    },
    reflexionTFChip: {
      flex: 1,
      backgroundColor: theme.bg3,
      borderRadius: radius.lg,
      paddingVertical: spacing.md,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
    },
    reflexionTFText: {
      ...typography.bodyS,
      color: theme.text3,
    },
    reflexionAnswerBox: {
      backgroundColor: theme.bg3,
      borderRadius: radius.lg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: theme.border,
      minHeight: 80,
    },
    reflexionAnswerText: {
      ...typography.bodyS,
      color: theme.text2,
      lineHeight: 22,
    },
  });
}
