# Phase 2 — GATE QUIZ: Đáp án & Giải thích

> Đáp án cho 25 câu trong `03-gate-quiz.md`. **Chỉ mở file này sau khi đã làm xong toàn bộ bài quiz.**
> Mọi đáp án đều được đối chiếu nguyên văn với dòng `Correct answer:` trong practice exam gốc (Exam 2, 3, 7, 8, 9, 10).

## Bảng đáp án nhanh

1D, 2C, 3BE, 4D, 5CE, 6C, 7C, 8DE, 9AE, 10B, 11A, 12C, 13A, 14C, 15CD, 16D, 17B, 18D, 19B, 20C, 21A, 22BD, 23B, 24B, 25B

---

## Giải thích từng câu

### Câu 1 — Đáp án: D

> What is the AWS feature that provides an additional level of security above the default authentication mechanism of usernames and passwords?  `(Exam 2 - Q8)`

**AWS MFA** bổ sung một lớp bảo mật lên trên cơ chế xác thực mặc định là username + password. C là bẫy: KMS quản **encryption key** cho dữ liệu, hoàn toàn không liên quan tới việc xác thực người dùng; A và B cũng không phải feature xác thực của AWS.

### Câu 2 — Đáp án: C

> According to the AWS Acceptable Use Policy, which of the following statements is true regarding penetration testing of EC2 instances?  `(Exam 2 - Q12)`

Theo AWS Acceptable Use Policy, khách hàng **được tự thực hiện pen test trên instance của mình mà không cần xin phép trước** (với 8 nhóm service được phê duyệt). A sai vì pen test được cho phép; B sai vì AWS không tự pen test hộ bạn; D ngược hoàn toàn — bạn test tài nguyên *của mình*, không test service do AWS quản lý.

### Câu 3 — Đáp án: B, E

> According to the AWS Shared responsibility model, which of the following are the responsibility of the customer? (Choose TWO)  `(Exam 2 - Q16)`

Trách nhiệm khách hàng: **bảo vệ tính bảo mật của data in transit trong S3** (bật TLS/encryption) và **patch application cài trên EC2**. A, C, D đều thuộc AWS: environmental control của data center, physical access tới Region, và cấu hình EC2 **host** bên dưới.

### Câu 4 — Đáp án: D

> Which of the following services can help protect your web applications from SQL injection and other vulnerabilities in your application code?  `(Exam 2 - Q27)`

**AWS WAF** bảo vệ web application khỏi **SQL injection, XSS** và các lỗ hổng khác trong code ứng dụng (layer 7). A (Cognito) là identity, B (IAM) là quyền truy cập, C (Aurora) là database — không cái nào filter HTTP request độc hại.

### Câu 5 — Đáp án: C, E

> Based on the AWS Shared Responsibility Model, which of the following are the sole responsibility of AWS? (Choose TWO)  `(Exam 2 - Q29)`

Thuộc **riêng AWS**: **tạo hypervisor** và **bảo trì hardware**. A (monitor network performance) và D (cấu hình ACL) là việc của bạn; B (cài software trên EC2) chắc chắn là của bạn.

### Câu 6 — Đáp án: C

> Which of the following AWS security features is associated with an EC2 instance and functions to filter incoming traffic requests?  `(Exam 2 - Q44)`

**Security Groups** gắn với EC2 instance và **lọc traffic đến (incoming)**. Bẫy là B: Network ACL hoạt động ở mức **subnet**, không phải gắn với instance; A (X-Ray) là tracing, D (VPC Flow Logs) chỉ *ghi log* traffic chứ không lọc.

### Câu 7 — Đáp án: C

> What is the AWS service that performs automated network assessments of Amazon EC2 instances to check for vulnerabilities?  `(Exam 3 - Q16)`

**Amazon Inspector** thực hiện **automated network assessment** trên EC2 instance để tìm vulnerability (network reachability + CVE của package). B (Security groups) và D (NACL) là công cụ *kiểm soát* traffic, không đánh giá lỗ hổng; A (Kinesis) là streaming.

### Câu 8 — Đáp án: D, E

> Under the Shared Responsibility Model, which of the following controls do customers fully inherit from AWS? (Choose TWO)  `(Exam 3 - Q17)`

Control khách hàng **thừa hưởng hoàn toàn** từ AWS là **Environmental controls** và **Physical controls** — bạn không làm gì cả, AWS lo trọn. Bẫy là A và C: **Patch management và Awareness & Training là SHARED controls**, không phải inherited.

### Câu 9 — Đáp án: A, E

> Which of the following is used to control network traffic in AWS? (Choose TWO)  `(Exam 3 - Q38)`

Kiểm soát network traffic trong AWS bằng **NACLs** (mức subnet, stateless) và **Security Groups** (mức instance, stateful). B (Key Pairs) dùng để SSH, C (Access Keys) cho CLI/SDK, D (IAM Policies) kiểm soát quyền **API** — không cái nào lọc packet mạng.

### Câu 10 — Đáp án: B

> Data security is one of the top priorities of AWS. How does AWS deal with old storage devices that have reached the end of their useful life?  `(Exam 3 - Q50)`

AWS **hủy thiết bị lưu trữ hết đời theo industry-standard practices** (ví dụ NIST 800-88) trước khi nó rời khỏi quyền kiểm soát của AWS. A và C sai vì AWS không bao giờ để thiết bị chứa dữ liệu khách hàng ra ngoài; D chưa đủ — chỉ lưu ở nơi an toàn không phải quy trình xử lý cuối đời.

### Câu 11 — Đáp án: A

> Which of the following services gives you access to all AWS auditor-issued reports and certifications?  `(Exam 7 - Q8)`

**AWS Artifact** cho bạn truy cập **toàn bộ report và certification do auditor phát hành** (SOC, PCI, ISO). B (Config) audit cấu hình *của bạn*, C (CloudWatch) là monitoring, D (CloudTrail) là API log — không cái nào cung cấp chứng chỉ compliance của AWS.

### Câu 12 — Đáp án: C

> Which of the following services enables you to easily generate and use your own encryption keys in the AWS Cloud?  `(Exam 7 - Q27)`

**AWS CloudHSM** cho phép bạn **tự sinh và tự quản encryption key của chính mình** trên thiết bị HSM riêng biệt (FIPS 140-2 Level 3). Bẫy quan trọng: nếu đề nói 'AWS quản key cho bạn' thì là **KMS**, còn 'your own keys' + hardware thì là **CloudHSM**; B (ACM) chỉ quản SSL/TLS cert.

### Câu 13 — Đáp án: A

> Which of the following is the responsibility of AWS according to the AWS Shared Responsibility Model?  `(Exam 7 - Q34)`

**Securing Regions và Edge Locations** là trách nhiệm AWS (security *of* the cloud — hạ tầng vật lý và network toàn cầu). B, C, D (thực hiện audit, monitor mức dùng tài nguyên, bảo mật quyền truy cập tài nguyên) đều là việc khách hàng phải tự làm.

### Câu 14 — Đáp án: C

> Who is responsible for scaling a DynamoDB database in the AWS Shared Responsibility Model?  `(Exam 7 - Q38)`

**AWS** chịu trách nhiệm scaling DynamoDB — đây là fully managed service, bạn không quản capacity của hạ tầng bên dưới. Đây là ví dụ điển hình cho việc trách nhiệm **dịch chuyển về phía AWS** khi bạn dùng managed service thay vì EC2.

### Câu 15 — Đáp án: C, D

> According to the AWS shared responsibility model, what are the controls that customers fully inherit from AWS? (Choose TWO)  `(Exam 7 - Q46)`

Control thừa hưởng hoàn toàn từ AWS: **Data center security controls** và **Environmental controls**. A (Awareness and Training) và E (Resource Configuration Management) là **shared controls**; B (communications controls) cũng là shared, không phải inherited.

### Câu 16 — Đáp án: D

> You have been tasked with auditing the security of your VPC. As part of this process, you need to start by analyzing what inbound and outbound traffic is allowed on your EC2 instances. What two parts of the VPC do you need to check to accomplish this task?  `(Exam 8 - Q4)`

Để audit toàn bộ traffic inbound và outbound của EC2 phải kiểm tra **cả Security Groups (mức instance, stateful) và Network ACLs (mức subnet, stateless)** — thiếu một trong hai là bỏ sót rule. B, C sai vì Subnet và Internet Gateway không chứa rule filter traffic; A có 'Traffic Manager' là service không tồn tại trên AWS.

### Câu 17 — Đáp án: B

> What does Amazon GuardDuty do to protect AWS accounts and workloads?  `(Exam 8 - Q17)`

**GuardDuty liên tục monitor hạ tầng AWS và phát hiện threat** như attacker reconnaissance hay account compromise, dựa trên CloudTrail Events, VPC Flow Logs và DNS Logs. A là AWS Abuse; C là **Detective** (điều tra root cause); D là **Trusted Advisor** (kiểm tra security group mở).

### Câu 18 — Đáp án: D

> Which of the following AWS services integrates with AWS Shield and AWS Web Application Firewall (AWS WAF) to protect against network and application layer DDoS attacks?  `(Exam 8 - Q31)`

**Amazon CloudFront** tích hợp với **Shield** và **WAF** để chống DDoS ở cả network layer và application layer, nhờ vị trí ở edge hấp thụ tấn công trước khi tới origin. A (EFS), B (Secrets Manager), C (Systems Manager) không phải service edge/CDN.

### Câu 19 — Đáp án: B

> Which of the following services is used when encrypting EBS volumes?  `(Exam 8 - Q32)`

Encrypt EBS volume dùng **AWS KMS** để quản key mã hóa. A (WAF) là firewall layer 7, C (Macie) phát hiện dữ liệu sensitive trong S3, D (GuardDuty) phát hiện threat — không cái nào cung cấp encryption key.

### Câu 20 — Đáp án: C

> Which of the following security-related actions are available at no cost?  `(Exam 9 - Q9)`

Miễn phí với mọi người: **truy cập forums, blogs và whitepapers** về bảo mật. A (gọi AWS Support) yêu cầu support plan có phí; B (workshop của Professional Services) và D (lớp học tại trường) đều có chi phí.

### Câu 21 — Đáp án: A

> Which AWS service identifies security groups that allow unrestricted access to a user’s AWS resources?  `(Exam 9 - Q13)`

**AWS Trusted Advisor** kiểm tra và cảnh báo các **security group cho phép unrestricted access** (ví dụ port mở với 0.0.0.0/0). Bẫy rất mạnh là B: Inspector quét lỗ hổng OS/package và network reachability *của instance*, còn việc soát rule quá thoáng của security group là check kinh điển của Trusted Advisor.

### Câu 22 — Đáp án: B, D

> Under the AWS shared responsibility model, which of the following activities are the customer’s responsibility? (Select TWO)  `(Exam 9 - Q22)`

Trách nhiệm khách hàng: **encrypt data ở client-side** và **cấu hình Network ACL**. A là bẫy — patch OS component **của RDS** là việc của **AWS** (managed service); C và E (đào tạo nhân sự data center, environmental control) là của AWS.

### Câu 23 — Đáp án: B

> Which service enables risk auditing by continuously monitoring and logging account activity, including user actions in the AWS Management Console and AWS SDKs?  `(Exam 9 - Q33)`

**CloudTrail** cho phép risk auditing bằng cách **liên tục monitor và log account activity**, gồm hành động của user trong Console và qua SDK. A (CloudWatch) là metric/log hiệu năng; C (Config) ghi *trạng thái cấu hình* chứ không ghi từng user action; D (Health) báo trạng thái service.

### Câu 24 — Đáp án: B

> Which security service automatically recognizes and classifies sensitive data or intellectual property on AWS?  `(Exam 10 - Q8)`

**Amazon Macie** tự động nhận diện và phân loại **dữ liệu sensitive hoặc tài sản trí tuệ** (PII) trong S3 bằng ML và pattern matching. A (GuardDuty) phát hiện threat từ log, C (Inspector) quét vulnerability EC2/ECR, D (Shield) chống DDoS.

### Câu 25 — Đáp án: B

> Which AWS service allows users to identify the changes made to a resource over time?  `(Exam 10 - Q14)`

**AWS Config** cho phép nhận biết **những thay đổi đã thực hiện trên một resource theo thời gian** (configuration history & timeline). A (Inspector) quét lỗ hổng, C (Service Catalog) quản danh mục sản phẩm được phê duyệt, D (IAM) quản quyền.

---

## Hướng dẫn tự chấm điểm

Mỗi câu đúng = 1 điểm. Câu **(Chọn HAI)** chỉ được điểm khi chọn **đúng cả hai** đáp án.

| Số câu đúng | Kết luận | Việc cần làm |
|---|---|---|
| **≥ 20/25** | ✅ **PASS** — đủ điều kiện sang Phase 3 | Chuyển sang `phase-3-technology/` |
| **15–19/25** | ⚠️ **Chưa đạt, nhưng gần** | Đọc lại đúng những mục trong `01-notes.md` tương ứng câu sai (xem bảng bên dưới), nghỉ 15 phút rồi **retake** bài quiz này |
| **< 15/25** | ❌ **Cần học lại** | Đọc lại **toàn bộ** `01-notes.md` (nhất là §1 Shared Responsibility và §3 phân biệt security services), làm lại `02-practice-questions.md`, rồi mới retake gate quiz |

> Domain 2 chiếm **30%** đề thi thật — nếu bạn sai nhiều ở nhóm Shared Responsibility Model thì đừng vội sang Phase 3, vì đây là nhóm câu xuất hiện dày nhất trong bài thi CLF-C02.

### Bản đồ câu sai → phần cần ôn trong `01-notes.md`

| Câu sai | Ôn lại mục |
|---|---|
| 3, 5, 8, 13, 14, 15, 22 | **§1 Shared Responsibility Model** (bảng AWS/Customer/Shared + trục EC2→RDS→Lambda) |
| 1 | §2.6 MFA |
| 2 | §5 Penetration Testing |
| 4, 18 | §3.1 Shield vs WAF · §3.4 chống DDoS |
| 6, 9, 16 | §3.4 Network Security (Security Group stateful vs NACL stateless) |
| 7, 17, 21, 24 | §3.1 Inspector vs GuardDuty vs Macie vs Trusted Advisor |
| 10, 20 | §4 Compliance — xử lý thiết bị hết đời & tài nguyên security miễn phí |
| 11 | §4 AWS Artifact |
| 12, 19 | §3.3 KMS vs CloudHSM vs ACM |
| 23, 25 | §3.2 CloudTrail vs CloudWatch vs AWS Config |

### Chi tiết đối chiếu nguồn

| Câu | Nguồn | Câu | Nguồn | Câu | Nguồn |
|---|---|---|---|---|---|
| 1 | Exam 2 - Q8 | 10 | Exam 3 - Q50 | 19 | Exam 8 - Q32 |
| 2 | Exam 2 - Q12 | 11 | Exam 7 - Q8 | 20 | Exam 9 - Q9 |
| 3 | Exam 2 - Q16 | 12 | Exam 7 - Q27 | 21 | Exam 9 - Q13 |
| 4 | Exam 2 - Q27 | 13 | Exam 7 - Q34 | 22 | Exam 9 - Q22 |
| 5 | Exam 2 - Q29 | 14 | Exam 7 - Q38 | 23 | Exam 9 - Q33 |
| 6 | Exam 2 - Q44 | 15 | Exam 7 - Q46 | 24 | Exam 10 - Q8 |
| 7 | Exam 3 - Q16 | 16 | Exam 8 - Q4 | 25 | Exam 10 - Q14 |
| 8 | Exam 3 - Q17 | 17 | Exam 8 - Q17 | | |
| 9 | Exam 3 - Q38 | 18 | Exam 8 - Q31 | | |
