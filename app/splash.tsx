import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';

export default function SplashScreen() {
  const scale = useRef(new Animated.Value(0.94)).current;
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale,   { toValue: 1.0,  duration: 1200, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1.0,  duration: 1200, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scale,   { toValue: 0.94, duration: 1200, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.5,  duration: 1200, useNativeDriver: true }),
        ]),
      ])
    ).start();

    const timer = setTimeout(() => router.replace('/onboarding'), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoWrapper, { transform: [{ scale }], opacity }]}>
        {/* Logo SVG — add after: npx expo install react-native-svg */}
        <Text style={styles.wordmark}>Psylens</Text>
      </Animated.View>
      <Text style={styles.tagline}>La lente que afina tu visión del ser humano.</Text>
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
  logoWrapper: {
    alignItems: 'center',
  },
  wordmark: {
    ...typography.h1,
    color: colors.dark.text,
    marginTop: 16,
  },
  tagline: {
    ...typography.bodyS,
    color: colors.dark.text3,
    marginTop: 8,
    fontStyle: 'italic',
  },
});
