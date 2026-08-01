# @study/content

Reads the markdown in `courses/` and writes `generated/content.json`, which is the only data source of the web app. This package does not use React and runs on plain Node.

To learn how to write the content itself, read [`courses/README.md`](../../courses/README.md). This file is about the pipeline.

## Scripts

| Script | What it does |
|---|---|
| `scripts/build.mjs` | Scans `courses/*/course.json`, parses the markdown and writes `generated/content.json`. Add `--verbose` to print every warning instead of the first 12 lines |
| `scripts/verify.mjs` | Downloads the source exam of every course with an `upstream` block and compares each answer with the `Correct answer` line. Exits with code 1 when something differs |
| `scripts/make-mock-exams.mjs` | Writes mock exam files from the source exam. Takes a course id, and without one it does every course with `mockExams.generateFrom` |

Downloaded exams are cached in `.cache/<course-id>/`, so a second run needs no network.

## Output

```js
import content from '@study/content';
// { generatedAt, courses: [...], warnings: [...] }
```

The types are written by hand in `index.d.ts`. That file is the only description of the schema, so when you change the shape in `scripts/build.mjs` you must change it too. If you forget, TypeScript in the web app will tell a lie.

`generated/` is in `.gitignore` because it is a build result. Turborepo runs the `build` script of this package before it builds the web app.

## Why the parser is hand written

The source markdown comes from several community repos and it is not consistent. Some exams number the questions by hand, and some use markdown auto numbering, so every question starts with `1.`. A source note is sometimes in backticks and sometimes in italics. An answer line is sometimes `Correct answer: A, D` and sometimes `Correct Answer: AC`.

A general markdown library would give a syntax tree, but all of the guessing above would still be ours to write. So the parser reads the text directly.

`verify.mjs` is the safety net for that choice. It compares the answers we parsed with the source, so a parser mistake shows up at once instead of quietly teaching the wrong thing.

## Related docs

| Doc | What it covers |
|---|---|
| [`../../README.md`](../../README.md) | The platform and the commands |
| [`../../courses/README.md`](../../courses/README.md) | How to write the content of a course |
| [`../ui/README.md`](../ui/README.md) | The design system |
| [`../../apps/web/README.md`](../../apps/web/README.md) | The web app |
