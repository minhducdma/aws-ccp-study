# @study/web

The React web app, built with Vite and Tailwind. All the data comes from `@study/content` and all the interface comes from `@study/ui`. No exam is named in this code, so a new course needs no change here.

Start it from the repo root with `npm run dev`, not with `vite` in this folder, because Turborepo has to build the content first.

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

## Components

Only the parts tied to this product live in `src/`: `QuestionCard`, `CourseLayout` and `Markdown`. Buttons, cards, badges, dialogs and animation belong to [`packages/ui`](../../packages/ui/README.md). When you need a new one, add it there instead of writing it again here.

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
4. Run `npm run smoke`. It renders every route in every language, so anything left untranslated or formatted with the wrong parameters fails there.

Course content is a separate job, and it is optional: an untranslated course still works.

## Saved progress

Progress sits in `localStorage` under the key `study-progress-v2`, and each course is kept apart:

```
{ version: 2, courses: { "aws-clf-c02": { notesRead, practice, attempts, wrong, freeMode } } }
```

A question id is unique inside one course only, so every lookup has to go through `lookupQuestion(course, id)`. Data from the old v1 key (`aws-ccp-progress-v1`, from the days of a single course) moves into the `aws-clf-c02` branch on the first run, and the old key is kept, not deleted.

The chosen language sits beside it under `study-locale-v1`. Without that key the app reads `navigator.languages` and falls back to Vietnamese, so a first visit is already in a language the reader asked for.

## Commands

| Command | What it does |
|---|---|
| `npm run smoke` | Renders every route, in every language, with SSR, to catch runtime errors that a type check cannot see |
| `npm run preview:pages` | Serves `dist/` exactly like GitHub Pages, with the base path and the `404.html` fallback |

The smoke test uses the same providers as `main.tsx`. When you add a provider there, add it to `scripts/smoke-entry.tsx` too, or the routes will fail.

## GitHub Pages

`vite.config.ts` holds two things that exist only for GitHub Pages: the `BASE_PATH` variable, and a plugin that copies `index.html` to `404.html` at build time. Read the deploy part of the [root README](../../README.md) before you change either of them.

The build is also split into three chunks. Study material changes far more often than the libraries, so `content`, `vendor` and the app entry are kept apart, and a returning learner keeps the big vendor chunk in cache when only the markdown moved.

## Related docs

| Doc | What it covers |
|---|---|
| [`../../README.md`](../../README.md) | The platform and the commands |
| [`../../courses/README.md`](../../courses/README.md) | How to write the content of a course |
| [`../../packages/content/README.md`](../../packages/content/README.md) | The markdown parser and its scripts |
| [`../../packages/ui/README.md`](../../packages/ui/README.md) | The design system |
