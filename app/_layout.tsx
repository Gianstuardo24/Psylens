import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../constants/colors';

// When the app is deep-linked directly to a screen, 'splash' sits behind it
// so the Android back button doesn't exit the app unexpectedly.
export const unstable_settings = {
  initialRouteName: 'splash',
};

export default function RootLayout() {
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

        {/* Main tab shell — replaces onboarding; no back-navigation desired */}
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
