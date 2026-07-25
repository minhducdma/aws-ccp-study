# Phase 1 — GATE QUIZ: Đáp án & Giải thích

> Đáp án cho 20 câu trong `03-gate-quiz.md`. **Chỉ mở file này sau khi đã làm xong toàn bộ bài quiz.**
> Mọi đáp án đều được đối chiếu nguyên văn với dòng `Correct answer:` trong practice exam gốc (Exam 8, 9, 10).

## Bảng đáp án nhanh

1AE, 2B, 3D, 4D, 5BE, 6C, 7B, 8B, 9C, 10BC, 11CE, 12D, 13C, 14B, 15A, 16AC, 17B, 18C, 19D, 20C

---

## Giải thích từng câu

### Câu 1 — Đáp án: A, E

> Amazon EC2 instances are conceptually very similar to traditional servers. However, using Amazon EC2 server instances in the same manner as traditional hardware server instances is only a starting point. What are the main benefits of using the AWS EC2 instances instead of traditional servers? (Choose TWO)  `(Exam 8 - Q8)`

EC2 giúp **tăng fault tolerance** (dễ phân bổ instance qua nhiều AZ, dễ thay thế instance lỗi) và **scale được thủ công trong thời gian ngắn hơn nhiều** so với việc mua và rack server vật lý. C sai vì ngăn truy cập trái phép là việc của Security Group/IAM chứ không phải bản chất EC2; D sai vì EC2 **không** tự backup dữ liệu — bạn phải tự tạo EBS snapshot.

### Câu 2 — Đáp án: B

> How can you increase your application’s fault-tolerance while it is being hosted in AWS?  `(Exam 8 - Q22)`

Cách tăng fault tolerance là **deploy trên nhiều Availability Zone**, vì AZ có điện/cooling/network độc lập. A là bẫy: nhiều instance nhưng nằm chung một AZ thì AZ sự cố là mất hết; C ngược hẳn (một instance to = một SPOF); D sai vì subnet nằm trong AZ nên nhiều subnet cùng AZ không thêm độ dự phòng.

### Câu 3 — Đáp án: D

> Which of the following is a benefit of the "Loose Coupling" architecture principle?  `(Exam 8 - Q25)`

Lợi ích của Loose Coupling là **sửa/nâng cấp một component mà không ảnh hưởng các component khác**. A sai vì bạn vẫn cần change management; B (Cross-Region Replication) là feature của S3, không liên quan; C nói về quyền truy cập, cũng không liên quan tới coupling.

### Câu 4 — Đáp án: D

> Which of the following Cloud Computing deployment models eliminates the need to run and maintain physical data centers?  `(Exam 8 - Q27)`

Deployment model **Cloud** (public cloud) loại bỏ hoàn toàn nhu cầu vận hành & bảo trì data center vật lý. Bẫy nằm ở B và C: IaaS/PaaS là **service model**, không phải **deployment model** — câu hỏi hỏi đúng thuật ngữ 'deployment model'; A (on-premises) thì ngược lại.

### Câu 5 — Đáp án: B, E

> The elasticity of the AWS Cloud enables customers to save costs when compared to traditional hosting providers. What can AWS customers do to benefit from the elasticity of the AWS Cloud? (Choose TWO)  `(Exam 8 - Q35)`

Để hưởng lợi từ elasticity, hãy dùng **EC2 Auto Scaling** và **serverless computing** — cả hai đều tự khớp capacity với tải thực tế. A và C (deploy nhiều AZ/Region) là để tăng availability, không phải elasticity; D (ELB) chỉ phân phối traffic, bản thân nó không thêm/bớt capacity.

### Câu 6 — Đáp án: C

> Which pillar of the AWS Well-Architected Framework provides recommendations to help customers select the right compute resources based on workload requirements?  `(Exam 8 - Q41)`

Pillar đưa ra khuyến nghị **chọn đúng loại compute resource theo yêu cầu workload** là **Performance Efficiency**. Bẫy là A: Operational Excellence nói về vận hành và cải tiến process; Reliability nói về phục hồi sau lỗi.

### Câu 7 — Đáp án: B

> How many Availability Zones should compute resources be provisioned across to achieve high availability?  `(Exam 8 - Q46)`

High availability yêu cầu **tối thiểu hai AZ** — một AZ thì không có dự phòng. Đừng chọn 3 hay 4: AWS chỉ đặt yêu cầu tối thiểu là 2 (nhiều hơn thì tốt hơn nhưng không phải mức tối thiểu).

### Câu 8 — Đáp án: B

> The AWS Cloud’s multiple Regions are an example of:  `(Exam 8 - Q47)`

Việc AWS có **nhiều Region** là ví dụ của **Global infrastructure**. Bẫy là C (elasticity — nói về tự thêm/bớt tài nguyên) và A (agility — nói về tốc độ provision); cả hai đều không phải khái niệm mô tả *sự tồn tại của nhiều Region*.

### Câu 9 — Đáp án: C

> Which is a recommended pattern for designing a highly available architecture on AWS?  `(Exam 8 - Q49)`

Pattern chuẩn cho HA là **thiết kế để ứng dụng chịu được lỗi của bất kỳ một component đơn lẻ nào** (design for failure). B sai vì chạy đủ instance cho peak load là over-provisioning, không giúp HA khi có lỗi; D (monolithic) đi ngược best practice.

### Câu 10 — Đáp án: B, C

> Which of the following are pillars of the AWS Well-Architected Framework? (Select TWO)  `(Exam 9 - Q12)`

**Performance efficiency** và **Security** là 2 trong 6 pillar. A (Multiple Availability Zones), D (Encryption usage) và E (High availability) là *kỹ thuật/thuộc tính* được dùng bên trong các pillar, chứ bản thân không phải tên pillar — đây là bẫy phổ biến nhất của dạng câu này.

### Câu 11 — Đáp án: C, E

> Which design principles for cloud architecture are recommended when re-architecting a large monolithic application? (Select TWO)  `(Exam 9 - Q14)`

Khi re-architect một monolith lớn, hãy **implement loose coupling** và **design for scalability**. B (fixed servers) và D (rely on individual components) đi ngược nguyên tắc disposable resources và loose coupling; A (manual monitoring) đi ngược nguyên tắc automation.

### Câu 12 — Đáp án: D

> When architecting cloud applications, which of the following are a key design principle?  `(Exam 9 - Q15)`

Design principle then chốt khi thiết kế ứng dụng cloud là **implement elasticity**. B là bẫy lớn: provision capacity cho peak load chính là tư duy data center truyền thống ('stop guessing capacity' là nguyên tắc AWS); A cũng vậy; C là process phát triển, không phải design principle kiến trúc.

### Câu 13 — Đáp án: C

> Which AWS feature will reduce the customer’s total cost of ownership (TCO)?  `(Exam 9 - Q18)`

**Elastic computing** giảm TCO vì bạn chỉ trả cho capacity thực dùng và không phải mua hạ tầng cho peak. B (single tenancy) thực tế **tăng** chi phí (Dedicated Host/Instance đắt hơn); A và D là đặc tính security, không trực tiếp giảm TCO.

### Câu 14 — Đáp án: B

> Which of the following is a benefit of using the AWS Cloud?  `(Exam 9 - Q19)`

Lợi ích của AWS Cloud là **cho phép tập trung vào các hoạt động tạo doanh thu** thay vì vận hành hạ tầng. A sai vì AWS không hề khuyến khích security 'permissive' — least privilege mới là best practice; C và D sai vì khách hàng không kiểm soát hay chọn phần cứng/vendor của cloud.

### Câu 15 — Đáp án: A

> How do customers benefit from Amazon’s massive economies of scale?  `(Exam 9 - Q25)`

Economies of scale của Amazon thể hiện ở việc khách hàng được **giảm giá định kỳ** nhờ hiệu quả vận hành của AWS. C là bẫy — 'scale up/down khi cần' là **elasticity**, không phải economies of scale; B và D là lợi ích kỹ thuật, không phải lợi ích kinh tế theo quy mô.

### Câu 16 — Đáp án: A, C

> The financial benefits of using AWS are: (Select TWO)  `(Exam 9 - Q35)`

Lợi ích tài chính là **giảm TCO** và **giảm operational expenditure (OpEx)**. B là ngược (AWS *giảm* capex, không tăng); D và E (kế hoạch trả sau, hạn mức tín dụng cho startup) không phải mô hình của AWS.

### Câu 17 — Đáp án: B

> According to best practices, how should an application be designed to run in the AWS Cloud?  `(Exam 10 - Q15)`

Best practice là dùng **loosely coupled components** để lỗi không lan truyền và có thể nâng cấp độc lập từng phần. A (tightly coupled) là ngược; C và D chỉ là các từ vô nghĩa được dựng lên làm distractor.

### Câu 18 — Đáp án: C

> How does AWS shorten the time to provision IT resources?  `(Exam 10 - Q27)`

AWS rút ngắn thời gian provision vì bạn có thể **provision tài nguyên bằng chương trình (API/CLI/IaC)** thay vì chờ mua sắm phần cứng. A và D vẫn là quy trình ticket/mua sắm của mô hình truyền thống; B (code validation) không liên quan tới việc provision hạ tầng.

### Câu 19 — Đáp án: D

> What technology enables compute capacity to adjust as loads change?  `(Exam 10 - Q35)`

Công nghệ giúp compute capacity **tự điều chỉnh theo tải** là **Auto Scaling**. Bẫy là A: Load balancing chỉ *phân phối* traffic tới capacity đang có, nó không thêm hay bớt instance nào.

### Câu 20 — Đáp án: C

> Distributing workloads across multiple Availability Zones supports which cloud architecture design principle?  `(Exam 10 - Q49)`

Phân tán workload qua nhiều AZ là hiện thực hóa nguyên tắc **Design for failure** — giả định thành phần sẽ lỗi và chuẩn bị dự phòng. D (implement elasticity) là về việc thêm/bớt capacity theo demand, không phải về cách ly lỗi; B (design for agility) nói về tốc độ đổi mới.

---

## Hướng dẫn tự chấm điểm

Mỗi câu đúng = 1 điểm. Câu **(Chọn HAI)** chỉ được điểm khi chọn **đúng cả hai** đáp án.

| Số câu đúng | Kết luận | Việc cần làm |
|---|---|---|
| **≥ 16/20** | ✅ **PASS** — đủ điều kiện sang Phase 2 | Chuyển sang `phase-2-security/01-notes.md` |
| **12–15/20** | ⚠️ **Chưa đạt, nhưng gần** | Đọc lại đúng những mục trong `01-notes.md` tương ứng câu sai (xem bảng bên dưới), nghỉ 15 phút rồi **retake** bài quiz này |
| **< 12/20** | ❌ **Cần học lại** | Đọc lại **toàn bộ** `01-notes.md`, làm lại `02-practice-questions.md`, rồi mới retake gate quiz |

### Bản đồ câu sai → phần cần ôn trong `01-notes.md`

| Câu sai | Ôn lại mục |
|---|---|
| 1, 13, 14, 15, 16 | §5 Value Proposition · §8 Cloud Economics (CapEx/OpEx, TCO, economies of scale) |
| 2, 7, 9, 20 | §4 Global Infrastructure & High Availability · §7 Design for failure |
| 3, 11, 17 | §7 Design Principles — loose coupling / disposable resources |
| 4 | §2 Deployment Models (Cloud vs IaaS/PaaS — deployment model ≠ service model) |
| 5, 12, 19 | §5 Elasticity vs Scalability · §7 Automation (Auto Scaling) |
| 6, 10 | §6 Well-Architected 6 Pillars |
| 8, 18 | §4 Global Infrastructure · §5 Agility và provisioning bằng code |

### Chi tiết đối chiếu nguồn

| Câu | Nguồn | Câu | Nguồn |
|---|---|---|---|
| 1 | Exam 8 - Q8 | 11 | Exam 9 - Q14 |
| 2 | Exam 8 - Q22 | 12 | Exam 9 - Q15 |
| 3 | Exam 8 - Q25 | 13 | Exam 9 - Q18 |
| 4 | Exam 8 - Q27 | 14 | Exam 9 - Q19 |
| 5 | Exam 8 - Q35 | 15 | Exam 9 - Q25 |
| 6 | Exam 8 - Q41 | 16 | Exam 9 - Q35 |
| 7 | Exam 8 - Q46 | 17 | Exam 10 - Q15 |
| 8 | Exam 8 - Q47 | 18 | Exam 10 - Q27 |
| 9 | Exam 8 - Q49 | 19 | Exam 10 - Q35 |
| 10 | Exam 9 - Q12 | 20 | Exam 10 - Q49 |
