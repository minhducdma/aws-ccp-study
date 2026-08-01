# Lộ trình học AWS Certified Cloud Practitioner (CLF-C02)

Khoá học tự luyện 12 giờ, chia 4 phase theo đúng 4 domain của kỳ thi. Mỗi phase có notes, bộ câu luyện tập, và một Gate Quiz phải pass mới sang phase tiếp theo.

## Thông tin kỳ thi

| Thông số | Giá trị |
|---|---|
| Mã đề | CLF-C02 |
| Số câu | 65 (50 tính điểm + 15 không tính điểm) |
| Thời gian | 90 phút |
| Điểm đậu | 700/1000 (~70%) |
| Lệ phí | ~100 USD |
| Hình thức | Online (Pearson VUE OnVUE) hoặc test center |

## Tỉ lệ domain

| Domain | Tỉ lệ | Phase | Thời lượng |
|---|---|---|---|
| Cloud Concepts | 24% | Phase 1 | ~2.9h |
| Security & Compliance | 30% | Phase 2 | ~3.6h |
| Cloud Technology & Services | 34% | Phase 3 | ~4.1h |
| Billing, Pricing & Support | 12% | Phase 4 | ~1.4h |

## Cấu trúc thư mục

```
phase-1-cloud-concepts/
  01-notes.md                 Kiến thức trọng tâm Domain 1
  02-practice-questions.md    Câu luyện tập (đáp án ẩn ở cuối file)
  03-gate-quiz.md             Gate Quiz - 20 câu, KHÔNG có đáp án
  03-gate-quiz-ANSWERS.md     Đáp án Gate Quiz - chỉ mở sau khi làm xong

phase-2-security/             Cùng cấu trúc, Gate Quiz 25 câu
phase-3-technology/           Cùng cấu trúc, Gate Quiz 30 câu
  04-service-cheatsheet.md    Bảng tra nhanh toàn bộ AWS service
phase-4-billing/              Cùng cấu trúc, Gate Quiz 15 câu

mock-exam/
  mock-exam-1.md              Đề mô phỏng 50 câu / 90 phút (Practice Exam 20)
  mock-exam-1-ANSWERS.md      Đáp án + bảng domain từng câu + phân tích điểm yếu
  mock-exam-2.md              Đề mô phỏng thứ hai (Practice Exam 21)
  mock-exam-2-ANSWERS.md

progress/tracker.md           Bảng ghi điểm và sổ tay lỗi hay mắc
```

## Web app (khuyến nghị dùng cách này)

Toàn bộ file markdown ở trên được dùng làm nguồn cho một web app học tương tác: quiz tự chấm, bấm giờ như thi thật, sổ tay câu sai tự động, và theo dõi tiến độ lưu trong máy.

```bash
cd web
npm install
npm run dev
```

Mở http://localhost:5180. Mỗi lần chạy `npm run dev` hoặc `npm run build`, nội dung markdown được đọc lại tự động — sửa file `.md` rồi khởi động lại là thấy thay đổi.

| Tính năng | Mô tả |
|---|---|
| Notes | Markdown render kèm mục lục, đánh dấu đã đọc |
| Luyện tập | Từng câu một, kiểm tra ngay, xem giải thích, lưu vị trí đang làm |
| Gate Quiz | Đếm ngược thời gian, không hiện đáp án tới khi nộp, tự chấm và gate phase sau |
| Thi thử | 50 câu / 90 phút, có phân tích điểm theo từng domain |
| Ôn câu sai | Tự thu thập mọi câu từng trả lời sai, trả lời đúng lại thì xoá khỏi danh sách |
| Khoá phase | Phase sau chỉ mở khi Gate Quiz phase trước đạt 80%, có thể tắt bằng chế độ học tự do |

Các lệnh khác trong `web/`:

| Lệnh | Việc |
|---|---|
| `npm run check` | Đọc lại markdown và in mọi cảnh báo (thiếu đáp án, lệch đáp án, thiếu câu) |
| `npm run verify` | Tải đề gốc từ GitHub và đối chiếu đáp án của từng câu với bản gốc |
| `npm run smoke` | Render thử toàn bộ route để phát hiện lỗi |
| `npm run build` | Build bản tĩnh vào `web/dist/`, deploy được lên bất kỳ static host |
| `npm run preview:pages` | Chạy thử bản build y hệt cách GitHub Pages phục vụ nó |

`npm run verify` là lớp bảo đảm chất lượng quan trọng nhất: nó so từng đáp án trong tài liệu với dòng `Correct answer` trong practice exam gốc, nên nếu có câu nào bị ghi sai đáp án thì sẽ bị phát hiện thay vì âm thầm dạy sai. Hiện tại **398/398 câu khớp bản gốc**.

Hai đề mô phỏng được sinh bằng `node scripts/make-mock-exams.mjs`: câu hỏi và đáp án lấy nguyên văn từ Practice Exam 20 và 21, còn phân loại domain cùng giải thích tiếng Việt nằm trong `scripts/mock-annotations.json`. Muốn sửa giải thích thì sửa file JSON đó rồi chạy lại script.

## Deploy lên GitHub Pages

Web app là bản tĩnh hoàn toàn nên host miễn phí trên GitHub Pages được. Workflow `.github/workflows/deploy.yml` đã cấu hình sẵn: mỗi lần push lên `main`, GitHub sẽ tự cài dependency, đọc lại markdown, build và publish.

Bật một lần duy nhất trong repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**. Sau lần push kế tiếp, trang sẽ chạy tại `https://minhducdma.github.io/aws-ccp-study/`.

Ba điểm cấu hình cần biết nếu đổi repo hoặc đổi cách host:

| Chỗ | Giá trị hiện tại | Khi nào phải sửa |
|---|---|---|
| `BASE_PATH` trong `web/vite.config.ts` | `/aws-ccp-study/` | Đổi tên repo. Dùng domain riêng hoặc repo dạng `<user>.github.io` thì đặt về `/` |
| `basename` của router (`web/src/main.tsx`) | Lấy tự động từ `import.meta.env.BASE_URL` | Không cần sửa, tự bám theo `BASE_PATH` |
| `404.html` trong `web/dist/` | Bản sao của `index.html`, sinh tự động khi build | Không cần sửa |

`404.html` là phần bắt buộc: GitHub Pages chỉ phục vụ file tĩnh, không biết các route như `/review` hay `/exam/mock-1` là của app. Khi bạn mở thẳng link đó hoặc F5 giữa bài thi, Pages không tìm thấy file nên trả về `404.html` — vốn chính là app, và router sẽ tự hiển thị đúng trang.

Muốn kiểm tra trước khi push, chạy `npm run preview:pages` rồi mở `http://localhost:4173/aws-ccp-study/`. Server này mô phỏng đúng hành vi của Pages (tiền tố đường dẫn + fallback 404), nên lỗi sai base path sẽ lộ ra ngay tại máy thay vì sau khi deploy.

Lưu ý về dữ liệu: tiến độ học được lưu bằng `localStorage` của trình duyệt, gắn theo domain. Học trên bản localhost rồi chuyển sang bản GitHub Pages thì tiến độ không đi theo, và ngược lại.

## Cách học (nếu đọc trực tiếp file markdown)

Mỗi phase đi theo chu trình **Học → Luyện → Gate Quiz**:

1. Đọc `01-notes.md` của phase đó.
2. Làm `02-practice-questions.md` — trả lời hết trước, rồi mới mở phần đáp án ở cuối file. Câu nào sai thì ghi khái niệm vào `progress/tracker.md`.
3. Làm `03-gate-quiz.md` trong điều kiện thi thật: bấm giờ, không tra tài liệu.
4. Mở `03-gate-quiz-ANSWERS.md` để chấm và ghi điểm vào tracker.

**Ngưỡng pass Gate Quiz:**

| Phase | Số câu | Cần đúng | Thời gian |
|---|---|---|---|
| 1 | 20 | ≥16 (80%) | 30 phút |
| 2 | 25 | ≥20 (80%) | 35 phút |
| 3 | 30 | ≥24 (80%) | 45 phút |
| 4 | 15 | ≥12 (80%) | 20 phút |

Chưa đạt ngưỡng thì đừng sang phase tiếp — ôn lại đúng những phần đã sai rồi làm lại quiz.

## Lịch 12 giờ đề xuất

| Block | Thời gian | Nội dung |
|---|---|---|
| 1 | 0–3h | Phase 1 |
| 2 | 3–6.5h | Phase 2 |
| — | | Nghỉ 30 phút |
| 3 | 7–11h | Phase 3 |
| 4 | 11–12.5h | Phase 4 |
| 5 | 12.5–13.5h | Mock Exam + review |

## Trước khi thi thật

- Pass cả 4 Gate Quiz.
- Mock Exam ≥35/50. Nếu chưa đạt, xem `progress/tracker.md` để biết domain yếu, ôn lại notes của domain đó rồi làm Mock Exam 2.
- Skim `phase-3-technology/04-service-cheatsheet.md` và mục "câu hỏi hay bẫy" trong mỗi file notes.
- Đăng ký thi tại [AWS Certification](https://aws.amazon.com/certification/certified-cloud-practitioner/), chọn phiên bản **CLF-C02**.
- Thi online cần CMND/CCCD hoặc Passport, phòng riêng không người khác, bàn trống.

## Nguồn tài liệu

Toàn bộ notes và câu hỏi được lấy từ repo mã nguồn mở [kananinirav/AWS-Certified-Cloud-Practitioner-Notes](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes) (23 đề luyện, ~1.150 câu), kết hợp với [AWS Certified Cloud Practitioner Exam Guide (CLF-C02)](https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Exam-Guide_C02.pdf) chính thức.

Repo này không liên quan đến, không được Amazon xác nhận hay uỷ quyền. Tên thương hiệu và tên sản phẩm chỉ dùng để tham chiếu.
