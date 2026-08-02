# Ứng dụng mô hình nền tảng

## Chọn và tùy chỉnh mô hình

Chọn FM theo modality, chất lượng, latency, context window, ngôn ngữ, kích thước, chi phí, điều kiện giấy phép và khả năng tùy chỉnh. **Temperature** thấp làm đầu ra ổn định hơn; cao tăng đa dạng. Giới hạn output token kiểm soát độ dài và chi phí.

- **Prompt engineering/in-context learning**: nhanh, rẻ, không đổi trọng số.
- **RAG**: truy xuất dữ liệu mới hoặc riêng tư rồi đưa vào prompt; tăng grounding và khả năng trích nguồn.
- **Fine-tuning**: cập nhật trọng số bằng các cặp prompt-completion chất lượng cao để đổi hành vi/phong cách.
- **Continued pre-training**: học thêm kho dữ liệu miền lớn; tốn kém hơn.

Bedrock Knowledge Bases hỗ trợ RAG. Vector store có thể dùng OpenSearch Serverless, Aurora PostgreSQL, RDS PostgreSQL, Neptune hoặc DocumentDB tùy trường hợp. Agents for Bedrock lập kế hoạch, gọi action group/API và phối hợp tác vụ nhiều bước.

## Prompt engineering

Prompt tốt nêu rõ vai trò, nhiệm vụ, ngữ cảnh, định dạng và ràng buộc. Zero-shot không có ví dụ; one-shot có một; few-shot có vài ví dụ. Prompt template giúp tái sử dụng. Negative prompt nêu điều không được làm. Cần phòng prompt injection, jailbreak và lộ dữ liệu; không coi prompt là ranh giới bảo mật duy nhất.

## Đánh giá

- **ROUGE** thường đánh giá độ phủ từ/cụm từ của tóm tắt.
- **BLEU** thường so sánh bản dịch với tham chiếu.
- **BERTScore** so sánh tương đồng ngữ nghĩa bằng embedding.
- Kết hợp benchmark tự động, đánh giá con người, model evaluation của Bedrock và KPI kinh doanh.

Dữ liệu fine-tuning phải được làm sạch, đại diện, có quyền sử dụng, định dạng đúng và tách train/validation/test để tránh rò rỉ.