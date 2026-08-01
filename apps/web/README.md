# @study/web

Web app React + Vite + Tailwind. Toàn bộ dữ liệu lấy từ `@study/content`; app **không** hardcode chứng chỉ nào, nên thêm khoá học không cần sửa gì ở đây.

Chạy từ thư mục gốc của repo (`npm run dev`) chứ đừng chạy `vite` trực tiếp trong thư mục này, vì Turborepo cần build nội dung trước.

## Routing

| Đường dẫn | Màn hình |
|---|---|
| `/` | Trang lộ trình, liệt kê mọi chứng chỉ, khoá nào chưa có nội dung thì hiện ổ khoá |
| `/course/:courseId` | Tổng quan một khoá |
| `/course/:courseId/review` | Sổ tay câu sai |
| `/course/:courseId/phase/:phaseId/notes/:noteId` | Bài đọc |
| `/course/:courseId/phase/:phaseId/practice` | Luyện tập từng câu |
| `/course/:courseId/exam/:examId` | Gate quiz và đề thi thử, dùng chung một màn hình |

`CourseLayout` phân giải `:courseId` thành object khoá học rồi đưa xuống qua context. Trong các page, dùng `useCourse()` để lấy `course` và hàm `url()` dựng link — đừng tự nối chuỗi `/course/...`, vì `url()` là chỗ duy nhất biết tiền tố.

Khoá học không tồn tại hoặc đang ở trạng thái `planned` sẽ bị redirect về trang lộ trình.

## Lưu tiến độ

Tiến độ nằm trong `localStorage` dưới key `study-progress-v2`, tách riêng từng khoá:

```
{ version: 2, courses: { "aws-clf-c02": { notesRead, practice, attempts, wrong, freeMode } } }
```

ID câu hỏi chỉ duy nhất trong phạm vi một khoá, nên mọi thao tác tra cứu đều phải đi qua `lookupQuestion(course, id)`. Dữ liệu từ bản v1 cũ (`aws-ccp-progress-v1`, thời còn một khoá duy nhất) được tự động chuyển vào nhánh `aws-clf-c02` ở lần chạy đầu, và bản cũ vẫn được giữ lại chứ không xoá.

## Script riêng của app

| Lệnh | Việc |
|---|---|
| `npm run smoke` | Render mọi route bằng SSR để bắt lỗi runtime mà typecheck không thấy |
| `npm run preview:pages` | Phục vụ `dist/` y hệt GitHub Pages: có tiền tố base path và fallback `404.html` |

`vite.config.ts` giữ hai thứ đặc thù cho GitHub Pages: biến `BASE_PATH` và plugin chép `index.html` thành `404.html` khi build. Xem phần deploy trong [README gốc](../../README.md) trước khi đổi chúng.
