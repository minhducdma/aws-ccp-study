# Phase 2 — Practice Questions (Domain 2: Security & Compliance)

> **Domain 2 — Security & Compliance (30%)** — domain nặng nhất sau Cloud Technology.
> 55 câu hỏi **thật** được chọn từ các practice exam, giữ nguyên câu chữ và đáp án gốc.
> Nguồn: **Practice Exam 1, 4, 5, 6** — mỗi câu đều có trích dẫn `(Exam N - QX)` để bạn đối chiếu lại bản gốc.
>
> **Cách làm:** làm hết 55 câu, ghi đáp án ra giấy/file riêng theo định dạng `1B, 2A, 3AC, ...`, **rồi mới** mở phần Đáp án ở cuối file. Câu có `(Choose TWO)` / `(Select TWO)` là câu chọn nhiều đáp án.
>
> Chủ đề bao phủ: Shared Responsibility Model (EC2/RDS/DynamoDB/Lambda/S3) · IAM (user, group, role, policy, MFA, access key, least privilege) · security services (Shield, WAF, GuardDuty, Inspector, Macie, KMS, CloudHSM, ACM) · logging & audit (CloudTrail, CloudWatch, Config, Trusted Advisor) · compliance (Artifact, SOC/PCI) · network security (Security Group, NACL, VPC) · pen testing · AWS Abuse team.

---

**1.** You have noticed that several critical Amazon EC2 instances have been terminated. Which of the following AWS services would help you determine who took this action?  `(Exam 1 - Q3)`

- A. Amazon Inspector.
- B. AWS CloudTrail.
- C. AWS Trusted Advisor.
- D. EC2 Instance Usage Report.

**2.** Which statement is true regarding the AWS Shared Responsibility Model?  `(Exam 1 - Q5)`

- A. Responsibilities vary depending on the services used.
- B. Security of the IaaS services is the responsibility of AWS.
- C. Patching the guest OS is always the responsibility of AWS.
- D. Security of the managed services is the responsibility of the customer.

**3.** An organization has a large number of technical employees who operate their AWS Cloud infrastructure. What does AWS provide to help organize them into teams and then assign the appropriate permissions for each team?  `(Exam 1 - Q11)`

- A. IAM roles.
- B. IAM users.
- C. IAM user groups.
- D. AWS Organizations.

**4.** What should you do in order to keep the data on EBS volumes safe? (Choose TWO)  `(Exam 1 - Q18)`

- A. Regularly update firmware on EBS devices.
- B. Create EBS snapshots.
- C. Ensure that EBS data is encrypted at rest.
- D. Store a backup daily in an external drive.
- E. Prevent any unauthorized access to AWS data centers.

**5.** What does the "Principle of Least Privilege" refer to?  `(Exam 1 - Q22)`

- A. You should grant your users only the permissions they need when they need them and nothing more.
- B. All IAM users should have at least the necessary permissions to access the core AWS services.
- C. All trusted IAM users should have access to any AWS service in the respective AWS account.
- D. IAM users should not be granted any permissions; to keep your account safe.

**6.** Hundreds of thousands of DDoS attacks are recorded every month worldwide. What service does AWS provide to help protect AWS Customers from these attacks? (Choose TWO)  `(Exam 1 - Q26)`

- A. AWS Shield.
- B. AWS Config.
- C. Amazon Cognito.
- D. AWS WAF.
- E. AWS KMS.

**7.** Which of the following services allows customers to manage their agreements with AWS?  `(Exam 1 - Q31)`

- A. AWS Artifact.
- B. AWS Certificate Manager.
- C. AWS Systems Manager.
- D. AWS Organizations.

**8.** Which of the following must an IAM user provide to interact with AWS services using the AWS Command Line Interface (AWS CLI)?  `(Exam 1 - Q36)`

- A. Access keys.
- B. Secret token.
- C. UserID.
- D. User name and password.

**9.** You have AWS Basic support, and you have discovered that some AWS resources are being used maliciously, and those resources could potentially compromise your data. What should you do?  `(Exam 1 - Q37)`

- A. Contact the AWS Customer Service team.
- B. Contact the AWS Abuse team.
- C. Contact the AWS Concierge team.
- D. Contact the AWS Security team.

**10.** Select TWO examples of the AWS shared controls.  `(Exam 1 - Q38)`

- A. Patch Management.
- B. IAM Management.
- C. VPC Management.
- D. Configuration Management.
- E. Data Center operations.

**11.** Under the shared responsibility model, which of the following is the responsibility of AWS?  `(Exam 1 - Q43)`

- A. Client-side encryption.
- B. Configuring infrastructure devices.
- C. Server-side encryption.
- D. Filtering traffic with Security Groups.

**12.** You have deployed your application on multiple Amazon EC2 instances. Your customers complain that sometimes they can’t reach your application. Which AWS service allows you to monitor the performance of your EC2 instances to assist in troubleshooting these issues?  `(Exam 1 - Q45)`

- A. AWS Lambda.
- B. AWS Config.
- C. Amazon CloudWatch.
- D. AWS CloudTrail.

**13.** Your company is developing a critical web application in AWS, and the security of the application is a top priority. Which of the following AWS services will provide infrastructure security optimization recommendations?  `(Exam 1 - Q46)`

- A. AWS Shield.
- B. AWS Management Console.
- C. AWS Secrets Manager.
- D. AWS Trusted Advisor.

**14.** In the AWS Shared responsibility Model, which of the following are the responsibility of the customer? (Choose TWO)  `(Exam 1 - Q48)`

- A. Disk disposal.
- B. Controlling physical access to compute resources.
- C. Patching the Network infrastructure.
- D. Setting password complexity rules.
- E. Configuring network access rules.

**15.** A developer needs to set up an SSL security certificate for a client's eCommerce website in order to use the HTTPS protocol. Which of the following AWS services can be used to deploy the required SSL server certificates? (Choose TWO)  `(Exam 4 - Q1)`

- A. Amazon Route 53.
- B. AWS ACM.
- C. AWS Directory Service.
- D. AWS Identity & Access Management.
- E. AWS Data Pipeline.

**16.** A company is planning to migrate an application from Amazon EC2 to AWS Lambda to use a serverless architecture. Which of the following will be the responsibility of AWS after migration? (Choose TWO)  `(Exam 4 - Q3)`

- A. Application management.
- B. Capacity management.
- C. Access control.
- D. Operating system maintenance.
- E. Data management.

**17.** A company needs to migrate their website from on-premises to AWS. Security is a major concern for them, so they need to host their website on hardware that is NOT shared with other AWS customers. Which of the following EC2 instance options meets this requirement?  `(Exam 4 - Q5)`

- A. On-demand instances.
- B. Spot instances.
- C. Dedicated instances.
- D. Reserved instances.

**18.** Which AWS Service is used to manage user permissions?  `(Exam 4 - Q8)`

- A. Security Groups.
- B. Amazon ECS.
- C. AWS IAM.
- D. AWS Support.

**19.** A company needs to track resource changes using the API call history. Which AWS service can help the company achieve this goal?  `(Exam 4 - Q10)`

- A. AWS Config.
- B. Amazon CloudWatch.
- C. AWS CloudTrail.
- D. AWS CloudFormation.

**20.** What is the AWS’ recommendation regarding access keys?  `(Exam 4 - Q13)`

- A. Delete all access keys and use passwords instead.
- B. Only share them with trusted people.
- C. Rotate them regularly.
- D. Save them within your application code.

**21.** What is the AWS IAM feature that provides an additional layer of security on top of user-name and password authentication?  `(Exam 4 - Q14)`

- A. Key Pair.
- B. Access Keys.
- C. SDK.
- D. MFA.

**22.** For managed services like Amazon DynamoDB, which of the below is AWS responsible for? (Choose TWO)  `(Exam 4 - Q20)`

- A. Protecting credentials.
- B. Logging access activity.
- C. Patching the database software.
- D. Operating system maintenance.
- E. Creating access policies.

**23.** A company has discovered that multiple S3 buckets were deleted, but it is unclear who deleted the buckets. Which of the following can the company use to determine the identity that deleted the buckets?  `(Exam 4 - Q24)`

- A. SNS logs.
- B. SQS logs.
- C. CloudWatch Logs.
- D. CloudTrail logs.

**24.** What are AWS shared controls?  `(Exam 4 - Q27)`

- A. Controls that are solely the responsibility of the customer based on the application they are deploying within AWS services.
- B. Controls that a customer inherits from AWS.
- C. Controls that apply to both the infrastructure layer and customer layers.
- D. Controls that the customer and AWS collaborate together upon to secure the infrastructure.

**25.** Which of the below are responsibilities of the customer when using Amazon EC2? (Choose TWO)  `(Exam 4 - Q29)`

- A. Protecting sensitive data.
- B. Patching of the underlying infrastructure.
- C. Setup and operation of managed databases.
- D. Maintaining consistent hardware components.
- E. Installing and configuring third-party software.

**26.** Which of the following AWS services can help you perform security analysis and regulatory compliance auditing? (Choose TWO)  `(Exam 4 - Q31)`

- A. Amazon Inspector.
- B. AWS Virtual Private Gateway.
- C. AWS Batch.
- D. Amazon ECS.
- E. AWS Config.

**27.** Which of the following can be used to protect data at rest on Amazon S3? (Choose TWO)  `(Exam 4 - Q40)`

- A. Versioning.
- B. Deduplication.
- C. Permissions.
- D. Decryption.
- E. Conversion.

**28.** When running a workload in AWS, the customer is NOT responsible for: (Select TWO)  `(Exam 4 - Q44)`

- A. Running penetration tests.
- B. Reserving capacity.
- C. Data center operations.
- D. Auditing and regulatory compliance.
- E. Infrastructure security.

**29.** Which AWS service or feature is used to manage the keys used to encrypt customer data?  `(Exam 4 - Q49)`

- A. AWS KMS.
- B. AWS Service Control Policies (SCPs).
- C. Multi-Factor Authentication (MFA).
- D. Amazon Macie.

**30.** Which AWS Service allows customers to download AWS SOC & PCI reports?  `(Exam 4 - Q50)`

- A. AWS Well-Architected Tool.
- B. AWS Artifact.
- C. AWS Glue.
- D. Amazon Chime.

**31.** What features does AWS offer to help protect your data in the Cloud? (Choose TWO)  `(Exam 5 - Q3)`

- A. Access control.
- B. Physical MFA devices.
- C. Data encryption.
- D. Unlimited storage.
- E. Load balancing.

**32.** Which methods can be used by customers to interact with AWS Identity and Access Management (IAM)? (Choose TWO)  `(Exam 5 - Q6)`

- A. AWS CLI.
- B. AWS Security Groups.
- C. AWS SDKs.
- D. AWS Network Access Control Lists.
- E. AWS CodeCommit.

**33.** Which of the following are types of AWS Identity and Access Management (IAM) identities? (Choose TWO)  `(Exam 5 - Q7)`

- A. AWS Resource Groups.
- B. IAM Policies.
- C. IAM Roles.
- D. IAM Users.
- E. AWS Organizations.

**34.** How does AWS notify customers about security and privacy events pertaining to AWS services?  `(Exam 5 - Q9)`

- A. Using the AWS ACM service.
- B. Using Security Bulletins.
- C. Using the AWS Management Console.
- D. Using Compliance Resources.

**35.** Which IAM entity can best be used to grant temporary access to your AWS resources?  `(Exam 5 - Q10)`

- A. IAM Users.
- B. Key Pair.
- C. IAM Roles.
- D. IAM Groups.

**36.** A company is seeking to better secure its AWS account from unauthorized access. Which of the below options can the customer use to achieve this goal?  `(Exam 5 - Q13)`

- A. Restrict any API call made through SDKs or CLI.
- B. Create one IAM account for each department in the company (Development, QA, Production), and share it across all staff in that department.
- C. Require Multi-Factor Authentication (MFA) for all IAM User access.
- D. Set up two login passwords.

**37.** Which of the following are examples of the customer’s responsibility to implement “security IN the cloud”? (Choose TWO)  `(Exam 5 - Q19)`

- A. Building a schema for an application.
- B. Replacing physical hardware.
- C. Creating a new hypervisor.
- D. Patch management of the underlying infrastructure.
- E. File system encryption.

**38.** Which of the following is a type of MFA device that customers can use to protect their AWS resources?  `(Exam 5 - Q20)`

- A. AWS CloudHSM.
- B. U2F Security Key.
- C. AWS Access Keys.
- D. AWS Key Pair.

**39.** You have just hired a skilled sys-admin to join your team. As usual, you have created a new IAM user for him to interact with AWS services. On his first day, you ask him to create snapshots of all existing Amazon EBS volumes and save them in a new Amazon S3 bucket. However, the new member reports back that he is unable to create neither EBS snapshots nor S3 buckets. What might prevent him from doing this simple task?  `(Exam 5 - Q25)`

- A. EBS and S3 are accessible only to the root account owner.
- B. The systems administrator must contact AWS Support first to activate his new IAM account.
- C. There is not enough space in S3 to store the snapshots.
- D. There is a non-explicit deny to all new users.

**40.** An external auditor is requesting a log of all accesses to the AWS resources in the company’s account. Which of the following services will provide the auditor with the requested information?  `(Exam 5 - Q26)`

- A. AWS CloudTrail.
- B. Amazon CloudFront.
- C. AWS CloudFormation.
- D. Amazon CloudWatch.

**41.** Which of the below options is true of Amazon Cloud Directory?  `(Exam 5 - Q27)`

- A. Amazon Cloud Directory allows the organization of hierarchies of data across multiple dimensions.
- B. Amazon Cloud Directory enables the analysis of video and data streams in real time.
- C. Amazon Cloud Directory allows users to access AWS with their existing Active Directory credentials.
- D. Amazon Cloud Directory allows for registration and management of domain names.

**42.** Which AWS service enables you to quickly purchase and deploy SSL/TLS certificates?  `(Exam 5 - Q33)`

- A. Amazon GuardDuty.
- B. AWS ACM.
- C. Amazon Detective.
- D. AWS WAF.

**43.** Which of the following services can be used to monitor the HTTP and HTTPS requests that are forwarded to Amazon CloudFront?  `(Exam 5 - Q36)`

- A. AWS WAF.
- B. Amazon CloudWatch.
- C. AWS Cloud9.
- D. AWS CloudTrail.

**44.** A company wants to grant a new employee long-term access to manage Amazon DynamoDB databases. Which of the following is a recommended best-practice when granting these permissions?  `(Exam 5 - Q38)`

- A. Create an IAM role and attach a policy with Amazon DynamoDB access permissions.
- B. Create an IAM role and attach a policy with Administrator access permissions.
- C. Create an IAM user and attach a policy with Amazon DynamoDB access permissions.
- D. Create an IAM user and attach a policy with Administrator access permissions.

**45.** When granting permissions to applications running on Amazon EC2 instances, which of the following is considered best practice?  `(Exam 5 - Q39)`

- A. Generate new IAM access keys every time you delegate permissions.
- B. Store the required AWS credentials directly within the application code.
- C. Use temporary security credentials (IAM roles) instead of long-term access keys.
- D. Do nothing; Applications that run on Amazon EC2 instances do not need permission to interact with other AWS services or resources.

**46.** Which of the following can be used to enable the Virtual Multi-Factor Authentication? (Choose TWO)  `(Exam 5 - Q42)`

- A. Amazon Connect.
- B. AWS CLI.
- C. AWS Identity and Access Management (IAM).
- D. Amazon SNS.
- E. Amazon Virtual Private Cloud.

**47.** What should you do if you see resources, which you don’t remember creating, in the AWS Management Console? (Choose TWO)  `(Exam 5 - Q45)`

- A. Stop all running services and open an investigation.
- B. Give your root account password to AWS Support so that they can assist in troubleshooting and securing the account.
- C. Check the AWS CloudTrail logs and delete all IAM users that have access to your resources.
- D. Open an investigation and delete any potentially compromised IAM users.
- E. Change your AWS root account password and the passwords of any IAM users.

**48.** A company is developing a mobile application and wants to allow users to use their Amazon, Apple, Facebook, or Google identities to authenticate to the application. Which AWS Service should the company use for this purpose?  `(Exam 6 - Q3)`

- A. Amazon GuardDuty.
- B. Amazon Personalize.
- C. Amazon Cognito.
- D. AWS IAM.

**49.** There is a requirement to grant a DevOps team full administrative access to all resources in an AWS account. Who can grant them these permissions?  `(Exam 6 - Q11)`

- A. AWS account owner.
- B. AWS technical account manager.
- C. AWS security team.
- D. AWS cloud support engineers.

**50.** Which statement is true in relation to the security of Amazon EC2?  `(Exam 6 - Q18)`

- A. You should use instance store volumes to store login data.
- B. You should regularly patch the operating system and applications on your EC2 instances.
- C. You should deploy critical components of your application in the Availability Zone that you trust.
- D. You can track all API calls using Amazon Athena.

**51.** Which of the following strategies helps protect your AWS root account?  `(Exam 6 - Q22)`

- A. Delete root user access keys if you do not need them.
- B. Apply MFA for the root account and use it for all of your work.
- C. Access the root account only from your personal Mobile Phone.
- D. Only share your AWS account password or access keys with trusted persons.

**52.** You have just set up your AWS environment and have created six IAM user accounts for the DevOps team. What is the AWS recommendation when granting permissions to these IAM accounts?  `(Exam 6 - Q24)`

- A. Attach a separate IAM policy for each individual account.
- B. Apply the Principle of Least Privilege.
- C. For security purposes, you should not grant any permission to the DevOps team.
- D. Create six different IAM passwords.

**53.** Which of the below options is true of Amazon VPC?  `(Exam 6 - Q30)`

- A. Amazon VPC allows customers to control user interactions with all other AWS resources.
- B. AWS Customers have complete control over their Amazon VPC virtual networking environment.
- C. AWS is responsible for all the management and configuration details of Amazon VPC.
- D. Amazon VPC helps customers to review their AWS architecture and adopt best practices.

**54.** Which of the following services provide real-time auditing for compliance and vulnerabilities? (Choose TWO)  `(Exam 6 - Q32)`

- A. AWS Config.
- B. Amazon Redshift.
- C. Amazon MQ.
- D. AWS Trusted Advisor.
- E. Amazon Cognito.

**55.** What best describes penetration testing?  `(Exam 6 - Q36)`

- A. Testing your application’s response time from different locations.
- B. Testing your network to find security vulnerabilities that an attacker could exploit.
- C. Testing your instances to check for the unhealthy ones.
- D. Testing your software for bugs and errors.

---

<details>
<summary><b>Đáp án</b> — chỉ mở sau khi đã làm hết toàn bộ câu hỏi phía trên</summary>

### Bảng đáp án nhanh (55 câu)

1B, 2A, 3C, 4BC, 5A, 6AD, 7A, 8A, 9B, 10AD, 11B, 12C, 13D, 14DE, 15AB, 16BD, 17C, 18C, 19C, 20C, 21D, 22CD, 23D, 24D, 25AE, 26AE, 27AC, 28CE, 29A, 30B, 31AC, 32AC, 33CD, 34B, 35C, 36C, 37AE, 38B, 39D, 40A, 41A, 42B, 43B, 44C, 45C, 46BC, 47DE, 48C, 49A, 50B, 51A, 52B, 53B, 54AD, 55B

### Giải thích chi tiết

**1. Đáp án: B** — `(Exam 1 - Q3)`

**CloudTrail** ghi lại mọi API call trong account nên trả lời được câu hỏi **ai** đã terminate instance. Bẫy là A: Inspector chỉ quét *lỗ hổng* trên EC2, nó không ghi lại hành động của người dùng; C (Trusted Advisor) chỉ đưa recommendation.

**2. Đáp án: A** — `(Exam 1 - Q5)`

Phát biểu đúng duy nhất là **trách nhiệm thay đổi tùy theo service bạn dùng** (EC2 khác RDS khác Lambda). B sai vì với IaaS như EC2 khách hàng phải lo OS/app; C sai vì patch **guest OS** là của khách hàng; D sai vì với managed service AWS lo phần lớn security của lớp bên dưới.

**3. Đáp án: C** — `(Exam 1 - Q11)`

**IAM user groups** cho phép nhóm nhân sự thành team rồi gán permission chung cho cả team. Bẫy là D: AWS Organizations quản lý **nhiều AWS account**, không dùng để tổ chức *người* thành team; A (role) dùng cho quyền tạm thời và cho service.

**4. Đáp án: B, C** — `(Exam 1 - Q18)`

Giữ dữ liệu EBS an toàn = **tạo EBS snapshot** (chống mất dữ liệu) và **encrypt at rest** (chống đọc trái phép). A và E là trách nhiệm của **AWS** theo Shared Responsibility Model (firmware và physical access data center); D không phải cách làm trên cloud.

**5. Đáp án: A** — `(Exam 1 - Q22)`

Least Privilege = **chỉ cấp đúng permission user cần, đúng lúc cần, và không hơn**. B là bẫy chữ nghĩa ('ít nhất phải có quyền vào core service' là ngược hoàn toàn); C quá rộng; D quá hẹp tới mức vô dụng.

**6. Đáp án: A, D** — `(Exam 1 - Q26)`

**Shield** chống DDoS ở layer 3/4 và **WAF** filter request độc hại ở layer 7 — hai service AWS cung cấp cho mục đích này. B (Config) là audit configuration, C (Cognito) là identity cho app, E (KMS) là quản key — không service nào chống DDoS.

**7. Đáp án: A** — `(Exam 1 - Q31)`

**AWS Artifact** không chỉ cung cấp compliance report mà còn có **Artifact Agreements** để review/accept/track các thỏa thuận với AWS (BAA, HIPAA). Bẫy là D: AWS Organizations quản lý account và SCP, không quản lý agreement pháp lý.

**8. Đáp án: A** — `(Exam 1 - Q36)`

Truy cập AWS bằng **CLI** đòi hỏi **access keys** (Access Key ID + Secret Access Key). Bẫy là D: username/password chỉ dùng để đăng nhập **Management Console**, hoàn toàn không dùng được cho CLI/SDK.

**9. Đáp án: B** — `(Exam 1 - Q37)`

Tài nguyên AWS bị dùng với mục đích độc hại → liên hệ **AWS Abuse team**, dịch vụ này có ở **mọi** support plan kể cả Basic. C (Concierge) chỉ có ở Enterprise và chỉ xử lý billing/account; A (Customer Service) xử lý câu hỏi account/billing; D là kênh không tồn tại.

**10. Đáp án: A, D** — `(Exam 1 - Q38)`

Hai shared control kinh điển là **Patch Management** và **Configuration Management** — AWS làm ở lớp hạ tầng, bạn làm ở lớp guest OS/application. B và C (IAM, VPC management) là **riêng của khách hàng**; E (data center operations) là **riêng của AWS**.

**11. Đáp án: B** — `(Exam 1 - Q43)`

**Configuring infrastructure devices** (thiết bị hạ tầng: switch, router, host) là của **AWS**. A, C, D đều là việc của khách hàng: client-side encryption, server-side encryption (bạn phải bật) và cấu hình Security Group.

**12. Đáp án: C** — `(Exam 1 - Q45)`

**CloudWatch** thu thập metric để bạn **monitor performance** của EC2 và troubleshoot. Bẫy là D: CloudTrail ghi *ai gọi API nào*, hoàn toàn không cho biết CPU/memory/network của instance đang thế nào.

**13. Đáp án: D** — `(Exam 1 - Q46)`

**AWS Trusted Advisor** đưa ra **recommendation tối ưu security cho hạ tầng** (ví dụ cảnh báo Security Group mở port với 0.0.0.0/0, S3 bucket public, MFA chưa bật trên root). A (Shield) chỉ chống DDoS; C (Secrets Manager) chỉ lưu secret.

**14. Đáp án: D, E** — `(Exam 1 - Q48)`

Khách hàng chịu trách nhiệm **đặt password complexity rule** và **cấu hình network access rule** (Security Group/NACL). A, B, C (disk disposal, physical access, patch network infrastructure) đều thuộc security *of* the cloud nên là của **AWS**.

**15. Đáp án: A, B** — `(Exam 4 - Q1)`

Có thể deploy SSL server certificate qua **Amazon Route 53** (ở đây hiểu theo nghĩa quản lý domain/cert cho website) và **AWS ACM** — theo đáp án gốc của đề. ACM là câu trả lời trọng tâm cần nhớ: nó provision, quản lý và **tự động renew** SSL/TLS cert, tích hợp với ELB, CloudFront, API Gateway. C, E không liên quan tới certificate.

**16. Đáp án: B, D** — `(Exam 4 - Q3)`

Chuyển từ EC2 sang Lambda, AWS nhận thêm **capacity management** (tự scale) và **operating system maintenance** (bạn không còn OS để patch). A, C, E vẫn là của bạn: application logic, access control (IAM) và data — đây chính là 3 thứ *luôn luôn* thuộc khách hàng ở mọi service.

**17. Đáp án: C** — `(Exam 4 - Q5)`

Yêu cầu 'hardware KHÔNG chia sẻ với khách hàng AWS khác' → **Dedicated Instances**. A, B, D (On-demand, Spot, Reserved) đều là *pricing model* chạy trên hardware dùng chung — chúng nói về cách trả tiền, không nói về tenancy.

**18. Đáp án: C** — `(Exam 4 - Q8)`

**AWS IAM** là service quản lý user permission. Bẫy là A: Security Group là firewall lọc *traffic mạng*, không quản quyền của user; ECS là container orchestration.

**19. Đáp án: C** — `(Exam 4 - Q10)`

Theo dõi thay đổi resource **thông qua lịch sử API call** → **CloudTrail**. Bẫy là A: AWS Config cũng theo dõi thay đổi nhưng nó ghi lại *trạng thái cấu hình*, còn từ khóa **'API call history'** luôn chỉ về CloudTrail.

**20. Đáp án: C** — `(Exam 4 - Q13)`

AWS khuyến nghị **rotate access key thường xuyên**. A sai vì access key là cách duy nhất để dùng CLI/SDK nên không thể xóa hết; B và D là chống chỉ định tuyệt đối — không share access key với ai và **không bao giờ** nhúng vào source code.

**21. Đáp án: D** — `(Exam 4 - Q14)`

**MFA** là feature của IAM bổ sung một lớp bảo vệ trên username + password. A (Key Pair) dùng để SSH vào EC2; B (Access Keys) là credential cho CLI/SDK chứ không phải lớp xác thực bổ sung; C (SDK) không phải feature bảo mật.

**22. Đáp án: C, D** — `(Exam 4 - Q20)`

Với managed service như DynamoDB, AWS lo **patching database software** và **operating system maintenance**. A, B, E (bảo vệ credential, ghi log truy cập, tạo access policy) vẫn là của khách hàng — nguyên tắc 'data + IAM + configuration luôn thuộc bạn'.

**23. Đáp án: D** — `(Exam 4 - Q24)`

Xác định **identity nào đã xóa S3 bucket** → **CloudTrail logs**. Bẫy là C: CloudWatch Logs chứa log ứng dụng/hệ thống, nó không ghi lại danh tính người gọi API xóa bucket.

**24. Đáp án: D** — `(Exam 4 - Q27)`

**Shared controls** là các control mà **khách hàng và AWS cùng phối hợp** để bảo mật hạ tầng — mỗi bên chịu trách nhiệm ở lớp của mình (ví dụ patch management). A mô tả customer-specific control; B mô tả inherited control; C là mô tả gần đúng nhưng thiếu ý 'phối hợp', và đáp án gốc của đề là D.

**25. Đáp án: A, E** — `(Exam 4 - Q29)`

Khi dùng EC2, khách hàng phải **bảo vệ dữ liệu sensitive** và **cài đặt/cấu hình third-party software**. B (patch hạ tầng bên dưới), C (vận hành managed database) và D (bảo trì hardware) đều là của AWS.

**26. Đáp án: A, E** — `(Exam 4 - Q31)`

**Amazon Inspector** (đánh giá lỗ hổng bảo mật) và **AWS Config** (audit cấu hình & compliance theo thời gian) là hai service cho security analysis + regulatory compliance auditing. B, C, D (Virtual Private Gateway, Batch, ECS) không phải service bảo mật/audit.

**27. Đáp án: A, C** — `(Exam 4 - Q40)`

Bảo vệ data at rest trên S3 bằng **Versioning** (giữ lại bản cũ, chống ghi đè/xóa vô tình) và **Permissions** (bucket policy, IAM, ACL). D là bẫy đảo ngược — bảo vệ là **encryption**, không phải *decryption*; B và E không phải feature bảo mật của S3.

**28. Đáp án: C, E** — `(Exam 4 - Q44)`

Khách hàng **KHÔNG** chịu trách nhiệm **data center operations** và **infrastructure security** — đó là security *of* the cloud. Bẫy là D: auditing & regulatory compliance cho workload của bạn **vẫn là việc của bạn**; A (pen test trên tài nguyên của mình) cũng là việc bạn được phép và cần tự làm.

**29. Đáp án: A** — `(Exam 4 - Q49)`

**AWS KMS** là service quản lý key dùng để encrypt dữ liệu khách hàng. B (SCP) giới hạn quyền ở mức Organizations; C (MFA) là xác thực; D (Macie) phát hiện dữ liệu sensitive trong S3 — không cái nào quản key.

**30. Đáp án: B** — `(Exam 4 - Q50)`

**AWS Artifact** là nơi tải báo cáo **SOC và PCI** do auditor bên thứ ba phát hành. A (Well-Architected Tool) chỉ review kiến trúc; C (Glue) là ETL; D (Chime) là communication.

**31. Đáp án: A, C** — `(Exam 5 - Q3)`

AWS bảo vệ dữ liệu của bạn qua **access control** (IAM, bucket policy) và **data encryption** (KMS, SSE, TLS). B (physical MFA device) là bảo vệ *truy cập account*, không phải bảo vệ dữ liệu; D và E hoàn toàn không phải feature bảo mật.

**32. Đáp án: A, C** — `(Exam 5 - Q6)`

Có thể tương tác với IAM qua **AWS CLI** và **AWS SDKs** (ngoài Console). B và D (Security Groups, NACLs) là công cụ network chứ không phải cách gọi IAM; E (CodeCommit) là git repository.

**33. Đáp án: C, D** — `(Exam 5 - Q7)`

IAM **identity** gồm **Roles** và **Users** (và Groups). Bẫy nặng là B: **IAM Policies KHÔNG phải identity** — policy là document JSON định nghĩa quyền, được *gắn vào* identity. A và E cũng không phải IAM identity.

**34. Đáp án: B** — `(Exam 5 - Q9)`

AWS thông báo các security & privacy event liên quan tới service của mình qua **Security Bulletins**. A (ACM) là service cert; C (Console) không phải kênh thông báo security chính thức; D (Compliance Resources) là tài liệu tham khảo, không phải kênh thông báo sự cố.

**35. Đáp án: C** — `(Exam 5 - Q10)`

**IAM Roles** là entity phù hợp nhất để cấp **quyền truy cập tạm thời** (thông qua STS, credential có thời hạn). A (IAM Users) là identity dài hạn; B (Key Pair) dùng để SSH; D (Groups) chỉ để gom user, không cấp quyền tạm.

**36. Đáp án: C** — `(Exam 5 - Q13)`

Cách bảo vệ account khỏi truy cập trái phép là **bắt buộc MFA cho mọi IAM user**. B là anti-pattern nghiêm trọng (chia sẻ chung một account cho cả phòng ban là vi phạm nguyên tắc identity riêng biệt và không thể audit); A sẽ chặn luôn công việc hợp lệ; D không tồn tại trên AWS.

**37. Đáp án: A, E** — `(Exam 5 - Q19)`

Ví dụ của 'security IN the cloud' là **xây schema cho application** (A — bạn tự thiết kế và bảo vệ dữ liệu/app của mình) và **file system encryption** (E). B, C, D (thay hardware, tạo hypervisor, patch hạ tầng) đều là security *of* the cloud, thuộc AWS.

**38. Đáp án: B** — `(Exam 5 - Q20)`

**U2F Security Key** là một loại MFA device AWS hỗ trợ (cùng với virtual MFA app và hardware token). A (CloudHSM) là thiết bị quản key mã hóa, C (Access Keys) và D (Key Pair) là credential — không cái nào là MFA device.

**39. Đáp án: D** — `(Exam 5 - Q25)`

IAM user mới tạo **không có quyền gì cả** cho tới khi bạn gắn policy — AWS gọi đây là implicit/non-explicit deny mặc định. A sai (EBS/S3 không giới hạn cho root); B sai (không cần AWS Support kích hoạt IAM user); C sai (S3 là unlimited storage).

**40. Đáp án: A** — `(Exam 5 - Q26)`

Auditor bên ngoài cần **log của mọi truy cập tới AWS resource** → **CloudTrail**. Bẫy là D: CloudWatch cung cấp metric/log về *hiệu năng*, không phải bản ghi ai đã truy cập resource nào.

**41. Đáp án: A** — `(Exam 5 - Q27)`

**Amazon Cloud Directory** cho phép tổ chức **hierarchy dữ liệu theo nhiều chiều (multiple dimensions)**. C là bẫy vì đó là mô tả của **AD Connector / IAM Identity Center** (đăng nhập bằng credential Active Directory); D là mô tả của Route 53.

**42. Đáp án: B** — `(Exam 5 - Q33)`

**AWS ACM** cho phép nhanh chóng provision và deploy **SSL/TLS certificate** (miễn phí cho public cert, tự động renew). A (GuardDuty), C (Detective), D (WAF) đều là service bảo mật khác, không quản certificate.

**43. Đáp án: B** — `(Exam 5 - Q36)`

Để **monitor HTTP/HTTPS requests forwarded tới CloudFront** thì dùng **CloudWatch** (metric của distribution). Bẫy rất mạnh là A: WAF **filter/chặn** request theo rule, nhưng câu hỏi dùng từ **'monitor'** — theo đáp án gốc, việc theo dõi/đo lường request là của CloudWatch.

**44. Đáp án: C** — `(Exam 5 - Q38)`

Nhân viên mới cần quyền **long-term** để quản DynamoDB → **tạo IAM user và gắn policy chỉ có quyền DynamoDB** (least privilege). A và B sai vì role dùng cho quyền *tạm thời*/cho service; B và D sai thêm vì gắn Administrator access là vi phạm least privilege.

**45. Đáp án: C** — `(Exam 5 - Q39)`

Best practice khi cấp quyền cho application chạy trên EC2 là **dùng temporary security credentials qua IAM role** thay vì access key dài hạn. B là lỗi bảo mật nghiêm trọng nhất (nhúng credential vào code); A tạo gánh nặng quản lý và vẫn là long-term key; D sai vì application chắc chắn cần quyền.

**46. Đáp án: B, C** — `(Exam 5 - Q42)`

Virtual MFA được bật thông qua **AWS CLI** và **AWS IAM** (Console/API của IAM). A (Connect), D (SNS), E (VPC) hoàn toàn không liên quan tới việc cấu hình MFA.

**47. Đáp án: D, E** — `(Exam 5 - Q45)`

Thấy resource lạ = dấu hiệu account bị compromise → **mở investigation và xóa các IAM user có thể đã bị xâm nhập** (D) và **đổi password root cùng password của mọi IAM user** (E). B là cực kỳ sai — không bao giờ đưa password root cho bất kỳ ai kể cả AWS Support; C sai vì xóa *tất cả* IAM user có quyền truy cập là hành động quá mức và làm mất luôn quyền vận hành hợp lệ.

**48. Đáp án: C** — `(Exam 6 - Q3)`

**Amazon Cognito** cho phép end user của mobile/web app đăng nhập bằng identity Amazon, Apple, Facebook, Google (social identity federation). Bẫy là D: IAM dùng cho *nhân viên/tài nguyên trong account của bạn*, không dùng để quản hàng triệu end user của ứng dụng.

**49. Đáp án: A** — `(Exam 6 - Q11)`

Chỉ **chủ AWS account** (root/admin của account đó) mới có thể cấp full administrative access. B, C, D là bẫy quan trọng: **AWS không bao giờ tự gán permission trong account của bạn** — TAM, security team hay support engineer đều không làm việc đó.

**50. Đáp án: B** — `(Exam 6 - Q18)`

Phát biểu đúng: **bạn phải thường xuyên patch OS và application trên EC2 instance của mình** — đây là trách nhiệm khách hàng theo Shared Responsibility Model. A sai vì instance store là ephemeral (mất dữ liệu khi stop); C vô nghĩa (mọi AZ đều được bảo mật như nhau); D sai vì theo dõi API call là **CloudTrail**, không phải Athena.

**51. Đáp án: A** — `(Exam 6 - Q22)`

Chiến lược bảo vệ root account: **xóa root access key nếu không cần dùng**. B sai ở nửa sau — bật MFA cho root là đúng nhưng **không được dùng root cho công việc hằng ngày**; C và D đều sai vì credential root không nên được share hay dựa vào thiết bị cá nhân.

**52. Đáp án: B** — `(Exam 6 - Q24)`

Khi cấp quyền cho các IAM account, khuyến nghị của AWS là **áp dụng Principle of Least Privilege**. A không phải nguyên tắc (dùng group sẽ hiệu quả hơn policy riêng từng người); C vô lý vì team DevOps cần quyền để làm việc; D không liên quan tới permission.

**53. Đáp án: B** — `(Exam 6 - Q30)`

**Khách hàng có toàn quyền kiểm soát môi trường network ảo VPC của mình** (IP range, subnet, route table, gateway, SG/NACL). A là mô tả của IAM; C sai vì cấu hình VPC là việc của bạn, không phải AWS; D là mô tả của Well-Architected Tool.

**54. Đáp án: A, D** — `(Exam 6 - Q32)`

**AWS Config** (audit cấu hình & compliance liên tục) và **AWS Trusted Advisor** (kiểm tra real-time và cảnh báo lỗ hổng như port mở, MFA chưa bật) là hai service cho real-time auditing về compliance và vulnerability. B (Redshift), C (MQ), E (Cognito) không phải service audit.

**55. Đáp án: B** — `(Exam 6 - Q36)`

Penetration testing = **test network của bạn để tìm security vulnerability mà attacker có thể khai thác**. A là load/latency testing; C là health check; D là software QA testing — đều không phải pen test.

</details>
