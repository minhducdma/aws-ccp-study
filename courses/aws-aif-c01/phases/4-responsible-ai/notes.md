# Nguyên tắc AI có trách nhiệm

Responsible AI không chỉ là độ chính xác. Hệ thống cần **fairness, explainability, privacy, safety, robustness, transparency, veracity** và trách nhiệm giải trình. Đánh giá phải bao phủ các nhóm người dùng khác nhau và toàn bộ vòng đời.

## Bias và dữ liệu

Bias có thể đến từ lấy mẫu, nhãn, đo lường, lựa chọn đặc trưng hoặc vòng phản hồi khi vận hành. Dữ liệu cần đa dạng, đại diện, cân bằng và có nguồn gốc rõ ràng. Phân tích theo subgroup quan trọng vì chỉ số tổng thể tốt có thể che hiệu suất kém ở một nhóm.

- **Underfitting**: bias cao, mô hình quá đơn giản và kém trên cả train/test.
- **Overfitting**: variance cao, tốt trên train nhưng kém với dữ liệu mới.
- **SageMaker Clarify** phát hiện bias và giải thích dự đoán.
- **Model Monitor** theo dõi drift/chất lượng; **Amazon A2I** đưa con người vào quy trình review.

## Minh bạch và giải thích

Interpretability là mức con người hiểu cơ chế mô hình; explainability cung cấp lý do cho dự đoán. Decision tree thường dễ diễn giải hơn deep neural network. PDP và feature attribution giúp giải thích ảnh hưởng của đặc trưng. **SageMaker Model Cards** ghi mục đích, giới hạn, dữ liệu, chỉ số và rủi ro; AWS AI Service Cards mô tả use case và thực hành responsible AI của dịch vụ.

## GenAI an toàn

Rủi ro gồm hallucination, nội dung độc hại, bias, prompt misuse, lộ dữ liệu, đạo văn và vi phạm sở hữu trí tuệ. **Guardrails for Amazon Bedrock** lọc chủ đề/nội dung, dữ liệu nhạy cảm và hỗ trợ kiểm tra grounding. Guardrail không thay thế kiểm thử, giám sát, human review hay chính sách tổ chức.

Thiết kế lấy con người làm trung tâm cần thông báo khi AI được dùng, cho phép phản hồi/kháng nghị và giữ con người quyết định trong tình huống ảnh hưởng cao.