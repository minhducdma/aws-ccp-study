# Phase 4 — Practice Questions (Domain 4: Billing, Pricing & Support)

> **34 câu hỏi thật** lấy nguyên văn từ Practice Exam 1, 13, 14, 15 của repo [kananinirav/AWS-Certified-Cloud-Practitioner-Notes](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes).
> Trong đó có **4 câu multiple-response** (đề ghi rõ "Choose TWO" / "Select TWO" / "Select three").
>
> **Cách làm:** đọc `01-notes.md` trước. Làm hết cả 34 câu, ghi đáp án ra giấy theo định dạng `1D, 2B, 3AC, ...`, rồi mới mở phần Đáp án ở cuối file để tự chấm.
>
> Mục tiêu: đúng **≥28/34**. Nếu thấp hơn, quay lại đọc mục tương ứng trong `01-notes.md` trước khi làm Gate Quiz.

---

## Câu hỏi

### A — Pricing models: On-Demand, Spot, Reserved, Dedicated Host

**1.** One benefit of On-Demand Amazon Elastic Compute Cloud (Amazon EC2) pricing is:

- A. the ability to bid for a lower hourly cost.
- B. paying a daily rate regardless of time used.
- C. paying only for time used.
- D. pre-paying for instances and paying a lower hourly rate.

*(Exam 15 - Q13)*

**2.** You want to run a questionnaire application for only one day (without interruption), which Amazon EC2 purchase option should you use?

- A. Reserved instances.
- B. Spot instances.
- C. Dedicated instances.
- D. On-demand instances.

*(Exam 1 - Q28)*

**3.** You are working on a project that involves creating thumbnails of millions of images. Consistent uptime is not an issue, and continuous processing is not required. Which EC2 buying option would be the most cost-effective?

- A. Reserved Instances.
- B. On-demand Instances.
- C. Dedicated Instances.
- D. Spot Instances.

*(Exam 1 - Q29)*

**4.** Which Amazon EC2 instance pricing model can provide discounts of up to 90%?

- A. Reserved Instances
- B. On-Demand
- C. Dedicated Hosts
- D. Spot Instances

*(Exam 14 - Q2)*

**5.** Which Amazon EC2 pricing model adjusts based on supply and demand of EC2 instances?

- A. On-Demand Instances
- B. Reserved Instances
- C. Spot Instances
- D. Convertible Reserved Instances

*(Exam 14 - Q28)*

**6.** A company is migrating an application that is running non-interruptible workloads for a three-year time frame. <br/> Which pricing construct would provide the MOST cost-effective solution?

- A. Amazon EC2 Spot Instances
- B. Amazon EC2 Dedicated Instances
- C. Amazon EC2 On-Demand Instances
- D. Amazon EC2 Reserved Instances

*(Exam 15 - Q24)*

**7.** Which of the following Reserved Instance (RI) pricing models provides the highest average savings compared to On-Demand pricing?

- A. One-year, No Upfront, Standard RI pricing
- B. One-year, All Upfront, Convertible RI pricing
- C. Three-year, All Upfront, Standard RI pricing
- D. Three-year, No Upfront, Convertible RI pricing

*(Exam 13 - Q18)*

**8.** Which of the Reserved Instance (RI) pricing models can change the attributes of the RI as long as the exchange results in the creation of RIs of equal or greater value?

- A. Dedicated RIs
- B. Scheduled RIs
- C. Convertible RIs
- D. Standard RIs

*(Exam 13 - Q23)*

**9.** An organization has decided to purchase an Amazon EC2 Reserved Instance (RI) for three years in order to reduce costs. It is possible that the application workloads could change during the reservation period. What is the EC2 Reserved Instance (RI) type that will allow the company to exchange the purchased reserved instance for another reserved instance with higher computing power if they need to?

- A. Elastic RI.
- B. Premium RI.
- C. Standard RI.
- D. Convertible RI.

*(Exam 1 - Q50)*

**10.** Which of the following Amazon EC2 pricing models allow customers to use existing server-bound software license ?

- A. Spot Instances
- B. Reserved Instances
- C. Dedicated Hosts
- D. On-Demand Instances

*(Exam 13 - Q8)*

**11.** How does AWS charge for AWS Lambda?

- A. Users bid on the maximum price they are willing to pay per hour.
- B. Users choose a 1-, 3- or 5-year upfront payment term.
- C. Users pay for the required permanent storage on a file system or in a database.
- D. Users pay based on the number of requests and consumed compute resources.

*(Exam 15 - Q48)*

---

### B — Công cụ quản lý chi phí

**12.** How can you view the distribution of AWS spending in one of your AWS accounts?

- A. By using Amazon VPC console.
- B. By contacting the AWS Support team.
- C. By using AWS Cost Explorer.
- D. By contacting the AWS Finance team.

*(Exam 1 - Q35)*

**13.** Which AWS Cost Management tool allows you to view the most granular data about your AWS bill?

- A. AWS Cost Explorer
- B. AWS Budgets
- C. AWS Cost and Usage report
- D. AWS Billing dashboard

*(Exam 14 - Q37)*

**14.** Which of the following helps a customer view the Amazon EC2 billing activity for the past month?

- A. AWS Budgets.
- B. AWS Pricing Calculator.
- C. AWS Systems Manager.
- D. AWS Cost & Usage Reports.

*(Exam 1 - Q16)*

**15.** A startup company is operating on limited funds and is extremely concerned about cost overruns. Which of the below options can be used to notify the company when their monthly AWS bill exceeds $2000? (Choose TWO)

- A. Setup a CloudWatch billing alarm that triggers an SNS notification when the threshold is exceeded.
- B. Configure the Amazon Simple Email Service to send billing alerts to their email address on a daily basis.
- C. Configure the AWS Budgets Service to alert the company when the threshold is exceeded.
- D. Configure AWS CloudTrail to automatically delete all AWS resources when the threshold is exceeded.
- E. Configure the Amazon Connect Service to alert the company when the threshold is exceeded.

*(Exam 1 - Q20)*

**16.** The use of what AWS feature or service allows companies to track and categorize spending on a detailed level?

- A. Cost allocation tags
- B. Consolidated billing
- C. AWS Budgets
- D. AWS Marketplace

*(Exam 13 - Q1)*

**17.** Which AWS tools assist with estimating costs? (Select three.)

- A. Detailed billing report
- B. Cost allocation tags
- C. AWS Simple Monthly Calculator
- D. AWS Total Cost of Ownership (TCO) Calculator
- E. Cost Eliminator

*(Exam 13 - Q16)*

**18.** How should a customer forecast the future costs for running a new web application?

- A. Amazon Aurora Backtrack
- B. Amazon CloudWatch Billing Alarms
- C. AWS Simple Monthly Calculator
- D. AWS Cost and Usage report

*(Exam 15 - Q33)*

**19.** Which of the following inspects AWS environments to find opportunities that can save money for users and also improve system performance ?

- A. AWS Cost Explorer
- B. AWS Trusted Advisor
- C. Consolidated billing
- D. Detailed billing

*(Exam 13 - Q7)*

---

### C — AWS Organizations & Consolidated Billing

**20.** What do you gain from setting up consolidated billing for five different AWS accounts under another master account?

- A. AWS services’ costs will be reduced to half the original price.
- B. The consolidated billing feature is just for organizational purpose.
- C. Each AWS account gets volume discounts.
- D. Each AWS account gets five times the free-tier services capacity.

*(Exam 1 - Q17)*

**21.** You have set up consolidated billing for several AWS accounts. One of the accounts has purchased a number of reserved instances for 3 years. Which of the following is true regarding this scenario?

- A. The Reserved Instance discounts can only be shared with the master account.
- B. All accounts can receive the hourly cost benefit of the Reserved Instances.
- C. The purchased instances will have better performance than On-demand instances.
- D. There are no cost benefits from using consolidated billing; It is for informational purposes only.

*(Exam 1 - Q6)*

**22.** Which of the following are advantages of AWS consolidated billing? (Select TWO.)

- A. The ability to receive one bill for multiple accounts
- B. Service limits increasing by default in all accounts
- C. A fixed discount on the monthly bill
- D. Potential volume discounts, as usage in all accounts is combined
- E. The automatic extension of the master account's AWS support plan to all accounts

*(Exam 13 - Q17)*

**23.** Which service allows a company with multiple AWS accounts to combine its usage to obtain volume discounts?

- A. AWS Server Migration Service
- B. AWS Organizations
- C. AWS Budgets
- D. AWS Trusted Advisor

*(Exam 14 - Q26)*

**24.** A customer is using multiple AWS accounts with separate billing. <br/>How can the customer take advantage of volume discounts with minimal impact to the AWS resources?

- A. Create one global AWS account and move all AWS resources to that account.
- B. Sign up for three years of Reserved Instance pricing up front.
- C. Use the consolidated billing feature from AWS Organizations.
- D. Sign up for the AWS Enterprise support plan to get volume discounts.

*(Exam 13 - Q47)*

---

### D — Support Plans

**25.** Which is the MINIMUM AWS Support plan that provides technical support through phone calls?

- A. Enterprise
- B. Business
- C. Developer
- D. Basic

*(Exam 15 - Q34)*

**26.** Which is the MINIMUM AWS Support plan that allows for one-hour target response time for support cases?

- A. Enterprise
- B. Business
- C. Developer
- D. Basic

*(Exam 14 - Q30)*

**27.** Which AWS support plan includes a dedicated Technical Account Manager?

- A. Developer
- B. Enterprise
- C. Business
- D. Basic

*(Exam 14 - Q44)*

**28.** Which is the minimum AWS Support plan that includes Infrastructure Event Management without additional costs?

- A. Enterprise
- B. Business
- C. Developer
- D. Basic

*(Exam 15 - Q6)*

**29.** As part of the Enterprise support plan, who is the primary point of contact for ongoing support needs?

- A. AWS Identity and Access Management (IAM) user.
- B. Infrastructure Event Management (IEM) engineer.
- C. AWS Consulting Partners.
- D. Technical Account Manager (TAM).

*(Exam 1 - Q34)*

**30.** Which of the following are categories of AWS Trusted Advisor? (Select TWO.)

- A. Fault Tolerance
- B. Instance Usage
- C. Infrastructure
- D. Performance
- E. Storage Capacity

*(Exam 15 - Q30)*

---

### E — Liên hệ ai & AWS Ecosystem

**31.** A company has an AWS Enterprise Support plan. They want quick and efficient guidance with their billing and account inquiries. Which of the following should the company use?

- A. AWS Health Dashboard.
- B. AWS Support Concierge.
- C. AWS Customer Service.
- D. AWS Operations Support.

*(Exam 1 - Q9)*

**32.** You have AWS Basic support, and you have discovered that some AWS resources are being used maliciously, and those resources could potentially compromise your data. What should you do?

- A. Contact the AWS Customer Service team.
- B. Contact the AWS Abuse team.
- C. Contact the AWS Concierge team.
- D. Contact the AWS Security team.

*(Exam 1 - Q37)*

**33.** What AWS team assists customers with accelerating cloud adoption through paid engagements in any of several specialty practice area ?

- A. AWS Enterprise Support
- B. AWS Solutions Architects
- C. AWS Professional Services
- D. AWS Account Managers

*(Exam 13 - Q3)*

**34.** Where should a company go to search software listings from independent software vendors to find, test, buy and deploy software that runs on AWS?

- A. AWS Marketplace
- B. Amazon Lumberyard
- C. AWS Artifact
- D. Amazon CloudSearch

*(Exam 14 - Q20)*

---

## Bảng ghi đáp án

Ghi đáp án của bạn vào đây trước khi mở phần giải thích:

```
1.___  2.___  3.___  4.___  5.___  6.___
7.___  8.___  9.___  10.___  11.___  12.___
13.___  14.___  15.___  16.___  17.___  18.___
19.___  20.___  21.___  22.___  23.___  24.___
25.___  26.___  27.___  28.___  29.___  30.___
31.___  32.___  33.___  34.___
```

---

<details>
<summary><b>Đáp án</b> (bấm để mở — chỉ mở sau khi đã làm hết!)</summary>

### Đáp án nhanh

| Câu | Đáp án | Câu | Đáp án | Câu | Đáp án |
|---|---|---|---|---|---|
| 1 | **C** | 2 | **D** | 3 | **D** |
| 4 | **D** | 5 | **C** | 6 | **D** |
| 7 | **C** | 8 | **C** | 9 | **D** |
| 10 | **C** | 11 | **D** | 12 | **C** |
| 13 | **C** | 14 | **D** | 15 | **A, C** |
| 16 | **A** | 17 | **B, C, D** | 18 | **C** |
| 19 | **B** | 20 | **C** | 21 | **B** |
| 22 | **A, D** | 23 | **B** | 24 | **C** |
| 25 | **B** | 26 | **B** | 27 | **B** |
| 28 | **A** | 29 | **D** | 30 | **A, D** |
| 31 | **B** | 32 | **B** | 33 | **C** |
| 34 | **A** |  |  |  |  |

### Giải thích chi tiết

**1. Đáp án: C** — *(Exam 15 - Q13)*

On-Demand tính tiền theo đúng thời gian thực tế sử dụng (theo giây với Linux/Windows, tối thiểu 60 giây), không trả trước và không cam kết. A ("bid for a lower hourly cost") là đặc trưng của Spot; D (trả trước để có giá giờ thấp hơn) là Reserved Instances.

**2. Đáp án: D** — *(Exam 1 - Q28)*

Chạy đúng một ngày nên không đáng cam kết 1–3 năm → loại Reserved. Yêu cầu "without interruption" loại Spot, vì AWS có thể thu hồi Spot bất cứ lúc nào. Dedicated Instances chỉ giải quyết cách ly hardware, đắt hơn mà nhu cầu không cần.

**3. Đáp án: D** — *(Exam 1 - Q29)*

"Consistent uptime is not an issue" + "continuous processing is not required" = workload chịu được ngắt → Spot, rẻ nhất (giảm tới 90%). On-Demand chạy được nhưng đắt hơn nhiều; Reserved đòi cam kết 1–3 năm cho một job không chạy liên tục.

**4. Đáp án: D** — *(Exam 14 - Q2)*

Mốc giảm giá cần nhớ: Spot tới 90%, Reserved tới 75%, Savings Plans tới 72%. On-Demand là giá gốc nên không giảm; Dedicated Hosts còn đắt hơn On-Demand.

**5. Đáp án: C** — *(Exam 14 - Q28)*

Giá Spot dao động theo lượng capacity nhàn rỗi (cung) và nhu cầu thị trường. On-Demand và Reserved đều có giá niêm yết cố định, không biến động theo cung-cầu.

**6. Đáp án: D** — *(Exam 15 - Q24)*

Hai tín hiệu: thời hạn xác định 3 năm (cam kết được) và non-interruptible (loại Spot) → Reserved Instances, giảm tới 75%. Dedicated Instances không phải công cụ tiết kiệm; On-Demand không có mức giảm nào cho cam kết dài hạn.

**7. Đáp án: C** — *(Exam 13 - Q18)*

Cả ba yếu tố đều đẩy mức giảm lên cao nhất: thời hạn dài nhất (3 năm) + trả trước toàn bộ (All Upfront) + loại ít linh hoạt nhất (Standard). Đáp án D cũng có "three-year" nhưng No Upfront và Convertible nên giảm ít hơn đáng kể — đây chính là chỗ bẫy.

**8. Đáp án: C** — *(Exam 13 - Q23)*

Đúng định nghĩa Convertible RI: được exchange sang RI khác (khác instance family, OS, tenancy) miễn là giá trị bằng hoặc lớn hơn. Standard RI chỉ modify được AZ/size trong cùng family, không đổi được attribute. "Dedicated RIs" và "Scheduled RIs" không phải khái niệm dùng cho tình huống này.

**9. Đáp án: D** — *(Exam 1 - Q50)*

Workload có thể thay đổi trong 3 năm nên cần quyền exchange → Convertible RI. Standard RI không cho đổi sang instance có computing power cao hơn. "Elastic RI" và "Premium RI" không tồn tại.

**10. Đáp án: C** — *(Exam 13 - Q8)*

Dedicated Host cho bạn thuê trọn một server vật lý và nhìn thấy socket/core, nên là lựa chọn duy nhất dùng được license gắn với server (BYOL, tính theo socket hoặc core). Reserved và On-Demand là mô hình thanh toán trên hạ tầng dùng chung; Spot còn có thể bị thu hồi.

**11. Đáp án: D** — *(Exam 15 - Q48)*

Lambda tính tiền theo số request cộng với thời gian thực thi nhân bộ nhớ cấp phát. A là mô hình bid của Spot; B là kiểu trả trước của Reserved; C là cách tính tiền storage.

**12. Đáp án: C** — *(Exam 1 - Q35)*

Cost Explorer là công cụ trực quan hoá và phân tích phân bổ chi phí theo service, account, tag và thời gian. Không cần liên hệ Support cho việc này; "AWS Finance team" không phải kênh dành cho khách hàng; VPC console không liên quan tới chi phí.

**13. Đáp án: C** — *(Exam 14 - Q37)*

Cost and Usage Report là bộ dữ liệu billing chi tiết nhất — line item theo giờ hoặc ngày cho từng service kèm metadata về pricing và reservation. Cost Explorer trực quan nhưng ở mức tổng hợp cao hơn; Budgets chỉ đặt ngưỡng và cảnh báo; Billing dashboard chỉ là tổng quan.

**14. Đáp án: D** — *(Exam 1 - Q16)*

Câu hỏi cần dữ liệu chi phí đã phát sinh trong tháng trước ở mức từng service → Cost & Usage Reports. Pricing Calculator chỉ ước lượng cho thứ chưa triển khai; Budgets là cảnh báo ngưỡng chứ không phải báo cáo; Systems Manager không phải công cụ billing. (Lưu ý: Cost Explorer cũng xem được, nhưng nó không có trong danh sách đáp án.)

**15. Đáp án: A, C** — *(Exam 1 - Q20)*

Hai cách chuẩn để được thông báo khi hoá đơn vượt ngưỡng: CloudWatch billing alarm bắn SNS notification, và AWS Budgets. SES là service gửi email cho ứng dụng, tự nó không theo dõi chi phí; CloudTrail chỉ ghi log API và không xoá resource; Amazon Connect là contact center.

**16. Đáp án: A** — *(Exam 13 - Q1)*

Cost allocation tags cho phép gắn nhãn resource (phòng ban, project, môi trường) rồi bóc tách chi phí theo nhãn đó — đúng nghĩa "detailed level". Consolidated billing chỉ gộp hoá đơn; Budgets chỉ cảnh báo ngưỡng; Marketplace là nơi mua software.

**17. Đáp án: B, C, D** — *(Exam 13 - Q16)*

Simple Monthly Calculator ước lượng hoá đơn tháng và TCO Calculator so sánh với on-premises — đây là hai công cụ ước lượng rõ ràng. Cost allocation tags được đề tính là công cụ hỗ trợ ước lượng vì nó bóc tách chi phí theo nhóm resource để làm cơ sở dự toán. "Detailed billing report" là chi phí đã phát sinh (không phải ước lượng) và "Cost Eliminator" không tồn tại.

**18. Đáp án: C** — *(Exam 15 - Q33)*

Ứng dụng mới chưa chạy nên chưa có dữ liệu usage thật → phải dùng công cụ ước lượng trước (Simple Monthly Calculator, ngày nay là AWS Pricing Calculator). CloudWatch billing alarm và Cost and Usage report đều dựa trên chi phí đã phát sinh; Aurora Backtrack là tính năng rollback database.

**19. Đáp án: B** — *(Exam 13 - Q7)*

Trusted Advisor có cả category Cost Optimization và Performance nên là đáp án duy nhất bao trùm cả hai yêu cầu. Cost Explorer chỉ phân tích chi phí, hoàn toàn không đánh giá performance — đó là chỗ bẫy.

**20. Đáp án: C** — *(Exam 1 - Q17)*

Consolidated billing gộp usage của tất cả account để đạt bậc volume discount, nên mọi account đều được hưởng đơn giá tốt hơn. Nó không giảm giá 50%, không chỉ mang tính tổ chức, và không nhân số lần Free Tier lên (cả Organization được coi như một account cho Free Tier).

**21. Đáp án: B** — *(Exam 1 - Q6)*

RI được pool và chia sẻ trong Organization, nên account nào chạy instance khớp cũng nhận được hourly cost benefit — không riêng master account. RI không làm instance chạy nhanh hơn (nó chỉ là mô hình thanh toán), và consolidated billing có lợi ích chi phí thật chứ không chỉ để xem thông tin.

**22. Đáp án: A, D** — *(Exam 13 - Q17)*

Hai lợi ích thật: một hoá đơn duy nhất cho nhiều account, và volume discount nhờ gộp usage. Service limit vẫn tính theo từng account nên B sai; không có mức giảm cố định nào nên C sai; support plan là theo từng account, không tự lan từ master xuống nên E sai.

**23. Đáp án: B** — *(Exam 14 - Q26)*

AWS Organizations, thông qua consolidated billing, gộp usage của nhiều account để đạt bậc giảm giá theo khối lượng. Budgets chỉ cảnh báo ngưỡng; Trusted Advisor chỉ khuyến nghị; Server Migration Service dùng để migrate VM lên AWS.

**24. Đáp án: C** — *(Exam 13 - Q47)*

"Minimal impact to the AWS resources" là chìa khoá: consolidated billing chỉ thay đổi cách xuất hoá đơn, không phải di chuyển resource. Gộp mọi thứ vào một account (A) tác động rất lớn; mua RI 3 năm (B) là giảm giá do cam kết chứ không phải volume discount; support plan (D) không liên quan gì tới volume discount.

**25. Đáp án: B** — *(Exam 15 - Q34)*

Developer chỉ có email trong giờ làm việc tới Cloud Support Associates. Từ Business mới có 24/7 phone, email và chat với Cloud Support Engineers. Enterprise cũng có nhưng câu hỏi hỏi mức TỐI THIỂU nên đáp án là Business.

**26. Đáp án: B** — *(Exam 14 - Q30)*

Mốc phản hồi dưới 1 giờ dành cho case "production system down", chỉ xuất hiện từ Business trở lên. Developer cao nhất chỉ đạt "system impaired < 12 giờ làm việc". Enterprise cũng đạt 1 giờ nhưng không phải mức tối thiểu.

**27. Đáp án: B** — *(Exam 14 - Q44)*

TAM chỉ định riêng (dedicated/designated) là đặc quyền của Enterprise; Business không có TAM. Lưu ý đề này viết trước khi Enterprise On-Ramp ra mắt — On-Ramp có TAM dạng pool, còn TAM "dedicated" vẫn thuộc Enterprise.

**28. Đáp án: A** — *(Exam 15 - Q6)*

Business có Infrastructure Event Management nhưng phải trả phí thêm. Câu hỏi nhấn "without additional costs" nên đáp án là Enterprise (ngày nay Enterprise On-Ramp cũng đã bao gồm IEM).

**29. Đáp án: D** — *(Exam 1 - Q34)*

TAM là đầu mối liên hệ chính cho nhu cầu support liên tục và tư vấn kỹ thuật chủ động. IEM engineer chỉ tham gia theo từng sự kiện cụ thể; Consulting Partners là đối tác bên ngoài AWS; IAM user là một danh tính, không phải người hỗ trợ.

**30. Đáp án: A, D** — *(Exam 15 - Q30)*

Năm category của Trusted Advisor là Cost Optimization, Performance, Security, Fault Tolerance và Service Limits. "Instance Usage", "Infrastructure" và "Storage Capacity" đều không phải category — đây là bẫy chỉ cần nhớ đúng 5 cái tên là gỡ được.

**31. Đáp án: B** — *(Exam 1 - Q9)*

Concierge Support Team là đội chuyên trả lời nhanh các thắc mắc về billing và account best practices, chỉ có ở Enterprise (và Enterprise On-Ramp). Health Dashboard chỉ báo tình trạng service; Customer Service có ở mọi plan nhưng không phải đặc quyền "quick and efficient" của Enterprise; "AWS Operations Support" không tồn tại.

**32. Đáp án: B** — *(Exam 1 - Q37)*

AWS Abuse team xử lý việc resource AWS bị dùng cho mục đích xấu, và dùng được với mọi plan kể cả Basic. Customer Service chỉ lo billing/account; Concierge chỉ có ở Enterprise nên account Basic không tiếp cận được; "AWS Security team" không phải kênh liên hệ của khách hàng.

**33. Đáp án: C** — *(Exam 13 - Q3)*

AWS Professional Services là đội của chính AWS, làm việc theo hợp đồng có phí (paid engagement) để tăng tốc cloud adoption trong nhiều lĩnh vực chuyên môn. Enterprise Support là gói support thuê bao, không phải engagement theo dự án; Solutions Architects và Account Managers hỗ trợ trước bán hàng và không tính phí theo engagement.

**34. Đáp án: A** — *(Exam 14 - Q20)*

AWS Marketplace là catalog số của các independent software vendor, gồm AMI, CloudFormation template, SaaS và container; chi phí mua đi thẳng vào hoá đơn AWS. Artifact là nơi tải báo cáo compliance; Lumberyard là game engine; CloudSearch là service tìm kiếm.

### Chấm điểm

| Số câu đúng | Kết luận |
|---|---|
| 30–34 | Rất tốt — sang `03-gate-quiz.md` ngay |
| 26–29 | Ổn — đọc lại phần "Câu hỏi hay bẫy" trong `01-notes.md` rồi làm Gate Quiz |
| 20–25 | Đọc lại mục 2, 5 và 9 của `01-notes.md` (pricing models, cost tools, support plans) |
| < 20 | Học lại toàn bộ `01-notes.md` rồi làm lại file này |

</details>
