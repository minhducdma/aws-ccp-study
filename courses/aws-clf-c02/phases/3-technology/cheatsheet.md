# Phase 3 — Service Cheat Sheet (bản skim trước khi thi)

> Toàn bộ AWS service trong phạm vi Domain 3, xếp theo **category**. Mục tiêu: đọc hết trong **10–15 phút** ngay trước khi vào phòng thi.
>
> Cách dùng: che cột "Một câu mô tả", đọc tên service và tự nói ra nó làm gì. Chỗ nào ngập ngừng thì mở `01-notes.md` đúng mục đó.

## Mục lục

[Compute](#compute) · [Containers](#containers) · [Storage](#storage) · [Data transfer & hybrid storage](#data-transfer--hybrid-storage) · [Database](#database) · [Analytics](#analytics) · [Networking & Content Delivery](#networking--content-delivery) · [Global infrastructure](#global-infrastructure-thành-phần-hạ-tầng) · [Application Integration](#application-integration) · [Management & Governance](#management--governance) · [Developer Tools & Deployment](#developer-tools--deployment) · [Machine Learning & AI](#machine-learning--ai) · [Migration & Transfer](#migration--transfer) · [End-User & Business Apps](#end-user--business-apps)

---

## Compute

| Service | Category | Một câu mô tả | Use case điển hình |
|---|---|---|---|
| **Amazon EC2** | Compute | Virtual server (IaaS) thuê theo giây/giờ, bạn toàn quyền kiểm soát OS | Chạy app hoặc database tự cài, workload cần custom OS/license riêng |
| **Amazon EC2 Auto Scaling** | Compute | Tự thêm/bớt EC2 instance theo tải, thay thế instance unhealthy | Web app có traffic biến động (flash sale), đạt elasticity + HA multi-AZ |
| **Elastic Load Balancing (ALB/NLB/CLB)** | Compute / Networking | Phân phối traffic đến nhiều target, có health check và SSL termination | Chia tải cho tier web nhiều EC2, tăng fault tolerance |
| **AWS Lambda** | Compute | Chạy code serverless theo event, tối đa 15 phút mỗi lần, trả tiền theo request × thời gian × RAM | Tạo thumbnail khi upload S3, backend API, serverless cron, xử lý event |
| **Amazon Lightsail** | Compute | Server + storage + DB + networking đóng gói sẵn với **giá cố định, dễ dùng nhất** | Người mới cloud dựng nhanh WordPress / LAMP / Node.js, môi trường dev-test |
| **AWS Batch** | Compute | Chạy hàng trăm nghìn **batch job** (có điểm đầu–điểm cuối), tự provision EC2/Spot | Render video, xử lý ảnh hàng loạt, HPC, job chạy nhiều giờ |
| **AWS Elastic Beanstalk** | Compute (PaaS) | Upload code, AWS lo capacity + load balancing + auto scaling + health monitoring | Developer deploy nhanh web app (Node.js, Java, Python...) mà không cần biết hạ tầng |
| **AWS Outposts** | Compute (hybrid) | Rack server AWS đặt trong data center của bạn, cùng API/service như cloud | Hybrid cloud, data residency, xử lý dữ liệu tại chỗ với latency cực thấp |
| **Amazon EC2 Image Builder** | Compute | Tự động tạo và bảo trì custom AMI theo schedule | Duy trì golden image tuân thủ bảo mật, patch định kỳ |

## Containers

| Service | Category | Một câu mô tả | Use case điển hình |
|---|---|---|---|
| **Amazon ECS** | Containers | Container orchestration cho Docker; launch type **EC2** (bạn quản cluster) hoặc **Fargate** (serverless) | Chạy microservice container; chọn EC2 launch type khi compliance đòi kiểm soát server bên dưới |
| **Amazon EKS** | Containers | Managed Kubernetes trên AWS | Team đã dùng Kubernetes muốn chuyển lên AWS |
| **AWS Fargate** | Containers | Compute engine **serverless cho container**, trả tiền theo vCPU + RAM | Chạy container mà không muốn quản lý bất kỳ EC2 nào |
| **Amazon ECR** | Containers | Private Docker image registry của AWS | Lưu image cho ECS / EKS / Fargate dùng |

## Storage

| Service | Category | Một câu mô tả | Use case điển hình |
|---|---|---|---|
| **Amazon S3** | Storage (object) | Object storage dung lượng gần như vô hạn, durability **11 số 9**, object tối đa 5 TB | Backup, data lake, media, **static website hosting**, phân phối software |
| **S3 Standard** | Storage class | Truy cập thường xuyên, availability 99,99% | Static asset của website đông người dùng, big data analytics |
| **S3 Intelligent-Tiering** | Storage class | Tự chuyển object giữa các access tier theo pattern truy cập (có phí monitoring, không phí retrieval) | Dữ liệu có access pattern thay đổi / không đoán được |
| **S3 Standard-IA** | Storage class | Ít truy cập nhưng **retrieval tức thì**, rẻ hơn Standard | Backup và DR cần lấy lại ngay lập tức |
| **S3 One Zone-IA** | Storage class | Như Standard-IA nhưng chỉ nằm trong **1 AZ** | Bản backup thứ cấp của dữ liệu on-premises, dữ liệu tái tạo được |
| **S3 Glacier Instant Retrieval** | Storage class | Archive nhưng lấy được trong **milliseconds**, min 90 ngày | Dữ liệu archive truy cập khoảng 1 lần/quý |
| **S3 Glacier Flexible Retrieval** | Storage class | Archive, retrieval 1–5 phút đến 5–12 giờ, min 90 ngày | Archive không cần lấy ngay, backup dài hạn |
| **S3 Glacier Deep Archive** | Storage class | **Rẻ nhất**, retrieval 12–48 giờ, min 180 ngày | Lưu 7–10 năm cho compliance, gần như không đọc lại |
| **Amazon EBS** | Storage (block) | Network drive **persistent** gắn vào **1 EC2 tại một thời điểm**, khoá trong **1 AZ** | Root volume, database chạy trên EC2, workload cần block IO ổn định |
| **EBS Snapshots** | Storage | Backup point-in-time của EBS, **incremental**, lưu trên S3 | Bảo vệ dữ liệu EBS, copy sang Region/account khác |
| **Amazon EFS** | Storage (file) | File system NFS **tự scale**, mount đồng thời lên **hàng trăm EC2** và cả server on-premises | Shared storage cho nhiều compute node, big data, CMS, workload Linux |
| **Amazon EC2 Instance Store** | Storage (block) | Ổ vật lý gắn trực tiếp vào host, IO rất cao nhưng **ephemeral** — mất dữ liệu khi stop/terminate | Cache, buffer, scratch data, dữ liệu tạm |
| **Amazon FSx for Windows File Server** | Storage (file) | File system Windows managed, hỗ trợ **SMB / NTFS / Active Directory** | Chuyển file server Windows lên AWS, app .NET/Windows |
| **Amazon FSx for Lustre** | Storage (file) | File system hiệu năng cực cao (hàng trăm GB/s, sub-ms latency) | HPC, machine learning training, xử lý video quy mô lớn |
| **AWS Backup** | Storage | Quản lý backup tập trung cho nhiều AWS service | Chuẩn hoá chính sách backup toàn tổ chức |

## Data transfer & hybrid storage

| Service | Category | Một câu mô tả | Use case điển hình |
|---|---|---|---|
| **AWS Storage Gateway** | Hybrid storage | Cầu nối **thường trực** để app on-premises dùng cloud storage qua protocol file chuẩn | Backup & restore, tiered storage, DR cho môi trường on-premises |
| **AWS Snowcone** | Data transfer | Thiết bị nhỏ 8 TB, chịu môi trường khắc nghiệt, làm được edge computing | Không gian chật, thu thập dữ liệu ngoài hiện trường (có thể gửi online qua DataSync) |
| **AWS Snowball Edge** | Data transfer | Thiết bị 42–80 TB, chuyển tới **petabyte** offline, chạy được EC2 + Lambda tại edge | Migration vài chục–vài trăm TB, decommission data center, DR |
| **AWS Snowmobile** | Data transfer | Container 100 PB trên xe tải, chuyển tới **exabyte** | Chỉ dùng khi cần chuyển **> 10 PB** |
| **AWS OpsHub** | Data transfer | App desktop để quản lý thiết bị Snow Family | Unlock, cấu hình, copy file, monitor thiết bị Snow |
| **AWS DataSync** | Migration | Đồng bộ dữ liệu online giữa on-premises và AWS storage | Chuyển/đồng bộ file lên S3, EFS, FSx định kỳ |
| **S3 Transfer Acceleration** | Data transfer | Upload/download S3 qua Edge Location rồi chuyển tiếp về bucket | Upload file lớn từ nơi rất xa bucket |

## Database

| Service | Category | Một câu mô tả | Use case điển hình |
|---|---|---|---|
| **Amazon RDS** | Database (relational) | Managed relational DB: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server; AWS lo provisioning, patching, backup, Multi-AZ | App cần **ACID transaction / JOIN**, chạy MySQL hay SQL Server không muốn tự quản |
| **RDS Multi-AZ** | Database feature | Standby ở AZ khác, **tự failover** khi primary lỗi | High availability cho database production |
| **RDS Read Replica** | Database feature | Tối đa 5 bản copy chỉ đọc, replication bất đồng bộ | **Scale read workload** (không phải HA) |
| **Amazon Aurora** | Database (relational) | RDS cao cấp tương thích MySQL/PostgreSQL, nhanh hơn MySQL 5x, storage **tự tăng tới 64 TB**, 15 read replica | Enterprise app cần hiệu năng và HA cao, MySQL "dễ scale" |
| **Amazon DynamoDB** | Database (NoSQL) | NoSQL key-value/document **serverless**, replicate 3 AZ, latency single-digit millisecond | App real-time, IoT, mobile backend, session store; "fast and reliable NoSQL" |
| **DynamoDB Accelerator (DAX)** | Database feature | In-memory cache dành riêng cho DynamoDB, đọc nhanh gấp 10 lần (microseconds) | Giảm latency đọc DynamoDB xuống mức microsecond |
| **DynamoDB Global Tables** | Database feature | Replication multi-Region, multi-master | App toàn cầu cần đọc/ghi latency thấp ở nhiều Region |
| **Amazon Redshift** | Database (warehouse) | Data warehouse **OLAP**, columnar storage, MPP, scale tới petabyte, có SQL | Hợp nhất dữ liệu nhiều nguồn để phân tích và làm BI |
| **Amazon ElastiCache** | Database (in-memory) | Managed **Redis / Memcached** cache dữ liệu truy cập thường xuyên | Giảm tải database, latency **sub-millisecond**, leaderboard, session |
| **Amazon DocumentDB** | Database (NoSQL) | "Aurora cho **MongoDB**" — document DB tương thích MongoDB | Content management, catalog, mobile backend đang dùng MongoDB |
| **Amazon Neptune** | Database (graph) | Graph database managed, lưu hàng tỉ quan hệ, query milliseconds | **Social network**, knowledge graph, **fraud detection**, recommendation |
| **Amazon QLDB** | Database (ledger) | Ledger **bất biến**, cryptographically verifiable, xem được toàn bộ history | Ghi nhận giao dịch tài chính, audit trail theo quy định |
| **Amazon Managed Blockchain** | Database (blockchain) | Managed Hyperledger Fabric / Ethereum, **phi tập trung** | Nhiều bên giao dịch không cần authority trung tâm |

## Analytics

| Service | Category | Một câu mô tả | Use case điển hình |
|---|---|---|---|
| **Amazon Athena** | Analytics | Serverless, dùng **SQL query trực tiếp dữ liệu trên S3**, trả tiền theo TB scan | Query VPC Flow Logs / ELB logs / CloudTrail trail, BI ad-hoc trên data lake |
| **Amazon EMR** | Analytics | Managed cluster chạy **Hadoop / Apache Spark / Hive** trên hàng trăm EC2 | Xử lý & phân tích big data, ETL, web indexing, ML trên dữ liệu lớn |
| **Amazon QuickSight** | Analytics | BI serverless tạo dashboard tương tác, pay-per-session | Trực quan hoá dữ liệu từ S3/Redshift/RDS cho bộ phận kinh doanh |
| **AWS Glue** | Analytics | ETL serverless + Glue Data Catalog | Chuẩn bị và transform dữ liệu cho Athena/Redshift/EMR |
| **Amazon Kinesis** | Analytics / Integration | Thu thập và phân tích **dữ liệu streaming real-time** (Data Streams, Firehose, Data Analytics, Video Streams) | Clickstream, log real-time, IoT telemetry, phân tích video |

## Networking & Content Delivery

| Service | Category | Một câu mô tả | Use case điển hình |
|---|---|---|---|
| **Amazon VPC** | Networking | Virtual network riêng do **bạn toàn quyền cấu hình** (CIDR, subnet, route table, gateway) | Cô lập tài nguyên, thiết kế public/private tier |
| **Subnet** | Networking | Phân vùng network trong VPC, **thuộc một AZ** | Tách web tier (public) và DB tier (private) |
| **Internet Gateway (IGW)** | Networking | Gắn ở mức VPC, cho phép traffic internet **đi vào và đi ra** | Cho public subnet truy cập internet hai chiều |
| **NAT Gateway** | Networking | Cho private subnet **đi ra** internet nhưng **chặn inbound** | EC2 trong private subnet tải patch/update |
| **Security Group** | Networking | Firewall ở mức **instance/ENI**, chỉ ALLOW, **stateful** | Chỉ mở port 443 từ internet, chặn DB khỏi public |
| **Network ACL (NACL)** | Networking | Firewall ở mức **subnet**, có **ALLOW và DENY**, **stateless** | Chặn hẳn một dải IP ở tầng subnet |
| **VPC Flow Logs** | Networking | Ghi log thông tin **IP traffic** vào/ra VPC/subnet/ENI, gửi tới S3 hoặc CloudWatch Logs | Troubleshoot kết nối, điều tra bảo mật |
| **VPC Peering** | Networking | Nối **hai** VPC như cùng một network (CIDR không trùng, **không transitive**) | 2 VPC hoặc 2 account cần nói chuyện private |
| **VPC Endpoint** | Networking | Truy cập AWS service qua **private network** thay vì internet (Gateway cho S3/DynamoDB, Interface cho phần còn lại) | Gọi S3 từ private subnet mà không cần NAT/internet |
| **AWS Transit Gateway** | Networking | Hub routing trung tâm nối **hàng nghìn** VPC và mạng on-premises | Nhiều VPC/nhiều account cần interconnect, giảm chi phí vận hành |
| **AWS Direct Connect** | Networking (hybrid) | **Kết nối vật lý private** từ data center tới AWS (cần ISP + colocation), mất ≥1 tháng để thiết lập | Truyền dữ liệu lớn hằng ngày cần đường **consistent, dedicated, low-latency** |
| **AWS Site-to-Site VPN** | Networking (hybrid) | Tunnel mã hoá **qua public internet**; cần **Customer Gateway** + **Virtual Private Gateway** | Kết nối hybrid nhanh và rẻ, hoặc backup cho Direct Connect |
| **Amazon Route 53** | Networking | Managed **DNS**: đăng ký domain, quản lý record, **health check**, 4 routing policy (simple/weighted/latency/failover) | Trỏ domain vào ELB/CloudFront, latency-based routing, DR failover |
| **Amazon CloudFront** | Content delivery | **CDN** cache nội dung tại **Edge Location**; tích hợp Shield + WAF chống DDoS | Phân phối ảnh/video/static website toàn cầu với latency thấp |
| **AWS Global Accelerator** | Networking | **Không cache** — proxy traffic TCP/UDP qua AWS global network, cấp **2 Anycast IP** | App cần static IP, failover cross-Region nhanh, tăng tốc app non-HTTP |
| **Amazon API Gateway** | Networking / Integration | Cửa vào cho REST/HTTP/WebSocket API, có throttling, caching, authorization | Expose Lambda thành HTTP API cho kiến trúc serverless |

## Global infrastructure (thành phần hạ tầng)

| Thành phần | Category | Một câu mô tả | Use case điển hình |
|---|---|---|---|
| **Region** | Global infrastructure | Vùng địa lý riêng biệt, gồm **nhiều Availability Zone** | Chọn Region gần user, đáp ứng data sovereignty, DR sang Region khác |
| **Availability Zone** | Global infrastructure | Một hoặc nhiều data center riêng biệt trong một Region, nguồn/mạng dự phòng độc lập | Deploy **≥ 2 AZ** để có high availability |
| **Edge Location / PoP** | Global infrastructure | Điểm cache nội dung, **nhiều hơn AZ rất nhiều**, rải khắp thế giới | CloudFront, Global Accelerator, S3 Transfer Acceleration, Shield |
| **AWS Local Zones** | Global infrastructure | "Phần mở rộng của Region" đặt gần thành phố lớn, chạy được EC2/RDS/EBS | App latency-sensitive ở nơi chưa có Region |
| **AWS Wavelength** | Global infrastructure | Hạ tầng AWS nhúng trong data center nhà mạng, ở rìa mạng **5G** | AR/VR, connected vehicle, live video, gaming ultra-low latency |

## Application Integration

| Service | Category | Một câu mô tả | Use case điển hình |
|---|---|---|---|
| **Amazon SQS** | Integration | Message **queue** managed; message bị xoá sau khi consumer đọc; giữ mặc định 4 ngày, tối đa 14 ngày; có **FIFO queue** | **Decouple** component, làm đệm khi traffic spike, xử lý message **đúng thứ tự FIFO** |
| **Amazon SNS** | Integration | **Pub/Sub**: publish 1 message vào topic, **tất cả** subscriber nhận (email, **SMS**, Lambda, SQS, HTTP, mobile push) | Gửi thông báo tới nhiều đích, nhận alert từ CloudWatch Alarm |
| **Amazon MQ** | Integration | **Managed Apache ActiveMQ / RabbitMQ** hỗ trợ protocol mở (MQTT, AMQP, STOMP), chạy trên máy dedicated | Migrate app on-premises đang dùng message broker mà **không viết lại code** |
| **AWS Step Functions** | Integration | Điều phối nhiều bước thành **workflow** trực quan (state machine), serverless | Quy trình nghiệp vụ nhiều bước có retry, rẽ nhánh, chờ |
| **Amazon EventBridge (CloudWatch Events)** | Integration | Event bus phản ứng với event trong AWS hoặc chạy theo schedule (cron) | Trigger Lambda khi EC2 đổi state, chạy job định kỳ |
| **Amazon SES** | Integration | Dịch vụ gửi **email** ở quy mô lớn | Gửi email giao dịch, email marketing |

## Management & Governance

| Service | Category | Một câu mô tả | Use case điển hình |
|---|---|---|---|
| **Amazon CloudWatch** | Monitoring | **Metric / Log / Alarm / Event** — "hệ thống đang chạy thế nào" | Theo dõi CPU EC2, alarm khi CPU ≥ 60%, gom log, billing alarm, trigger auto scaling |
| **AWS CloudTrail** | Monitoring | Ghi **API call** — "**ai** đã làm gì, khi nào, từ đâu"; bật mặc định, lưu 90 ngày | Điều tra ai terminate EC2, audit và compliance |
| **AWS Config** | Governance | Ghi **lịch sử cấu hình** resource và đánh giá theo **Config rule** | Audit change management, phát hiện resource non-compliant, remediation |
| **AWS X-Ray** | Monitoring | **Trace** request qua các thành phần — "request chậm ở đâu" | Tìm bottleneck hiệu năng, hiểu dependency microservice |
| **Amazon CodeGuru** | Monitoring | Code review tự động (Reviewer) và profiling hiệu năng runtime (Profiler) | Phát hiện code kém hiệu quả, giảm CPU và chi phí compute |
| **AWS Service Health Dashboard** | Monitoring | Trạng thái **tất cả** AWS service ở mọi Region (công khai) | Kiểm tra AWS có đang gặp sự cố chung không |
| **AWS Personal Health Dashboard** | Monitoring | View cá nhân hoá: event nào của AWS ảnh hưởng **tài nguyên của bạn**, kèm hướng dẫn xử lý | Nhận alert về sự cố và thay đổi có lịch trước ảnh hưởng account bạn |
| **AWS Systems Manager (SSM)** | Management | Quản lý EC2 + on-premises ở quy mô lớn: **patch automation**, run command, Parameter Store, **Session Manager** | Tự động patch DB/OS theo schedule, shell vào EC2 mà không cần SSH/port 22 |
| **AWS Trusted Advisor** | Management | Bộ **check khuyến nghị** tự động: cost optimization, performance, security, fault tolerance, service limits | Tìm security group mở quá rộng, phát hiện resource dùng chưa hết công suất |
| **AWS Organizations** | Management | Quản lý nhiều AWS account tập trung: consolidated billing, SCP | Gộp hoá đơn, hưởng volume discount, áp policy toàn tổ chức |
| **AWS Control Tower** | Management | Cách **dễ nhất** để dựng môi trường multi-account well-architected | Setup landing zone an toàn cho tổ chức mới lên cloud |
| **AWS Resource Groups & Tag Editor** | Management | Nhóm và gắn tag cho resource để quản lý, filter, phân bổ chi phí | Tạo console riêng cho môi trường dev/test/prod |

## Developer Tools & Deployment

| Service | Category | Một câu mô tả | Use case điển hình |
|---|---|---|---|
| **AWS CloudFormation** | Deployment (IaC) | **Infrastructure as Code** bằng template **JSON/YAML**, tái sử dụng được qua nhiều Region/account | Provision toàn bộ hạ tầng tự động, lặp lại y hệt giữa các môi trường |
| **AWS CDK** | Deployment (IaC) | Định nghĩa hạ tầng bằng **ngôn ngữ lập trình** rồi sinh ra CloudFormation | Team dev muốn viết hạ tầng bằng TypeScript/Python |
| **AWS Elastic Beanstalk** | Deployment (PaaS) | Upload code, AWS lo capacity + load balancing + auto scaling + health monitoring | Deploy nhanh web app khi không muốn quản lý hạ tầng |
| **AWS OpsWorks** | Deployment (hybrid) | **Managed Chef & Puppet** để tự động cấu hình EC2 và VM on-premises | Thấy chữ "Chef" hoặc "Puppet" trong đề là OpsWorks |
| **AWS CodeCommit** | Developer tools | Git repository private, có version control | Lưu source code riêng tư trong AWS |
| **AWS CodeBuild** | Developer tools | Compile code và chạy test, serverless, trả tiền theo build time | Bước build/test trong pipeline CI/CD |
| **AWS CodeDeploy** | Developer tools (hybrid) | Deploy application lên **EC2 và server on-premises** | Deploy app trong kiến trúc hybrid |
| **AWS CodePipeline** | Developer tools | Orchestration CI/CD: Code → Build → Test → Deploy | Tự động hoá toàn bộ release process |
| **AWS CodeArtifact** | Developer tools | Lưu và quản lý package/dependency (Maven, npm, pip, NuGet) | Artifact management cho team dev |
| **AWS CodeStar** | Developer tools | UI thống nhất dựng nhanh toàn bộ chuỗi CI/CD | Khởi tạo project mới với pipeline sẵn |
| **AWS Cloud9** | Developer tools | **Cloud IDE** viết/chạy/debug code trên browser, có collaboration | Pair programming, code mọi nơi không cần setup máy |
| **AWS Quick Start** | Deployment | Reference deployment sẵn cho giải pháp IT phổ biến (IBM MQ, SAP...) | Dựng nhanh một giải pháp phổ biến với ít công sức nhất |
| **AWS Elastic Disaster Recovery (CloudEndure DR)** | Deployment / DR | Nhân bản môi trường sang Region khác, standby **sẵn sàng trong vài phút** | Mirror image của môi trường production để chống outage cả Region |

## Machine Learning & AI

| Service | Category | Một câu mô tả | Use case điển hình |
|---|---|---|---|
| **Amazon Rekognition** | Machine Learning | Nhận diện object, người, text, **khuôn mặt**, scene trong **ảnh và video** | Auto-tag ảnh, facial recognition, content moderation |
| **Amazon Transcribe** | Machine Learning | **Speech → text** (ASR) | Transcribe cuộc gọi customer service, tạo phụ đề/closed caption |
| **Amazon Polly** | Machine Learning | **Text → speech** giọng như người thật | Ứng dụng đọc nội dung, trợ lý giọng nói |
| **Amazon Translate** | Machine Learning | Dịch ngôn ngữ tự nhiên, chính xác, khối lượng lớn | Localize website/app cho user quốc tế |
| **Amazon Lex** | Machine Learning | Xây **chatbot / call center bot** (công nghệ đằng sau Alexa) — ASR + NLU nhận intent | Chatbot hỗ trợ khách hàng, bot IVR |
| **Amazon Comprehend** | Machine Learning | **NLP**: nhận diện ngôn ngữ, key phrase, entity, **sentiment**, chủ đề | Phân tích cảm xúc phản hồi khách hàng, gom bài viết theo topic |
| **Amazon SageMaker** | Machine Learning | Nền tảng **build / train / deploy ML model** của riêng bạn | Data scientist tự huấn luyện model |
| **Amazon Textract** | Machine Learning | Trích xuất **text, chữ viết tay, dữ liệu** từ **tài liệu scan / PDF** | Xử lý hoá đơn, hồ sơ y tế, tờ khai thuế, giấy tờ tuỳ thân |
| **Amazon Forecast** | Machine Learning | Dự báo bằng ML trên dữ liệu chuỗi thời gian | Dự báo nhu cầu sản phẩm, kế hoạch tài chính, kế hoạch nhân lực |
| **Amazon Kendra** | Machine Learning | **Search engine tài liệu** dùng ML, hỏi bằng ngôn ngữ tự nhiên | Tìm kiếm nội bộ trên PDF/Word/FAQ của doanh nghiệp |
| **Amazon Personalize** | Machine Learning | **Gợi ý cá nhân hoá real-time** | Recommendation sản phẩm, direct marketing cá nhân hoá |

## Migration & Transfer

| Service | Category | Một câu mô tả | Use case điển hình |
|---|---|---|---|
| **AWS Database Migration Service (DMS)** | Migration | Migrate **database** lên AWS, **source vẫn hoạt động** trong lúc migrate; hỗ trợ cả homogeneous và heterogeneous | Chuyển Oracle/MySQL/SQL Server lên RDS hoặc Aurora |
| **AWS Application Migration Service (MGN) / Server Migration Service** | Migration | Migrate **server / workload** on-premises lên AWS | Chuyển hàng loạt VM on-premises thành EC2 |
| **AWS Application Discovery Service** | Migration | Thu thập thông tin về hạ tầng on-premises để lập kế hoạch migration | Đánh giá phụ thuộc và cấu hình trước khi migrate |
| **AWS Migration Hub** | Migration | Theo dõi tiến độ migration ở một chỗ | Quản lý dự án migration nhiều wave |
| **AWS Schema Conversion Tool (SCT)** | Migration | Chuyển đổi schema giữa hai engine DB khác nhau | Đi kèm DMS khi migrate heterogeneous (SQL Server → Aurora) |

## End-User & Business Apps

| Service | Category | Một câu mô tả | Use case điển hình |
|---|---|---|---|
| **Amazon Connect** | Business app | **Cloud contact center**, nhận cuộc gọi và tạo contact flow, rẻ hơn ~80% so với contact center truyền thống | Thay thế tổng đài chăm sóc khách hàng truyền thống |
| **Amazon WorkSpaces** | End-user | Desktop as a Service (virtual desktop) | Cấp desktop từ xa cho nhân viên/contractor |
| **Amazon AppStream 2.0** | End-user | Stream ứng dụng desktop qua browser | Cấp app nặng cho user mà không cần cài trên máy |
| **Amazon Elastic Transcoder** | Media | Chuyển đổi **format media** cho thiết bị khác nhau | Convert video sang format mà mobile hỗ trợ |
| **AWS Amplify** | Mobile / Web | Bộ công cụ dựng nhanh app web/mobile full-stack | Frontend + backend serverless cho app mobile |
| **AWS Device Farm** | Mobile | Test app trên thiết bị mobile thật trên cloud | QA app trên nhiều dòng máy |
| **AWS IoT Core** | IoT | Kết nối và quản lý hàng tỉ thiết bị IoT | Thu thập telemetry từ thiết bị, điều khiển từ xa |
| **AWS Marketplace** | Business | Catalog software của bên thứ ba chạy trên AWS, mua bằng 1-Click, tính tiền theo giờ/tháng | Tìm, thử và deploy software thương mại nhanh |

---

## 12 cặp so sánh cần trả lời trong 5 giây

| Câu hỏi | Đáp án |
|---|---|
| CloudFront cache ở đâu? | **Edge Locations** (không phải AZ, không phải Region) |
| Rẻ nhất nhưng có thể bị terminate? | **Spot Instances** (tới 90%) |
| Ngắn hạn + không được gián đoạn? | **On-Demand** |
| Đổi được instance type sau khi mua? | **Convertible RI** (Standard RI thì không) |
| Cần physical server + BYOL license? | **Dedicated Hosts** |
| Ephemeral, mất data khi stop? | **EC2 Instance Store** |
| Shared file cho nhiều EC2? | **EFS** (EBS chỉ 1 instance/1 AZ) |
| Rẻ + **immediate retrieval**? | **S3 Standard-IA** (Glacier phải chờ) |
| Rẻ nhất cho archive 7–10 năm? | **S3 Glacier Deep Archive** |
| Auto failover cho RDS? | **Multi-AZ** (Read Replica chỉ để scale read) |
| "Ai đã làm việc này?" | **CloudTrail** (CloudWatch chỉ có metric/log) |
| "Cấu hình resource đã đổi gì?" | **AWS Config** |
| Stateful vs stateless firewall? | **Security Group = stateful (instance)**, **NACL = stateless (subnet)** |
| Consistent, dedicated, private connection? | **Direct Connect** (VPN đi qua public internet) |
| Nối hàng nghìn VPC? | **Transit Gateway** (Peering chỉ 1-1, không transitive) |
| Queue có thứ tự FIFO? | **SQS FIFO** (SNS là pub/sub, không lưu message) |
| Infrastructure as Code? | **CloudFormation** |
| Deploy app nhanh, không cần biết hạ tầng? | **Elastic Beanstalk** |
| Thấy chữ "Chef" hoặc "Puppet"? | **OpsWorks** |
| Nhận diện khuôn mặt trong ảnh? | **Rekognition** (tài liệu scan → **Textract**) |
