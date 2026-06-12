import { useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { colors } from '../constants/colors';
import { typography, spacing } from '../constants/typography';
import { Logo } from '../components/Logo';
import { useTheme } from '../hooks/useTheme';

type Theme = typeof colors.dark;

const LOGO_SIZE       = 126;
const ONBOARDING_KEY  = 'psylens_onboarding_done';
const SPLASH_DURATION = 2500;

export default function SplashScreen() {
  const { theme } = useTheme();
  const scale = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1.0,
      duration: 2400,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();

    async function navigate() {
      const flag = await AsyncStorage.getItem(ONBOARDING_KEY).catch(() => null);
      await new Promise<void>(r => setTimeout(r, SPLASH_DURATION));
      router.replace(flag !== null ? '/returning' : '/onboarding');
    }
    navigate();
  }, []);

  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale }], alignItems: 'center' }}>
        <Logo size={LOGO_SIZE} color={theme.text} />
        <Text style={styles.wordmark}>Psylens</Text>
        <Text style={styles.tagline}>La lente que afina tu visión del ser humano.</Text>
      </Animated.View>
    </View>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    wordmark: {
      ...typography.h1,
      fontSize: 38,
      color: theme.text,
      marginTop: spacing.lg,
    },
    tagline: {
      ...typography.bodyS,
      fontSize: 18,
      color: theme.text3,
      marginTop: spacing.md,
      fontStyle: 'italic',
    },
  });
}
