import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { colors } from '../../constants/colors';
import { typography, spacing, radius } from '../../constants/typography';
import { authors, blocks, glossaryTerms } from '../../constants/data';
import BottomSheet from '../../components/BottomSheet';

const PORTRAIT_HEIGHT = 240;
const BG = 'rgba(15,15,14,';

type TabKey = 'surface' | 'concept' | 'fondo';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'surface', label: 'Superficie' },
  { key: 'concept', label: 'Concepto' },
  { key: 'fondo', label: 'Fondo' },
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
}: {
  text: string;
  terms: Term[];
  onTermPress: (termId: string) => void;
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
  const [activeTab, setActiveTab] = useState<TabKey>('surface');
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);

  const author = authors.find(a => a.id === id);
  const block = author ? blocks.find(b => b.id === author.blockId) : null;
  const authorTerms = glossaryTerms.filter(t => t.authorId === id);

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

  const content = { surface: author.surface, concept: author.concept, fondo: author.fondo }[activeTab];

  const portraitHeight = PORTRAIT_HEIGHT + insets.top;

  return (
    <View style={styles.container}>
      {/* Portrait */}
      <View style={[styles.portrait, { height: portraitHeight }]}>
        {/* Placeholder image background */}
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: colors.dark.bg3 }]} />

        {/* Gradient overlay: transparent → bg */}
        <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
          <View style={{ flex: 1 }} />
          <View style={{ height: 28, backgroundColor: `${BG}0.1)` }} />
          <View style={{ height: 30, backgroundColor: `${BG}0.3)` }} />
          <View style={{ height: 32, backgroundColor: `${BG}0.56)` }} />
          <View style={{ height: 32, backgroundColor: `${BG}0.78)` }} />
          <View style={{ height: 28, backgroundColor: `${BG}0.93)` }} />
          <View style={{ height: insets.top + 10, backgroundColor: `${BG}1)` }} />
        </View>

        {/* Back button */}
        <TouchableOpacity
          style={[styles.backButton, { top: insets.top + spacing.sm }]}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        {/* Author info at portrait bottom */}
        <View style={styles.portraitInfo}>
          <View style={styles.blockChip}>
            <Text style={styles.blockChipText}>{block.name}</Text>
          </View>
          <Text style={styles.authorName} numberOfLines={2}>{author.name}</Text>
          <Text style={styles.authorDates}>{author.dates}</Text>
        </View>
      </View>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </Text>
            {activeTab === tab.key && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Scrollable content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 88 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.question}>{content.question}</Text>
        <View style={styles.divider} />
        {content.text.split('\n\n').map((para, i) => (
          <View key={i} style={styles.paragraph}>
            <HighlightedText text={para} terms={authorTerms} onTermPress={setSelectedTermId} />
          </View>
        ))}
        <Text style={styles.closingLine}>{content.closingLine}</Text>
      </ScrollView>

      {/* Fixed "Marcar como leído" button */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing.sm }]}>
        <TouchableOpacity style={styles.readButton} activeOpacity={0.85}>
          <Text style={styles.readButtonText}>Marcar como leído</Text>
        </TouchableOpacity>
      </View>

      {/* Reusable term bottom sheet */}
      <BottomSheet
        visible={selectedTermId !== null}
        termId={selectedTermId}
        onClose={() => setSelectedTermId(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.bg,
  },
  // Error state
  errorContainer: {
    flex: 1,
    backgroundColor: colors.dark.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...typography.h3,
    color: colors.dark.text2,
  },
  // Portrait
  portrait: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  backButton: {
    position: 'absolute',
    left: spacing.lg,
    zIndex: 10,
    padding: spacing.xs,
  },
  backButtonText: {
    fontSize: 26,
    color: colors.dark.text,
    lineHeight: 32,
  },
  portraitInfo: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  blockChip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.dark.greenBg,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
    marginBottom: spacing.sm,
  },
  blockChipText: {
    ...typography.label,
    color: colors.dark.green,
    textTransform: 'uppercase',
  },
  authorName: {
    ...typography.h1,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  authorDates: {
    ...typography.bodyS,
    color: colors.dark.text2,
  },
  // Tabs
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.dark.bg,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    position: 'relative',
  },
  tabLabel: {
    ...typography.bodyS,
    color: colors.dark.text3,
  },
  tabLabelActive: {
    color: colors.dark.text,
    fontWeight: '600',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: spacing.xl,
    right: spacing.xl,
    height: 2,
    backgroundColor: colors.dark.green,
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
    color: colors.dark.text,
    fontStyle: 'italic',
    marginBottom: spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: colors.dark.border,
    marginBottom: spacing.lg,
  },
  paragraph: {
    marginBottom: spacing.lg,
  },
  contentText: {
    ...typography.body,
    color: colors.dark.text2,
    lineHeight: 26,
  },
  termLink: {
    color: colors.dark.green,
    fontWeight: '600',
  },
  closingLine: {
    ...typography.bodyS,
    color: colors.dark.text3,
    fontStyle: 'italic',
    marginTop: spacing.md,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.dark.border,
  },
  // Bottom bar
  bottomBar: {
    backgroundColor: colors.dark.bg,
    borderTopWidth: 1,
    borderTopColor: colors.dark.border,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  readButton: {
    backgroundColor: colors.dark.green,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  readButtonText: {
    ...typography.body,
    color: colors.dark.text,
    fontWeight: '600',
  },
});
