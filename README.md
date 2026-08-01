# Nền tảng luyện thi chứng chỉ AWS

Monorepo chứa các khoá tự luyện chứng chỉ AWS. Mỗi khoá chia thành nhiều phase theo đúng trọng số domain của kỳ thi, mỗi phase gồm notes, ngân hàng câu luyện tập và một Gate Quiz phải pass mới sang phase sau.

Khoá đang có nội dung đầy đủ: **AWS Certified Cloud Practitioner (CLF-C02)** — 398 câu hỏi, 4 phase, 2 đề thi thử. Các chứng chỉ AWS còn lại đã có sẵn chỗ trong lộ trình và hiện đang khoá.

Bản đang chạy: <https://minhducdma.github.io/aws-ccp-study/>

## Cấu trúc repo

```
courses/                       Dữ liệu — mỗi chứng chỉ một thư mục
  aws-clf-c02/
    course.json                Manifest: thông tin kỳ thi, danh sách phase, trọng số, domain
    phases/1-cloud-concepts/
      notes.md                 Kiến thức trọng tâm
      practice.md              Câu luyện tập (đáp án ẩn trong khối <details>)
      gate-quiz.md             Gate Quiz, không kèm đáp án
      gate-quiz.answers.md     Đáp án + giải thích, chỉ mở sau khi làm xong
    phases/3-technology/
      cheatsheet.md            Bảng tra nhanh AWS service
    mock-exams/
      mock-1.md                Đề mô phỏng 50 câu / 90 phút
      mock-1.answers.md        Đáp án + phân loại domain từng câu
      annotations.json         Domain và giải thích tiếng Việt cho đề mô phỏng
  aws-saa-c03/course.json      Khoá chưa có nội dung: chỉ manifest, catalog tự khoá lại
  README.md                    Hướng dẫn soạn nội dung: định dạng, quy tắc tên file, script

packages/content/              Pipeline: đọc courses/ và sinh ra content.json
packages/ui/                   Design system: token, primitive, animation, minh hoạ SVG
apps/web/                      Web app React, không biết gì về chứng chỉ cụ thể
```

Ranh giới quan trọng: `courses/` là dữ liệu, `apps/web/` là ứng dụng. Web app không hardcode chứng chỉ nào — mọi thứ riêng của từng khoá đều nằm trong `course.json`.

## Chạy tại máy

```bash
npm install
npm run dev
```

Mở <http://localhost:5180>. Turborepo tự chạy `@study/content` trước để đọc lại markdown, rồi mới khởi động Vite.

| Lệnh (chạy ở thư mục gốc) | Việc |
|---|---|
| `npm run dev` | Dev server, tự build lại nội dung trước khi chạy |
| `npm run build` | Build bản tĩnh vào `apps/web/dist/` |
| `npm run check` | Đọc lại markdown và in mọi cảnh báo (thiếu đáp án, lệch đáp án, thiếu câu) |
| `npm run verify` | Tải đề gốc từ GitHub và đối chiếu đáp án từng câu với bản gốc |
| `npm run smoke` | Render thử toàn bộ route bằng SSR để bắt lỗi runtime |
| `npm run mock-exams` | Sinh lại file đề mô phỏng từ đề gốc |
| `npm run preview:pages` | Chạy thử bản build y hệt cách GitHub Pages phục vụ nó |

Turborepo cache theo nội dung file: sửa markdown thì cả hai package build lại, không sửa gì thì `npm run build` trả về trong khoảng 50ms.

## Thêm một khoá học mới

Hướng dẫn đầy đủ — định dạng markdown cho câu hỏi và đáp án, quy tắc đặt tên file, chạy script nào sau khi soạn — nằm ở [`courses/README.md`](courses/README.md). Tóm tắt: không cần sửa code trong `apps/web/`, chỉ tạo `courses/<id>/course.json`, đổi `status` thành `available`, khai báo các phase rồi đặt markdown vào đúng đường dẫn:

```json
{
  "id": "aws-saa-c03",
  "code": "SAA-C03",
  "title": "AWS Certified Solutions Architect – Associate",
  "level": "Associate",
  "levelOrder": 2,
  "status": "available",
  "domainLabels": { "1": "Design Secure Architectures" },
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

Muốn `npm run verify` đối chiếu được đáp án, thêm khối `upstream` trỏ tới nguồn đề gốc. Muốn sinh đề mô phỏng tự động, thêm `mockExams.generateFrom`.

## Tính năng web app

| Tính năng | Mô tả |
|---|---|
| Trang lộ trình | Toàn bộ chứng chỉ AWS xếp theo cấp độ, khoá nào chưa có nội dung thì hiện khoá |
| Notes | Markdown render kèm mục lục, đánh dấu đã đọc |
| Luyện tập | Từng câu một, kiểm tra ngay, xem giải thích, lưu vị trí đang làm |
| Gate Quiz | Đếm ngược thời gian, không hiện đáp án tới khi nộp, tự chấm và mở khoá phase sau |
| Thi thử | 50 câu / 90 phút, có phân tích điểm theo từng domain |
| Ôn câu sai | Tự thu thập mọi câu từng trả lời sai, trả lời đúng lại thì xoá khỏi danh sách |
| Khoá phase | Phase sau chỉ mở khi Gate Quiz phase trước đạt ngưỡng, tắt được bằng chế độ học tự do |

Tiến độ lưu bằng `localStorage`, **tách riêng cho từng chứng chỉ**, nên học nhiều khoá song song không lẫn nhau. Vì gắn theo domain của trình duyệt nên tiến độ ở localhost và ở GitHub Pages là hai bản khác nhau.

## Bảo đảm chất lượng nội dung

`npm run verify` là lớp quan trọng nhất: nó so từng đáp án trong tài liệu với dòng `Correct answer` trong đề gốc, nên nếu có câu bị ghi sai đáp án thì sẽ bị phát hiện thay vì âm thầm dạy sai. Hiện tại **398/398 câu khớp bản gốc**.

Đề mô phỏng sinh bằng `npm run mock-exams`: câu hỏi và đáp án lấy nguyên văn từ đề gốc nên không thể lệch; phân loại domain và giải thích tiếng Việt nằm trong `annotations.json` của từng khoá.

## Deploy lên GitHub Pages

Workflow `.github/workflows/deploy.yml` chạy mỗi lần push lên `main`: cài dependency, đọc lại markdown, build và publish. Bật một lần trong repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

| Chỗ | Giá trị hiện tại | Khi nào phải sửa |
|---|---|---|
| `BASE_PATH` trong `apps/web/vite.config.ts` | `/aws-ccp-study/` | Đổi tên repo. Dùng domain riêng hoặc repo `<user>.github.io` thì đặt về `/` |
| `basename` của router (`apps/web/src/main.tsx`) | Lấy tự động từ `import.meta.env.BASE_URL` | Không cần sửa |
| `404.html` trong `apps/web/dist/` | Bản sao của `index.html`, sinh tự động khi build | Không cần sửa |

`404.html` là phần bắt buộc: GitHub Pages chỉ phục vụ file tĩnh, không biết `/course/aws-clf-c02/review` là route của app. Khi mở thẳng link đó hoặc F5 giữa bài thi, Pages trả về `404.html` — vốn chính là app — và router tự hiển thị đúng trang. Chạy `npm run preview:pages` rồi mở <http://localhost:4173/aws-ccp-study/> để thử trước khi push.

## AWS Certified Cloud Practitioner (CLF-C02)

| Thông số | Giá trị |
|---|---|
| Số câu | 65 (50 tính điểm + 15 không tính điểm) |
| Thời gian | 90 phút |
| Điểm đậu | 700/1000 (~70%) |
| Lệ phí | ~100 USD |
| Hình thức | Online (Pearson VUE OnVUE) hoặc test center |

| Domain | Tỉ lệ | Phase | Thời lượng | Gate Quiz |
|---|---|---|---|---|
| Cloud Concepts | 24% | 1 | ~2.9h | ≥16/20 · 30 phút |
| Security & Compliance | 30% | 2 | ~3.6h | ≥20/25 · 35 phút |
| Cloud Technology & Services | 34% | 3 | ~4.1h | ≥24/30 · 45 phút |
| Billing, Pricing & Support | 12% | 4 | ~1.4h | ≥12/15 · 20 phút |

Chưa đạt ngưỡng thì đừng sang phase tiếp — ôn lại đúng phần đã sai rồi làm lại quiz. Trước khi thi thật: pass cả 4 Gate Quiz, đạt ≥35/50 ở đề mô phỏng, và skim lại cheat sheet cùng mục "câu hỏi hay bẫy" trong mỗi file notes.

## Nguồn tài liệu

Notes và câu hỏi của CLF-C02 lấy từ repo mã nguồn mở [kananinirav/AWS-Certified-Cloud-Practitioner-Notes](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes) (23 đề luyện, ~1.150 câu), kết hợp với [AWS Certified Cloud Practitioner Exam Guide (CLF-C02)](https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Exam-Guide_C02.pdf) chính thức.

Repo này không liên quan đến, không được Amazon xác nhận hay uỷ quyền. Tên thương hiệu và tên sản phẩm chỉ dùng để tham chiếu.
