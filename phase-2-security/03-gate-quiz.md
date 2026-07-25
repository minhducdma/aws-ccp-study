# Phase 2 — GATE QUIZ (Domain 2: Security & Compliance)

> ## Hướng dẫn làm bài
>
> | | |
> |---|---|
> | **Số câu** | 25 |
> | **Thời gian** | **35 phút** |
> | **Điểm pass** | **≥ 20/25 (80%)** |
> | **Định dạng trả lời** | `1D, 2B, 3AC, ...` |
>
> - Làm bài **closed-book**: không mở `01-notes.md`, không mở `02-practice-questions.md`, không tra Google.
> - Câu nào được đánh dấu **(Chọn HAI)** thì phải chọn **đúng cả hai** đáp án mới được tính điểm — chọn 1 đúng 1 sai vẫn là **sai cả câu**.
> - Ghi hết 25 đáp án ra giấy hoặc một file riêng **trước khi** mở `03-gate-quiz-ANSWERS.md`.
> - File này **không chứa đáp án**. Toàn bộ 25 câu là câu **mới**, khác hoàn toàn với `02-practice-questions.md`.
> - Nguồn: **Practice Exam 2, 3, 7, 8, 9, 10** (trích dẫn `(Exam N - QX)` sau mỗi câu).
>
> **Nếu chưa đạt ≥20/25:** ôn lại phần bị sai trong `01-notes.md` — đặc biệt bảng Shared Responsibility Model và bảng phân biệt security services — rồi làm lại bài này.

---

**1.** What is the AWS feature that provides an additional level of security above the default authentication mechanism of usernames and passwords?  `(Exam 2 - Q8)`

- A. Encrypted keys.
- B. Email verification.
- C. AWS KMS.
- D. AWS MFA.

**2.** According to the AWS Acceptable Use Policy, which of the following statements is true regarding penetration testing of EC2 instances?  `(Exam 2 - Q12)`

- A. Penetration testing is not allowed in AWS.
- B. Penetration testing is performed automatically by AWS to determine vulnerabilities in your AWS infrastructure.
- C. Penetration testing can be performed by the customer on their own instances without prior authorization from AWS.
- D. The AWS customers are only allowed to perform penetration testing on services managed by AWS.

**3.** According to the AWS Shared responsibility model, which of the following are the responsibility of the customer? (Choose TWO)  **(Chọn HAI)**  `(Exam 2 - Q16)`

- A. Managing environmental events of AWS data centers.
- B. Protecting the confidentiality of data in transit in Amazon S3.
- C. Controlling physical access to AWS Regions.
- D. Ensuring that the underlying EC2 host is configured properly.
- E. Patching applications installed on Amazon EC2.

**4.** Which of the following services can help protect your web applications from SQL injection and other vulnerabilities in your application code?  `(Exam 2 - Q27)`

- A. Amazon Cognito.
- B. AWS IAM.
- C. Amazon Aurora.
- D. AWS WAF.

**5.** Based on the AWS Shared Responsibility Model, which of the following are the sole responsibility of AWS? (Choose TWO)  **(Chọn HAI)**  `(Exam 2 - Q29)`

- A. Monitoring network performance.
- B. Installing software on EC2 instances.
- C. Creating hypervisors.
- D. Configuring Access Control Lists (ACLs).
- E. Hardware maintenance.

**6.** Which of the following AWS security features is associated with an EC2 instance and functions to filter incoming traffic requests?  `(Exam 2 - Q44)`

- A. AWS X-Ray.
- B. Network ACL.
- C. Security Groups.
- D. VPC Flow logs.

**7.** What is the AWS service that performs automated network assessments of Amazon EC2 instances to check for vulnerabilities?  `(Exam 3 - Q16)`

- A. Amazon Kinesis.
- B. Security groups.
- C. Amazon Inspector.
- D. AWS Network Access Control Lists.

**8.** Under the Shared Responsibility Model, which of the following controls do customers fully inherit from AWS? (Choose TWO)  **(Chọn HAI)**  `(Exam 3 - Q17)`

- A. Patch management controls.
- B. Database controls.
- C. Awareness & Training.
- D. Environmental controls.
- E. Physical controls.

**9.** Which of the following is used to control network traffic in AWS? (Choose TWO)  **(Chọn HAI)**  `(Exam 3 - Q38)`

- A. Network Access Control Lists (NACLs).
- B. Key Pairs.
- C. Access Keys.
- D. IAM Policies.
- E. Security Groups.

**10.** Data security is one of the top priorities of AWS. How does AWS deal with old storage devices that have reached the end of their useful life?  `(Exam 3 - Q50)`

- A. AWS sells the old devices to other hosting providers.
- B. AWS destroys the old devices in accordance with industry-standard practices.
- C. AWS sends the old devices for remanufacturing.
- D. AWS stores the old devices in a secure place.

**11.** Which of the following services gives you access to all AWS auditor-issued reports and certifications?  `(Exam 7 - Q8)`

- A. AWS Artifact.
- B. AWS Config.
- C. Amazon CloudWatch.
- D. AWS CloudTrail.

**12.** Which of the following services enables you to easily generate and use your own encryption keys in the AWS Cloud?  `(Exam 7 - Q27)`

- A. AWS Shield.
- B. AWS Certificate Manager.
- C. AWS CloudHSM.
- D. AWS WAF.

**13.** Which of the following is the responsibility of AWS according to the AWS Shared Responsibility Model?  `(Exam 7 - Q34)`

- A. Securing regions and edge locations.
- B. Performing auditing tasks.
- C. Monitoring AWS resources usage.
- D. Securing access to AWS resources.

**14.** Who is responsible for scaling a DynamoDB database in the AWS Shared Responsibility Model?  `(Exam 7 - Q38)`

- A. Your security team.
- B. Your development team.
- C. AWS.
- D. Your internal DevOps team.

**15.** According to the AWS shared responsibility model, what are the controls that customers fully inherit from AWS? (Choose TWO)  **(Chọn HAI)**  `(Exam 7 - Q46)`

- A. Awareness and Training.
- B. Communications controls.
- C. Data center security controls.
- D. Environmental controls.
- E. Resource Configuration Management.

**16.** You have been tasked with auditing the security of your VPC. As part of this process, you need to start by analyzing what inbound and outbound traffic is allowed on your EC2 instances. What two parts of the VPC do you need to check to accomplish this task?  `(Exam 8 - Q4)`

- A. Network ACLs and Traffic Manager.
- B. Network ACLs and Subnets.
- C. Security Groups and Internet Gateways.
- D. Security Groups and Network ACLs.

**17.** What does Amazon GuardDuty do to protect AWS accounts and workloads?  `(Exam 8 - Q17)`

- A. Notifies AWS customers about abuse events once they are reported.
- B. Continuously monitors AWS infrastructure and helps detect threats such as attacker reconnaissance or account compromise.
- C. Helps AWS customers identify the root cause of potential security issues.
- D. Checks security groups for rules that allow unrestricted access to AWS. resources.

**18.** Which of the following AWS services integrates with AWS Shield and AWS Web Application Firewall (AWS WAF) to protect against network and application layer DDoS attacks?  `(Exam 8 - Q31)`

- A. Amazon EFS.
- B. AWS Secrets Manager.
- C. AWS Systems Manager.
- D. Amazon CloudFront.

**19.** Which of the following services is used when encrypting EBS volumes?  `(Exam 8 - Q32)`

- A. AWS WAF.
- B. AWS KMS.
- C. Amazon Macie.
- D. Amazon GuardDuty.

**20.** Which of the following security-related actions are available at no cost?  `(Exam 9 - Q9)`

- A. Calling AWS Support.
- B. Contacting AWS Professional Services to request a workshop.
- C. Accessing forums, blogs, and whitepapers.
- D. Attending AWS classes at a local university.

**21.** Which AWS service identifies security groups that allow unrestricted access to a user’s AWS resources?  `(Exam 9 - Q13)`

- A. AWS Trusted Advisor.
- B. Amazon Inspector.
- C. Amazon CloudWatch.
- D. AWS CloudTrail.

**22.** Under the AWS shared responsibility model, which of the following activities are the customer’s responsibility? (Select TWO)  **(Chọn HAI)**  `(Exam 9 - Q22)`

- A. Patching operating system components for Amazon Relational Database Server (Amazon RDS).
- B. Encrypting data on the client-side.
- C. Training the data center staff.
- D. Configuring Network Access Control Lists (ACL).
- E. Maintaining environmental controls within a data center.

**23.** Which service enables risk auditing by continuously monitoring and logging account activity, including user actions in the AWS Management Console and AWS SDKs?  `(Exam 9 - Q33)`

- A. Amazon CloudWatch.
- B. AWS CloudTrail.
- C. AWS Config.
- D. AWS Health.

**24.** Which security service automatically recognizes and classifies sensitive data or intellectual property on AWS?  `(Exam 10 - Q8)`

- A. Amazon GuardDuty.
- B. Amazon Macie.
- C. Amazon Inspector.
- D. AWS Shield.

**25.** Which AWS service allows users to identify the changes made to a resource over time?  `(Exam 10 - Q14)`

- A. Amazon Inspector.
- B. AWS Config.
- C. AWS Service Catalog.
- D. AWS IAM.

---

**Hết bài.** Ghi lại đáp án của bạn theo định dạng `1D, 2B, 3AC, ...` rồi mở file `03-gate-quiz-ANSWERS.md` để tự chấm.
