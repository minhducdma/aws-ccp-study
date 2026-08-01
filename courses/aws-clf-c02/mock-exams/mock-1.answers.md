# Mock Exam 1 — Đáp án & Phân tích

> Đáp án cho 50 câu trong `mock-exam-1.md`. **Chỉ mở sau khi đã làm xong toàn bộ đề.**
> Mọi đáp án đối chiếu nguyên văn với dòng `Correct answer` của Practice Exam 20.

## Bảng đáp án nhanh

1C, 2A, 3B, 4C, 5C, 6A, 7AD, 8B, 9C, 10AC, 11A, 12C, 13AD, 14C, 15B, 16B, 17B, 18C, 19C, 20B, 21B, 22A, 23B, 24CE, 25B, 26AE, 27B, 28BC, 29D, 30C, 31A, 32A, 33B, 34B, 35AB, 36BD, 37D, 38B, 39A, 40C, 41BC, 42B, 43C, 44B, 45A, 46B, 47C, 48A, 49C, 50A

**Cần đúng ≥ 35/50 (70%)** để coi như sẵn sàng thi thật.

## Phân tích theo domain

Đánh dấu những câu bạn làm sai, rồi xem chúng dồn vào domain nào.

| Câu | Domain | Chủ đề |
|---|---|---|
| 1 | 2 | Threat detection — GuardDuty |
| 2 | 3 | AWS Marketplace |
| 3 | 3 | Database — DynamoDB |
| 4 | 4 | Billing alarm |
| 5 | 2 | Shared responsibility — hạ tầng vật lý |
| 6 | 3 | Content delivery — CloudFront |
| 7 | 2 | IAM best practices |
| 8 | 2 | Logging — VPC Flow Logs |
| 9 | 3 | Networking — Global Accelerator |
| 10 | 1 | Well-Architected — Reliability |
| 11 | 2 | Monitoring root user |
| 12 | 1 | Design principle — Loose coupling |
| 13 | 1 | Migration — Snowball & DMS |
| 14 | 1 | Design principle — Think parallel |
| 15 | 4 | Organizations — Consolidated billing |
| 16 | 1 | Value proposition — Elasticity |
| 17 | 3 | Compute — EC2 Auto Scaling |
| 18 | 3 | Networking — AWS VPN |
| 19 | 4 | Cost tools — Cost Explorer |
| 20 | 3 | Content delivery — CloudFront |
| 21 | 3 | Global infrastructure |
| 22 | 3 | Monitoring — CloudWatch |
| 23 | 3 | Networking — Elastic Load Balancing |
| 24 | 2 | Shared responsibility — phần của khách hàng |
| 25 | 1 | Design principle — Loose coupling |
| 26 | 2 | Network security — WAF & NACL |
| 27 | 3 | Storage — EFS |
| 28 | 2 | Shared responsibility — phần của AWS |
| 29 | 1 | Value proposition — Elasticity |
| 30 | 1 | Cloud economics — Economies of scale |
| 31 | 2 | S3 security — Block Public Access |
| 32 | 4 | Billing support |
| 33 | 4 | Pricing tools |
| 34 | 2 | Shared responsibility — RDS (đáp án gốc gây tranh cãi) |
| 35 | 3 | Auto Scaling coverage |
| 36 | 3 | Networking — Global Accelerator |
| 37 | 4 | Support — billing & account |
| 38 | 1 | Best practice — elasticity & agility |
| 39 | 1 | Cloud economics |
| 40 | 2 | Shared responsibility — EC2 vs RDS |
| 41 | 4 | Cost management tools |
| 42 | 2 | Shared responsibility — guest OS |
| 43 | 2 | IAM |
| 44 | 2 | Compliance — AWS Artifact |
| 45 | 3 | AI/ML — Amazon Polly |
| 46 | 1 | Design for failure |
| 47 | 2 | Security checks — Trusted Advisor |
| 48 | 4 | Pricing — Dedicated Hosts |
| 49 | 3 | Global infrastructure — Edge locations |
| 50 | 1 | Well-Architected — Security pillar |

## Tổng hợp domain

| Domain | Số câu trong đề | Tỉ lệ đề thật | Nếu sai nhiều thì ôn lại |
|---|---|---|---|
| 1 — Cloud Concepts | 12 | 24% | `phases/1-cloud-concepts/notes.md` |
| 2 — Security & Compliance | 15 | 30% | `phases/2-security/notes.md` |
| 3 — Cloud Technology & Services | 15 | 34% | `phases/3-technology/notes.md` |
| 4 — Billing, Pricing & Support | 8 | 12% | `phases/4-billing/notes.md` |

> Domain nào bạn làm đúng dưới 70% thì đọc lại notes của phase tương ứng trước khi thi thật.
> Nếu tổng điểm dưới 70%, làm tiếp Practice Exam 21, 22, 23 trong repo gốc.
>
> Lưu ý: tỉ lệ domain của đề luyện này không trùng khớp tỉ lệ đề thi thật (đề gốc vốn không được
> soạn theo đúng trọng số). Vì vậy hãy đọc kết quả theo **tỉ lệ đúng trong từng domain**, đừng suy
> ra điểm thi thật chỉ từ tổng số câu đúng.

## Giải thích từng câu

### Câu 1 — Đáp án: C

> Which AWS service helps identify malicious or unauthorized activities in AWS accounts and workloads?  `(Exam 20 - Q1)`

**GuardDuty** phát hiện hoạt động độc hại và bất thường bằng cách phân tích CloudTrail, VPC Flow Logs và DNS logs. Trusted Advisor chỉ đưa khuyến nghị cấu hình chứ không phát hiện tấn công; Inspector quét lỗ hổng trên workload; CloudWatch theo dõi metric chứ không phân tích hành vi đe dọa.

### Câu 2 — Đáp án: A

> A company wants to try a third-party ecommerce solution before deciding to use it long term. <br/> Which AWS service or tool will support this effort?  `(Exam 20 - Q2)`

**AWS Marketplace** là catalog phần mềm của nhà cung cấp thứ ba, cho phép dùng thử rồi trả tiền qua chính hóa đơn AWS. APN là mạng đối tác gồm các công ty tư vấn/công nghệ, không phải nơi mua software; Service Catalog dùng để tổ chức tự phát hành danh mục sản phẩm nội bộ đã được phê duyệt.

### Câu 3 — Đáp án: B

> Which AWS service is a managed NoSQL database?  `(Exam 20 - Q3)`

**DynamoDB** là NoSQL key-value được AWS quản lý hoàn toàn. Redshift là data warehouse, còn Aurora và RDS for MariaDB đều là quan hệ (SQL).

### Câu 4 — Đáp án: C

> Which AWS service should be used to create a billing alarm?  `(Exam 20 - Q4)`

Billing alarm được tạo trong **CloudWatch** (metric billing ở Region us-east-1), thường gắn với SNS để gửi thông báo. AWS Budgets cũng cảnh báo chi phí nhưng câu hỏi nói rõ là *alarm*; CloudTrail ghi lại API call; QuickSight là BI.

### Câu 5 — Đáp án: C

> A company is hosting a web application in a Docker container on Amazon EC2. <br/> AWS is responsible for which of the following tasks?  `(Exam 20 - Q5)`

Với Docker chạy trên EC2, AWS chỉ chịu trách nhiệm **bảo trì phần cứng trong data center** (security *of* the cloud). Scale ứng dụng, điều phối container và vá guest OS đều thuộc khách hàng vì đây là mô hình tự quản lý trên EC2.

### Câu 6 — Đáp án: A

> Users are reporting latency when connecting to a website with a global customer base. <br/> Which AWS service will improve the customer experience by reducing latency?  `(Exam 20 - Q6)`

**CloudFront** cache nội dung tại edge location gần người dùng nên giảm latency cho khách hàng toàn cầu. Direct Connect chỉ nối data center riêng vào AWS; EC2 Auto Scaling giải quyết tải chứ không giải quyết khoảng cách địa lý; Transit Gateway là kết nối mạng nội bộ.

### Câu 7 — Đáp án: A, D

> Which actions represent best practices for using AWS IAM? (Choose two.)  `(Exam 20 - Q7)`

Hai thực hành đúng là **đặt password policy mạnh** và **luân phiên access key định kỳ**. B sai vì tuyệt đối không chia sẻ credential; C sai vì access key dùng cho CLI/API chứ không dùng đăng nhập Console; E sai vì IAM role chính là cách được khuyến nghị để ủy quyền.

### Câu 8 — Đáp án: B

> Which AWS feature or service can be used to capture information about incoming and outgoing traffic in an AWS VPC infrastructure?  `(Exam 20 - Q8)`

**VPC Flow Logs** ghi lại thông tin traffic vào/ra của network interface trong VPC. AWS Config theo dõi thay đổi cấu hình resource; CloudTrail ghi API call chứ không ghi packet; Trusted Advisor chỉ khuyến nghị.

### Câu 9 — Đáp án: C

> A company wants to use an AWS service to monitor the health of application endpoints, with the ability to route traffic to healthy regional endpoints to improve application availability. <br/> Which service will support these requirements?  `(Exam 20 - Q9)`

**Global Accelerator** kiểm tra health của endpoint và định tuyến người dùng qua mạng backbone AWS tới regional endpoint còn khỏe, nên tăng availability. CloudFront tối ưu phân phối nội dung; Inspector quét lỗ hổng; CloudWatch chỉ giám sát chứ không định tuyến.

### Câu 10 — Đáp án: A, C

> According to the AWS Well-Architected Framework, what change management steps should be taken to achieve reliability in the AWS Cloud? (Choose two.)  `(Exam 20 - Q10)`

Change management cho Reliability dựa vào **AWS Config** (kiểm kê và theo dõi thay đổi resource) và **CloudTrail** (ghi API call thành log kiểm toán). B sai vì service limit không phải công cụ change management; D sai vì ACM quản lý certificate; E sai vì GuardDuty phát hiện đe dọa chứ không xác thực thay đổi cấu hình.

### Câu 11 — Đáp án: A

> Which service can be used to monitor and receive alerts for AWS account root user AWS Management Console sign-in events?  `(Exam 20 - Q11)`

**CloudWatch** (kết hợp CloudTrail đẩy log vào CloudWatch Logs) cho phép tạo metric filter và alarm khi root user đăng nhập Console. AWS Config chỉ theo dõi cấu hình; IAM quản lý quyền nhưng không gửi alert.

### Câu 12 — Đáp án: C

> Which design principle should be considered when architecting in the AWS Cloud?  `(Exam 20 - Q12)`

Nguyên tắc đúng là **thiết kế component loosely coupled**. A sai vì server phải được coi là *disposable*; B sai vì AWS khuyến nghị tích hợp *bất đồng bộ* qua SQS/SNS; D nghe hợp lý về bảo mật nhưng "least permissive" là thực hành bảo mật, không phải nguyên tắc kiến trúc mà câu hỏi nhắm tới.

### Câu 13 — Đáp án: A, D

> Which AWS services can be used to move data from on-premises data centers to AWS? (Choose two.)  `(Exam 20 - Q13)`

**Snowball** chuyển khối lượng dữ liệu lớn bằng thiết bị vật lý và **DMS** di chuyển database mà không làm gián đoạn nguồn. Lambda là compute, ElastiCache là cache, API Gateway là quản lý API — không phục vụ di chuyển dữ liệu từ on-premises.

### Câu 14 — Đáp án: C

> A batch workload takes 5 hours to finish on an Amazon EC2 instance. The amount of data to be processed doubles monthly and the processing time is proportional. <br/> What is the best cloud architecture to address this consistently growing demand?  `(Exam 20 - Q14)`

Khi khối lượng tăng gấp đôi mỗi tháng, cách bền vững là **chia việc ra nhiều EC2 instance và xử lý song song** (scale out). Nâng instance to hơn hay dùng bare metal là scale up — sẽ chạm giới hạn phần cứng và không theo được tăng trưởng liên tục.

### Câu 15 — Đáp án: B

> Each department within a company has its own independent AWS account and its own payment method. New company leadership wants to centralize departmental governance and consolidate payments. <br/> How can this be achieved using AWS services or features?  `(Exam 20 - Q15)`

Cách đúng là **tạo một account mới làm management account, bật AWS Organizations rồi mời các account hiện có tham gia** để vừa quản trị tập trung vừa gộp hóa đơn. C sai vì Organizations chỉ được cấu hình từ một management account chứ không phải bật ở mọi account; Cost Explorer chỉ phân tích chi phí, không gộp thanh toán.

### Câu 16 — Đáp án: B

> The ability to horizontally scale Amazon EC2 instances based on demand is an example of which concept in the AWS Cloud value proposition?  `(Exam 20 - Q16)`

Khả năng **scale ngang theo nhu cầu** chính là **Elasticity**. Economy of scale nói về việc AWS giảm giá nhờ quy mô; High availability nói về chịu lỗi; Agility nói về tốc độ triển khai ý tưởng mới.

### Câu 17 — Đáp án: B

> An ecommerce company anticipates a huge increase in web traffic for two very popular upcoming shopping holidays. <br/> Which AWS service or feature can be configured to dynamically adjust resources to meet this change in demand?  `(Exam 20 - Q17)`

**EC2 Auto Scaling** tự tăng/giảm số instance theo nhu cầu thực tế, đúng cho đợt cao điểm mua sắm. CloudTrail ghi log, AWS Config theo dõi cấu hình, còn Amazon Forecast là dịch vụ dự báo bằng machine learning chứ không cấp phát tài nguyên.

### Câu 18 — Đáp án: C

> Which AWS service enables users to securely connect to AWS resources over the public internet?  `(Exam 20 - Q18)`

**AWS VPN** tạo kết nối mã hóa tới AWS **qua Internet công cộng**. Direct Connect là đường truyền riêng vật lý (không qua Internet); VPC peering nối hai VPC với nhau; Pinpoint là dịch vụ marketing.

### Câu 19 — Đáp án: C

> Which tool is used to forecast AWS spending?  `(Exam 20 - Q19)`

**Cost Explorer** vừa xem chi phí quá khứ vừa **dự báo** chi tiêu tương lai. Trusted Advisor khuyến nghị tối ưu, Organizations quản lý account, Inspector quét bảo mật.

### Câu 20 — Đáp án: B

> A company is running an ecommerce application hosted in Europe. To decrease latency for users who access the website from other parts of the world, the company would like to cache frequently accessed static content closer to the users. <br/> Which AWS service will support these requirements?  `(Exam 20 - Q20)`

Cache nội dung tĩnh gần người dùng toàn cầu là việc của **CloudFront**. ElastiCache cache dữ liệu trong bộ nhớ nhưng chỉ trong một Region cho backend; EFS và EBS là storage chứ không phải CDN.

### Câu 21 — Đáp án: B

> Which of the following is a component of the AWS Global Infrastructure?  `(Exam 20 - Q21)`

**AWS Regions** là thành phần của global infrastructure (cùng với Availability Zones và edge locations). Alexa và Lightsail là dịch vụ, Organizations là công cụ quản trị account.

### Câu 22 — Đáp án: A

> Which AWS service will help users determine if an application running on an Amazon EC2 instance has sufficient CPU capacity?  `(Exam 20 - Q22)`

**CloudWatch** thu thập metric như CPUUtilization nên biết được instance có đủ CPU hay không. AWS Config theo dõi cấu hình; CloudTrail ghi API call; Inspector đánh giá lỗ hổng bảo mật.

### Câu 23 — Đáp án: B

> Why is it beneficial to use Elastic Load Balancers with applications?  `(Exam 20 - Q23)`

Lợi ích của ELB là **xử lý được traffic biến động liên tục** và phân phối tới các target còn khỏe. C là mô tả của Auto Scaling chứ không phải load balancer; ELB có phí nên D sai; A vô nghĩa về mặt kỹ thuật.

### Câu 24 — Đáp án: C, E

> Which tasks are the customer's responsibility in the AWS shared responsibility model? (Choose two.)  `(Exam 20 - Q24)`

Khách hàng chịu trách nhiệm **cấu hình ứng dụng của mình** và **cấu hình security group**. Quản lý truy cập vật lý vào facility, vòng đời phần cứng và bảo vệ hạ tầng mạng nền đều là việc của AWS.

### Câu 25 — Đáp án: B

> IT systems should be designed to reduce interdependencies, so that a change or failure in one component does not cascade to other components. <br/> This is an example of which principle of cloud architecture design?  `(Exam 20 - Q25)`

Giảm phụ thuộc lẫn nhau để lỗi không lan sang component khác chính là **Loose coupling**. Scalability nói về khả năng mở rộng, Automation nói về tự động hóa, Automatic scaling là cơ chế cụ thể của elasticity.

### Câu 26 — Đáp án: A, E

> Which AWS service or feature can enhance network security by blocking requests from a particular network for a web application on AWS? (Choose two.)  `(Exam 20 - Q26)`

Chặn request từ một dải mạng cụ thể làm được bằng **AWS WAF** (rule theo IP ở tầng ứng dụng) và **Network ACL** (chặn ở tầng subnet). Trusted Advisor chỉ khuyến nghị; Direct Connect là kết nối mạng; Organizations là quản trị account.

### Câu 27 — Đáp án: B

> An application runs on multiple Amazon EC2 instances that access a shared file system simultaneously. <br/> Which AWS storage service should be used?  `(Exam 20 - Q27)`

Nhiều EC2 instance truy cập **cùng một file system đồng thời** thì dùng **EFS** (NFS chia sẻ được). EBS thường gắn vào một instance, S3 là object storage chứ không phải file system, Artifact là nơi tải tài liệu compliance.

### Câu 28 — Đáp án: B, C

> A web application is hosted on AWS using an Elastic Load Balancer, multiple Amazon EC2 instances, and Amazon RDS. <br/> Which security measures fall under the responsibility of AWS? (Choose two.)  `(Exam 20 - Q28)`

AWS lo **chống IP spoofing và packet sniffing** ở tầng hạ tầng, và **vá bảo mật cho RDS** vì RDS là managed service. Quét virus trên EC2, mã hóa traffic giữa EC2 và ELB, cấu hình security group/NACL đều thuộc khách hàng.

### Câu 29 — Đáp án: D

> What is the benefit of elasticity in the AWS Cloud?  `(Exam 20 - Q29)`

Lợi ích của elasticity là **tự điều chỉnh compute capacity để giữ hiệu năng ổn định**. A là việc của Route 53/CloudFront; B là lifecycle policy của S3; C không tồn tại — AWS không tự chọn dịch vụ thay bạn.

### Câu 30 — Đáp án: C

> The continual reduction of AWS Cloud pricing is due to:  `(Exam 20 - Q30)`

Việc AWS **liên tục giảm giá** đến từ **economies of scale**: càng nhiều khách hàng, chi phí hạ tầng trên mỗi đơn vị càng thấp và AWS chuyển phần tiết kiệm đó cho khách. Pay-as-you-go là cách tính tiền, không phải nguyên nhân giảm giá.

### Câu 31 — Đáp án: A

> A company needs an Amazon S3 bucket that cannot have any public objects due to compliance requirements. <br/> How can this be accomplished?  `(Exam 20 - Q31)`

Bật **S3 Block Public Access** là biện pháp kỹ thuật chặn mọi object công khai ở cấp bucket/account. Các phương án còn lại đều dựa vào quy trình con người hoặc dọn dẹp sau khi sự cố đã xảy ra — không đáp ứng yêu cầu compliance.

### Câu 32 — Đáp án: A

> A Cloud Practitioner identifies a billing issue after examining the AWS Cost and Usage report in the AWS Management Console. <br/> Which action can be taken to resolve this?  `(Exam 20 - Q32)`

Vấn đề hóa đơn thì **mở support case về billing gửi AWS Support** — kể cả plan Basic vẫn được hỗ trợ billing miễn phí. Các phương án khác không đưa vấn đề tới người có thể xử lý.

### Câu 33 — Đáp án: B

> What does the AWS Simple Monthly Calculator do?  `(Exam 20 - Q33)`

**Simple Monthly Calculator** (nay là AWS Pricing Calculator) **ước tính hóa đơn tháng dựa trên mức sử dụng dự kiến**. So sánh chi phí với on-premises là việc của TCO Calculator; hai phương án còn lại không phải chức năng của công cụ này.

### Câu 34 — Đáp án: B

> Who is responsible for patching the guest operating system for Amazon RDS?  `(Exam 20 - Q34)`

⚠️ **Đáp án của đề gốc là B (khách hàng)** nhưng theo tài liệu chính thức của AWS thì **RDS là managed service và AWS vá guest OS**, khách hàng chỉ chọn maintenance window và quyết định nâng phiên bản DB engine. Chính câu 28 và câu 40 trong cùng đề này lại khẳng định RDS do AWS vá — tức đề tự mâu thuẫn. **Khi thi thật, hãy trả lời theo AWS: guest OS của RDS là trách nhiệm của AWS; guest OS của EC2 là trách nhiệm của bạn.**

### Câu 35 — Đáp án: A, B

> Which AWS services may be scaled using AWS Auto Scaling? (Choose two.)  `(Exam 20 - Q35)`

AWS Auto Scaling áp dụng cho **EC2** và **DynamoDB** (cùng ECS, Aurora replica, Spot Fleet). S3 tự scale không cần cấu hình; Route 53 là DNS; Redshift dùng cơ chế resize riêng chứ không qua AWS Auto Scaling.

### Câu 36 — Đáp án: B, D

> Which of the following are benefits of AWS Global Accelerator? (Choose two.)  `(Exam 20 - Q36)`

Global Accelerator **tăng availability** (health check và failover giữa các Region) và **giảm latency** (đi qua backbone AWS thay vì Internet công cộng). Nó không làm giảm chi phí, không liên quan tới durability hay bảo mật dữ liệu lưu trữ.

### Câu 37 — Đáp án: D

> A user who wants to get help with billing and reactivate a suspended account should submit an account and billing request to:  `(Exam 20 - Q37)`

Yêu cầu về hóa đơn và kích hoạt lại account bị treo thì gửi tới **AWS Support**. AWS Abuse chỉ xử lý lạm dụng/tấn công phát sinh từ tài nguyên AWS; forum không phải kênh chính thức; Solutions Architect không xử lý việc account.

### Câu 38 — Đáp án: B

> Which AWS Cloud best practice uses the elasticity and agility of cloud computing?  `(Exam 20 - Q38)`

Thực hành khai thác elasticity và agility là **scale động và có dự báo theo nhu cầu thực tế**. A là tư duy provision theo đỉnh của mô hình cũ; C đi ngược lại cloud; D là loose coupling — đúng nhưng không phải điều câu hỏi nhắm tới.

### Câu 39 — Đáp án: A

> Which method helps to optimize costs of users moving to the AWS Cloud?  `(Exam 20 - Q39)`

Cách tối ưu chi phí khi lên cloud là **chỉ trả cho phần thực dùng**. Mua phần cứng trước, cấp phát thủ công, hay mua theo tải lớn nhất có thể đều là thói quen của mô hình on-premises và gây dư thừa.

### Câu 40 — Đáp án: C

> Under the AWS shared responsibility model, which of the following is a customer responsibility?  `(Exam 20 - Q40)`

Khách hàng vá **OS của database chạy trên EC2** vì đó là instance tự quản lý. Hypervisor là của AWS; DynamoDB và RDS là managed service nên AWS lo phần OS — đây chính là điểm khác biệt cốt lõi mà đề hay hỏi.

### Câu 41 — Đáp án: B, C

> The AWS Cost Management tools give users the ability to do which of the following? (Choose two.)  `(Exam 20 - Q41)`

Công cụ quản lý chi phí cho phép **bóc tách chi phí theo ngày, theo service, theo account liên kết** và **tạo budget kèm cảnh báo khi vượt ngưỡng thực tế hoặc dự báo**. Chúng **không** tự xóa tài nguyên, không tự đổi sang RI/Spot, và không tự chuyển storage class — những việc đó cần bạn cấu hình riêng.

### Câu 42 — Đáp án: B

> Under the AWS shared responsibility model, the security and patching of the guest operating system is the responsibility of:  `(Exam 20 - Q42)`

Vá và bảo mật **guest OS** là trách nhiệm của **khách hàng** (với các service tự quản lý như EC2). Systems Manager là công cụ giúp bạn làm việc đó, nhưng chủ thể chịu trách nhiệm vẫn là bạn.

### Câu 43 — Đáp án: C

> Which AWS service makes it easy to create and manage AWS users and groups, and provide them with secure access to AWS resources at no charge?  `(Exam 20 - Q43)`

**IAM** tạo và quản lý user, group, quyền truy cập và **hoàn toàn miễn phí**. Amazon Connect là contact center, Direct Connect là kết nối mạng, Firewall Manager quản lý rule tường lửa.

### Câu 44 — Đáp án: B

> Which AWS service provides on-demand of AWS security and compliance documentation?  `(Exam 20 - Q44)`

**AWS Artifact** là nơi tải theo yêu cầu các báo cáo compliance (SOC, PCI, ISO) và các thỏa thuận với AWS. Directory Service là AD quản lý; Trusted Advisor khuyến nghị cấu hình; Inspector quét lỗ hổng.

### Câu 45 — Đáp án: A

> Which AWS service can be used to turn text into life-like speech?  `(Exam 20 - Q45)`

**Polly** chuyển văn bản thành giọng nói tự nhiên. Transcribe làm ngược lại (giọng nói thành văn bản), Rekognition phân tích ảnh/video, Lex xây chatbot.

### Câu 46 — Đáp án: B

> What is one of the core principles to follow when designing a highly available application in the AWS Cloud?  `(Exam 20 - Q46)`

Nguyên tắc cốt lõi khi thiết kế hệ thống high availability là **giả định mọi component đều có thể lỗi** rồi thiết kế dự phòng cho tình huống đó. Serverless, Auto Scaling hay open-source là lựa chọn kỹ thuật, không phải nguyên tắc bắt buộc.

### Câu 47 — Đáp án: C

> A user needs to generate a report that outlines the status of key security checks in an AWS account. The report must include:  `(Exam 20 - Q47)`

Báo cáo trạng thái các kiểm tra bảo mật quan trọng của account là **Trusted Advisor report**. IAM credential report chỉ liệt kê trạng thái credential của user; CloudTrail là log thô; QuickSight là công cụ BI.

### Câu 48 — Đáp án: A

> Which Amazon EC2 pricing model should be used to comply with per-core software license requirements?  `(Exam 20 - Q48)`

License tính theo **socket/core** đòi hỏi nhìn thấy và kiểm soát phần cứng vật lý, nên phải dùng **Dedicated Hosts**. On-Demand, Spot và Reserved Instances đều không cho bạn quyền kiểm soát host vật lý (Dedicated Instances cũng chỉ tách biệt phần cứng chứ không cho quản lý core).

### Câu 49 — Đáp án: C

> Which of the AWS global infrastructure is used to cache copies of content for faster delivery to users across the globe?  `(Exam 20 - Q49)`

**Edge locations** là nơi CloudFront cache nội dung để phân phối nhanh trên toàn cầu. Region và AZ là nơi chạy workload; data center là thành phần cấu tạo AZ chứ không phải nơi cache.

### Câu 50 — Đáp án: A

> Using AWS Config to record, audit, and evaluate changes to AWS resources to enable traceability is an example of which AWS Well-Architected Framework pillar?  `(Exam 20 - Q50)`

Dùng AWS Config để ghi nhận, kiểm toán và đánh giá thay đổi nhằm đảm bảo **traceability** là biểu hiện của pillar **Security**. Operational excellence tập trung vào vận hành và cải tiến quy trình; hai pillar còn lại nói về hiệu năng và chi phí.
