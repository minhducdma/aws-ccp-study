# Hướng dẫn soạn nội dung khoá học

Thư mục này là **dữ liệu**, không phải code. Mỗi chứng chỉ là một thư mục con, và web app đọc chúng qua `course.json` — nên thêm hoặc sửa khoá học không bao giờ phải đụng vào `apps/web/`.

Đọc file này trước khi tạo khoá mới. Định dạng markdown bên dưới là thứ parser trong `packages/content/scripts/build.mjs` thực sự nhận, sai một ký tự là câu hỏi bị bỏ qua.

## Quy tắc đặt tên

| Thứ | Quy tắc | Ví dụ |
|---|---|---|
| Thư mục khoá học | `<nhà cung cấp>-<mã đề viết thường>` | `aws-clf-c02`, `aws-saa-c03` |
| Thư mục phase | `<thứ tự>-<slug ngắn>` | `1-cloud-concepts`, `3-technology` |
| File notes | `notes.md`, thêm file phụ thì đặt tên theo nội dung | `cheatsheet.md` |
| File luyện tập | `practice.md` | |
| Gate quiz | `gate-quiz.md` và `gate-quiz.answers.md` | |
| Đề thi thử | `mock-<n>.md` và `mock-<n>.answers.md` | `mock-1.md` |

Ba tên bắt buộc đúng tuyệt đối là `practice.md`, `gate-quiz.md`, `gate-quiz.answers.md` — parser tìm theo tên cứng. Riêng file notes thì khai báo trong manifest nên đặt tên gì cũng được.

Đề thi thử phải khớp `mock-<số>.md`; file nào không khớp mẫu này sẽ bị bỏ qua.

## Bố cục một khoá học

```
courses/aws-clf-c02/
├── course.json                    Bắt buộc. Mọi thứ riêng của khoá nằm ở đây
├── phases/
│   └── 1-cloud-concepts/
│       ├── notes.md               Bài đọc
│       ├── practice.md            Câu luyện tập, đáp án nằm cuối file
│       ├── gate-quiz.md           Đề chặn phase, KHÔNG kèm đáp án
│       └── gate-quiz.answers.md   Đáp án + giải thích
└── mock-exams/
    ├── mock-1.md
    ├── mock-1.answers.md
    └── annotations.json           Domain + giải thích cho đề sinh tự động
```

Khoá chưa soạn nội dung thì chỉ cần đúng một file `course.json` với `"status": "planned"`; trang lộ trình sẽ hiện nó ở trạng thái khoá.

## Manifest `course.json`

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
  "summary": "Một hai câu mô tả hiện trên thẻ ở trang lộ trình.",
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
      "notes": [{ "file": "notes.md", "title": "Kiến thức trọng tâm" }],
      "quiz": { "count": 25, "passScore": 20, "timeLimitMin": 35 }
    }
  ]
}
```

| Trường | Ý nghĩa |
|---|---|
| `id` | Phải trùng tên thư mục. Đây cũng là khoá lưu tiến độ, đổi nó là mất tiến độ cũ |
| `status` | `available` thì parser đọc nội dung, `planned` thì bỏ qua và hiện khoá |
| `levelOrder` | Thứ tự nhóm trên trang lộ trình: 1 Foundational, 2 Associate, 3 Professional, 4 Specialty |
| `domainLabels` | Tên domain hiện trong bảng phân tích điểm sau khi thi. Key là số domain dạng chuỗi |
| `phases[].dir` | Tên thư mục dưới `phases/`. Thứ tự phase lấy theo thứ tự trong mảng, không theo tên thư mục |
| `phases[].weight` | Tỉ lệ domain trong đề thi thật, dùng để tính "độ sẵn sàng". Tổng nên bằng 100 |
| `phases[].notes` | Danh sách file bài đọc kèm tiêu đề hiện trên sidebar |
| `phases[].quiz.count` | Số câu mong đợi. Lệch với thực tế thì `npm run check` cảnh báo |

Hai khối tuỳ chọn, chỉ cần khi muốn dùng công cụ đối chiếu và sinh đề:

```json
"upstream": {
  "label": "tên nguồn hiện trong log",
  "rawBase": "https://raw.githubusercontent.com/<owner>/<repo>/master/practice-exam",
  "filePattern": "practice-exam-{n}.md"
},
"mockExams": {
  "passRatio": 0.7,
  "timeLimitMin": 90,
  "generateFrom": [{ "mock": 1, "upstreamExam": 20 }]
}
```

`upstream` cho phép `npm run verify` tải đề gốc về và so từng đáp án. `mockExams.generateFrom` cho phép `npm run mock-exams` sinh thẳng file đề từ nguồn đó.

## Định dạng câu hỏi

Áp dụng chung cho `practice.md`, `gate-quiz.md` và `mock-<n>.md`.

```markdown
**1.** Nội dung câu hỏi viết trên một dòng.  `(Exam 1 - Q2)`

- A. Lựa chọn thứ nhất
- B. Lựa chọn thứ hai
- C. Lựa chọn thứ ba
- D. Lựa chọn thứ tư

**2.** Câu chọn nhiều đáp án phải ghi rõ. (Choose TWO)  `(Exam 1 - Q4)`

- A. ...
- B. ...
- C. ...
- D. ...
- E. ...
```

Những điểm parser bắt buộc:

- Số thứ tự phải ở dạng `**N.**` ngay đầu dòng. Dùng markdown tự đánh số (`1.`) sẽ không nhận.
- Lựa chọn bắt đầu bằng `-` hoặc `*`, rồi một chữ cái **A đến E**, rồi `.` hoặc `)`. Dưới hai lựa chọn thì câu bị bỏ qua kèm cảnh báo.
- Câu nhiều đáp án: ghi `(Choose TWO)`, `(Select TWO)`, `(Choose three)` hoặc `(Chọn HAI)` / `(Chọn BA)`. Không ghi cũng vẫn tự nhận là nhiều đáp án nếu đáp án có từ hai chữ cái, nhưng nên ghi để người học biết.
- Trích dẫn nguồn `(Exam N - QX)` là tuỳ chọn nhưng **rất nên có**: thiếu nó thì `npm run verify` không đối chiếu được câu đó. Đặt trong dấu backtick hay in nghiêng đều được, parser tự gỡ khỏi đề khi hiển thị.
- Một heading (`#`), một dòng `---` hoặc thẻ `<details>` sẽ kết thúc câu đang đọc.

## Định dạng đáp án

`practice.md` để đáp án ngay trong file, bọc trong `<details>` để không lộ khi đang làm. `gate-quiz.md` thì tách hẳn sang `gate-quiz.answers.md`. Nội dung khối đáp án giống nhau ở cả hai trường hợp:

```markdown
## Bảng đáp án nhanh

1AE, 2B, 3D, 4D, 5BE, 6C

---

## Giải thích từng câu

### Câu 1 — Đáp án: A, E

> Chép lại đề ở đây cho dễ đối chiếu, dòng trích dẫn này parser tự bỏ qua.

Phần giải thích. Nên nói rõ vì sao đáp án đúng là đúng **và** vì sao từng đáp án
sai là sai, vì đây là phần người học đọc khi làm sai.
```

- **Bảng đáp án nhanh** là nguồn đáng tin nhất và phải nằm trên một dòng riêng theo đúng mẫu `1D, 2BE, 3C` (ít nhất hai câu). Đây là thứ parser ưu tiên dùng.
- Tiêu đề giải thích chấp nhận hai kiểu: `### Câu N — Đáp án: A, E` hoặc `**N. Đáp án: D**`.
- Nếu bảng nhanh và phần giải thích ghi khác nhau, `npm run check` báo lệch. Đừng bỏ qua cảnh báo này.
- Dòng bắt đầu bằng `>` bị loại khỏi phần giải thích, nên cứ thoải mái trích lại đề.

Riêng file đáp án của đề thi thử có thêm bảng gán domain cho từng câu, dùng để vẽ biểu đồ phân tích điểm sau khi nộp bài:

```markdown
| Câu | Domain | Chủ đề |
|---|---|---|
| 1 | 3 | EC2 |
| 2 | 2 | IAM |
```

## Soạn xong thì chạy gì

Tất cả lệnh chạy ở thư mục gốc của repo.

| Lệnh | Khi nào dùng |
|---|---|
| `npm run check` | **Chạy đầu tiên.** Đọc lại toàn bộ markdown và in mọi cảnh báo: thiếu đáp án, lệch đáp án, câu thiếu lựa chọn, số câu không khớp manifest |
| `npm run dev` | Xem thử trên web, tự đọc lại markdown trước khi khởi động |
| `npm run verify` | Tải đề gốc về và so từng đáp án. Chỉ chạy được với khoá có khai báo `upstream` |
| `npm run mock-exams` | Sinh lại file đề thi thử. Thêm `-- <course-id>` để chỉ làm một khoá |
| `npm run build` | Build bản tĩnh trước khi deploy |

Quy trình gọn nhất khi thêm nội dung: sửa markdown → `npm run check` cho sạch cảnh báo → `npm run verify` nếu có nguồn đối chiếu → `npm run dev` xem lại bằng mắt → commit.

Không cần chạy lệnh nào để "đăng ký" file mới. Parser quét thư mục theo manifest mỗi lần build, và Turborepo theo dõi `courses/**` nên chỉ cần file thay đổi là nội dung được đọc lại.

## Mở khoá một chứng chỉ đang bị khoá

1. Mở `courses/<id>/course.json`, thêm mảng `phases` và đổi `status` thành `available`.
2. Tạo thư mục `phases/<dir>/` đúng như đã khai báo, đặt `notes.md` vào.
3. Chạy `npm run check`. Lúc này sẽ có cảnh báo thiếu `practice.md` và `gate-quiz.md` — bình thường, phase sẽ hiện "đang soạn nội dung" cho tới khi đủ ba phần.
4. Bổ sung dần cho tới khi hết cảnh báo.

Phase chỉ được coi là hoàn chỉnh khi có đủ notes, practice và gate quiz. Thiếu một trong ba thì web vẫn chạy, chỉ là phase đó hiện nhãn đang soạn.
