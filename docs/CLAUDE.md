# Psylens — Project Brain (current state)

This document reflects the **actual implementation as it exists in the code right now**, not the original plan in `docs/_archivo/CLAUDE.md` (kept for history only — several things listed there, like `AuthorCard.tsx`/`BlockNode.tsx`/`hooks/useProgress.ts`/`context/ProgressContext.tsx`, were never built or were superseded).

## 1. What the app is

Psylens — **"Psy + Lens"**, the lens that sharpens your view of human nature (tagline shown on the splash screen: *"La lente que afina tu visión del ser humano."*). It's a Spanish-language educational app that walks the user chronologically through the history of psychology/philosophy-of-mind, unlocking authors and concepts in order. Each author has up to three depth layers: **Superficie** (everyday framing), **Concepto** (mechanism), **Fondo** (implications/legacy) — plus an optional **Reflexión** tab (read-only review of the author's quiz) once the author is completed.

## 2. Tech stack (confirmed from `package.json`)

- **Expo SDK ~54.0.34**, **React Native 0.81.5**, **React 19.1.0**
- **expo-router ^3.5.23** for navigation (file-based routing under `app/`) — note this version number looks stale relative to SDK 54; it's what's actually pinned, not necessarily what you'd expect.
- **TypeScript ~5.9.2**, `strict: true` (`tsconfig.json` extends `expo/tsconfig.base`)
- `@react-native-async-storage/async-storage` — the only persistence layer (no backend, no database)
- `@expo-google-fonts/playfair-display` (PlayfairDisplay Regular/Bold/Italic) — serif font used for quotes/headings; rest of the UI uses the system font
- `react-native-svg`, `expo-haptics`, `expo-notifications`, `@expo/vector-icons` (Ionicons, used for tab bar icons)
- `newArchEnabled: false` in `app.json`
- No state-management library, no NativeWind/Tailwind, no React Navigation directly (expo-router wraps it)

## 3. Actual folder structure

```
psylens/
├── app/
│   ├── _layout.tsx              # Root Stack (fonts, theme, screen registry)
│   ├── index.tsx                # Redirect → /splash
│   ├── splash.tsx                # Logo + tagline, then routes to onboarding or returning
│   ├── onboarding.tsx            # First-run flow, ends by saving a name locally
│   ├── returning.tsx             # Returning-user screen, 5 rotating "types" (streak, quote, recorrido, reflexión)
│   ├── glosario.tsx              # Glossary, pushed from Camino's "Aa" button (NOT a tab)
│   ├── autor/[id].tsx            # Author detail screen (dynamic route) — also renders "revolution cards"
│   └── (tabs)/
│       ├── _layout.tsx           # Bottom tab bar definition
│       ├── index.tsx             # Inicio (dashboard)
│       ├── camino.tsx            # Camino — block/sub-block map, has the glossary entry point
│       ├── diario.tsx            # Diario — saved quotes + saved reflections (two swipeable tabs)
│       └── yo.tsx                # Yo — profile/settings, incl. __DEV__-only debug tools
├── components/
│   ├── BottomSheet.tsx           # Generic bottom sheet (used for glossary term lookups)
│   ├── PaywallSheet.tsx          # Premium upsell sheet
│   ├── BlockCompleteModal.tsx    # "Etapa completada" celebration when a whole block finishes
│   ├── Logo.tsx                  # SVG wordmark/symbol
│   ├── IntroIllustrations.tsx    # Illustrations for the 4 intro-block authors
│   └── SaveQuoteButton.tsx       # Toggleable save/unsave heart button for quotes
├── constants/
│   ├── colors.ts                 # dark/light palettes + per-block accent colors
│   ├── typography.ts             # type scale (h1–h4, body/bodyS/bodyXS, label) + spacing/radius scales
│   └── data.ts                   # blocks, subBlocks, authors, revolutionCards, glossaryTerms, quizzes,
│                                  #   savableQuotes, returningContent, isContentFree()/isSubBlockFree()
├── context/
│   └── ThemeContext.tsx          # dark/light theme provider
├── hooks/
│   └── useTheme.ts               # wraps ThemeContext, resolves colors.dark/colors.light
├── utils/
│   ├── journal.ts                 # per-author reflection journal entries (AsyncStorage, append-only)
│   └── savedQuotes.ts             # saved-quotes list (AsyncStorage), save/unsave/isSaved helpers
├── assets/                        # icons, author portraits (PNG, required statically from app/autor/[id].tsx)
├── docs/                          # reference/content docs (this file, content scripts, design notes)
├── App.tsx / index.ts             # present for Expo Go compatibility; actual entry is expo-router (see app.json "main")
├── app.json, tsconfig.json, package.json
```

Folders mentioned in the old plan that **don't exist**: no `AuthorCard.tsx`, `BlockNode.tsx`, `ConceptCard.tsx`, `LayerTabs.tsx`, `StreakBar.tsx`, no `useProgress.ts`/`ProgressContext.tsx` — progress is plain `useState` + `AsyncStorage` directly inside each screen (`psylens_progress` key), no separate context/hook for it.

## 4. Bottom tab navigation (confirmed — `app/(tabs)/_layout.tsx`)

Four tabs, in this order:

| route | label | icon (Ionicons) |
|---|---|---|
| `index` | **Inicio** | home / home-outline |
| `camino` | **Camino** | map / map-outline |
| `diario` | **Diario** | book / book-outline |
| `yo` | **Yo** | person / person-outline |

**There is no "Glosario" tab.** It was removed from the tab bar.

## 5. Where Glosario lives now

`app/glosario.tsx` is a top-level Stack screen (registered in `app/_layout.tsx`, animation `slide_from_right`), reached via `router.push('/glosario')` from a small **"Aa"** button inside `app/(tabs)/camino.tsx` (`camino.tsx:713-717`). It's also reachable in-context from any author screen, where glossary terms are inline-highlighted text that opens a `BottomSheet` definition popup (not a full navigation).

## 6. Real navigation stack (`app/_layout.tsx`)

```
index (redirect, no animation)
  → splash (fade)
      → onboarding (fade)          [first run: psylens_onboarding_done not yet set]
      → returning (fade)           [later runs: psylens_onboarding_done set]
          → (tabs) (fade)          [root tab shell: Inicio/Camino/Diario/Yo]
              → autor/[id]         (slide_from_right, gestures disabled — also renders "revolution cards")
              → glosario           (slide_from_right, gestures enabled)
```

`unstable_settings.initialRouteName` is `(tabs)` (so deep-linking into a screen still has tabs behind it for Android back-button sanity), but the actual cold-start path always goes through `index → splash` first, which then `router.replace`s based on `psylens_onboarding_done` in `AsyncStorage`.

## 7. No login/registration system

Confirmed — there is no auth, no email/password screen, no backend account. `app/onboarding.tsx` ends by writing a plain display name into `AsyncStorage` under `psylens_user_name`, plus `psylens_onboarding_done = 'true'`. `app/(tabs)/yo.tsx` reads that name back for the profile header and shows a **hardcoded placeholder email** (`usuario@email.com`, `USER_EMAIL` constant) — there's no real email anywhere in the app. "Cerrar sesión" / "Eliminar cuenta" in Yo just clear local `AsyncStorage` keys and redirect to onboarding/splash; there's no server-side anything.

## 8. Conventions actually followed

- **Styling**: always `StyleSheet.create()`, no NativeWind/Tailwind, no inline style objects except small one-off overrides (e.g. `style={{ marginBottom: 28 }}` for a wrapper). Styles are built via a `makeStyles(theme)` factory function called once per render via `useMemo`, so dark/light theme swaps re-derive styles.
- **Theming**: every screen pulls `const { theme } = useTheme()` and threads `theme.bg`/`theme.text`/etc. through `makeStyles`. Colors are never hardcoded inline except a few intentional exceptions (block accent colors via `blockColors`, the green `#0F6E56` brand color used directly in a couple of spots).
- **TypeScript**: `strict: true`, function components only, props typed inline or via small local `type`/`interface` declarations next to the component.
- **Touch targets**: `TouchableOpacity` (most common) or `Pressable`, never raw `onClick`/`onPress`-less views.
- **Persistence**: flat `AsyncStorage` string keys (e.g. `psylens_progress`, `psylens_saved_quotes`, `psylens_journal_<authorId>`, `psylens_quiz_step_<authorId>`), JSON-stringified where structured. No ORM, no schema migrations — each screen reads/writes its own keys directly.
- **Debug tooling**: `__DEV__`-gated rows in `app/(tabs)/yo.tsx` (force a specific "returning" screen type, reset a single author's progress) — never shipped to production builds.
- **Fonts**: Playfair Display (italic for quotes/reflection questions, bold for headings like block-complete/wordmark) layered on top of the system default for body text.

## 9. Block / sub-block progression + paywall (as implemented in `constants/data.ts`)

- `blocks`: `intro` (free) → `b0` "Orígenes filosóficos" (mixed free/premium, see below) → `b1`…`b5` (all `isFree: false`, fully premium).
- `b0` is the **only** block split at sub-block granularity. Its `subBlocks`:
  - `sb-0a` — Heráclito/Demócrito, Hipócrates, Platón — **free**
  - `sb-0b` — Aristóteles, Helenísticas, Avicena — **free**
  - `sb-0c` — Descartes, Spinoza, Kant — **premium** ← paywall boundary starts here
  - `sb-0d` — Schopenhauer, Darwin — **premium**
- The boundary is hardcoded as `B0_FREE_SUB_BLOCK_IDS = new Set(['sb-0a', 'sb-0b'])` in `constants/data.ts`. `isContentFree(entry)` special-cases `blockId === 'b0'` to check sub-block membership in that set; every other block just uses its own `isFree` flag.
- Each `b0` sub-block (and `sb-1a`/`sb-1b` in `b1`) has a matching **"revolution card"** (`revolutionCards`, `type: 'revolution'`) — a short intro screen rendered by the same `app/autor/[id].tsx` route (it branches on whether `id` resolves to a `revolutionCards` entry or an `authors` entry) that plays before that sub-block's first author.
- Gating in practice (`app/autor/[id].tsx`): `isContentLocked = !isContentFree(author) && !isPremium && (activeTab === 'concept' || activeTab === 'fondo')` — Superficie is always readable; Concepto/Fondo are paywalled per-author once that author's sub-block is premium. `isPremium` is a simple boolean in `AsyncStorage` (`psylens_is_premium`) — there's no real payment/subscription integration, `PaywallSheet`'s "unlock" just flips that flag.
- Completing the **last author of an entire block** (not just a sub-block) triggers `BlockCompleteModal` instead of the regular per-author celebration — except when that author also has `savableQuotes` defined, in which case the regular celebration (with the quote-saving UI) shows first, and `BlockCompleteModal` only opens after the user taps "Continuar" there.

## 10. Standard dev commands

```bash
# Corporate/proxy SSL workaround — needed before every expo start, per the original setup notes
$env:NODE_TLS_REJECT_UNAUTHORIZED=0
npx expo start --clear

# Day-to-day (PowerShell is primary on this machine)
npx expo start
npx expo start --android
npx expo start --ios          # not usable on Windows without a remote Mac/EAS
npx expo start --web

# Installing packages — always via expo install, not raw npm/yarn, to keep
# versions aligned with the pinned Expo SDK
npx expo install <package>
```
