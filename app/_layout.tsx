import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_400Regular_Italic,
} from '@expo-google-fonts/playfair-display';
import * as SplashScreen from 'expo-splash-screen';
import { colors } from '../constants/colors';

SplashScreen.preventAutoHideAsync();

// When the app is deep-linked directly to a screen, 'splash' sits behind it
// so the Android back button doesn't exit the app unexpectedly.
export const unstable_settings = {
  initialRouteName: 'splash',
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular_Italic,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      {/* Force light-on-dark status bar across all screens */}
      <StatusBar style="light" backgroundColor={colors.dark.bg} />

      <Stack
        screenOptions={{
          headerShown: false,
          // Prevents a white flash between navigations on Android
          contentStyle: { backgroundColor: colors.dark.bg },
        }}
      >
        {/* Root redirect — no animation, just hands off immediately */}
        <Stack.Screen name="index" options={{ animation: 'none' }} />

        {/* Splash — fades in, then replaces itself with onboarding */}
        <Stack.Screen name="splash" options={{ animation: 'fade' }} />

        {/* Onboarding — replaces splash, then replaces itself with tabs */}
        <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />

        {/* Returning user welcome — shown after splash when onboarding is done */}
        <Stack.Screen name="returning" options={{ animation: 'fade' }} />

        {/* Main tab shell — replaces onboarding/returning; no back-navigation desired */}
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />

        {/* Author detail — pushed from camino or dashboard, slides in from right */}
        <Stack.Screen
          name="autor/[id]"
          options={{ animation: 'slide_from_right' }}
        />
      </Stack>
    </>
  );
}
