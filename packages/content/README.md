# @study/content

Đọc markdown trong `courses/` và sinh ra `generated/content.json` — nguồn dữ liệu duy nhất của web app. Package này không phụ thuộc React và chạy được độc lập bằng Node.

Muốn biết cách soạn nội dung, xem [`courses/README.md`](../../courses/README.md). File này nói về bản thân pipeline.

## Xuất ra gì

```js
import content from '@study/content';
// { generatedAt, courses: [...], warnings: [...] }
```

Kiểu dữ liệu khai báo tay trong `index.d.ts`. Đây là bản mô tả duy nhất của schema, nên sửa cấu trúc trong `scripts/build.mjs` thì phải sửa file đó theo, nếu không TypeScript ở web app sẽ nói dối.

`generated/` bị gitignore vì là sản phẩm build. Turborepo tự chạy `build` của package này trước khi build web.

## Ba script

| Script | Việc |
|---|---|
| `scripts/build.mjs` | Quét `courses/*/course.json`, parse markdown, ghi `generated/content.json`. Thêm `--verbose` để in hết cảnh báo thay vì 12 dòng đầu |
| `scripts/verify.mjs` | Tải đề gốc của khoá có khai báo `upstream` và so từng đáp án với dòng `Correct answer` bản gốc. Thoát với mã 1 nếu có câu lệch |
| `scripts/make-mock-exams.mjs` | Sinh file đề thi thử từ đề gốc. Nhận tham số course id, không truyền thì làm mọi khoá có `mockExams.generateFrom` |

Đề gốc tải về được cache tại `.cache/<course-id>/` để lần chạy sau không cần mạng.

## Vì sao tự viết parser thay vì dùng thư viện

Markdown nguồn đến từ nhiều repo cộng đồng và không nhất quán: có đề đánh số thủ công, có đề dựa vào markdown tự đánh số nên câu nào cũng là `1.`; trích dẫn khi thì trong backtick khi thì in nghiêng; đáp án khi ghi `Correct answer: A, D` khi ghi `Correct Answer: AC`. Một thư viện parse markdown tổng quát cho ra cây cú pháp nhưng vẫn phải tự viết toàn bộ phần suy luận này.

Đổi lại, `verify.mjs` đóng vai trò lưới an toàn: nó so đáp án đã parse với bản gốc nên parser sai ở đâu là lộ ra ngay thay vì âm thầm dạy sai.
