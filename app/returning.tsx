import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Pressable, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../constants/colors';
import { typography, spacing, radius } from '../constants/typography';
import { Logo } from '../components/Logo';

const LOGO_SIZE = 56;

const PHRASES = [
  'Cada paso hace el camino más claro.',
  'Un paso más en el camino.',
  'Cada vez que vuelves, comprendes un poco más.',
];

function getDailyPhrase(): string {
  const day = new Date().getDay(); // 0-6
  return PHRASES[day % 3];
}

export default function ReturningScreen() {
  const opacity = useRef(new Animated.Value(0.55)).current;
  const scale   = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(opacity, { toValue: 1.0,  duration: 1400, useNativeDriver: true }),
          Animated.timing(scale,   { toValue: 1.0,  duration: 1400, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0.55, duration: 1400, useNativeDriver: true }),
          Animated.timing(scale,   { toValue: 0.95, duration: 1400, useNativeDriver: true }),
        ]),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Animated.View style={{ opacity, transform: [{ scale }] }}>
            <Logo size={LOGO_SIZE} color={colors.dark.text} />
          </Animated.View>

          <Text style={styles.phrase}>{getDailyPhrase()}</Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.buttonText}>Continuar →</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.dark.bg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.dark.bg,
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxl,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxxl,
  },
  phrase: {
    ...typography.h2,
    fontFamily: 'PlayfairDisplay_400Regular_Italic',
    fontWeight: '400',
    fontStyle: 'italic',
    color: colors.dark.text,
    textAlign: 'center',
    lineHeight: 36,
  },
  button: {
    backgroundColor: colors.dark.green,
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    ...typography.body,
    color: colors.dark.text,
    fontWeight: '600',
  },
});
