# Luyện tập: Nền tảng AI và ML

**1.** Doanh nghiệp có dữ liệu khách hàng chưa gán nhãn và muốn tự động chia thành các nhóm hành vi tương tự. Phương pháp nào phù hợp nhất?

- A. Học có giám sát
- B. Học không giám sát
- C. Học tăng cường
- D. Hồi quy tuyến tính có nhãn

**2.** Một bệnh viện muốn giảm tối đa số ca bệnh thực sự nhưng mô hình không phát hiện. Chỉ số nào cần ưu tiên?

- A. Recall
- B. Precision
- C. Training loss
- D. R-squared

**3.** Dịch vụ nào chuyển bản ghi âm cuộc gọi thành văn bản?

- A. Amazon Polly
- B. Amazon Translate
- C. Amazon Transcribe
- D. Amazon Rekognition

**4.** Tác vụ nào đang diễn ra khi mô hình đã huấn luyện phân loại một ảnh mới?

- A. Gán nhãn
- B. Inference
- C. Feature engineering
- D. Hyperparameter tuning

**5.** Endpoint có yêu cầu đầu vào lớn và thời gian xử lý có thể kéo dài nhiều phút. Kiểu SageMaker inference nào phù hợp?

- A. Real-time inference
- B. Asynchronous inference
- C. Serverless inference
- D. Streaming inference

<details>
<summary>Đáp án và giải thích</summary>

## Bảng đáp án nhanh

1B, 2A, 3C, 4B, 5B

---

## Giải thích từng câu

### Câu 1 — Đáp án: B

Clustering trong học không giám sát tìm cấu trúc từ dữ liệu không có nhãn; các lựa chọn còn lại cần nhãn hoặc tín hiệu phần thưởng.

### Câu 2 — Đáp án: A

Recall đo tỷ lệ positive thực tế được phát hiện, nên trực tiếp giảm false negative.

### Câu 3 — Đáp án: C

Transcribe chuyển speech-to-text; Polly làm chiều ngược lại, Translate dịch và Rekognition phân tích ảnh/video.

### Câu 4 — Đáp án: B

Inference là dùng mô hình đã huấn luyện để tạo dự đoán trên dữ liệu mới.

### Câu 5 — Đáp án: B

Asynchronous inference nhận payload lớn và xử lý lâu mà không giữ kết nối yêu cầu đồng bộ.

</details>