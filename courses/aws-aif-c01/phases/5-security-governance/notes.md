# Bảo mật, tuân thủ và quản trị AI

## Bảo mật theo chiều sâu

Áp dụng shared responsibility model và least privilege. Dùng IAM role/policy để giới hạn ai được gọi model và truy cập dữ liệu; mã hóa khi lưu và truyền; tách mạng bằng VPC endpoint/**AWS PrivateLink**; quản lý khóa với AWS KMS. Không biến S3 thành public để Bedrock đọc dữ liệu, mà cấp quyền đúng cho service role.

Prompt injection có thể khiến model bỏ qua chỉ dẫn hoặc làm lộ dữ liệu. Giảm rủi ro bằng kiểm tra đầu vào/đầu ra, phân tách dữ liệu không tin cậy, Guardrails, quyền tối thiểu cho tool, allowlist hành động và human approval. Không đưa bí mật vào prompt nếu không cần thiết.

- **CloudTrail** ghi hoạt động API để điều tra và audit.
- **CloudWatch** thu thập metric/log và cảnh báo vận hành.
- **Macie** phát hiện dữ liệu nhạy cảm trong S3.
- **Inspector** quản lý phát hiện lỗ hổng workload; **AWS Config** theo dõi cấu hình và quy tắc tuân thủ.

## Governance và compliance

Data governance quy định chủ sở hữu, chất lượng, catalog, lineage, residency, retention, quyền truy cập và xóa dữ liệu. Lineage ghi dữ liệu đến từ đâu và được biến đổi thế nào, hỗ trợ tái lập và audit.

- **AWS Artifact** cung cấp báo cáo tuân thủ và thỏa thuận AWS.
- **AWS Audit Manager** tự động thu thập bằng chứng để hỗ trợ audit.
- **AWS Config** đánh giá cấu hình tài nguyên theo chính sách.
- **Trusted Advisor** đưa khuyến nghị theo best practice.
- Chuẩn thường gặp gồm ISO, SOC và quy định riêng theo ngành/khu vực.

Governance framework cần vai trò rõ ràng, inventory model/use case, phân loại rủi ro, cổng review, lịch đánh giá, incident response, đào tạo nhân viên và tài liệu model/data. Mức kiểm soát phải tăng theo mức ảnh hưởng và mức sở hữu; tự huấn luyện model từ đầu tạo nhiều trách nhiệm hơn dùng ứng dụng GenAI hoàn chỉnh.