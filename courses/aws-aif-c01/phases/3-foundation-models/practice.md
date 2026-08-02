# Luyện tập: Ứng dụng mô hình nền tảng

**1.** Công ty cần chatbot trả lời dựa trên tài liệu nội bộ thay đổi hàng ngày và có thể dẫn nguồn. Cách nào phù hợp nhất?
- A. Pre-training từ đầu
- B. RAG
- C. Tăng temperature
- D. Batch inference

**2.** Kỹ thuật prompt cung cấp ba ví dụ đầu vào-đầu ra trước câu hỏi mới gọi là gì?
- A. Zero-shot
- B. Few-shot
- C. Fine-tuning
- D. Tokenization

**3.** Muốn câu trả lời ổn định và ít sáng tạo hơn, nên điều chỉnh gì?
- A. Tăng temperature
- B. Giảm temperature
- C. Tăng số epoch
- D. Xóa context

**4.** Chỉ số nào thường dùng để đánh giá chất lượng bản dịch máy?
- A. RMSE
- B. BLEU
- C. AUC
- D. Accuracy

**5.** Thành phần Bedrock nào phối hợp gọi API để hoàn thành tác vụ nhiều bước?
- A. Agents for Amazon Bedrock
- B. Amazon Macie
- C. SageMaker Ground Truth
- D. Amazon Polly

<details>
<summary>Đáp án và giải thích</summary>

## Bảng đáp án nhanh

1B, 2B, 3B, 4B, 5A

---

## Giải thích từng câu
### Câu 1 — Đáp án: B
RAG truy xuất dữ liệu mới khi chạy, giúp grounding và dẫn nguồn mà không huấn luyện lại.
### Câu 2 — Đáp án: B
Few-shot learning hướng dẫn mô hình bằng một số ví dụ ngay trong prompt.
### Câu 3 — Đáp án: B
Temperature thấp giảm độ ngẫu nhiên khi chọn token.
### Câu 4 — Đáp án: B
BLEU so sánh n-gram của bản dịch với bản dịch tham chiếu.
### Câu 5 — Đáp án: A
Agents lập kế hoạch và gọi action groups để thực hiện quy trình nhiều bước.
</details>