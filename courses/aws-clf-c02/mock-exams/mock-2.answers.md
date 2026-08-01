# Mock Exam 2 — Đáp án & Phân tích

> Đáp án cho 50 câu trong `mock-exam-2.md`. **Chỉ mở sau khi đã làm xong toàn bộ đề.**
> Mọi đáp án đối chiếu nguyên văn với dòng `Correct answer` của Practice Exam 21.

## Bảng đáp án nhanh

1B, 2B, 3DE, 4B, 5B, 6B, 7BD, 8AC, 9C, 10D, 11C, 12B, 13C, 14B, 15D, 16C, 17D, 18D, 19B, 20A, 21C, 22A, 23AD, 24B, 25C, 26C, 27AC, 28AD, 29C, 30B, 31B, 32C, 33B, 34C, 35C, 36B, 37B, 38A, 39B, 40DE, 41C, 42C, 43C, 44A, 45B, 46B, 47B, 48AD, 49AC, 50D

**Cần đúng ≥ 35/50 (70%)** để coi như sẵn sàng thi thật.

## Phân tích theo domain

Đánh dấu những câu bạn làm sai, rồi xem chúng dồn vào domain nào.

| Câu | Domain | Chủ đề |
|---|---|---|
| 1 | 3 | Database — DynamoDB |
| 2 | 3 | Global infrastructure — Regions |
| 3 | 4 | Organizations |
| 4 | 3 | Deployment — OpsWorks |
| 5 | 4 | Consolidated billing |
| 6 | 1 | Cloud economics — TCO Calculator |
| 7 | 3 | Networking — Direct Connect & VPN |
| 8 | 2 | Shared responsibility — phần của khách hàng |
| 9 | 4 | Support plans — Support API |
| 10 | 3 | Management — Systems Manager Patch Manager |
| 11 | 3 | High availability — multi-AZ (lưu ý đáp án gốc) |
| 12 | 3 | Global infrastructure — chọn Region |
| 13 | 4 | Pricing — On-Demand |
| 14 | 4 | Support — Health Dashboard |
| 15 | 3 | Storage — Storage Gateway |
| 16 | 2 | Network security — Security groups |
| 17 | 3 | Networking — Transit Gateway |
| 18 | 4 | Support plans — Enterprise |
| 19 | 2 | Governance — SCP |
| 20 | 2 | Compliance — AWS Artifact |
| 21 | 3 | Storage — S3 One Zone-IA |
| 22 | 3 | Global infrastructure — Availability Zone |
| 23 | 3 | Deployment automation |
| 24 | 3 | Deployment — CloudFormation |
| 25 | 2 | Encryption — KMS |
| 26 | 1 | Value proposition — Elasticity |
| 27 | 2 | IAM — programmatic access |
| 28 | 3 | Compute services |
| 29 | 4 | Cost allocation — multi-account |
| 30 | 4 | Consolidated billing — volume discount |
| 31 | 4 | Cost tools — AWS Budgets |
| 32 | 2 | Data protection — Macie |
| 33 | 4 | Trusted Advisor — service limits |
| 34 | 1 | Deployment model — Hybrid |
| 35 | 2 | IAM — least privilege |
| 36 | 2 | Governance — Control Tower |
| 37 | 3 | Networking — Transit Gateway |
| 38 | 2 | DDoS — Shield Advanced |
| 39 | 4 | Pricing — Spot Instances |
| 40 | 2 | Shared responsibility — dữ liệu |
| 41 | 4 | Pricing — Spot Instances |
| 42 | 3 | Containers — ECS |
| 43 | 2 | IAM roles |
| 44 | 4 | Support — Developer plan |
| 45 | 3 | Networking — Internet Gateway |
| 46 | 3 | Database HA — RDS Multi-AZ |
| 47 | 3 | Networking — Elastic Load Balancing |
| 48 | 4 | Trusted Advisor — các hạng mục |
| 49 | 2 | Root user — tác vụ độc quyền |
| 50 | 1 | Fault tolerance |

## Tổng hợp domain

| Domain | Số câu trong đề | Tỉ lệ đề thật | Nếu sai nhiều thì ôn lại |
|---|---|---|---|
| 1 — Cloud Concepts | 4 | 24% | `phases/1-cloud-concepts/notes.md` |
| 2 — Security & Compliance | 13 | 30% | `phases/2-security/notes.md` |
| 3 — Cloud Technology & Services | 19 | 34% | `phases/3-technology/notes.md` |
| 4 — Billing, Pricing & Support | 14 | 12% | `phases/4-billing/notes.md` |

> Domain nào bạn làm đúng dưới 70% thì đọc lại notes của phase tương ứng trước khi thi thật.
> Nếu tổng điểm dưới 70%, làm tiếp Practice Exam 22, 23 trong repo gốc.
>
> Lưu ý: tỉ lệ domain của đề luyện này không trùng khớp tỉ lệ đề thi thật (đề gốc vốn không được
> soạn theo đúng trọng số). Vì vậy hãy đọc kết quả theo **tỉ lệ đúng trong từng domain**, đừng suy
> ra điểm thi thật chỉ từ tổng số câu đúng.

## Giải thích từng câu

### Câu 1 — Đáp án: B

> A user needs to quickly deploy a non-relational database on AWS. The user does not want to manage the underlying hardware or the database software. <br/> Which AWS service can be used to accomplish this?  `(Exam 21 - Q1)`

Cần NoSQL mà **không phải quản lý hạ tầng hay phần mềm database** thì chọn **DynamoDB** (serverless, fully managed). RDS và Aurora là quan hệ; Redshift là data warehouse.

### Câu 2 — Đáp án: B

> A Cloud Practitioner is developing a disaster recovery plan and intends to replicate data between multiple geographic areas.<br/> Which of the following meets these requirements?  `(Exam 21 - Q2)`

Nhân bản dữ liệu giữa các **khu vực địa lý** khác nhau cho disaster recovery là dùng nhiều **AWS Regions**. Availability Zone nằm trong cùng một Region nên không chống được thảm họa cấp vùng; edge location chỉ để cache.

### Câu 3 — Đáp án: D, E

> Which features and benefits does the AWS Organizations service provide? (Choose two.)  `(Exam 21 - Q3)`

AWS Organizations cung cấp **consolidated billing** và **quản trị/kiểm soát các AWS account** (qua SCP). Nó không liên quan tới giao tiếp nội bộ, NoSQL, hay kiểm tra bảo mật tự động (đó là Trusted Advisor/Security Hub).

### Câu 4 — Đáp án: B

> Which AWS service is used to automate configuration management using Chef and Puppet?  `(Exam 21 - Q4)`

**OpsWorks** là dịch vụ quản lý cấu hình dùng **Chef và Puppet**. CloudFormation là infrastructure as code dạng template riêng của AWS; AWS Config theo dõi cấu hình; Systems Manager quản lý vận hành nhưng không chạy Chef/Puppet.

### Câu 5 — Đáp án: B

> Which tool is best suited for combining the billing of AWS accounts that were previously independent from one another?  `(Exam 21 - Q5)`

Gộp hóa đơn của các account trước đây độc lập là **consolidated billing** (tính năng của AWS Organizations). Ba phương án còn lại đều là báo cáo phân tích chi phí, không thực hiện việc gộp thanh toán.

### Câu 6 — Đáp án: B

> The AWS Total Cost of Ownership (TCO) Calculator is used to:  `(Exam 21 - Q6)`

**TCO Calculator** dùng để **ước tính mức tiết kiệm khi so sánh AWS với môi trường on-premises**. Ước tính hóa đơn tháng theo mức dùng dự kiến là việc của Pricing Calculator; báo cáo bóc tách chi phí là Cost Explorer/CUR.

### Câu 7 — Đáp án: B, D

> Which AWS services can be used to provide network connectivity between an on-premises network and a VPC? (Choose two.)  `(Exam 21 - Q7)`

Nối mạng on-premises với VPC dùng **Direct Connect** (đường riêng vật lý) hoặc **AWS VPN** (đường mã hóa qua Internet). Route 53 là DNS, Data Pipeline là ETL, Amazon Connect là contact center.

### Câu 8 — Đáp án: A, C

> Under the AWS shared responsibility model, which of the following are customer responsibilities? (Choose two.)  `(Exam 21 - Q8)`

Khách hàng **bật server-side encryption cho S3 bucket** và **cấu hình network/firewall** (security group, NACL). Vá RDS, an ninh vật lý data center và đảm bảo đủ compute capacity đều là việc của AWS.

### Câu 9 — Đáp án: C

> What is the MINIMUM AWS Support plan level that will provide users with access to the AWS Support API?  `(Exam 21 - Q9)`

Mức thấp nhất được dùng **AWS Support API** là **Business**. Developer chỉ hỗ trợ qua email trong giờ làm việc; Basic không có support case kỹ thuật; Enterprise có nhưng không phải mức *tối thiểu*.

### Câu 10 — Đáp án: D

> A company has deployed several relational databases on Amazon EC2 instances. Every month, the database software vendor releases new security patches that need to be applied to the databases. <br/> What is the MOST efficient way to apply the security patches?  `(Exam 21 - Q10)`

Cách hiệu quả nhất là **dùng Systems Manager để tự động vá theo lịch**. A là làm tay, không mở rộng được; B sai vì database chạy trên EC2 chứ không phải RDS nên console RDS không quản được; AWS Config chỉ phát hiện sai lệch chứ không vá.

### Câu 11 — Đáp án: C

> A company wants to use Amazon Elastic Compute Cloud (Amazon EC2) to deploy a global commercial application. The deployment solution should be built with the highest redundancy and fault tolerance. <br/> Based on this situation, the Amazon EC2 instances should be deployed:  `(Exam 21 - Q11)`

**Đáp án gốc là C — nhiều AZ trong một Region.** Cần lưu ý: nhiều đề khác (ví dụ Exam 1 câu 7) lại chọn *nhiều Region và nhiều AZ* cho mức availability **cao nhất**, và về logic thì phương án D ở đây dự phòng tốt hơn C. Nguyên tắc khi thi: nếu đề nhấn mạnh **highest availability / khắc phục thảm họa** và có phương án multi-Region thì chọn multi-Region; nếu đề chỉ hỏi cách chuẩn để có HA và fault tolerance thì **multi-AZ trong một Region** là câu trả lời quen thuộc của AWS.

### Câu 12 — Đáp án: B

> A company has an application with users in both Australia and Brazil. All the company infrastructure is currently provisioned in the Asia Pacific (Sydney) Region in Australia, and Brazilian users are experiencing high latency. <br/> What should the company do to reduce latency?  `(Exam 21 - Q12)`

User ở Brazil bị latency cao thì **triển khai tài nguyên tại Region São Paulo**. Direct Connect chỉ giúp mạng doanh nghiệp, không giúp người dùng cuối; Transit Gateway là kết nối nội bộ; thêm instance ở Sydney không rút ngắn khoảng cách địa lý.

### Câu 13 — Đáp án: C

> An Amazon EC2 instance runs only when needed yet must remain active for the duration of the process. <br/> What is the most appropriate purchasing option?  `(Exam 21 - Q13)`

Chạy khi cần nhưng **không được gián đoạn giữa tiến trình** thì dùng **On-Demand**: trả theo mức dùng, không cam kết, không bị thu hồi. Spot có thể bị terminate; Reserved đòi cam kết dài hạn nên không hợp với workload chạy thưa; Dedicated Instances chỉ nói về cách ly phần cứng.

### Câu 14 — Đáp án: B

> Which AWS dashboard displays relevant and timely information to help users manage events in progress, and provides proactive notifications to help plan for scheduled activities?  `(Exam 21 - Q14)`

**AWS Personal Health Dashboard** (nay là AWS Health Dashboard - Your account health) hiển thị sự cố **ảnh hưởng trực tiếp tới tài nguyên của bạn** và thông báo chủ động về bảo trì đã lên lịch. Service Health Dashboard chỉ hiện trạng thái chung của toàn dịch vụ, không cá nhân hóa.

### Câu 15 — Đáp án: D

> Which AWS hybrid storage service enables a user's on-premises applications to seamlessly use AWS Cloud storage?  `(Exam 21 - Q15)`

**Storage Gateway** là dịch vụ storage **hybrid**, cho ứng dụng on-premises dùng storage trên AWS một cách trong suốt. AWS Backup quản lý backup tập trung; Direct Connect là kết nối mạng; Amazon Connect là contact center.

### Câu 16 — Đáp án: C

> Which of the following acts as a virtual firewall at the Amazon EC2 instance level to control traffic for one or more instances?  `(Exam 21 - Q16)`

**Security group** hoạt động như tường lửa ảo **ở cấp instance**. NACL là tường lửa ở cấp subnet; access key là credential; virtual private gateway là đầu cuối VPN phía AWS.

### Câu 17 — Đáp án: D

> What is the most efficient way to establish network connectivity from on-premises to multiple VPCs in different AWS Regions?  `(Exam 21 - Q17)`

Nối on-premises tới **nhiều VPC ở nhiều Region** hiệu quả nhất là **Transit Gateway** — một hub thay cho hàng loạt kết nối điểm-điểm. Direct Connect và VPN là đường truyền, vẫn cần hub để mở rộng; Client VPN dành cho từng người dùng cá nhân.

### Câu 18 — Đáp án: D

> Which AWS Support plan provides access to architectural and operational reviews, as well as 24/7 access to Senior Cloud Support Engineers through email, online chat, and phone?  `(Exam 21 - Q18)`

**Enterprise** có architectural/operational review và truy cập 24/7 tới **Senior** Cloud Support Engineer qua email, chat và điện thoại, kèm TAM và Concierge. Business có 24/7 nhưng không có review chuyên sâu và không có TAM.

### Câu 19 — Đáp án: B

> Which AWS service or feature helps restrict the AWS services, resources, and individual API actions the users and roles in each member account can access?  `(Exam 21 - Q19)`

Giới hạn service, resource và **từng API action** mà user/role trong member account được dùng là **Service Control Policy của AWS Organizations**. Cognito quản lý danh tính người dùng ứng dụng; Shield chống DDoS; Firewall Manager quản lý rule tường lửa.

### Câu 20 — Đáp án: A

> What is the best resource for a user to find compliance-related information and reports about AWS?  `(Exam 21 - Q20)`

Nguồn tài liệu và báo cáo compliance về AWS là **AWS Artifact**. Marketplace bán phần mềm; Inspector quét lỗ hổng trên workload của bạn; Support là kênh hỗ trợ.

### Câu 21 — Đáp án: C

> Which Amazon S3 storage class is optimized to provide access to data with lower resiliency requirements, but rapid access when needed such as duplicate backups?  `(Exam 21 - Q21)`

Dữ liệu **cần lấy nhanh nhưng chấp nhận độ bền thấp hơn** (ví dụ bản backup thứ hai) thì dùng **S3 One Zone-IA** — chỉ lưu trong một AZ nên rẻ hơn. Glacier và Deep Archive rẻ hơn nữa nhưng lấy dữ liệu chậm; S3 Standard đắt hơn và lưu đa AZ.

### Câu 22 — Đáp án: A

> What is an Availability Zone in AWS?  `(Exam 21 - Q22)`

Một **Availability Zone** gồm **một hoặc nhiều data center vật lý** có điện, mạng và làm mát dự phòng. B là định nghĩa của Region; C nói về edge location; D sai vì AZ luôn có nguồn điện và mạng dự phòng, không phải một nguồn duy nhất.

### Câu 23 — Đáp án: A, D

> Which AWS services can be used as infrastructure automation tools? (Choose two.)  `(Exam 21 - Q23)`

Hai công cụ tự động hóa hạ tầng là **CloudFormation** (infrastructure as code) và **OpsWorks** (quản lý cấu hình bằng Chef/Puppet). CloudFront là CDN, Batch chạy batch job, QuickSight là BI.

### Câu 24 — Đáp án: B

> Which AWS service enables users to create copies of resources across AWS Regions?  `(Exam 21 - Q24)`

**CloudFormation** cho phép dùng lại cùng một template để tạo bản sao hạ tầng ở nhiều Region. ElastiCache là cache, CloudTrail ghi log, Systems Manager quản lý vận hành.

### Câu 25 — Đáp án: C

> A user would like to encrypt data that is received, stored, and managed by AWS CloudTrail. <br/> Which AWS service will provide this capability?  `(Exam 21 - Q25)`

Mã hóa dữ liệu do CloudTrail ghi nhận và lưu trữ dùng **KMS** (quản lý khóa mã hóa, tích hợp sẵn với CloudTrail và S3). Secrets Manager lưu credential ứng dụng; ACM quản lý certificate TLS; Systems Manager không phải dịch vụ mã hóa.

### Câu 26 — Đáp án: C

> Which AWS Cloud benefit eliminates the need for users to try estimating future infrastructure usage?  `(Exam 21 - Q26)`

Lợi ích khiến bạn **không cần đoán mức sử dụng hạ tầng trong tương lai** là **Elasticity** — cấp thêm hoặc bớt tài nguyên bất cứ lúc nào. Triển khai nhanh nhiều Region là global reach/agility; giá thấp nhờ quy mô là economies of scale.

### Câu 27 — Đáp án: A, C

> What credential components are required to gain programmatic access to an AWS account? (Choose two.)  `(Exam 21 - Q27)`

Truy cập bằng chương trình (CLI/SDK/API) cần **access key ID** và **secret access key**. "Primary key", "secondary key", "user ID" không phải thành phần credential của AWS — user name và password chỉ dùng cho Console.

### Câu 28 — Đáp án: A, D

> Which of the following are AWS compute services? (Select two.)  `(Exam 21 - Q28)`

**Lightsail** (VPS đơn giản hóa) và **Batch** (chạy batch computing) đều là dịch vụ compute. Systems Manager và CloudFormation thuộc nhóm management/deployment; Inspector là bảo mật.

### Câu 29 — Đáp án: C

> How can a company separate costs for network traffic, Amazon EC2, Amazon S3, and other AWS services by department?  `(Exam 21 - Q29)`

Tách chi phí theo phòng ban một cách rạch ròi nhất là **tạo AWS account riêng cho từng phòng ban** rồi gộp hóa đơn qua Organizations. Tag (phương án A) cũng phân bổ được chi phí nhưng đòi kỷ luật gắn tag đầy đủ và không tách được mọi loại phí như network traffic; VPC riêng không ảnh hưởng tới cách tính tiền.

### Câu 30 — Đáp án: B

> What is a benefit of consolidated billing for AWS accounts?  `(Exam 21 - Q30)`

Lợi ích của consolidated billing là **gộp mức sử dụng để đạt bậc giảm giá theo khối lượng** (và chia sẻ RI/Savings Plans). Nó không cải thiện bảo mật, không tập trung IAM, và Health Dashboard không phụ thuộc vào việc gộp hóa đơn.

### Câu 31 — Đáp án: B

> Which AWS service will allow a user to set custom cost and usage limits, and will alert when the thresholds are exceeded?  `(Exam 21 - Q31)`

Đặt ngưỡng chi phí/mức dùng tùy ý và **cảnh báo khi vượt** là **AWS Budgets**. Cost Explorer để phân tích và dự báo nhưng không đặt ngưỡng cảnh báo; Trusted Advisor chỉ khuyến nghị; Organizations quản lý account.

### Câu 32 — Đáp án: C

> Which AWS service provides the ability to detect inadvertent data leaks of personally identifiable information (PII) and user credential data?  `(Exam 21 - Q32)`

**Macie** dùng machine learning phát hiện **PII và dữ liệu nhạy cảm** bị lộ trong S3. GuardDuty phát hiện hành vi đe dọa; Inspector quét lỗ hổng; Shield chống DDoS.

### Câu 33 — Đáp án: B

> Which tool can be used to monitor AWS service limits?  `(Exam 21 - Q33)`

**Trusted Advisor** có hạng mục kiểm tra **service limits** và cảnh báo khi bạn sắp chạm giới hạn. TCO Calculator so sánh chi phí; Personal Health Dashboard báo sự cố; Cost and Usage report là dữ liệu chi phí.

### Câu 34 — Đáp án: C

> A company has distributed its workload on both the AWS Cloud and some on-premises servers. <br/> What type of architecture is this?  `(Exam 21 - Q34)`

Workload chạy **vừa trên AWS vừa trên server on-premises** là kiến trúc **hybrid cloud**. VPN là công nghệ kết nối chứ không phải kiểu kiến trúc; VPC là mạng ảo trong AWS; private cloud là hạ tầng riêng hoàn toàn.

### Câu 35 — Đáp án: C

> Which of the following describes a security best practice that can be implemented using AWS IAM?  `(Exam 21 - Q35)`

Thực hành đúng là **chỉ cấp quyền vừa đủ cho công việc cụ thể** (least privilege). A quá cực đoan và không phải best practice; B sai vì không phải user nào cũng cần access key; D sai nghiêm trọng — không được nhúng credential vào EC2, phải dùng IAM role.

### Câu 36 — Đáp án: B

> What can be used to automate and manage secure, well-architected, multi-account AWS environments?  `(Exam 21 - Q36)`

**Control Tower** tự động dựng và quản lý môi trường **nhiều account** an toàn theo well-architected (landing zone, guardrail). Security Hub tổng hợp phát hiện bảo mật; Well-Architected Tool chỉ để tự đánh giá; shared responsibility model là mô hình khái niệm.

### Câu 37 — Đáp án: B

> Which AWS service or feature allows a user to easily scale connectivity among thousands of VPCs?  `(Exam 21 - Q37)`

Kết nối tới **hàng nghìn VPC** cần **Transit Gateway** vì VPC peering không có tính bắc cầu, số kết nối tăng theo bình phương nên không mở rộng được. Direct Connect là đường truyền tới on-premises; Global Accelerator tối ưu định tuyến người dùng.

### Câu 38 — Đáp án: A

> A company needs protection from expanded distributed denial of service (DDoS) attacks on its website and assistance from AWS experts during such events. <br/> Which AWS managed service will meet these requirements?  `(Exam 21 - Q38)`

Chống DDoS mở rộng **kèm hỗ trợ trực tiếp từ chuyên gia AWS (DDoS Response Team)** trong lúc bị tấn công là **Shield Advanced**. Shield Standard miễn phí nhưng không có DRT; WAF lọc request theo rule nhưng không phải dịch vụ chống DDoS chuyên biệt kèm chuyên gia; GuardDuty chỉ phát hiện.

### Câu 39 — Đáp án: B

> A company's application has flexible start and end times. <br/> Which Amazon EC2 pricing model will be the MOST cost-effective?  `(Exam 21 - Q39)`

Ứng dụng có **thời điểm bắt đầu và kết thúc linh hoạt** thì **Spot Instances** rẻ nhất (giảm tới 90%), đổi lại có thể bị thu hồi. On-Demand đắt hơn; Reserved đòi cam kết; Dedicated Hosts đắt nhất.

### Câu 40 — Đáp án: D, E

> Under the AWS shared responsibility model, what are the customer's responsibilities? (Choose two.)  `(Exam 21 - Q40)`

Khách hàng chịu trách nhiệm **bảo mật dữ liệu khi truyền (in transit)** và **xác thực tính toàn vẹn của dữ liệu**. An ninh vật lý, thiết bị mạng vật lý và việc thanh lý ổ đĩa đều thuộc AWS.

### Câu 41 — Đáp án: C

> A cloud practitioner has a data analysis workload that is infrequently executed and can be interrupted without harm. To optimize for cost, which Amazon EC2 purchasing option should be used?  `(Exam 21 - Q41)`

Workload **chạy thưa và bị ngắt cũng không sao** thì **Spot** tối ưu chi phí nhất. Đây là dấu hiệu nhận biết kinh điển của Spot: *interruptible*, *fault-tolerant*, *flexible start/end*.

### Câu 42 — Đáp án: C

> Which AWS container service will help a user install, operate, and scale the cluster management infrastructure?  `(Exam 21 - Q42)`

**ECS** giúp cài đặt, vận hành và scale hạ tầng quản lý cluster container. ECR chỉ là registry lưu image; Elastic Beanstalk là PaaS triển khai ứng dụng; EBS là block storage.

### Câu 43 — Đáp án: C

> Which of the following allows an application running on an Amazon EC2 instance to securely write data to an Amazon S3 bucket without using long term credentials?  `(Exam 21 - Q43)`

Ứng dụng trên EC2 ghi vào S3 mà **không dùng credential dài hạn** thì gắn **IAM role** vào instance — credential tạm thời được cấp và luân phiên tự động. Dùng access key của IAM user là chính xác điều cần tránh; Cognito dành cho danh tính người dùng ứng dụng.

### Câu 44 — Đáp án: A

> A company with a Developer-level AWS Support plan provisioned an Amazon RDS database and cannot connect to it. <br/> Who should the developer contact for this level of support?  `(Exam 21 - Q44)`

Với plan **Developer**, kênh hỗ trợ kỹ thuật là **mở support case với AWS Support**. TAM chỉ có ở Enterprise; Professional Services và consulting partner là dịch vụ tư vấn có phí riêng, không phải kênh hỗ trợ sự cố.

### Câu 45 — Đáp án: B

> What is the purpose of having an internet gateway within a VPC?  `(Exam 21 - Q45)`

**Internet gateway** cho phép **VPC giao tiếp với Internet**. Nó không tạo VPN, không giới hạn băng thông và không cân bằng tải (đó là việc của ELB).

### Câu 46 — Đáp án: B

> A company must ensure that its endpoint for a database instance remains the same after a single Availability Zone service interruption. The application needs to resume database operations without the need for manual administrative intervention. <br/> How can these requirements be met?  `(Exam 21 - Q46)`

Giữ **nguyên endpoint** và tự động phục hồi khi một AZ sự cố, không cần can thiệp thủ công, chính là **RDS Multi-AZ với automatic failover** — DNS của endpoint được trỏ sang standby. Các phương án còn lại đều ghép sai dịch vụ với mục đích.

### Câu 47 — Đáp án: B

> Which AWS managed service can be used to distribute traffic between one or more Amazon EC2 instances?  `(Exam 21 - Q47)`

Phân phối traffic tới một hoặc nhiều EC2 instance là **Elastic Load Balancing**. NAT gateway cho phép subnet riêng đi ra Internet; Athena truy vấn dữ liệu trên S3; PrivateLink kết nối riêng tới service.

### Câu 48 — Đáp án: A, D

> AWS Trusted Advisor provides recommendations on which of the following? (Choose two.)  `(Exam 21 - Q48)`

Trusted Advisor khuyến nghị theo 5 hạng mục: **cost optimization**, **performance**, security, fault tolerance và service limits. "Auditing" và "serverless architecture" không phải hạng mục của Trusted Advisor; scalability không phải tên hạng mục chính thức (fault tolerance mới là).

### Câu 49 — Đáp án: A, C

> Which of the following tasks can only be performed after signing in with AWS account root user credentials? (Choose two.)  `(Exam 21 - Q49)`

Chỉ root user làm được: **đóng AWS account** và **thay đổi AWS Support plan** (cùng với đổi tên account, khôi phục quyền IAM, đăng ký GovCloud). Tạo IAM policy, gắn role vào EC2 và tạo access key cho IAM user đều có thể ủy quyền cho IAM user có quyền phù hợp.

### Câu 50 — Đáp án: D

> Fault tolerance refers to:  `(Exam 21 - Q50)`

**Fault tolerance** là **khả năng dự phòng sẵn có trong các component** của ứng dụng, giúp hệ thống vẫn chạy khi một phần bị lỗi. A là scalability, B là khả năng phục hồi dữ liệu (durability/RTO), C là bảo mật.
