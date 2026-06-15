import { useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { colors } from '../constants/colors';
import { typography, spacing } from '../constants/typography';
import { Logo } from '../components/Logo';
import { useTheme } from '../hooks/useTheme';

type Theme = typeof colors.dark;

const LOGO_SIZE       = 151;
const ONBOARDING_KEY  = 'psylens_onboarding_done';
const SPLASH_DURATION = 2500;

export default function SplashScreen() {
  const { theme } = useTheme();
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const loadingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(loadingAnim, {
      toValue: 1,
      duration: 2300,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false,
    }).start();

    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1200,
      delay: 200,
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
      <Animated.View style={{ opacity: opacityAnim, alignItems: 'center', paddingHorizontal: 32 }}>
        <Logo size={LOGO_SIZE} color={theme.text} strokeWidth={5.5} />
        <Text style={styles.wordmark}>Psylens</Text>
        <Text style={styles.tagline}>La lente que afina tu visión del ser humano.</Text>
      </Animated.View>
      <View style={styles.loadingTrack}>
        <Animated.View
          style={[
            styles.loadingBar,
            {
              width: loadingAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
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
      fontSize: 16,
      color: theme.text3,
      marginTop: spacing.md,
      fontStyle: 'italic',
    },
    loadingTrack: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 2,
      backgroundColor: 'transparent',
    },
    loadingBar: {
      height: 2,
      backgroundColor: '#0F6E56',
    },
  });
}
