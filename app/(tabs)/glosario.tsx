import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  Modal,
  useWindowDimensions,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../constants/colors';
import { typography, spacing, radius } from '../../constants/typography';
import { authors, glossaryTerms, conceptThreads } from '../../constants/data';

const PROGRESS_KEY = 'psylens_progress';
type LayerProgress = { surface?: boolean; concept?: boolean; fondo?: boolean };
type ProgressMap   = Record<string, LayerProgress>;

function isComplete(prog: ProgressMap, authorId: string): boolean {
  const p = prog[authorId];
  return !!(p?.surface && p?.concept && p?.fondo);
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Term = typeof glossaryTerms[number];

type TermGroup = {
  authorId: string;
  authorName: string;
  terms: Term[];
};

// ─── Data helpers ─────────────────────────────────────────────────────────────

const authorById = Object.fromEntries(authors.map((a) => [a.id, a]));

// Maintain chronological order from the authors array
const authorOrder = Object.fromEntries(authors.map((a, i) => [a.id, i]));

function buildGroups(terms: Term[]): TermGroup[] {
  const map = new Map<string, TermGroup>();

  for (const t of terms) {
    if (!map.has(t.authorId)) {
      map.set(t.authorId, {
        authorId: t.authorId,
        authorName: authorById[t.authorId]?.name ?? t.authorId,
        terms: [],
      });
    }
    map.get(t.authorId)!.terms.push(t);
  }

  return [...map.values()].sort(
    (a, b) => (authorOrder[a.authorId] ?? 99) - (authorOrder[b.authorId] ?? 99),
  );
}

// Find terms from authors connected via conceptThreads
function getConnections(term: Term): Term[] {
  const related = new Set(
    conceptThreads
      .filter((ct) => ct.from === term.authorId || ct.to === term.authorId)
      .map((ct) => (ct.from === term.authorId ? ct.to : ct.from)),
  );
  return glossaryTerms
    .filter((t) => related.has(t.authorId) && t.id !== term.id)
    .slice(0, 4);
}

// ─── BottomSheet ──────────────────────────────────────────────────────────────

function BottomSheet({
  term,
  visible,
  onClose,
  onSelectTerm,
}: {
  term: Term | null;
  visible: boolean;
  onClose: () => void;
  onSelectTerm: (t: Term) => void;
}) {
  const { height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const translateY      = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  // Animate in whenever the sheet becomes visible
  useEffect(() => {
    if (!visible) return;
    translateY.setValue(screenHeight);
    backdropOpacity.setValue(0);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  // Animate out first, then notify parent to hide the modal
  function handleClose() {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  }

  if (!term) return null;

  const author      = authorById[term.authorId];
  const connections = getConnections(term);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      {/* Backdrop — tap outside sheet to close */}
      <Animated.View style={[bs.backdrop, { opacity: backdropOpacity }]}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={handleClose}
          activeOpacity={1}
        />
      </Animated.View>

      {/* Sheet — slides up from bottom */}
      <Animated.View
        style={[
          bs.sheet,
          { transform: [{ translateY }], paddingBottom: insets.bottom + spacing.xl },
        ]}
      >
        {/* Handle: 36×4px, radius 2 */}
        <View style={bs.handleWrap}>
          <View style={bs.handle} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={bs.content}
        >
          {/* Green author tag */}
          <View style={bs.authorTag}>
            <Text style={bs.authorTagText}>{author?.name ?? term.authorId}</Text>
          </View>

          {/* Term title */}
          <Text style={bs.termTitle}>{term.term}</Text>

          {/* Definition */}
          <Text style={bs.definition}>{term.definition}</Text>

          {/* Connection chips */}
          {connections.length > 0 && (
            <View style={bs.connectSection}>
              <Text style={bs.connectLabel}>Conecta con</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={bs.chipsRow}
              >
                {connections.map((ct) => (
                  <TouchableOpacity
                    key={ct.id}
                    style={bs.chip}
                    onPress={() => onSelectTerm(ct)}
                    activeOpacity={0.7}
                  >
                    <Text style={bs.chipText}>{ct.term}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

// ─── TermRow ──────────────────────────────────────────────────────────────────

function TermRow({ term, onPress }: { term: Term; onPress: () => void }) {
  return (
    <TouchableOpacity style={tr.row} onPress={onPress} activeOpacity={0.7}>
      <View style={tr.body}>
        <Text style={tr.term}>{term.term}</Text>
        <Text style={tr.preview} numberOfLines={1}>{term.definition}</Text>
      </View>
      <Text style={tr.chevron}>›</Text>
    </TouchableOpacity>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ query }: { query: string }) {
  const hasQuery = query.trim().length > 0;
  return (
    <View style={es.container}>
      <Text style={es.glyph}>◎</Text>
      <Text style={es.title}>{hasQuery ? 'Sin resultados' : 'Sin términos aún'}</Text>
      <Text style={es.subtitle}>
        {hasQuery
          ? `No hay términos que coincidan con "${query}".`
          : 'Completa tu primer autor para desbloquear términos.'}
      </Text>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function GlosarioScreen() {
  const insets = useSafeAreaInsets();

  const [progress,     setProgress]     = useState<ProgressMap>({});
  const [query,        setQuery]        = useState('');
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(PROGRESS_KEY)
        .then(raw => { if (raw) setProgress(JSON.parse(raw)); })
        .catch(() => {});
    }, []),
  );

  const unlocked = glossaryTerms.filter(t => isComplete(progress, t.authorId));

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return unlocked;
    return unlocked.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q),
    );
  }, [query, unlocked]);

  const groups = useMemo(() => buildGroups(filtered), [filtered]);

  function openSheet(term: Term) {
    setSelectedTerm(term);
    setSheetVisible(true);
  }

  // Called after the close animation finishes inside BottomSheet
  function handleSheetClose() {
    setSheetVisible(false);
    setSelectedTerm(null);
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>

      {/* ── Header ─────────────────────────────────────── */}
      <View style={styles.header}>
        <Text style={styles.title}>Glosario</Text>
        <Text style={styles.subtitle}>{unlocked.length} {unlocked.length === 1 ? 'término' : 'términos'} desbloqueados</Text>
      </View>

      {/* ── Search bar ─────────────────────────────────── */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar…"
            placeholderTextColor={colors.dark.text3}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            clearButtonMode="never"
          />
          {query.length > 0 && (
            <TouchableOpacity
              onPress={() => setQuery('')}
              hitSlop={12}
              activeOpacity={0.6}
            >
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ── List / Empty ───────────────────────────────── */}
      {groups.length === 0 ? (
        <EmptyState query={query} />
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {groups.map((group) => (
            <View key={group.authorId} style={styles.section}>

              {/* Section header */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionLabel}>
                  {group.authorName.toUpperCase()}
                </Text>
                <View style={styles.sectionRule} />
              </View>

              {/* Terms */}
              {group.terms.map((term) => (
                <TermRow
                  key={term.id}
                  term={term}
                  onPress={() => openSheet(term)}
                />
              ))}

            </View>
          ))}
        </ScrollView>
      )}

      {/* ── BottomSheet ────────────────────────────────── */}
      <BottomSheet
        term={selectedTerm}
        visible={sheetVisible}
        onClose={handleSheetClose}
        onSelectTerm={(t) => setSelectedTerm(t)}
      />

    </View>
  );
}

// ─── BottomSheet styles ───────────────────────────────────────────────────────

const bs = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.dark.bg2,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    maxHeight: '80%',
  },
  handleWrap: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.dark.bg3,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },

  // Author tag (green pill)
  authorTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.dark.greenBg,
    marginBottom: spacing.md,
  },
  authorTagText: {
    ...typography.label,
    color: colors.dark.green,
  },

  // Term title
  termTitle: {
    ...typography.h2,
    color: colors.dark.text,
    marginBottom: spacing.md,
  },

  // Definition
  definition: {
    ...typography.body,
    color: colors.dark.text2,
    lineHeight: 26,
  },

  // Connections
  connectSection: {
    marginTop: spacing.xl,
  },
  connectLabel: {
    ...typography.label,
    color: colors.dark.text3,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  chipsRow: {
    gap: spacing.sm,
    paddingBottom: spacing.xs,
  },
  chip: {
    minHeight: 44,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.dark.border,
    backgroundColor: colors.dark.bg3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipText: {
    ...typography.bodyXS,
    color: colors.dark.text2,
  },
});

// ─── TermRow styles ───────────────────────────────────────────────────────────

const tr = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
    gap: spacing.sm,
  },
  body: {
    flex: 1,
    gap: spacing.xs,
  },
  term: {
    ...typography.body,
    color: colors.dark.green,
    fontWeight: '500',
  },
  preview: {
    ...typography.bodyXS,
    color: colors.dark.text3,
  },
  chevron: {
    ...typography.h3,
    color: colors.dark.text3,
    lineHeight: 22,
  },
});

// ─── Empty state styles ───────────────────────────────────────────────────────

const es = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxxl,
  },
  glyph: {
    fontSize: 40,
    color: colors.dark.text3,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h3,
    color: colors.dark.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyS,
    color: colors.dark.text3,
    textAlign: 'center',
    lineHeight: 22,
  },
});

// ─── Screen styles ────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.dark.bg,
  },

  // Header
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
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

  // Search bar
  searchWrap: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.bg2,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.dark.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.dark.text,
    padding: 0,
    margin: 0,
  },
  clearBtn: {
    ...typography.bodyS,
    color: colors.dark.text3,
  },

  // Term list
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },

  // Author section
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    ...typography.label,
    color: colors.dark.text3,
    letterSpacing: 0.8,
  },
  sectionRule: {
    flex: 1,
    height: 1,
    backgroundColor: colors.dark.border,
  },
});
