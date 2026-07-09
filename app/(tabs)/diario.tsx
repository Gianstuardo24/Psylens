import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../constants/colors';
import { typography, spacing } from '../../constants/typography';
import { cardShadow } from '../../constants/shadows';
import { useTheme } from '../../hooks/useTheme';
import { JournalEntry, JOURNAL_PREFIX } from '../../utils/journal';
import { getSavedQuotes, SavedQuote, unsaveQuote } from '../../utils/savedQuotes';

type Theme = typeof colors.dark;

const MONTHS_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

function formatShortDateEs(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return `${d.getDate()} ${MONTHS_ES[d.getMonth()]}`;
}

type QuoteGroup = {
  authorId:   string;
  authorName: string;
  quotes:     SavedQuote[];
};

function buildQuoteGroups(quotes: SavedQuote[]): QuoteGroup[] {
  const byAuthor = new Map<string, SavedQuote[]>();
  for (const q of quotes) {
    const list = byAuthor.get(q.authorId) ?? [];
    list.push(q);
    byAuthor.set(q.authorId, list);
  }
  const groups: QuoteGroup[] = [...byAuthor.entries()].map(([authorId, list]) => ({
    authorId,
    authorName: list[0].authorName,
    quotes: [...list].sort((a, b) => b.dateAdded.localeCompare(a.dateAdded)),
  }));
  groups.sort((a, b) => b.quotes[0].dateAdded.localeCompare(a.quotes[0].dateAdded));
  return groups;
}

// ─── Screen ───────────────────────────────────────────────────────────────────

const TABS = ['frases', 'reflexiones'] as const;

export default function DiarioScreen() {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const { width: screenWidth } = useWindowDimensions();
  const pagerRef = useRef<ScrollView>(null);

  const params = useLocalSearchParams<{ tab?: string }>();
  const initialTab: 'frases' | 'reflexiones' = params.tab === 'reflexiones' ? 'reflexiones' : 'frases';

  const [activeTab,      setActiveTab]      = useState<'frases' | 'reflexiones'>(initialTab);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [savedQuotes,    setSavedQuotes]    = useState<SavedQuote[]>([]);

  useEffect(() => {
    if (initialTab !== 'frases') {
      pagerRef.current?.scrollTo({ x: TABS.indexOf(initialTab) * screenWidth, animated: false });
    }
  }, []);

  function selectTab(tab: 'frases' | 'reflexiones') {
    setActiveTab(tab);
    pagerRef.current?.scrollTo({ x: TABS.indexOf(tab) * screenWidth, animated: true });
  }

  function handlePagerScrollEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
    setActiveTab(TABS[index] ?? TABS[0]);
  }

  async function handleUnsaveQuote(authorId: string, quote: string) {
    setSavedQuotes(prev => prev.filter(e => !(e.authorId === authorId && e.quote === quote)));
    await unsaveQuote(authorId, quote);
  }

  useFocusEffect(
    useCallback(() => {
      getSavedQuotes().then(setSavedQuotes).catch(() => {});

      AsyncStorage.getAllKeys().catch(() => [] as readonly string[]).then(async keys => {
        const journalKeys = [...keys].filter(k => k.startsWith(JOURNAL_PREFIX));
        if (!journalKeys.length) { setJournalEntries([]); return; }
        const pairs = await AsyncStorage.multiGet(journalKeys).catch(() => [] as [string, string | null][]);
        const entries = pairs
          .flatMap(([, val]) => (val ? (JSON.parse(val) as JournalEntry[]) : []))
          .sort((a, b) => b.date.localeCompare(a.date));
        setJournalEntries(entries);
      });
    }, []),
  );

  const quoteGroups = useMemo(() => buildQuoteGroups(savedQuotes), [savedQuotes]);

  const styles = useMemo(() => makeStyles(theme, isDark), [theme, isDark]);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>

      {/* ── Header ─────────────────────────────────────── */}
      <View style={styles.header}>
        <Text style={styles.title}>Diario</Text>
      </View>

      {/* ── Tab bar ────────────────────────────────────── */}
      <View style={styles.tabBar}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={styles.tabItem}
            onPress={() => selectTab(tab)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabLabel, activeTab === tab && styles.tabLabelActive]}>
              {tab === 'reflexiones' ? 'Mis reflexiones' : 'Frases guardadas'}
            </Text>
            {activeTab === tab && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Swipeable pager ───────────────────────────────── */}
      <ScrollView
        ref={pagerRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handlePagerScrollEnd}
        style={styles.pager}
      >
        {/* ── Frases guardadas page ───────────────────────── */}
        <View style={{ width: screenWidth }}>
          {quoteGroups.length === 0 ? (
            <View style={styles.diaryEmpty}>
              <Text style={styles.diaryEmptyText}>Tus frases guardadas aparecerán aquí</Text>
            </View>
          ) : (
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.diaryScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.quotesSection}>
                <Text style={styles.quotesSectionHeader}>INSPIRADAS EN</Text>
                {quoteGroups.map(group => (
                  <View key={group.authorId} style={styles.quoteGroup}>
                    <View style={styles.quoteGroupHeaderRow}>
                      <View style={styles.quoteGroupRule} />
                      <Text style={styles.quoteGroupAuthor}>{group.authorName}</Text>
                      <View style={styles.quoteGroupRule} />
                    </View>
                    {group.quotes.map((q, i) => (
                      <View key={`${q.authorId}-${q.dateAdded}-${i}`} style={styles.savedQuoteItem}>
                        <View style={styles.savedQuoteRow}>
                          <Text style={[styles.savedQuoteText, styles.savedQuoteTextFlex]}>"{q.quote}"</Text>
                          <TouchableOpacity
                            style={styles.savedQuoteDeleteButton}
                            onPress={() => handleUnsaveQuote(q.authorId, q.quote)}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                          >
                            <Text style={styles.savedQuoteDeleteText}>×</Text>
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.savedQuoteDate}>Guardada el {formatShortDateEs(q.dateAdded)}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          )}
        </View>

        {/* ── Mis reflexiones page ─────────────────────────── */}
        <View style={{ width: screenWidth }}>
          {journalEntries.length === 0 ? (
            <View style={styles.diaryEmpty}>
              <Text style={styles.diaryEmptyText}>Tus reflexiones aparecerán aquí</Text>
            </View>
          ) : (
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.diaryScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {journalEntries.map((entry, i) => (
                <View
                  key={`${entry.authorId}-${entry.date}-${i}`}
                  style={styles.journalEntry}
                >
                  <View style={styles.journalEntryHeader}>
                    <Text style={styles.journalAuthor}>{entry.authorName}</Text>
                    <Text style={styles.journalDate}>{entry.date}</Text>
                  </View>
                  <Text style={styles.journalQuestion}>{entry.question}</Text>
                  <Text style={styles.journalAnswer}>{entry.answer}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>

    </View>
  );
}

// ─── Screen styles ────────────────────────────────────────────────────────────

function makeStyles(theme: Theme, isDark: boolean) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.bg,
    },

    // Header
    header: {
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.lg,
      paddingBottom: spacing.md,
    },
    title: {
      ...typography.h2,
      color: theme.text,
    },

    // Tab bar
    tabBar: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.md,
    },
    tabLabel: {
      ...typography.body,
      color: theme.text3,
      fontWeight: '500',
    },
    tabLabelActive: {
      color: theme.green,
    },
    tabUnderline: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 2,
      backgroundColor: theme.green,
    },

    // Horizontal swipeable pager between the two tabs
    pager: {
      flex: 1,
    },

    // Term list scroll (shared style name for the diario ScrollView)
    scroll: {
      flex: 1,
    },

    // Diario tab
    diaryEmpty: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.xxl,
    },
    diaryEmptyText: {
      ...typography.bodyS,
      color: theme.text3,
      textAlign: 'center',
    },
    diaryScrollContent: {
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.lg,
      paddingBottom: spacing.xxxl,
    },
    journalEntry: {
      backgroundColor: theme.bg2,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.sm,
      ...cardShadow(isDark),
    },
    journalEntryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: spacing.xs,
    },
    journalAuthor: {
      ...typography.label,
      color: theme.green,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    journalDate: {
      ...typography.bodyXS,
      color: theme.text3,
    },
    journalQuestion: {
      ...typography.bodyS,
      color: theme.text2,
      fontStyle: 'italic',
      marginBottom: spacing.sm,
      lineHeight: 20,
    },
    journalAnswer: {
      ...typography.bodyS,
      color: theme.text,
      lineHeight: 22,
    },

    // Diario — Frases guardadas
    quotesSection: {
      paddingTop: 7,
    },
    quotesSectionHeader: {
      ...typography.label,
      fontSize: 16,
      lineHeight: 20,
      color: theme.text3,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: spacing.lg,
      textAlign: 'center',
    },
    quoteGroup: {
      marginBottom: spacing.xl,
    },
    quoteGroupHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    quoteGroupRule: {
      flex: 1,
      height: 1,
      backgroundColor: theme.border,
    },
    quoteGroupAuthor: {
      ...typography.label,
      color: theme.green,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    savedQuoteItem: {
      backgroundColor: theme.bg2,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.sm,
      ...cardShadow(isDark),
    },
    savedQuoteRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    savedQuoteText: {
      ...typography.bodyS,
      color: theme.text,
      fontStyle: 'italic',
      lineHeight: 22,
      marginBottom: spacing.xs,
    },
    savedQuoteTextFlex: {
      flex: 1,
    },
    savedQuoteDeleteButton: {
      paddingHorizontal: spacing.xs,
      paddingVertical: 2,
      marginLeft: spacing.xs,
    },
    savedQuoteDeleteText: {
      fontSize: 16,
      color: theme.text3,
    },
    savedQuoteDate: {
      ...typography.bodyXS,
      color: theme.text3,
    },
  });
}
