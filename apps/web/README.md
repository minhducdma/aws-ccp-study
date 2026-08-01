# @study/web

The React web app, built with Vite and Tailwind. All the data comes from `@study/content` and all the interface comes from `@study/ui`. No exam is named in this code, so a new course needs no change here.

Start it from the repo root with `pnpm run dev`, not with `vite` in this folder, because Turborepo has to build the content first.

## Routes

| Path | Screen |
|---|---|
| `/` | Roadmap page. Lists every exam, and shows a lock on the ones with no content |
| `/course/:courseId` | Course overview |
| `/course/:courseId/review` | The wrong answer notebook |
| `/course/:courseId/phase/:phaseId/notes/:noteId` | Reading material |
| `/course/:courseId/phase/:phaseId/practice` | Practice, one question at a time |
| `/course/:courseId/exam/:examId` | Gate quiz and mock exam, on the same screen |

`CourseLayout` turns `:courseId` into a course object and passes it down through a context. In a page, call `useCourse()` to read `course` and to build links with `url()`. Never join a `/course/...` string by hand, because `url()` is the only place that knows the prefix.

A course that does not exist, or one with the `planned` status, is sent back to the roadmap page.

## Source structure

| Folder | What it owns |
|---|---|
| `src/app/` | Route composition and app-wide shell components |
| `src/features/auth/` | Authentication provider and account UI |
| `src/features/course/` | Course pages, study components, content queries, context and progress state |
| `src/i18n/` | Locale state, messages, formatting and locale controls |
| `src/services/firebase/` | Firebase setup and Firestore collection access |
| `src/utils/` | Framework-independent helpers |

Keep code inside the feature that owns it. Cross-feature UI belongs in `src/app/components/`; reusable visual primitives belong in [`packages/ui`](../../packages/ui/README.md). Import a feature's concrete module instead of creating a broad root barrel, because auth and course progress deliberately communicate during session changes and a barrel can turn that relationship into a runtime cycle.

## Languages

The interface reads in Vietnamese and in English. There is no i18n library: `src/i18n/` is about two hundred lines and does exactly what this app needs.

| File | What it holds |
|---|---|
| `i18n/locale.ts` | The list of languages, how one is chosen and where the choice is stored |
| `i18n/messages/vi.ts` | Every message, in Vietnamese. This file **defines the keys** |
| `i18n/messages/en.ts` | The same keys, in English |
| `i18n/translate.ts` | Placeholders, plural rules, number and date formatting |
| `i18n/provider.tsx` | `I18nProvider` and the `useI18n()` hook |

`en.ts` is typed as `Catalog`, which is built from `vi.ts`. Add a key to the Vietnamese file and forget the English one, and the build fails. That is the whole point: no screen can ever fall back to a blank label.

In a component, call `useI18n()`:

```tsx
const { t, tNode, localized, locale } = useI18n();

t('exam.submit');                                  // Nộp bài
t('review.timesWrong', { count: 3 });              // plural rules follow the language
tNode('dashboard.mockBest', {}, { score: <b>4</b> });  // a node inside a sentence
localized(course.summary);                         // authored text, see below
```

Write `{name}` in a message for anything variable, never join two messages with `+`: word order is not the same in every language. When a message counts something, give it the plural object form (`{ one, other }`) even if the language you are writing does not need it, because the next language might.

### Interface copy versus authored content

They are two different things and they are translated in two different places.

| | Interface copy | Authored content |
|---|---|---|
| Examples | Buttons, headings, aria labels | Course summaries, phase titles, notes, questions |
| Lives in | `src/i18n/messages/` | `courses/`, see [the content guide](../../courses/README.md) |
| Read with | `t('some.key')` | `localized(value)` |
| When it is missing | Cannot happen, the build fails | Falls back to Vietnamese, and the page says so |

`localized()` follows a fallback chain: the reader's language, then Vietnamese, then whatever the generator emitted. A notes page that falls back tells the reader which language it is showing, and marks the body with a `lang` attribute so a screen reader switches voice.

### Adding a language

1. Add the code to `LOCALES` and `LOCALE_INFO` in `i18n/locale.ts`.
2. Add it to `LOCALES` in `packages/content/scripts/build.mjs`, so a manifest may use it.
3. Copy `messages/vi.ts` to `messages/<code>.ts`, type it as `Catalog`, translate it, and add it to `CATALOGS` in `i18n/provider.tsx`.
4. Run `pnpm run smoke`. It renders every route in every language, so anything left untranslated or formatted with the wrong parameters fails there.

Course content is a separate job, and it is optional: an untranslated course still works.

## Saved progress

Progress sits in `localStorage` under the key `study-progress-v2`, and each course is kept apart:

```
{ version: 2, courses: { "aws-clf-c02": { notesRead, practice, attempts, wrong, freeMode } } }
```

A question id is unique inside one course only, so every lookup has to go through `lookupQuestion(course, id)`. Data from the old v1 key (`aws-ccp-progress-v1`, from the days of a single course) moves into the `aws-clf-c02` branch on the first run, and the old key is kept, not deleted.

The chosen language sits beside it under `study-locale-v1`. Without that key the app reads `navigator.languages` and falls back to Vietnamese, so a first visit is already in a language the reader asked for.

Everything above still describes a signed-out reader. Signing in changes where the store's data actually lives — see the next section.

## Accounts and Firestore sync

Firebase access is split by responsibility:

| File | What it holds |
|---|---|
| `src/services/firebase/config.ts` | Reads `VITE_FIREBASE_*` from the environment and exports `auth` and `db` |
| `src/services/firebase/collections/userProgress.ts` | Reads, writes and subscribes to progress documents |
| `src/features/auth/provider.tsx` | `AuthProvider` and `useAuth()`: sign up, sign in, Google sign-in, sign out |

`AuthProvider` sits in `main.tsx`, above the router, so `useAuth()` works on every screen. `AuthWidget` is the sign-in link or account initial used by the app shell. `AuthForm` is the shared component behind `/login` and `/signup`; both live in `src/features/auth/components/`.

`AuthProvider` calls `bindProgressUser(uid | null)` whenever the signed-in user changes. The UI still reads one in-memory course object, but Firestore stores each independently changing part separately:

```text
userProgress/{uid}/courses/{courseId}                       freeMode, updatedAt
userProgress/{uid}/courses/{courseId}/notes/{noteId}        read, updatedAt
userProgress/{uid}/courses/{courseId}/practice/{setId}      index, answers, checked, updatedAt
userProgress/{uid}/courses/{courseId}/wrong/{questionId}    count, updatedAt
userProgress/{uid}/courses/{courseId}/attempts/{attemptId}  one completed attempt
```

This keeps a single practice answer from rewriting notes, wrong-answer counters, or exam history. Existing course documents with embedded `notesRead`, `practice`, and `wrong` maps are read once, written into the detailed collections, then stripped of those legacy fields.

The binding function decides where the module-level store reads and writes from:

- **Signed out** — the store is `localStorage`, exactly as described above.
- **Signed in** — the detailed Firestore collections are kept live with `onSnapshot`, so every open tab and device receives updates. `localStorage` remains an offline cache.
- **Every sign-in** — local guest/cache data and remote data are loaded before listeners start. Course maps are merged, attempts are deduplicated by id, wrong-answer counters keep the highest count, and conflicting practice state uses the newer course update. The merged result is persisted to the detailed schema, so neither source is silently discarded.
- **Signed out** — account listeners stop and the account cache is removed from memory and `localStorage`, preventing one account's progress from appearing in a guest session.

`firestore.rules`, at the repo root, is the actual access control: a document under `userProgress/{uid}` can only be read or written by a request whose `auth.uid` matches `uid`. Nothing in the client code enforces that; the rules do. Deploy them with `firebase deploy --only firestore:rules --project <project-id>`.

### Running this locally

1. Copy `.env.example` to `.env.local` and fill it with your Firebase project's web app config (Firebase console → Project settings → General → Your apps).
2. In the Firebase console, turn on the **Email/Password** and **Google** sign-in providers (Authentication → Sign-in method) and create a **Firestore** database (Firestore Database → Create database). The CLI can deploy rules and list what exists, but it cannot toggle sign-in providers — that step is console-only.
3. `.env.local` is git-ignored. Never put real keys in `.env.example`, and never commit `.env.local`.

## Commands

| Command | What it does |
|---|---|
| `pnpm run smoke` | Renders every route, in every language, with SSR, to catch runtime errors that a type check cannot see |
| `pnpm run preview:pages` | Serves `dist/` exactly like Firebase Hosting, with the SPA rewrite to `index.html` |

The smoke test uses the same providers as `main.tsx`. When you add a provider there, add it to `scripts/smoke-entry.tsx` too, or the routes will fail.

## Firebase Hosting

The app is served from the domain root, so `vite.config.ts` builds with `base: '/'` by default (override with the `BASE_PATH` env var if you ever need a sub-path). `firebase.json`, at the repo root, rewrites every path to `index.html`, which is what lets a client-side route like `/course/aws-clf-c02/review` survive a page refresh. Read the deploy part of the [root README](../../README.md) before you change either of them.

The build is also split into three chunks. Study material changes far more often than the libraries, so `content`, `vendor` and the app entry are kept apart, and a returning learner keeps the big vendor chunk in cache when only the markdown moved.

## Related docs

| Doc | What it covers |
|---|---|
| [`../../README.md`](../../README.md) | The platform and the commands |
| [`../../courses/README.md`](../../courses/README.md) | How to write the content of a course |
| [`../../packages/content/README.md`](../../packages/content/README.md) | The markdown parser and its scripts |
| [`../../packages/ui/README.md`](../../packages/ui/README.md) | The design system |
