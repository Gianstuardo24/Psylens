import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { typography, spacing, radius } from '../constants/typography';

const ONBOARDING_KEY = 'psylens_onboarding_done';
const NAME_KEY       = 'psylens_user_name';
type Step = {
  key: string;
  title: string;
  description: string;
  isFinal?: boolean;
};

const STEPS: Step[] = [
  {
    key: 'mentor',
    title: 'Un recorrido por la mente humana.',
    description: 'Descubre a los pensadores que definieron nuestra comprensión de la psicología, de Platón a Freud.',
  },
  {
    key: 'layers',
    title: 'Tres profundidades.',
    description: 'Cada autor tiene tres capas: Superficie, Concepto y Fondo. Avanza cuando estés listo.',
  },
  {
    key: 'path',
    title: 'Un recorrido con memoria.',
    description: 'Psylens recuerda dónde lo dejaste. Tu progreso es tuyo.',
  },
  {
    key: 'start',
    title: '¿Listo para empezar?',
    description: 'Tu primer autor te espera. El recorrido comienza aquí.',
    isFinal: true,
  },
];

// ── Illustrations ─────────────────────────────────────────────────────────────
// Each illustration is at least 120px in its dominant dimension.

function LogoIllustration() {
  return (
    <View style={il.logoWrap}>
      <View style={il.logoRow}>
        <View style={il.logoCircle} />
        <View style={il.logoLine} />
        <View style={il.logoCircle} />
      </View>
      <Text style={il.wordmark}>Psylens</Text>
    </View>
  );
}

function RingsIllustration() {
  return (
    <View style={il.ringOuter}>
      <View style={il.ringMid}>
        <View style={il.ringInner} />
      </View>
    </View>
  );
}

function TimelineIllustration() {
  return (
    <View style={il.timelineWrap}>
      {[0, 1, 2, 3, 4].map(i => (
        <View key={i} style={il.timelineItem}>
          <View style={[il.timelineNode, i === 2 && il.timelineNodeActive]} />
          {i < 4 && <View style={il.timelineSegment} />}
        </View>
      ))}
    </View>
  );
}

function StartIllustration() {
  return (
    <View style={il.startCircle}>
      <Text style={il.startGlyph}>◎</Text>
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const { width, height } = useWindowDimensions();
  const { bottom: insetBottom } = useSafeAreaInsets();
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState('');

  // Shared entrance animation — applies to the text block of whichever page
  // is visible when the scroll settles. Only one page is on screen at a time,
  // so a single shared value works correctly.
  const fadeAnim  = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(12);
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, [currentPage]);

  function handleMomentumScrollEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const page = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentPage(page);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {STEPS.map((step, index) => (
          <View key={step.key} style={[styles.page, { width, height }]}>

            {/* Illustration — static, not animated */}
            <View style={styles.illustrationArea}>
              {index === 0 && <LogoIllustration />}
              {index === 1 && <RingsIllustration />}
              {index === 2 && <TimelineIllustration />}
              {index === 3 && <StartIllustration />}
            </View>

            {/* Text block — animated on step change */}
            <Animated.View
              style={[
                styles.textArea,
                { paddingBottom: insetBottom + spacing.xxxl + spacing.xxl },
                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
              ]}
            >
              <Text style={step.isFinal ? styles.titleFinal : styles.title}>
                {step.title}
              </Text>

              <Text style={styles.description}>{step.description}</Text>

              {step.isFinal && (
                <>
                  <Text style={styles.nameLabel}>¿Cómo te llamas?</Text>
                  <TextInput
                    style={styles.nameInput}
                    placeholder="Tu nombre"
                    placeholderTextColor={colors.dark.text3}
                    value={name}
                    onChangeText={setName}
                    textAlign="center"
                    autoCapitalize="words"
                    returnKeyType="done"
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                      try {
                        const saves: Promise<void>[] = [
                          AsyncStorage.setItem(ONBOARDING_KEY, 'true'),
                        ];
                        if (name.trim()) {
                          saves.push(AsyncStorage.setItem(NAME_KEY, name.trim()));
                        }
                        await Promise.all(saves);
                      } finally {
                        router.replace('/(tabs)');
                      }
                    }}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.buttonText}>Empezar</Text>
                  </TouchableOpacity>
                </>
              )}
            </Animated.View>

          </View>
        ))}
      </ScrollView>

      {/* Dot indicators — absolutely positioned, centered */}
      <View
        style={[styles.dotsRow, { bottom: insetBottom + spacing.xl }]}
        pointerEvents="none"
      >
        {STEPS.map((_, i) => (
          <View key={i} style={[styles.dot, i === currentPage && styles.dotActive]} />
        ))}
      </View>
    </KeyboardAvoidingView>
  );
}

// ── Illustration styles ───────────────────────────────────────────────────────

const il = StyleSheet.create({
  // Step 1 — Psylens logo mark + wordmark
  logoWrap: {
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.dark.text,
  },
  logoLine: {
    width: 36,
    height: 2,
    backgroundColor: colors.dark.text,
  },
  wordmark: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: typography.h1.fontSize,
    lineHeight: typography.h1.lineHeight,
    fontWeight: '700',
    color: colors.dark.text,
    marginTop: spacing.xl,
    textAlign: 'center',
  },

  // Step 2 — concentric rings (Superficie / Concepto / Fondo)
  ringOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: colors.dark.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringMid: {
    width: 136,
    height: 136,
    borderRadius: 68,
    borderWidth: 1.5,
    borderColor: colors.dark.text3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.dark.green,
  },

  // Step 3 — vertical reading timeline
  timelineWrap: {
    alignItems: 'center',
  },
  timelineItem: {
    alignItems: 'center',
  },
  timelineNode: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.dark.bg3,
    borderWidth: 1.5,
    borderColor: colors.dark.border,
  },
  timelineNodeActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.dark.green,
    borderColor: colors.dark.green,
  },
  timelineSegment: {
    width: 2,
    height: 52,
    backgroundColor: colors.dark.border,
  },

  // Step 4 — start glyph
  startCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.dark.greenBg,
    borderWidth: 2,
    borderColor: colors.dark.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startGlyph: {
    fontSize: 48,
    lineHeight: 56,
    color: colors.dark.green,
  },
});

// ── Main styles ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.bg,
  },

  page: {
    // width + height applied dynamically
  },

  illustrationArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textArea: {
    paddingHorizontal: spacing.xl,
    // paddingBottom applied inline to incorporate safe-area inset
  },

  title: {
    ...typography.h2,
    color: colors.dark.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  titleFinal: {
    ...typography.h1,
    color: colors.dark.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  description: {
    ...typography.body,
    color: colors.dark.text2,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: spacing.xxl,
  },

  // "Empezar" — full width, green background
  button: {
    width: '100%',
    backgroundColor: colors.dark.green,
    paddingVertical: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
  },

  buttonText: {
    ...typography.body,
    color: colors.dark.text,
    fontWeight: '600',
  },

  // Dots — centered via justifyContent
  dotsRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.dark.bg3,
  },

  dotActive: {
    width: 20,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.dark.text,
  },

  // Name input on final step
  nameLabel: {
    ...typography.bodyS,
    color: colors.dark.text2,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  nameInput: {
    ...typography.body,
    color: colors.dark.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.text,
    paddingVertical: spacing.md,
    marginBottom: spacing.xxl,
    textAlign: 'center',
  },
});
