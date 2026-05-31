# Psylens — Project Brain

## Qué es esta app

Psylens es una app móvil educativa de psicología. "Psy + Lens" — la lente que afina tu visión del ser humano. El usuario recorre la historia de la psicología en orden cronológico, desbloqueando autores y conceptos capa por capa. Cada autor tiene tres capas de profundidad: Superficie (cotidiana), Concepto (mecanismo), Fondo (implicaciones y legado).

## Tech Stack

- React Native + Expo SDK 54
- StyleSheet nativo de React Native para todos los estilos (NO NativeWind)
- Expo Router v3 para navegación
- TypeScript en todos los archivos
- Windows development environment
- Sin Babel plugins adicionales

## Setup del entorno

### Para conectar el teléfono
- VPN desactivada en el iPhone
- PC y iPhone en la misma red WiFi
- Escanear QR con la cámara del iPhone
- Si falla: `npx expo start --clear`

### Variables de entorno necesarias
```bash
$env:NODE_TLS_REJECT_UNAUTHORIZED=0
npx expo start --clear
```

## Estructura de carpetas

```
psylens/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Dashboard (Inicio)
│   │   ├── camino.tsx         # Mapa de bloques
│   │   ├── glosario.tsx       # Glosario de conceptos
│   │   └── yo.tsx             # Perfil
│   ├── autor/[id].tsx         # Pantalla de autor (dinámica)
│   ├── onboarding.tsx
│   ├── splash.tsx
│   └── _layout.tsx
├── components/
│   ├── AuthorCard.tsx
│   ├── BlockNode.tsx
│   ├── BottomSheet.tsx
│   ├── ConceptCard.tsx
│   ├── LayerTabs.tsx
│   └── StreakBar.tsx
├── constants/
│   ├── colors.ts
│   ├── typography.ts
│   └── data.ts
├── hooks/
│   ├── useTheme.ts
│   └── useProgress.ts
├── context/
│   ├── ThemeContext.tsx
│   └── ProgressContext.tsx
├── docs/                      # Archivos de referencia del proyecto
│   ├── CLAUDE.md
│   ├── CONTENT.md
│   ├── DESIGN_SYSTEM.md
│   ├── SCREENS.md
│   └── SCREENS_SECONDARY.md
└── assets/
```

## Convenciones

- Pantallas: `app/[nombre].tsx`
- Componentes reutilizables: `components/[NombreComponente].tsx`
- Estilos: SIEMPRE StyleSheet.create() — nunca className ni NativeWind
- Colores: siempre desde `constants/colors.ts`, nunca hardcodeados inline
- Componentes: siempre funcionales + TypeScript
- Elementos táctiles: siempre TouchableOpacity o Pressable, nunca onClick
- Fuentes: sistema por defecto en v1, Playfair Display en v2

## Navegación

```
Stack raíz
├── splash           → 2.5s luego navega automáticamente
├── onboarding       → Solo primer uso
└── (tabs)/          → Navegación principal con bottom tabs
    ├── index        → Inicio / Dashboard
    ├── camino       → Mapa de bloques
    ├── glosario     → Glosario
    └── yo           → Perfil

Stack modal
└── autor/[id]       → Pantalla de autor con tabs Superficie/Concepto/Fondo
```

## Sistema de progreso

- Los autores se desbloquean en orden cronológico
- Estados: done / active / locked / soon / premium
- El progreso se guarda en AsyncStorage
- Bloque 0 es gratuito, el resto requiere suscripción

## Estado actual

- [x] Proyecto inicializado con Expo SDK 54
- [x] Expo Router configurado
- [x] Pantalla index básica funcionando en iPhone
- [x] Repositorio en GitHub
- [ ] constants/colors.ts
- [ ] constants/typography.ts
- [ ] Splash screen
- [ ] Onboarding
- [ ] Bottom tab navigation
- [ ] Dashboard (Inicio)
- [ ] Mapa de bloques (Camino)
- [ ] Pantalla de autor
- [ ] Glosario
- [ ] Perfil

## Comandos

```bash
# Siempre usar estos antes de arrancar
$env:NODE_TLS_REJECT_UNAUTHORIZED=0
npx expo start --clear

# Instalar paquetes (usar siempre npx expo install, no npm)
npx expo install [paquete]

# Commit después de cada pantalla funcional
git add .
git commit -m "feat: add [nombre] screen"
```

## Decisiones técnicas tomadas

- StyleSheet nativo en lugar de NativeWind — evita conflictos de Babel y versiones
- newArchEnabled: false en app.json — evita incompatibilidad con Expo Go
- Sin --legacy-peer-deps — usar npx expo install para todos los paquetes Expo
- NODE_TLS_REJECT_UNAUTHORIZED=0 necesario por certificados SSL corporativos
- VPN desactivada siempre para conectar el teléfono
