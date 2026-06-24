# Psylens — Sistema de Diseño

## Paleta de colores

```typescript
// constants/colors.ts

export const colors = {
  dark: {
    bg:       '#0f0f0e',
    bg2:      '#1a1a18',
    bg3:      '#252522',
    text:     '#f0ece3',
    text2:    '#b8b4ab',
    text3:    '#6e6b64',
    green:    '#0f6e56',
    greenBg:  '#0a2e25',
    purple:   '#534ab7',
    purpleBg: '#1e1b40',
    coral:    '#993c1d',
    border:   '#2a2a27',
  },
  light: {
    bg:       '#fafaf6',
    bg2:      '#f0ece3',
    bg3:      '#e8e4db',
    text:     '#0f0f0e',
    text2:    '#3a3a38',
    text3:    '#888780',
    green:    '#0f6e56',
    greenBg:  '#d4ede7',
    purple:   '#534ab7',
    purpleBg: '#e8e6f5',
    coral:    '#993c1d',
    border:   '#d8d4cb',
  },
};
```

## Tipografía

```typescript
// constants/typography.ts
// v1: fuentes del sistema. v2: Playfair Display para títulos.

export const typography = {
  h1:     { fontSize: 32, lineHeight: 40, fontWeight: '700' as const },
  h2:     { fontSize: 24, lineHeight: 32, fontWeight: '700' as const },
  h3:     { fontSize: 20, lineHeight: 28, fontWeight: '600' as const },
  h4:     { fontSize: 18, lineHeight: 26, fontWeight: '400' as const },
  body:   { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  bodyS:  { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
  bodyXS: { fontSize: 12, lineHeight: 16, fontWeight: '400' as const },
  label:  { fontSize: 11, lineHeight: 14, fontWeight: '500' as const, letterSpacing: 0.8 },
};
```

## Espaciado y Radios

```typescript
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, xxxl: 40 };
export const radius  = { sm: 8, md: 10, lg: 12, xl: 16, full: 9999 };
```

## Logo SVG

```tsx
// components/Logo.tsx
import Svg, { Circle, Line } from 'react-native-svg';

export const Logo = ({ color = '#f0ece3', size = 22 }) => (
  <Svg width={size} height={size * 0.636} viewBox="0 0 22 14" fill="none">
    <Circle cx="5"  cy="7" r="4" stroke={color} strokeWidth="1.2" />
    <Circle cx="17" cy="7" r="4" stroke={color} strokeWidth="1.2" />
    <Line x1="9" y1="7" x2="13" y2="7" stroke={color} strokeWidth="1.2" />
  </Svg>
);
```

Requiere: `npx expo install react-native-svg`

## Cómo usar los estilos (StyleSheet)

```tsx
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../constants/colors';
import { typography, spacing } from '../constants/typography';

export default function EjemploScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Título</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.bg,
    padding: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.dark.text,
  },
});
```

## Componentes — Especificaciones

### AuthorCard
- Alto: 110px, radius: 16
- Portrait circular: 64px, columna izquierda: 100px
- Estados:
  - `done` — portrait normal, badge verde con check
  - `active` — borde 1.5px purple, sombra sutil
  - `locked` — portrait gris con overlay, badge candado
  - `soon` — portrait gris, badge "Próximamente"
  - `premium` — opacidad 0.6, badge "Premium" púrpura

### ConceptCard
- Expandible, animación de altura 200ms
- Ícono rota 45° al abrir

### BottomSheet
- translateY 100%→0, 300ms ease-out
- Handle: 36×4px centrado, radius 2px
- Contenido: tag verde, título, definición, chips de conexión

### LayerTabs (Superficie / Concepto / Fondo)
- 3 tabs con indicador de progreso por puntos
- Punto 6px: lleno (leído) / 30% opacity (en progreso) / vacío

### StreakBar
- 7 chips horizontales (días de la semana)
- Verde = completado, bg3 = pendiente

## Animaciones

| Elemento | Tipo | Duración |
|---|---|---|
| Logo splash | scale 0.94→1.0 + opacity pulse | 2400ms infinite |
| Entrada pantalla | opacity 0→1 + translateY 8px | 500ms |
| BottomSheet | translateY 100%→0 | 300ms ease-out |
| ConceptCard | height expand | 200ms ease |
| Progress bar | width 0→X% | 600ms ease |

## Regla 90/10

90% tinta y papel. Acentos con moderación:
- Verde — progreso, completado, racha, términos linkeables
- Púrpura — estado activo, premium
- Coral — solo alertas

