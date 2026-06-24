# Screens & navigation (current state)

This documents the screens and navigation flow **as implemented in code right
now**. It supersedes `docs/_archivo/SCREENS.md` and `docs/_archivo/SCREENS_SECONDARY.md`,
which described login/registration/password-reset flows and other planned
features that were never built.

**There is no authentication system in this app.** There is no login screen,
registration screen, password-reset screen, or any server-backed session.
"Cerrar sesión" (sign out) and "Eliminar cuenta" (delete account) exist as
labels in `app/(tabs)/yo.tsx`, but:
- **Cerrar sesión** doesn't clear any session (none exists) — it just calls
  `router.replace('/onboarding')`. It doesn't even clear `psylens_onboarding_done`,
  so the next cold start still resumes past onboarding via `splash.tsx`.
- **Eliminar cuenta** is the one that actually does something: it wipes the
  app's `AsyncStorage` keys (progress, streak, premium flag, saved quotes,
  journal entries, etc.) and routes to `/splash`, which — since `psylens_onboarding_done`
  is now gone — will route into `/onboarding` next.

So functionally, "delete account" = "reset everything and restart onboarding,"
not a real account deletion. There's no backend, no user record, nothing
server-side to delete.

No i18n exists either — `yo.tsx`'s "Idioma" setting opens an `Alert` with
"Español ✓" and "English (próximamente)" options; selecting English does
nothing (`onPress: () => {}`). All copy in the app is hardcoded Spanish.
No toast/snackbar notification system exists — feedback is done via native
`Alert.alert`, inline state, or the custom modals described below.

All persistent state is local `AsyncStorage` — there is no sync, no backend
API calls anywhere in `app/`.

---

## Navigation shell (`app/_layout.tsx`)

Root `Stack` (`expo-router`), `headerShown: false`, `gestureEnabled: false` at
the stack level (no swipe-back). Routes and their transition:

| Route | Animation |
|---|---|
| `index` | none (instant redirect) |
| `splash` | fade |
| `onboarding` | fade |
| `returning` | fade |
| `(tabs)` | fade |
| `autor/[id]` | slide from right (gesture **enabled** here is `false` too — back is button-only) |
| `glosario` | slide from right (gesture-enabled) |

Fonts (Playfair Display weights) are loaded here and gate the native splash
screen (`expo-splash-screen`) until `useFonts` resolves.

---

## Screen-by-screen

### `app/index.tsx`
**What:** Not a real screen — just `<Redirect href="/splash" />`.
**In:** App cold start (this is the Expo Router root route).
**Out:** Always → `/splash`.
**State/logic:** None.

### `app/splash.tsx`
**What:** Branded splash screen — logo, wordmark, tagline, and an animated
loading bar (2300ms fill), shown for a fixed `SPLASH_DURATION` of 2500ms.
**In:** From `app/index.tsx` redirect, or directly via `router.replace('/splash')`
from `yo.tsx`'s "delete account"/"reset progress"/debug-force-returning-screen
actions (used as a re-entry point that re-evaluates onboarding/returning state).
**Out:** After the fixed delay, checks `AsyncStorage` key `psylens_onboarding_done`:
  - not set → `router.replace('/onboarding')`
  - set → `router.replace('/returning')`
**State/logic:** Two parallel `Animated.timing` animations (logo fade-in,
loading bar width 0→100%); a `setTimeout`-based navigation gate independent of
the animations actually finishing.

### `app/onboarding.tsx`
**What:** 4-page horizontal swiper (`ScrollView` + `pagingEnabled`) introducing
the app concept, ending in a name-capture step. Each of the first 3 pages has
a bespoke animated SVG/View illustration (question marks rocking, three circles
expanding into a "Ψ", a logo assembling, paginated via `currentPage` so each
illustration's `useEffect` only fires once when it becomes `active`). Page 4
("¿Listo para empezar?") shows a static glyph illustration plus a `TextInput`
for the user's name (optional) and an "Empezar" button.
**In:** Only from `splash.tsx` when `psylens_onboarding_done` is unset. Also
reachable again via `yo.tsx`'s "Cerrar sesión" (see auth note above).
**Out:** "Empezar" button sets `psylens_onboarding_done = 'true'` (and
`psylens_user_name` if provided), then `router.replace('/(tabs)')` — straight
into the tab shell, **not** through `/returning` (this is the first-run path).
**State/logic:** `currentPage` (derived from scroll position via
`onMomentumScrollEnd`) drives which illustration is `active`; `name` is local
input state. No back-navigation affordance — paging is forward-swipe only,
with a dot indicator (no tap-to-jump).

### `app/returning.tsx`
**What:** A single rotating "welcome back" screen shown once per day,
picking one of 4 card types via `resolveSelection()`:
1. **Streak** — giant number + streak phrase.
2. **Quote** — author portrait + a savable quote (merged former Type 2/3; the
   `Selection` union only has `kind: 1 | 3 | 4 | 5` — `2` no longer exists).
3. **"Tu recorrido hasta ahora"** — recap of 2 previously-saved quotes.
4. **Reflection** — author portrait + an open reflection question with a
   `TextInput`, saved into the journal.
**In:** Only from `splash.tsx`, when `psylens_onboarding_done` is already set.
**Out:** "Continuar →" → `router.replace('/(tabs)')`. If `resolveSelection()`
decides nothing should show today (already shown today, or no author
completed yet), the screen renders an empty `SafeAreaView` and immediately
calls `router.replace('/(tabs)')` — i.e. it can be a same-frame no-op pass-through.
Also has a link to `/(tabs)/diario?tab=frases` ("Ver mi diario") if the user
saved/answered something this visit.
**State/logic:** Heavy `AsyncStorage` read of progress/streak/last-shown-type/
last-shown-author/saved-quotes to pick a card with priority: forced debug
override → streak (if ≥2 days and not shown yesterday as streak) → 25% chance
of the saved-quotes recap (needs 2+ saved) → random bank pick between a quote
or a reflection author (reflections have a 14-day-per-author cooldown via
`psylens_type5_last_shown`). See `docs/DESIGN_SYSTEM.md` for the local
`PortraitCircle` component used here.

### `app/(tabs)/_layout.tsx`
**What:** Bottom tab bar — 4 tabs: Inicio (`index`), Camino (`camino`), Diario
(`diario`), Yo (`yo`). Each tap fires a light haptic. No badges, no nested
headers (`headerShown: false`).
**In:** Reached by replacing into `/(tabs)` from onboarding, returning, or any
screen's "back to home" action.
**Out:** Each tab is its own stack root; pushing `/autor/[id]` or `/glosario`
layers on top of whichever tab is active.

### `app/(tabs)/index.tsx` — "Inicio" (dashboard)
**What:** Home/dashboard. Greeting + date header, a 7-day streak strip (current
week, Mon–Sun chips marking visited days), block/sub-block progress bars, a
big "Continuar" card for the next incomplete author or revolution card,
3 lifetime stats (authors completed / concepts unlocked / current block %),
a horizontal "Últimos conceptos" rail (last 3 glossary terms unlocked), and a
"Próximo en el camino" preview card (locked with an `Alert` until the active
entry is complete).
**In:** Default tab on app open (after onboarding/returning).
**Out:** "Continuar" card and "Próximo" card both `router.push('/autor/${id}')`.
**State/logic:** Refreshed via `useFocusEffect` (re-runs `loadData()` every
time the tab gains focus, not just on mount) plus pull-to-refresh
(`RefreshControl`). On load: marks today as visited in `psylens_days_visited`,
and resets the streak to 0 if 2+ days have passed since `psylens_last_active`
(streak decay is evaluated here, not just incremented in `autor/[id].tsx`).
"Active entry" = first incomplete item in a flattened, block-and-subblock-aware
sequence of authors + revolution cards (`ALL_ENTRIES`/`buildAllEntries()`),
shared in spirit with the sequencing logic duplicated in `camino.tsx` and
`autor/[id].tsx`'s `GLOBAL_SEQUENCE`.

### `app/(tabs)/camino.tsx` — "Camino" (curriculum map)
**What:** Collapsible accordion of all content `blocks` (intro, b0, b1, …).
Expanding a block reveals its sub-blocks, each optionally preceded by a
"revolution card" (`RevolutionCard`) and then its `AuthorCard`s, all showing
locked/active/done state and tinted with that block's `blockColors`. Blocks
beyond `intro`/`b0`/`b1` are hardcoded as permanently "coming soon"
(`isComingSoonBlock`) regardless of premium status — this is missing content,
not a paywall. Non-free sub-blocks/blocks within b0/b1 show a `PaywallSheet`
on tap if the user isn't premium.
**In:** Tab bar.
**Out:** Tapping any unlocked `AuthorCard`/`RevolutionCard` → `router.push('/autor/${id}')`.
The "Aa" header button → `router.push('/glosario')`.
**State/logic:** `expandedId` (which block accordion is open, defaults to
`'intro'`); progress/unlocked/premium reloaded via `useFocusEffect`. Lock
sequencing is recomputed locally (`computeAuthorState`, `getSubBlockStatus`,
`getBlockStatus`) — sequential within a sub-block, and a sub-block's first
author/revolution-card is gated on the previous block's last sub-block being
fully done (cross-block sequencing).

### `app/(tabs)/diario.tsx` — "Diario" (journal)
**What:** Two horizontally swipeable pages under a tab bar: "Frases guardadas"
(saved quotes, grouped by author, each deletable) and "Mis reflexiones"
(journal entries from quiz open-questions and Type-5 returning-screen
answers, newest first). Both have an empty-state message.
**In:** Tab bar directly, or deep-linked via `?tab=frases`/`?tab=reflexiones`
query param (used by `returning.tsx` and `autor/[id].tsx`'s celebration modal
"Ver mi diario" links) — `useLocalSearchParams` picks the initial tab and the
pager auto-scrolls to it.
**Out:** No forward navigation from here — it's a leaf/destination screen.
**State/logic:** Reloads saved quotes + all `psylens_journal_*`-prefixed keys
on every focus (`useFocusEffect`). **Note:** there's a leftover debug block
(`// TEMP DEBUG — remove after inspecting raw AsyncStorage values`) that
`console.log`s raw `psylens_saved_quotes` and journal key contents on every
focus — still present in the code, not gated behind `__DEV__`.

### `app/(tabs)/yo.tsx` — "Yo" (profile/settings)
**What:** Avatar (initial-letter circle, no photo), display name, 3 lifetime
stats (streak days / authors completed / layers read — computed independently
from `index.tsx`'s stats, via `computeStreak(daysVisited)` rather than reading
`psylens_streak`), then two grouped settings cards: **Ajustes** (dark mode
toggle, language picker — Spanish only works, daily reminder notification
toggle, subscription status) and **Cuenta** (sign out, reset progress, delete
account, plus version text). In `__DEV__` builds only, a block of 5 debug rows
is inserted between "Resetear progreso" and "Eliminar cuenta" to force any of
the 4 returning-screen types or reset one specific author's (`darwin`) progress.
**In:** Tab bar.
**Out:** "Cerrar sesión" → `/onboarding`. "Resetear progreso"/"Eliminar
cuenta"/debug-force actions → `/splash` (re-enter the splash→onboarding-or-returning
gate after mutating storage). Debug "Reset darwin progress" → `router.push('/autor/darwin')`.
**State/logic:** Dark-mode toggle calls `useTheme().toggleTheme` (theme is
app-wide via `ThemeProvider`, not stored as a separate yo.tsx concern). Daily
reminder toggle requests OS notification permission, then schedules/cancels a
real local daily notification at 09:00 via `expo-notifications`. "Idioma" and
"Suscripción" rows only open `Alert`s — no real subscription flow exists yet
(premium is just a `psylens_is_premium` boolean flipped by `PaywallSheet`/debug).

### `app/glosario.tsx` — "Glosario" (glossary)
**What:** Searchable, author-grouped list of glossary terms the user has
unlocked (i.e. terms belonging to a fully-completed author). Tapping a term
opens a `BottomSheet` modal with its definition and up to 4 "Conecta con"
chips (related terms via `conceptThreads`), which can be tapped to switch the
sheet to that term without closing it.
**In:** Pushed from `camino.tsx`'s "Aa" button (slide-from-right, per
`_layout.tsx`); also reachable via `autor/[id].tsx`'s inline term highlighting
(see below) through its own `BottomSheet` component, not this screen.
**Out:** Back button (`router.back()`) only — no forward navigation.
**State/logic:** Local `query` filters unlocked terms by term/definition text;
`progress` reloaded on focus. Locked terms (incomplete author) simply aren't
in the list — there's no "locked term placeholder" UI here.

### `app/autor/[id].tsx` — author / revolution-card detail
**What:** The core content screen, and the most complex one — it renders two
genuinely different layouts depending on what `id` resolves to:
- **Revolution card** (`revolutionCards.find(r => r.id === id)`) — a single
  "Profundidad" tab, intro-style content, a "Marcar como leído" button, and a
  lightweight celebration modal that auto-advances to the first author of the
  next sub-block.
- **Regular author** (`authors.find(a => a.id === id)`) — a 3-tab reader
  (Superficie / Concepto / Fondo, or "Entrada/Profundidad" for `layerType: 'two'`
  authors), with glossary terms inline-highlighted in body text
  (`HighlightedText`) that open a shared `BottomSheet` term modal on tap.
  Concept/Fondo tabs are premium-gated per-author via `isContentFree`. After
  all layers are read and if the author has a `quiz`, a 4th "Reflexión" tab
  appears and a quiz `Modal` (multiple-choice / true-false / open-question)
  must be completed before the author is marked done; an open-answer ≥20 chars
  is saved as a journal entry.
**In:** Pushed from `index.tsx`, `camino.tsx`, `returning.tsx` (via
`PortraitCircle`/quote cards — actually those don't navigate, only their
underlying author cards on other screens do), and from within this same
screen via "Siguiente"/"Continuar" (`router.replace`, not `push`, so the back
stack doesn't grow per-author).
**Out:**
  - Back button → `router.back()`.
  - Completing the last layer → either the **celebration modal** (per-author,
    shows savable quotes + `SaveQuoteButton` + "Siguiente"/"Ver mi diario") or,
    if this was the block's last author, the shared **`BlockCompleteModal`**
    (stats + "Continuar" to next block's first entry, gated by `PaywallSheet`
    if that block isn't free, or "Ver resumen" → `/(tabs)/camino`).
  - "Siguiente"/quiz completion → `router.replace('/autor/${nextDest.id}')`,
    routed through `PaywallSheet` first if the next author isn't free and the
    user isn't premium.
**State/logic:** Computes a single flattened `GLOBAL_SEQUENCE` (intro authors,
then per-sub-block: revolution card + its authors) to know "next" — this is a
second, separately-maintained copy of the sequencing logic also present in
`index.tsx` (`buildAllEntries`) and `camino.tsx`. Completing an author updates
`psylens_progress`, bumps/initializes the streak (same day-diff logic as
`index.tsx`), records `psylens_last_completed_author/date` (read by
`returning.tsx`'s Type-3 "recently completed" framing), and unlocks the next
entry in `psylens_unlocked`. First visit to a block stamps
`psylens_block_started[blockId]`, used to compute "days taken" shown in
`BlockCompleteModal`.

---

## Summary navigation map

```
index.tsx ──▶ splash.tsx ──▶ onboarding.tsx ──▶ (tabs)
                  │                                │
                  └──▶ returning.tsx ──▶ (tabs) ◀──┘
                                          │
              ┌───────────────┬───────────┼───────────────┐
              ▼               ▼           ▼               ▼
            Inicio          Camino      Diario            Yo
        (tabs/index)   (tabs/camino) (tabs/diario)   (tabs/yo)
              │               │                            │
              │               ├──▶ glosario.tsx             ├──▶ splash.tsx (reset/debug)
              │               │                            └──▶ onboarding.tsx (sign out)
              └───────┬───────┘
                      ▼
              autor/[id].tsx ──(Siguiente/Continuar)──▶ autor/[id].tsx (replace)
                      │
                      └──▶ (tabs)/diario?tab=frases (from celebration modal)
```
