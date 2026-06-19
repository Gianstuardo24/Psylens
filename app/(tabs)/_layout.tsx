import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { typography } from '../../constants/typography';
import { useTheme } from '../../hooks/useTheme';

type IonName = React.ComponentProps<typeof Ionicons>['name'];

// Resolved icon pair per tab
const ICONS: Record<string, { active: IonName; inactive: IonName }> = {
  index:   { active: 'home',    inactive: 'home-outline' },
  camino:  { active: 'map',     inactive: 'map-outline' },
  diario:  { active: 'book',    inactive: 'book-outline' },
  yo:      { active: 'person',  inactive: 'person-outline' },
};

const ICON_SIZE = 24;

function makeIcon(tab: string) {
  return ({ color, focused }: { color: string; focused: boolean }) => (
    <Ionicons
      name={focused ? ICONS[tab].active : ICONS[tab].inactive}
      size={ICON_SIZE}
      color={color}
    />
  );
}

export default function TabLayout() {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.bg2,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          height: 84,
          paddingBottom: 28,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.text3,
        tabBarLabelStyle: {
          fontSize: typography.label.fontSize,
          fontWeight: typography.label.fontWeight,
          letterSpacing: 0.4,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Inicio',   tabBarIcon: makeIcon('index') }}
        listeners={{ tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) }}
      />
      <Tabs.Screen
        name="camino"
        options={{ title: 'Camino',   tabBarIcon: makeIcon('camino') }}
        listeners={{ tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) }}
      />
      <Tabs.Screen
        name="diario"
        options={{ title: 'Diario', tabBarIcon: makeIcon('diario') }}
        listeners={{ tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) }}
      />
      <Tabs.Screen
        name="yo"
        options={{ title: 'Yo',       tabBarIcon: makeIcon('yo') }}
        listeners={{ tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) }}
      />
    </Tabs>
  );
}
