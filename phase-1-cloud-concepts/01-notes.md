# Phase 1 — Cloud Concepts (Domain 1, 24% đề thi)

> **Thời lượng đọc mục tiêu:** ~90 phút.
> **Nguồn:** `sections/cloud_computing.md` + `sections/architecting_and_ecosystem.md` (repo kananinirav).
> **Domain 1 gồm 4 nhóm nhiệm vụ:** (1) Value proposition của AWS Cloud, (2) Design principles / Well-Architected, (3) Migration & CAF, (4) Cloud economics.

---

## 1. Cloud Computing là gì?

Cloud computing là việc **cung cấp theo yêu cầu (on-demand)** compute power, database storage, application và các tài nguyên IT khác qua một nền tảng dịch vụ cloud, với mô hình giá **pay-as-you-go**.

Điểm cốt lõi cần nhớ cho đề thi:

- Provision **đúng loại và đúng kích thước** tài nguyên bạn cần.
- Truy cập **bao nhiêu tài nguyên cũng được, gần như ngay lập tức**.
- AWS **sở hữu và bảo trì phần cứng**; bạn chỉ provision và sử dụng qua web/API.

### 5 đặc tính (Five Characteristics) của Cloud Computing

| # | Đặc tính | Ý nghĩa |
|---|---|---|
| 1 | **On-demand self-service** | Tự provision tài nguyên khi cần, không cần xin phép ai |
| 2 | **Broad network access** | Truy cập qua network bằng cơ chế tiêu chuẩn |
| 3 | **Resource pooling** | Multi-tenant: nhiều khách hàng dùng chung pool tài nguyên |
| 4 | **Rapid elasticity** | Scale up/down nhanh chóng |
| 5 | **Measured service** | Đo lường mức dùng và tính tiền theo đó |

### 6 lợi thế (Six Advantages) của Cloud Computing

1. **Cost Savings** — chỉ trả cho compute/storage bạn thực dùng.
2. **Speed and Agility** — triển khai dịch vụ trong vài phút.
3. **Scalability** — scale lên/xuống dễ dàng.
4. **High Availability** — kiến trúc HA cho business continuity.
5. **Global Reach** — phục vụ user ở bất kỳ khu vực địa lý nào.
6. **Security** — AWS cung cấp năng lực bảo mật mạnh.

> Cách nhớ khác (theo AWS whitepaper, hay xuất hiện trong đề): *Trade CapEx for variable expense · Benefit from massive economies of scale · Stop guessing capacity · Increase speed and agility · Stop spending money running and maintaining data centers · Go global in minutes.*

### Vấn đề mà Cloud giải quyết

| Vấn đề của IT truyền thống | Cách Cloud giải quyết |
|---|---|
| Chi phí đầu tư ban đầu (upfront) rất lớn | Pay-as-you-go, không cần mua trước |
| Giới hạn khả năng scale | Dynamic scaling theo nhu cầu thực |
| Hạ tầng chỉ có ở 1 nơi | Global infrastructure hỗ trợ workload toàn cầu |

---

## 2. Deployment Models — Private / Public / Hybrid

| | **Private Cloud** | **Public Cloud** | **Hybrid Cloud** |
|---|---|---|---|
| Định nghĩa | Cloud dùng bởi **một tổ chức duy nhất**, không mở cho public | Tài nguyên do **nhà cung cấp thứ ba** sở hữu & vận hành, giao qua Internet | Giữ **một phần server on-premises**, mở rộng phần còn lại lên cloud |
| Kiểm soát | Toàn quyền với data, security, compliance | Ít kiểm soát hạ tầng hơn | Kiểm soát linh hoạt theo từng workload |
| Chi phí | Cao (tự sở hữu) | Hiệu quả vì hạ tầng dùng chung | Trung gian |
| Phù hợp cho | Workload sensitive/critical, yêu cầu compliance đặc biệt | Workload cần scale & HA cao, ít sensitive | Business continuity, DR, backup, migration dần |
| Bảo trì | Bạn tự làm | Nhà cung cấp làm hết | Chia đôi |

> **Bẫy thường gặp:** đề mô tả "kết nối hạ tầng và ứng dụng giữa tài nguyên cloud và tài nguyên **không nằm** trên cloud" → đáp án là **Hybrid**. Còn "loại bỏ hoàn toàn nhu cầu vận hành & bảo trì data center vật lý" → đáp án là **Cloud** (public cloud), **không phải** IaaS/PaaS (đó là *service models*, không phải *deployment models*).

---

## 3. Cloud Service Models — IaaS / PaaS / SaaS

| | **IaaS** (Infrastructure as a Service) | **PaaS** (Platform as a Service) | **SaaS** (Software as a Service) |
|---|---|---|---|
| Cung cấp | Tài nguyên compute ảo hóa qua Internet | Nền tảng để develop / run / manage app | Ứng dụng hoàn chỉnh qua Internet, thường theo subscription |
| Mức kiểm soát | **Cao nhất** — kiểm soát OS, middleware, runtime | Trung bình — chỉ quan tâm code, không quản hạ tầng | Thấp nhất — chỉ dùng app |
| Bạn quản lý | OS, patch, app, data, network config | App + data | Chỉ data & user của bạn |
| Ví dụ AWS | **EC2** | **Elastic Beanstalk** | **Amazon Chime** |
| Ví dụ ngoài AWS | GCP, Azure, Rackspace, DigitalOcean, Linode | Heroku, Google App Engine, Windows Azure | Gmail, Dropbox, Zoom |

**Ba điều PHẢI nhớ:**

1. **EC2 = IaaS** (không phải PaaS). EC2 là dịch vụ cho bạn **mức kiểm soát cao nhất** trên hạ tầng ảo bên dưới.
2. **Elastic Beanstalk = PaaS**.
3. **NaaS (Networking as a Service) KHÔNG phải** một trong các cloud computing model của AWS — đây là distractor kinh điển.

---

## 4. AWS Global Infrastructure (mức Domain 1)

| Thành phần | Định nghĩa | Ghi chú thi |
|---|---|---|
| **Region** | Khu vực địa lý tách biệt, mỗi Region có **nhiều AZ** | Chọn Region theo: **Latency · Compliance · Services available · Pricing** |
| **Availability Zone (AZ)** | Một hoặc nhiều data center riêng biệt, **điện/cooling/networking độc lập**, trong cùng Region | Nối với nhau bằng link **high-bandwidth, ultra-low latency** |
| **Edge Location / Point of Presence** | Điểm phân phối nội dung gần end user | Dùng bởi **CloudFront** và **Global Accelerator** |

**Tại sao mỗi Region có nhiều AZ?** → Để bạn xây kiến trúc **resilient và highly available** (không phải để rẻ hơn, không phải để tăng dung lượng storage).

**Bậc thang high availability (rất hay ra đề):**

| Mục tiêu | Cách làm |
|---|---|
| Fault tolerance / HA cơ bản | Deploy trên **≥ 2 AZ** (tối thiểu 2, không phải 1) |
| **Highest level of availability** | Deploy trên **nhiều Region VÀ nhiều AZ** |
| Chống thảm họa tự nhiên, không chấp nhận downtime | Deploy sang **Region khác** + chiến lược **Active-Active DR** |
| Giảm latency cho user ở lục địa khác | Deploy EC2 ở **Region gần user đó** (hoặc dùng CloudFront cho content) |

---

## 5. Value Proposition — thuật ngữ dễ lẫn nhau

Đây là nhóm câu hỏi "chọn tính chất đúng tên" mà đề thi CLF-C02 rất thích.

| Thuật ngữ | Định nghĩa chuẩn | Từ khóa trong đề |
|---|---|---|
| **Scalability** | Khả năng tăng capacity để đáp ứng tải lớn hơn (thủ công hoặc tự động) | "handle increased load", "grow" |
| **Elasticity** | **Tự động** provision/giải phóng tài nguyên **theo thay đổi của demand** | "automatically", "based on changes in demand", "scale in AND out" |
| **Agility** | Provision tài nguyên **trong vài phút**, thử nghiệm nhanh, giảm time-to-market | "in minutes", "experiment", "innovate faster" |
| **High Availability** | Hệ thống vẫn phục vụ được khi có thành phần lỗi | "stays up", "multiple AZs" |
| **Fault Tolerance** | Hệ thống **chịu được lỗi** của component mà **không ảnh hưởng user** | "instances crashed but no customer affected" |
| **Reliability** | Khả năng **phục hồi nhanh sau lỗi** + tự provision tài nguyên đáp ứng demand | "recover quickly from failures" |
| **Global Reach** | Phục vụ user quốc tế với latency thấp nhờ hạ tầng toàn cầu | "international users complaining of high latency" |
| **Economy of scale** | AWS mua với quy mô cực lớn → giá thấp hơn → **giảm giá định kỳ** cho khách | "periodic price reductions" |
| **Durability** | Xác suất data không bị mất (S3: 11 số 9) | "data loss", "durability" |

### Vertical vs Horizontal scaling

| | **Vertical scaling (scale up)** | **Horizontal scaling (scale out)** |
|---|---|---|
| Cách làm | Nâng cấp instance hiện tại lên loại lớn hơn, thêm RAM/CPU | **Thêm nhiều instance cùng size** |
| Từ khóa | "replacing with a larger instance", "increase compute capacity of a single instance" | "adding more EC2 instances of the same size" |
| Ưu tiên của AWS | Không phải best practice cho HA | **Được khuyến nghị** — "scale horizontally to increase availability" |

---

## 6. AWS Well-Architected Framework — 6 Pillars

| # | Pillar | Pillar này nói về gì | Design principles chính |
|---|---|---|---|
| 1 | **Operational Excellence** | Khả năng **run và monitor** hệ thống để tạo business value, và **cải tiến process/procedure** hỗ trợ | Perform operations as code (IaC) · Tự động sinh documentation · Thay đổi nhỏ, thường xuyên, có thể rollback · Tinh chỉnh operations procedure thường xuyên · Anticipate failure · Học từ mọi operational failure |
| 2 | **Security** | Bảo vệ information, systems và assets thông qua đánh giá & giảm thiểu rủi ro | Strong identity foundation (least privilege, IAM) · Enable traceability · Apply security at all layers · Automate security best practices · Protect data in transit & at rest · Keep people away from data · Prepare for security events |
| 3 | **Reliability** | Khả năng **phục hồi sau disruption**, tự động lấy thêm tài nguyên, giảm thiểu misconfiguration / lỗi network tạm thời | Test recovery procedures · Automatically recover from failure · **Scale horizontally** to increase availability · **Stop guessing capacity** (dùng Auto Scaling) · Manage change with automation |
| 4 | **Performance Efficiency** | Dùng compute resource **hiệu quả** để đáp ứng yêu cầu, và giữ hiệu quả đó khi demand đổi | Democratize advanced technologies · **Go global in minutes** (multi-region) · **Use serverless architectures** · Experiment frequently · Mechanical sympathy (biết rõ các service AWS) |
| 5 | **Cost Optimization** | Tạo business value ở **mức giá thấp nhất** | Adopt a consumption model · Measure overall efficiency (CloudWatch) · Stop spending on data center operations · Analyze & attribute expenditure (**tags**) · Dùng managed services để giảm chi phí |
| 6 | **Sustainability** | Giảm thiểu **tác động môi trường** của workload trên cloud | Hiểu impact của bạn · Đặt sustainability goal cho từng workload · **Maximize utilization** (right size) · Adopt công nghệ mới hiệu quả hơn · Dùng managed services · Reduce downstream impact |

**Mẹo phân biệt pillar khi đề hỏi "activity nào thuộc pillar nào":**

| Tình huống trong đề | Pillar |
|---|---|
| Dùng **CloudFormation** để quản hạ tầng dạng code | Operational Excellence (*operations as code*) |
| Monitor hệ thống và cải tiến process | Operational Excellence |
| Chọn **đúng loại compute resource** cho workload | **Performance Efficiency** |
| Deploy multi-AZ / tự phục hồi sau lỗi | Reliability |
| Least privilege, encryption, audit log | Security |
| Tìm tài nguyên underutilized bằng Trusted Advisor | Cost Optimization |
| Right-size để giảm năng lượng tiêu thụ | Sustainability |

### General Guiding Principles của Well-Architected

- **Stop guessing capacity needs.**
- **Test systems at production scale.**
- **Automate** để dễ thử nghiệm kiến trúc.
- Cho phép **evolutionary architectures** khi requirement đổi.
- **Drive architectures using data.**
- Cải thiện qua **game days** (mô phỏng flash sale).

### AWS Well-Architected Tool

- **Miễn phí**. Bạn chọn workload → trả lời câu hỏi → được review theo 6 pillars → nhận advice (video, docs, report, dashboard).

---

## 7. AWS Cloud Best Practices — Design Principles

| Principle | Nội dung | Service AWS liên quan |
|---|---|---|
| **Scalability** | Scale cả vertically và horizontally | Auto Scaling, ELB |
| **Disposable Resources** | Server nên là **disposable**, dễ cấu hình lại — đừng coi server là "pet" cố định | AMI, CloudFormation, Launch Template |
| **Automation** | Dùng serverless, IaC, auto-scaling | Lambda, CloudFormation, ASG |
| **Loose Coupling** | Chia monolith thành component nhỏ, **loosely coupled** để lỗi không lan truyền (cascading failure) | SQS, SNS, ELB |
| **Services, Not Servers** | Dùng managed service / database / serverless thay vì chỉ EC2 | RDS, DynamoDB, Lambda |

**Decoupling / Loose Coupling — định nghĩa để chọn đáp án:**
"Giảm inter-dependencies giữa các component, để **một component lỗi không ảnh hưởng các component khác**, và có thể sửa/nâng cấp một component mà không ảnh hưởng phần còn lại."
→ Service thường dùng để decouple một monolith: **Amazon SQS** (message queue).

**Design for failure — chống Single Point of Failure (SPOF):**
- Dùng **nhiều Availability Zones**.
- Dùng **Elastic Load Balancing** + **Auto Scaling** (bộ đôi hay ra đề nhất: "tự động detect và react với failure").
- Deploy sang **nhiều Region** cho DR mức cao nhất.

---

## 8. Cloud Economics

### CapEx vs OpEx

| | **CapEx** (Capital Expenditure) | **OpEx** (Operating Expenditure) |
|---|---|---|
| Bản chất | Chi phí **đầu tư trước** vào tài sản cố định | Chi phí **vận hành theo mức dùng** |
| Ví dụ | Mua server, xây data center, mua license vĩnh viễn | Hóa đơn AWS hằng tháng theo giờ EC2 / GB S3 |
| Đặc điểm dòng tiền | Fixed cost, phải dự báo capacity trước | **Variable cost**, low, theo thực tế |
| Trên AWS | Giảm mạnh (gần như bằng 0) | Đây là mô hình AWS |

> **Câu chốt của Domain 1:** *"Trade **large capital expenditure** for **low variable expense**."* Nếu đề hỏi lợi ích tài chính của AWS → **Reduced TCO** và **Reduced CapEx / lower OpEx**, **KHÔNG** phải "increased CapEx", không phải "trả sau khi thành công", không phải "hạn mức tín dụng cho startup".

### 3 nguyên tắc pricing nền tảng của AWS

| Nguyên tắc | Nội dung |
|---|---|
| **Compute** | Trả cho compute time đã dùng (EC2 instance hours, Lambda duration) |
| **Storage** | Trả cho lượng data lưu trữ (S3, EBS) |
| **Data Transfer OUT** | Trả cho data đi **ra** khỏi cloud. **Data transfer IN là miễn phí** |

### TCO (Total Cost of Ownership)

Khi so sánh AWS vs on-premises, **phải tính** những khoản on-premises có mà cloud không có:

| Tính vào TCO | Không tính vào TCO |
|---|---|
| **Physical hardware** (server, storage, network) | Market research |
| Facility: điện, cooling, không gian rack | Business analysis |
| Chi phí nhân sự vận hành data center | Application development (không phụ thuộc nơi host) |
| License phần mềm, bảo trì, refresh cycle | Chi phí marketing |

Công cụ liên quan:
- **AWS TCO Calculator / AWS Pricing Calculator** — phân tích cost-benefit khi migrate on-premises → AWS.
- **AWS Migration Evaluator** — đánh giá tiết kiệm khi migrate (kể cả cho người **chưa là khách hàng** AWS).

### Right Sizing

- **Match** instance type & size với yêu cầu performance/capacity của workload ở **chi phí thấp nhất**.
- Cách làm: **bắt đầu nhỏ**, scale lên dễ dàng, **liên tục điều chỉnh** sau khi lên cloud.
- Công cụ hỗ trợ: **CloudWatch**, **Cost Explorer**, **Trusted Advisor**.

### Cách giảm chi phí (câu hỏi "activity nào giảm cost")

- Bật **EC2 Auto Scaling** cho workload → chỉ chạy đúng số instance cần.
- Dùng **serverless** khi có thể.
- **Right sizing** + tắt tài nguyên không dùng.
- Dùng **managed services** (giảm chi phí vận hành, giảm operational complexity).
- **Cost Allocation Tags** để phân bổ và theo dõi chi tiêu → **đừng bao giờ xóa tags** (distractor).

### Lợi ích của Managed Services

| Lợi ích | Giải thích |
|---|---|
| **Lowers operational complexity** | AWS gánh vận hành, patching, backup, scaling |
| **Deliver new solutions faster** | Team tập trung vào business logic |
| Giảm TCO | Không cần nhân sự vận hành hạ tầng |
| Đơn giản hóa patching/updating OS bên dưới | AWS lo phần OS/engine |

Ví dụ **AWS-managed services** (AWS gánh operational + maintenance burden): **DynamoDB**, **Amazon EMR**, RDS, ElastiCache, Lambda, S3.
Ví dụ **KHÔNG** phải managed theo nghĩa này: **EC2** (bạn quản OS), **VPC** và **IAM** (là feature bạn tự cấu hình, không phải service AWS "vận hành thay bạn").

---

## 9. Migration lên AWS

### AWS Cloud Adoption Framework (CAF)

- Framework do **AWS Professional Services** tạo, giúp tổ chức **thiết kế roadmap** để cloud adoption thành công.
- **6 Perspectives:** Business, People, Governance, Platform, Security, Operations.
  - 3 cái đầu (Business, People, Governance) = **business capabilities**.
  - 3 cái sau (Platform, Security, Operations) = **technical capabilities**.

### 7R — Migration strategies

Retire · Retain · Relocate · Rehost (lift-and-shift) · Replatform (lift-tinker-and-shift) · Repurchase (drop-and-shop) · Refactor/Re-architect.

### Công cụ & program migration

| Service / Program | Dùng để |
|---|---|
| **AWS Application Discovery Service** | **Lập kế hoạch** migration: khám phá & inventory server on-premises, dependency, utilization |
| **AWS Migration Hub** | Theo dõi tiến độ migration ở một chỗ |
| **AWS DMS** (Database Migration Service) | Migrate database sang AWS **mà không làm ảnh hưởng chức năng của source database** (source vẫn hoạt động trong lúc migrate) |
| **AWS SMS / Application Migration Service** | Migrate server/VM |
| **AWS MAP** (Migration Acceleration Program) | AWS cung cấp **AWS Partners** + **AWS Professional Services** (+ tooling, incentive) để tăng tốc adoption cho Enterprise |
| **AWS Professional Services / APN Partners** | Khi khách hàng **không có expertise in-house** |

### Snow Family — chọn theo dung lượng

| Service | Dung lượng | Ghi chú thi |
|---|---|---|
| **Snowcone** | ~8–14 TB | Nhỏ, portable |
| **Snowball / Snowball Edge** | ~**Terabyte đến Petabyte** scale | Có **built-in compute** để **xử lý data local (edge computing)**; transfer an toàn lượng lớn data **vào và ra khỏi** AWS |
| **Snowmobile** | **Exabyte-scale** (~100 PB/xe container) | Dùng khi cần chuyển hàng chục **Petabyte** trở lên (ví dụ **60 PB** → chọn **Snowmobile**, không phải Snowball) |
| **S3 Transfer Acceleration** | Không giới hạn nhưng qua Internet | Tăng tốc upload lên S3 qua edge locations — **không phải** thiết bị vật lý |
| **Storage Gateway** | — | **Hybrid** storage giữa on-premises và AWS (đây là distractor của Snowball) |

---

## 10. AWS Ecosystem — tài nguyên và program

| Thứ | Là gì |
|---|---|
| **AWS Quick Start reference deployments** | Deployment **tự động, gold-standard** dựng sẵn (dựa trên CloudFormation) cho các technology phổ biến — ví dụ WordPress, IBM MQ. Dùng khi muốn deploy nhanh nhất, ít công sức nhất |
| **AWS Solutions** | Giải pháp technology đã được kiểm định (ví dụ AWS Landing Zone) |
| **AWS Whitepapers, Blogs, Forums** | Tài nguyên **miễn phí** |
| **AWS Marketplace** | Catalog số của **third-party ISV**: AMI, CloudFormation template, SaaS, container. Chi phí đi thẳng vào **AWS bill**; bạn cũng có thể **bán** giải pháp của mình |
| **APN Consulting Partners** | Công ty **cung cấp dịch vụ** giúp khách hàng **thiết kế/cải thiện kiến trúc** trên AWS (professional services firms, SI, agency, MSP) |
| **APN Technology Partners** | Công ty cung cấp **software/tool** chạy trên hoặc tích hợp với AWS |
| **AWS Professional Services** | Team của **chính AWS**, làm cùng khách hàng và partner |
| **AWS Well-Architected Tool** | Tool miễn phí self-review theo 6 pillars |

> **Bẫy:** đề nói "**một công ty đã tạo ra giải pháp giúp khách hàng AWS cải thiện kiến trúc** — program nào hỗ trợ công ty này?" → **APN Consulting Partners** (công ty đó là *partner*, không phải khách hàng). Nếu là chính bạn thiếu expertise và muốn AWS làm cùng → **AWS Professional Services**.

### AWS Support (mức Domain 1 chỉ cần biết sơ)

| Developer | Business | Enterprise |
|---|---|---|
| Email trong **business hours**, Cloud Support **Associates** | **24x7** phone/email/chat, Cloud Support **Engineers** | Có **Technical Account Manager (TAM)** |
| General guidance < 24 business hours | Production system impaired < 4 giờ | **Concierge Support Team** (billing & account best practices) |
| System impaired < 12 business hours | Production system **down** < 1 giờ | Business-critical system down < **15 phút** |

---

## 11. Câu hỏi hay bẫy (Domain 1)

1. **"NaaS"** không phải cloud computing model của AWS → luôn là đáp án cho câu "cái nào KHÔNG thuộc".
2. **Elasticity vs Scalability vs Agility:** "automatically provisioning tài nguyên **based on changes in demand**" = **Elasticity**. "Provision tài nguyên **trong vài phút**" = **Agility**. "Scale để chịu tải lớn hơn" = Scalability.
3. **Highest level of availability** = **multiple Regions AND multiple AZs**. Nếu đáp án chỉ có "multiple AZs and subnets" hoặc "multiple AZs and Edge locations" thì **sai** — Edge location không dùng để chạy application, subnet nằm trong AZ nên không thêm độ dự phòng.
4. **HA cần tối thiểu 2 AZ**, không phải 1, không bắt buộc 3.
5. **Fault tolerance ≠ Elasticity.** "6 instances, 3 cái crash, khách hàng không bị ảnh hưởng" = **fault tolerant** (không phải elastic, không phải scalable).
6. **Reliability** trong đề = "tự động provision tài nguyên mới đáp ứng demand" + "phục hồi nhanh khỏi failure". Đừng chọn "AWS đền tiền cho khách hàng khi có sự cố" (AWS không làm vậy) hay "tất cả AWS service đều là Global Service" (sai — phần lớn là regional).
7. **"There is no need to worry about security"** là distractor sai kinh điển. Đúng phải là: *"All of the physical security and most of the data/network security are taken care of for you"* — bạn vẫn có phần trách nhiệm.
8. **Horizontal scaling = thêm instance cùng size.** "Thay bằng instance lớn hơn" hoặc "thêm RAM" là **vertical**.
9. **Snowball vs Snowmobile:** hàng chục **PB** trở lên → **Snowmobile**. Snowball là TB→PB và **có compute tại chỗ**.
10. **DMS** là câu trả lời cho "migrate database mà **không ảnh hưởng** source database". **Application Discovery Service** là câu trả lời cho "**lập kế hoạch** migration".
11. **TCO** phải tính **physical hardware** và cost data center; **không** tính application development / market research.
12. **Economies of scale** biểu hiện ở việc AWS **giảm giá định kỳ** — không phải ở việc "có instance type mới" hay "scale up/down khi cần" (cái đó là elasticity).
13. **Managed services**: DynamoDB, EMR, RDS là managed. **EC2, VPC, IAM không** phải câu trả lời cho "AWS gánh operational & maintenance burden".
14. **"Automate wherever possible"** và **"Remove single points of failure"** là design principle đúng. **"Treat servers as fixed resources"** là **sai** (phải là *disposable*). **"Always use Global Services"** cũng sai.
15. **Loose coupling** cho phép sửa một component **mà không ảnh hưởng component khác** — không phải "loại bỏ change management", không phải "cho phép Cross-Region Replication".
16. Region có nhiều AZ là để **resilient/HA**, không phải để rẻ hơn hay tăng storage capacity.
17. **Multiple Regions** là ví dụ của **Global infrastructure** (không phải elasticity, không phải agility).
18. **Data transfer IN miễn phí, OUT tính tiền.** Đề hay đảo ngược.
19. **Đừng xóa Cost Allocation Tags** để giảm cost — tag là công cụ *phân tích* cost, xóa đi không tiết kiệm gì.
20. **Quick Start** = deploy technology phổ biến (IBM MQ, WordPress) **nhanh nhất, ít effort nhất**.

---

## Checklist trước khi làm Gate Quiz

- [ ] Đọc thuộc **6 pillars** và biết mỗi pillar nói về gì
- [ ] Phân biệt được **elasticity / scalability / agility / HA / fault tolerance / reliability / global reach**
- [ ] Biết **IaaS = EC2, PaaS = Beanstalk, SaaS = Chime**, và NaaS không tồn tại
- [ ] Nhớ **5 design principles** (scalability, disposable resources, automation, loose coupling, services-not-servers)
- [ ] Nhớ **CapEx → OpEx**, 3 nguyên tắc pricing, data transfer IN free
- [ ] Nhớ **CAF, MAP, DMS, Application Discovery Service, Snow Family**
- [ ] Nhớ **multi-AZ ≥ 2 cho HA, multi-Region cho highest availability & DR**

➡️ Tiếp theo: `02-practice-questions.md` (46 câu thật từ practice exams), sau đó `03-gate-quiz.md`.
