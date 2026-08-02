# Nền tảng AI tạo sinh

## Khái niệm cốt lõi

Generative AI tạo nội dung mới như văn bản, ảnh, âm thanh và mã. **Foundation model (FM)** được tiền huấn luyện trên dữ liệu lớn và có thể thích nghi với nhiều tác vụ. LLM thường dùng kiến trúc transformer; diffusion model phổ biến cho tạo ảnh; multimodal model xử lý nhiều loại dữ liệu.

- **Token** là đơn vị đầu vào/đầu ra và thường là cơ sở tính phí.
- **Embedding** biểu diễn dữ liệu bằng vector để đo độ tương đồng ngữ nghĩa.
- **Context window** giới hạn tổng token mô hình có thể xem trong một yêu cầu.
- Vòng đời FM: chọn dữ liệu và mô hình, pre-training, tùy chỉnh, đánh giá, triển khai, nhận phản hồi.

## Giá trị và giới hạn

Use case gồm tóm tắt, chatbot, sinh mã, dịch, tìm kiếm, cá nhân hóa và tạo media. GenAI linh hoạt và rút ngắn time-to-market nhưng có thể hallucinate, thiếu nhất quán, khó giải thích, mang bias và phát sinh rủi ro sở hữu trí tuệ. Luôn đánh giá cả chất lượng, latency, chi phí, bảo mật và KPI kinh doanh.

## Dịch vụ AWS

- **Amazon Bedrock** cung cấp API serverless tới nhiều FM, Knowledge Bases, Agents, Guardrails và model evaluation.
- **SageMaker JumpStart** giúp khám phá, tùy chỉnh và triển khai mô hình có sẵn; SageMaker phù hợp khi cần kiểm soát sâu vòng đời ML.
- **Amazon Q Business** trợ lý trên dữ liệu doanh nghiệp; **Amazon Q Developer** hỗ trợ vòng đời phát triển phần mềm.
- **PartyRock** là playground no-code dựa trên Bedrock để thử nghiệm ứng dụng GenAI.

Bedrock On-Demand phù hợp lưu lượng biến động và không cam kết; Provisioned Throughput phù hợp nhu cầu ổn định cần năng lực dành trước. Chi phí còn phụ thuộc model, token, latency, vùng và mức tùy chỉnh.