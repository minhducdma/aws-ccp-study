# Phase 3 — Gate Quiz (Cloud Technology & Services)

| Thông số | Giá trị |
|---|---|
| Số câu | 30 |
| Thời gian | **45 phút** |
| Điểm pass | **≥ 24/30 (80%)** |
| Định dạng trả lời | `1D, 2B, 3AC, ...` |

## Hướng dẫn

- Bấm đồng hồ **45 phút**, làm liền một mạch, không tra tài liệu và không mở `01-notes.md`.
- Trả lời theo đúng định dạng `1D, 2B, 3AC, ...` rồi gửi lại để chấm.
- Câu được đánh dấu **(Chọn HAI)** cần đúng cả hai lựa chọn mới được tính điểm; không có điểm một phần.
- Cần đúng **≥ 24/30** mới được sang Phase 4. Đáp án nằm ở file riêng `03-gate-quiz-ANSWERS.md` — đừng mở trước khi làm xong.

> Câu hỏi lấy từ practice exam 16, 17, 18, 19, 22, 23 — khác hoàn toàn với bộ câu trong `02-practice-questions.md`.

---

**1.** Which element of the AWS global infrastructure consists of one or more discrete data centers, each with redundant power, networking, and connectivity, which are housed in separate facilities?

- A. AWS Regions
- B. Availability Zones
- C. Edge locations
- D. Amazon CloudFront

**2.** Which of the following describes the relationships among AWS Regions, Availability Zones, and edge locations? (Choose two.) **(Chọn HAI)**

- A. There are more AWS Regions than Availability Zones.
- B. There are more edge locations than AWS Regions.
- C. An edge location is an Availability Zone.
- D. There are more AWS Regions than edge locations.
- E. There are more Availability Zones than AWS Regions.

**3.** Which component of AWS global infrastructure does Amazon CloudFront use to ensure low-latency delivery?

- A. AWS Regions
- B. AWS edge locations
- C. AWS Availability Zones
- D. Amazon Virtual Private Cloud (Amazon VPC.

**4.** A company is planning to launch an ecommerce site in a single AWS Region to a worldwide user base. Which AWS services will allow the company to reach users and provide low latency and high transfer speeds? (Choose two.) **(Chọn HAI)**

- A. Application Load Balancer
- B. AWS Global Accelerator
- C. AWS Direct Connect
- D. Amazon CloudFront
- E. AWS Lambda

**5.** Amazon Route 53 enables users to:

- A. encrypt data in transit
- B. register DNS domain names
- C. generate and manage SSL certificates
- D. establish a dedicated network connection to AWS

**6.** Which Amazon Virtual Private Cloud (Amazon VPC) feature enables users to connect two VPCs together?

- A. Amazon VPC endpoints
- B. Amazon Elastic Compute Cloud (Amazon EC2) ClassicLink
- C. Amazon VPC peering
- D. AWS Direct Connect

**7.** Which component must be attached to a VPC to enable inbound Internet access?

- A. NAT gateway
- B. VPC endpoint
- C. VPN connection
- D. Internet gateway

**8.** Which components are required to build a successful site-to-site VPN connection on AWS? (Choose two.) **(Chọn HAI)**

- A. Internet gateway
- B. NAT gateway
- C. Customer gateway
- D. Transit gateway
- E. Virtual private gateway

**9.** A pharmaceutical company operates its infrastructure in a single AWS Region. The company has thousands of VPCs in a various AWS accounts that it wants to interconnect. Which AWS service or feature should the company use to help simplify management and reduce operational costs?

- A. VPC endpoint
- B. AWS Direct Connect
- C. AWS Transit Gateway
- D. VPC peering

**10.** Which feature adds elasticity to Amazon EC2 instances to handle the changing demand for workloads?

- A. Resource groups
- B. Lifecycle policies
- C. Application Load Balancer
- D. Amazon EC2 Auto Scaling

**11.** Which Amazon EC2 pricing model is the MOST cost efficient for an uninterruptible workload that runs once a year for 24 hours?

- A. On-Demand Instances
- B. Reserved Instances
- C. Spot Instances
- D. Dedicated Instances

**12.** What is a characteristic of Convertible Reserved Instances (RIs)?

- A. Users can exchange Convertible RIs for other Convertible RIs from a different instance family with an equal or higher value than the Convertible Reserved Instances that you are exchanging.
- B. Users can exchange Convertible RIs for other Convertible RIs in different AWS Regions.
- C. Users can sell and buy Convertible RIs on the AWS Marketplace.
- D. Users can shorten the term of their Convertible RIs by merging them with other Convertible RIs.

**13.** Which AWS service allows customers to purchase unused Amazon EC2 capacity at an often discounted rate?

- A. Reserved Instances
- B. On-Demand Instances
- C. Dedicated Instances
- D. Spot Instances

**14.** A user must meet compliance and software licensing requirements that state a workload must be hosted on a physical server. Which Amazon EC2 instance pricing option will meet these requirements?

- A. Dedicated Hosts
- B. Dedicated Instances
- C. Spot Instances
- D. Reserved Instances

**15.** Which of the following AWS services are serverless? (Choose two.) **(Chọn HAI)**

- A. AWS Lambda
- B. Amazon Elasticsearch Service
- C. AWS Elastic Beanstalk
- D. Amazon DynamoDB
- E. Amazon Redshift

**16.** Which type of AWS storage is ephemeral and is deleted when an instance is stopped or terminated?

- A. Amazon EBS
- B. Amazon EC2 instance store
- C. Amazon EFS
- D. Amazon S3

**17.** What does the Amazon S3 Intelligent-Tiering storage class offer?

- A. Payment flexibility by reserving storage capacity
- B. Long-term retention of data by copying the data to an encrypted Amazon Elastic Block Store (Amazon EBS) volume
- C. Automatic cost savings by moving objects between tiers based on access pattern changes
- D. Secure, durable, and lowest cost storage for data archival

**18.** A Cloud Practitioner needs to store data for 7 years to meet regulatory requirements. Which AWS service will meet this requirement at the LOWEST cost?

- A. Amazon S3
- B. AWS Snowball
- C. Amazon Redshift
- D. Amazon S3 Glacier

**19.** A company has a 500 TB image repository that needs to be transported to AWS for processing. Which AWS service can import this data MOST cost-effectively?

- A. AWS Snowball
- B. AWS Direct Connect
- C. AWS VPN
- D. Amazon S3

**20.** Which AWS hybrid storage service enables on-premises applications to seamlessly use AWS Cloud storage through standard file-storage protocols?

- A. AWS Direct Connect
- B. AWS Snowball
- C. AWS Storage Gateway
- D. AWS Snowball Edge

**21.** Which of the following services is a MySQL-compatible database that automatically grows storage as needed?

- A. Amazon Elastic Compute Cloud (Amazon EC2)
- B. Amazon Relational Database Service (Amazon RDS) for MySQL
- C. Amazon Lightsail
- D. Amazon Aurora

**22.** A company has a MySQL database running on a single Amazon EC2 instance. The company now requires higher availability in the event of an outage. Which set of tasks would meet this requirement?

- A. Add an Application Load Balancer in front of the EC2 instance
- B. Configure EC2 Auto Recovery to move the instance to another Availability Zone
- C. Migrate to Amazon RDS and enable Multi-AZ
- D. Enable termination protection for the EC2 instance to avoid outages

**23.** A company has multiple data sources across the organization and wants to consolidate data into one data warehouse. Which AWS service can be used to meet this requirement?

- A. Amazon DynamoDB
- B. Amazon Redshift
- C. Amazon Athena
- D. Amazon QuickSight

**24.** A company is building an application that requires the ability to send, store, and receive messages between application components. The company has another requirement to process messages in first-in, first-out (FIFO) order. Which AWS service should the company use?

- A. AWS Step Functions
- B. Amazon Simple Notification Service (Amazon SNS)
- C. Amazon Kinesis Data Streams
- D. Amazon Simple Queue Service (Amazon SQS)

**25.** Which AWS service or feature is used to send both text and email messages from distributed applications?

- A. Amazon Simple Notification Service (Amazon SNS)
- B. Amazon Simple Email Service (Amazon SES)
- C. Amazon CloudWatch alerts
- D. Amazon Simple Queue Service (Amazon SQS)

**26.** A company wants to monitor the CPU usage of its Amazon EC2 resources. Which AWS service should the company use?

- A. AWS CloudTrail
- B. Amazon CloudWatch
- C. AWS Cost and Usage report
- D. Amazon Simple Notification Service (Amazon SNS)

**27.** A user needs to regularly audit and evaluate the setup of all AWS resources, identify non-compliant accounts, and be notified when a resource changes. Which AWS service can be used to meet these requirements?

- A. AWS Trusted Advisor
- B. AWS Config
- C. AWS Resource Access Manager
- D. AWS Systems Manager

**28.** A user has limited knowledge of AWS services, but wants to quickly deploy a scalable Node.js application in the AWS Cloud. Which service should be used to deploy the application?

- A. AWS CloudFormation
- B. AWS Elastic Beanstalk
- C. Amazon EC2
- D. AWS OpsWorks

**29.** Which services manage and automate application deployments on AWS? (Choose two.) **(Chọn HAI)**

- A. AWS Elastic Beanstalk
- B. AWS CodeCommit
- C. AWS Data Pipeline
- D. AWS CloudFormation
- E. AWS Config

**30.** What time-savings advantage is offered with the use of Amazon Rekognition?

- A. Amazon Rekognition provides automatic watermarking of images.
- B. Amazon Rekognition provides automatic detection of objects appearing in pictures.
- C. Amazon Rekognition provides the ability to resize millions of images automatically.
- D. Amazon Rekognition uses Amazon Mechanical Turk to allow humans to bid on object detection jobs.

---

**Hết bài.** Gửi đáp án theo định dạng `1D, 2B, 3AC, ...` rồi mở `03-gate-quiz-ANSWERS.md` để đối chiếu.
