# Design System (current state)

This documents the design system **as implemented in code today**. It supersedes
`docs/_archivo/DESIGN_SYSTEM.md`, which described an earlier plan (including
treating Playfair Display as a "future v2" typeface — that migration is already
done; see Typography below).

Source of truth: `constants/colors.ts`, `constants/typography.ts`, `app/_layout.tsx`.

---

## 1. Color palette

Defined in `constants/colors.ts` as `colors.dark` / `colors.light`, switched at
runtime by `useTheme()` (`hooks/useTheme.ts` + `context/ThemeContext`).

| Token       | Dark      | Light     | Notes                                   |
|-------------|-----------|-----------|------------------------------------------|
| `bg`        | `#0f0f0e` | `#fafaf6` | Screen background                       |
| `bg2`       | `#1a1a18` | `#f0ece3` | Raised surface (cards, modals)          |
| `bg3`       | `#252522` | `#e8e4db` | Secondary surface (inputs, stat blocks) |
| `text`      | `#f0ece3` | `#0f0f0e` | Primary text                            |
| `text2`     | `#b8b4ab` | `#3a3a38` | Secondary text                          |
| `text3`     | `#6e6b64` | `#888780` | Tertiary / muted text                   |
| `green`     | `#0f6e56` | `#0f6e56` | Accent — identical in both themes       |
| `greenBg`   | `#0a2e25` | `#d4ede7` | Green tint background                   |
| `purple`    | `#534ab7` | `#534ab7` | Secondary accent — identical both themes|
| `purpleBg`  | `#1e1b40` | `#e8e6f5` | Purple tint background                  |
| `coral`     | `#993c1d` | `#993c1d` | Tertiary accent — identical both themes |
| `border`    | `#2a2a27` | `#d8d4cb` | Hairline borders                        |

`green`, `purple`, and `coral` are deliberately the same hex in both modes
(see comment in `components/BlockCompleteModal.tsx`: *"green and purple are
identical in dark and light themes"*) — only the background/text scale shifts
between modes, accents stay constant.

---

## 2. Block color system (`blockColors`)

Also in `constants/colors.ts`. One entry per content block (`intro`, `b0`–`b5`),
each with three variants:

| Block    | `base`    | `light`   | `text`    |
|----------|-----------|-----------|-----------|
| `intro`  | `#4A7C6E` | `#E8F2EF` | `#2D5A4F` |
| `b0`     | `#C4934A` | `#F5ECD8` | `#8B6530` |
| `b1`     | `#4A6EA8` | `#DDE6F5` | `#2D4F82` |
| `b2`     | `#7B5EA8` | `#EDE5F5` | `#5A3D8B` |
| `b3`     | `#5A8A5E` | `#E5F0E6` | `#3A6B3E` |
| `b4`     | `#C47840` | `#F5E8D8` | `#8B5520` |
| `b5`     | `#A85A5A` | `#F5E5E5` | `#8B3A3A` |

These are **theme-independent** (no dark/light split per block) — instead the
*usage* adapts to theme:

- **`base`** — the saturated accent: progress bar fills, icon strokes/borders,
  diamond glyphs. Used directly regardless of theme
  (`app/(tabs)/index.tsx`, `app/(tabs)/camino.tsx`).
- **`light`** — a pre-baked pastel tint, used as a **light-mode** background
  (e.g. block header background in `app/autor/[id].tsx`).
- **`text`** — a darkened version of `base` for high-contrast text/labels sitting
  on a `light` background, or as a progress-count label color.

For **dark-mode** tinted backgrounds, there's no separate dark variant — code
instead appends an alpha suffix to `base` at the call site:

```ts
// app/autor/[id].tsx
const headerBg = isDark ? bc.base + '26' : bc.light;   // '26' ≈ 15% alpha

// app/autor/[id].tsx (tab background)
const tabBg = isDark ? (blockColors[author.blockId]?.base ?? theme.green) + '1F' : theme.bg; // '1F' ≈ 12% alpha
```

This is the established pattern for "tint a surface with this block's color" —
reuse `base + <hex alpha>` for dark, `light` for light, rather than adding new
fields to `blockColors`.

---

## 3. Typography

Loaded once in `app/_layout.tsx` via `expo-font` + `@expo-google-fonts/playfair-display`,
gating the splash screen until fonts resolve:

```ts
const [fontsLoaded, fontError] = useFonts({
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_400Regular_Italic,
});
```

Playfair Display **is live in production UI**, not a future plan. Three weights
are loaded and each has a distinct role:

- **`PlayfairDisplay_700Bold`** — display numerals and headings: streak counter
  (`returning.tsx`), block-complete modal title (`BlockCompleteModal.tsx`),
  onboarding "¿ ?" glyphs and headline (`onboarding.tsx`), dashboard heading
  (`(tabs)/index.tsx`), portrait-fallback initials (`PortraitCircle` in
  `returning.tsx`).
- **`PlayfairDisplay_400Regular_Italic`** — quotes and reflective copy: the
  streak phrase, saved-quote display, and reflection question text in
  `returning.tsx`; pull-quotes in `app/autor/[id].tsx`.
- **`PlayfairDisplay_400Regular`** — loaded and wired into `typography.h4`
  (`constants/typography.ts`) but not yet referenced via `h4` anywhere in
  current screens; it exists for non-italic serif body/sub-heading use.

System default sans-serif is used everywhere else (`body`, `bodyS`, `bodyXS`,
`label` in the scale below carry no `fontFamily` override). One inconsistency
worth knowing about: the Type-4 "Tu recorrido hasta ahora" saved-quote text in
`returning.tsx` (`type4QuoteText`) is hardcoded to `fontFamily: 'Georgia'`
rather than Playfair italic — it predates/diverges from the Playfair quote
convention used everywhere else quotes appear.

### Type scale (`constants/typography.ts`)

| Token    | Size | Line height | Weight | Font                          |
|----------|------|-------------|--------|--------------------------------|
| `h1`     | 32   | 40          | 700    | `PlayfairDisplay_700Bold`     |
| `h2`     | 24   | 32          | 700    | `PlayfairDisplay_700Bold`     |
| `h3`     | 20   | 28          | 700    | `PlayfairDisplay_700Bold`     |
| `h4`     | 18   | 26          | 400    | `PlayfairDisplay_400Regular`  |
| `body`   | 16   | 24          | 400    | system                         |
| `bodyS`  | 14   | 20          | 400    | system                         |
| `bodyXS` | 12   | 16          | 400    | system                         |
| `label`  | 11   | 14          | 500    | system, `letterSpacing: 0.8`  |

Screens routinely spread one of these (`...typography.h2`) and then override
`fontFamily`/`fontSize`/`fontStyle` locally for one-off serif-italic treatments
(see `returning.tsx`'s `quoteType2`, `phrase`, `streakPhrase` — all spread
`h2` then re-pin `fontFamily` to the italic face and tweak size).

---

## 4. Spacing & radius

```ts
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, xxxl: 40 };
export const radius  = { sm: 8, md: 10, lg: 12, xl: 16, full: 9999 };
```

Both live in `constants/typography.ts` (not a separate spacing file). `radius.lg`
(12) is the default for buttons/cards/inputs; `radius.xl` (16) shows up on
larger modal cards (`BlockCompleteModal`); `radius.full` for circular avatars
where it's not computed as `size / 2` directly.

---

## 5. Key component patterns

### `SaveQuoteButton` (`components/SaveQuoteButton.tsx`)
Heart-toggle button backed by `utils/savedQuotes.ts`. Pattern: local `saved`
state hydrated from storage on mount, optimistic toggle, then persist. Animates
an `Animated.Value` scale on press —
- **save**: spring 1 → 1.3 → 1 (`speed: 30, bounciness: 14` then `speed: 20, bounciness: 8`)
- **unsave**: spring 1 → 0.8 → 1 (`speed: 30, bounciness: 8` then `speed: 20, bounciness: 8`)

paired with `Haptics.impactAsync` (Medium on save, Light on unsave). Accepts
`style`/`heartStyle`/`labelStyle` overrides so callers (e.g. `returning.tsx`)
can resize it inline rather than the component branching on a `size` prop.

### `PortraitCircle` (local to `app/returning.tsx`, not exported/shared)
Circular author portrait with graceful fallback: tries `PORTRAITS[authorId]`
(a static `require()` map of PNGs), and on missing source *or* `Image`
`onError`, falls back to a colored circle with the author's first initial in
`PlayfairDisplay_700Bold`. Border uses `theme.green` regardless of block —
this component is not block-color-aware. Used at `size={140}, borderWidth={4}`
for Type 3/5 returning cards.

### Celebration modal — `BlockCompleteModal` (`components/BlockCompleteModal.tsx`)
Full-screen `Modal` (`transparent`, `statusBarTranslucent`, `animationType="none"`
— animation is hand-rolled, not the RN Modal transition) with:
- a `ParticleField` of 20 particles drifting upward with randomized x/size/color/
  duration/delay, looping via recursive `Animated.timing` callbacks (not
  `Animated.loop`, since each particle restarts with fresh randomized values)
- a card that springs in: `scale` 0.88 → 1 (`damping: 16, stiffness: 200`) in
  parallel with `opacity` 0 → 1 (`timing`, 260ms)
- content: icon circle (glyph from `SYMBOL_MAP`, or a custom `IntroBlockIcon`
  SVG for the `intro` block specifically) → "Etapa completada" label → block
  name (`h1` Playfair Bold) → 3-stat row (`authorsCount` / `conceptsCount` /
  `daysTaken`) → optional "next block" hint → primary CTA ("Continuar" or
  "Ver resumen" if no next block) → optional secondary "Ver resumen" CTA.

### Returning-screen cards (`app/returning.tsx`)
One screen, one `Selection` union (`kind: 1 | 3 | 4 | 5 | 'skip'`) picked by
`resolveSelection()` and rendered via conditional blocks sharing one
`styles.content` container. Note `kind: 2` is absent — Types 2 and 3 were
merged into a single Type-3 rendering branch (comment: *"Type 2/3 — isolated
layout"*) that conditionally shows either an "Ya conociste a X" intro line or
the author name, depending on `recentlyCompleted`.

- **Type 1 — streak**: giant `135px` Playfair-Bold number + unit label + italic
  streak phrase (`getStreakPhrase`, pulled from `returningContent.streakPhrases`
  with a length-based fallback).
- **Type 3 — quote**: `PortraitCircle` (140px) + author name or "recently
  completed" framing line + italic quote (prefixed "Para {Author}, …") +
  inline `SaveQuoteButton`.
- **Type 4 — saved-quotes recap** ("Tu recorrido hasta ahora"): heart glyph +
  heading + up to 2 previously-saved quotes, second entry visually separated by
  a top border divider. Shown probabilistically (25% chance) when the user has
  2+ saved quotes and no streak to show.
- **Type 5 — reflection**: `PortraitCircle` + author name + italic reflection
  question + multiline `TextInput` + conditional "Guardar respuesta" button,
  with a 14-day-spacing rule per author (`TYPE5_LAST_SHOWN_KEY`) so the same
  reflection prompt doesn't repeat too soon.

Selection priority is: forced debug override → streak (if ≥2 and not already
shown yesterday) → 25%-chance saved-quotes recap → random bank pick (50/50
between a quote-author and a reflection-author, falling back to whichever pool
is non-empty).

---

## 6. Animation patterns

Two distinct animation surfaces exist, both using the RN `Animated` API
(no Reanimated in this codebase):

### Onboarding illustrations (`app/onboarding.tsx`)
Each illustration is a small self-contained component that runs its intro
animation once on mount via `useEffect` + `Animated.sequence`/`parallel`/
`stagger`. Conventions observed across all of them:
- **Easing**: `Easing.out(Easing.cubic)` for "settle in" motion (position,
  scale), `Easing.out(Easing.quad)` for simple fades, `Easing.linear` for the
  one progress-style fill (timeline path height), `Easing.inOut(Easing.cubic)`
  for a traveling-dot motion that needs to ease both ends.
  All other timing layers are added (`Easing.out`) for entrances.
- **Durations**: short beats of `100`–`300ms` for individual element pop-ins
  (opacity/stagger steps), `600`–`800ms` for the "primary" motion of a given
  illustration (a sliding logo half, an expanding ring, a path drawing in).
- **Sequencing**: `Animated.delay(n)` is used heavily to stagger when each
  sub-element starts, often layered inside `Animated.parallel`/`sequence` so
  multiple elements animate concurrently but offset (e.g. the timeline
  illustration: start node fades+slides in, then path height fills, then 4
  nodes pop in one every ~150ms, then a "traveling dot" eases along after).
- `useNativeDriver: true` everywhere except animating non-transform/opacity
  properties (SVG `cx`/`cy`/`r`, View `height`) which must run on the JS
  thread (`useNativeDriver: false`).

### Celebration / save micro-interactions
- `BlockCompleteModal`'s particle field: continuous, randomized-per-particle
  loop (own section above).
- `SaveQuoteButton`'s heart: spring-based pop (see component section above) —
  the one place `Animated.spring` (vs. `timing`) is used, chosen for a bouncier,
  less mechanical feel on a tap-confirmation micro-interaction.

General rule of thumb in this codebase: **entrances/illustrations use
`timing` + eased curves with explicit choreography via `delay`/`sequence`/
`stagger`; tap-feedback uses `spring`.**
