import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';

type IonName = React.ComponentProps<typeof Ionicons>['name'];

// Resolved icon pair per tab
const ICONS: Record<string, { active: IonName; inactive: IonName }> = {
  index:    { active: 'home',    inactive: 'home-outline' },
  camino:   { active: 'map',     inactive: 'map-outline' },
  glosario: { active: 'book',    inactive: 'book-outline' },
  yo:       { active: 'person',  inactive: 'person-outline' },
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
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.dark.bg2,
          borderTopColor: colors.dark.border,
          borderTopWidth: 1,
          height: 84,
          paddingBottom: 28,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.dark.text,
        tabBarInactiveTintColor: colors.dark.text3,
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
        name="glosario"
        options={{ title: 'Glosario', tabBarIcon: makeIcon('glosario') }}
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
