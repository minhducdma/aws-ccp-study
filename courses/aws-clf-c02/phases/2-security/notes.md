# Phase 2 — Security & Compliance (Domain 2, 30% đề thi)

> **Thời lượng đọc mục tiêu:** ~2 giờ (domain nặng thứ hai của kỳ thi).
> **Domain 2 gồm 4 nhóm nhiệm vụ:** (1) AWS Shared Responsibility Model, (2) Security/compliance concepts & governance, (3) Access management (IAM), (4) Các security component & resource.

---

## 1. AWS Shared Responsibility Model — phần bẫy nhất của kỳ thi

Nguyên tắc một câu:

> **AWS chịu trách nhiệm security *OF* the cloud. Khách hàng chịu trách nhiệm security *IN* the cloud.**

- **Security *OF* the cloud (AWS):** hạ tầng chạy mọi AWS service — hardware, software nền, networking, facility.
- **Security *IN* the cloud (Customer):** mọi thứ bạn *đặt vào* cloud và cách bạn cấu hình nó.
- **Shared controls:** vùng cả hai bên cùng làm, mỗi bên ở lớp của mình.

### 1.1 Bảng phân chia trách nhiệm

| Hạng mục | **AWS (of the cloud)** | **Customer (in the cloud)** | **Shared** |
|---|---|---|---|
| **Physical / Facility** | Physical security data center, access control, environmental controls (điện, cooling, chống cháy), hardware maintenance, **disk disposal / hủy thiết bị lưu trữ hết đời** | — (khách hàng **không** có phần nào) | — |
| **Hạ tầng ảo hóa** | **Hypervisor**, host OS, virtualization layer | — | — |
| **Global network** | Vận hành global network, **DDoS protection ở tầng hạ tầng**, monitoring, securing Regions & Edge Locations | Cấu hình VPC, Security Group, NACL, route table | — |
| **Guest OS & patch** | Patch **hạ tầng bên dưới** | **Patch guest OS và application trên EC2** | **Patch Management** (AWS patch hạ tầng, bạn patch guest OS) |
| **Configuration** | Cung cấp default configuration an toàn cho service | **Customize configuration** theo yêu cầu bảo mật của bạn | **Configuration Management** |
| **Data** | Cung cấp *khả năng* encryption; đảm bảo tách biệt data giữa các khách hàng; nhân viên AWS không truy cập data của bạn | **Phân loại data, encrypt data at rest & in transit, client-side encryption, server-side encryption, quản lý key** | — |
| **IAM / Access** | Đảm bảo IAM service khả dụng, cung cấp managed policy | **Tạo/quản user, group, role, policy; least privilege; MFA; password policy; rotate access key** | — |
| **Network traffic rules** | Bảo vệ hạ tầng network | **Security Group rules, NACL rules, firewall config** | — |
| **Compliance** | Đạt & duy trì chứng nhận cho hạ tầng (SOC, ISO, PCI DSS...) và cung cấp báo cáo qua **Artifact** | **Compliance của workload/data của bạn**, auditing & regulatory compliance của application | **Awareness & Training** |

**3 shared controls chính thức (học thuộc):**
1. **Patch Management**
2. **Configuration Management**
3. **Awareness & Training**

**Controls khách hàng *fully inherit* (thừa hưởng hoàn toàn) từ AWS:**
- **Physical controls**
- **Environmental controls**
- (và data center security controls — cùng nhóm ý nghĩa)

> **Bẫy:** "Awareness & Training" là **shared control**, **KHÔNG** phải inherited control. Nếu đề hỏi "controls customers *fully inherit*" thì đáp án là **physical + environmental (data center)**; nếu hỏi "**shared** controls" thì là **patch management + configuration management** (+ awareness & training).

### 1.2 Trách nhiệm dịch chuyển theo service

Câu trả lời đúng nhất cho "statement nào đúng về Shared Responsibility Model" luôn là: **"Responsibilities vary depending on the services used."**

| Service | AWS chịu trách nhiệm | Khách hàng chịu trách nhiệm |
|---|---|---|
| **EC2** (IaaS — bạn làm nhiều nhất) | Physical infra, hypervisor, host OS, network hạ tầng, hardware | **Guest OS + patch OS**, cài & cấu hình **third-party software**, application, **data & bảo vệ dữ liệu sensitive**, Security Group & firewall, IAM, encryption, backup (EBS snapshot) |
| **RDS** (managed DB) | **Quản database engine** (MySQL/PostgreSQL...), **patch DB software**, hardware & network isolation, audit instance & disk bên dưới, tự động backup theo cấu hình, OS bên dưới | **DB credentials & access control**, **encrypt data at rest/in transit**, cấu hình parameter group để chỉ cho phép **SSL connection**, định nghĩa backup/recovery policy, **monitor performance qua CloudWatch**, chọn instance size |
| **Lambda** (serverless — AWS làm nhiều nhất) | **Capacity management**, **OS maintenance**, patching runtime, scaling, hạ tầng | **Application code & logic**, **IAM/access control**, **data management**, biến môi trường & secrets |
| **DynamoDB** (managed NoSQL) | **Patching database software**, **OS maintenance**, **scaling** (AWS scale DynamoDB, không phải bạn), replication, hạ tầng | **Protecting credentials**, **tạo access policy**, **logging access activity**, thiết kế schema/key, encryption choice |
| **S3** | Data durability & availability, hạ tầng S3, unlimited storage, **đảm bảo nhân viên AWS không đọc được data của bạn**, tách biệt data giữa các khách hàng | **Bucket policy / ACL / IAM role**, **bật encryption** (SSE hoặc client-side), **versioning & lifecycle policy**, audit access qua CloudTrail + S3 access log, Block Public Access |

**Trục dịch chuyển cần nhớ:**

```
EC2 (IaaS)  →  RDS/DynamoDB (managed)  →  Lambda/S3 (serverless & fully managed)
 KH làm nhiều nhất  ────────────────────────────►  AWS làm nhiều nhất
(OS + patch là của KH)   (AWS lo engine/OS)      (AWS lo cả capacity & runtime)
```

**Nhưng có 3 thứ LUÔN LUÔN là của khách hàng, ở mọi service:**
1. **Data của bạn** (phân loại, encrypt, quyết định ai được xem)
2. **IAM / quyền truy cập**
3. **Cấu hình bạn tự bật** (bucket policy, SG rule, parameter group…)

Và có 3 thứ **LUÔN LUÔN của AWS:** physical/data center, hypervisor & virtualization layer, hardware maintenance + disk disposal.

---

## 2. IAM — Identity and Access Management

### 2.1 Bốn khái niệm cốt lõi

| Khái niệm | Là gì | Ghi chú thi |
|---|---|---|
| **User** | Một identity cho **một người thật**, có username + password (Console) và/hoặc access key (CLI/SDK) | User **không bắt buộc** thuộc group; một user có thể thuộc **nhiều group** |
| **Group** | Tập hợp logic các user để **áp permission chung** | Dùng khi đề nói "tổ chức nhân sự thành **team** rồi gán quyền cho từng team" → **IAM user groups**. Group **không** chứa group khác, và **không** phải một identity để assume |
| **Role** | Bộ permission được **assume tạm thời** bởi AWS service, application hoặc user | Dùng cho **EC2 truy cập S3**, Lambda truy cập DynamoDB, cross-account access, và **cấp quyền tạm thời** |
| **Policy** | Document **JSON** định nghĩa permission. **Policy không phải là identity** | Gắn được vào user, group, role |

> **Bẫy:** "Types of IAM **identities**" = **Users, Groups, Roles**. **IAM Policies KHÔNG phải identity** (nó là document quyền). AWS Organizations cũng không phải IAM identity.

### 2.2 Cấu trúc IAM Policy (JSON)

| Element | Nội dung |
|---|---|
| **Version** | Phiên bản ngôn ngữ policy, ví dụ `2012-10-17` |
| **Statement** | Chứa một hoặc nhiều permission |
| **Effect** | `Allow` hoặc `Deny` |
| **Action** | Action nào của service được allow/deny (`s3:ListBucket`) |
| **Resource** | ARN của resource áp dụng |

```json
{
  "Version": "2012-10-17",
  "Statement": [
    { "Effect": "Allow", "Action": "s3:ListBucket", "Resource": "arn:aws:s3:::example-bucket" }
  ]
}
```

**Loại policy:**

| Loại | Đặc điểm |
|---|---|
| **Inline Policies** | Gắn trực tiếp vào **một** user/group/role duy nhất |
| **Managed Policies** | Tái sử dụng được; **AWS-managed** (AWS tạo & cập nhật) hoặc **Customer-managed** |
| **Group Inherited** | Policy gắn vào group → áp cho mọi user trong group |

**Quy tắc đánh giá quyền (cực quan trọng):**
- **Implicit deny by default:** IAM user mới tạo **không có quyền gì cả** cho đến khi bạn gắn policy. Đây là lý do "sys-admin mới không tạo được EBS snapshot lẫn S3 bucket" — không phải vì hết dung lượng, không phải vì cần liên hệ AWS Support.
- **Explicit Deny luôn thắng** mọi Allow.

### 2.3 Principle of Least Privilege

> **Chỉ cấp cho user đúng những permission họ cần, đúng lúc họ cần, và không hơn.**

Distractor sai điển hình: "mọi IAM user nên có *ít nhất* quyền truy cập các core service", "mọi trusted user nên truy cập được mọi service", "không cấp quyền gì cho ai".

### 2.4 IAM Best Practices

1. **Least privilege** — review & thu hồi quyền thừa định kỳ.
2. **Bật MFA**, đặc biệt cho root và privileged user.
3. **Dùng IAM Role thay vì IAM User cho application** — không hardcode credential trong code.
4. **Rotate credentials/access key thường xuyên**, xóa credential không dùng.
5. Dùng **AWS Managed Policies** cho use case phổ biến.
6. Đặt **password policy** (độ dài tối thiểu, ký tự đặc biệt, chặn tái sử dụng, hết hạn).

### 2.5 IAM Security / Audit Tools

| Tool | Trả lời câu hỏi nào |
|---|---|
| **IAM Credential Report** | "Liệt kê **tất cả user trong account cùng trạng thái credential** (password, access key)" — báo cáo mức account |
| **IAM Access Advisor** | "Permission nào đã được cấp và **lần cuối được dùng khi nào**" — để cắt quyền thừa |
| **IAM Policy Simulator** | Test policy **trước khi** áp dụng |
| **IAM Access Analyzer** | Tìm resource bị **share ra ngoài** zone of trust (S3 bucket, IAM role, KMS key, Lambda, SQS, Secrets Manager). Zone of trust = AWS Account hoặc AWS Organization |

### 2.6 MFA

- MFA = **password (something you know)** + **code từ MFA device (something you have)**.
- **Lợi ích chính:** password bị lộ/bị hack thì account **vẫn không bị chiếm**.
- Bật/quản lý MFA qua **IAM** (Console) hoặc **AWS CLI**.

| Loại MFA device | Ví dụ |
|---|---|
| **Virtual MFA Device** | Google Authenticator, Authy (TOTP trên smartphone/tablet) |
| **Hardware MFA Device** | Token vật lý (Gemalto) |
| **U2F Security Key** | USB theo chuẩn Universal 2nd Factor (YubiKey) |

> **Bẫy:** CloudHSM, Access Keys và Key Pair đều **KHÔNG** phải MFA device. Trong danh sách chọn "loại MFA device", đáp án thường là **U2F Security Key**.

### 2.7 Root user

- Root user = **Account Owner**, có toàn quyền trên mọi service & resource.
- **Bảo vệ root:** **xóa root access key nếu không cần**, bật MFA cho root, **không dùng root cho công việc hằng ngày** (kể cả việc admin), tạo IAM user admin để dùng thay.
- **Chỉ root làm được:**
  - Đổi account settings (tên account, email, password root, access key root)
  - Xem một số tax invoice
  - **Đóng AWS account**
  - **Restore IAM user permissions**
  - **Đổi hoặc hủy AWS Support plan**
  - Đăng ký làm seller trên Reserved Instance Marketplace
  - Cấu hình S3 bucket để bật MFA Delete
  - Sửa/xóa S3 bucket policy có VPC ID / VPC endpoint ID không hợp lệ
  - Sign up GovCloud

> Ai có thể cấp quyền full administrative cho một team mới? → **AWS account owner (root/admin của account)**. **Không phải** TAM, không phải AWS security team, không phải Cloud Support Engineer — AWS không bao giờ tự gán quyền trong account của bạn.

### 2.8 Cách user truy cập AWS

| Cách | Credential cần | Ghi chú |
|---|---|---|
| **AWS Management Console** | **Username + password** (+ MFA nếu bật) | Đây là "default security credentials" cho IAM user vào Console |
| **AWS CLI** | **Access key ID + Secret access key** | Long-lived programmatic access |
| **AWS SDK** | **Access key ID + Secret access key** (hoặc IAM Role) | Cho application code |
| **CloudFormation** | — | IaC |

> **Bẫy:** để dùng **CLI/SDK** thì phải có **Access keys**, **không** phải username/password. Ngược lại vào **Console** thì cần username/password, không dùng access key. Và **access key = tương đương username/password cho programmatic access** — AWS khuyến nghị **rotate chúng thường xuyên**, tuyệt đối **không lưu trong code**.

### 2.9 Advanced Identity

| Service | Dùng khi nào |
|---|---|
| **AWS STS** (Security Token Service) | Cấp **temporary, limited-privilege credentials**; nền tảng của IAM Role, cross-account access, identity federation |
| **Amazon Cognito** | Quản lý identity cho **user của web/mobile app** (hàng triệu user), cho phép login bằng **Amazon / Apple / Facebook / Google** — thay vì tạo IAM user cho end user |
| **AWS Managed Microsoft AD** | Tự tạo & quản AD **trong AWS**, hỗ trợ MFA, thiết lập trust với on-premises AD |
| **AD Connector** | **Proxy/gateway** chuyển hướng xác thực về **on-premises AD**; user được quản ở on-premises |
| **Simple AD** | Managed directory tương thích AD, **không** join được với on-premises AD |
| **AWS IAM Identity Center** (SSO) | **Single sign-on** cho nhiều AWS account trong Organizations, app SaaS (Salesforce, Box, M365), app SAML 2.0, EC2 Windows. Đây là câu trả lời cho "**đăng nhập AWS bằng credential doanh nghiệp hiện có**" |
| **Amazon Cloud Directory** | Directory store cho phép tổ chức **hierarchy dữ liệu theo nhiều chiều (multiple dimensions)** — không phải để login AWS |

---

## 3. Phân biệt các Security Service dễ lẫn

### 3.1 Bảng so sánh 7 service phát hiện/bảo vệ

| Service | Bảo vệ / phát hiện gì | Phạm vi | Từ khóa nhận diện trong đề |
|---|---|---|---|
| **AWS Shield** | **DDoS** (layer 3/4: SYN/UDP flood, reflection attack) | CloudFront, Route 53, ELB, EC2, Global Accelerator. **Shield Standard miễn phí cho mọi khách hàng**; **Advanced** có DDoS Response Team 24/7 + bảo vệ khỏi phí tăng do DDoS | "DDoS", "SYN flood", "volumetric attack" |
| **AWS WAF** | Web exploit **layer 7 (HTTP)**: **SQL injection, XSS**, geo-block, rate-based rule | Deploy trên **Application Load Balancer, API Gateway, CloudFront** | "SQL injection", "cross-site scripting", "vulnerabilities in your application code", "filter HTTP requests" |
| **Amazon GuardDuty** | **Threat detection** thông minh — phát hiện **hành vi độc hại/bất thường** (anomaly-based + ML). Input: **CloudTrail Events, VPC Flow Logs, DNS Logs, EKS Audit Logs** | Account-level, bật 1 click, không cần cài agent | "continuously monitors", "detect threats", "attacker reconnaissance", "account compromise", "cryptocurrency mining", "unusual API calls" |
| **Amazon Inspector** | **Vulnerability assessment**: package vulnerability (CVE) + **network reachability** | **Chỉ EC2 và container image trong ECR**. Dùng **SSM agent** cho EC2 | "automated **network assessments** of EC2", "known vulnerabilities", "CVE", "risk score" |
| **Amazon Macie** | Phát hiện & phân loại **dữ liệu sensitive / PII** bằng ML + pattern matching | **Amazon S3** | "sensitive data", "PII", "intellectual property", "classify data" |
| **AWS Security Hub** | **Tổng hợp findings** từ nhiều service & nhiều account, dashboard compliance tập trung, tự động hóa security check | Multi-account. **Phải bật AWS Config trước** | "central security tool", "across several AWS accounts", "aggregate findings" |
| **Amazon Detective** | **Điều tra root cause** của security finding (ML + graph). Tự thu thập từ **VPC Flow Logs, CloudTrail, GuardDuty** | Account-level | "root cause", "deeper analysis", "investigate" |

**Chuỗi logic để nhớ:** GuardDuty/Macie/Inspector **phát hiện** → Security Hub **tập trung & tổng hợp** → Detective **điều tra nguyên nhân gốc**.

> **Bẫy Inspector vs GuardDuty:** Inspector quét **lỗ hổng đã biết** trên EC2/container (vulnerability *scanning*). GuardDuty phát hiện **hành vi tấn công đang diễn ra** (threat *detection*) từ log. Nếu đề nói "network assessment of EC2 instances để tìm vulnerability" → **Inspector**. Nếu nói "continuously monitors và phát hiện threat như reconnaissance hay account compromise" → **GuardDuty**.

### 3.2 CloudTrail vs CloudWatch vs AWS Config — bảng vàng

| | **AWS CloudTrail** | **Amazon CloudWatch** | **AWS Config** |
|---|---|---|---|
| **Trả lời câu hỏi** | **WHO did WHAT, WHEN?** | **How is it PERFORMING?** | **WHAT does the config look like, and HOW has it CHANGED?** |
| Ghi lại | **API calls** trong account (Console, CLI, SDK) | **Metrics**, logs, alarm | **Configuration** của resource và **lịch sử thay đổi** |
| Use case điển hình | "Ai đã terminate EC2 instance?" · "Ai đã xóa S3 bucket?" · "Log **mọi truy cập** tới resource cho **auditor bên ngoài**" · risk auditing | "CPU utilization > 60% thì alert" · "monitor performance của EC2" · "monitor HTTP/HTTPS request forwarded tới CloudFront" · billing alarm | "Security group nào cho phép SSH không giới hạn?" · "Bucket nào public?" · "ALB config đã đổi thế nào theo thời gian?" · **compliance của resource theo thời gian** |
| Phạm vi | Account (multi-region trail được) | Region | **Per-region**, có thể aggregate qua region & account |
| Alert | Gửi event tới EventBridge | Alarm → SNS | **SNS notification khi có change** |

**Cách phân biệt nhanh khi làm bài:**

| Câu hỏi trong đề | Đáp án |
|---|---|
| "Determine **who** took this action / **identity** that deleted the bucket" | **CloudTrail** |
| "Track resource changes using the **API call history**" | **CloudTrail** |
| "Log of **all accesses** to AWS resources cho external auditor" | **CloudTrail** |
| "Continuously monitoring và logging **account activity** including user actions in Console và SDK" | **CloudTrail** |
| "**Monitor the performance** của EC2 instances" | **CloudWatch** |
| "Track khi CPU usage > 60%" | **CloudWatch** |
| "Monitor HTTP/HTTPS requests **forwarded to CloudFront**" | **CloudWatch** |
| "Identify **the changes made to a resource over time**" | **AWS Config** |
| "**Compliance** của resource / resource config **theo thời gian**" | **AWS Config** |
| "Security analysis & **regulatory compliance auditing**" | **Inspector + AWS Config** |
| "**Real-time auditing** for compliance and vulnerabilities" | **AWS Config + Trusted Advisor** |
| "Change management tools để audit & monitor **mọi resource change**" | **CloudTrail + AWS Config** |

> Lưu ý: **AWS Trusted Advisor** cũng thuộc nhóm này — nó đưa ra **recommendation tối ưu security hạ tầng**, và cụ thể là service **phát hiện Security Group cho phép unrestricted access (port mở với 0.0.0.0/0)**. Nếu đề nói "**identifies security groups that allow unrestricted access**" → **Trusted Advisor**, không phải Inspector.

### 3.3 Encryption & Key Management

| Service | Bạn quản gì | AWS quản gì | Từ khóa |
|---|---|---|---|
| **AWS KMS** | Chọn key, đặt policy, bật rotation | **AWS quản lý key cho bạn** | "encryption" nói chung, **encrypt EBS volume**, S3 SSE, RDS/Redshift/EFS encryption |
| **AWS CloudHSM** | **Bạn quản toàn bộ key** trên hardware HSM riêng, isolated | Chỉ cung cấp & bảo trì thiết bị | "**generate and use your OWN encryption keys**", "hardware-based", "FIPS 140-2 Level 3", "dedicated/isolated HSM" |
| **AWS Certificate Manager (ACM)** | Yêu cầu & gắn cert | Provision, **tự động renew** | "**SSL/TLS certificate**", "HTTPS", "in-flight encryption". **Miễn phí cho public TLS cert**. Tích hợp: **ELB, CloudFront, API Gateway** |
| **AWS Secrets Manager** | Định nghĩa secret & rotation | Lưu trữ mã hóa (dùng KMS), tự rotate | "password", "API key", "database credentials" |

**Encryption với KMS:**

| Opt-in (bạn phải tự bật) | Bật tự động (không cần làm gì) |
|---|---|
| EBS volumes, S3 bucket (SSE), Redshift, RDS, EFS | **CloudTrail Logs**, **S3 Glacier**, **Storage Gateway** |

**4 loại CMK/KMS key:**

| Loại | Ai tạo & quản | Ghi chú |
|---|---|---|
| **Customer Managed CMK** | Bạn tạo, quản, enable/disable | Có **rotation policy**, hỗ trợ **bring-your-own-key** |
| **AWS Managed CMK** | AWS tạo & quản **thay bạn** | Dùng bởi service AWS: `aws/s3`, `aws/ebs`, `aws/redshift` |
| **AWS Owned CMK** | AWS sở hữu, dùng cho nhiều account | **Bạn không xem được key** |
| **CloudHSM Keys (custom keystore)** | Sinh từ thiết bị CloudHSM của bạn | Crypto operation chạy trong CloudHSM cluster |

**Data at rest vs Data in transit:**

| | Định nghĩa | Ví dụ |
|---|---|---|
| **At rest** | Data đang được lưu/archive trên thiết bị | Trên hard disk, RDS instance, S3 Glacier Deep Archive |
| **In transit (in motion)** | Data đang di chuyển giữa hai nơi (trên network) | On-premises → AWS, EC2 → DynamoDB |

Cả hai đều nên được encrypt. Cách bảo vệ **data at rest trên S3**: **Permissions** (bucket policy/IAM) + **Versioning** (chống xóa/ghi đè vô tình) + encryption. Chống **xóa vô tình** trên S3 → bật **Versioning** (và MFA Delete).

### 3.4 Network Security

| | **Security Group** | **Network ACL (NACL)** |
|---|---|---|
| Áp dụng ở mức | **Instance / ENI** (gắn với EC2, cả RDS instance) | **Subnet** |
| Trạng thái | **Stateful** — traffic được allow vào thì reply tự động được ra | **Stateless** — phải khai báo cả inbound và outbound |
| Rule | **Chỉ có Allow** (không có deny rule) | Có cả **Allow và Deny** |
| Đánh giá | Tất cả rule được đánh giá cùng nhau | Theo **thứ tự số rule** |

- Cả hai đều dùng để **control network traffic** trong AWS. Khi cần **audit toàn bộ inbound/outbound traffic** cho EC2 → phải kiểm tra **cả Security Groups và Network ACLs**.
- Security Group là feature **"associated with an EC2 instance và filter incoming traffic requests"**.
- Lợi ích chính khi gắn Security Group vào **RDS instance**: kiểm soát/lọc traffic được phép tới database.
- **Amazon VPC:** khách hàng có **toàn quyền kiểm soát** môi trường network ảo của mình (chọn IP range, subnet, route table, gateway) — dùng để **isolate resource và network configuration** giữa các project khác nhau.
- **VPC Flow Logs** ghi lại IP traffic vào/ra ENI — nguồn dữ liệu cho GuardDuty và Detective.

**Chống DDoS đầy đủ (defense in depth):**
- **AWS Shield Standard** (mặc định, free) + **Shield Advanced** (premium 24/7).
- **AWS WAF** — filter request theo rule, rate-based rule.
- **CloudFront + Route 53** — hấp thụ tấn công ở **edge**; **CloudFront chính là service tích hợp với Shield và WAF** để chống DDoS ở cả network layer và application layer.
- **Auto Scaling** — sẵn sàng scale để hấp thụ traffic.

---

## 4. Compliance & Governance

| Service / Resource | Dùng để |
|---|---|
| **AWS Artifact** | **Tải on-demand các báo cáo compliance & security** do **auditor bên thứ ba** phát hành: **SOC, PCI DSS, ISO** certification. Cũng là nơi **review/accept/track AWS agreements** (BAA, HIPAA). Đây là câu trả lời cho "download SOC & PCI reports", "auditor-issued reports and certifications", "manage your agreements with AWS" |
| **AWS Config** | Audit & record compliance của resource theo thời gian; đánh giá theo rule |
| **AWS Security Hub** | Dashboard compliance tập trung multi-account (yêu cầu bật Config) |
| **AWS Audit Manager** | Tự động thu thập evidence cho audit |
| **AWS Security Bulletins** | **Cách AWS thông báo cho khách hàng về security & privacy events** liên quan tới AWS service |
| **AWS Whitepapers, blogs, forums** | **Tài nguyên security miễn phí** cho mọi user |
| **AWS Acceptable Use Policy** | Nơi tra **những việc bị cấm** khi dùng service của AWS |
| **AWS Well-Architected Tool** | Self-review kiến trúc (miễn phí) |

**Compliance program AWS đạt được:** SOC 1/2/3, ISO 27001/27017/27018, PCI DSS Level 1, HIPAA, GDPR, FedRAMP, FIPS 140-2...

> **Cách AWS giúp bạn compliance:** AWS **chứng nhận hạ tầng** của mình theo các chuẩn và **chia sẻ báo cáo/chứng chỉ** qua Artifact — nhưng **bạn vẫn phải tự làm compliance cho application và data của mình**. Ví dụ với **PCI DSS**: AWS lo hạ tầng PCI-compliant, còn bạn phải **bảo vệ dữ liệu thẻ (encryption, tokenization)** và **cấu hình đúng các control** ở lớp của bạn.

### Xử lý thiết bị lưu trữ hết đời

AWS **hủy (destroy) thiết bị theo industry-standard practices** (NIST 800-88 / DoD 5220.22-M) trước khi rời khỏi quyền kiểm soát của AWS. AWS **không** bán lại, **không** gửi đi remanufacture, **không** đơn giản là "lưu ở nơi an toàn".

---

## 5. Penetration Testing

- Khách hàng **được phép tự thực hiện security assessment / pen test** trên hạ tầng của mình **KHÔNG cần xin phép trước** cho 8 nhóm service:
  EC2 instances / NAT Gateway / ELB · **RDS** · **CloudFront** · **Aurora** · **API Gateway** · **Lambda & Lambda@Edge** · **Lightsail** · **Elastic Beanstalk**.
- **Bị cấm:** DNS zone walking qua Route 53 Hosted Zones · **DoS / DDoS / simulated DoS/DDoS** · port flooding · protocol flooding · request flooding (login/API request flooding).
- Các sự kiện mô phỏng khác: liên hệ `aws-security-simulatedevent@amazon.com`.
- **Định nghĩa pen test:** *test network của bạn để tìm security vulnerability mà attacker có thể khai thác* — không phải test response time, không phải test bug phần mềm, không phải health check.

---

## 6. AWS Abuse Team & Support liên quan security

**AWS Abuse Team** — báo cáo tài nguyên AWS bị dùng cho mục đích **lạm dụng hoặc phi pháp**:

| Hành vi bị coi là abuse |
|---|
| **Spam** từ IP thuộc AWS |
| **Port scanning** |
| **DoS / DDoS attack** từ IP thuộc AWS |
| **Intrusion attempts** (cố đăng nhập vào resource của bạn) |
| Hosting nội dung phản cảm / vi phạm bản quyền |
| **Distributing malware** |

Liên hệ: AWS abuse form hoặc `abuse@amazonaws.com`.

> **Bẫy quan trọng:** nếu đề nói bạn chỉ có **Basic support** và phát hiện **AWS resource đang bị dùng với mục đích độc hại** → liên hệ **AWS Abuse team** (dịch vụ này có ở **mọi** support plan, kể cả Basic). **Không** phải AWS Customer Service (câu hỏi billing/account), **không** phải Concierge (chỉ Enterprise, và chỉ về billing/account), và **không** tồn tại "AWS Security team" như một kênh support để bạn gọi.

**Nếu thấy resource lạ mà bạn không nhớ đã tạo (dấu hiệu account bị compromise):**
1. **Đổi password root account và password của mọi IAM user**.
2. **Mở investigation và xóa những IAM user có thể đã bị compromise** (kèm rotate/vô hiệu hóa access key).
3. Kiểm tra **CloudTrail logs** để xác định ai đã làm gì.
4. **Không** đưa password root cho AWS Support (AWS không bao giờ yêu cầu điều này).

**Nếu admin bị sa thải và có thể còn access:** vô hiệu hóa/xóa access key và IAM user của người đó, **đổi password root + rotate root access key**, bật MFA.

---

## 7. Câu hỏi hay bẫy (Domain 2)

1. **Statement đúng nhất về Shared Responsibility Model** = **"Responsibilities vary depending on the services used."** Đừng chọn "security của IaaS là của AWS" hay "patch guest OS luôn là của AWS".
2. **Patch guest OS trên EC2 = khách hàng.** Patch **RDS/DynamoDB database software và OS bên dưới = AWS.**
3. **Ai scale DynamoDB? → AWS.** Đây là managed service.
4. **Migrate EC2 → Lambda:** AWS nhận thêm **capacity management** và **OS maintenance**. Access control, data và application vẫn là của bạn.
5. **Shared controls** = Patch Management + Configuration Management + Awareness & Training. **Inherited controls** = Physical + Environmental (data center).
6. **Disk disposal, physical access control, patching network infrastructure, hardware maintenance, tạo hypervisor** → luôn là **AWS**. **Setting password complexity rules, configuring network access rules, client-side encryption, protecting data, cài software trên EC2** → luôn là **khách hàng**.
7. **"Configuring infrastructure devices"** là của **AWS** (thiết bị hạ tầng), khác với "configuring Security Groups/NACLs" là của bạn.
8. **CloudTrail = WHO/WHAT. CloudWatch = PERFORMANCE. Config = CONFIG CHANGES OVER TIME.** Đọc kỹ từ khóa trước khi chọn.
9. **Trusted Advisor** là service phát hiện **Security Group cho phép unrestricted access** và đưa ra **security optimization recommendation** — không phải Inspector.
10. **Inspector chỉ hỗ trợ EC2 và container (ECR)** — không quét S3, không quét RDS.
11. **Macie = S3 + PII/sensitive data.** GuardDuty = threat detection từ log. Đừng đổi chỗ hai cái này.
12. **CloudHSM** khi đề nhấn mạnh "**your own** encryption keys" / hardware / FIPS. **KMS** khi chỉ nói "encryption" chung chung hoặc "AWS manages keys". **Encrypt EBS volume → KMS.**
13. **ACM** cho SSL/TLS certificate. Trong một số câu cũ, cả **ACM và IAM** đều được coi là nơi deploy SSL server certificate (IAM certificate store là cách legacy).
14. **IAM Policies không phải IAM identity.** Identity = User, Group, Role.
15. **Role cho quyền tạm thời và cho application/service.** Khi đề nói "**application trên EC2** cần quyền" → **IAM Role**, tuyệt đối không hardcode access key trong code. Nhưng khi đề nói "**nhân viên mới cần quyền long-term** để quản DynamoDB" → **IAM User + policy chỉ có quyền DynamoDB** (least privilege), không phải role và không phải Administrator access.
16. **IAM user groups** là câu trả lời cho "tổ chức nhân viên thành **team** rồi gán quyền theo team". Không phải AWS Organizations (cái đó quản **account**, không quản người).
17. **IAM user mới không có quyền gì** → giải thích cho mọi tình huống "user mới không làm được gì cả".
18. **CLI/SDK → Access keys.** Console → username/password. Access key phải được **rotate thường xuyên**, không share, không nhúng vào code.
19. **MFA device** = Virtual (app TOTP), Hardware token, **U2F Security Key**. CloudHSM/Key Pair/Access Key **không phải** MFA.
20. **Bảo vệ root:** **xóa root access key nếu không cần** là hành động đúng nhất. "Bật MFA cho root và dùng root cho mọi việc" là **sai** vì bạn không nên dùng root hằng ngày.
21. **Cognito** cho end user của mobile/web app (login qua Facebook/Google/Apple). **IAM Identity Center** cho nhân viên đăng nhập bằng **credential doanh nghiệp**. **Cloud Directory** chỉ là directory store đa chiều.
22. **Artifact** cho **SOC/PCI/ISO report** và **agreements**. Đừng chọn Config hay CloudTrail cho câu "download compliance report".
23. **Pen test được phép mà không cần xin phép trước**, nhưng **DDoS simulation vẫn bị cấm**.
24. **AWS thông báo security event qua Security Bulletins.**
25. **AWS Abuse team có ở Basic support** — đây là đáp án cho tình huống resource bị dùng độc hại.
26. **WAF chống SQL injection/XSS (layer 7). Shield chống DDoS (layer 3/4).** **CloudFront** là service tích hợp cả Shield và WAF.
27. **Security Group stateful, NACL stateless.** Audit inbound + outbound của EC2 → cần xem **cả hai**.
28. **Chống xóa vô tình trên S3 → Versioning.** Bảo vệ data at rest trên S3 → **Permissions + Versioning** (+ encryption).
29. **AWS hủy ổ đĩa hết đời theo industry-standard practices** — không bán, không remanufacture.
30. **Tài nguyên security miễn phí** = forums, blogs, whitepapers. Gọi AWS Support, workshop của Professional Services, lớp học tại trường đều **có phí**.

---

## Checklist trước khi làm Gate Quiz

- [ ] Vẽ lại được bảng **AWS vs Customer vs Shared** từ trí nhớ
- [ ] Nói được trách nhiệm **dịch chuyển thế nào giữa EC2 / RDS / DynamoDB / Lambda / S3**
- [ ] Thuộc **3 shared controls** và **inherited controls**
- [ ] Phân biệt **User / Group / Role / Policy**, và biết policy không phải identity
- [ ] Phân biệt **Shield / WAF / GuardDuty / Inspector / Macie / Security Hub / Detective**
- [ ] Phân biệt **CloudTrail / CloudWatch / Config** (+ vai trò Trusted Advisor)
- [ ] Phân biệt **KMS / CloudHSM / ACM / Secrets Manager**
- [ ] Phân biệt **Security Group (stateful) / NACL (stateless)**
- [ ] Nhớ **Artifact** = compliance report + agreements
- [ ] Nhớ **AWS Abuse team** có ở Basic support, và checklist khi account bị compromise

➡️ Tiếp theo: `02-practice-questions.md` (55 câu thật từ practice exams), sau đó `03-gate-quiz.md`.
