# Psylens — Pantallas

## Navegación global

```
Stack raíz
├── splash.tsx               → Solo al cargar (2.5s)
├── onboarding.tsx           → Solo primer uso
└── (tabs)/                  → Navegación principal
    ├── index.tsx            → Inicio (Dashboard)
    ├── camino.tsx           → Camino
    ├── glosario.tsx         → Glosario
    └── yo.tsx               → Perfil

Stack modal
└── autor/[id].tsx           → Pantalla de autor
```

## Implementación con StyleSheet

Todas las pantallas usan StyleSheet.create(). Ejemplo base:

```tsx
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../constants/colors';
import { typography, spacing } from '../../constants/typography';

export default function NombreScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Título</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.dark.bg },
  title: { ...typography.h2, color: colors.dark.text, padding: spacing.lg },
});
```

---

## 1. SPLASH

**Archivo:** `app/splash.tsx`

```tsx
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
          Animated.timing(scale,   { toValue: 1.0, duration: 1200, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1.0, duration: 1200, useNativeDriver: true }),
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
      <Animated.View style={{ transform: [{ scale }], opacity }}>
        {/* Logo SVG aquí */}
        <Text style={styles.wordmark}>Psylens</Text>
      </Animated.View>
      <Text style={styles.tagline}>La lente que afina tu visión del ser humano.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: colors.dark.bg, alignItems: 'center', justifyContent: 'center' },
  wordmark:   { ...typography.h1, color: colors.dark.text, marginTop: 16 },
  tagline:    { ...typography.bodyS, color: colors.dark.text3, marginTop: 8, fontStyle: 'italic' },
});
```

---

## 2. ONBOARDING (4 pasos)

**Archivo:** `app/onboarding.tsx`

4 pasos con scroll horizontal. Indicadores de punto abajo.

- Paso 1: Logo + "Conocimiento de experto, voz de mentor."
- Paso 2: Tres anillos + "Tres profundidades."
- Paso 3: Línea cronológica + "Un recorrido con memoria."
- Paso 4: "¿Por dónde empezamos?" + botón "Empezar"

Botón Empezar → `router.replace('/(tabs)')`

---

## 3. INICIO (Dashboard)

**Archivo:** `app/(tabs)/index.tsx`

- Header: saludo + wordmark centrado
- StreakBar: 7 días
- Sección "Continuar": AuthorCard del autor activo
- Sección "Tu progreso": barra de progreso del bloque
- Acceso rápido: chips Glosario y Camino

---

## 4. CAMINO

**Archivo:** `app/(tabs)/camino.tsx`

- Lista vertical de BlockNodes
- Cada bloque: ícono + nombre + barra de progreso + estado
- Tap en bloque activo → lista de AuthorCards del bloque
- Tap en autor → `router.push('/autor/[id]')`

---

## 5. PANTALLA DE AUTOR

**Archivo:** `app/autor/[id].tsx`

- Portrait: imagen 100% ancho, ~240px alto, gradiente inferior
- Header sobre portrait: nombre (h1), fechas, chip del bloque
- LayerTabs fijos: Superficie · Concepto · Fondo
- ScrollView por tab con el contenido de CONTENT.md
- Términos en verde → tap abre BottomSheet
- Botón fijo abajo: "Marcar como leído"

---

## 6. BOTTOM SHEET — Término

- Se abre al tocar cualquier término verde
- Handle + tag verde + título serif + definición + chips de conexión
- Swipe down o tap en overlay para cerrar

---

## 7. GLOSARIO

**Archivo:** `app/(tabs)/glosario.tsx`

- Buscador con filtro en tiempo real
- Lista agrupada por autor
- Tap en término → BottomSheet
- Estado vacío si no hay términos desbloqueados

---

## 8. YO (Perfil)

**Archivo:** `app/(tabs)/yo.tsx`

- Avatar + nombre + email
- Estadísticas: racha, autores completados, capas leídas
- Ajustes: modo oscuro/claro, idioma, recordatorio, suscripción
- Cuenta: cerrar sesión, eliminar cuenta

---

## 9. BOTTOM TAB NAVIGATOR

**Archivo:** `app/(tabs)/_layout.tsx`

```tsx
import { Tabs } from 'expo-router';
import { colors } from '../../constants/colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.dark.bg2,
        borderTopColor: colors.dark.border,
        height: 84,
        paddingBottom: 28,
      },
      tabBarActiveTintColor: colors.dark.text,
      tabBarInactiveTintColor: colors.dark.text3,
    }}>
      <Tabs.Screen name="index"    options={{ title: 'Inicio' }} />
      <Tabs.Screen name="camino"   options={{ title: 'Camino' }} />
      <Tabs.Screen name="glosario" options={{ title: 'Glosario' }} />
      <Tabs.Screen name="yo"       options={{ title: 'Yo' }} />
    </Tabs>
  );
}
```

---

## 10. SUSCRIPCIÓN (Paywall)

- Modal bottom sheet al intentar acceder a contenido premium
- Título: "Esto es contenido Premium"
- CTA: "Ver planes →"
- Planes mensual y anual con badge de ahorro
- Botón "Continuar" verde

---

## 11. BLOQUE COMPLETADO

- Modal al terminar todos los autores de un bloque
- Animación fadeUp + confetti sutil
- Resumen: autores, conceptos, días
- CTA: "Continuar al Bloque [N+1]"

