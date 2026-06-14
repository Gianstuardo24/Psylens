import { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  KeyboardAvoidingView,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { typography, spacing, radius } from '../constants/typography';
import { useTheme } from '../hooks/useTheme';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Theme = typeof colors.dark;

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
    title: '¿Por qué eres como eres?',
    description: 'No es una pregunta nueva. Lleva siglos siendo la más difícil — y la más importante.',
  },
  {
    key: 'layers',
    title: 'Hay quienes intentaron responderla.',
    description: 'Filósofos, médicos, científicos. Cada uno\nvio algo que los demás no habían visto.\nEste es su recorrido.',
  },
  {
    key: 'path',
    title: 'Y el tuyo también.',
    description: 'Conocerlos no es solo aprender historia. Sus ideas sobre la mente humana se vuelven una lente para entenderte mejor a ti mismo.',
  },
  {
    key: 'start',
    title: '¿Listo para empezar?',
    description: 'Tu primer autor te espera.\nEl recorrido comienza aquí.',
    isFinal: true,
  },
];

// ── Illustrations ─────────────────────────────────────────────────────────────

type IlStyles = ReturnType<typeof makeIlStyles>;

// Screen 1: logo assembles — right circle slides from overlap to final position,
// then the connecting line fades in.
function LogoIllustration({ il, active }: { il: IlStyles; active: boolean }) {
  const rightX = useRef(new Animated.Value(-100)).current;
  const lineOp = useRef(new Animated.Value(0)).current;
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(rightX, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(lineOp, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [active]);

  return (
    <View style={il.logoWrap}>
      <View style={il.logoRow}>
        <View style={il.logoCircle} />
        <Animated.View style={[il.logoLine, { opacity: lineOp }]} />
        <Animated.View style={{ transform: [{ translateX: rightX }] }}>
          <View style={il.logoCircle} />
        </Animated.View>
      </View>
      <Text style={il.wordmark}>Psylens</Text>
    </View>
  );
}

// Screen 2: rings expand outward — inner first, then mid, then outer.
// Rings are siblings (absolute) so each scales independently.
function RingsIllustration({ il, active }: { il: IlStyles; active: boolean }) {
  const s1 = useRef(new Animated.Value(0)).current;
  const s2 = useRef(new Animated.Value(0)).current;
  const s3 = useRef(new Animated.Value(0)).current;
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;
    Animated.sequence([
      Animated.timing(s1, { toValue: 1, duration: 300, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(s2, { toValue: 1, duration: 300, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(s3, { toValue: 1, duration: 300, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, [active]);

  return (
    <View style={il.ringWrap}>
      <Animated.View style={[il.ringOuter, { position: 'absolute', top: 0,  left: 0,  transform: [{ scale: s3 }] }]} />
      <Animated.View style={[il.ringMid,   { position: 'absolute', top: 32, left: 32, transform: [{ scale: s2 }] }]} />
      <Animated.View style={[il.ringInner, { position: 'absolute', top: 64, left: 64, transform: [{ scale: s1 }] }]} />
    </View>
  );
}

// Screen 3 — journey path.
//
// Container: 24px wide, 224px tall (absolute positioning throughout).
// node=16px, left=4 to center in 24px container; path line left=11 (centers 2px line).
// Stops at top=52, 104, 156, 208. Path line: top=16, max height=192 (reaches stop4).
//
// Step 1 (0–800ms):   single dot fades in and slides UP from y=80 to y=0.
// Step 2 (800–1400ms): path line expands downward; 4 stop nodes appear as path reaches each.
// Step 3 (1400–2200ms): colored dot travels from top (y=0) down to first stop (y=52).
function TimelineIllustration({ il, active }: { il: IlStyles; active: boolean }) {
  const startY   = useRef(new Animated.Value(80)).current;
  const startOp  = useRef(new Animated.Value(0)).current;
  const pathH    = useRef(new Animated.Value(0)).current;
  const node1Op  = useRef(new Animated.Value(0)).current;
  const node2Op  = useRef(new Animated.Value(0)).current;
  const node3Op  = useRef(new Animated.Value(0)).current;
  const node4Op  = useRef(new Animated.Value(0)).current;
  const travelY  = useRef(new Animated.Value(0)).current;
  const travelOp = useRef(new Animated.Value(0)).current;
  const hasRun   = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;

    Animated.parallel([
      // Step 1 (0–800ms): dot appears and moves up
      Animated.timing(startOp, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(startY,  { toValue: 0, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }),

      // Step 2 (800–1400ms): path expands linearly so node delays are predictable
      Animated.sequence([
        Animated.delay(800),
        Animated.timing(pathH, { toValue: 192, duration: 600, easing: Easing.linear, useNativeDriver: false }),
      ]),
      // Nodes appear as the expanding path reaches them (linear interpolation of 192px over 600ms)
      Animated.sequence([Animated.delay(900),  Animated.timing(node1Op, { toValue: 1, duration: 100, useNativeDriver: true })]),
      Animated.sequence([Animated.delay(1050), Animated.timing(node2Op, { toValue: 1, duration: 100, useNativeDriver: true })]),
      Animated.sequence([Animated.delay(1200), Animated.timing(node3Op, { toValue: 1, duration: 100, useNativeDriver: true })]),
      Animated.sequence([Animated.delay(1350), Animated.timing(node4Op, { toValue: 1, duration: 100, useNativeDriver: true })]),

      // Step 3 (1400–2200ms): traveling dot goes from top to first stop only
      Animated.sequence([Animated.delay(1400), Animated.timing(travelOp, { toValue: 1, duration: 150, useNativeDriver: true })]),
      Animated.sequence([Animated.delay(1400), Animated.timing(travelY, {
        toValue: 52,
        duration: 800,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      })]),
    ]).start();
  }, [active]);

  return (
    <View style={{ width: 24, height: 224, position: 'relative' }}>
      {/* Starting dot — fades in and slides up */}
      <Animated.View style={[il.timelineNode, {
        position: 'absolute', top: 0, left: 4,
        opacity: startOp, transform: [{ translateY: startY }],
      }]} />
      {/* Path line — expands downward from beneath starting dot */}
      <Animated.View style={[il.pathLine, { position: 'absolute', top: 16, left: 11, height: pathH }]} />
      {/* Four stop nodes — appear only as path reaches them */}
      <Animated.View style={[il.timelineNode, { position: 'absolute', top: 52,  left: 4, opacity: node1Op }]} />
      <Animated.View style={[il.timelineNode, { position: 'absolute', top: 104, left: 4, opacity: node2Op }]} />
      <Animated.View style={[il.timelineNode, { position: 'absolute', top: 156, left: 4, opacity: node3Op }]} />
      <Animated.View style={[il.timelineNode, { position: 'absolute', top: 208, left: 4, opacity: node4Op }]} />
      {/* Traveling colored dot — starts at top, moves to first stop */}
      <Animated.View style={[il.travelDot, {
        position: 'absolute', top: 0, left: 4,
        opacity: travelOp, transform: [{ translateY: travelY }],
      }]} />
    </View>
  );
}

function StartIllustration({ il }: { il: IlStyles }) {
  return (
    <View style={il.startCircle}>
      <Text style={il.startGlyph}>◎</Text>
    </View>
  );
}

function QuestionIllustration({ active }: { active: boolean }) {
  const rotation = useRef(new Animated.Value(0)).current;
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const t = (toValue: number, duration: number) =>
      Animated.timing(rotation, { toValue, duration, easing: Easing.out(Easing.quad), useNativeDriver: true });
    Animated.sequence([
      t(-8, 120), t(8, 120), t(-5, 100), t(5, 100), t(-2, 80), t(0, 80),
    ]).start();
  }, []);

  const rotate = rotation.interpolate({ inputRange: [-8, 8], outputRange: ['-8deg', '8deg'] });

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 120, color: '#1a1a1a', lineHeight: 140 }}>¿</Text>
      </Animated.View>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 120, color: '#1a1a1a', lineHeight: 140 }}>?</Text>
      </Animated.View>
    </View>
  );
}

function CirclesIllustration({ active }: { active: boolean }) {
  const S = 150, T = 145;

  const cx1 = useRef(new Animated.Value(S)).current;
  const cy1 = useRef(new Animated.Value(T)).current;
  const r1  = useRef(new Animated.Value(0)).current;
  const cx2 = useRef(new Animated.Value(S)).current;
  const cy2 = useRef(new Animated.Value(T)).current;
  const r2  = useRef(new Animated.Value(0)).current;
  const cx3 = useRef(new Animated.Value(S)).current;
  const cy3 = useRef(new Animated.Value(T)).current;
  const r3  = useRef(new Animated.Value(0)).current;
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;
    const cfg = { duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: false } as const;
    Animated.parallel([
      Animated.timing(cx1, { toValue: 150, ...cfg }),
      Animated.timing(cy1, { toValue: 107, ...cfg }),
      Animated.timing(r1,  { toValue: 63,  ...cfg }),
      Animated.timing(cx2, { toValue: 115, ...cfg }),
      Animated.timing(cy2, { toValue: 175, ...cfg }),
      Animated.timing(r2,  { toValue: 63,  ...cfg }),
      Animated.timing(cx3, { toValue: 185, ...cfg }),
      Animated.timing(cy3, { toValue: 175, ...cfg }),
      Animated.timing(r3,  { toValue: 63,  ...cfg }),
    ]).start();
  }, [active]);

  return (
    <View style={{ alignItems: 'center', width: '100%' }}>
      <Svg width="200" height="180" viewBox="0 0 300 240">
        <AnimatedCircle cx={cx1} cy={cy1} r={r1} fill="none" stroke="#0F6E56" strokeWidth="8.5" />
        <AnimatedCircle cx={cx2} cy={cy2} r={r2} fill="none" stroke="#0F6E56" strokeWidth="8.5" />
        <AnimatedCircle cx={cx3} cy={cy3} r={r3} fill="none" stroke="#0F6E56" strokeWidth="8.5" />
      </Svg>
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const { bottom: insetBottom } = useSafeAreaInsets();
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState('');

  const il     = useMemo(() => makeIlStyles(theme), [theme]);
  const styles = useMemo(() => makeStyles(theme), [theme]);

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
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {STEPS.map((step, index) => (
          <View key={step.key} style={[styles.page, { width }]}>

            {!step.isFinal && (
              <View style={styles.illustrationArea}>
                {index === 0 && <QuestionIllustration active={currentPage === 0} />}
                {index === 1 && <CirclesIllustration active={currentPage === 1} />}
                {index === 2 && <LogoIllustration il={il} active={currentPage === 2} />}
              </View>
            )}

            {step.isFinal ? (
              <View style={{ flex: 1 }}>
                <View style={{ marginTop: 110, height: 220, marginBottom: -20, alignItems: 'center' }}>
                  <StartIllustration il={il} />
                </View>
                <ScrollView
                  style={{ flex: 1 }}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={[
                    styles.textArea,
                    { paddingBottom: insetBottom + spacing.lg, paddingTop: 0 },
                  ]}
                >
                  <Text style={styles.titleFinal}>{step.title}</Text>
                  <Text style={styles.description}>{step.description}</Text>
                  <Text style={styles.nameLabel}>¿Cómo te llamas?</Text>
                  <TextInput
                    style={styles.nameInput}
                    placeholder="Tu nombre"
                    placeholderTextColor={theme.text3}
                    value={name}
                    onChangeText={setName}
                    textAlign="center"
                    autoCapitalize="words"
                    returnKeyType="done"
                  />
                </ScrollView>
                <View style={{ position: 'absolute', bottom: 50, left: 36, right: 36, zIndex: 10 }}>
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
                </View>
              </View>
            ) : (
              <Animated.View
                style={[
                  styles.textArea,
                  { paddingBottom: insetBottom + spacing.lg },
                  { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                ]}
              >
                <Text style={styles.title}>{step.title}</Text>
                <Text style={styles.description}>{step.description}</Text>
              </Animated.View>
            )}

          </View>
        ))}
      </ScrollView>

      <View
        style={[styles.dotsRow, { bottom: insetBottom + spacing.xl }]}
        pointerEvents="none"
      >
        {STEPS.map((_, i) => (
          <View key={i} style={[styles.dot, i === currentPage && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

// ── Illustration styles ───────────────────────────────────────────────────────

function makeIlStyles(theme: Theme) {
  return StyleSheet.create({
    // Screen 1 — Psylens logo mark + wordmark
    logoWrap: {
      alignItems: 'center',
    },
    logoRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoCircle: {
      width: 71,
      height: 71,
      borderRadius: 36,
      borderWidth: 7,
      borderColor: theme.text,
    },
    logoLine: {
      width: 40,
      height: 7,
      backgroundColor: theme.text,
    },
    wordmark: {
      fontFamily: 'PlayfairDisplay_700Bold',
      fontSize: typography.h1.fontSize,
      lineHeight: typography.h1.lineHeight,
      fontWeight: '700',
      color: theme.text,
      marginTop: spacing.xl,
      textAlign: 'center',
    },

    // Screen 2 — concentric rings (independent scale, siblings via absolute)
    ringWrap: {
      width: 200,
      height: 200,
    },
    ringOuter: {
      width: 200,
      height: 200,
      borderRadius: 100,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    ringMid: {
      width: 136,
      height: 136,
      borderRadius: 68,
      borderWidth: 1.5,
      borderColor: theme.text3,
    },
    ringInner: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: theme.green,
    },

    // Screen 3 — vertical reading timeline
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
      backgroundColor: theme.bg3,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    timelineNodeActive: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.green,
      borderColor: theme.green,
    },
    timelineSegment: {
      width: 2,
      height: 52,
      backgroundColor: theme.border,
    },
    // Path line for screen 3 (expands downward; height is animated)
    pathLine: {
      width: 2,
      backgroundColor: theme.border,
    },
    // Traveling dot and green path overlay for screen 3 animation
    travelLine: {
      backgroundColor: theme.green,
    },
    travelDot: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: theme.green,
    },

    // Screen 4 — start glyph
    startCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.greenBg,
      borderWidth: 2,
      borderColor: theme.green,
      alignItems: 'center',
      justifyContent: 'center',
    },
    startGlyph: {
      fontSize: 48,
      lineHeight: 56,
      color: theme.green,
    },
  });
}

// ── Main styles ───────────────────────────────────────────────────────────────

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },

    page: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: 60,
      paddingBottom: 40,
    },

    illustrationArea: {
      height: 320,
      alignItems: 'center',
      justifyContent: 'center',
    },

    textArea: {
      paddingHorizontal: 40,
      minHeight: 200,
      justifyContent: 'flex-start',
    },

    title: {
      ...typography.h2,
      color: theme.text,
      textAlign: 'center',
      marginBottom: spacing.md,
    },

    titleFinal: {
      ...typography.h1,
      color: theme.text,
      textAlign: 'center',
      marginBottom: spacing.md,
    },

    description: {
      ...typography.body,
      color: theme.text2,
      textAlign: 'center',
      lineHeight: 26,
      marginBottom: spacing.xxl,
    },

    button: {
      width: '100%',
      backgroundColor: theme.green,
      paddingVertical: spacing.lg,
      borderRadius: radius.lg,
      alignItems: 'center',
    },

    buttonText: {
      ...typography.body,
      color: '#ffffff',
      fontWeight: '600',
    },

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
      backgroundColor: theme.bg3,
    },

    dotActive: {
      width: 20,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.text,
    },

    nameLabel: {
      ...typography.bodyS,
      color: theme.text2,
      textAlign: 'center',
      marginBottom: spacing.sm,
    },
    nameInput: {
      ...typography.body,
      color: theme.text,
      borderBottomWidth: 1,
      borderBottomColor: theme.text,
      paddingVertical: spacing.md,
      marginBottom: spacing.xxl,
      textAlign: 'center',
    },
  });
}
