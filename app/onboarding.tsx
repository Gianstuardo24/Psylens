import { useState } from 'react';
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
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { typography, spacing, radius } from '../constants/typography';

type Step = {
  key: string;
  title: string;
  isFinal?: boolean;
};

const ONBOARDING_KEY = 'psylens_onboarding_done';

const STEPS: Step[] = [
  { key: 'mentor', title: 'Un recorrido por la mente humana.' },
  { key: 'layers', title: 'Tres profundidades.' },
  { key: 'path',   title: 'Un recorrido con memoria.' },
  { key: 'start',  title: '¿Por dónde empezamos?', isFinal: true },
];

// ─── Illustrations ────────────────────────────────────────────────────────────

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
      {[0, 1, 2, 3, 4].map((i) => (
        <View key={i} style={il.timelineItem}>
          <View style={[il.timelineNode, i === 2 && il.timelineNodeActive]} />
          {i < 4 && <View style={il.timelineSegment} />}
        </View>
      ))}
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const { width, height } = useWindowDimensions();
  const { bottom: insetBottom } = useSafeAreaInsets();
  const [currentPage, setCurrentPage] = useState(0);

  function handleMomentumScrollEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const page = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentPage(page);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {STEPS.map((step, index) => (
          <View key={step.key} style={[styles.page, { width, height }]}>

            {/* Illustration */}
            <View style={styles.illustrationArea}>
              {index === 0 && <LogoIllustration />}
              {index === 1 && <RingsIllustration />}
              {index === 2 && <TimelineIllustration />}
            </View>

            {/* Text + CTA */}
            <View style={[styles.textArea, { paddingBottom: insetBottom + spacing.xxxl + spacing.xxl }]}>
              <Text style={step.isFinal ? styles.titleFinal : styles.title}>
                {step.title}
              </Text>

              {step.isFinal && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    try {
                      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
                    } finally {
                      router.replace('/(tabs)');
                    }
                  }}
                  activeOpacity={0.85}
                >
                  <Text style={styles.buttonText}>Empezar</Text>
                </TouchableOpacity>
              )}
            </View>

          </View>
        ))}
      </ScrollView>

      {/* Dot indicators — float above content, clear home indicator */}
      <View style={[styles.dotsRow, { bottom: insetBottom + spacing.xl }]} pointerEvents="none">
        {STEPS.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === currentPage && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

// ─── Illustration styles ──────────────────────────────────────────────────────

const il = StyleSheet.create({
  // Step 1 — logo shape
  logoWrap: {
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: colors.dark.text,
  },
  logoLine: {
    width: 28,
    height: 1.5,
    backgroundColor: colors.dark.text,
  },
  wordmark: {
    ...typography.h2,
    color: colors.dark.text,
    marginTop: spacing.xl,
  },

  // Step 2 — three concentric rings (Superficie / Concepto / Fondo)
  ringOuter: {
    width: 188,
    height: 188,
    borderRadius: 94,
    borderWidth: 1,
    borderColor: colors.dark.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringMid: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 1,
    borderColor: colors.dark.text3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.dark.green,
  },

  // Step 3 — vertical timeline
  timelineWrap: {
    alignItems: 'center',
  },
  timelineItem: {
    alignItems: 'center',
  },
  timelineNode: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.dark.bg3,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  timelineNodeActive: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.dark.green,
    borderColor: colors.dark.green,
  },
  timelineSegment: {
    width: 1.5,
    height: 40,
    backgroundColor: colors.dark.border,
  },
});

// ─── Main styles ──────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.bg,
  },

  page: {
    // width and height set dynamically via useWindowDimensions
  },

  illustrationArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textArea: {
    paddingHorizontal: spacing.xl,
    // paddingBottom applied inline to incorporate safe area inset dynamically
  },

  title: {
    ...typography.h2,
    color: colors.dark.text,
    marginBottom: spacing.xxl,
  },

  titleFinal: {
    ...typography.h1,
    color: colors.dark.text,
    marginBottom: spacing.xxl,
  },

  button: {
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

  // Dots — absolutely positioned so they sit over the scroll area
  dotsRow: {
    position: 'absolute',
    // bottom applied inline to incorporate safe area inset dynamically
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
});
