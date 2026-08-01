# Course content guide

This folder holds **data**, not code. Each exam is one sub-folder, and the web app reads it through `course.json`. Because of that, you never touch `apps/web/` when you add a course or fix a question.

Read this file before you start a new course. The markdown format below is what the parser in `packages/content/scripts/build.mjs` really accepts, and one wrong character makes it skip a question.

## Folder layout

```
courses/aws-clf-c02/
├── course.json                    Required. Everything about this exam
├── phases/
│   └── 1-cloud-concepts/
│       ├── notes.md               The reading material
│       ├── practice.md            Practice questions, answers at the end
│       ├── gate-quiz.md           The blocking quiz, with NO answers
│       └── gate-quiz.answers.md   Answers and explanations
└── mock-exams/
    ├── mock-1.md
    ├── mock-1.answers.md
    └── annotations.json           Domains and explanations for the built exams
```

A course with no content yet needs only one `course.json` file with `"status": "planned"`. The roadmap page then shows it as locked.

## File names

| Item | Rule | Example |
|---|---|---|
| Course folder | `<provider>-<exam code in lower case>` | `aws-clf-c02`, `aws-saa-c03` |
| Phase folder | `<order>-<short slug>` | `1-cloud-concepts`, `3-technology` |
| Notes file | `notes.md`, plus any extra file you need | `cheatsheet.md` |
| Translated notes | The same name with the language before `.md` | `notes.en.md` |
| Practice file | `practice.md` | |
| Gate quiz | `gate-quiz.md` and `gate-quiz.answers.md` | |
| Mock exam | `mock-<n>.md` and `mock-<n>.answers.md` | `mock-1.md` |

Three names must be exact: `practice.md`, `gate-quiz.md` and `gate-quiz.answers.md`. The parser looks for them by name. Notes files are free, because you list them in the manifest. A mock exam must match `mock-<number>.md`, and any other name is skipped.

## The `course.json` manifest

```json
{
  "id": "aws-saa-c03",
  "code": "SAA-C03",
  "title": "AWS Certified Solutions Architect – Associate",
  "shortTitle": "Solutions Architect",
  "provider": "AWS",
  "level": "Associate",
  "levelOrder": 2,
  "status": "available",
  "summary": "One or two lines. They show on the card in the roadmap page.",
  "estimatedHours": 40,
  "exam": {
    "totalQuestions": 65,
    "scoredQuestions": 50,
    "durationMin": 130,
    "passScore": 720,
    "maxScore": 1000
  },
  "domainLabels": {
    "1": "Design Secure Architectures"
  },
  "phases": [
    {
      "id": "phase-1",
      "dir": "1-secure-architectures",
      "title": "Design Secure Architectures",
      "domain": 1,
      "weight": 30,
      "estimatedHours": 10,
      "notes": [
        { "file": "notes.md", "title": { "vi": "Kiến thức trọng tâm", "en": "Core concepts" } }
      ],
      "quiz": { "count": 25, "passScore": 20, "timeLimitMin": 35 }
    }
  ]
}
```

Any text above may also be written once per language. The section on [writing in more than one language](#writing-in-more-than-one-language) says which fields accept it.

| Field | What it means |
|---|---|
| `id` | Must be the same as the folder name. It is also the progress key, so a new id loses the old progress |
| `status` | `available` means the parser reads the content. `planned` means it skips it and shows a lock |
| `levelOrder` | Group order on the roadmap: 1 Foundational, 2 Associate, 3 Professional, 4 Specialty |
| `domainLabels` | Domain names in the score table after an exam. The key is the domain number as a string |
| `phases[].dir` | Folder name under `phases/`. Phase order follows the array, not the folder name |
| `phases[].weight` | Share of this domain in the real exam. It drives the "readiness" number, and the total should be 100 |
| `phases[].notes` | Reading files and the titles shown in the sidebar |
| `phases[].quiz.count` | How many questions you expect. `npm run check` warns when the real number is different |

## Writing in more than one language

The app reads in Vietnamese and in English. Any text in `course.json` may be written once, or once per language:

```json
"summary": "Nền tảng điện toán đám mây…",

"summary": {
  "vi": "Nền tảng điện toán đám mây…",
  "en": "Cloud computing fundamentals…"
}
```

A plain string counts as Vietnamese. That is on purpose: a name like `Cloud Concepts` or `Billing, Pricing & Support` is the same in both languages, so writing it twice would only be one more place to keep in step.

These fields accept both forms: `title`, `shortTitle`, `summary`, every value in `domainLabels`, `phases[].title`, `phases[].notes[].title` and `mockExams.titles`. `level` does not: it is a fixed key (`Foundational`, `Associate`, `Professional`, `Specialty`) that the app names in the reader's language on its own.

A notes file works the same way. Write one file, or one file per language:

```json
"notes": [
  { "file": "notes.md", "title": { "vi": "Kiến thức trọng tâm", "en": "Core concepts" } },
  {
    "file": { "vi": "cheatsheet.md", "en": "cheatsheet.en.md" },
    "title": { "vi": "Cheat sheet tra nhanh", "en": "Quick-reference cheat sheet" }
  }
]
```

The Vietnamese file is the one that decides the note id, so adding a translation later never loses the "read" mark of a learner. When a reader asks for a language a page has not been written in, the app shows the Vietnamese one with a line saying so, rather than an empty screen. So a translation is always optional, and you can add one file at a time.

Questions are left alone. They are copied from the source exams and stay in the language those exams are written in, because changing the wording of a question would no longer be the question the exam asks.

Mock exams are numbered by the app, in the reader's language, so you do not have to name them. Name them only when a number is not enough:

```json
"mockExams": {
  "titles": { "1": { "vi": "Đề tổng hợp", "en": "Full-length exam" } }
}
```

`npm run check` warns about a locale key it does not know, so a typo like `"eng"` is caught before it reaches a reader.

Two blocks are optional. You need them only for the tools that compare and build exams:

```json
"upstream": {
  "label": "source name shown in the log",
  "rawBase": "https://raw.githubusercontent.com/<owner>/<repo>/master/practice-exam",
  "filePattern": "practice-exam-{n}.md"
},
"mockExams": {
  "passRatio": 0.7,
  "timeLimitMin": 90,
  "generateFrom": [{ "mock": 1, "upstreamExam": 20 }]
}
```

`upstream` lets `npm run verify` download the source exam and compare each answer. `mockExams.generateFrom` lets `npm run mock-exams` write the exam files straight from that source.

## Question format

The same format works in `practice.md`, `gate-quiz.md` and `mock-<n>.md`.

```markdown
**1.** The question text, all on one line.  `(Exam 1 - Q2)`

- A. First choice
- B. Second choice
- C. Third choice
- D. Fourth choice

**2.** A question with more than one answer must say so. (Choose TWO)  `(Exam 1 - Q4)`

- A. ...
- B. ...
- C. ...
- D. ...
- E. ...
```

Rules the parser needs:

- The number must look like `**N.**` at the start of the line. Markdown auto numbering (`1.`) does not work.
- A choice starts with `-` or `*`, then a letter from **A to E**, then `.` or `)`. A question with fewer than two choices is skipped with a warning.
- For more than one answer, write `(Choose TWO)`, `(Select TWO)`, `(Choose three)`, `(Chọn HAI)` or `(Chọn BA)`. The parser also sees it when the answer has two letters or more, but please still write it, so the learner knows.
- The source note `(Exam N - QX)` is optional but **strongly advised**. Without it, `npm run verify` cannot compare that question. Backticks or italics both work, and the parser removes it from the text on screen.
- A heading (`#`), a `---` line or a `<details>` tag ends the question that is being read.

## Answer format

`practice.md` keeps its answers in the same file, inside `<details>`, so nothing is shown too early. `gate-quiz.md` keeps them in `gate-quiz.answers.md`. The answer block itself looks the same in both cases:

```markdown
## Bảng đáp án nhanh

1AE, 2B, 3D, 4D, 5BE, 6C

---

## Giải thích từng câu

### Câu 1 — Đáp án: A, E

> You may copy the question here. The parser drops quoted lines.

The explanation. Say why the right answer is right **and** why each wrong
answer is wrong, because this is what a learner reads after a mistake.
```

- The **quick answer table** is the source the parser trusts most. It must sit on its own line and follow the shape `1D, 2BE, 3C`, with two questions or more.
- An explanation title can be `### Câu N — Đáp án: A, E` or `**N. Đáp án: D**`.
- When the quick table and the explanations disagree, `npm run check` reports it. Do not ignore that warning.
- Lines that start with `>` are dropped from the explanation, so you can copy the question freely.

The answer file of a mock exam also holds a domain table. The app uses it to draw the score breakdown after you submit:

```markdown
| Câu | Domain | Chủ đề |
|---|---|---|
| 1 | 3 | EC2 |
| 2 | 2 | IAM |
```

## Workflow

Run every command from the repo root.

| Command | When you use it |
|---|---|
| `npm run check` | **First.** Reads all the markdown and prints every warning: missing answers, answers that disagree, questions with too few choices, a count that does not match the manifest |
| `npm run dev` | To look at it in the browser. It reads the markdown again before it starts |
| `npm run verify` | To download the source exam and compare each answer. Only for a course with an `upstream` block |
| `npm run mock-exams` | To write the mock exam files again. Add `-- <course-id>` for one course only |
| `npm run build` | To build the static site before you deploy |

The short path when you add content: edit the markdown, run `npm run check` until there is no warning, run `npm run verify` if the course has a source, look at it with `npm run dev`, then commit.

You never run a command to "register" a new file. The parser walks the folders from the manifest on every build, and Turborepo watches `courses/**`, so a changed file is enough.

## Unlock a locked exam

1. Open `courses/<id>/course.json`, add the `phases` array and set `status` to `available`.
2. Create the `phases/<dir>/` folders you just declared, and put `notes.md` in them.
3. Run `npm run check`. You will see warnings about the missing `practice.md` and `gate-quiz.md`. That is normal, and the phase shows "đang soạn nội dung" until all three parts are there.
4. Add the missing files one by one until no warning is left.

A phase counts as complete only with notes, practice and a gate quiz. With one part missing the site still works, and that phase only shows a "being written" label.

## Related docs

| Doc | What it covers |
|---|---|
| [`../README.md`](../README.md) | The platform and the commands |
| [`../packages/content/README.md`](../packages/content/README.md) | The markdown parser and its scripts |
| [`../packages/ui/README.md`](../packages/ui/README.md) | The design system |
| [`../apps/web/README.md`](../apps/web/README.md) | The web app |
