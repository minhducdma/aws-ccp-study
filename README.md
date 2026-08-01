# AWS Certification Study Platform

A monorepo of self-study courses for AWS exams. Each course is cut into phases. A phase has notes, practice questions and a gate quiz, and the next phase opens only after you pass that quiz.

One course is ready today: **AWS Certified Cloud Practitioner (CLF-C02)**, with 398 questions, 4 phases and 2 mock exams. The other AWS exams already have a seat in the roadmap, but they are locked.

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
| `npm install` | Installs the dependencies of every package |
| `npm run dev` | Starts the dev server on <http://localhost:5180> |
| `npm run build` | Builds the static site into `apps/web/dist/` |
| `npm run check` | Reads the markdown again and prints every warning |
| `npm run verify` | Downloads the source exams and compares every answer |
| `npm run smoke` | Renders every route, in every language, with SSR to catch runtime errors |
| `npm run mock-exams` | Builds the mock exam files again from the source exams |
| `npm run preview:pages` | Serves the build the same way GitHub Pages does |

Turborepo caches by file content. If you edit markdown, both packages run again. If you edit nothing, `npm run build` returns almost at once, because there is nothing to redo.

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

Progress is saved in `localStorage`, and it is kept **for each exam on its own**, so two courses never mix. It also belongs to the browser domain, so your progress on localhost and on GitHub Pages are two different copies.

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

`npm run verify` is the check that matters most. It compares every answer in this repo with the `Correct answer` line in the source exam, so a wrong answer is found instead of being taught. Today **398 of 398 questions match**.

`npm run mock-exams` writes the mock exams. It copies the questions and the answers from the source, so they always match. The domain labels and the Vietnamese explanations come from `annotations.json` in each course.

## Deploy to GitHub Pages

`.github/workflows/deploy.yml` runs on every push to `main`. It installs, reads the markdown, builds and publishes. You turn it on once in the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

| Setting | Value now | When to change it |
|---|---|---|
| `BASE_PATH` in `apps/web/vite.config.ts` | `/aws-ccp-study/` | You rename the repo. Use `/` for a custom domain or a `<user>.github.io` repo |
| Router `basename` in `apps/web/src/main.tsx` | Taken from `import.meta.env.BASE_URL` | Never |
| `404.html` in `apps/web/dist/` | A copy of `index.html`, written at build time | Never |

The `404.html` file is not optional. GitHub Pages only serves static files, so it does not know that `/course/aws-clf-c02/review` is a route of the app. When you open that link, or press F5 in the middle of an exam, Pages returns `404.html`, which is the app itself, and then the router shows the right page. Run `npm run preview:pages` and open <http://localhost:4173/aws-ccp-study/> to test this before you push.

## CLF-C02 exam

| Item | Value |
|---|---|
| Questions | 65 (50 scored, 15 not scored) |
| Time | 90 minutes |
| Pass score | 700 / 1000, about 70% |
| Fee | About 100 USD |
| Format | Online with Pearson VUE OnVUE, or at a test centre |

| Domain | Share | Phase | Hours | Gate quiz |
|---|---|---|---|---|
| Cloud Concepts | 24% | 1 | ~2.9 | ≥16/20 in 30 min |
| Security & Compliance | 30% | 2 | ~3.6 | ≥20/25 in 35 min |
| Cloud Technology & Services | 34% | 3 | ~4.1 | ≥24/30 in 45 min |
| Billing, Pricing & Support | 12% | 4 | ~1.4 | ≥12/15 in 20 min |

Do not open the next phase when you fail a quiz. Read the part you got wrong again, then take the quiz one more time. Before the real exam, pass all four gate quizzes, get at least 35 out of 50 in a mock exam, and read the cheat sheet and the "common traps" part of each notes file again.

## Sources

The CLF-C02 notes and questions come from the open source repo [kananinirav/AWS-Certified-Cloud-Practitioner-Notes](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes), which holds 23 practice exams and about 1,150 questions, together with the official [AWS Certified Cloud Practitioner Exam Guide (CLF-C02)](https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Exam-Guide_C02.pdf).

This repo has no link with Amazon, and Amazon does not review it or approve it. Brand names and product names are used only to point at them.

## Related docs

| Doc | What it covers |
|---|---|
| [`courses/README.md`](courses/README.md) | How to write the content of a course |
| [`packages/content/README.md`](packages/content/README.md) | The markdown parser and its scripts |
| [`packages/ui/README.md`](packages/ui/README.md) | The design system |
| [`apps/web/README.md`](apps/web/README.md) | The web app |
