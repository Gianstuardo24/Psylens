import { useState, useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  PanResponder,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { typography, spacing, radius } from '../constants/typography';
import { glossaryTerms, authors, conceptThreads } from '../constants/data';
import { useTheme } from '../hooks/useTheme';

type Theme = typeof colors.dark;

const SHEET_HEIGHT = 460;

interface BottomSheetProps {
  visible: boolean;
  termId: string | null;
  onClose: () => void;
}

export default function BottomSheet({ visible, termId, onClose }: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  // Internal term navigation — chips can switch the displayed term without closing
  const [currentTermId, setCurrentTermId] = useState<string | null>(termId);

  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  // Keep onClose fresh inside the stable PanResponder closure
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  // Sync content when the parent opens with a new termId
  useEffect(() => {
    if (visible && termId) setCurrentTermId(termId);
  }, [termId, visible]);

  // Slide-in animation on open
  useEffect(() => {
    if (visible) {
      translateY.setValue(SHEET_HEIGHT);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  // Overlay fades proportionally to sheet position during swipe
  const overlayOpacity = translateY.interpolate({
    inputRange: [0, SHEET_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Animate out, then notify parent
  function dismiss() {
    Animated.timing(translateY, {
      toValue: SHEET_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onCloseRef.current());
  }

  // PanResponder created once — uses refs to avoid stale closures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      // Capture downward drag only; let horizontal scroll pass through
      onMoveShouldSetPanResponder: (_, { dy, dx }) => dy > 10 && dy > Math.abs(dx),
      onPanResponderMove: (_, { dy }) => {
        if (dy > 0) translateY.setValue(dy);
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        if (dy > 80 || vy > 0.8) {
          Animated.timing(translateY, {
            toValue: SHEET_HEIGHT,
            duration: 250,
            useNativeDriver: true,
          }).start(() => onCloseRef.current());
        } else {
          // Snap back
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 120,
            friction: 10,
          }).start();
        }
      },
    })
  ).current;

  const styles = useMemo(() => makeStyles(theme), [theme]);

  if (!visible) return null;

  const term = glossaryTerms.find(t => t.id === currentTermId);
  if (!term) return null;

  const author = authors.find(a => a.id === term.authorId);

  // --- Build related chips ---
  // 1. Other terms by the same author
  const sameAuthorChips = glossaryTerms.filter(
    t => t.authorId === term.authorId && t.id !== currentTermId
  );

  // 2. Terms from conceptually connected authors (via conceptThreads)
  const connectedAuthorIds = new Set(
    conceptThreads
      .filter(th => th.from === term.authorId || th.to === term.authorId)
      .map(th => (th.from === term.authorId ? th.to : th.from))
  );
  const connectedChips = glossaryTerms.filter(
    t => connectedAuthorIds.has(t.authorId) && t.id !== currentTermId
  );

  // Cap to a readable number
  const chipTerms = [...sameAuthorChips.slice(0, 2), ...connectedChips.slice(0, 3)];

  return (
    <Modal transparent animationType="none" onRequestClose={dismiss}>
      <View style={StyleSheet.absoluteFill}>
        {/* Dimmed overlay — tap to close */}
        <Animated.View style={[StyleSheet.absoluteFill, styles.overlay, { opacity: overlayOpacity }]}>
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={dismiss} />
        </Animated.View>

        {/* Sheet panel */}
        <Animated.View
          style={[
            styles.sheet,
            { paddingBottom: insets.bottom + spacing.md, transform: [{ translateY }] },
          ]}
          {...panResponder.panHandlers}
        >
          {/* Handle */}
          <View style={styles.handleRow}>
            <View style={styles.handle} />
          </View>

          {/* Concepto tag */}
          <View style={styles.tag}>
            <Text style={styles.tagText}>Concepto</Text>
          </View>

          {/* Term title */}
          <Text style={styles.title}>{term.term}</Text>

          {/* Author origin line */}
          {author && (
            <Text style={styles.origin}>
              {author.name}
              {'  ·  '}
              {author.dates}
            </Text>
          )}

          {/* Divider */}
          <View style={styles.divider} />

          {/* Definition */}
          <Text style={styles.definition}>{term.definition}</Text>

          {/* Related chips */}
          {chipTerms.length > 0 && (
            <View style={styles.chipsSection}>
              <Text style={styles.chipsLabel}>Ver también</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsRow}
              >
                {chipTerms.map(ct => (
                  <TouchableOpacity
                    key={ct.id}
                    style={[styles.chip, ct.id === currentTermId && styles.chipActive]}
                    onPress={() => setCurrentTermId(ct.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.chipText, ct.id === currentTermId && styles.chipTextActive]}>
                      {ct.term}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.65)',
    },
    sheet: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: SHEET_HEIGHT,
      backgroundColor: theme.bg2,
      borderTopLeftRadius: radius.xl,
      borderTopRightRadius: radius.xl,
      paddingHorizontal: spacing.xl,
    },
    // Handle
    handleRow: {
      alignItems: 'center',
      paddingTop: spacing.md,
      paddingBottom: spacing.lg,
    },
    handle: {
      width: 36,
      height: 4,
      backgroundColor: theme.bg3,
      borderRadius: 2,
    },
    // Tag
    tag: {
      alignSelf: 'flex-start',
      backgroundColor: theme.greenBg,
      borderRadius: radius.full,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      marginBottom: spacing.md,
    },
    tagText: {
      ...typography.label,
      color: theme.green,
      textTransform: 'uppercase',
    },
    // Title (h2 weight; Playfair Display in v2)
    title: {
      ...typography.h2,
      color: theme.text,
      marginBottom: spacing.xs,
    },
    // Author origin
    origin: {
      ...typography.bodyXS,
      color: theme.text3,
      letterSpacing: 0.3,
      marginBottom: spacing.lg,
    },
    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginBottom: spacing.lg,
    },
    // Definition
    definition: {
      ...typography.body,
      color: theme.text2,
      lineHeight: 26,
    },
    // Related chips
    chipsSection: {
      marginTop: spacing.xl,
    },
    chipsLabel: {
      ...typography.label,
      color: theme.text3,
      textTransform: 'uppercase',
      marginBottom: spacing.sm,
    },
    chipsRow: {
      flexDirection: 'row',
      gap: spacing.sm,
      paddingRight: spacing.xl,
    },
    chip: {
      minHeight: 44,
      backgroundColor: theme.bg3,
      borderRadius: radius.full,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderWidth: 1,
      borderColor: theme.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chipActive: {
      backgroundColor: theme.greenBg,
      borderColor: theme.green,
    },
    chipText: {
      ...typography.bodyS,
      color: theme.text2,
    },
    chipTextActive: {
      color: theme.green,
    },
  });
}
