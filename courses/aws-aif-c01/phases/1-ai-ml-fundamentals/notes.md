# Nền tảng AI và Machine Learning

## Bản đồ khái niệm

- **AI** là lĩnh vực xây dựng hệ thống thực hiện tác vụ thường cần trí thông minh con người.
- **Machine Learning** là một nhánh của AI, học quy luật từ dữ liệu thay vì chỉ dùng luật viết sẵn.
- **Deep Learning** dùng mạng nơ-ron nhiều lớp, phù hợp với ảnh, âm thanh và ngôn ngữ ở quy mô lớn.
- **Training** tạo ra mô hình từ dữ liệu; **inference** dùng mô hình đã huấn luyện để dự đoán dữ liệu mới.

## Chọn kiểu học

| Kiểu | Dữ liệu | Bài toán điển hình |
|---|---|---|
| Supervised learning | Có nhãn | Phân loại, hồi quy |
| Unsupervised learning | Không nhãn | Phân cụm, phát hiện cấu trúc |
| Reinforcement learning | Phần thưởng/phạt | Tối ưu chuỗi hành động |

**Classification** dự đoán một lớp; **regression** dự đoán giá trị liên tục; **clustering** nhóm các điểm tương tự. Không nên dùng ML khi luật nghiệp vụ đơn giản cho kết quả chính xác, dữ liệu không đủ, hoặc chi phí lớn hơn lợi ích.

## Vòng đời ML

1. Thu thập và khám phá dữ liệu (EDA).
2. Làm sạch, gán nhãn và tạo đặc trưng.
3. Chọn thuật toán, huấn luyện và tinh chỉnh siêu tham số.
4. Đánh giá bằng chỉ số kỹ thuật và chỉ số kinh doanh.
5. Triển khai, giám sát data drift/model drift và huấn luyện lại.

Với phân loại, dùng accuracy khi các lớp cân bằng; precision khi false positive đắt; recall khi bỏ sót positive nguy hiểm; F1 cân bằng precision và recall. Hồi quy thường dùng MAE, MSE hoặc RMSE.

## Dịch vụ AWS cần nhớ

- **Amazon SageMaker**: xây dựng, huấn luyện, triển khai và quản trị vòng đời ML.
- **Data Wrangler** chuẩn bị dữ liệu; **Feature Store** lưu và dùng lại đặc trưng; **Ground Truth** gán nhãn.
- **Model Monitor** theo dõi chất lượng; **Clarify** phát hiện bias và giải thích dự đoán.
- **Transcribe**: giọng nói thành văn bản; **Polly**: văn bản thành giọng nói; **Translate**: dịch máy.
- **Comprehend**: NLP và sentiment; **Rekognition**: ảnh/video; **Lex**: chatbot; **Textract**: trích xuất văn bản và biểu mẫu.

## Kiểu inference SageMaker

- **Real-time**: lưu lượng ổn định, độ trễ thấp.
- **Serverless**: lưu lượng gián đoạn, không muốn quản lý máy chủ.
- **Asynchronous**: payload lớn hoặc xử lý lâu.
- **Batch Transform**: xử lý ngoại tuyến cả tập dữ liệu, không cần endpoint thường trực.

> Ghi nhớ: bắt đầu từ bài toán và dữ liệu, sau đó mới chọn thuật toán hay dịch vụ.