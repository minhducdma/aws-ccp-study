# Phase 3 — Bộ câu hỏi luyện tập (Cloud Technology & Services)

**73 câu hỏi thật** lấy nguyên văn từ practice exam 1, 6, 7, 8, 9, 10, 11, 12 của repo `kananinirav/AWS-Certified-Cloud-Practitioner-Notes`.

## Cách dùng

1. Làm theo từng nhóm chủ đề (Compute → Storage → Database → Networking → Monitoring → Integration → Deployment → ML). Mỗi nhóm khoảng 10–15 câu, làm liền một mạch trong 15–20 phút.
2. Ghi đáp án của bạn ra giấy theo định dạng `1D, 2B, 3AC, ...` **trước khi** mở phần đáp án ở cuối file.
3. Câu nào sai thì quay lại `01-notes.md` đọc lại đúng bảng so sánh của service đó, đừng chỉ học thuộc đáp án.
4. Câu có `(Choose TWO)` / `(Select TWO)` yêu cầu chọn đúng cả hai đáp án mới được tính điểm.

> Nguồn của từng câu được ghi ngay sau câu hỏi, ví dụ `(Exam 6 - Q14)`. Phần đề giữ nguyên tiếng Anh gốc để bạn quen với cách diễn đạt của đề thi thật.

---

## Compute & Auto Scaling

**1.** You want to run a questionnaire application for only one day (without interruption), which Amazon EC2 purchase option should you use? *(Exam 1 - Q28)*

- A. Reserved instances.
- B. Spot instances.
- C. Dedicated instances.
- D. On-demand instances.

**2.** You are working on a project that involves creating thumbnails of millions of images. Consistent uptime is not an issue, and continuous processing is not required. Which EC2 buying option would be the most cost-effective? *(Exam 1 - Q29)*

- A. Reserved Instances.
- B. On-demand Instances.
- C. Dedicated Instances.
- D. Spot Instances.

**3.** An organization has decided to purchase an Amazon EC2 Reserved Instance (RI) for three years in order to reduce costs. It is possible that the application workloads could change during the reservation period. What is the EC2 Reserved Instance (RI) type that will allow the company to exchange the purchased reserved instance for another reserved instance with higher computing power if they need to? *(Exam 1 - Q50)*

- A. Elastic RI.
- B. Premium RI.
- C. Standard RI.
- D. Convertible RI.

**4.** A company’s AWS workflow requires that it periodically perform large-scale image and video processing jobs. The customer is seeking to minimize cost and has stated that the amount of time it takes to process these jobs is not critical, but that cost minimization is the most important factor in designing the solution. Which EC2 instance class is best suited for this processing? *(Exam 6 - Q10)*

- A. EC2 On-Demand Instances.
- B. EC2 Reserved Instances     - No Upfront.
- C. EC2 Spot Instances.
- D. EC2 Reserved Instances     - All Upfront.

**5.** Which of the following compute resources are serverless? (Choose TWO) *(Exam 7 - Q12)*

- A. Amazon EC2.
- B. AWS Fargate.
- C. AWS Lambda.
- D. Amazon ECS.
- E. Amazon EMR.

**6.** For compliance and regulatory purposes, a government agency requires that their applications must run on hardware that is dedicated to them only. How can you meet this requirement? *(Exam 7 - Q13)*

- A. Use EC2 Dedicated Hosts.
- B. Use EC2 Reserved Instances.
- C. Use EC2 Spot Instances.
- D. Use EC2 On-demand Instances.

**7.** For new AWS customers, what is the EASIEST way to launch a simple WordPress website on AWS? *(Exam 7 - Q20)*

- A. Run WordPress on an Amazon Lightsail instance.
- B. Install WordPress on an Amazon EC2 instance.
- C. Use the Amazon S3 Web hosting feature.
- D. Host the website directly on AWS Cloud Development Kit (AWS CDK).

**8.** A company wants to use Amazon Elastic Container Service (Amazon ECS) to run its containerized applications. For compliance reasons, the company wants to retain complete visibility and control over the underlying server cluster. Which Amazon ECS launch type will satisfy these requirements? *(Exam 8 - Q2)*

- A. EC2 launch type.
- B. Fargate launch type.
- C. Lightsail launch type.
- D. Lambda launch type.

**9.** Engineers are wasting a lot of time and effort managing batch computing software in traditional data centers. Which of the following AWS services allows them to easily run thousands of batch computing jobs? *(Exam 8 - Q21)*

- A. Amazon EC2.
- B. AWS Batch.
- C. Lambda@Edge.
- D. AWS Fargate.

**10.** A user must meet compliance and software licensing requirements that state a workload must be hosted on a physical server. When Amazon EC2 instance pricing option will meet these requirements? *(Exam 10 - Q18)*

- A. Dedicated Hosts.
- B. Dedicated Instances.
- C. Spot Instances.
- D. Reserved Instances.

**11.** When should a company consider using Amazon EC2 Spot Instances? (Select TWO) *(Exam 10 - Q21)*

- A. For non-production applications.
- B. For stateful workloads.
- C. For applications that cannot have interruptions.
- D. For fault-tolerant flexible applications.
- E. For sensitive database applications.

**12.** A company is migrating an application that is running non-interruptible workloads for a three-year time frame. Which pricing construct would provide the MOST cost-effective solution? *(Exam 12 - Q7)*

- A. Amazon EC2 Spot Instances.
- B. Amazon EC2 Dedicated Instances.
- C. Amazon EC2 On-Demand Instances.
- D. Amazon EC2 Reserved Instances.

**13.** Which Amazon EC2 pricing model adjusts based on supply and demand of EC2 instances? *(Exam 12 - Q17)*

- A. On-Demand Instances.
- B. Reserved Instances.
- C. Spot Instances.
- D. Convertible Reserved Instances.

**14.** Which of the following AWS features enables a user to launch a pre-configured Amazon Elastic Compute Cloud (Amazon EC2) instance? *(Exam 12 - Q22)*

- A. Amazon Elastic Block Store (Amazon EBS).
- B. Amazon Machine Image.
- C. Amazon EC2 Systems Manager.
- D. Amazon AppStream 2.0.

**15.** How do Amazon EC2 Auto Scaling groups help achieve high availability for a web application? *(Exam 12 - Q28)*

- A. They automatically add more instances across multiple AWS Regions based on global demand of the application.
- B. They automatically add or replace instances across multiple Availability Zones when the application needs it.
- C. They enable the application’s stalk: content to reside closer to end users.
- D. They are able to distribute incoming requests across a tier of web server instances.

---

## Storage

**16.** What does AWS Snowball provide? (Choose TWO) *(Exam 1 - Q8)*

- A. Built-in computing capabilities that allow customers to process data locally.
- B. A catalog of third-party software solutions that customers need to build solutions and run their businesses.
- C. A hybrid cloud storage between on-premises environments and the AWS Cloud.
- D. An Exabyte-scale data transfer service that allows you to move extremely large amounts of data to AWS.
- E. Secure transfer of large amounts of data into and out of the AWS.

**17.** What should you do in order to keep the data on EBS volumes safe? (Choose TWO) *(Exam 1 - Q18)*

- A. Regularly update firmware on EBS devices.
- B. Create EBS snapshots.
- C. Ensure that EBS data is encrypted at rest.
- D. Store a backup daily in an external drive.
- E. Prevent any unauthorized access to AWS data centers.

**18.** The identification process of an online financial services company requires that new users must complete an online interview with their security team. The completed recorded interviews are only required in the event of a legal issue or a regulatory compliance breach. What is the most cost-effective service to store the recorded videos? *(Exam 1 - Q24)*

- A. S3 Intelligent-Tiering.
- B. AWS Marketplace.
- C. Amazon S3 Glacier Deep Archive.
- D. Amazon EBS.

**19.** Which of the following S3 storage classes is most appropriate to host static assets for a popular e-commerce website with stable access patterns? *(Exam 6 - Q16)*

- A. S3 Standard-IA.
- B. S3 Intelligent-Tiering.
- C. S3 Glacier Deep Archive.
- D. S3 Standard.

**20.** To protect against data loss, you need to backup your database regularly. What is the most cost-effective storage option that provides immediate retrieval of your backups? *(Exam 6 - Q45)*

- A. Amazon S3 Glacier Deep Archive.
- B. Amazon S3 Standard-Infrequent Access.
- C. Amazon S3 Glacier.
- D. Instance Store.

**21.** You want to transfer 200 Terabytes of data from on-premises locations to the AWS Cloud, which of the following can do the job in a cost-effective way? *(Exam 6 - Q49)*

- A. AWS Snowmobile.
- B. AWS Import/Export.
- C. AWS DMS.
- D. AWS Snowball.

**22.** What should you consider when storing data in Amazon Glacier? *(Exam 8 - Q20)*

- A. Amazon Glacier only accepts data in a compressed format.
- B. Glacier can only be used to store frequently accessed data and data archives.
- C. Amazon Glacier does not provide immediate retrieval of data.
- D. Attach Glacier to an EC2 Instance to be able to store data.

**23.** A company needs to host a big data application on AWS using EC2 instances. Which of the following AWS Storage services would they choose to automatically get high throughput to multiple compute nodes? *(Exam 8 - Q26)*

- A. Amazon Elastic Block Store.
- B. AWS Storage Gateway.
- C. Amazon Elastic File System.
- D. S3.

**24.** Which AWS service provides a simple and scalable shared file storage solution for use with Linux-based AWS and on-premises servers? *(Exam 11 - Q19)*

- A. Amazon S3.
- B. Amazon Glacier.
- C. Amazon EBS.
- D. Amazon EFS.

**25.** Which type of AWS storage is ephemeral and is deleted when an instance is stopped Of terminated? *(Exam 11 - Q22)*

- A. Amazon EBS.
- B. Amazon EC2 instance store.
- C. Amazon EFS.
- D. Amazon S3.

**26.** Which service provides a hybrid storage service that enables on-premises applications to seamlessly use cloud storage? *(Exam 12 - Q14)*

- A. Amazon Glacier
- B. AWS Snowball
- C. AWS Storage Gateway
- D. Amazon Elastic Block Storage (Amazon EBS)

---

## Database

**27.** A company is deploying a new two-tier web application in AWS. Where should the most frequently accessed data be stored so that the application’s response time is optimal? *(Exam 1 - Q27)*

- A. AWS OpsWorks.
- B. AWS Storage Gateway.
- C. Amazon EBS volume.
- D. Amazon ElastiCache.

**28.** Your company has a data store application that requires access to a NoSQL database. Which AWS database offering would meet this requirement? *(Exam 1 - Q33)*

- A. Amazon Aurora.
- B. Amazon DynamoDB.
- C. Amazon Elastic Block Store.
- D. Amazon Redshift.

**29.** A developer is planning to build a two-tier web application that has a MySQL database layer. Which of the following AWS database services would provide automated backups for the application? *(Exam 1 - Q41)*

- A. A MySQL database installed on an EC2 instance.
- B. Amazon Aurora.
- C. Amazon DynamoDB.
- D. Amazon Neptune.

**30.** Which of the following are examples of AWS-managed databases? (Choose TWO) *(Exam 6 - Q9)*

- A. Amazon Neptune.
- B. Amazon CloudSearch.
- C. Microsoft SQL Server on Amazon EC2.
- D. MySQL on Amazon EC2.
- E. Amazon RDS for MySQL.

**31.** Which of the following is a feature of Amazon RDS that performs automatic failover when the primary database fails to respond? *(Exam 6 - Q20)*

- A. RDS Single-AZ.
- B. RDS Write Replica.
- C. RDS Snapshots.
- D. RDS Multi-AZ.

**32.** You have a real-time IoT application that requires sub-millisecond latency. Which of the following services should you use? *(Exam 6 - Q50)*

- A. Amazon Redshift.
- B. Amazon Athena.
- C. AWS Cloud9.
- D. Amazon ElastiCache for Redis.

**33.** An organization needs to build a financial application that requires support for ACID transactions. Which AWS database service is most appropriate in this case? *(Exam 7 - Q15)*

- A. RedShift.
- B. RDS.
- C. CloudHSM.
- D. DMS.

**34.** Amazon RDS supports multiple database engines to choose from. Which of the following is not one of them? *(Exam 7 - Q18)*

- A. PostgreSQL.
- B. Oracle.
- C. Microsoft SQL Server.
- D. Teradata.

**35.** Which database service should you use if your application and data schema require "joins" or complex transactions? *(Exam 8 - Q18)*

- A. Amazon RDS.
- B. AWS Outposts.
- C. Amazon DocumentDB.
- D. Amazon DynamoDB.

**36.** A company is looking for a scalable data warehouse solution. Which of the following AWS solutions would meet the company’s needs? *(Exam 12 - Q34)*

- A. Amazon Simple Storage Service (Amazon S3).
- B. Amazon DynamoDB.
- C. Amazon Kinesis.
- D. Amazon Redshift.

---

## Networking & Global Infrastructure

**37.** What does Amazon CloudFront use to distribute content to global users with low latency? *(Exam 1 - Q21)*

- A. AWS Global Accelerator.
- B. AWS Regions.
- C. AWS Edge Locations.
- D. AWS Availability Zones.

**38.** Which service provides DNS in the AWS cloud? *(Exam 1 - Q25)*

- A. Route 53.
- B. AWS Config.
- C. Amazon CloudFront.
- D. Amazon EMR.

**39.** Which of the following is true regarding the AWS availability zones and edge locations? *(Exam 6 - Q1)*

- A. Edge locations are located in separate Availability Zones worldwide to serve global customers.
- B. An availability zone exists within an edge location to distribute content globally with low latency.
- C. An Availability Zone is a geographic location where AWS provides multiple, physically separated and isolated edge locations.
- D. An AWS Availability Zone is an isolated location within an AWS Region, however edge locations are located in multiple cities worldwide.

**40.** Which AWS Service can perform health checks on Amazon EC2 instances? *(Exam 6 - Q7)*

- A. AWS CloudFormation.
- B. Amazon Route 53.
- C. Amazon Chime.
- D. Amazon Aurora.

**41.** Which of the below options is true of Amazon VPC? *(Exam 6 - Q30)*

- A. Amazon VPC allows customers to control user interactions with all other AWS resources.
- B. AWS Customers have complete control over their Amazon VPC virtual networking environment.
- C. AWS is responsible for all the management and configuration details of Amazon VPC.
- D. Amazon VPC helps customers to review their AWS architecture and adopt best practices.

**42.** A media company has an application that requires the transfer of large data sets to and from AWS every day. This data is business critical and should be transferred over a consistent connection. Which AWS service should the company use? *(Exam 6 - Q43)*

- A. AWS Direct Connect.
- B. Amazon Comprehend.
- C. AWS Snowmobile.
- D. AWS VPN.

**43.** Which service can you use to route traffic to the endpoint that provides the best application performance for your users worldwide? *(Exam 6 - Q46)*

- A. AWS Global Accelerator.
- B. AWS Data Pipeline.
- C. AWS DAX Accelerator.
- D. AWS Transfer Acceleration.

**44.** Which of the below options are use cases of the Amazon Route 53 service? (Choose TWO) *(Exam 6 - Q48)*

- A. Point-to-point connectivity between an on-premises data center and AWS.
- B. Detects configuration changes in the AWS environment.
- C. DNS configuration and management.
- D. Manages global application traffic through a variety of routing types.
- E. Provides infrastructure security optimization recommendations.

**45.** You have been tasked with auditing the security of your VPC. As part of this process, you need to start by analyzing what inbound and outbound traffic is allowed on your EC2 instances. What two parts of the VPC do you need to check to accomplish this task? *(Exam 8 - Q4)*

- A. Network ACLs and Traffic Manager.
- B. Network ACLs and Subnets.
- C. Security Groups and Internet Gateways.
- D. Security Groups and Network ACLs.

**46.** Which AWS service allows companies to connect an Amazon VPC to an on-premises data center? (Select TWO) *(Exam 9 - Q6)*

- A. AWS VPN.
- B. Amazon Redshift.
- C. API Gateway.
- D. Amazon Direct Connect.

**47.** Which of the following features can be configured through the Amazon Virtual Private Cloud (Amazon VPC) Dashboard? (Select TWO) *(Exam 11 - Q4)*

- A. Amazon CloudFront distributions.
- B. Amazon Route 53.
- C. Security Groups.
- D. Subnets.
- E. Elastic Load Balancing.

**48.** What can AWS edge locations be used for? (Select TWO) *(Exam 11 - Q38)*

- A. Hosting applications.
- B. Delivering content closer to users.
- C. Running NoSQL database caching services.
- D. Reducing traffic on the server by caching responses.
- E. Sending notification messages to end users.

**49.** Which of the following components of the AWS Global Infrastructure consists of one or more discrete data centers interconnected through low latency links? *(Exam 12 - Q1)*

- A. Availability Zone
- B. Edge location
- C. Region
- D. Private networking

**50.** A company wants to migrate its applications to a VPC on AWS These applications will need to access on-premises resources. What combination of actions will enable the company to accomplish this goals? (Select TWO) *(Exam 12 - Q18)*

- A. Use the AWS Service Catalog to identify a list of on-premises resources that can be migrated
- B. Build a VPN connection between an on-premises device and a virtual private gateway in the new VPC
- C. Use Amazon Athena to query data from the on-premises database servers
- D. Connect the company’s on-premises data center to AWS using AWS Direct Connect
- E. Leverage Amazon CloudFront to restrict access to static web content provided through the company’s on-premises web servers

**51.** Which AWS service would a customer use with a static website to achieve tower latency and high transfer speeds? *(Exam 12 - Q27)*

- A. AWS Lambda.
- B. Amazon DynamoDB Accelerator.
- C. Amazon Route 53.
- D. Amazon CloudFront.

---

## Monitoring & Management

**52.** You have noticed that several critical Amazon EC2 instances have been terminated. Which of the following AWS services would help you determine who took this action? *(Exam 1 - Q3)*

- A. Amazon Inspector.
- B. AWS CloudTrail.
- C. AWS Trusted Advisor.
- D. EC2 Instance Usage Report.

**53.** You have deployed your application on multiple Amazon EC2 instances. Your customers complain that sometimes they can’t reach your application. Which AWS service allows you to monitor the performance of your EC2 instances to assist in troubleshooting these issues? *(Exam 1 - Q45)*

- A. AWS Lambda.
- B. AWS Config.
- C. Amazon CloudWatch.
- D. AWS CloudTrail.

**54.** Which AWS service collects metrics from running EC2 instances? *(Exam 7 - Q10)*

- A. Amazon Inspector.
- B. Amazon CloudWatch.
- C. AWS CloudFormation.
- D. AWS CloudTrail.

**55.** Your web application currently faces performance issues and suffers from long load times. Which of the following AWS services could help fix these issues and improve performance? *(Exam 7 - Q11)*

- A. Amazon Detective.
- B. AWS X-Ray.
- C. AWS Security Hub.
- D. AWS Shield.

**56.** A company is running a large web application that needs to always be available. The application tends to slow down when CPU usage is greater than 60%. How can they track when CPU usage goes above 60% for any of the EC2 Instances in their account? *(Exam 8 - Q11)*

- A. Use CloudFront to monitor the CPU usage.
- B. Set the AWS Config CPU threshold to 60% to receive a notification when EC2 usage exceeds that value.
- C. Use CloudWatch Alarms to monitor the CPU and alert when the CPU usage is >= 60%.
- D. Use SNS to monitor the utilization of the server.

**57.** Which service enables risk auditing by continuously monitoring and logging account activity, including user actions in the AWS Management Console and AWS SDKs? *(Exam 9 - Q33)*

- A. Amazon CloudWatch.
- B. AWS CloudTrail.
- C. AWS Config.
- D. AWS Health.

**58.** Which of the following are features of Amazon CloudWatch Logs? (Select TWO) *(Exam 10 - Q3)*

- A. Summaries by Amazon Simple Notification Service (Amazon SNS).
- B. Free Amazon Elasticsearch Service analytics.
- C. Provided at no charge.
- D. Real-time monitoring.
- E. Adjustable retention.

**59.** Which AWS service allows users to identify the changes made to a resource over time? *(Exam 10 - Q14)*

- A. Amazon Inspector.
- B. AWS Config.
- C. AWS Service Catalog.
- D. AWS IAM.

---

## Integration & Decoupling

**60.** What is the advantage of the AWS-recommended practice of "decoupling" applications? *(Exam 1 - Q15)*

- A. Allows treating an application as a single, cohesive unit.
- B. Reduces inter-dependencies so that failures do not impact other components of the application.
- C. Allows updates of any monolithic application quickly and easily.
- D. Allows tracking of any API call made to any AWS service.

**61.** Which of the following is a benefit of the "Loose Coupling" architecture principle? *(Exam 8 - Q25)*

- A. It eliminates the need for change management.
- B. It allows for Cross-Region Replication.
- C. It helps AWS customers reduce Privileged Access to AWS resources.
- D. It allows individual application components or services to be modified without affecting other components.

**62.** A company’s web application currently has light dependencies on underlying components so when one component fails the entire web application fails. Applying which AWS Cloud design principle will address the current design issue? *(Exam 10 - Q46)*

- A. Implementing elasticity enabling the application to scale up or scale down as demand changes.
- B. Enabling several EC2 instances to run in parallel to achieve better performance.
- C. Focusing on decoupling components by isolating them and ensuring individual components can function when other components.
- D. Doubling EC2 computing resources to increase system fault tolerance.

**63.** Which services are parts of the AWS serverless platform? *(Exam 11 - Q24)*

- A. Amazon EC2, Amazon S3, Amazon Athena.
- B. Amazon Kinesis, Amazon SQS, Amazon EMR.
- C. AWS Step Functions, Amazon DynamoDB, Amazon SNS.
- D. Amazon Athena, Amazon Cognito, Amazon EC2.

---

## Deployment & Infrastructure as Code

**64.** What is the AWS service that enables AWS architects to manage infrastructure as code? *(Exam 1 - Q42)*

- A. AWS CloudFormation.
- B. AWS Config.
- C. Amazon SES.
- D. Amazon EMR.

**65.** What are some key benefits of using AWS CloudFormation? (Choose TWO) *(Exam 6 - Q13)*

- A. It helps AWS customers deploy their applications without worrying about the underlying infrastructure.
- B. It applies advanced IAM security features automatically.
- C. It automates the provisioning and updating of your infrastructure in a safe and controlled manner.
- D. It allows you to model your entire infrastructure in just a text file.
- E. It compiles and builds application code in a timely manner.

**66.** Which of the following AWS services uses Puppet to automate how EC2 instances are configured? *(Exam 6 - Q33)*

- A. AWS OpsWorks.
- B. AWS CloudFormation.
- C. AWS Quick Starts.
- D. AWS CloudTrail.

**67.** A developer wants to quickly deploy and manage his application in the AWS Cloud, but he doesn’t have any experience with cloud computing. Which of the following AWS services would help the developer achieve his goal? *(Exam 6 - Q39)*

- A. AWS Fargate.
- B. AWS Batch.
- C. Amazon Personalize.
- D. AWS Elastic Beanstalk.

**68.** You have just finished writing your application code. Which service can be used to automate the deployment and scaling of your application? *(Exam 8 - Q6)*

- A. Amazon Simple Storage Service.
- B. AWS Elastic Beanstalk.
- C. AWS CodeCommit.
- D. Amazon Elastic File System.

**69.** Which of the following services could be used to deploy an application to servers running on-premises? (Select TWO) *(Exam 12 - Q38)*

- A. AWS Elastic Beanstalk.
- B. AWS OpsWorks.
- C. AWS CodeDeploy.
- D. AWS Batch.
- E. AWS X-Ray.

---

## Machine Learning, AI & Analytics

**70.** A company is developing an application that will leverage facial recognition to automate photo tagging. Which AWS Service should the company use for facial recognition? *(Exam 6 - Q8)*

- A. Amazon Comprehend.
- B. AWS IAM.
- C. Amazon Polly.
- D. Amazon Rekognition.

**71.** Which of the following are use cases for Amazon EMR? (Choose TWO) *(Exam 6 - Q37)*

- A. Enables you to backup extremely large amounts of data at very low costs.
- B. Enables you to move Exabyte-scale data from on-premises datacenters into AWS.
- C. Enables you to analyze and process extremely large amounts of data in a timely manner.
- D. Enables you to easily run and scale Apache Spark, Hadoop,and other Big Data frameworks.
- E. Enables you to easily run and manage Docker containers.

**72.** Which AWS service can be used to query stored datasets directly from Amazon S3 using standard SQL? *(Exam 10 - Q26)*

- A. AWS Glue.
- B. AWS Data Pipeline.
- C. Amazon CloudSearch.
- D. Amazon Athena.

**73.** What time-savings advantage is offered with the use of Amazon Rekognition? *(Exam 10 - Q43)*

- A. Amazon Rekognition provides automatic watermarking of images.
- B. Amazon Rekognition provides automatic detection of objects appearing in pictures.
- C. Amazon Recognition provides the ability to resize millions of images automatically.
- D. Amazon Rekognition uses Amazon Mechanical Turk to allow humans to bid on object detection jobs.

---

## Đáp án

<details><summary>Đáp án</summary>

### Bảng tra nhanh

| Câu | Đáp án | Câu | Đáp án | Câu | Đáp án | Câu | Đáp án |
|---|---|---|---|---|---|---|---|
| 1 | **D** | 2 | **D** | 3 | **D** | 4 | **C** |
| 5 | **B, C** | 6 | **A** | 7 | **A** | 8 | **A** |
| 9 | **B** | 10 | **A** | 11 | **A, D** | 12 | **D** |
| 13 | **C** | 14 | **B** | 15 | **B** | 16 | **A, E** |
| 17 | **B, C** | 18 | **C** | 19 | **D** | 20 | **B** |
| 21 | **D** | 22 | **C** | 23 | **C** | 24 | **D** |
| 25 | **B** | 26 | **C** | 27 | **D** | 28 | **B** |
| 29 | **B** | 30 | **A, E** | 31 | **D** | 32 | **D** |
| 33 | **B** | 34 | **D** | 35 | **A** | 36 | **D** |
| 37 | **C** | 38 | **A** | 39 | **D** | 40 | **B** |
| 41 | **B** | 42 | **A** | 43 | **A** | 44 | **C, D** |
| 45 | **D** | 46 | **A, D** | 47 | **C, D** | 48 | **B, D** |
| 49 | **A** | 50 | **B, D** | 51 | **D** | 52 | **B** |
| 53 | **C** | 54 | **B** | 55 | **B** | 56 | **C** |
| 57 | **B** | 58 | **D, E** | 59 | **B** | 60 | **B** |
| 61 | **D** | 62 | **C** | 63 | **C** | 64 | **A** |
| 65 | **C, D** | 66 | **A** | 67 | **D** | 68 | **B** |
| 69 | **B, C** | 70 | **D** | 71 | **C, D** | 72 | **D** |
| 73 | **B** |  |  |  |  |  |  |

### Giải thích chi tiết

#### Compute & Auto Scaling

**1. Đáp án: D** *(Exam 1 - Q28)*

Chạy đúng một ngày và không được gián đoạn, không cam kết dài hạn → On-Demand. Reserved Instances (A) đòi cam kết 1–3 năm nên lãng phí, còn Spot (B) có thể bị thu hồi giữa lúc chạy nên vi phạm yêu cầu "without interruption".

**2. Đáp án: D** *(Exam 1 - Q29)*

Tạo thumbnail cho hàng triệu ảnh là workload chịu lỗi được, không cần uptime liên tục → Spot rẻ nhất (giảm tới 90%). Reserved (A) chỉ đáng khi workload chạy đều 24/7 trong nhiều năm.

**3. Đáp án: D** *(Exam 1 - Q50)*

Chỉ Convertible RI cho phép đổi sang reserved instance khác có cấu hình mạnh hơn (giá trị bằng hoặc cao hơn). Standard RI (C) giảm giá sâu hơn nhưng khoá cứng instance type — đây chính là bẫy.

**4. Đáp án: C** *(Exam 6 - Q10)*

Đề nói rõ thời gian xử lý không quan trọng và chi phí là yếu tố số một → Spot Instances. Reserved All Upfront (D) tiết kiệm nhiều nhưng phải cam kết 1–3 năm cho một job chỉ chạy định kỳ.

**5. Đáp án: B, C** *(Exam 7 - Q12)*

Fargate và Lambda đều không cần provision hay quản lý server. ECS (D) chỉ là container orchestration — nếu chạy launch type EC2 thì bạn vẫn phải quản lý cluster; EMR (E) chạy trên cluster EC2 nên không serverless.

**6. Đáp án: A** *(Exam 7 - Q13)*

Yêu cầu hardware dành riêng hoàn toàn cho một tổ chức → EC2 Dedicated Hosts (thuê nguyên physical server). Reserved Instances (B) chỉ là mô hình giá, instance vẫn chạy trên hardware dùng chung.

**7. Đáp án: A** *(Exam 7 - Q20)*

Lightsail có template WordPress sẵn và giá cố định, dễ nhất cho khách hàng mới. Cài WordPress trên EC2 (B) buộc bạn tự cấu hình OS, security group và storage — nhiều bước hơn hẳn.

**8. Đáp án: A** *(Exam 8 - Q2)*

Cần "complete visibility and control over the underlying server cluster" → ECS EC2 launch type, vì bạn sở hữu và quản lý các EC2 trong cluster. Fargate (B) là serverless nên AWS che hoàn toàn tầng server, không thoả yêu cầu compliance.

**9. Đáp án: B** *(Exam 8 - Q21)*

AWS Batch được thiết kế riêng để chạy hàng nghìn batch computing job và tự provision compute (EC2 hoặc Spot). EC2 (A) làm được nhưng bạn phải tự viết scheduler và tự quản capacity.

**10. Đáp án: A** *(Exam 10 - Q18)*

Yêu cầu "must be hosted on a physical server" cộng với software licensing → Dedicated Hosts. Dedicated Instances (B) cũng chạy trên hardware riêng nhưng không cho kiểm soát vị trí instance nên không dùng được license tính theo socket/core.

**11. Đáp án: A, D** *(Exam 10 - Q21)*

Spot phù hợp với workload chịu gián đoạn: ứng dụng non-production và ứng dụng fault-tolerant/flexible. Stateful (B) và "cannot have interruptions" (C) là ngược lại, vì AWS có thể thu hồi Spot bất kỳ lúc nào.

**12. Đáp án: D** *(Exam 12 - Q7)*

Workload chạy liên tục trong 3 năm và không được gián đoạn → Reserved Instances tiết kiệm nhất (tới 72%). Spot (A) rẻ hơn nhưng bị terminate nên vi phạm "non-interruptible".

**13. Đáp án: C** *(Exam 12 - Q17)*

Giá Spot dao động theo cung–cầu của capacity EC2 chưa sử dụng. Reserved (B) và Convertible RI (D) có giá cố định theo hợp đồng nên không đổi theo cung cầu.

**14. Đáp án: B** *(Exam 12 - Q22)*

AMI (Amazon Machine Image) là template chứa OS, application server và software, dùng để launch instance đã cấu hình sẵn. EBS (A) chỉ là volume lưu dữ liệu, không phải template khởi tạo.

**15. Đáp án: B** *(Exam 12 - Q28)*

Auto Scaling group tự thêm hoặc thay thế instance trên nhiều Availability Zone trong cùng Region → tăng availability. ASG không hoạt động cross-Region (A), và việc phân phối request là nhiệm vụ của ELB (D).

#### Storage

**16. Đáp án: A, E** *(Exam 1 - Q8)*

Snowball (Edge) vừa chuyển lượng lớn dữ liệu vào/ra AWS một cách an toàn, vừa có compute tích hợp để xử lý dữ liệu ngay tại chỗ. Snowmobile mới là dịch vụ exabyte-scale (D), còn hybrid storage với on-premises (C) là Storage Gateway.

**17. Đáp án: B, C** *(Exam 1 - Q18)*

Bảo vệ dữ liệu EBS = tạo snapshot (backup point-in-time, lưu trên S3) và bật encryption at rest. Cập nhật firmware (A) và bảo vệ data center (E) là trách nhiệm của AWS, không phải của khách hàng.

**18. Đáp án: C** *(Exam 1 - Q24)*

Video phỏng vấn chỉ cần khi có tranh chấp pháp lý → truy cập cực kỳ ít, rẻ nhất là S3 Glacier Deep Archive. Intelligent-Tiering (A) tốn thêm phí monitoring và không thể rẻ bằng cho dữ liệu archive thuần.

**19. Đáp án: D** *(Exam 6 - Q16)*

Static asset của một website e-commerce phổ biến được truy cập thường xuyên với pattern ổn định → S3 Standard. Intelligent-Tiering (B) chỉ có lợi khi access pattern thay đổi khó đoán; ở đây nó chỉ thêm phí monitoring.

**20. Đáp án: B** *(Exam 6 - Q45)*

Cần lấy backup ngay lập tức nhưng ít truy cập → S3 Standard-IA rẻ hơn Standard mà vẫn retrieval tức thì. Glacier (C) và Deep Archive (A) rẻ hơn nữa nhưng cần vài phút đến vài giờ để restore.

**21. Đáp án: D** *(Exam 6 - Q49)*

200 TB nằm trong tầm petabyte-scale nên Snowball là lựa chọn tiết kiệm. Snowmobile (A) dành cho exabyte (thường trên 10 PB) nên quá lớn và không kinh tế cho 200 TB.

**22. Đáp án: C** *(Exam 8 - Q20)*

Glacier là storage lớp archive, dữ liệu cần thời gian restore (từ vài phút đến vài giờ) chứ không lấy ngay. Nói Glacier lưu dữ liệu truy cập thường xuyên (B) là sai — đó là vai trò của S3 Standard.

**23. Đáp án: C** *(Exam 8 - Q26)*

EFS là file system NFS có thể mount đồng thời lên hàng trăm EC2 và tự scale throughput → phù hợp big data với nhiều compute node. EBS (A) chỉ attach được vào một instance tại một thời điểm.

**24. Đáp án: D** *(Exam 11 - Q19)*

EFS là shared file storage chuẩn NFS, dùng được cho cả EC2 Linux và server on-premises. EBS (C) là block storage gắn vào một instance, còn S3 (A) là object storage chứ không phải file system.

**25. Đáp án: B** *(Exam 11 - Q22)*

EC2 instance store là ổ đĩa vật lý gắn trực tiếp vào host, dữ liệu mất khi instance stop hoặc terminate. EBS (A) là network drive persistent nên dữ liệu vẫn còn sau khi stop.

**26. Đáp án: C** *(Exam 12 - Q14)*

Storage Gateway là dịch vụ hybrid, cho ứng dụng on-premises dùng cloud storage một cách trong suốt qua protocol chuẩn. Snowball (B) chỉ chuyển dữ liệu một lần bằng thiết bị vật lý, không phải kết nối thường trực.

#### Database

**27. Đáp án: D** *(Exam 1 - Q27)*

Dữ liệu được truy cập thường xuyên nhất nên nằm trong in-memory cache → ElastiCache giảm latency và giảm tải database. EBS volume (C) là block storage trên đĩa, chậm hơn RAM rất nhiều.

**28. Đáp án: B** *(Exam 1 - Q33)*

DynamoDB là NoSQL database được AWS quản lý (key-value và document). Aurora (A) là relational SQL, còn Redshift (D) là data warehouse OLAP.

**29. Đáp án: B** *(Exam 1 - Q41)*

Aurora tương thích MySQL và là managed service nên có automated backup sẵn. MySQL tự cài trên EC2 (A) buộc khách hàng tự backup; DynamoDB (C) và Neptune (D) không phải MySQL.

**30. Đáp án: A, E** *(Exam 6 - Q9)*

Neptune (graph) và RDS for MySQL đều là AWS-managed database. Cài SQL Server hay MySQL trên EC2 (C, D) là self-managed vì bạn phải tự patch OS và database engine.

**31. Đáp án: D** *(Exam 6 - Q20)*

RDS Multi-AZ dựng standby ở AZ khác và tự failover khi primary không phản hồi. Read Replica dùng để scale đọc, còn "RDS Write Replica" (B) không tồn tại.

**32. Đáp án: D** *(Exam 6 - Q50)*

Yêu cầu sub-millisecond latency real-time → in-memory store, tức ElastiCache for Redis. Redshift (A) và Athena (B) là dịch vụ analytics, latency tính bằng giây.

**33. Đáp án: B** *(Exam 7 - Q15)*

Ứng dụng tài chính cần ACID transaction → relational database được quản lý, tức RDS. Redshift (A) tối ưu cho OLAP analytics chứ không phải OLTP transaction.

**34. Đáp án: D** *(Exam 7 - Q18)*

RDS hỗ trợ MySQL, PostgreSQL, MariaDB, Oracle và SQL Server — không có Teradata. Ba phương án còn lại đều là engine RDS hợp lệ.

**35. Đáp án: A** *(Exam 8 - Q18)*

Schema cần "joins" và transaction phức tạp là đặc trưng của relational database → RDS. DynamoDB (D) là NoSQL và không hỗ trợ join kiểu SQL.

**36. Đáp án: D** *(Exam 12 - Q34)*

Redshift là data warehouse dùng columnar storage, tối ưu cho OLAP và scale tới petabyte. DynamoDB (B) là NoSQL cho OLTP, còn Kinesis (C) là streaming real-time.

#### Networking & Global Infrastructure

**37. Đáp án: C** *(Exam 1 - Q21)*

CloudFront cache nội dung tại Edge Locations (points of presence) để phục vụ user toàn cầu với latency thấp. Đây là bẫy kinh điển: CloudFront không dùng Availability Zone (D) hay Region (B).

**38. Đáp án: A** *(Exam 1 - Q25)*

Route 53 là managed DNS service của AWS. CloudFront (C) là CDN, còn AWS Config (B) theo dõi cấu hình resource.

**39. Đáp án: D** *(Exam 6 - Q1)*

Availability Zone là một vị trí cô lập bên trong một AWS Region, còn Edge Location nằm rải rác ở nhiều thành phố trên thế giới. Các phương án khác đảo ngược quan hệ chứa nhau giữa AZ và Edge Location.

**40. Đáp án: B** *(Exam 6 - Q7)*

Route 53 có health check để chỉ route traffic tới endpoint đang khoẻ (nền tảng của failover routing). CloudFormation (A) chỉ provision hạ tầng, không kiểm tra sức khoẻ instance.

**41. Đáp án: B** *(Exam 6 - Q30)*

VPC là virtual network riêng mà khách hàng toàn quyền cấu hình: CIDR, subnet, route table, gateway. Nói AWS chịu trách nhiệm toàn bộ cấu hình VPC (C) là sai theo Shared Responsibility Model.

**42. Đáp án: A** *(Exam 6 - Q43)*

Dữ liệu lớn, business-critical, cần đường truyền ổn định mỗi ngày → Direct Connect (kết nối vật lý private). VPN (D) đi qua public internet nên băng thông và độ ổn định không đảm bảo.

**43. Đáp án: A** *(Exam 6 - Q46)*

Global Accelerator dùng AWS global network và Anycast IP để route user tới endpoint có hiệu năng tốt nhất. Khác CloudFront ở chỗ nó không cache mà proxy traffic TCP/UDP.

**44. Đáp án: C, D** *(Exam 6 - Q48)*

Route 53 làm DNS configuration/management và điều phối traffic toàn cầu qua nhiều routing policy (simple, weighted, latency, failover). Point-to-point tới on-premises (A) là Direct Connect, phát hiện thay đổi cấu hình (B) là AWS Config.

**45. Đáp án: D** *(Exam 8 - Q4)*

Traffic vào/ra EC2 được kiểm soát ở hai lớp: Security Group (stateful, mức instance) và Network ACL (stateless, mức subnet). Internet Gateway (C) chỉ mở đường ra internet, không chứa rule inbound/outbound cho instance.

**46. Đáp án: A, D** *(Exam 9 - Q6)*

Hai cách nối VPC với data center on-premises: AWS VPN (đi qua internet, tự mã hoá) và Direct Connect (đường private chuyên dụng). Redshift (B) và API Gateway (C) không liên quan tới kết nối hybrid.

**47. Đáp án: C, D** *(Exam 11 - Q4)*

Security Group và Subnet là thành phần của VPC nên cấu hình được ngay trong VPC dashboard. CloudFront (A), Route 53 (B) và ELB (E) có console riêng vì không thuộc VPC.

**48. Đáp án: B, D** *(Exam 11 - Q38)*

Edge location dùng để đưa nội dung tới gần user hơn và cache response nhằm giảm tải origin server. Chúng không host application (A) cũng không chạy NoSQL caching service (C).

**49. Đáp án: A** *(Exam 12 - Q1)*

Availability Zone gồm một hoặc nhiều data center riêng biệt, nối với nhau bằng link latency thấp. Region (C) là nhóm nhiều AZ chứ không phải nhóm data center trực tiếp.

**50. Đáp án: B, D** *(Exam 12 - Q18)*

Để workload trong VPC truy cập tài nguyên on-premises: dựng VPN tới virtual private gateway, hoặc dùng Direct Connect. Athena (C) chỉ query dữ liệu trên S3, CloudFront (E) là CDN.

**51. Đáp án: D** *(Exam 12 - Q27)*

CloudFront cache static content ở edge nên giảm latency và tăng transfer speed. Route 53 (C) chỉ phân giải DNS, bản thân nó không tăng tốc việc truyền nội dung.

#### Monitoring & Management

**52. Đáp án: B** *(Exam 1 - Q3)*

CloudTrail ghi lại mọi API call nên trả lời được "ai đã terminate instance, khi nào, từ đâu". CloudWatch theo dõi metric hiệu năng chứ không cho biết ai thực hiện hành động.

**53. Đáp án: C** *(Exam 1 - Q45)*

CloudWatch thu thập metric hiệu năng của EC2 (CPU, network, disk) để troubleshoot. CloudTrail (D) chỉ ghi API call nên không có dữ liệu hiệu năng.

**54. Đáp án: B** *(Exam 7 - Q10)*

CloudWatch là service thu thập metric từ các EC2 instance đang chạy. Inspector (A) quét lỗ hổng bảo mật, CloudFormation (C) provision hạ tầng.

**55. Đáp án: B** *(Exam 7 - Q11)*

X-Ray trace request qua từng thành phần của ứng dụng để tìm bottleneck gây load time chậm. Shield (D) chống DDoS và Security Hub (C) tổng hợp finding bảo mật — cả hai không giúp gì về hiệu năng.

**56. Đáp án: C** *(Exam 8 - Q11)*

CloudWatch Alarm giám sát metric CPUUtilization và cảnh báo khi vượt ngưỡng 60%. AWS Config (B) theo dõi cấu hình resource nên không có "CPU threshold"; SNS (D) chỉ gửi thông báo chứ không tự giám sát.

**57. Đáp án: B** *(Exam 9 - Q33)*

CloudTrail liên tục ghi hoạt động account, gồm cả hành động trên Management Console và qua SDK → đúng nhu cầu risk auditing. AWS Config (C) ghi thay đổi cấu hình resource, không phải toàn bộ user action.

**58. Đáp án: D, E** *(Exam 10 - Q3)*

CloudWatch Logs cho phép monitoring real-time và cấu hình retention linh hoạt. Nó không miễn phí (C) và cũng không kèm Elasticsearch Service analytics miễn phí (B).

**59. Đáp án: B** *(Exam 10 - Q14)*

AWS Config lưu lịch sử cấu hình của từng resource nên thấy được thay đổi theo thời gian. Inspector (A) đánh giá lỗ hổng, IAM (D) quản lý quyền truy cập.

#### Integration & Decoupling

**60. Đáp án: B** *(Exam 1 - Q15)*

Decoupling giảm phụ thuộc giữa các component (thường bằng SQS/SNS) nên lỗi ở một phần không lan sang phần khác. Coi ứng dụng như một khối duy nhất (A) chính là monolithic — ngược lại hoàn toàn.

**61. Đáp án: D** *(Exam 8 - Q25)*

Loose coupling cho phép sửa hoặc thay thế từng component mà không ảnh hưởng component khác. Nó không loại bỏ change management (A) và không liên quan tới Cross-Region Replication (B).

**62. Đáp án: C** *(Exam 10 - Q46)*

Vấn đề là một component lỗi làm sập toàn bộ app → giải pháp là decoupling, tách và cô lập các component. Elasticity (A) chỉ xử lý việc scale theo tải, không giải quyết phụ thuộc chéo.

**63. Đáp án: C** *(Exam 11 - Q24)*

Step Functions, DynamoDB và SNS đều là dịch vụ serverless. Các nhóm còn lại đều chứa EC2 hoặc EMR, mà cả hai đều chạy trên server bạn phải quản lý.

#### Deployment & Infrastructure as Code

**64. Đáp án: A** *(Exam 1 - Q42)*

CloudFormation là service Infrastructure as Code của AWS, mô tả hạ tầng bằng template JSON/YAML. AWS Config (B) chỉ theo dõi cấu hình hiện tại, không provision hạ tầng.

**65. Đáp án: C, D** *(Exam 6 - Q13)*

CloudFormation tự động provision và update hạ tầng một cách an toàn, có kiểm soát, và cho phép mô hình hoá toàn bộ hạ tầng trong một file text. Triển khai app mà không cần quan tâm hạ tầng (A) là Elastic Beanstalk, còn build code (E) là CodeBuild.

**66. Đáp án: A** *(Exam 6 - Q33)*

OpsWorks là managed Chef & Puppet, dùng để tự động cấu hình EC2 instance. Khi đề nhắc Chef hoặc Puppet thì đáp án gần như luôn là OpsWorks, không phải CloudFormation (B).

**67. Đáp án: D** *(Exam 6 - Q39)*

Elastic Beanstalk là PaaS: developer chỉ upload code, AWS lo capacity provisioning, load balancing và auto scaling — lý tưởng cho người chưa có kinh nghiệm cloud. Fargate (A) và Batch (B) vẫn đòi hiểu container hoặc batch job.

**68. Đáp án: B** *(Exam 8 - Q6)*

Elastic Beanstalk tự động deploy và scale ứng dụng từ code bạn vừa viết. CodeCommit (C) chỉ lưu source code chứ không deploy.

**69. Đáp án: B, C** *(Exam 12 - Q38)*

OpsWorks và CodeDeploy là dịch vụ hybrid, deploy được lên cả EC2 và server on-premises. Elastic Beanstalk (A) chỉ chạy trong AWS.

#### Machine Learning, AI & Analytics

**70. Đáp án: D** *(Exam 6 - Q8)*

Rekognition phân tích hình ảnh và video, bao gồm nhận diện khuôn mặt để tự động tag ảnh. Comprehend (A) là NLP cho văn bản, còn Polly (C) chuyển text thành giọng nói.

**71. Đáp án: C, D** *(Exam 6 - Q37)*

EMR là managed cluster để chạy Apache Spark, Hadoop và các framework Big Data khác, phân tích lượng dữ liệu rất lớn trong thời gian ngắn. Chuyển exabyte dữ liệu (B) là Snowmobile, chạy Docker container (E) là ECS/Fargate.

**72. Đáp án: D** *(Exam 10 - Q26)*

Athena là serverless query service, dùng SQL chuẩn query trực tiếp dữ liệu đang nằm trên S3. Glue (A) là ETL và data catalog, không phải interactive query engine.

**73. Đáp án: B** *(Exam 10 - Q43)*

Rekognition tự phát hiện object và label trong ảnh nên tiết kiệm thời gian gán nhãn thủ công. Nó không thêm watermark (A) cũng không resize ảnh (C).

</details>
