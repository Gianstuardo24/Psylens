import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { colors } from '../constants/colors';
import { typography, spacing } from '../constants/typography';
import { Logo } from '../components/Logo';

const LOGO_SIZE       = 64;
const ONBOARDING_KEY  = 'psylens_onboarding_done';
const SPLASH_DURATION = 2500;

export default function SplashScreen() {
  const opacity = useRef(new Animated.Value(0.5)).current;
  const scale   = useRef(new Animated.Value(0.94)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(opacity, { toValue: 1.0,  duration: 1200, useNativeDriver: true }),
          Animated.timing(scale,   { toValue: 1.0,  duration: 1200, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0.5,  duration: 1200, useNativeDriver: true }),
          Animated.timing(scale,   { toValue: 0.94, duration: 1200, useNativeDriver: true }),
        ]),
      ]),
    );

    anim.start();

    async function navigate() {
      const flag = await AsyncStorage.getItem(ONBOARDING_KEY).catch(() => null);
      await new Promise<void>(r => setTimeout(r, SPLASH_DURATION));
      router.replace(flag !== null ? '/(tabs)' : '/onboarding');
    }
    navigate();

    return () => anim.stop();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity, transform: [{ scale }], alignItems: 'center' }}>
        <Logo size={LOGO_SIZE} color={colors.dark.text} />
        <Text style={styles.wordmark}>Psylens</Text>
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
  wordmark: {
    ...typography.h1,
    color: colors.dark.text,
    marginTop: spacing.lg,
  },
  tagline: {
    ...typography.bodyS,
    color: colors.dark.text3,
    marginTop: spacing.md,
    fontStyle: 'italic',
  },
});
