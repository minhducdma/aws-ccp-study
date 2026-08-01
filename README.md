# AWS Certification Study Platform

A monorepo platform for self-study courses on AWS certification exams. The goal is to make it easy to add a new AWS exam as pure content (Markdown + JSON) without touching the app code, and to give learners a structured way to study: notes, practice questions and a gate quiz per phase, where the next phase only opens after you pass the quiz before it.

Live site: <https://minhducdma.github.io/aws-ccp-study/>

## Repo layout

```
courses/            Data. One folder for each exam
packages/content/   Reads courses/ and writes content.json
packages/ui/        Design system: tokens, components, animation, SVG art
apps/web/           React web app
```

The important line is between `courses/` and `apps/web/`. The first one is data, the second one is the app. No exam name is written in the app code, so everything that belongs to one exam stays in its own `course.json`.

## Commands

Run all of them from the repo root.

| Command | What it does |
|---|---|
| `pnpm install` | Installs the dependencies of every package |
| `pnpm run dev` | Starts the dev server on <http://localhost:5180> |
| `pnpm run build` | Builds the static site into `apps/web/dist/` |
| `pnpm run check` | Reads the markdown again and prints every warning |
| `pnpm run verify` | Downloads the source exams and compares every answer |
| `pnpm run smoke` | Renders every route, in every language, with SSR to catch runtime errors |
| `pnpm run mock-exams` | Builds the mock exam files again from the source exams |
| `pnpm run preview:pages` | Serves the build the same way GitHub Pages does |

Turborepo caches by file content. If you edit markdown, both packages run again. If you edit nothing, `pnpm run build` returns almost at once, because there is nothing to redo.

## Web app features

| Feature | What it does |
|---|---|
| Roadmap page | Lists every AWS exam by level, and locks the ones with no content |
| Notes | Shows the markdown with an outline and a "read" mark |
| Practice | One question at a time, with an instant check and an explanation |
| Gate quiz | Runs a timer, hides the answers until you submit, then opens the next phase |
| Mock exam | 50 questions in 90 minutes, with a score table for each domain |
| Wrong answers | Keeps every question you failed, and removes it when you get it right |
| Phase lock | Opens a phase only after the phase before is passed. Free mode turns this off |
| Language | Vietnamese and English, switched in the header, remembered in the browser |
| Account | Sign in with email/password or Google. Progress then syncs through Firestore instead of staying on one browser |

Progress is saved in `localStorage`, and it is kept **for each exam on its own**, so two courses never mix. It also belongs to the browser domain, so your progress on localhost and on GitHub Pages are two different copies.

Signing in changes that: your progress is written to Firestore under your own account and read back on every device, live, through `onSnapshot`. `localStorage` is still kept as an offline cache and as the store for guests who never sign in. Firestore's rules only let a signed-in user read or write their own document (`firestore.rules`), so one account can never see another's progress. To run the app locally with sign-in working, copy `apps/web/.env.example` to `apps/web/.env.local` and fill it with your own Firebase project's config.

## Languages

The interface reads in Vietnamese and in English, and the switch sits in the header of every page. A first visit follows the browser language, and the choice is then remembered.

The two kinds of text are handled apart:

| | Where it is written | What happens when a language is missing |
|---|---|---|
| Interface: buttons, headings, labels | `apps/web/src/i18n/messages/` | Nothing. The Vietnamese catalogue defines the keys and every other language is typed against it, so the build fails |
| Content: course summaries, phase titles, notes | `courses/`, inside `course.json` and the markdown files | The page falls back to Vietnamese and says which language it is showing |

That difference is on purpose. The interface is a fixed set of about 200 sentences, so it is worth demanding a complete translation. Course material is thousands of lines and grows every time somebody writes a phase, so it has to be translatable one file at a time.

Exam questions are left in the language of the source exams. Rewriting a question changes what it asks.

Read [`apps/web/README.md`](apps/web/README.md#languages) to add a language, and [`courses/README.md`](courses/README.md#writing-in-more-than-one-language) to translate a course.

## Content quality

`pnpm run verify` is the check that matters most. It compares every answer in this repo with the `Correct answer` line in the source exam, so a wrong answer is found instead of being taught.

`pnpm run mock-exams` writes the mock exams. It copies the questions and the answers from the source, so they always match. The domain labels and the Vietnamese explanations come from `annotations.json` in each course.

## Deploy to GitHub Pages

`.github/workflows/deploy.yml` runs on every push to `main`. It installs, reads the markdown, builds and publishes. You turn it on once in the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

| Setting | Value now | When to change it |
|---|---|---|
| `BASE_PATH` in `apps/web/vite.config.ts` | `/aws-ccp-study/` | You rename the repo. Use `/` for a custom domain or a `<user>.github.io` repo |
| Router `basename` in `apps/web/src/main.tsx` | Taken from `import.meta.env.BASE_URL` | Never |
| `404.html` in `apps/web/dist/` | A copy of `index.html`, written at build time | Never |

The `404.html` file is not optional. GitHub Pages only serves static files, so it does not know that `/course/aws-clf-c02/review` is a route of the app. When you open that link, or press F5 in the middle of an exam, Pages returns `404.html`, which is the app itself, and then the router shows the right page. Run `pnpm run preview:pages` and open <http://localhost:4173/aws-ccp-study/> to test this before you push.

## Related docs

| Doc | What it covers |
|---|---|
| [`courses/README.md`](courses/README.md) | How to write the content of a course |
| [`packages/content/README.md`](packages/content/README.md) | The markdown parser and its scripts |
| [`packages/ui/README.md`](packages/ui/README.md) | The design system |
| [`apps/web/README.md`](apps/web/README.md) | The web app |
