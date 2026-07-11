# Idiomatrix — Project Reference

## What is this?

Idiomatrix is a language-learning web app (inspired by Duolingo) where users can learn **4 languages** (Dutch, Spanish, English, German) through spaced-repetition flashcards, an article checker (with a de/het-style quiz mode), synonym and antonym lookups, a verb tenses reference, a prepositions fill-in-the-blank quiz, and (Dutch only) a pronominal-adverbs grammar drill — all backed by curated dictionaries with a live Wiktionary fallback for words outside them. The article/synonym/antonym/verb search bars are cross-language: type a word in any of the 4 languages and jump to its equivalent in whichever language is currently selected. Built with React + TypeScript + Vite + Tailwind CSS v4.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 + TypeScript | UI and type safety |
| Vite | Dev server and bundler |
| Tailwind CSS v4 (`@tailwindcss/vite`) | Styling via utility classes |
| React Router v6 | Client-side routing |

---

## Folder Structure

```
src/
├── components/
│   ├── ui/                  # Reusable primitives
│   │   ├── Button.tsx       # Primary (solid ink)/secondary (outlined)/danger/ghost pill variants, rounded-full
│   │   ├── Card.tsx         # Flat bordered card; `accent` renders as a left stripe; `tinted` renders a solid accent-colored block (no border) — currently unused since the home page's feature-highlight cards were removed, but kept as a supported variant
│   │   ├── ProgressBar.tsx  # Filled bar with configurable color and optional % label
│   │   └── Badge.tsx        # Pill badge in green/orange/blue/red/purple/yellow (muted palette)
│   ├── layout/
│   │   ├── Header.tsx       # Sticky top bar: "Idiomatrix" logo + 7 pill-button nav links (Dashboard/Flashcards/Articles/Synonyms/Antonyms/Verbs/Prepositions), streak 🔥 and XP ⚡ on the right; nav scrolls horizontally with fade cues on mobile since 7 pills don't fit at ~390px
│   │   └── Layout.tsx       # Wraps all pages; Header + max-w-4xl centered main content
│   ├── articles/
│   │   └── ArticleQuiz.tsx  # Self-contained article quiz (10 questions, score, XP), all 4 languages, used by ArticlesPage
│   ├── prepositions/
│   │   └── PrepositionQuiz.tsx # Self-contained fill-in-the-blank quiz (10 questions, score, XP), all 4 languages, used by PrepositionsPage
│   └── pronominal/
│       └── PronominalAdverbExercise.tsx # 10-question session (score/progress/play again) drawn from the 50-sentence pool for one adverb+preposition combo (e.g. waar+over); each question has two single-answer blanks and a 4-language guide-sentence picker shown upfront as a hint; used by PronominalAdverbsPage
├── pages/
│   ├── HomePage.tsx         # Landing page: nothing but the "Choose your language" picker grid; picking a language navigates to /learn
│   ├── LearnPage.tsx        # Per-language section menu (Flashcards, Articles, Synonyms, Antonyms, Verbs, Prepositions, + Pronominal Adverbs when Dutch is selected) shown after picking a language on the home page or Dashboard
│   ├── DashboardPage.tsx    # Stats (streak, Total XP, Daily XP), daily goal progress, a "Continue Learning" language-picker grid (same 4 cards as Home) to jump back into /learn
│   ├── FlashcardsPage.tsx   # 5 random flippable cards at a time; flipping = reviewed (green + XP); add-a-word via Wiktionary
│   ├── ArticlesPage.tsx     # Article checker: type a noun (in any of the 4 languages) → see correct article, gender color-coded; "Look up" / article quiz mode toggle for all 4 languages
│   ├── SynonymsPage.tsx     # Type a word (in any of the 4 languages) → see synonyms, sourced from curated dict or Wiktionary
│   ├── AntonymsPage.tsx     # Type a word (in any of the 4 languages) → see antonyms; structurally a near-exact mirror of SynonymsPage
│   ├── VerbTensesPage.tsx   # Browse the 100 most common verbs per language; expandable per-tense cards + an "All Tenses" table; cross-language search bar at the top
│   ├── PrepositionsPage.tsx # Language tabs + PrepositionQuiz — fill-in-the-blank preposition exercise
│   └── PronominalAdverbsPage.tsx # Dutch-only: 3-level nav — pick an adverb (er/hier/daar/waar) → pick a preposition (12, matching the reference table) → <PronominalAdverbExercise>; guards with a "Dutch only" message if reached while another language is selected
├── context/
│   └── AppContext.tsx       # Global state: UserProgress, selectedLanguage; exposes addXp
├── data/
│   ├── languages.ts         # LANGUAGES[], FLASHCARDS[], getFlashcardPool(); re-exports NOUN_ARTICLES, SYNONYMS
│   ├── nounArticles.ts      # NOUN_ARTICLES[] — Dutch ~1000 nouns, others ~25 each
│   ├── synonyms.ts          # SYNONYMS[] — 25 curated words per language
│   ├── antonyms.ts          # ANTONYMS[] — same 25-word vocabulary per language as synonyms.ts, each paired with its opposite
│   ├── pronominalAdverbs.ts # Conjugation/modifier generator: ADVERBS[] (4) × PREPOSITIONS[] (12) × 6 persons × 9 modifiers → PRONOMINAL_ADVERB_EXERCISES[] (2,400), plus completeDutchSentence() helper
│   ├── prepositions/        # PREPOSITION_EXERCISES[] — 120 fill-in-the-blank sentences per language (480 total), each with 2 plausible distractors
│   │   ├── dutchPrepositions.ts / spanishPrepositions.ts / englishPrepositions.ts / germanPrepositions.ts
│   │   ├── shared.ts        # Entry tuple type + makeEntries() helper shared by all 4 language files
│   │   └── index.ts         # Re-exports combined PREPOSITION_EXERCISES
│   └── verbs/
│       ├── dutchVerbs.ts    # DUTCH_VERBS[] — 100 verbs, fully conjugated
│       ├── spanishVerbs.ts  # SPANISH_VERBS[] — 100 verbs, fully conjugated
│       ├── englishVerbs.ts  # ENGLISH_VERBS[] — 100 verbs, fully conjugated
│       ├── germanVerbs.ts   # GERMAN_VERBS[] — 100 verbs, fully conjugated
│       ├── labels.ts        # PERSON_LABELS (pronouns per language) + TENSE_LABELS (tense name per language) + TENSE_KEYS
│       └── index.ts         # Re-exports VERBS (all 4 languages combined) + PERSON_LABELS/TENSE_LABELS/TENSE_KEYS
├── types/
│   └── index.ts             # Language, Flashcard, NounArticle, Synonym, Antonym, UserProgress, Verb, ConjugationSet, TenseKey, PrepositionExercise, AdverbId, PronominalAdverbExercise types
├── utils/
│   ├── wiktionary.ts            # fetchWiktionaryWikitext() — shared fetch/timeout/parse-page logic
│   ├── dutchGender.ts           # lookupDutchArticle() — de/het lookup for Articles
│   ├── wiktionarySynonyms.ts    # lookupWiktionarySynonyms() — synonym lookup for Synonyms
│   ├── wiktionaryAntonyms.ts    # lookupWiktionaryAntonyms() — antonym lookup for Antonyms, near-identical to wiktionarySynonyms.ts ({{ant|xx|...}} instead of {{syn|xx|...}})
│   ├── wiktionaryTranslation.ts # lookupWiktionaryTranslation() — gloss/translation lookup for Flashcards
│   ├── verbSearch.ts            # findVerbSuggestions()/findEquivalentVerb() — cross-language verb search for VerbTensesPage
│   └── wordSearch.ts            # findWordSuggestions()/findEquivalentWord() — generic version of the same cross-language ranking/resolution strategy, shared by Articles, Synonyms, and Antonyms (verbs keep their own copy in verbSearch.ts rather than sharing, to avoid touching already-working code)
├── hooks/                   # (empty — add custom hooks here)
├── App.tsx                  # BrowserRouter + AppProvider + Layout + Routes
├── main.tsx                 # React root mount
└── index.css                # Tailwind v4 @import + @theme design tokens
```

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Just the language picker — picking a language navigates to `/learn` |
| `/learn` | LearnPage | Per-language menu of 6 learning sections (Flashcards/Articles/Synonyms/Antonyms/Verbs/Prepositions), plus a 7th "Pronominal Adverbs" card when Dutch is selected (Dashboard excluded, it's in the header); navigating here always sets `selectedLanguage` first (from Home or Dashboard) |
| `/dashboard` | DashboardPage | Streak, Total XP, Daily XP, daily goal, "Continue Learning" language picker (→ `/learn`) |
| `/flashcards` | FlashcardsPage | 5-card grid pulled randomly from the combined dictionary pool |
| `/articles` | ArticlesPage | Type a noun (in any of the 4 languages) to look up its correct article; gender color-coded |
| `/synonyms` | SynonymsPage | Type a word (in any of the 4 languages) to look up synonyms |
| `/antonyms` | AntonymsPage | Type a word (in any of the 4 languages) to look up antonyms |
| `/verbs` | VerbTensesPage | Browse 100 common verbs per language; expand a tense card or the "All Tenses" table; search bar resolves a verb typed in any of the 4 languages to its equivalent in the selected language |
| `/prepositions` | PrepositionsPage | Fill-in-the-blank preposition quiz, 3 options per question |
| `/pronominal-adverbs` | PronominalAdverbsPage | Dutch-only: pick a pronominal adverb (er/hier/daar/waar), then a preposition, then a 10-question session (from a 50-sentence pool) filling in the split `<adverb> ... <preposition>` construction; shows a "Dutch only" guard if reached while another language is selected |

Lessons and Quiz pages/routes/data existed in the original scaffold and were removed (unused placeholders) — see git history if that flow needs reviving.

---

## Design System

Redesigned to an Anthropic.com-inspired editorial look (warm neutrals, serif headlines, muted pastel accents), replacing the original bright "Duolingo" visual language. All gamification (streak 🔥, XP ⚡, quiz scoring, flip-card flashcards) is unchanged — this was a pure visual/styling pass.

### Fonts
- **Source Serif 4** (Google Fonts, weights 400/600/700) — headlines and display numbers, applied via the `font-serif` utility (Tailwind v4 auto-generates it from the `--font-family-serif` theme token). Used at `font-semibold`, not `font-black` — editorial, not shouty.
- **Inter** (Google Fonts, weights 400/500/600/700/800) — body copy, nav, buttons, badges, labels; this is the default `font-sans`/body font.

### Color Palette

| Token | Hex | Used for |
|---|---|---|
| `--color-cream` | `#F7F4EE` | page/header background |
| `--color-surface` | `#FFFFFF` | card background |
| `--color-surface-tint` | `#F1EDE4` | hover states |
| `--color-border` | `#E3DFD4` | card/divider borders |
| `--color-ink` | `#1B1A17` | primary text/headings |
| `--color-muted` | `#6B6860` | secondary text/labels |
| `--color-accent` / `-dark` / `-light` | `#D97757` / `#B85C3E` / `#F3E2D9` | primary CTA, XP display |
| `--color-success` / `-dark` / `-light` | `#7A8F6E` / `#5F7256` / `#E3E8DC` | correct answers |
| `--color-error` / `-dark` / `-light` | `#B85C4F` / `#954A40` / `#F1DEDA` | wrong answers |
| `--color-nl` / `-light` | `#7C93B0` / `#E4EAF0` | Dutch accent (dusty blue) |
| `--color-es` / `-light` | `#D3A15C` / `#F3E7D3` | Spanish accent (ochre) |
| `--color-en` / `-light` | `#8FA37E` / `#E5EBDF` | English accent (sage) |
| `--color-de` / `-light` | `#BC7F6D` / `#F0E0DA` | German accent (muted clay) |
| `--color-feature` / `-light` | `#9B8AA8` / `#EAE3EC` | cross-cutting accent — Flashcards, Dutch neuter/`het`, "All Tenses" |

Each language keeps its original hue family (nl=blue, es=orange, en=green, de=red), just desaturated/warmed — defined once in `LANGUAGES` (`src/data/languages.ts`) and cascaded everywhere via the `color` field. Tokens live in `src/index.css` under `@theme { }` and are usable as Tailwind utilities (e.g. `bg-accent`); most components reference the raw hex directly via arbitrary-value classes (`text-[#1B1A17]`) rather than the token name, matching the pre-existing codebase convention.

### Visual Style
- **Cards**: flat `bg-white border border-[#E3DFD4]`, `rounded-2xl` — no 3D lift effect. The `accent` prop renders as a `border-l-4` stripe; a `tinted` card renders as a solid accent-colored block with no border (currently unused — was for hero/feature tiles before those were removed from the home page)
- **Buttons**: `rounded-full` pills, no border-b-4 press effect — `primary` = solid ink, `secondary` = ink-outlined, `danger` = solid error-color
- **Language/mode tabs**: `rounded-full` pill buttons across all pages (Articles, Synonyms, Verbs, Prepositions), replacing the old rectangular `rounded-xl` tabs; the header's nav links use the same solid-pill treatment (active = solid ink `bg-[#1B1A17]`, inactive = white bg + border)
- **Headings**: `font-serif font-semibold tracking-tight` in place of `font-black` Nunito
- **No hand-drawn illustration accents** — visual identity comes from type/color/shape alone (a deliberate scope decision, not an oversight)

### Mobile Responsiveness
- **Header** (`src/components/layout/Header.tsx`): logo and streak/XP are `shrink-0` (pinned); the 6-link nav is the only flexible piece, wrapped in a `relative min-w-0` container so it can shrink and scroll independently instead of forcing the whole page wider than the viewport
- Nav scrolling uses `overflow-x-auto` with the scrollbar hidden (`[scrollbar-width:none] [&::-webkit-scrollbar]:hidden`); scroll-affordance fade gradients render on whichever edge(s) still have off-screen content, tracked via `scrollLeft`/`scrollWidth` on scroll and resize. 6 pill buttons + logo + streak/XP genuinely don't fit at ~390px even with tightened gaps, so this scroll-fade is load-bearing, not optional polish — verified by scrolling the nav fully and confirming a far-right link (e.g. Prepositions) is still reachable and clickable
- `html, body { overflow-x: hidden }` in `src/index.css` remains as a general safety net against any element forcing page-wide horizontal scroll, independent of the header
- Text sizes/padding/gaps in the header step up at the `sm:` breakpoint (e.g. `text-xs sm:text-sm`, `px-2 sm:px-4`) to stay usable on narrow phones
- Grids that need to stack on narrow phones (e.g. the old home-page feature cards) use `grid-cols-1 sm:grid-cols-N` rather than a fixed column count — a real bug was hit here: a fixed `grid-cols-3` squeezed columns so narrow that wrapped text overflowed its card's colored background on a ~390px viewport

---

## Languages

Defined in `src/data/languages.ts`.

| ID | Name | Flag | Color |
|----|------|------|-------|
| `nl` | Dutch   | 🇳🇱 | Dusty blue `#7C93B0` |
| `es` | Spanish | 🇪🇸 | Ochre `#D3A15C` |
| `en` | English | 🇬🇧 | Sage `#8FA37E` |
| `de` | German  | 🇩🇪 | Muted clay `#BC7F6D` |

---

## Global State (AppContext)

`AppContext` holds:
- `progress: UserProgress` — streak, xp, level, dailyGoal, todayXp
- `selectedLanguage: Language` — the active language tab across all pages
- `setSelectedLanguage(lang)` — switch active language
- `addXp(amount)` — increment xp + todayXp

State is in-memory only (resets on refresh). Persistence (localStorage or backend) is not yet implemented.

---

## Navigation & the Learn Menu

- **Home (`/`)** shows only the "Choose your language" grid (4 cards from `LANGUAGES`). Clicking one calls `setSelectedLanguage(lang)` then navigates to `/learn`.
- **Learn (`/learn`, `src/pages/LearnPage.tsx`)** shows the selected language's flag/name and a `SECTIONS` grid (defined inline in the file) linking to Flashcards, Articles, Synonyms, Antonyms, Verbs, and Prepositions — each card tinted with `selectedLanguage.color`. When `selectedLanguage.id === 'nl'`, a 7th card (`PRONOMINAL_SECTION`) for Pronominal Adverbs is appended. Dashboard is deliberately excluded from this list since it's reachable from the header on every page.
- **Dashboard (`/dashboard`)** has its own "Continue Learning" grid — the same 4 language cards as Home — so a learner already on Dashboard can jump straight back into `/learn` for whichever language, without detouring through Home.
- **Header** (`src/components/layout/Header.tsx`) shows all 7 routes as pill buttons (Dashboard/Flashcards/Articles/Synonyms/Antonyms/Verbs/Prepositions) next to the "Idiomatrix" logo — this is the *current* state after an earlier simplification (down to just a Dashboard link) was reverted per explicit request; the header's nav is deliberately language-agnostic and always shows the same links regardless of `selectedLanguage`. Pronominal Adverbs is intentionally **not** in the header (it's Dutch-only, so it only ever appears in the Learn menu, conditionally).

Both the Learn menu and the header have gone through multiple redesign iterations this project's history — if a screenshot or memory references a different header/home-page layout, trust the current code over that snapshot.

---

## Wiktionary Integration

All four dictionary-backed features share `src/utils/wiktionary.ts`, whose `fetchWiktionaryWikitext(word)` hits the English Wiktionary API (`en.wiktionary.org/w/api.php?action=query&...`) and returns the raw wikitext for a page, or `null` on a missing page/network error/timeout (6s `AbortController`). Each feature has its own parser on top of that shared fetch:

| Util | Used by | Extracts |
|------|---------|----------|
| `dutchGender.ts` → `lookupDutchArticle()` | Articles (Dutch only) | `{{nl-noun\|X}}` template → `de`/`het` |
| `wiktionarySynonyms.ts` → `lookupWiktionarySynonyms()` | Synonyms (all 4 languages) | Inline `{{syn\|xx\|...}}` template (first sense found), falling back to an older-style `===Synonyms===` section |
| `wiktionaryAntonyms.ts` → `lookupWiktionaryAntonyms()` | Antonyms (all 4 languages) | Same shape as `wiktionarySynonyms.ts`, targeting `{{ant\|xx\|...}}` and `===Antonyms===` instead |
| `wiktionaryTranslation.ts` → `lookupWiktionaryTranslation()` | Flashcards "add a word" (all 4 languages) | First numbered definition line (`# ...`) under the word's language section, cleaned of wikitext markup |

Common pattern across all three:
- Isolate the correct language section first (`==Dutch==`, `==Spanish==`, etc.) so results aren't cross-contaminated between languages sharing a page
- 400ms debounce before firing the lookup from the UI
- Results cached permanently in `localStorage` (`idiomatrix-dutch-gender`, `idiomatrix-wiktionary-synonyms`, `idiomatrix-wiktionary-antonyms`, `idiomatrix-wiktionary-translations`), including a cached "not found" sentinel so repeat misses don't re-hit the API
- Known limitation: parsing is page-level, not sense-level, so a word with multiple parts of speech can occasionally surface synonyms/glosses for the wrong sense (e.g. German "schnell" the adverb vs. adjective) when the primary sense lacks inline data

---

## Article Checker (`/articles`)

**File:** `src/pages/ArticlesPage.tsx`
**Data:** `src/data/nounArticles.ts` → exported as `NOUN_ARTICLES: NounArticle[]`

### NounArticle type (`src/types/index.ts`)
```ts
export type NounArticle = {
  id: string;
  languageId: string;
  noun: string;
  article: string;
  gender: 'masculine' | 'feminine' | 'neuter' | 'common' | 'indefinite';
  translation: string;
};
```

### Dictionary sizes
| Language | Count | Format |
|----------|-------|--------|
| Dutch (`nl`) | ~1000 nouns | Compact `makeEntries()` tuples |
| Spanish (`es`) | 25 nouns | Plain object array |
| English (`en`) | 20 nouns | Plain object array |
| German (`de`) | 25 nouns | Plain object array |

### `makeEntries()` helper
Both `nounArticles.ts` and `synonyms.ts` use a compact tuple format to avoid repetitive object boilerplate:
```ts
type Entry = readonly [string, string, NounArticle['gender'], string];
// makeEntries(languageId, idPrefix, entries) → NounArticle[]
const DUTCH_NOUNS = makeEntries('nl', 'nl', [
  ['hond', 'de', 'common', 'dog'],
  ['kind', 'het', 'neuter', 'child'],
  // ...~1000 entries
]);
```

### Gender color-coding
| Gender | Color | Used for |
|--------|-------|---------|
| `common` | Dusty blue `#7C93B0` | Dutch `de` words |
| `neuter` | Muted mauve `#9B8AA8` (`--color-feature`) | Dutch `het` words |
| `masculine` | Dusty blue `#7C93B0` | Spanish/German masculine |
| `feminine` | Muted clay `#BC7F6D` | Spanish/German feminine |
| `indefinite` | Success green `#5F7256` | English `a`/`an` |

### UI behavior
- **Curated match** (word in `NOUN_ARTICLES`): shows article + translation + gender badge instantly, no API call
- **Wiktionary match** (Dutch only, word not in curated list): shows article + gender badge + "via Wiktionary" note; lookup fires after 400ms debounce
- **Loading state**: "Looking up…" pulse shown while Wiktionary call is in flight (Dutch only)
- **Not found**: "check the spelling?" for Dutch (Wiktionary exhausted); "not in our dictionary yet" for other languages
- **Prefix suggestions**: up to 5 clickable matches while typing, drawn from **all 4 languages** via `findWordSuggestions()` (`src/utils/wordSearch.ts`) — each row shows the source-language flag; picking a same-language suggestion just fills the input, picking a foreign-language one resolves to its equivalent in the selected language via `findEquivalentWord()` and fills that instead (or shows a "No {language} equivalent found" message if the curated dictionary has no match — expected given the very different dictionary sizes per language, see table above)
- **Browse all**: full grid of all curated nouns for the selected language when input is empty
- **Language tabs**: synced with global `selectedLanguage` from AppContext; clears input (and any pending cross-language "not found" message) on switch; Wiktionary lookup only runs for Dutch
- **Cross-language gloss key** (`nounGlossKey()` in `ArticlesPage.tsx`): for nl/es/de entries this is the first token of `translation` (already a plain English word); for English entries it's the noun itself, **not** `translation` — English's own `translation` field is a special composite `"es / nl / de"` cross-reference (e.g. "dog" → `"perro / hond / Hund"`), bonus data for display but not a single comparable gloss like the other 3 languages have, so matching keys off the word instead (same pattern as the Verb Tenses cross-language search, for the same underlying reason)

### Article Quiz mode
**File:** `src/components/articles/ArticleQuiz.tsx`

A "Look up" / "📝 _articles_ Quiz" mode toggle appears on the Articles page for all 4 languages. The quiz question always asks "Which article?" and offers the buttons appropriate to the selected language, defined in the exported `QUIZ_ARTICLES` map:

| Language | Article choices |
|----------|-----------------|
| Dutch (`nl`) | de / het |
| Spanish (`es`) | el / la |
| English (`en`) | a / an |
| German (`de`) | der / die / das |

- Draws 10 random nouns (`QUIZ_SIZE`) from the selected language's slice of `NOUN_ARTICLES` via Fisher-Yates shuffle, one question at a time (not a grid like Flashcards); re-draws automatically whenever the selected language changes
- The correct answer is checked against each entry's `article` field (not `gender`) — this matters for exceptions like Spanish "agua" (`el`, feminine)
- Answer buttons render in a 2- or 3-column grid depending on how many choices the language has (German's 3 vs. everyone else's 2)
- Learner picks an article; the choice locks in immediately (buttons disable), correct answer highlights in the success color, a wrong pick highlights in the error color while the correct one still shows success, and the noun's translation is revealed
- Correct answers award **+5 XP** (`XP_PER_CORRECT`) via `addXp`, matching the Flashcards reward per card
- A `ProgressBar` tracks question 1–10; an explicit "Next question" / "See results" button advances (no auto-timer)
- End screen shows score out of 10, a percentage badge (color scales with performance), and "Play again" to redraw a fresh random 10
- Reads `selectedLanguage` and `addXp` from `AppContext` directly (no props), so it stays in sync with the language tabs on the page

---

## Synonyms (`/synonyms`)

**File:** `src/pages/SynonymsPage.tsx`
**Data:** `src/data/synonyms.ts` → exported as `SYNONYMS: Synonym[]`

### Synonym type (`src/types/index.ts`)
```ts
export type Synonym = {
  id: string;
  languageId: string;
  word: string;
  synonyms: string[];
  translation: string;
};
```

25 curated words per language (adjectives, verbs, common vocabulary), each with 2-4 synonyms and a translation. Same UX pattern as Articles: curated match shows instantly with clickable synonym chips (clicking one re-searches for it); words outside the curated list fall back to a debounced Wiktionary lookup via `lookupWiktionarySynonyms()`, shown with a "via Wiktionary · no translation in our dictionary" note since Wiktionary doesn't give us a translation, only synonyms. Works for all 4 languages (unlike the Dutch-only gender fallback in Articles).

Like Articles, the live-typing suggestion list is cross-language (`findWordSuggestions()`/`findEquivalentWord()` from `src/utils/wordSearch.ts`) — type "bonito" (Spanish) while browsing Dutch and the suggestion resolves to "mooi". `synonymGlossKey()` here is simpler than the Articles/Verbs equivalent: every language's `translation` field is already a plain, consistently-formatted English gloss (including English's own entries, e.g. `word: 'talk'`, `translation: 'to talk'`) — no composite-field or definitional-gloss special-casing needed, just `primaryToken(translation)` uniformly across all 4 languages.

---

## Antonyms (`/antonyms`)

**File:** `src/pages/AntonymsPage.tsx`
**Data:** `src/data/antonyms.ts` → exported as `ANTONYMS: Antonym[]`

### Antonym type (`src/types/index.ts`)
```ts
export type Antonym = {
  id: string;
  languageId: string;
  word: string;
  antonyms: string[];
  translation: string;
};
```

`AntonymsPage.tsx` is a near-exact structural mirror of `SynonymsPage.tsx` — same curated-match/Wiktionary-fallback/prefix-suggestion/browse-all layout, same cross-language search via `wordSearch.ts`, same debounce/cache pattern, just swapping `synonyms: string[]` for `antonyms: string[]` and `lookupWiktionarySynonyms()` for `lookupWiktionaryAntonyms()`. Accent color is German clay (`#BC7F6D`) instead of Synonyms' mauve (`#9B8AA8`), so the two features stay visually distinguishable despite the identical layout.

`ANTONYMS` deliberately reuses the **exact same 25-word vocabulary** as `SYNONYMS` per language (mooi/groot/klein/snel/... in Dutch, etc.) rather than an independently curated word list — a learner reviewing one feature encounters the same headwords in the other, and most pairs are each other's antonym *within the list itself* (mooi↔lelijk, groot↔klein, snel↔langzaam, blij↔verdrietig, slim↔dom, sterk↔zwak, makkelijk↔moeilijk, rijk↔arm, beginnen↔eindigen — 9 reciprocal pairs, 18 of the 25 words). The remaining 7 (boos, bang, leuk, belangrijk, praten, kijken, lopen) pair with a word outside the list (e.g. Dutch `boos` → `kalm`, not itself a headword). `translation` values are copied verbatim from `synonyms.ts` for the same word, so the two features' English glosses always agree.

---

## Flashcards (`/flashcards`)

**File:** `src/pages/FlashcardsPage.tsx`

### Deck construction
`getFlashcardPool(languageId)` in `src/data/languages.ts` merges three sources into one deduped pool (by lowercased front text):
- Curated `FLASHCARDS[]` (a handful of hand-written cards, e.g. greetings)
- Every `NOUN_ARTICLES` entry for that language, front rendered as `${article} ${noun}` so article practice is baked in
- Every `SYNONYMS` entry for that language

This gives Dutch **1000+** flashcards and the other languages **~50** each, versus the original 2-3 hardcoded cards.

### Session behavior
- On mount / language switch, a fresh random sample of **5 cards** (`SESSION_SIZE`) is drawn via Fisher-Yates shuffle and shown together as a grid — not one at a time
- Each card flips independently on click; flipping a card for the first time immediately marks it reviewed (turns green, "Reviewed" badge, +5 XP) — there's no separate Easy/Good/Hard rating step
- Once all cards in the session are reviewed, a "New words" button draws a fresh random 5
- **Add a word**: a search box below the grid lets you type any word in the selected language; if it's not already in the session, a 400ms-debounced Wiktionary lookup (`lookupWiktionaryTranslation()`) fires and shows a preview card with an "Add" button that appends it to the current session (session-only, not persisted to the dictionary files)

---

## Verb Tenses (`/verbs`)

**File:** `src/pages/VerbTensesPage.tsx`
**Data:** `src/data/verbs/` → `VERBS: Verb[]` (100 per language × 4 languages = 400 total), plus `PERSON_LABELS` and `TENSE_LABELS` lookup tables, all re-exported from `src/data/verbs/index.ts`

### Verb type (`src/types/index.ts`)
```ts
export type TenseKey = 'present' | 'past' | 'future' | 'presentPerfect';
export type ConjugationSet = [string, string, string, string, string, string]; // fixed person order

export type Verb = {
  id: string;
  languageId: string;
  infinitive: string;
  translation: string;
  present: ConjugationSet;
  past: ConjugationSet;
  future: ConjugationSet;
  presentPerfect: ConjugationSet;
};
```

### Person order (shared across all 4 languages so tables line up)
`[1st sg, 2nd sg, 3rd sg, 1st pl, 2nd pl, 3rd pl]` — e.g. English: I / you / he-she-it / we / you-all / they. Actual pronoun labels per language live in `PERSON_LABELS` (`src/data/verbs/labels.ts`): Dutch `ik/jij/hij-zij-het/wij/jullie/zij`, Spanish `yo/tú/él-ella-usted/nosotros/vosotros/ellos-ellas`, German `ich/du/er-sie-es/wir/ihr/sie-Sie`.

### Tenses covered
Present, Past (simple past/preterite, not a continuous form), Future, and Present Perfect — the same 4-tense set across all languages, with language-specific grammar names in `TENSE_LABELS` (e.g. Dutch "Tegenwoordige tijd"/"Verleden tijd"/"Toekomende tijd"/"Voltooid tegenwoordige tijd"; German "Präsens"/"Präteritum"/"Futur I"/"Perfekt"; Spanish "Presente"/"Pretérito"/"Futuro"/"Pretérito perfecto"). Compound tenses (future, present perfect) use the grammatically correct auxiliary per verb — including the hebben/zijn (Dutch) and haben/sein (German) split for verbs of motion/change of state.

### UI behavior
- One verb "presented at a time": a navigator card shows the infinitive + translation with **Prev/Next** buttons and a "Verb N of 100" counter; switching languages resets to verb 1
- Below it, a vertical stack of tense cards (Present, Past, Future, Present Perfect) plus a 5th **"📋 All Tenses"** card
- Clicking a tense card expands a conjugation card directly beneath it, listing all 6 persons for that tense; multiple tense cards can be expanded at once (not an exclusive accordion)
- Clicking "All Tenses" expands a table below it instead — rows are the 4 tenses, columns are the 6 persons, so the whole conjugation is visible at a glance; the table's card wrapper scrolls horizontally on narrow viewports (German's 6-person columns are the widest case)
- Expansion state resets whenever the verb or language changes
- A collapsed **"Browse all 100 verbs"** grid at the bottom lets you jump directly to any verb (highights the currently-selected one) instead of paging through with Prev/Next
- No XP awarded — this is a reference/study tool like Articles' lookup mode, not a scored exercise

### Cross-language search
**File:** `src/utils/verbSearch.ts`, wired up in `VerbTensesPage.tsx`

A search input above the verb navigator lets a learner type a verb in *any* of the 4 languages and jump to its equivalent in whichever language is currently selected (e.g. typing Spanish "ser" or English "be" while browsing Dutch lands on "zijn").

- `findVerbSuggestions(query)` returns up to 5 matches across all 400 `VERBS` entries (any language), ranked: exact infinitive match → infinitive prefix match → exact translation-token match → translation-token prefix match. This ranking matters: a naive single-tier `startsWith` match on the raw `translation` string lets short queries get swamped by unrelated verbs (typing "be" without ranking surfaces Dutch "kunnen" — translation "to be able to / can" — ahead of the actual English "be" entry, since "be able to" also starts with "be"). Translations are split on `/`, `,`, `;` into individual sense-tokens before matching so multi-sense glosses like "must / to have to" match on "must" specifically, not just as a prefix of the whole joined phrase.
- `findEquivalentVerb(hit, targetLanguageId)` resolves a clicked suggestion to the target language via a `glossKey`: for English entries this is the (already-English) infinitive itself; for nl/es/de it's the first translation token, normalized. This split exists because English verbs' `translation` field is a **definitional gloss**, not a "to X" translation (see caveat below) — using the infinitive sidesteps that inconsistency entirely rather than trying to reconcile the two formats.
- Diacritic-insensitive (`stripDiacritics` via `String.prototype.normalize('NFD')`) so plain-ASCII typing matches accented infinitives (Spanish "oír", German "läuft").
- Not every verb has a cross-language equivalent — the 4 "100 most common verbs" lists were curated independently per language and don't fully overlap. When `findEquivalentVerb` returns `null`, a small Card renders `No {language} equivalent found for "{word}" ({flag} {gloss})` instead of failing silently or erroring.
- One-to-many gloss collisions (e.g. Spanish "ser" and "estar" both gloss to "be") resolve deterministically to whichever appears first in `VERBS` — not treated as an error case.

### Content provenance & known caveats
The 400 verb entries (100 × 4 languages) were authored by dedicated research passes per language, cross-checking irregular high-frequency verbs (modals, "to be"/"to have"-type verbs, strong/irregular preterites) by hand. A few noted edge cases if inaccuracies surface during use:
- Dutch `zullen` ("shall/will") doesn't have a natural future or present-perfect in real usage; those two tenses were constructed grammatically for schema consistency rather than reflecting attested usage.
- Dutch aux choice (hebben vs. zijn) for a handful of verbs with regional/contextual variation (lopen, rijden, vliegen, zwemmen, beginnen, eindigen, vergeten, veranderen) reflects the more common reading — native usage sometimes splits by transitive vs. directional sense.
- German aux choice for stehen/liegen/sitzen uses standard High German (`haben`); Southern German/Austrian usage prefers `sein`.
- Spanish `levantarse`/`casarse` are reflexive, so their conjugated forms include the clitic pronoun (`me levanto`, `se casó`) rather than a bare stem.
- English `get`'s present perfect uses the American "gotten" rather than British "got"; `learn`/`learned` likewise uses the American form over "learnt".
- English verbs' `translation` field is a **definitional gloss**, not an English-to-English "translation" — e.g. "have" → "possess / own", "go" → "move toward a place" — since translating English to English would just repeat the word. This is intentional (adds learner value a redundant "to have" wouldn't), but it means the English verb list's `translation` field is *not* directly comparable to the nl/es/de lists' "to X" translations; the cross-language search (above) works around this by keying English entries on their own infinitive instead.

---

## Prepositions (`/prepositions`)

**File:** `src/pages/PrepositionsPage.tsx` + `src/components/prepositions/PrepositionQuiz.tsx`
**Data:** `src/data/prepositions/` → `PREPOSITION_EXERCISES: PrepositionExercise[]` (120 per language × 4 languages = 480 total), split into one file per language (`dutchPrepositions.ts`, etc.) sharing a `makeEntries()` helper + `Entry` tuple type from `shared.ts`, combined in `index.ts`

### PrepositionExercise type (`src/types/index.ts`)
```ts
export type PrepositionExercise = {
  id: string;
  languageId: string;
  sentence: string; // contains "___" marking the blank
  correct: string;
  distractors: [string, string];
  translation: string;
};
```

### Distractor design
Each exercise's 2 wrong options aren't random prepositions — they're specifically the ones a non-native speaker is likely to mistakenly pick, generally because:
- **Literal translation from the learner's other languages fails** — e.g. Dutch "in het weekend" (not "op"), because English says "on the weekend"; German "Angst vor" (not "von"/"an"), because English says "afraid of"
- **Fixed verb/adjective + preposition pairings** that don't map 1:1 across languages — e.g. Spanish "pensar en" vs. "pensar a", German "sich freuen auf" (upcoming) vs. "sich freuen über" (already happened) vs. "an"
- **Near-synonym prepositions with a real grammatical distinction** — e.g. English "between" (exactly two) vs. "among"/"amongst" (three+); Spanish "por" vs. "para" (reason/means vs. purpose/destination); German locational in/an/auf (enclosed space vs. vertical surface vs. horizontal surface)

The `translation` field doubles as the answer explanation — for non-English languages it's an English translation of the sentence plus a short rule; for English exercises (already in English) it's just the usage rule.

### UI behavior (mirrors `ArticleQuiz`'s architecture)
- Draws 10 random exercises (`QUIZ_SIZE`) per session via Fisher-Yates shuffle from the selected language's pool; re-draws when the language tab changes
- The 3 options (correct + 2 distractors) are re-shuffled per question so the correct answer isn't always in the same position
- The blank renders inline in the sentence (underscored placeholder before answering, filled with the learner's pick and colored success/error after)
- Selecting locks in the choice, highlights correct/wrong in the success/error colors (with the correct one still highlighted), and reveals the translation/rule
- Correct answers award **+5 XP** (`XP_PER_CORRECT`), matching Flashcards and the Articles de/het quiz
- End screen shows score out of 10, a percentage badge, and "Play again" to redraw a fresh random 10
- No separate "look up" mode — this page is quiz-only, unlike Articles which offers both a lookup and a quiz mode

### Content scale
Each language started with 20 hand-written exercises, then a dedicated research pass per language added 100 more (120 total per language), explicitly covering different ground from the first 20 — additional fixed reflexive-verb/preposition idioms, extended time/location prepositions, and everyday-life scenarios — verified for zero duplicate sentences and exactly one unambiguous correct answer per entry.

---

## Pronominal Adverbs & Prepositions (`/pronominal-adverbs`, Dutch only)

**Files:** `src/pages/PronominalAdverbsPage.tsx` + `src/components/pronominal/PronominalAdverbExercise.tsx` (the latter is a 10-question **session** component, not a single exercise — see below)
**Data:** `src/data/pronominalAdverbs.ts` → `ADVERBS`, `PREPOSITIONS`, `PRONOMINAL_ADVERB_EXERCISES: PronominalAdverbExercise[]` (**2,400**, generated: 4 adverbs × 12 prepositions × 50 sentence variants) + `completeDutchSentence()` helper

The only Dutch-specific grammar feature in the app (every other feature works across all 4 languages). Covers Dutch's pronominal adverbs — `er` (unstressed "it/them"), `hier` ("this"), `daar` ("that"), and `waar` (interrogative "what/which") — each of which combines with a fixed preposition (eraan, hieraan, daaraan, waaraan, ...; ermee, hiermee, daarmee, waarmee; ...) and can split from that preposition elsewhere in the clause, e.g. "houden van" ("to like") → "Ik hou er veel van" ("I like it a lot").

### PronominalAdverbExercise type (`src/types/index.ts`)
```ts
export type AdverbId = 'er' | 'hier' | 'daar' | 'waar';

export type PronominalAdverbExercise = {
  id: string;
  adverbId: AdverbId;
  prepositionId: string;      // e.g. "aan"
  prepositionLabel: string;   // e.g. "aan" or "mee / met"
  sentence: string;           // Dutch sentence with exactly two "___" blanks
  blank1: { correct: string }; // the adverb — no distractors, see "UI behavior" below
  blank2: { correct: string }; // the preposition — same
  guide: { en: string; es: string; de: string }; // guide sentence, shown upfront as a hint
};
```

Dutch guide text is **derived, not stored** — `completeDutchSentence(exercise)` fills the sentence's own two blanks with its own answer key, so there's no separate Dutch string that could drift out of sync with the answer key.

### Content design — generated from a conjugation engine, not hand-authored per entry
50 hand-written sentences × 48 combos would be 2,400 individually-authored sentences — not practical to write or verify by hand. Instead, `src/data/pronominalAdverbs.ts` builds a small **grammar engine**:

- `VERBS`: present-tense conjugation tables (one entry per person `ik/je/hij/wij/jullie/zij`) for the 12 base verbs used across the preposition families (denken, staan, kunnen, zijn, geloven, kijken, geven, lijden, wachten, praten, vechten). `questionConj()` derives each verb's inverted-question form from its declarative form, applying the real Dutch rule that a verb loses its regular *-t* ending when the subject "je" is inverted to follow it ("je denkt" → "denk je") — except the modal "kunnen", which has its own further-contracted irregular form ("kun je", not "denk"-pattern "kan je") and is special-cased.
- `PREP_FAMILIES`: 12 entries (one per preposition), each with **9 interchangeable modifier words** (degree/frequency synonyms appropriate to that slot — e.g. "aan" uses vaak/soms/regelmatig/wel eens/.../constant; "achter" uses volledig/helemaal/altijd/.../volmondig) and a `build()` function producing the blanked sentence for a given person + question-or-declarative + modifier. 6 persons × 9 modifiers = 54 combinations per (adverb, preposition) pair, trimmed to 50.
- `simpleBuilder(verb, opts)` covers 10 of the 12 families with the shared shape `"{Pron} {verb} ___ {modifier}[ mid] ___[ tail]."` / `"___ {verb} {pron} {modifier}[ mid] ___[ tail]?"` — `mid` inserts a fixed word **before** the final blank (the "mee" family's "blij": Dutch wants "erg blij mee", not "erg mee blij"), `tail` inserts one **after** it (the "door" family's past participle "overtuigd", which belongs at the very end of the clause). Only the reflexive "bij" family (modal "kunnen" + reflexive pronoun agreement `me/je/zich/ons/je/zich`) needs a fully bespoke builder.
- `PRONOMINAL_ADVERB_EXERCISES = ADVERBS.flatMap(adverb => PREP_FAMILIES.flatMap(family => [...50 variants]))` — generated at module load, not a literal array.
- All 4 adverb/12 preposition/several-person spot-checks were verified by hand for grammatical correctness during development (e.g. "Hij kan zich er bijna niets bij voorstellen.", "Jullie zijn hier niet snel door overtuigd.", "Je bent daar uitermate blij mee.") — see git history for the specific checks if a generated sentence ever looks wrong.
- **Known trade-off**: the `guide` (en/es/de hint) is **one representative sentence per (adverb, preposition) combo**, reused across all 50 person/modifier variants — it is *not* individually translated per variant (that would mean ~7,200 translated strings). This means the guide's grammatical subject sometimes won't match the specific Dutch sentence shown (e.g. guide says "They never talk about it" while the displayed sentence uses "wij"/"we"). This was a deliberate, disclosed scope decision (translating all 2,400 sentences into 3 languages each was judged impractical) — the guide's job is to convey *which blank is which* (adverb vs. preposition, and roughly what the sentence means), not to be a word-for-word translation of that exact random variant.

### UI behavior — now a 10-question session, not a single exercise
- Route guards on `selectedLanguage.id !== 'nl'`, rendering a "Dutch only" Card instead of the exercise — necessary because the route is reachable independent of the Learn menu's conditional card (direct URL, browser back/forward)
- Three-level navigation, all local `useState` on `PronominalAdverbsPage`: adverb menu (4 cards) → preposition menu (12 cards, matching the reference table) → `<PronominalAdverbExercise adverbId prepositionId onBack>`. No subtitle/intro paragraph under the page's `<h1>` — the guide sentence inside each exercise carries that explanatory weight instead
- The exercise component itself draws a **random 10** from the matching 50-item pool (`SESSION_SIZE`, Fisher-Yates shuffle) each time it mounts or the adverb/preposition combo changes — same pattern as `PrepositionQuiz`/`ArticleQuiz`, with a `ProgressBar`, "Sentence N of 10" counter, and an end screen (score, percentage `Badge`, "Play again" to redraw a fresh 10, or back out to the preposition menu)
- Each blank shows **only its correct answer as a single button** (no multiple-choice distractors) — the adverb and preposition were already chosen via the two menus that led into the session, so re-quizzing that same choice with wrong-answer options would be redundant; clicking fills in and colors the blank green
- **+5 XP** per sentence, awarded once both blanks in the current question are filled (tracked via a `bothAnswered` boolean transitioning false→true, guarding against double-award on re-render) — a full 10-sentence session is worth 50 XP
- The guide-sentence panel renders **at the top of each question, before either blank is answered** — used as a hint while filling in the blanks, not a reveal-after-answering confirmation. A 4-flag picker lets the learner choose which of the 4 app languages the guide displays in — defaults to `selectedLanguage.id !== 'nl' ? selectedLanguage.id : 'en'` (in practice always `'en'`, since the page-level guard means `selectedLanguage` is always Dutch here), persists across the whole session (not reset per question), and is purely local component state — does not touch the global `selectedLanguage`/`setSelectedLanguage`

---

## Key Decisions & Conventions

- **Tailwind v4** is used via `@tailwindcss/vite` plugin — no `tailwind.config.js`, config lives in `@theme {}` in `index.css`
- **Named exports** for all components and pages (no default exports except `App`)
- **Dictionary data split**: `NOUN_ARTICLES` and `SYNONYMS` each live in their own file under `src/data/` (not `languages.ts`) to keep the main data file manageable; `languages.ts` re-exports both
- **Flashcards reuses other features' data** rather than maintaining its own large word list — `getFlashcardPool()` derives cards from `NOUN_ARTICLES` + `SYNONYMS`
- **Wiktionary fetch logic is shared** (`utils/wiktionary.ts`) across all four lookup features; only the wikitext-parsing logic differs per feature
- **Cross-language search logic is shared** (`utils/wordSearch.ts`) across Articles/Synonyms/Antonyms — same ranking/resolution strategy as `utils/verbSearch.ts` (kept as a separate, not-shared copy for Verbs specifically, to avoid touching already-working/tested code when the word-type version was generalized out later)
- **No auth** — user is anonymous; progress is ephemeral for now
- **No backend** — all data is static until a backend is added

---

## Running the Project

```bash
npm run dev     # start dev server at http://localhost:5173
npm run build   # production build
npm run preview # preview production build
```

### ⚠️ Type-checking gotcha: plain `tsc --noEmit` is a silent no-op here
This project uses **TypeScript project references** — the root `tsconfig.json` has `"files": []` and only `references` to `tsconfig.app.json`/`tsconfig.node.json`. Running `npx tsc --noEmit` directly checks the (empty) root project and reports **zero errors regardless of what's actually wrong in `src/`** — it silently doesn't check anything. This was discovered mid-session after several rounds of "clean" `tsc --noEmit` output turned out to be checking nothing at all.

**Always type-check with:** `npx tsc -b --noEmit` (or `npx tsc -b --force --noEmit` for a guaranteed-fresh check, bypassing incremental `.tsbuildinfo` cache). This matches the first step of `npm run build` (`tsc -b && vite build`) and actually compiles `src/` under `tsconfig.app.json`.

---

## Deployment

- **Hosting**: Vercel, free Hobby tier. Vercel project is named `idiomatrix` (previously `idiomatic`, previously `pentalingo`) — dashboard: `vercel.com/remerkle-9465s-projects/idiomatrix`. Live production URL is **`idiomatrix.vercel.app`** — the domain has been migrated to match the current app name, so this is safe to share/bookmark (e.g. for testing on a phone) without checking Settings → Domains first.
- **Source**: GitHub repo `remerkle/idiomatrix` (renamed from `remerkle/idiomatic`, which was itself renamed from `remerkle/pentalingo`, via `gh repo rename`; GitHub auto-redirects old URLs), connected to Vercel's Git integration
- **Auto-deploy**: every push to `main` triggers a production deployment automatically (no manual `vercel deploy` needed going forward)
- **Vercel project**: linked by project ID in `.vercel/project.json` (gitignored) — renaming the GitHub repo does not break this link since Vercel tracks it by ID, not name

### Naming history
The app has been renamed twice: **Pentalingo → Idiomatic → Idiomatrix**. Each rename followed the same process and hit the same recurring snag:
- **Done each time**: every in-code/doc reference (header logo, page title, `package.json`/lockfile name, localStorage cache key prefixes, this file's own name and content) and the GitHub repo rename via `gh repo rename`
- **Local folder — resolved**: the project's local folder on disk was stuck at `pentalingo` across both earlier rename rounds (Windows refused the rename with a "file in use" error while VS Code/Claude Code's extension host held an open handle on it as the active workspace root). This has since been fixed — the working directory is now `C:\Users\rolan\Documents\Claude\Code\idiomatrix`, matching the current app name.
- **Vercel project/domain**: renamed dashboard-side by the user each time (not something achievable via API in this session — no live Vercel API access). The actual live `*.vercel.app` domain lags behind the project-name rename unless a new domain is explicitly added under Settings → Domains, so don't assume the live URL matches the current app name without checking.
