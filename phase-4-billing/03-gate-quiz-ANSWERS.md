# Phase 4 — GATE QUIZ: ĐÁP ÁN & GIẢI THÍCH

> Đáp án cho `03-gate-quiz.md`. **Chỉ mở file này sau khi đã làm hết 15 câu.**

---

## Đáp án nhanh

| Câu | Đáp án | Câu | Đáp án | Câu | Đáp án |
|---|---|---|---|---|---|
| 1 | **D** | 2 | **A** | 3 | **A** |
| 4 | **D** | 5 | **C** | 6 | **A** |
| 7 | **C** | 8 | **B** | 9 | **D** |
| 10 | **A** | 11 | **A, E** | 12 | **C** |
| 13 | **B, E** | 14 | **A, C** | 15 | **B, C** |

Dạng một dòng để so nhanh:

```
1D, 2A, 3A, 4D, 5C, 6A, 7C, 8B, 9D, 10A, 11AE, 12C, 13BE, 14AC, 15BC
```

---

## Giải thích chi tiết

### Câu 1 — Đáp án: D

> In which scenario should Amazon EC2 Spot Instances be used?

*Nguồn: (Exam 15 - Q4)*

Spot phù hợp với job không thường xuyên và chấp nhận bị ngắt (interruptible) — đúng đặc tính của Spot. A, B, C đều là workload cần chạy liên tục hoặc có SLA cao (99.999%), không thể dùng Spot vì AWS có thể thu hồi instance chỉ với 2 phút thông báo.

### Câu 2 — Đáp án: A

> When is it beneficial for a company to use a Spot Instance?

*Nguồn: (Exam 15 - Q46)*

Spot có lợi khi thời điểm chạy ứng dụng linh hoạt, vì bị ngắt rồi chạy lại sau không gây thiệt hại. Mission-critical workload, nhu cầu dedicated capacity, hoặc instance không được phép stop đều là chống chỉ định của Spot.

### Câu 3 — Đáp án: A

> When performing a cost analysis that supports physical isolation of a customer workload, which compute hosting model should be accounted for in the Total Cost of Ownership (TCO)?

*Nguồn: (Exam 14 - Q22)*

Khi phân tích chi phí có yêu cầu cách ly vật lý (physical isolation) thì phải tính theo Dedicated Hosts — chỉ Dedicated Host cho bạn thuê trọn server vật lý. Reserved và On-Demand chỉ là mô hình thanh toán trên hạ tầng dùng chung, không đảm bảo cách ly vật lý.

### Câu 4 — Đáp án: D

> Compared with costs in traditional and virtualized data centers, AWS has:

*Nguồn: (Exam 13 - Q19)*

So với data center truyền thống, AWS thấp hơn ở CẢ HAI: variable cost thấp hơn (nhờ economies of scale) và upfront cost thấp hơn (không phải mua hardware trước). Các đáp án khác chỉ đúng một nửa hoặc đảo ngược chiều.

### Câu 5 — Đáp án: C

> A company will be moving from an on-premises data center to the AWS Cloud. <br/> What would be one financial difference after the move?

*Nguồn: (Exam 15 - Q32)*

Lên cloud là chuyển từ upfront CapEx (mua server) sang variable OpEx (trả theo mức dùng). A đảo ngược chiều; B gọi sai loại chi phí (vẫn là capex); D sai vì OpEx không bị loại bỏ — nó chính là chi phí bạn trả hàng tháng cho AWS.

### Câu 6 — Đáp án: A

> Which of the following is an advantage of consolidated billing on AWS?

*Nguồn: (Exam 14 - Q33)*

Consolidated billing gộp usage của mọi account nên tổ chức đạt được bậc volume pricing. Nó không chia sẻ quyền truy cập (B), không tạo nhiều hoá đơn (C — ngược lại, chỉ một hoá đơn), và không thay thế nhu cầu tag (D — tag vẫn cần để bóc tách chi phí chi tiết).

### Câu 7 — Đáp án: C

> If each department within a company has its own AWS account, what is one way to enable consolidated billing?

*Nguồn: (Exam 14 - Q50)*

Cách chuẩn: tạo AWS Organization từ payer account rồi mời các account còn lại tham gia. Budgets chỉ cảnh báo ngưỡng chứ không gộp hoá đơn; liên hệ Support không phải cơ chế kỹ thuật; đổ invoice vào S3 rồi phân tích bằng Redshift là cách thủ công không cần thiết.

### Câu 8 — Đáp án: B

> Which service should a customer use to consolidate and centrally manage multiple AWS accounts?

*Nguồn: (Exam 13 - Q42)*

AWS Organizations là service để hợp nhất và quản lý tập trung nhiều AWS account. IAM quản lý identity trong MỘT account; Schema Conversion Tool chuyển đổi schema database; Config theo dõi cấu hình resource.

### Câu 9 — Đáp án: D

> Your company is developing a critical web application in AWS, and the security of the application is a top priority. Which of the following AWS services will provide infrastructure security optimization recommendations?

*Nguồn: (Exam 1 - Q46)*

Trusted Advisor đưa ra khuyến nghị tối ưu hạ tầng, trong đó có hẳn một category Security. AWS Shield chống DDoS nhưng không đưa khuyến nghị; Secrets Manager lưu secret; Management Console chỉ là giao diện quản trị.

### Câu 10 — Đáp án: A

> Which AWS service provides alerts when an AWS event may impact a company's AWS resources?

*Nguồn: (Exam 15 - Q29)*

Personal Health Dashboard cho góc nhìn cá nhân hoá và alert khi AWS event ảnh hưởng tới resource CỦA BẠN. Service Health Dashboard là trạng thái công khai cho mọi khách hàng; Trusted Advisor là khuyến nghị best practice; IEM là dịch vụ đồng hành sự kiện của gói Enterprise.

### Câu 11 — Đáp án: A, E **(Chọn HAI)**

> What does the AWS Health Dashboard provide? (Choose TWO)

*Nguồn: (Exam 1 - Q44)*

AWS Health Dashboard cho góc nhìn cá nhân hoá về sức khoẻ service (E) kèm hướng dẫn khắc phục chi tiết cho event đang ảnh hưởng resource của bạn (A). Health check của Auto Scaling là tính năng của ASG; khuyến nghị Cost Optimization thuộc Trusted Advisor; phát hiện lỗ hổng ứng dụng thuộc Amazon Inspector.

### Câu 12 — Đáp án: C

> Which of the following security-related actions are available at no cost?

*Nguồn: (Exam 13 - Q22)*

Forum, blog và whitepaper của AWS hoàn toàn miễn phí với mọi người. Gọi AWS Support cần plan trả phí (Developer trở lên); workshop từ Professional Services là paid engagement; lớp học ở đại học có học phí.

### Câu 13 — Đáp án: B, E **(Chọn HAI)**

> Which options does AWS make available for customers who want to learn about security in the cloud in an instructor-led setting? (Select TWO.)

*Nguồn: (Exam 14 - Q48)*

Instructor-led nghĩa là có người dạy trực tiếp: AWS Classroom Training và AWS Online Tech Talks. Trusted Advisor là công cụ tự động; Blog và Forums là tài liệu tự đọc, không có giảng viên.

### Câu 14 — Đáp án: A, C **(Chọn HAI)**

> The financial benefits of using AWS are: (Select TWO.)

*Nguồn: (Exam 15 - Q25)*

Lợi ích tài chính là giảm TCO (A) và giảm OpEx (C) nhờ trả theo mức dùng thay vì nuôi hạ tầng dư. B sai chiều vì cloud GIẢM capex chứ không tăng; D và E là dịch vụ tài chính mà AWS không cung cấp.

### Câu 15 — Đáp án: B, C **(Chọn HAI)**

> A company is considering moving its on-premises data center to AWS. What factors should be included in doing a Total Cost of Ownership (TCO) analysis? (Choose two.)

*Nguồn: (Exam 15 - Q47)*

TCO chỉ tính chi phí hạ tầng mà cloud thay thế được: điện tiêu thụ của data center (B) và nhân công thay thế server cũ (C). "EC2 instance availability" và "database engine capacity" là thông số kỹ thuật chứ không phải chi phí; thời gian developer viết ứng dụng không đổi dù ở cloud hay on-premises.

---

## Hướng dẫn chấm điểm

Mỗi câu 1 điểm. Câu **(Chọn HAI)** phải đúng **cả hai** đáp án mới được điểm — chọn 1 đúng 1 sai vẫn tính 0.

| Số câu đúng | Kết quả | Việc cần làm tiếp |
|---|---|---|
| **≥ 12/15** | ✅ **PASS** | Hoàn thành Phase 4. Sang `mock-exam/mock-exam-1.md` (50 câu, 90 phút) |
| **9–11/15** | ⚠️ **CHƯA PASS** | **Ôn lại rồi retake:** đọc lại các mục trong `01-notes.md` ứng với câu sai, làm lại `02-practice-questions.md`, rồi làm lại Gate Quiz này |
| **< 9/15** | ❌ **FAIL** | **Học lại `01-notes.md` từ đầu** (đặc biệt mục 2, 5, 9, 11 và 13), sau đó làm `02-practice-questions.md` rồi mới retake |

## Sai ở đâu thì ôn mục nào

| Câu sai | Chủ đề | Ôn lại mục trong `01-notes.md` |
|---|---|---|
| 1, 2, 3 | Pricing models (Spot, Dedicated Host) | Mục 2 — Pricing models & khi nào chọn cái nào |
| 4, 5, 14, 15 | Cloud economics, CapEx/OpEx, TCO | Mục 5 — phần TCO và CapEx vs OpEx |
| 6, 7, 8 | Organizations & consolidated billing | Mục 8 — AWS Organizations |
| 9 | Trusted Advisor | Mục 10 — Trusted Advisor |
| 10, 11 | Health Dashboard | Mục 11 — hai dashboard hay bị lẫn |
| 12, 13 | Tài nguyên miễn phí & đào tạo | Mục 12 — AWS Ecosystem |
