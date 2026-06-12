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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { colors } from '../../constants/colors';
import { typography, spacing, radius } from '../../constants/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import Svg, { Path } from 'react-native-svg';
import { authors, blocks, glossaryTerms, revolutionCards, subBlocks } from '../../constants/data';
import BottomSheet from '../../components/BottomSheet';
import { BlockCompleteModal } from '../../components/BlockCompleteModal';
import { PaywallSheet } from '../../components/PaywallSheet';
import { IntroIllustration } from '../../components/IntroIllustrations';
import { useTheme } from '../../hooks/useTheme';

type Theme = typeof colors.dark;

const PROGRESS_KEY       = 'psylens_progress';
const UNLOCK_KEY         = 'psylens_unlocked';
const BLOCK_STARTED_KEY  = 'psylens_block_started';
const PREMIUM_KEY        = 'psylens_is_premium';
const STREAK_KEY         = 'psylens_streak';
const LAST_ACTIVE_KEY    = 'psylens_last_active';

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

type TabKey = 'surface' | 'concept' | 'fondo';

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
  const escaped = terms.map(t => t.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(pattern);
  return (
    <Text style={styles.contentText}>
      {parts.map((part, i) => {
        if (!part) return null;
        const match = terms.find(t => t.term.toLowerCase() === part.toLowerCase());
        return match ? (
          <Text key={i} style={styles.termLink} onPress={() => onTermPress(match.id)}>
            {part}
          </Text>
        ) : (
          part
        );
      })}
    </Text>
  );
}

export default function AutorScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabKey>('surface');
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [progress,          setProgress]          = useState<ProgressMap>({});
  const [isPremium,         setIsPremium]         = useState(false);
  const [showCelebration,   setShowCelebration]   = useState(false);
  const [showBlockComplete, setShowBlockComplete] = useState(false);
  const [blockCompleteDays, setBlockCompleteDays] = useState(1);
  const [showPaywall,       setShowPaywall]       = useState(false);
  const [pendingAuthorId,   setPendingAuthorId]   = useState<string | null>(null);

  const animScale   = useRef(new Animated.Value(0.85)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;

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
    if (showCelebration) {
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
  const nextAuthor = (() => {
    if (!author) return null;
    // Authors inside a sub-block must follow the sub-block's defined order, not the global array.
    // Using global order caused later-indexed authors (e.g. hipocrates) to be skipped,
    // preventing the previous sub-block from being considered complete.
    const sb = subBlocks.find(s => s.authorIds.includes(author.id));
    if (sb) {
      const pos = sb.authorIds.indexOf(author.id);
      if (pos >= 0 && pos < sb.authorIds.length - 1) {
        return authors.find(a => a.id === sb.authorIds[pos + 1]) ?? null;
      }
      // Last in sub-block: don't jump to the next sub-block's author since the
      // revolution card for that sub-block must be read first.
      return null;
    }
    // No sub-block (intro authors): use global order
    const idx = authors.findIndex(a => a.id === author.id);
    return idx >= 0 ? (authors[idx + 1] ?? null) : null;
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
                onPress={() => router.back()}
                activeOpacity={0.85}
              >
                <Text style={styles.nextButtonText}>Comenzar sub-bloque →</Text>
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
              <Text style={styles.celebSubtitle}>Has leído la introducción</Text>
              <TouchableOpacity
                style={styles.celebNextButton}
                onPress={() => { setShowCelebration(false); router.back(); }}
                activeOpacity={0.85}
              >
                <Text style={styles.celebNextText}>Comenzar sub-bloque →</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.celebDismiss}
                onPress={() => setShowCelebration(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.celebDismissText}>Volver</Text>
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

  const content        = { surface: author.surface, concept: author.concept, fondo: author.fondo }[activeTab];
  const PLACEHOLDER_TEXT = 'Este contenido estará disponible pronto.';
  const isPlaceholder  = !content?.text || content.text === PLACEHOLDER_TEXT;
  const portrait       = PORTRAITS[author.id] ?? null;
  const isDual         = author.id === 'heraclito-democrito';
  const isIntroAuthor  = author.id.startsWith('intro-');
  const isTwoLayer     = author.layerType === 'two';
  const activeTabs     = isTwoLayer
    ? [{ key: 'surface' as TabKey, label: 'Entrada' }, { key: 'concept' as TabKey, label: 'Profundidad' }]
    : TABS;
  const isLastTab      = isTwoLayer ? activeTab === 'concept' : activeTab === 'fondo';

  const isAuthorComplete = !!(
    progress[author.id]?.surface &&
    progress[author.id]?.concept &&
    progress[author.id]?.fondo
  );

  // Concepto + Fondo are premium-gated for non-free blocks
  const isContentLocked =
    !block.isFree && !isPremium && (activeTab === 'concept' || activeTab === 'fondo');

  async function markAllDone() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const updated: ProgressMap = {
      ...progress,
      [author!.id]: { surface: true, concept: true, fondo: true },
    };
    setProgress(updated);
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(updated)).catch(() => {});

    // Update streak — only increments once per calendar day
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

    // Unlock the next author for cross-block progression
    if (nextAuthor) {
      const raw      = await AsyncStorage.getItem(UNLOCK_KEY).catch(() => null);
      const unlocked: string[] = raw ? JSON.parse(raw) : [];
      if (!unlocked.includes(nextAuthor.id)) {
        unlocked.push(nextAuthor.id);
        await AsyncStorage.setItem(UNLOCK_KEY, JSON.stringify(unlocked)).catch(() => {});
      }
    }

    // Check if every author in the block is now complete
    const blockDone = block
      ? block.authors.every(aid =>
          aid === author!.id
            ? true
            : !!(updated[aid]?.surface && updated[aid]?.concept && updated[aid]?.fondo)
        )
      : false;

    if (blockDone) {
      const raw = await AsyncStorage.getItem(BLOCK_STARTED_KEY).catch(() => null);
      const started: Record<string, string> = raw ? JSON.parse(raw) : {};
      const startStr = started[block!.id];
      const days = startStr
        ? Math.max(1, Math.ceil(
            (Date.now() - new Date(startStr + 'T00:00:00').getTime()) / 86_400_000
          ))
        : 1;
      setBlockCompleteDays(days);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setShowBlockComplete(true);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      setShowCelebration(true);
    }
  }

  function navigateToNext() {
    if (!nextAuthor) return;
    setShowCelebration(false);
    router.replace(`/autor/${nextAuthor.id}`);
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
      <View style={styles.tabBar}>
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
          {isPlaceholder ? (
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
          <TouchableOpacity style={styles.readButton} onPress={markAllDone} activeOpacity={0.85}>
            <Text style={styles.readButtonText}>Marcar como leído ✓</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={[styles.readButton, styles.readButtonDone]} activeOpacity={1}>
              <Text style={[styles.readButtonText, styles.readButtonTextDone]}>Leído ✓</Text>
            </TouchableOpacity>
            {nextAuthor && (
              <TouchableOpacity style={[styles.nextButton, { marginTop: spacing.sm }]} onPress={navigateToNext} activeOpacity={0.85}>
                <Text style={styles.nextButtonText}>Ir al siguiente autor →</Text>
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
                <IntroIllustration authorId={author.id} size={96} />
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

            {nextAuthor && (
              <TouchableOpacity style={styles.celebNextButton} onPress={navigateToNext} activeOpacity={0.85}>
                <Text style={styles.celebNextText}>Siguiente autor: {nextAuthor.name} →</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.celebDismiss}
              onPress={() => setShowCelebration(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.celebDismissText}>Volver</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
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
            const firstAuthorId = nextBlock.authors[0];
            const authorExists = !!firstAuthorId && authors.some(a => a.id === firstAuthorId);
            if (!authorExists) {
              setShowBlockComplete(false);
              router.replace('/(tabs)/camino');
              return;
            }
            if (!nextBlock.isFree && !isPremium) {
              setShowBlockComplete(false);
              setPendingAuthorId(firstAuthorId);
              setShowPaywall(true);
              return;
            }
            setShowBlockComplete(false);
            router.replace(`/autor/${firstAuthorId}`);
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
  });
}
