# Phase 3 — Cloud Technology & Services (Domain 3, 34% đề thi)

> **Domain lớn nhất của CLF-C02.** Khoảng 17/50 câu tính điểm nằm ở đây.
>
> **Cách học file này:** đề CCP hầu như không hỏi "cấu hình thế nào", chỉ hỏi **"service nào làm việc này"** và **"service này khác service kia ở đâu"**. Vì vậy tài liệu dưới đây ưu tiên bảng so sánh thay vì văn xuôi. Với mỗi service bạn chỉ cần nhớ 3 thứ: **nó là gì / dùng khi nào / hay bị nhầm với cái gì**.

## Mục lục theo thứ tự đọc

| # | Mục | Nội dung chính |
|---|---|---|
| 1 | [Global Infrastructure](#1-global-infrastructure) | Region, AZ, Edge Location, Local Zones, Outposts, Route 53, CloudFront, Global Accelerator |
| 2 | [EC2](#2-ec2--virtual-machines) | Instance types, AMI, Security Groups, **purchasing options** |
| 3 | [ELB & Auto Scaling](#3-elb--auto-scaling) | Scalability vs Elasticity, ALB/NLB/CLB, ASG |
| 4 | [Storage](#4-storage) | S3 + storage classes, EBS, EFS, Instance Store, FSx, Snow Family, Storage Gateway |
| 5 | [Database](#5-database) | RDS, Aurora, DynamoDB, Redshift, ElastiCache, DocumentDB, Neptune, QLDB |
| 6 | [Compute khác](#6-compute-khác) | Lambda, ECS, Fargate, ECR, Lightsail, Batch |
| 7 | [Networking & VPC](#7-networking--vpc) | Subnet, IGW, NAT, SG vs NACL, Peering, Endpoints, DX vs VPN, Transit Gateway |
| 8 | [Monitoring](#8-monitoring) | CloudWatch, CloudTrail, AWS Config, X-Ray, Health Dashboards |
| 9 | [Application Integration](#9-application-integration) | SQS, SNS, Kinesis, Amazon MQ, API Gateway, Step Functions |
| 10 | [Deployment & IaC](#10-deployment--iac) | CloudFormation, Elastic Beanstalk, OpsWorks, Systems Manager, Code* |
| 11 | [Machine Learning](#11-machine-learning) | 11 service AI/ML mỗi cái một dòng |
| — | [**Câu hỏi hay bẫy**](#câu-hỏi-hay-bẫy) | Tổng hợp bẫy cần nhớ trước khi thi |

---

## 1. Global Infrastructure

### 1.1 Region vs AZ vs Edge Location vs Local Zone vs Outposts

Đây là bảng **quan trọng nhất** của Phase 3 — mỗi đề thi đều có 2–4 câu về nó.

| Thành phần | Là gì | Dùng khi nào | Hay bị nhầm với |
|---|---|---|---|
| **Region** | Một vùng địa lý riêng biệt (vd `us-east-1`), gồm **nhiều Availability Zone** | Chọn Region gần user, đáp ứng **data sovereignty**, và làm **Disaster Recovery** (backup sang Region khác) | AZ — nhớ: **Region CHỨA AZ**, không phải ngược lại |
| **Availability Zone (AZ)** | Một hoặc nhiều **data center** riêng biệt bên trong một Region, có nguồn điện/mạng dự phòng độc lập, nối nhau bằng link latency thấp | Deploy đa AZ để có **High Availability** trong cùng Region (tối thiểu **2 AZ**) | Region (địa lý khác nhau) và Edge Location (chỉ để cache) |
| **Edge Location / Point of Presence** | Điểm cache nội dung, **nhiều hơn số AZ rất nhiều**, rải ở nhiều thành phố toàn cầu | CloudFront cache content, Global Accelerator, S3 Transfer Acceleration, AWS Shield | AZ. **CloudFront dùng Edge Location, KHÔNG dùng AZ hay Region** |
| **Local Zone** | "Phần mở rộng của một Region" đặt gần thành phố lớn, chạy được EC2/RDS/EBS/ECS/ElastiCache | App **latency-sensitive** cần đặt compute rất gần user mà chưa có Region ở đó | Edge Location (chỉ cache, không chạy EC2) |
| **Wavelength Zone** | Hạ tầng AWS nhúng trong data center của nhà mạng, ở **rìa mạng 5G** | App ultra-low latency qua 5G: AR/VR, connected vehicles, live video, gaming | Local Zone (không gắn với 5G) |
| **Outposts** | **Server rack vật lý của AWS đặt trong data center của bạn** — cùng API, cùng service | Hybrid cloud, **data residency**, xử lý dữ liệu tại chỗ | Local Zone (do AWS vận hành ở site của AWS). Với Outposts, **bạn chịu trách nhiệm an ninh vật lý cho rack** |

**Thứ tự số lượng cần nhớ:** `Edge Location > Availability Zone > Region`.

### 1.2 Route 53 — Managed DNS

| Điểm | Nội dung |
|---|---|
| Là gì | DNS service được quản lý; **đăng ký domain**, quản lý record, health check |
| Record hay hỏi | `A` (IPv4), `AAAA` (IPv6), `CNAME` (hostname → hostname), `Alias` (→ ELB, CloudFront, S3, RDS) |
| Routing policy | **Simple** (1 resource) / **Weighted** (chia theo tỉ lệ) / **Latency** (Region nhanh nhất) / **Failover** (active-passive) |
| Đặc biệt | Là **global service**, và là service duy nhất trong nhóm này **có health check** cho EC2/endpoint |
| Nhầm với | CloudFront (CDN, cache) — Route 53 chỉ trả về địa chỉ, không truyền nội dung |

### 1.3 CloudFront vs Global Accelerator vs S3 Transfer Acceleration vs S3 CRR

Cả bốn đều "làm nhanh hơn cho user toàn cầu" — đề rất hay bắt phân biệt.

| Service | Cơ chế | Dùng khi nào | Không dùng khi |
|---|---|---|---|
| **CloudFront** | CDN, **cache** nội dung tại Edge Location (TTL) | Static content (ảnh, video, JS/CSS), website tĩnh, streaming toàn cầu; tích hợp Shield + WAF chống DDoS | Nội dung thay đổi liên tục theo user, hoặc cần static IP |
| **Global Accelerator** | **Không cache**, proxy packet TCP/UDP qua AWS global network, cấp **2 Anycast IP** | App non-HTTP, cần **static IP**, cần failover giữa Region nhanh và xác định | Chỉ cần cache content tĩnh (dùng CloudFront rẻ hơn) |
| **S3 Transfer Acceleration** | Upload/download S3 qua Edge Location rồi chuyển tiếp về bucket | **Upload** file lớn từ xa vào một bucket ở Region khác | Phân phối nội dung cho nhiều người đọc (dùng CloudFront) |
| **S3 Cross-Region Replication (CRR)** | Copy object sang bucket ở Region khác, near real-time, read-only | Dynamic content cần low latency ở **một vài** Region, compliance, replication cross-account | Phân phối toàn cầu (phải setup từng Region — dùng CloudFront) |

---

## 2. EC2 — Virtual Machines

### 2.1 Thành phần một EC2 instance

`EC2 instance = AMI (OS) + Instance Type (CPU/RAM) + Storage (EBS / Instance Store) + Security Group + User Data`

| Thành phần | Ghi nhớ |
|---|---|
| **AMI** | Template chứa OS + software để launch instance đã cấu hình sẵn. Gắn với **một Region** (copy được sang Region khác). Nguồn: public AMI của AWS / AMI của bạn / AWS Marketplace AMI |
| **EC2 Image Builder** | Tự động tạo & bảo trì custom AMI theo schedule. Free (chỉ trả tiền resource bên dưới) |
| **User Data** | Script bootstrap, **chỉ chạy một lần** ở lần boot đầu tiên |
| **Security Group** | Firewall ảo ở **mức instance**, chỉ có rule **ALLOW**, **stateful** |
| **Instance families** | General Purpose (t/m) · Compute Optimized (c) · Memory Optimized (r) · Storage Optimized (i/d) · GPU (p/g) |
| Free tier | `t2.micro` / `t3.micro` — 750 giờ/tháng |

Port cần nhớ: **22** SSH · **80** HTTP · **443** HTTPS · **3389** RDP · **20/21** FTP.

### 2.2 EC2 Purchasing Options — bảng so sánh + "chọn cái nào"

| Option | Giảm giá | Cam kết | Có thể bị mất instance? | Dùng khi nào |
|---|---|---|---|---|
| **On-Demand** | 0% (đắt nhất theo giờ) | Không | Không | Workload **ngắn hạn, không đoán được, không được gián đoạn**. Ví dụ: chạy app 1 ngày, spike traffic dịp khuyến mãi, pilot 1 tháng |
| **Reserved Instance — Standard** | **tới 72%** | 1 hoặc 3 năm | Không | Workload **steady-state** dài hạn (database chạy 24/7). Khoá cứng instance type/Region/OS/tenancy. **Bán lại được** trên RI Marketplace |
| **Reserved Instance — Convertible** | tới 66% | 1 hoặc 3 năm | Không | Giống Standard nhưng **đổi được instance type / family / OS / tenancy** sang RI giá trị **bằng hoặc cao hơn**. Chọn khi workload có thể thay đổi. **Không bán lại được** |
| **Savings Plans** | tới 72% | Cam kết **$/giờ** trong 1 hoặc 3 năm | Không | Cam kết mức tiêu dùng chứ không cam kết instance cụ thể. Khoá instance family + Region, **linh hoạt về size / OS / tenancy**. Dùng vượt mức cam kết thì tính giá On-Demand |
| **Spot Instances** | **tới 90% — rẻ nhất** | Không | **CÓ** — AWS thu hồi khi giá spot vượt max price của bạn | Workload **chịu lỗi, gián đoạn được**: batch job, data analysis, **image/video processing**, distributed workload, CI. **KHÔNG dùng cho database hay job critical** |
| **Dedicated Instances** | — (đắt hơn shared) | Không | Không | Cần hardware không chia sẻ với khách khác, nhưng **không kiểm soát được vị trí instance** |
| **Dedicated Hosts** | — (**đắt nhất**) | On-Demand hoặc Reserved 1/3 năm | Không | Thuê **nguyên physical server**, kiểm soát instance placement → đáp ứng **compliance khắt khe** và **BYOL** license tính theo socket/core/VM |
| **Capacity Reservations** | **0%** (trả giá On-Demand kể cả không chạy) | Không cam kết thời gian | Không | Đảm bảo **chắc chắn có capacity** trong một AZ cụ thể cho sự kiện quan trọng. Kết hợp với Regional RI / Savings Plans để có discount |

**Cây quyết định nhanh khi gặp câu hỏi:**

```
Đề nói "cannot be interrupted" / "must not be interrupted"?
  └── CÓ → loại Spot ngay.
        ├── Chạy dài hạn, đều đặn (1–3 năm)? → Reserved Instances (hoặc Savings Plans)
        │     └── Có thể phải đổi instance type? → Convertible RI
        └── Ngắn hạn / spike / khó đoán?      → On-Demand
  └── KHÔNG (chịu gián đoạn được, "flexible", "not time-critical") → Spot Instances

Đề nhắc "physical server" / "server-bound license" / "compliance dedicated hardware"?
  └── Dedicated Hosts (nếu chỉ nói "hardware dedicated, không cần kiểm soát placement" → Dedicated Instances)

Đề hỏi "giảm giá lớn nhất"?
  └── Trong nhóm RI: 3-year, All Upfront, Standard RI
  └── Toàn bộ: Spot (tới 90%)
```

Mức discount theo payment option: `No Upfront (+) < Partial Upfront (++) < All Upfront (+++)`, và `1 năm (+) < 3 năm (+++)`.

### 2.3 Shared Responsibility với EC2

| AWS lo | Bạn lo |
|---|---|
| Hardware, hypervisor, data center vật lý, hạ tầng mạng | **Patch guest OS và application**, cấu hình Security Group / NACL, mã hoá dữ liệu, IAM, backup |

---

## 3. ELB & Auto Scaling

### 3.1 Bốn khái niệm hay bị lẫn

| Khái niệm | Định nghĩa | Ví dụ trong đề |
|---|---|---|
| **Vertical scaling (scale up/down)** | **Tăng size** của một instance (t3.medium → t3.large) | "Replacing an existing EC2 instance with a larger one", "adding more RAM" |
| **Horizontal scaling (scale out/in)** | **Thêm/bớt số lượng** instance | "Adding more EC2 instances of the same size" |
| **High Availability** | Chạy trên **nhiều AZ** để chịu được lỗi một AZ | "Deploy across multiple Availability Zones" |
| **Elasticity** | **Tự động** tăng/giảm resource theo tải real-time → không over/under-provision | "Automatically provisioning resources based on changes in demand" |
| **Agility** | Triển khai/thay đổi resource **nhanh** để phản ứng với nhu cầu kinh doanh | "Go to market quickly", "requirements may change" |

### 3.2 ELB vs Auto Scaling — không được nhầm

| | Elastic Load Balancing (ELB) | Auto Scaling Group (ASG) |
|---|---|---|
| Làm gì | **Phân phối** traffic đến nhiều target | **Thêm/bớt** số lượng EC2 instance |
| Kết quả | Fault tolerance, health check, SSL termination | Elasticity, thay thế instance unhealthy, tiết kiệm chi phí |
| Phạm vi | Multi-AZ trong **một Region** | Multi-AZ trong **một Region** (không cross-Region) |
| Câu hỏi gợi ý | "distributes incoming application traffic" | "automatically add or remove instances based on demand" |

**3 loại ELB:** **ALB** (Application, HTTP/HTTPS, Layer 7) · **NLB** (Network, TCP/UDP, Layer 4, hiệu năng cao) · **CLB** (Classic, cũ, đang bị loại bỏ dần).

**ASG scaling strategy:** Manual · Dynamic (Simple/Step, **Target Tracking**, Scheduled) · **Predictive** (dùng ML dự đoán).

---

## 4. Storage

### 4.1 Bảng so sánh tổng thể — S3 vs EBS vs EFS vs Instance Store vs FSx

| | **S3** | **EBS** | **EFS** | **Instance Store** | **FSx** |
|---|---|---|---|---|---|
| Loại | **Object** storage | **Block** storage (network drive) | **File** storage (NFS) | **Block** storage (ổ vật lý gắn host) | **File** storage (bên thứ ba) |
| Phạm vi | Bucket thuộc 1 Region, tên **globally unique** | Gắn với **1 AZ** | Nhiều AZ | Gắn cứng vào 1 instance | Nhiều AZ |
| Gắn được cho | Truy cập qua API/HTTP từ mọi nơi | **1 EC2 tại một thời điểm** | **Hàng trăm EC2 cùng lúc** | Đúng 1 EC2 | Nhiều EC2 + on-premises |
| Persistent? | Có | **Có** (tồn tại sau khi terminate nếu tắt delete-on-termination) | Có | **KHÔNG — ephemeral, mất dữ liệu khi stop/terminate** | Có |
| Dung lượng | Không giới hạn; **object tối đa 5 TB** (>5 GB phải multipart upload) | Provision theo GB | **Tự scale** | Cố định theo instance type | Provision |
| Durability | **99,999999999% (11 số 9)** — giống nhau ở mọi storage class | Tự replicate **trong cùng AZ** | Multi-AZ | Không đảm bảo, hardware lỗi là mất | Cao |
| Dùng khi | Backup, data lake, **static website hosting**, media, archive | Root volume, **database chạy trên EC2**, workload cần block IO thấp | **Shared file cho nhiều compute node**, big data, CMS | Cache / buffer / scratch / temp data | **FSx for Windows**: SMB/NTFS + Active Directory. **FSx for Lustre**: HPC, ML, hiệu năng cực cao |
| Hay bị nhầm | Với EFS — S3 **không phải** file system | Với Instance Store (EBS persistent, IS ephemeral) và với EFS (EBS chỉ 1 instance) | Với EBS — EFS mount được nhiều instance | Với EBS | Với EFS — FSx for Windows dùng cho Windows/SMB, EFS cho Linux/NFS |

Câu hỏi mẹo: **"often-changing database on an EC2 instance"** → EBS. **"high throughput to multiple compute nodes"** → EFS. **"virtually unlimited object storage"** → S3. **"ephemeral, deleted when instance stops"** → Instance Store.

### 4.2 S3 Storage Classes — bảng đầy đủ

| Storage class | Availability | Retrieval | Min duration | Dùng khi nào |
|---|---|---|---|---|
| **S3 Standard** | 99,99% | Tức thì | — | Dữ liệu **truy cập thường xuyên, pattern ổn định**: static asset website, big data analytics, content distribution |
| **S3 Intelligent-Tiering** | 99,9% | Tức thì | — | Access pattern **thay đổi / không đoán được**. Tự chuyển object giữa các tier. Có **phí monitoring**, **không có phí retrieval** |
| **S3 Standard-IA** | 99,9% | **Tức thì** | 30 ngày | Ít truy cập nhưng **cần lấy ngay**: backup, disaster recovery. → "**most cost-effective + immediate retrieval**" |
| **S3 One Zone-IA** | 99,5% | Tức thì | 30 ngày | Ít truy cập, **chấp nhận mất nếu AZ đó sập**: bản backup thứ cấp của dữ liệu on-premises, dữ liệu tái tạo được |
| **S3 Glacier Instant Retrieval** | 99,9% | **Milliseconds** | 90 ngày | Archive nhưng vẫn cần lấy tức thì, truy cập ~1 lần/quý |
| **S3 Glacier Flexible Retrieval** | 99,99% | Expedited 1–5 phút / Standard 3–5 giờ / Bulk 5–12 giờ (free) | 90 ngày | Archive, **không cần lấy ngay** |
| **S3 Glacier Deep Archive** | 99,99% | Standard 12 giờ / Bulk 48 giờ | **180 ngày** | **Rẻ nhất**. Lưu trữ dài hạn 7–10 năm cho compliance, gần như không bao giờ đọc |

Tier ảnh hưởng **availability và chi phí**, **không** ảnh hưởng durability (luôn 11 số 9).

**Feature S3 hay hỏi:**

| Feature | Ghi nhớ |
|---|---|
| **Versioning** | Bật ở mức bucket. Chống **xoá/ghi đè ngoài ý muốn**. File có trước khi bật versioning có version `null` |
| **Lifecycle rules** | Tự chuyển object giữa storage class hoặc xoá theo tuổi |
| **Replication (CRR / SRR)** | **Bắt buộc bật versioning ở cả nguồn và đích.** Copy bất đồng bộ. CRR: compliance, low-latency ở Region khác. SRR: gộp log, đồng bộ prod ↔ test |
| **Bảo mật** | IAM policy (user-based) + **Bucket Policy** (resource-based, cho phép cross-account) + ACL + **Block Public Access** |
| **Object Lock / Glacier Vault Lock** | Mô hình **WORM** (Write Once Read Many), chống xoá trong khoảng thời gian định trước — dùng cho compliance |
| **Static website** | S3 host được website tĩnh. Lỗi **403 Forbidden** → bucket policy chưa cho public read |

### 4.3 Snow Family — chuyển dữ liệu offline

Nguyên tắc: **nếu truyền qua network mất hơn 1 tuần thì dùng Snow.**

| Device | Dung lượng | Migration size | Dùng khi nào |
|---|---|---|---|
| **AWS Snowcone** | 8 TB usable | tới 24 TB (online hoặc offline) | Không gian chật, môi trường khắc nghiệt, edge computing nhỏ. Có thể dùng **AWS DataSync** để gửi online |
| **AWS Snowball Edge** | 80 TB (Storage Optimized) / 42 TB (Compute Optimized) | tới **petabyte**, offline | Migration lớn, decommission data center, DR. Chạy được **EC2 + Lambda** tại edge (IoT Greengrass) |
| **AWS Snowmobile** | 100 PB / xe | tới **exabyte**, offline | Chỉ khi cần chuyển **> 10 PB** |

**Quy tắc chọn:** vài chục–vài trăm TB → **Snowball**; trên 10 PB → **Snowmobile**. Quản lý thiết bị bằng **AWS OpsHub** (app desktop).

### 4.4 Storage Gateway vs Snow Family

| | **Storage Gateway** | **Snow Family** |
|---|---|---|
| Bản chất | **Kết nối hybrid thường trực** giữa on-premises và S3 | **Thiết bị vật lý chuyển dữ liệu một lần** |
| Dùng khi | On-premises app muốn dùng cloud storage qua protocol file chuẩn (NFS/SMB/iSCSI/tape); backup & restore, tiered storage, DR | Migration một lần, băng thông hạn chế |
| Loại | File Gateway, Volume Gateway, Tape Gateway *(không cần nhớ chi tiết cho CCP)* | Snowcone, Snowball Edge, Snowmobile |

---

## 5. Database

### 5.1 Bảng so sánh 8 database service

| Service | Loại | Một câu mô tả | Use case điển hình | Hay bị nhầm với |
|---|---|---|---|---|
| **Amazon RDS** | Relational, **OLTP** | Managed relational DB: MySQL, PostgreSQL, MariaDB, **Oracle**, **SQL Server** | App cần **ACID transaction**, **JOIN**, schema quan hệ; MySQL/SQL Server managed | Chạy DB trên EC2 (self-managed — bạn phải patch OS + engine). **Không SSH được vào RDS** |
| **Amazon Aurora** | Relational, OLTP | RDS "cao cấp": tương thích **MySQL & PostgreSQL**, nhanh hơn MySQL 5x / PostgreSQL 3x, **storage tự tăng tới 64 TB**, tới 15 read replica | Enterprise app cần hiệu năng + HA cao; MySQL "dễ scale" | RDS thường — Aurora đắt hơn ~20% nhưng hiệu quả hơn |
| **Amazon DynamoDB** | **NoSQL** key-value / document, **serverless** | NoSQL fully managed, replicate qua **3 AZ**, latency **single-digit millisecond**, auto scaling | App real-time, IoT, mobile backend, session store; "**fast and reliable NoSQL**" | RDS (DynamoDB **không JOIN**). Tăng tốc đọc thêm bằng **DAX** (in-memory cache cho DynamoDB) |
| **Amazon Redshift** | Data **warehouse**, **OLAP** | Warehouse dùng **columnar storage**, MPP, scale tới petabyte, có SQL interface | **Hợp nhất dữ liệu từ nhiều nguồn** để phân tích, BI với QuickSight/Tableau | RDS (Redshift là OLAP, không phải OLTP) và Athena (Athena query tại chỗ trên S3, không phải kho tập trung) |
| **Amazon ElastiCache** | **In-memory cache** | Managed **Redis / Memcached**, cache query hay dùng để giảm tải DB | "**Most frequently accessed data**", "**sub-millisecond latency**", leaderboard, session | DynamoDB DAX (chỉ cache cho DynamoDB) |
| **Amazon DocumentDB** | NoSQL document | "Aurora cho **MongoDB**" — document DB tương thích MongoDB, JSON | Content management, catalog, mobile backend | DynamoDB (DocumentDB dành cho workload MongoDB có sẵn) |
| **Amazon Neptune** | **Graph** DB | Graph database managed, lưu tới hàng tỉ quan hệ, query milliseconds | **Social network**, knowledge graph, **fraud detection**, recommendation engine | DocumentDB / DynamoDB |
| **Amazon QLDB** | **Ledger** DB | Ledger bất biến (immutable), **cryptographically verifiable**, xem được toàn bộ history thay đổi | Ghi nhận **giao dịch tài chính**, audit trail theo quy định | **Managed Blockchain** — QLDB **có** authority trung tâm, Managed Blockchain **phi tập trung** (Hyperledger Fabric / Ethereum) |

### 5.2 RDS: Multi-AZ vs Read Replica vs Multi-Region

| | **Multi-AZ** | **Read Replica** | **Multi-Region (Read Replica)** |
|---|---|---|---|
| Mục đích | **High Availability + tự failover** | **Scale read workload** | Disaster recovery + đọc nhanh cho user toàn cầu |
| Cơ chế | Standby ở AZ khác, replication đồng bộ | Bản copy đọc được, replication **bất đồng bộ**, tối đa 5 bản | Read replica ở Region khác |
| Ghi dữ liệu | Chỉ vào primary | Chỉ vào primary | Chỉ vào primary |
| Câu hỏi gợi ý | "automatic failover when primary fails", "higher availability" | "improve read performance" | "recover from a regional outage" |

Cạm bẫy: **"RDS Write Replica" không tồn tại** — nếu thấy trong đáp án thì đó là bẫy.

### 5.3 Analytics & data movement liên quan

| Service | Một câu mô tả | Nhận diện trong đề |
|---|---|---|
| **Amazon Athena** | Serverless, dùng **SQL query trực tiếp dữ liệu trên S3**, pay-per-query ($5/TB scan) | "query data in S3 using standard SQL" |
| **Amazon EMR** | Managed cluster chạy **Hadoop / Apache Spark / Hive** trên hàng trăm EC2 | "run and scale Apache Spark, Hadoop and other Big Data frameworks" |
| **Amazon QuickSight** | BI serverless, dashboard & visualization, pay-per-session | "interactive dashboards", "business insights" |
| **AWS Glue** | **ETL** serverless + Glue Data Catalog | "automate ETL jobs", "prepare and transform data" |
| **AWS DMS** | **Database Migration Service** — migrate DB lên AWS, **source vẫn hoạt động trong lúc migrate** | "migrate Oracle/MySQL database to AWS without impacting the source" |
| **AWS Application Migration Service / SMS** | Migrate **server / workload** (không phải DB) lên AWS | "migrate a large number of on-premises workloads" |

**Bẫy hay gặp:** DMS = migrate **database**; Application Migration Service (trước là Server Migration Service) = migrate **server**.

---

## 6. Compute khác

| Service | Là gì | Dùng khi nào | Serverless? | Hay bị nhầm với |
|---|---|---|---|---|
| **EC2** | Virtual server thuê theo giờ/giây | Cần **toàn quyền kiểm soát OS**, chạy DB/software tự cài, license riêng | ❌ | Lambda (EC2 chạy liên tục, Lambda chạy theo event) |
| **AWS Lambda** | **Function as a Service** — chạy code không cần server, **tối đa 15 phút** mỗi lần chạy | Event-driven: tạo thumbnail khi upload S3, serverless cron, backend API cùng API Gateway | ✅ | Batch (Lambda ngắn/event-driven, Batch dài/batch job). Tính tiền theo **số request × thời gian chạy × RAM** |
| **Amazon ECS** | Container orchestration cho Docker | Chạy container trên AWS. **Launch type EC2** = bạn quản lý cluster (khi cần visibility/control cho compliance); **launch type Fargate** = serverless | ❌ (EC2 mode) | Fargate |
| **AWS Fargate** | Compute engine **serverless cho container**, dùng với ECS/EKS | Chạy container mà **không muốn quản lý EC2 nào cả**, trả theo vCPU + RAM | ✅ | ECS (ECS là orchestrator, Fargate là compute engine) |
| **Amazon ECR** | Private Docker image registry | Lưu Docker image cho ECS/EKS/Fargate dùng | ✅ | Docker Hub (public) |
| **Amazon Lightsail** | Virtual server + storage + DB + networking **giá cố định, dễ dùng** | Người **mới, ít kinh nghiệm cloud**; WordPress/LAMP/Node.js có template sẵn; dev/test | ❌ | EC2 — Lightsail **có HA nhưng KHÔNG có auto scaling**, tích hợp AWS hạn chế |
| **AWS Batch** | Chạy **hàng trăm nghìn batch job**, tự provision EC2/Spot | Job có điểm bắt đầu và kết thúc: render, xử lý ảnh hàng loạt, HPC | ❌ (chạy trên ECS/EC2) | Lambda (Batch chạy được nhiều giờ, Lambda tối đa 15 phút) |
| **AWS Elastic Beanstalk** | **PaaS** — upload code, AWS lo capacity, load balancing, auto scaling, health monitoring | Developer muốn deploy nhanh mà **không cần biết hạ tầng** | ❌ | CloudFormation (xem mục 10) |

**Serverless = không provision/quản lý server.** Nhóm serverless hay xuất hiện trong đề: **Lambda, Fargate, DynamoDB, S3, SQS, SNS, API Gateway, Step Functions, Athena, Aurora Serverless, Glue**. **KHÔNG serverless:** EC2, ECS (EC2 launch type), EMR, Redshift, RDS, Elastic Beanstalk, Elasticsearch/OpenSearch Service, Lightsail.

---

## 7. Networking & VPC

### 7.1 Thành phần cơ bản

| Thành phần | Là gì | Phạm vi |
|---|---|---|
| **VPC** | Virtual network riêng của bạn — **bạn toàn quyền cấu hình** | **Regional** |
| **Subnet** | Chia nhỏ network trong VPC. Public subnet = có route ra IGW; private subnet = không | **Thuộc một AZ** |
| **Route Table** | Quy định đường đi giữa subnet và ra ngoài | Trong VPC |
| **Internet Gateway (IGW)** | Gắn ở **mức VPC**, cho phép traffic internet **đi vào và đi ra** | VPC |
| **NAT Gateway** | Cho instance trong **private subnet đi ra internet** (tải patch, update) nhưng **chặn inbound** từ internet. AWS quản lý, HA trong AZ | Subnet |
| **VPC Flow Logs** | Ghi log thông tin **IP traffic** vào/ra interface (VPC / subnet / ENI), gửi tới S3 hoặc CloudWatch Logs | VPC/subnet/ENI |

**Bẫy:** cần **inbound** internet → **Internet Gateway**. Chỉ cần **outbound** từ private subnet → **NAT Gateway**.

### 7.2 Security Group vs Network ACL — bảng bắt buộc nhớ

| | **Security Group** | **Network ACL (NACL)** |
|---|---|---|
| Hoạt động ở | **Instance / ENI** | **Subnet** |
| Rule | Chỉ **ALLOW** | **ALLOW và DENY** |
| Trạng thái | **Stateful** — return traffic tự động được cho phép | **Stateless** — phải khai báo rule cho cả chiều về |
| Đánh giá rule | Xét **tất cả** rule rồi quyết định | Xét **theo số thứ tự** rule |
| Áp dụng | Phải gán vào instance | **Tự động áp cho mọi instance** trong subnet |
| Rule chứa được | IP **và security group khác** | Chỉ **IP** |
| Mặc định | Deny toàn bộ inbound, allow toàn bộ outbound | — |

Khi đề hỏi "audit **inbound and outbound traffic** allowed on EC2 instances" → phải kiểm tra **cả hai**: Security Groups **và** NACL.

### 7.3 Kết nối VPC ↔ VPC và VPC ↔ AWS service

| Feature | Làm gì | Dùng khi nào | Lưu ý |
|---|---|---|---|
| **VPC Peering** | Nối **hai** VPC lại như cùng một network | Cần 2 VPC (cùng hoặc khác account) nói chuyện private | **CIDR không được trùng**; **không transitive** → nhiều VPC thì số kết nối bùng nổ |
| **Transit Gateway** | **Hub routing trung tâm** nối **hàng nghìn** VPC + mạng on-premises | Nhiều VPC / nhiều account cần interconnect, muốn giảm chi phí vận hành | Thay thế mô hình full-mesh peering |
| **VPC Endpoint** | Truy cập AWS service qua **private network** thay vì internet | Tăng bảo mật, giảm latency khi gọi S3/DynamoDB/service khác từ VPC | **Gateway Endpoint**: S3 & DynamoDB. **Interface Endpoint**: các service còn lại |

### 7.4 Direct Connect vs Site-to-Site VPN

| | **AWS Direct Connect (DX)** | **Site-to-Site VPN** |
|---|---|---|
| Đường truyền | **Kết nối vật lý private** (cần ISP + colocation facility) | Tunnel **qua public internet**, tự động mã hoá |
| Băng thông / độ ổn định | Cao, **consistent/dedicated** | Phụ thuộc internet, không đảm bảo |
| Thời gian thiết lập | **Ít nhất một tháng** | Vài phút–vài giờ |
| Thành phần cần có | Cross-connect tại colocation | **Customer Gateway (CGW)** phía on-premises + **Virtual Private Gateway (VGW)** phía AWS |
| Chọn khi đề nói | "dedicated", "consistent", "private", "low-latency", "large data sets every day" | "encrypted connection over the internet", "quick to set up", "cheaper" |

Các service **hybrid** hay xuất hiện chung nhóm: **Direct Connect, AWS VPN, Storage Gateway, Outposts, Systems Manager, CodeDeploy, OpsWorks, DataSync**.

---

## 8. Monitoring

### 8.1 CloudWatch vs CloudTrail vs AWS Config vs X-Ray — bảng phân biệt then chốt

| | **Amazon CloudWatch** | **AWS CloudTrail** | **AWS Config** | **AWS X-Ray** |
|---|---|---|---|---|
| Trả lời câu hỏi | **"Hệ thống đang chạy thế nào?"** | **"AI đã làm GÌ, KHI NÀO?"** | **"Cấu hình resource đã thay đổi ra sao? Có compliant không?"** | **"Request chậm ở ĐÂU?"** |
| Ghi lại | **Metric** (CPU, network, disk), **Log**, Alarm, Event/EventBridge | **API call** từ Console, CLI, SDK, AWS service | **Lịch sử cấu hình** của resource + đánh giá theo **Config rule** | **Trace** request qua các thành phần |
| Dùng khi | Theo dõi CPU > 60%, billing alarm, gom log từ EC2/Lambda, auto scaling trigger | Điều tra "ai terminate EC2", audit, compliance | Audit change management, phát hiện resource non-compliant, remediation | Tìm bottleneck hiệu năng, hiểu dependency microservice |
| Bật sẵn? | Metric cơ bản có sẵn (EC2 mỗi **5 phút**; Detailed Monitoring **1 phút**, có phí) | **Bật mặc định**, lưu 90 ngày trong CloudTrail | Phải bật | Phải instrument app |
| Log EC2 vào đâu | **Phải cài CloudWatch agent** mới push log OS/app lên | — | — | — |

Ba câu hỏi gợi nhớ:
- **"Who did this?"** → CloudTrail
- **"How much / how fast / alert me"** → CloudWatch
- **"What changed in the configuration?"** → AWS Config

### 8.2 Bổ trợ

| Service | Ghi nhớ |
|---|---|
| **CloudWatch Alarm** | Metric vượt ngưỡng → gửi **SNS**, hoặc EC2 action (stop/terminate/reboot/recover), hoặc trigger auto scaling. State: `OK` / `INSUFFICIENT_DATA` / `ALARM` |
| **CloudWatch Logs** | Gom log từ EC2 (qua agent), Lambda, ECS, Beanstalk, CloudTrail, Route 53. **Retention điều chỉnh được**, **không miễn phí** |
| **EventBridge (CloudWatch Events)** | Phản ứng với event trong AWS hoặc chạy theo schedule (cron) → trigger Lambda/SQS/SNS |
| **CloudTrail Insights** | Tự phát hiện hoạt động bất thường (burst IAM action, provisioning lạ) |
| **Lưu CloudTrail > 90 ngày** | Gửi log sang **S3** và phân tích bằng **Athena** |
| **Service Health Dashboard** | Tình trạng **tất cả** AWS service ở tất cả Region (status.aws.amazon.com) — công khai |
| **Personal Health Dashboard** | View **cá nhân hoá**: event nào của AWS ảnh hưởng **tài nguyên của bạn**, kèm remediation guidance và thông báo về thay đổi có lịch trước |
| **CodeGuru** | Reviewer: code review tự động (static analysis). Profiler: hiệu năng lúc runtime |

---

## 9. Application Integration

### 9.1 Bảng so sánh 6 service

| Service | Mô hình | Một câu mô tả | Dùng khi nào | Hay bị nhầm với |
|---|---|---|---|---|
| **Amazon SQS** | **Queue** (point-to-point) | Message queue managed: producer gửi, **consumer đọc rồi message bị xoá**. Standard (throughput không giới hạn) và **FIFO** (đúng thứ tự) | **Decouple** hai component, làm đệm khi có spike, cần xử lý **theo thứ tự FIFO**. Message giữ mặc định 4 ngày, tối đa **14 ngày** | SNS — SQS là **1 message → 1 consumer xử lý**, có lưu trữ |
| **Amazon SNS** | **Pub/Sub** (fan-out) | Publisher gửi 1 message vào **topic**, **tất cả** subscriber đều nhận | Gửi **thông báo** tới nhiều đích: email, **SMS**, Lambda, SQS, HTTP, mobile push; đích của CloudWatch Alarm | SQS — SNS **không lưu message**, không đảm bảo thứ tự tiêu thụ. SES chỉ gửi **email** |
| **Amazon Kinesis** | **Streaming** | Thu thập & phân tích **dữ liệu streaming real-time** ở mọi quy mô | Clickstream, log real-time, IoT telemetry, **Kinesis Video Streams** cho video | SQS — Kinesis là stream (nhiều consumer đọc lại được), SQS là queue |
| **Amazon MQ** | Message broker truyền thống | **Managed Apache ActiveMQ / RabbitMQ**, hỗ trợ protocol mở: **MQTT, AMQP, STOMP, Openwire, WSS** | **Migrate ứng dụng on-premises** đang dùng message broker mà **không muốn viết lại** code sang SQS/SNS | SQS/SNS — Amazon MQ chạy trên **máy dedicated, KHÔNG serverless**, scale kém hơn |
| **Amazon API Gateway** | API front door | Tạo, publish, monitor REST/HTTP/WebSocket API; có throttling, caching, authorization, API key | Expose **Lambda** thành HTTP API → kiến trúc serverless hoàn chỉnh | ELB — API Gateway ở tầng API, serverless |
| **AWS Step Functions** | Orchestration | Điều phối nhiều bước thành **workflow** trực quan (state machine), serverless | Quy trình nghiệp vụ nhiều bước, có retry / rẽ nhánh / chờ | Thuộc nhóm **serverless platform** cùng DynamoDB, SNS, Lambda |

### 9.2 Vì sao phải decouple

Design principle của AWS: **Loose coupling / Decouple your components.** Lợi ích: một component lỗi **không làm sập** cả hệ thống, và sửa/thay từng component **không ảnh hưởng** component khác. Ngược lại của nó là **monolithic / tightly coupled**. Công cụ thực hiện: **SQS, SNS, Kinesis, ELB, API Gateway**.

---

## 10. Deployment & IaC

### 10.1 CloudFormation vs Elastic Beanstalk

| | **AWS CloudFormation** | **AWS Elastic Beanstalk** |
|---|---|---|
| Là gì | **Infrastructure as Code** — mô tả hạ tầng bằng template **JSON/YAML** | **Platform as a Service** — upload code, AWS dựng sẵn ALB + EC2 + ASG + RDS |
| Mức kiểm soát | Kiểm soát chi tiết từng resource | Trừu tượng hoá hạ tầng, cấu hình giới hạn |
| Dùng khi | Kiến trúc phức tạp, cần **lặp lại y hệt** qua nhiều Region/Account | Developer chỉ muốn deploy app nhanh, **ít kinh nghiệm cloud** |
| Câu hỏi gợi ý | "model your entire infrastructure in a text file", "manage infrastructure as code", "reuse the same template" | "quickly deploy and manage his application", "handles capacity provisioning, load balancing, auto scaling and health monitoring" |
| Quan hệ | Beanstalk dùng CloudFormation ở bên dưới | Miễn phí, chỉ trả tiền resource bên dưới |

### 10.2 Các service deployment/management khác

| Service | Một câu mô tả | Nhận diện trong đề |
|---|---|---|
| **AWS OpsWorks** | **Managed Chef & Puppet** để cấu hình EC2 / on-premises VM | Thấy chữ **"Chef"** hoặc **"Puppet"** → OpsWorks, gần như luôn đúng |
| **AWS Systems Manager (SSM)** | Quản lý EC2 + on-premises ở quy mô lớn: **patch automation**, run command, Parameter Store, **Session Manager** (shell không cần SSH/port 22) | "automate database patching according to a schedule", "manage at scale" |
| **AWS CodeCommit** | Git repository private — **version control** | "privately store and manage versions of source code" |
| **AWS CodeBuild** | Compile code + chạy test, serverless | "compile and test their code" |
| **AWS CodeDeploy** | Deploy application lên **EC2 và server on-premises** (hybrid) | "deploy applications to any AWS or on-premises server" |
| **AWS CodePipeline** | Orchestration CI/CD: Code → Build → Test → Deploy | "automate the release process" |
| **AWS CodeArtifact** | Lưu package/dependency (Maven, npm, pip, NuGet...) | "artifact management" |
| **AWS CodeStar** | UI thống nhất để dựng nhanh toàn bộ chuỗi CI/CD | "unified UI for software development" |
| **AWS Cloud9** | **Cloud IDE** viết/chạy/debug code trên browser | "cloud IDE", "pair programming" |
| **AWS CDK** | Định nghĩa hạ tầng bằng **ngôn ngữ lập trình** (TypeScript, Python...) rồi sinh ra CloudFormation | "define cloud infrastructure using a programming language" |
| **AWS Quick Start** | Reference deployment sẵn cho giải pháp IT phổ biến (vd IBM MQ, SAP) | "rapidly deploy a popular IT solution", "least amount of effort and time" |
| **AWS Control Tower** | Dựng và quản lý môi trường **multi-account** well-architected dễ nhất | "easiest way to set up a secure, multi-account AWS environment" |
| **AWS Elastic Disaster Recovery / CloudEndure DR** | Nhân bản môi trường sang Region khác, standby **sẵn sàng trong vài phút** | "mirror image in another Region", "standby available in minutes" |
| **AWS Backup** | Quản lý backup tập trung cho nhiều service | "centrally manage backups" |

---

## 11. Machine Learning

Với CCP chỉ cần nhớ **một dòng mỗi service** — đề luôn hỏi dạng "cần làm X, dùng service nào".

| Service | Một câu mô tả | Từ khoá nhận diện | Hay bị nhầm với |
|---|---|---|---|
| **Amazon Rekognition** | Nhận diện **object, người, text, khuôn mặt, scene** trong **ảnh và video** | "facial recognition", "photo tagging", "detect objects in pictures", "content moderation" | Textract (Rekognition cho ảnh/video tự nhiên, Textract cho tài liệu scan) |
| **Amazon Transcribe** | **Speech → text** (ASR) | "transcribe customer service calls", "closed captioning", "subtitles" | Polly (chiều ngược lại) |
| **Amazon Polly** | **Text → speech** giọng như người thật | "talking application", "text to lifelike speech" | Transcribe |
| **Amazon Translate** | **Dịch** ngôn ngữ tự nhiên, chính xác | "translate content for international users", "localize" | Comprehend |
| **Amazon Lex** | Xây **chatbot / call center bot** (công nghệ đằng sau Alexa) — ASR + NLU nhận intent | "build chatbots", "conversational interface" | Amazon **Connect** (Connect là **cloud contact center** thật, không phải bot) |
| **Amazon Comprehend** | **NLP**: nhận diện ngôn ngữ, key phrase, entity, **sentiment**, chủ đề trong văn bản | "find insights and relationships in text", "sentiment analysis" | Translate, Kendra |
| **Amazon SageMaker** | Nền tảng **build / train / deploy ML model** của riêng bạn | "developers and data scientists build ML models" | Các service AI có sẵn (Rekognition, Comprehend...) — SageMaker là khi bạn **tự** làm model |
| **Amazon Textract** | Trích xuất **text, chữ viết tay và dữ liệu** từ **tài liệu scan / PDF** | "extract data from scanned documents", "invoices", "tax forms", "ID documents" | Rekognition |
| **Amazon Forecast** | **Dự báo** bằng ML dựa trên dữ liệu chuỗi thời gian | "predict future sales", "demand planning", "financial planning" | QuickSight (BI, không dự báo ML) |
| **Amazon Kendra** | **Search engine tài liệu** dùng ML, hỏi bằng ngôn ngữ tự nhiên | "document search service", "natural language search over PDFs/FAQs" | Athena / CloudSearch |
| **Amazon Personalize** | **Gợi ý cá nhân hoá real-time** | "product recommendations", "customized direct marketing" | Forecast |

Hai service không phải ML nhưng hay nằm chung đáp án: **Amazon Connect** (cloud contact center) và **Amazon Elastic Transcoder** (chuyển đổi **format media** cho thiết bị di động).

---

## Câu hỏi hay bẫy

Đây là danh sách các bẫy xuất hiện lặp lại trong 23 practice exam. Đọc lại phần này **ngay trước khi làm Gate Quiz** và **ngay trước khi thi thật**.

### Nhóm bẫy trong roadmap

| Bẫy | Sự thật |
|---|---|
| CloudFront dùng AZ / Region? | ❌ **CloudFront dùng Edge Locations** (points of presence). AZ và Region là bẫy phổ biến nhất của cả domain 3 |
| Horizontal vs Vertical scaling | **Horizontal = thêm instance** (scale out/in). **Vertical = upgrade instance lớn hơn / thêm RAM** (scale up/down) |
| ElastiCache dùng để làm gì? | **Cache dữ liệu truy cập thường xuyên** trong bộ nhớ (in-memory) → giảm tải DB, latency sub-millisecond |
| Spot Instances | Rẻ nhất (**tới 90%**) nhưng **có thể bị terminate bất kỳ lúc nào** → chỉ dùng cho batch / workload flexible, fault-tolerant. **Không dùng cho database hay job critical** |
| On-Demand Instances | Dành cho **short-term**, **không cam kết**, và **không bị gián đoạn** |

### Bẫy về Global Infrastructure

| Nhầm | Đúng |
|---|---|
| "AZ chứa Edge Location" hoặc "Edge Location là một AZ" | **Region chứa AZ**; Edge Location là hạ tầng riêng, nhiều hơn AZ |
| Backup ở "another Availability Zone" cho DR địa lý | Muốn chống thảm hoạ cả vùng địa lý → **another Region** |
| High availability chỉ cần 1 AZ | Cần **tối thiểu 2 AZ** |
| "Deploy multiple AZ + Edge locations" cho highest availability | Highest availability = **multiple Regions + multiple AZ** |
| Route 53 phân phối nội dung | Route 53 chỉ làm **DNS + routing + health check**; phân phối nội dung là CloudFront |

### Bẫy về Compute & Pricing

| Nhầm | Đúng |
|---|---|
| Standard RI đổi được instance type | ❌ Chỉ **Convertible RI** đổi được. Ngược lại, **chỉ Standard RI bán lại được** trên RI Marketplace |
| Dedicated Instances = Dedicated Hosts | **Dedicated Hosts** = thuê nguyên physical server, **kiểm soát instance placement** → dùng được **BYOL** theo socket/core. **Dedicated Instances** = hardware riêng nhưng **không kiểm soát placement** |
| "Bid to get the lowest price" là Spot hiện đại | Spot hiện nay là **max price**, không còn cơ chế đấu giá thủ công; đáp án đúng thường là "**pay upfront to get lower hourly costs**" |
| Stop instance vẫn bị tính tiền compute | **Stop** → dừng tính tiền compute (vẫn trả tiền EBS). **Terminate** → mất luôn instance. Câu "giảm chi phí dev environment khi không dùng" → **Stopping the instances** |
| Lambda tính tiền theo storage / số version | Lambda tính theo **số request** và **thời gian chạy × RAM** |
| Lightsail có auto scaling | ❌ Lightsail **có HA nhưng không có auto scaling** |
| Capacity Reservations có discount | ❌ Trả **giá On-Demand** dù có chạy instance hay không |

### Bẫy về Storage

| Nhầm | Đúng |
|---|---|
| Glacier lấy dữ liệu ngay được | ❌ Glacier (Flexible/Deep Archive) **không** retrieval tức thì. Cần **"immediate retrieval + rẻ"** → **S3 Standard-IA**. Cần rẻ nhất và chấp nhận chờ → **Deep Archive** |
| Storage class khác nhau thì durability khác nhau | ❌ **Durability luôn 11 số 9** ở mọi class; chỉ **availability và chi phí** khác nhau |
| Intelligent-Tiering luôn tiết kiệm nhất | ❌ Chỉ tiết kiệm khi **access pattern thay đổi**. Pattern ổn định và truy cập nhiều → **S3 Standard** |
| Instance Store persistent | ❌ **Ephemeral** — mất dữ liệu khi instance **stop hoặc terminate** |
| EBS mount được nhiều EC2 | ❌ EBS gắn **1 instance tại một thời điểm** và bị **khoá trong 1 AZ**. Cần shared cho nhiều instance → **EFS** |
| S3 chạy được application/backend | ❌ S3 chỉ là object storage (host được **static** website, không chạy backend) |
| Snowmobile cho vài trăm TB | ❌ Snowmobile là **exabyte-scale** (>10 PB). 200–500 TB → **Snowball** |
| Storage Gateway = Snowball | ❌ Storage Gateway là **kết nối hybrid thường trực**; Snowball là **thiết bị chuyển dữ liệu một lần** |
| S3 Replication không cần versioning | ❌ **Bắt buộc bật versioning ở cả bucket nguồn và đích** |

### Bẫy về Database

| Nhầm | Đúng |
|---|---|
| RDS hỗ trợ Teradata / MongoDB | ❌ RDS chỉ có **MySQL, PostgreSQL, MariaDB, Oracle, SQL Server**. MongoDB → **DocumentDB** |
| "RDS Write Replica" | ❌ Không tồn tại. Failover tự động = **Multi-AZ**; scale đọc = **Read Replica** |
| Read Replica dùng cho high availability | ❌ Read Replica để **scale read**; HA + auto failover là **Multi-AZ** |
| DynamoDB hỗ trợ JOIN / complex transaction | ❌ Cần JOIN và transaction phức tạp → **RDS/Aurora** (relational) |
| Redshift là OLTP database | ❌ Redshift là **data warehouse (OLAP)**. Athena query trên S3, không phải warehouse |
| Chạy MySQL trên EC2 là managed database | ❌ Đó là **self-managed** (bạn patch OS + engine). Managed = RDS, Aurora, DynamoDB, Neptune, DocumentDB, Redshift, ElastiCache |
| QLDB = Managed Blockchain | QLDB **có** authority trung tâm (ledger cho tài chính); Managed Blockchain **phi tập trung** |

### Bẫy về Networking

| Nhầm | Đúng |
|---|---|
| NAT Gateway cho phép inbound internet | ❌ NAT chỉ cho **outbound** từ private subnet. Inbound → **Internet Gateway** |
| Security Group có DENY rule | ❌ SG chỉ có **ALLOW** và là **stateful**. NACL có cả **ALLOW/DENY** và là **stateless** |
| Security Group hoạt động ở subnet | ❌ SG ở **instance/ENI**; NACL ở **subnet** |
| VPC Peering là transitive | ❌ Không transitive, và **CIDR không được trùng**. Nhiều VPC → dùng **Transit Gateway** |
| VPN nhanh và ổn định như Direct Connect | ❌ VPN đi qua **public internet**. "Consistent / dedicated / private" → **Direct Connect** (mất ≥1 tháng để thiết lập) |
| Site-to-Site VPN cần Internet Gateway | ❌ Cần **Customer Gateway** (on-prem) + **Virtual Private Gateway** (AWS) |
| VPC Endpoint nối 2 VPC | ❌ VPC Endpoint để truy cập **AWS service** qua private network. Nối 2 VPC → **VPC Peering** |
| AWS chịu trách nhiệm cấu hình VPC | ❌ **Khách hàng toàn quyền và toàn trách nhiệm** cấu hình VPC |

### Bẫy về Monitoring & Integration

| Nhầm | Đúng |
|---|---|
| CloudWatch cho biết **ai** đã xoá resource | ❌ Đó là **CloudTrail**. CloudWatch chỉ có metric/log/alarm |
| AWS Config có ngưỡng CPU | ❌ Ngưỡng metric là **CloudWatch Alarm**. Config theo dõi **cấu hình** resource |
| CloudTrail chưa bật thì không có log | CloudTrail **bật mặc định**, lưu **90 ngày**; muốn lâu hơn → gửi S3 + query bằng **Athena** |
| Log EC2 tự động vào CloudWatch | ❌ Phải **cài CloudWatch agent** trên EC2 |
| Service Health Dashboard = Personal Health Dashboard | Service Health = trạng thái **toàn bộ** AWS. **Personal** Health = event ảnh hưởng **tài nguyên của bạn** |
| SNS lưu message như queue | ❌ SNS **không lưu** message (pub/sub, fan-out). Cần lưu + đúng thứ tự → **SQS (FIFO)** |
| Migrate app dùng MQTT/AMQP thì viết lại sang SQS | Không cần — dùng **Amazon MQ** (managed ActiveMQ/RabbitMQ, không serverless) |
| Trusted Advisor thay được AWS Config | Trusted Advisor = bộ **check khuyến nghị** cố định (cost, performance, security, fault tolerance, service limits). Config = **audit cấu hình theo rule** |

---

## Checklist trước khi làm Gate Quiz

- [ ] Đọc kỹ bảng **Region vs AZ vs Edge Location vs Local Zone vs Outposts** (mục 1.1)
- [ ] Nhớ được **cây quyết định EC2 purchasing options** (mục 2.2)
- [ ] Phân biệt được **S3 / EBS / EFS / Instance Store** chỉ trong một câu (mục 4.1)
- [ ] Nhớ storage class nào **retrieval tức thì**, class nào phải chờ (mục 4.2)
- [ ] Phân biệt **RDS / Aurora / DynamoDB / Redshift / ElastiCache** và biết Multi-AZ ≠ Read Replica (mục 5)
- [ ] Đọc lại bảng **Security Group vs NACL** (mục 7.2) và **Direct Connect vs VPN** (mục 7.4)
- [ ] Trả lời được 4 câu: "Ai làm?" / "Nhanh chậm thế nào?" / "Cấu hình đổi gì?" / "Chậm ở đâu?" (mục 8.1)
- [ ] Đọc hết mục **Câu hỏi hay bẫy** một lượt

Sau đó: làm `02-practice-questions.md` (73 câu) → chấm → ôn phần sai → làm `03-gate-quiz.md` (30 câu, 45 phút, cần ≥24).
