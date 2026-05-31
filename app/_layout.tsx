import { Stack } from 'expo-router';

// Tells Expo Router that 'splash' is the base of the stack.
// Deep links into other screens will have splash behind them in history.
export const unstable_settings = {
  initialRouteName: 'splash',
};

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
