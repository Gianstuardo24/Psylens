import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

type IonName = React.ComponentProps<typeof Ionicons>['name'];

// Resolved icon pair per tab
const ICONS: Record<string, { active: IonName; inactive: IonName }> = {
  index:    { active: 'home',    inactive: 'home-outline' },
  camino:   { active: 'map',     inactive: 'map-outline' },
  glosario: { active: 'book',    inactive: 'book-outline' },
  yo:       { active: 'person',  inactive: 'person-outline' },
};

function makeIcon(tab: string) {
  return ({ color, focused, size }: { color: string; focused: boolean; size: number }) => (
    <Ionicons
      name={focused ? ICONS[tab].active : ICONS[tab].inactive}
      size={size}
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
          fontSize: 11,
          fontWeight: '500',
          letterSpacing: 0.5,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Inicio',   tabBarIcon: makeIcon('index') }}
      />
      <Tabs.Screen
        name="camino"
        options={{ title: 'Camino',   tabBarIcon: makeIcon('camino') }}
      />
      <Tabs.Screen
        name="glosario"
        options={{ title: 'Glosario', tabBarIcon: makeIcon('glosario') }}
      />
      <Tabs.Screen
        name="yo"
        options={{ title: 'Yo',       tabBarIcon: makeIcon('yo') }}
      />
    </Tabs>
  );
}
