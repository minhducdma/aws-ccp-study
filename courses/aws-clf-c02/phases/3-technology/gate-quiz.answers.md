# Phase 3 — Gate Quiz: Đáp án & Giải thích

> Chỉ mở file này **sau khi** đã làm xong `03-gate-quiz.md` trong 45 phút.

## Bảng đáp án

| Câu | Đáp án | Câu | Đáp án | Câu | Đáp án | Câu | Đáp án | Câu | Đáp án |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **B** | 2 | **B, E** | 3 | **B** | 4 | **B, D** | 5 | **B** |
| 6 | **C** | 7 | **D** | 8 | **C, E** | 9 | **C** | 10 | **D** |
| 11 | **A** | 12 | **A** | 13 | **D** | 14 | **A** | 15 | **A, D** |
| 16 | **B** | 17 | **C** | 18 | **D** | 19 | **A** | 20 | **C** |
| 21 | **D** | 22 | **C** | 23 | **B** | 24 | **D** | 25 | **A** |
| 26 | **B** | 27 | **B** | 28 | **B** | 29 | **A, D** | 30 | **B** |

Dạng chuỗi để đối chiếu nhanh:

```
1B, 2BE, 3B, 4BD, 5B, 6C, 7D, 8CE, 9C, 10D, 11A, 12A, 13D, 14A, 15AD, 16B, 17C, 18D, 19A, 20C, 21D, 22C, 23B, 24D, 25A, 26B, 27B, 28B, 29AD, 30B
```

## Thang điểm

| Số câu đúng | Kết luận | Việc cần làm |
|---|---|---|
| **≥ 24/30** | ✅ **PASS** | Sang Phase 4 (Billing, Pricing & Support). Trước khi thi thật thì skim lại `04-service-cheatsheet.md`. |
| **20–23/30** | ⚠️ Gần đạt | Ôn lại đúng những phần đã sai (xem cột "Chủ đề" bên dưới), làm lại 10–15 câu tương ứng trong `02-practice-questions.md`, rồi **retake** Gate Quiz. |
| **< 20/30** | ❌ Chưa đạt | Đọc lại toàn bộ `01-notes.md` (đặc biệt các bảng so sánh và mục "Câu hỏi hay bẫy"), làm lại toàn bộ `02-practice-questions.md`, sau đó mới retake. |

Cách quy đổi nhanh sang mức độ sẵn sàng cho domain 3 của kỳ thi thật: 24/30 = 80%, tương đương an toàn so với ngưỡng pass 700/1000 (~70%) của CLF-C02.

## Giải thích từng câu

**1. Đáp án: B** *(Exam 19 - Q32)*

> Which element of the AWS global infrastructure consists of one or more discrete data centers, each with redundant power, networking, and connectivity, which are housed in separate facilities?

Availability Zone gồm một hoặc nhiều data center riêng biệt, mỗi cái có nguồn điện và mạng dự phòng, đặt trong các toà nhà tách biệt. Region là tập hợp nhiều AZ, còn Edge location chỉ dùng để cache nội dung.

**2. Đáp án: B, E** *(Exam 18 - Q30)*

> Which of the following describes the relationships among AWS Regions, Availability Zones, and edge locations? (Choose two.)

Thứ tự số lượng luôn là: Edge location > Availability Zone > Region. Edge location không phải là AZ (C), và số Region là nhỏ nhất.

**3. Đáp án: B** *(Exam 19 - Q4)*

> Which component of AWS global infrastructure does Amazon CloudFront use to ensure low-latency delivery?

CloudFront cache nội dung tại edge location để đảm bảo low latency. Bẫy thường gặp là chọn Region hoặc Availability Zone.

**4. Đáp án: B, D** *(Exam 23 - Q35)*

> A company is planning to launch an ecommerce site in a single AWS Region to a worldwide user base. Which AWS services will allow the company to reach users and provide low latency and high transfer speeds? (Choose two.)

App chỉ deploy ở một Region nhưng user toàn cầu: CloudFront cache static content ở edge, Global Accelerator route traffic qua AWS global network. Direct Connect (C) chỉ nối on-premises, ALB (A) chỉ cân bằng tải trong một Region.

**5. Đáp án: B** *(Exam 19 - Q50)*

> Amazon Route 53 enables users to:

Route 53 là DNS service và có thể đăng ký domain name. Cấp/quản lý SSL certificate (C) là ACM, còn kết nối chuyên dụng (D) là Direct Connect.

**6. Đáp án: C** *(Exam 16 - Q34)*

> Which Amazon Virtual Private Cloud (Amazon VPC) feature enables users to connect two VPCs together?

VPC peering nối trực tiếp hai VPC (cùng account hoặc khác account) miễn dải CIDR không trùng nhau. VPC endpoint (A) dùng để truy cập AWS service qua private network chứ không nối hai VPC.

**7. Đáp án: D** *(Exam 23 - Q5)*

> Which component must be attached to a VPC to enable inbound Internet access?

Internet Gateway gắn ở mức VPC và cho phép traffic internet đi vào lẫn đi ra. NAT gateway (A) chỉ cho phép outbound từ private subnet, không nhận inbound từ internet.

**8. Đáp án: C, E** *(Exam 22 - Q13)*

> Which components are required to build a successful site-to-site VPN connection on AWS? (Choose two.)

Site-to-Site VPN cần Customer Gateway ở phía on-premises và Virtual Private Gateway ở phía AWS. Internet gateway, NAT gateway và Transit gateway đều không phải thành phần bắt buộc của kết nối này.

**9. Đáp án: C** *(Exam 23 - Q48)*

> A pharmaceutical company operates its infrastructure in a single AWS Region. The company has thousands of VPCs in a various AWS accounts that it wants to interconnect. Which AWS service or feature should the company use to help simplify management and reduce operational costs?

Transit Gateway là hub routing trung tâm nối hàng nghìn VPC và mạng on-premises, giúp giảm chi phí vận hành. VPC peering (D) là quan hệ 1-1 và không transitive nên số kết nối sẽ bùng nổ.

**10. Đáp án: D** *(Exam 16 - Q12)*

> Which feature adds elasticity to Amazon EC2 instances to handle the changing demand for workloads?

EC2 Auto Scaling thêm và bớt instance theo nhu cầu — đó chính là elasticity. Application Load Balancer (C) phân phối traffic nhưng không thay đổi số lượng instance.

**11. Đáp án: A** *(Exam 16 - Q32)*

> Which Amazon EC2 pricing model is the MOST cost efficient for an uninterruptible workload that runs once a year for 24 hours?

Workload không được gián đoạn nhưng chỉ chạy 24 giờ mỗi năm một lần → On-Demand vì không cần cam kết. Reserved (B) phải trả cho cả năm, còn Spot (C) có thể bị thu hồi.

**12. Đáp án: A** *(Exam 22 - Q37)*

> What is a characteristic of Convertible Reserved Instances (RIs)?

Convertible RI đổi được sang Convertible RI khác, kể cả instance family khác, miễn giá trị bằng hoặc cao hơn. Không đổi được sang Region khác (B), và Convertible RI không bán được trên Marketplace (C) — chỉ Standard RI mới bán được.

**13. Đáp án: D** *(Exam 23 - Q27)*

> Which AWS service allows customers to purchase unused Amazon EC2 capacity at an often discounted rate?

Spot Instances là mua capacity EC2 chưa dùng với mức giảm giá sâu (tới 90%). Reserved (A) là cam kết dài hạn chứ không phải capacity dư.

**14. Đáp án: A** *(Exam 19 - Q38)*

> A user must meet compliance and software licensing requirements that state a workload must be hosted on a physical server. Which Amazon EC2 instance pricing option will meet these requirements?

Yêu cầu chạy trên physical server để thoả licensing → Dedicated Hosts, vì bạn thuê nguyên server và kiểm soát được vị trí instance. Dedicated Instances (B) cũng chạy trên hardware riêng nhưng không cho kiểm soát placement nên không dùng được license theo socket/core.

**15. Đáp án: A, D** *(Exam 22 - Q20)*

> Which of the following AWS services are serverless? (Choose two.)

Lambda và DynamoDB đều serverless — không cần provision server. Elasticsearch Service (B), Elastic Beanstalk (C) và Redshift (E) đều chạy trên instance mà bạn thấy và quản lý.

**16. Đáp án: B** *(Exam 16 - Q27)*

> Which type of AWS storage is ephemeral and is deleted when an instance is stopped or terminated?

EC2 instance store là ephemeral, dữ liệu mất khi instance stop hoặc terminate. EBS (A) là persistent, còn EFS (C) và S3 (D) hoàn toàn độc lập với instance.

**17. Đáp án: C** *(Exam 22 - Q41)*

> What does the Amazon S3 Intelligent-Tiering storage class offer?

S3 Intelligent-Tiering tự chuyển object giữa các access tier theo pattern truy cập để tiết kiệm chi phí. Lưu trữ archive rẻ nhất (D) là Glacier Deep Archive, không phải Intelligent-Tiering.

**18. Đáp án: D** *(Exam 18 - Q19)*

> A Cloud Practitioner needs to store data for 7 years to meet regulatory requirements. Which AWS service will meet this requirement at the LOWEST cost?

Lưu 7 năm cho mục đích compliance với rất ít truy cập → S3 Glacier có chi phí thấp nhất. S3 Standard (A) đắt hơn nhiều cho dữ liệu archive dài hạn.

**19. Đáp án: A** *(Exam 22 - Q26)*

> A company has a 500 TB image repository that needs to be transported to AWS for processing. Which AWS service can import this data MOST cost-effectively?

500 TB truyền qua network sẽ rất chậm và tốn phí, nên Snowball (thiết bị vật lý) là cách kinh tế nhất. Direct Connect (B) mất ít nhất một tháng để thiết lập và vẫn tính phí băng thông.

**20. Đáp án: C** *(Exam 16 - Q14)*

> Which AWS hybrid storage service enables on-premises applications to seamlessly use AWS Cloud storage through standard file-storage protocols?

Storage Gateway là hybrid storage cho ứng dụng on-premises dùng cloud storage qua các file-storage protocol chuẩn (NFS/SMB). Snowball và Snowball Edge (B, D) chỉ chuyển dữ liệu offline một lần.

**21. Đáp án: D** *(Exam 16 - Q33)*

> Which of the following services is a MySQL-compatible database that automatically grows storage as needed?

Aurora tương thích MySQL/PostgreSQL và storage tự động tăng dần tới 64 TB — đúng mô tả trong câu hỏi. RDS for MySQL (B) cũng tương thích MySQL nhưng đặc điểm nổi bật "tự grow storage" là của Aurora.

**22. Đáp án: C** *(Exam 23 - Q7)*

> A company has a MySQL database running on a single Amazon EC2 instance. The company now requires higher availability in the event of an outage. Which set of tasks would meet this requirement?

Migrate sang Amazon RDS và bật Multi-AZ sẽ tạo standby ở AZ khác và tự failover khi có outage. ALB (A) không giúp gì cho database, còn EC2 Auto Recovery (B) chỉ recover trong cùng một AZ.

**23. Đáp án: B** *(Exam 22 - Q42)*

> A company has multiple data sources across the organization and wants to consolidate data into one data warehouse. Which AWS service can be used to meet this requirement?

Redshift là data warehouse, hợp nhất dữ liệu từ nhiều nguồn để phân tích OLAP. Athena (C) query dữ liệu tại chỗ trên S3 chứ không phải kho dữ liệu tập trung, còn QuickSight (D) là công cụ BI visualization.

**24. Đáp án: D** *(Exam 23 - Q11)*

> A company is building an application that requires the ability to send, store, and receive messages between application components. The company has another requirement to process messages in first-in, first-out (FIFO) order. Which AWS service should the company use?

SQS là message queue để gửi, lưu và nhận message giữa các component, và SQS FIFO queue đảm bảo thứ tự first-in-first-out. SNS (B) là pub/sub không đảm bảo thứ tự tiêu thụ; Kinesis Data Streams (C) là streaming chứ không phải queue point-to-point.

**25. Đáp án: A** *(Exam 23 - Q33)*

> Which AWS service or feature is used to send both text and email messages from distributed applications?

SNS gửi notification tới nhiều loại subscriber, bao gồm cả SMS và email. SES (B) chỉ gửi email, còn SQS (D) là queue chứ không gửi thông báo tới người dùng cuối.

**26. Đáp án: B** *(Exam 17 - Q17)*

> A company wants to monitor the CPU usage of its Amazon EC2 resources. Which AWS service should the company use?

CloudWatch thu thập metric CPUUtilization của EC2. CloudTrail (A) chỉ ghi API call nên không có metric hiệu năng.

**27. Đáp án: B** *(Exam 22 - Q7)*

> A user needs to regularly audit and evaluate the setup of all AWS resources, identify non-compliant accounts, and be notified when a resource changes. Which AWS service can be used to meet these requirements?

AWS Config đánh giá cấu hình resource theo rule, phát hiện account không compliant và thông báo khi resource thay đổi. Trusted Advisor (A) chỉ đưa recommendation theo bộ check cố định, không phải audit cấu hình liên tục theo rule.

**28. Đáp án: B** *(Exam 23 - Q14)*

> A user has limited knowledge of AWS services, but wants to quickly deploy a scalable Node.js application in the AWS Cloud. Which service should be used to deploy the application?

Elastic Beanstalk deploy và scale ứng dụng Node.js nhanh nhất cho người ít kiến thức AWS. CloudFormation (A) đòi bạn tự viết template hạ tầng, còn EC2 (C) đòi tự cấu hình mọi thứ.

**29. Đáp án: A, D** *(Exam 17 - Q11)*

> Which services manage and automate application deployments on AWS? (Choose two.)

Elastic Beanstalk (PaaS) và CloudFormation (IaC) đều quản lý và tự động hoá việc deploy ứng dụng trên AWS. CodeCommit (B) chỉ lưu code, còn AWS Config (E) theo dõi cấu hình.

**30. Đáp án: B** *(Exam 17 - Q1)*

> What time-savings advantage is offered with the use of Amazon Rekognition?

Rekognition tự phát hiện object và label trong ảnh nên tiết kiệm thời gian gán nhãn thủ công. Nó không thêm watermark (A) cũng không resize ảnh (C).

## Bản đồ câu hỏi theo chủ đề

Dùng bảng này để biết cần ôn lại phần nào trong `01-notes.md`.

| Câu | Chủ đề | Mục cần ôn trong `01-notes.md` |
|---|---|---|
| 1 | Availability Zone | 1. Global Infrastructure |
| 2 | Region / AZ / Edge Location | 1. Global Infrastructure |
| 3 | CloudFront + Edge Location | 1. Global Infrastructure |
| 4 | CloudFront vs Global Accelerator | 1. Global Infrastructure |
| 5 | Route 53 | 1. Global Infrastructure |
| 6 | VPC Peering | 7. Networking & VPC |
| 7 | Internet Gateway | 7. Networking & VPC |
| 8 | Site-to-Site VPN | 7. Networking & VPC |
| 9 | Transit Gateway | 7. Networking & VPC |
| 10 | EC2 Auto Scaling | 3. ELB & Auto Scaling |
| 11 | EC2 purchasing options | 2. EC2 |
| 12 | Convertible Reserved Instance | 2. EC2 |
| 13 | Spot Instances | 2. EC2 |
| 14 | Dedicated Hosts | 2. EC2 |
| 15 | Serverless | 6. Compute khác |
| 16 | Instance Store | 4. Storage |
| 17 | S3 Intelligent-Tiering | 4. Storage |
| 18 | S3 Glacier | 4. Storage |
| 19 | Snow Family | 4. Storage |
| 20 | Storage Gateway | 4. Storage |
| 21 | Aurora | 5. Database |
| 22 | RDS Multi-AZ | 5. Database |
| 23 | Redshift | 5. Database |
| 24 | SQS (FIFO) | 9. Application Integration |
| 25 | SNS | 9. Application Integration |
| 26 | CloudWatch | 8. Monitoring |
| 27 | AWS Config | 8. Monitoring |
| 28 | Elastic Beanstalk | 10. Deployment & IaC |
| 29 | Beanstalk vs CloudFormation | 10. Deployment & IaC |
| 30 | Amazon Rekognition | 11. Machine Learning |
