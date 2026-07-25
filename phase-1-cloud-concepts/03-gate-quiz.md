# Phase 1 — GATE QUIZ (Domain 1: Cloud Concepts)

> ## Hướng dẫn làm bài
>
> | | |
> |---|---|
> | **Số câu** | 20 |
> | **Thời gian** | **30 phút** |
> | **Điểm pass** | **≥ 16/20 (80%)** |
> | **Định dạng trả lời** | `1D, 2B, 3AC, ...` |
>
> - Làm bài **closed-book**: không mở `01-notes.md`, không mở `02-practice-questions.md`, không tra Google.
> - Câu nào được đánh dấu **(Chọn HAI)** thì phải chọn **đúng cả hai** đáp án mới được tính điểm — chọn 1 đúng 1 sai vẫn là **sai cả câu**.
> - Ghi hết 20 đáp án ra giấy hoặc một file riêng **trước khi** mở `03-gate-quiz-ANSWERS.md`.
> - File này **không chứa đáp án**. Toàn bộ 20 câu là câu **mới**, khác hoàn toàn với `02-practice-questions.md`.
> - Nguồn: **Practice Exam 8, 9, 10** (trích dẫn `(Exam N - QX)` sau mỗi câu).
>
> **Nếu chưa đạt ≥16/20:** ôn lại phần bị sai trong `01-notes.md` rồi làm lại bài này sau ~30 phút.

---

**1.** Amazon EC2 instances are conceptually very similar to traditional servers. However, using Amazon EC2 server instances in the same manner as traditional hardware server instances is only a starting point. What are the main benefits of using the AWS EC2 instances instead of traditional servers? (Choose TWO)  **(Chọn HAI)**  `(Exam 8 - Q8)`

- A. Improves Fault-Tolerance.
- B. Provides your business with a seamless remote accessibility.
- C. Prevents unauthorized users from getting into your network.
- D. Provides automatic data backups.
- E. Can be scaled manually in a shorter period of time.

**2.** How can you increase your application’s fault-tolerance while it is being hosted in AWS?  `(Exam 8 - Q22)`

- A. Deploy your application across multiple EC2 instances.
- B. Deploy your application across multiple Availability Zones.
- C. Host your application on one powerful EC2 instance type instead of multiple smaller instances.
- D. Deploy the underlying application resources across multiple subnets.

**3.** Which of the following is a benefit of the "Loose Coupling" architecture principle?  `(Exam 8 - Q25)`

- A. It eliminates the need for change management.
- B. It allows for Cross-Region Replication.
- C. It helps AWS customers reduce Privileged Access to AWS resources.
- D. It allows individual application components or services to be modified without affecting other components.

**4.** Which of the following Cloud Computing deployment models eliminates the need to run and maintain physical data centers?  `(Exam 8 - Q27)`

- A. On-premises.
- B. IaaS.
- C. PaaS.
- D. Cloud.

**5.** The elasticity of the AWS Cloud enables customers to save costs when compared to traditional hosting providers. What can AWS customers do to benefit from the elasticity of the AWS Cloud? (Choose TWO)  **(Chọn HAI)**  `(Exam 8 - Q35)`

- A. Deploy your resources across multiple Availability Zones.
- B. Use Amazon EC2 Auto Scaling.
- C. Deploy your resources in another region.
- D. Use Elastic Load Balancing.
- E. Use Serverless Computing whenever possible.

**6.** Which pillar of the AWS Well-Architected Framework provides recommendations to help customers select the right compute resources based on workload requirements?  `(Exam 8 - Q41)`

- A. Operational Excellence.
- B. Security.
- C. Performance Efficiency.
- D. Reliability.

**7.** How many Availability Zones should compute resources be provisioned across to achieve high availability?  `(Exam 8 - Q46)`

- A. A minimum of one.
- B. A minimum of two.
- C. A minimum of three.
- D. A minimum of four or more.

**8.** The AWS Cloud’s multiple Regions are an example of:  `(Exam 8 - Q47)`

- A. Agility.
- B. Global infrastructure.
- C. Elasticity.
- D. Pay-as-you-go pricing.

**9.** Which is a recommended pattern for designing a highly available architecture on AWS?  `(Exam 8 - Q49)`

- A. Ensure that components have low-latency network connectivity.
- B. Run enough Amazon EC2 instances to operate at peak load.
- C. Ensure that the application is designed to accommodate failure of any single component.
- D. Use a monolithic application that handles all operations.

**10.** Which of the following are pillars of the AWS Well-Architected Framework? (Select TWO)  **(Chọn HAI)**  `(Exam 9 - Q12)`

- A. Multiple Availability Zones.
- B. Performance efficiency.
- C. Security.
- D. Encryption usage.
- E. High availability.

**11.** Which design principles for cloud architecture are recommended when re-architecting a large monolithic application? (Select TWO)  **(Chọn HAI)**  `(Exam 9 - Q14)`

- A. Use manual monitoring.
- B. Use fixed servers.
- C. Implement loose coupling.
- D. Rely on individual components.
- E. Design for scalability.

**12.** When architecting cloud applications, which of the following are a key design principle?  `(Exam 9 - Q15)`

- A. Use the largest instance possible.
- B. Provision capacity for peak load.
- C. Use the Scrum development process.
- D. Implement elasticity.

**13.** Which AWS feature will reduce the customer’s total cost of ownership (TCO)?  `(Exam 9 - Q18)`

- A. Shared responsibility security model.
- B. Single tenancy.
- C. Elastic computing.
- D. Encryption.

**14.** Which of the following is a benefit of using the AWS Cloud?  `(Exam 9 - Q19)`

- A. Permissive security removes the administrative burden.
- B. Ability to focus on revenue-generating activities.
- C. Control over cloud network hardware.
- D. Choice of specific cloud hardware vendors.

**15.** How do customers benefit from Amazon’s massive economies of scale?  `(Exam 9 - Q25)`

- A. Periodic price reductions as the result of Amazon’s operational efficiencies.
- B. New Amazon EC2 instance types providing the latest hardware.
- C. The ability to scale up and down when needed.
- D. Increased reliability in the underlying hardware of Amazon EC2 instances.

**16.** The financial benefits of using AWS are: (Select TWO)  **(Chọn HAI)**  `(Exam 9 - Q35)`

- A. Reduced Total Cost of Ownership (TCO).
- B. Increased capital expenditure (capex).
- C. Reduced operational expenditure ( opex ).
- D. Deferred payment plans for startups.
- E. Business credit lines for startups.

**17.** According to best practices, how should an application be designed to run in the AWS Cloud?  `(Exam 10 - Q15)`

- A. Use tightly coupled components.
- B. Use loosely coupled components.
- C. Use infrequently coupled components.
- D. Use frequently coupled components.

**18.** How does AWS shorten the time to provision IT resources?  `(Exam 10 - Q27)`

- A. It supplies an online IT ticketing platform for resource requests.
- B. It supports automatic code validation services.
- C. It provides the ability to programmatically provision existing resources.
- D. It automates the resource request process from a company’s IT vendor list.

**19.** What technology enables compute capacity to adjust as loads change?  `(Exam 10 - Q35)`

- A. Load balancing.
- B. Automatic failover.
- C. Round robin.
- D. Auto Scaling.

**20.** Distributing workloads across multiple Availability Zones supports which cloud architecture design principle?  `(Exam 10 - Q49)`

- A. Implement automation.
- B. Design for agility.
- C. Design for failure.
- D. Implement elasticity.

---

**Hết bài.** Ghi lại đáp án của bạn theo định dạng `1D, 2B, 3AC, ...` rồi mở file `03-gate-quiz-ANSWERS.md` để tự chấm.
