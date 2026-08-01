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

## Saved progress

Progress sits in `localStorage` under the key `study-progress-v2`, and each course is kept apart:

```
{ version: 2, courses: { "aws-clf-c02": { notesRead, practice, attempts, wrong, freeMode } } }
```

A question id is unique inside one course only, so every lookup has to go through `lookupQuestion(course, id)`. Data from the old v1 key (`aws-ccp-progress-v1`, from the days of a single course) moves into the `aws-clf-c02` branch on the first run, and the old key is kept, not deleted.

## Commands

| Command | What it does |
|---|---|
| `npm run smoke` | Renders every route with SSR to catch runtime errors that a type check cannot see |
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
