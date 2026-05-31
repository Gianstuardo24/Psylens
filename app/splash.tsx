import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { colors } from '../constants/colors';
import { typography, spacing } from '../constants/typography';
import { Logo } from '../components/Logo';

const LOGO_SIZE     = 80;
const ONBOARDING_KEY  = 'psylens_onboarding_done';
const SPLASH_DURATION = 2500;

// Ease-out curve for entrance: fast start, gentle settle
const EASE_OUT = Easing.out(Easing.ease);

export default function SplashScreen() {
  // ── Entrance animated values ───────────────────────────────────────────────
  const mainOpacity     = useRef(new Animated.Value(0)).current;   // 0 → 1
  const mainTranslateY  = useRef(new Animated.Value(8)).current;   // 8 → 0
  const taglineOpacity  = useRef(new Animated.Value(0)).current;   // 0 → 1
  const taglineTranslateY = useRef(new Animated.Value(8)).current; // 8 → 0

  // ── Pulse animated values (take over after entrance) ──────────────────────
  // mainOpacity also participates in pulse (1.0 → 0.5 → 1.0)
  const pulseScale = useRef(new Animated.Value(1.0)).current;      // 1.0 → 0.94 → 1.0

  useEffect(() => {
    let cancelled = false;

    // ── Phase 1a: logo + wordmark entrance (800ms, ease-out) ────────────────
    Animated.parallel([
      Animated.timing(mainOpacity, {
        toValue: 1,
        duration: 800,
        easing: EASE_OUT,
        useNativeDriver: true,
      }),
      Animated.timing(mainTranslateY, {
        toValue: 0,
        duration: 800,
        easing: EASE_OUT,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      // ── Phase 2: pulse begins immediately after entrance ─────────────────
      if (!finished || cancelled) return;
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(mainOpacity, { toValue: 0.5,  duration: 1200, useNativeDriver: true }),
            Animated.timing(pulseScale,  { toValue: 0.94, duration: 1200, useNativeDriver: true }),
          ]),
          Animated.parallel([
            Animated.timing(mainOpacity, { toValue: 1.0, duration: 1200, useNativeDriver: true }),
            Animated.timing(pulseScale,  { toValue: 1.0, duration: 1200, useNativeDriver: true }),
          ]),
        ]),
      ).start();
    });

    // ── Phase 1b: tagline entrance, 300ms after logo (runs concurrently) ───
    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 800,
          easing: EASE_OUT,
          useNativeDriver: true,
        }),
        Animated.timing(taglineTranslateY, {
          toValue: 0,
          duration: 800,
          easing: EASE_OUT,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // ── Navigation: AsyncStorage check races with minimum splash timer ──────
    async function checkAndNavigate() {
      const [flag] = await Promise.all([
        AsyncStorage.getItem(ONBOARDING_KEY).catch(() => null),
        new Promise<void>(resolve => setTimeout(resolve, SPLASH_DURATION)),
      ]);
      if (!cancelled) {
        router.replace(flag !== null ? '/(tabs)' : '/onboarding');
      }
    }
    checkAndNavigate();

    return () => { cancelled = true; };
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo + wordmark — entrance then pulse */}
      <Animated.View
        style={[
          styles.centerGroup,
          {
            opacity: mainOpacity,
            transform: [{ translateY: mainTranslateY }, { scale: pulseScale }],
          },
        ]}
      >
        <Logo size={LOGO_SIZE} color={colors.dark.text} />
        <Text style={styles.wordmark}>Psylens</Text>
      </Animated.View>

      {/* Tagline — fades in 300ms after logo */}
      <Animated.View
        style={{
          opacity: taglineOpacity,
          transform: [{ translateY: taglineTranslateY }],
        }}
      >
        <Text style={styles.tagline}>La lente que afina tu visión del ser humano.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerGroup: {
    alignItems: 'center',
  },
  wordmark: {
    ...typography.h1,
    color: colors.dark.text,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }),
    marginTop: spacing.lg,
  },
  tagline: {
    ...typography.bodyS,
    color: colors.dark.text3,
    marginTop: spacing.md,
    fontStyle: 'italic',
  },
});
