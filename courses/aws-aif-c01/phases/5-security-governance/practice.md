# Luyện tập: Bảo mật, tuân thủ và quản trị

**1.** VPC không được phép ra internet nhưng ứng dụng cần gọi Amazon Bedrock riêng tư. Tính năng nào phù hợp?
- A. Internet gateway
- B. AWS PrivateLink
- C. Public S3 bucket
- D. CloudFront

**2.** Dịch vụ nào ghi lại lời gọi API tới Bedrock để điều tra truy cập trái phép?
- A. AWS CloudTrail
- B. Amazon Polly
- C. AWS Artifact
- D. Amazon Translate

**3.** Dịch vụ nào giúp phát hiện dữ liệu nhạy cảm trong Amazon S3?
- A. Amazon Macie
- B. Amazon Lex
- C. AWS Batch
- D. Amazon Rekognition

**4.** Công ty cần tải báo cáo SOC của AWS. Dịch vụ nào cung cấp tài liệu này?
- A. AWS Artifact
- B. AWS Lambda
- C. SageMaker Clarify
- D. Amazon Q

**5.** Nguyên tắc nào giới hạn service role chỉ có đúng quyền cần cho tác vụ?
- A. Least privilege
- B. Public access
- C. High availability
- D. Horizontal scaling

<details>
<summary>Đáp án và giải thích</summary>

## Bảng đáp án nhanh

1B, 2A, 3A, 4A, 5A

---

## Giải thích từng câu
### Câu 1 — Đáp án: B
PrivateLink cung cấp kết nối riêng từ VPC đến dịch vụ AWS mà không qua internet công cộng.
### Câu 2 — Đáp án: A
CloudTrail lưu lịch sử API gồm principal, thời gian và hành động.
### Câu 3 — Đáp án: A
Macie khám phá và phân loại dữ liệu nhạy cảm trong S3.
### Câu 4 — Đáp án: A
Artifact là cổng self-service cho báo cáo tuân thủ và thỏa thuận AWS.
### Câu 5 — Đáp án: A
Least privilege chỉ cấp tập quyền tối thiểu cần thiết.
</details>