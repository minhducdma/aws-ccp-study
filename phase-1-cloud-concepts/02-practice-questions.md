# Phase 1 — Practice Questions (Domain 1: Cloud Concepts)

> **Domain 1 — Cloud Concepts (24%)**
> 46 câu hỏi **thật** được chọn từ các practice exam của repo [kananinirav/AWS-Certified-Cloud-Practitioner-Notes](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes), giữ nguyên câu chữ và đáp án gốc.
> Nguồn: **Practice Exam 1, 2, 3, 4, 7** — mỗi câu đều có trích dẫn `(Exam N - QX)` để bạn đối chiếu lại bản gốc.
>
> **Cách làm:** làm hết 46 câu, ghi đáp án ra giấy/file riêng theo định dạng `1D, 2B, 3AC, ...`, **rồi mới** mở phần Đáp án ở cuối file. Câu có `(Choose TWO)` / `(Select TWO)` là câu chọn nhiều đáp án.
>
> Chủ đề bao phủ: value proposition · IaaS/PaaS/SaaS · deployment models · Well-Architected 6 pillars · design principles · cloud economics (CapEx/OpEx, TCO, right sizing) · migration (CAF, MAP, DMS, Snow Family) · AWS ecosystem.

---

**1.** Which of the following is an example of horizontal scaling in the AWS Cloud?  `(Exam 1 - Q2)`

- A. Replacing an existing EC2 instance with a larger, more powerful one.
- B. Increasing the compute capacity of a single EC2 instance to address the growing demands of an application.
- C. Adding more RAM capacity to an EC2 instance.
- D. Adding more EC2 instances of the same size to handle an increase in traffic.

**2.** Which of the below options are related to the reliability of AWS? (Choose TWO)  `(Exam 1 - Q4)`

- A. Applying the principle of least privilege to all AWS resources.
- B. Automatically provisioning new resources to meet demand.
- C. All AWS services are considered Global Services, and this design helps customers serve their international users.
- D. Providing compensation to customers if issues occur.
- E. Ability to recover quickly from failures.

**3.** A company has developed an eCommerce web application in AWS. What should they do to ensure that the application has the highest level of availability?  `(Exam 1 - Q7)`

- A. Deploy the application across multiple Availability Zones and Edge locations.
- B. Deploy the application across multiple Availability Zones and subnets.
- C. Deploy the application across multiple Regions and Availability Zones.
- D. Deploy the application across multiple VPC’s and subnets.

**4.** What does AWS Snowball provide? (Choose TWO)  `(Exam 1 - Q8)`

- A. Built-in computing capabilities that allow customers to process data locally.
- B. A catalog of third-party software solutions that customers need to build solutions and run their businesses.
- C. A hybrid cloud storage between on-premises environments and the AWS Cloud.
- D. An Exabyte-scale data transfer service that allows you to move extremely large amounts of data to AWS.
- E. Secure transfer of large amounts of data into and out of the AWS.

**5.** A Japanese company hosts their applications on Amazon EC2 instances in the Tokyo Region. The company has opened new branches in the United States, and the US users are complaining of high latency. What can the company do to reduce latency for the users in the US while minimizing costs?  `(Exam 1 - Q10)`

- A. Applying the Amazon Connect latency-based routing policy.
- B. Registering a new US domain name to serve the users in the US.
- C. Building a new data center in the US and implementing a hybrid model.
- D. Deploying new Amazon EC2 instances in a Region located in the US.

**6.** A company has decided to migrate its Oracle database to AWS. Which AWS service can help achieve this without negatively impacting the functionality of the source database?  `(Exam 1 - Q12)`

- A. AWS OpsWorks.
- B. AWS Database Migration Service.
- C. AWS Server Migration Service.
- D. AWS Application Discovery Service.

**7.** Adjusting compute capacity dynamically to reduce cost is an implementation of which AWS cloud best practice?  `(Exam 1 - Q13)`

- A. Build security in every layer.
- B. Parallelize tasks.
- C. Implement elasticity.
- D. Adopt monolithic architecture.

**8.** What are the benefits of having infrastructure hosted in AWS? (Choose TWO)  `(Exam 1 - Q14)`

- A. Increasing speed and agility.
- B. There is no need to worry about security.
- C. Gaining complete control over the physical infrastructure.
- D. Operating applications on behalf of customers.
- E. All of the physical security and most of the data/network security are taken care of for you.

**9.** What is the advantage of the AWS-recommended practice of "decoupling" applications?  `(Exam 1 - Q15)`

- A. Allows treating an application as a single, cohesive unit.
- B. Reduces inter-dependencies so that failures do not impact other components of the application.
- C. Allows updates of any monolithic application quickly and easily.
- D. Allows tracking of any API call made to any AWS service.

**10.** One of the most important AWS best-practices to follow is the cloud architecture principle of elasticity. How does this principle improve your architecture’s design?  `(Exam 1 - Q19)`

- A. By automatically scaling your on-premises resources based on changes in demand.
- B. By automatically scaling your AWS resources using an Elastic Load Balancer.
- C. By reducing interdependencies between application components wherever possible.
- D. By automatically provisioning the required AWS resources based on changes in demand.

**11.** Which of the following does NOT belong to the AWS Cloud Computing models?  `(Exam 1 - Q23)`

- A. Platform as a Service (PaaS).
- B. Infrastructure as a Service (IaaS).
- C. Software as a Service (SaaS).
- D. Networking as a Service (NaaS).

**12.** Which of the following are examples of AWS-Managed Services, where AWS is responsible for the operational and maintenance burdens of running the service? (Choose TWO)  `(Exam 1 - Q32)`

- A. Amazon VPC.
- B. Amazon DynamoDB.
- C. Amazon Elastic MapReduce.
- D. AWS IAM.
- E. Amazon Elastic Compute Cloud.

**13.** In order to implement best practices when dealing with a “Single Point of Failure,” you should attempt to build as much automation as possible in both detecting and reacting to failure. Which of the following AWS services would help? (Choose TWO)  `(Exam 1 - Q39)`

- A. ELB.
- B. Auto Scaling.
- C. Amazon Athen.
- D. ECR.
- E. Amazon EC2.

**14.** What does AWS provide to deploy popular technologies such as IBM MQ on AWS with the least amount of effort and time?  `(Exam 1 - Q49)`

- A. Amazon Aurora.
- B. Amazon CloudWatch.
- C. AWS Quick Start reference deployments.
- D. AWS OpsWorks.

**15.** A company is concerned that they are spending money on underutilized compute resources in AWS. Which AWS feature will help ensure that their applications are automatically adding/removing EC2 compute capacity to closely match the required demand?  `(Exam 2 - Q3)`

- A. AWS Elastic Load Balancer.
- B. AWS Budgets.
- C. AWS Auto Scaling.
- D. AWS Cost Explorer.

**16.** Which of the below is a best-practice when designing solutions on AWS?  `(Exam 2 - Q11)`

- A. Invest heavily in architecting your environment, as it is not easy to change your design later.
- B. Use AWS reservations to reduce costs when testing your production environment.
- C. Automate wherever possible to make architectural (© ) experimentation easier.
- D. Provision a large compute capacity to handle any spikes in load

**17.** The principle “design for failure and nothing will fail” is very important when designing your AWS Cloud architecture. Which of the following would help adhere to this principle? (Choose TWO)  `(Exam 2 - Q14)`

- A. Multi-factor authentication.
- B. Availability Zones.
- C. Elastic Load Balancing.
- D. Penetration testing.
- E. Vertical Scaling.

**18.** Which of the following is one of the benefits of moving infrastructure from an on-premises data center to AWS?  `(Exam 2 - Q23)`

- A. Free support for all enterprise customers.
- B. Automatic data protection.
- C. Reduced Capital Expenditure (CapEx).
- D. AWS holds responsibility for managing customer applications.

**19.** Which of the following are important design principles you should adopt when designing systems on AWS? (Choose TWO)  `(Exam 2 - Q24)`

- A. Always use Global Services in your architecture rather than Regional Services.
- B. Always choose to pay as you go.
- C. Treat servers as fixed resources.
- D. Automate wherever possible.
- E. Remove single points of failure.

**20.** What is the AWS service that provides you the highest level of control over the underlying virtual infrastructure?  `(Exam 2 - Q30)`

- A. Amazon Redshift.
- B. Amazon DynamoDB.
- C. Amazon EC2.
- D. Amazon RDS.

**21.** What are two advantages of using Cloud Computing over using traditional data centers? (Choose TWO)  `(Exam 2 - Q33)`

- A. Reserved Compute capacity.
- B. Eliminating Single Points of Failure (SPOFs).
- C. Distributed infrastructure.
- D. Virtualized compute resources.
- E. Dedicated hosting.

**22.** Which statement best describes the operational excellence pillar of the AWS Well-Architected Framework?  `(Exam 2 - Q35)`

- A. The ability of a system to recover gracefully from failure.
- B. The efficient use of computing resources to meet requirements.
- C. The ability to monitor systems and improve supporting processes and procedures.
- D. The ability to manage datacenter operations more efficiently.

**23.** Which of the following activities may help reduce your AWS monthly costs?  `(Exam 2 - Q42)`

- A. Enabling Amazon EC2 Auto Scaling for all of your workloads.
- B. Using the AWS Network Load Balancer (NLB) to load balance the incoming HTTP requests.
- C. Removing all of your Cost Allocation Tags.
- D. Deploying your AWS resources across multiple Availability Zones.

**24.** A company has created a solution that helps AWS customers improve their architectures on AWS. Which AWS program may support this company?  `(Exam 2 - Q48)`

- A. APN Consulting Partners.
- B. AWS TAM.
- C. APN Technology Partners.
- D. AWS Professional Services.

**25.** Jessica is managing an e-commerce web application in AWS. The application is hosted on six EC2 instances. One day, three of the instances crashed; but none of her customers were affected. What has Jessica done correctly in this scenario?  `(Exam 2 - Q50)`

- A. She has properly built an elastic system.
- B. She has properly built a fault tolerant system.
- C. She has properly built an encrypted system.
- D. She has properly built a scalable system.

**26.** Using Amazon EC2 falls under which of the following cloud computing models?  `(Exam 3 - Q11)`

- A. Iaas & SaaS.
- B. IaaS.
- C. SaaS.
- D. PaaS.

**27.** Which of the below is a best-practice when building applications on AWS?  `(Exam 3 - Q12)`

- A. Strengthen physical security by applying the principle of least privilege.
- B. Ensure that the application runs on hardware from trusted vendors.
- C. Use IAM policies to maintain performance.
- D. Decouple the components of the application so that they run independently.

**28.** Your application has recently experienced significant global growth, and international users are complaining of high latency. What is the AWS characteristic that can help improve your international users’ experience?  `(Exam 3 - Q19)`

- A. Elasticity.
- B. Global reach.
- C. Data durability.
- D. High availability.

**29.** A company has business critical workloads hosted on AWS and they are unwilling to accept any downtime. Which of the following is a recommended best practice to protect their workloads in the event of an unexpected natural disaster?  `(Exam 3 - Q21)`

- A. Replicate data across multiple Edge Locations worldwide and use Amazon CloudFront to perform automatic failover in the event of an outage.
- B. Deploy AWS resources across multiple Availability Zones within the same AWS Region.
- C. Create point-in-time backups in another subnet and recover this data when a disaster occurs.
- D. Deploy AWS resources to another AWS Region and implement an Active-Active disaster recovery strategy.

**30.** Which of the following should be considered when performing a TCO analysis to compare the costs of running an application on AWS instead of on-premises?  `(Exam 3 - Q29)`

- A. Application development.
- B. Market research.
- C. Business analysis.
- D. Physical hardware.

**31.** Which of the following statements describes the AWS Cloud’s agility?  `(Exam 3 - Q34)`

- A. AWS allows you to host your applications in multiple regions around the world.
- B. AWS provides customizable hardware at the lowest possible cost.
- C. AWS allows you to provision resources in minutes.
- D. AWS allows you to pay upfront to reduce costs.

**32.** Why does every AWS Region contain multiple Availability Zones?  `(Exam 3 - Q47)`

- A. Multiple Availability Zones allows you to build resilient and highly available architectures.
- B. Multiple Availability Zones results in lower total cost compared to deploying in a single Availability Zone.
- C. Multiple Availability Zones allows for data replication and global reach.
- D. Multiple Availability Zones within a region increases the storage capacity available in that region.

**33.** Which of the following is a benefit of running an application in multiple Availability Zones?  `(Exam 3 - Q49)`

- A. Allows you to exceed AWS service limits.
- B. Reduces application response time between servers and global users.
- C. Increases available compute capacity.
- D. Increases the availability of your application.

**34.** A customer is planning to move billions of images and videos to be stored on Amazon S3. The customer has approximately 60 Petabytes of data to move. Which of the following AWS Services is the best choice to transfer the data to AWS?  `(Exam 4 - Q6)`

- A. Snowball.
- B. S3 Transfer Acceleration.
- C. Snowmobile.
- D. Amazon VPC.

**35.** What are the benefits of using an AWS-managed service? (Choose TWO)  `(Exam 4 - Q11)`

- A. Provides complete control over the virtual infrastructure.
- B. Allows customers to deliver new solutions faster.
- C. Lowers operational complexity.
- D. Eliminates the need to encrypt data.
- E. Allows developers to control all patching related activities.

**36.** Which of the following AWS Services helps with planning application migration to the AWS Cloud?  `(Exam 4 - Q21)`

- A. AWS Snowball Migration Service.
- B. AWS Application Discovery Service.
- C. AWS DMS.
- D. AWS Migration Hub.

**37.** Which design principles relate to performance efficiency in AWS? (Choose TWO)  `(Exam 4 - Q28)`

- A. Build multi-region architectures to better serve global customers.
- B. Apply security at all layers.
- C. Implement strong Identity and Access controls.
- D. Use serverless architectures.
- E. Enable audit logging.

**38.** Why would an organization decide to use AWS over an on-premises data center? (Choose TWO)  `(Exam 4 - Q30)`

- A. Free commercial software licenses.
- B. Free technical support.
- C. Elastic resources.
- D. On-site visits for auditing.
- E. Cost Savings.

**39.** What is the framework created by AWS Professional Services that helps organizations design a road map to successful cloud adoption?  `(Exam 4 - Q35)`

- A. AWS Secrets Manager.
- B. AWS WAF.
- C. AWS CAF.
- D. Amazon EFS.

**40.** TYMO Cloud Corp is looking forward to migrating their entire on-premises data center to AWS. What tool can they use to perform a cost-benefit analysis of moving to the AWS Cloud?  `(Exam 4 - Q36)`

- A. AWS Cost Explorer.
- B. AWS TCO Calculator.
- C. AWS Budgets.
- D. AWS Pricing Calculator.

**41.** Which of the following activities supports the Operational Excellence pillar of the AWS Well-Architected Framework?  `(Exam 4 - Q37)`

- A. Using AWS Trusted Advisor to find underutilized resources.
- B. Using AWS CloudTrail to record user activities.
- C. Using AWS CloudFormation to manage infrastructure as code.
- D. Deploying an application in multiple Availability Zones.

**42.** Why do many startup companies prefer AWS over traditional on-premises solutions? (Choose TWO)  `(Exam 4 - Q38)`

- A. AWS allows them to pay later when their business succeed.
- B. AWS can build complete data centers faster than any other Cloud provider.
- C. Using AWS, they can reduce time-to-market by focusing on business activities rather than on building and managing data centers.
- D. AWS removes the need to invest in operational expenditure.
- E. Using AWS allows companies to replace large capital expenditure with low variable costs.

**43.** As part of the AWS Migration Acceleration Program (MAP), what does AWS provide to accelerate Enterprise adoption of AWS? (Choose TWO)  `(Exam 4 - Q41)`

- A. AWS Partners.
- B. AWS Artifact.
- C. AWS Professional Services.
- D. Amazon Athena.
- E. Amazon PinPoint.

**44.** The owner of an E-Commerce application notices that the compute capacity requirements vary heavily from time to time. What makes AWS more economical than traditional data centers for this type of application?  `(Exam 7 - Q17)`

- A. AWS allows customers to launch powerful EC2 instances to handle spikes in load.
- B. AWS allows customers to pay upfront to get bigger discounts.
- C. AWS allows customers to launch and terminate EC2 instances based on demand.
- D. AWS allows customers to choose cheaper types of EC2 instances that best fit their needs.

**45.** Which of the following AWS services would help you migrate on-premise databases to AWS?  `(Exam 7 - Q19)`

- A. AWS DMS.
- B. Amazon S3 Transfer Acceleration.
- C. AWS Directory Service.
- D. AWS Transit Gateway.

**46.** What are some key design principles for designing public cloud systems? (Choose TWO)  `(Exam 7 - Q25)`

- A. Reserved capacity instead of on demand.
- B. Loose coupling over tight coupling.
- C. Servers instead of managed services.
- D. Disposable resources instead of fixed servers.
- E. Multi-AZ deployments instead of multi-region deployments.

---

<details>
<summary><b>Đáp án</b> — chỉ mở sau khi đã làm hết toàn bộ câu hỏi phía trên</summary>

### Bảng đáp án nhanh (46 câu)

1D, 2BE, 3C, 4AE, 5D, 6B, 7C, 8AE, 9B, 10D, 11D, 12BC, 13AB, 14C, 15C, 16C, 17BC, 18C, 19DE, 20C, 21BC, 22C, 23A, 24A, 25B, 26B, 27D, 28B, 29D, 30D, 31C, 32A, 33D, 34C, 35BC, 36B, 37AD, 38CE, 39C, 40B, 41C, 42CE, 43AC, 44C, 45A, 46BD

### Giải thích chi tiết

**1. Đáp án: D** — `(Exam 1 - Q2)`

Horizontal scaling (scale out) là **thêm nhiều instance cùng kích cỡ** để chia tải. A, B, C đều là mô tả của vertical scaling (scale up) — nâng cấp một instance duy nhất lên loại lớn hơn hoặc thêm RAM, nên đều sai.

**2. Đáp án: B, E** — `(Exam 1 - Q4)`

Reliability = khả năng **tự động provision tài nguyên đáp ứng demand** (B) và **phục hồi nhanh khỏi failure** (E). C sai vì phần lớn AWS service là *regional*, không phải global; D sai vì AWS không đền bù tiền cho khách hàng; A là Security pillar chứ không phải Reliability.

**3. Đáp án: C** — `(Exam 1 - Q7)`

Mức availability **cao nhất** đạt được khi deploy trên **nhiều Region và nhiều AZ** — Region là ranh giới cách ly lớn nhất. Bẫy là B: nhiều AZ + nhiều subnet chỉ chống được lỗi trong một Region; subnet nằm *trong* AZ nên không thêm độ dự phòng nào. A cũng sai vì Edge location dùng để cache/phân phối nội dung, không dùng để chạy application.

**4. Đáp án: A, E** — `(Exam 1 - Q8)`

Snowball có **built-in compute** cho phép xử lý dữ liệu ngay tại local/edge (A) và dùng để **chuyển an toàn lượng lớn dữ liệu vào và ra khỏi AWS** (E). D sai vì exabyte-scale là **Snowmobile**, không phải Snowball; C là mô tả của **Storage Gateway**; B là **AWS Marketplace**.

**5. Đáp án: D** — `(Exam 1 - Q10)`

Cách giảm latency cho user Mỹ với chi phí thấp nhất là **deploy EC2 instance ở một Region tại Mỹ** — tận dụng global reach của AWS mà không phải đầu tư hạ tầng. C sai vì xây data center mới là CapEx lớn, đi ngược lại lợi ích cloud; B (đổi domain) và A (Amazon Connect là contact center, không phải routing policy — routing policy thuộc Route 53) đều không liên quan.

**6. Đáp án: B** — `(Exam 1 - Q12)`

**AWS DMS** cho phép migrate database sang AWS trong khi **source database vẫn tiếp tục hoạt động bình thường** (continuous replication). Bẫy là C — Server Migration Service dùng để chuyển *máy chủ/VM*, không phải database; D (Application Discovery Service) chỉ *lập kế hoạch/khám phá*, không migrate.

**7. Đáp án: C** — `(Exam 1 - Q13)`

Điều chỉnh compute capacity **động** theo nhu cầu để giảm chi phí chính là định nghĩa của **Implement elasticity**. B (parallelize tasks) nói về chia việc song song để tăng throughput, không liên quan tới việc cắt chi phí theo demand; D là phản best-practice (AWS khuyến nghị *decouple*, không phải monolithic).

**8. Đáp án: A, E** — `(Exam 1 - Q14)`

Hai lợi ích đúng là **tăng speed & agility** (A) và **AWS lo toàn bộ physical security cùng phần lớn data/network security** (E). B là bẫy kinh điển — bạn *vẫn* phải chịu trách nhiệm security *in* the cloud; C sai vì bạn không bao giờ có quyền kiểm soát hạ tầng vật lý; D sai vì AWS không vận hành application thay bạn.

**9. Đáp án: B** — `(Exam 1 - Q15)`

Decoupling **giảm inter-dependencies để lỗi của một component không lan sang component khác**. A và C mô tả kiến trúc monolithic — đúng nghĩa ngược lại của decoupling; D là mô tả của CloudTrail.

**10. Đáp án: D** — `(Exam 1 - Q19)`

Elasticity = **tự động provision tài nguyên AWS cần thiết dựa trên thay đổi của demand**. Bẫy là B: ELB chỉ *phân phối traffic*, việc scale là do Auto Scaling — và câu B mô tả sai cơ chế; A sai vì elasticity áp dụng cho tài nguyên AWS chứ không phải on-premises; C là định nghĩa của loose coupling.

**11. Đáp án: D** — `(Exam 1 - Q23)`

**NaaS (Networking as a Service)** không phải một cloud computing model của AWS. Ba model duy nhất là IaaS, PaaS, SaaS — đây là câu 'chọn cái KHÔNG thuộc' nên đừng đọc vội.

**12. Đáp án: B, C** — `(Exam 1 - Q32)`

**DynamoDB** và **Amazon EMR** là AWS-managed service — AWS gánh việc vận hành và bảo trì. EC2 (E) sai vì bạn phải tự quản OS và patch; VPC (A) và IAM (D) là feature bạn tự cấu hình, AWS không 'vận hành thay bạn' theo nghĩa managed service.

**13. Đáp án: A, B** — `(Exam 1 - Q39)`

**ELB** (phát hiện instance unhealthy qua health check và ngừng gửi traffic) kết hợp **Auto Scaling** (tự thay thế instance lỗi) là bộ đôi chuẩn để tự động detect + react với failure. Bẫy là E: EC2 tự thân chính là *thành phần có thể lỗi*, thêm EC2 mà không có ELB/ASG thì vẫn là SPOF.

**14. Đáp án: C** — `(Exam 1 - Q49)`

**AWS Quick Start reference deployments** là các bản deploy tự động 'gold-standard' (dựa trên CloudFormation) cho công nghệ phổ biến như IBM MQ — nhanh nhất và ít công sức nhất. OpsWorks (D) là configuration management với Chef/Puppet, bạn vẫn phải tự viết recipe nên tốn effort hơn nhiều.

**15. Đáp án: C** — `(Exam 2 - Q3)`

**AWS Auto Scaling** tự động thêm/bớt EC2 capacity để khớp sát demand, nhờ đó không còn tài nguyên underutilized. Bẫy là D: Cost Explorer chỉ *cho bạn thấy* tiền đã tiêu, nó không hề thay đổi capacity; ELB (A) chỉ phân phối traffic.

**16. Đáp án: C** — `(Exam 2 - Q11)`

Best practice của AWS là **automate ở mọi nơi có thể để việc thử nghiệm kiến trúc trở nên dễ dàng** — đây chính là một trong các General Guiding Principles của Well-Architected. A sai vì trên cloud đổi thiết kế rất dễ (không cần đầu tư nặng ngay từ đầu); D sai vì over-provision là chống lại elasticity.

**17. Đáp án: B, C** — `(Exam 2 - Q14)`

'Design for failure' được hiện thực hóa bằng **Availability Zones** (cách ly lỗi vật lý) và **Elastic Load Balancing** (chuyển traffic khỏi instance lỗi). E (Vertical Scaling) sai vì instance to hơn vẫn là một SPOF duy nhất; A và D là biện pháp security, không liên quan tới fault tolerance.

**18. Đáp án: C** — `(Exam 2 - Q23)`

Lợi ích rõ nhất khi rời data center on-premises là **giảm Capital Expenditure (CapEx)** — bạn không còn phải mua server trước. B sai vì bảo vệ dữ liệu không 'tự động' (bạn phải bật encryption, backup); D sai vì theo Shared Responsibility Model, application của khách hàng vẫn do khách hàng chịu trách nhiệm.

**19. Đáp án: D, E** — `(Exam 2 - Q24)`

Hai design principle đúng là **Automate wherever possible** và **Remove single points of failure**. C là bẫy nặng — AWS dạy coi server là **disposable**, không phải 'fixed resources'; A sai vì phần lớn service là regional và multi-region là quyết định theo yêu cầu, không phải nguyên tắc mặc định; B (luôn chọn pay-as-you-go) không phải design principle và cũng không tối ưu cho workload chạy liên tục.

**20. Đáp án: C** — `(Exam 2 - Q30)`

**Amazon EC2** là IaaS nên cho bạn **mức kiểm soát cao nhất** trên hạ tầng ảo bên dưới (chọn OS, patch, network, storage). RDS, Redshift, DynamoDB đều là managed service — AWS giữ quyền kiểm soát lớp bên dưới nên bạn kiểm soát ít hơn.

**21. Đáp án: B, C** — `(Exam 2 - Q33)`

So với data center truyền thống, cloud mang lại **khả năng loại bỏ Single Point of Failure** (nhiều AZ/Region) và **hạ tầng phân tán** toàn cầu. A và E (reserved capacity, dedicated hosting) sai vì data center truyền thống cũng có; D (virtualized compute) cũng không phải điểm khác biệt — on-premises hoàn toàn có thể ảo hóa.

**22. Đáp án: C** — `(Exam 2 - Q35)`

Operational Excellence = **khả năng monitor hệ thống và cải tiến các process/procedure hỗ trợ**. A là Reliability, B là Performance Efficiency, D là bẫy vì trên cloud bạn không vận hành data center nữa.

**23. Đáp án: A** — `(Exam 2 - Q42)`

Bật **EC2 Auto Scaling** cho workload sẽ giảm hóa đơn vì bạn chỉ chạy đúng số instance cần tại mỗi thời điểm. C là bẫy ngược — xóa Cost Allocation Tags không tiết kiệm được đồng nào, tag chỉ là công cụ *phân tích* chi phí; B và D còn có thể làm **tăng** cost (thêm NLB, thêm data transfer giữa AZ).

**24. Đáp án: A** — `(Exam 2 - Q48)`

Công ty *cung cấp dịch vụ* giúp khách hàng AWS cải thiện kiến trúc thuộc **APN Consulting Partners**. Bẫy là C — Technology Partners cung cấp *software/tool* chạy trên AWS, không phải dịch vụ tư vấn; D (AWS Professional Services) là team của chính AWS, không phải program dành cho công ty bên ngoài.

**25. Đáp án: B** — `(Exam 2 - Q50)`

Ba trong sáu instance chết mà **không khách hàng nào bị ảnh hưởng** → hệ thống **fault tolerant** (chịu lỗi mà vẫn phục vụ). A (elastic) sai vì elasticity nói về việc tự thêm/bớt tài nguyên theo demand, còn ở đây không có thông tin về việc tự thay thế; D (scalable) nói về khả năng tăng capacity, cũng không phải điều được chứng minh trong tình huống này.

**26. Đáp án: B** — `(Exam 3 - Q11)`

EC2 cung cấp server ảo mà bạn tự quản OS → thuần **IaaS**. Bẫy là A: EC2 không phải SaaS ở bất kỳ khía cạnh nào; ví dụ SaaS của AWS là Amazon Chime, còn PaaS là Elastic Beanstalk.

**27. Đáp án: D** — `(Exam 3 - Q12)`

Best practice là **decouple các component để chúng chạy độc lập**. A sai vì least privilege là nguyên tắc *IAM*, không liên quan tới physical security (đó là việc của AWS); C sai vì IAM policy dùng cho access control, không phải để tối ưu performance.

**28. Đáp án: B** — `(Exam 3 - Q19)`

Đặc tính giúp cải thiện trải nghiệm của user quốc tế là **Global reach** — hạ tầng AWS phủ toàn cầu để bạn đặt workload gần user. Bẫy là A: elasticity giải quyết *biến động tải*, không giải quyết *khoảng cách địa lý*; D (HA) nói về uptime, không phải latency.

**29. Đáp án: D** — `(Exam 3 - Q21)`

Không chấp nhận downtime kể cả khi thảm họa tự nhiên xảy ra → phải **deploy sang Region khác với chiến lược Active-Active DR**. Bẫy là B: thảm họa tự nhiên có thể ảnh hưởng cả một Region, nên multi-AZ *trong cùng Region* là chưa đủ; A sai vì Edge Location chỉ cache nội dung, không chạy được ứng dụng.

**30. Đáp án: D** — `(Exam 3 - Q29)`

TCO analysis phải tính khoản mà on-premises có và cloud không có — trong đó rõ nhất là **physical hardware** (server, storage, network) cùng chi phí facility. A, B, C (application development, market research, business analysis) là chi phí *giống nhau* dù bạn host ở đâu, nên không thuộc phép so sánh TCO.

**31. Đáp án: C** — `(Exam 3 - Q34)`

**Agility** = **provision tài nguyên trong vài phút**, nhờ đó thử nghiệm và đưa sản phẩm ra thị trường nhanh. A mô tả global reach; D mô tả pricing model (Reserved/upfront), không phải agility.

**32. Đáp án: A** — `(Exam 3 - Q47)`

Mỗi Region có nhiều AZ để bạn **xây được kiến trúc resilient và highly available** — AZ có điện/cooling/network độc lập nên lỗi không lan. B sai vì multi-AZ thường *tốn hơn* single-AZ (thêm data transfer, thêm instance); D sai vì AZ không làm tăng dung lượng storage của Region.

**33. Đáp án: D** — `(Exam 3 - Q49)`

Chạy ứng dụng trên nhiều AZ **tăng availability** — nếu một AZ sự cố thì AZ còn lại vẫn phục vụ. B là bẫy: giảm latency cho user toàn cầu là việc của multi-Region/CloudFront, chứ AZ đều nằm trong cùng một Region; A và C hoàn toàn không phải lợi ích của multi-AZ.

**34. Đáp án: C** — `(Exam 4 - Q6)`

60 **Petabyte** là quy mô vượt xa Snowball → phải dùng **Snowmobile** (exabyte-scale, xe container 45 feet). A (Snowball) là TB→PB, sẽ cần hàng trăm thiết bị; B (S3 Transfer Acceleration) đi qua Internet nên với 60 PB sẽ mất thời gian và chi phí băng thông rất lớn.

**35. Đáp án: B, C** — `(Exam 4 - Q11)`

Managed service giúp **đưa giải pháp mới ra nhanh hơn** (B) và **giảm operational complexity** (C) vì AWS lo patching, backup, scaling. A sai vì managed service *giảm* mức kiểm soát hạ tầng; D sai vì bạn vẫn phải quyết định và bật encryption cho dữ liệu của mình; E sai vì đúng ra bạn *không còn* phải patch.

**36. Đáp án: B** — `(Exam 4 - Q21)`

**AWS Application Discovery Service** thu thập inventory, dependency và utilization của server on-premises — đó chính là dữ liệu để **lập kế hoạch** migration. Bẫy là D: Migration Hub *theo dõi tiến độ* migration chứ không thực hiện việc discovery/planning; C (DMS) là công cụ thực thi migrate database.

**37. Đáp án: A, D** — `(Exam 4 - Q28)`

Performance Efficiency khuyến nghị **go global in minutes / multi-region để phục vụ khách toàn cầu** (A) và **dùng serverless architecture** (D). B và C (apply security at all layers, strong identity controls) thuộc pillar **Security**; E (audit logging) cũng là Security/Operational Excellence.

**38. Đáp án: C, E** — `(Exam 4 - Q30)`

Hai lý do chính là **elastic resources** và **cost savings**. A và B sai vì AWS không cho license thương mại hay technical support miễn phí (Basic support chỉ có mức rất hạn chế); D sai vì khách hàng **không** được vào data center của AWS để audit — thay vào đó dùng AWS Artifact.

**39. Đáp án: C** — `(Exam 4 - Q35)`

**AWS CAF (Cloud Adoption Framework)** do AWS Professional Services tạo, giúp tổ chức xây **roadmap** cloud adoption qua 6 perspectives. Các lựa chọn còn lại là service kỹ thuật (Secrets Manager, WAF, EFS) hoàn toàn không phải framework.

**40. Đáp án: B** — `(Exam 4 - Q36)`

**AWS TCO Calculator** dùng để làm **cost-benefit analysis** giữa on-premises và AWS. Bẫy là D: Pricing Calculator ước tính chi phí *của một kiến trúc AWS* chứ không so sánh với on-premises; A (Cost Explorer) và C (Budgets) chỉ áp dụng cho chi tiêu AWS *đã phát sinh*.

**41. Đáp án: C** — `(Exam 4 - Q37)`

**Dùng CloudFormation để quản hạ tầng dưới dạng code** chính là design principle 'perform operations as code' của **Operational Excellence**. A thuộc Cost Optimization, B thuộc Security, D thuộc Reliability — đây là dạng câu bắt bạn map activity vào pillar.

**42. Đáp án: C, E** — `(Exam 4 - Q38)`

Startup chọn AWS để **giảm time-to-market bằng cách tập trung vào business thay vì xây/quản data center** (C) và để **thay CapEx lớn bằng variable cost thấp** (E). D là bẫy chữ nghĩa: AWS loại bỏ **capital** expenditure, còn chi phí trên AWS chính là **operational** expenditure; A hoàn toàn không tồn tại.

**43. Đáp án: A, C** — `(Exam 4 - Q41)`

Trong **MAP**, AWS cung cấp **AWS Partners** và **AWS Professional Services** để tăng tốc adoption cho Enterprise. B (Artifact) là nơi tải báo cáo compliance, D (Athena) và E (Pinpoint) là service kỹ thuật — không phải nguồn lực con người của một migration program.

**44. Đáp án: C** — `(Exam 7 - Q17)`

Với workload có nhu cầu compute **biến động mạnh**, AWS kinh tế hơn data center vì bạn có thể **launch và terminate EC2 instance theo demand** — chỉ trả tiền khi thực dùng. A và D chỉ nói về việc chọn instance, không giải quyết vấn đề *biến động*; B (trả trước để có discount) lại đi ngược lại nhu cầu linh hoạt.

**45. Đáp án: A** — `(Exam 7 - Q19)`

**AWS DMS** là service chuyên dùng để migrate database on-premises lên AWS. B (S3 Transfer Acceleration) chỉ tăng tốc upload file lên S3; C (Directory Service) là quản lý identity; D (Transit Gateway) là kết nối network.

**46. Đáp án: B, D** — `(Exam 7 - Q25)`

Hai design principle đúng cho hệ thống public cloud là **loose coupling thay vì tight coupling** và **disposable resources thay vì fixed server**. C là ngược hoàn toàn (AWS khuyến nghị 'services, not servers'); A và E là quyết định tùy tình huống, không phải nguyên tắc thiết kế.

</details>
