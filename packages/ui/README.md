# @study/ui

Design system dùng chung của nền tảng: design token, primitive, animation và bộ minh hoạ vector. Web app không tự định nghĩa nút, thẻ hay badge nữa mà lấy hết từ đây.

Package này xuất thẳng file nguồn TypeScript, không có bước build riêng. Vite của app biên dịch chúng cùng lúc với code app, nên sửa component là thấy ngay mà không cần watch thêm tiến trình nào.

## Vì sao không dùng gluestack

Yêu cầu ban đầu là dùng [gluestack](https://gluestack.io/), nhưng bản v5 phát hành 25/06/2026 đã bỏ hỗ trợ web: engine NativeWind v5 chưa chạy được trên web nên họ ngừng hỗ trợ Next.js, còn UniWind thì chỉ dành cho Expo. Bản v4 tuy còn chạy web nhưng bắt buộc kéo theo `react-native-web` và Tailwind v3, trong khi dự án đang ở Tailwind v4.

Thay vào đó, phần hành vi phức tạp giao cho [Radix UI](https://www.radix-ui.com/) — primitive không kèm style, mạnh về accessibility — còn phần nhìn vẫn thuần Tailwind. Animation dùng [Motion](https://motion.dev/).

## Cấu trúc

| Thư mục | Nội dung |
|---|---|
| `src/tokens.css` | Design token khai báo bằng `@theme` của Tailwind v4, cộng thêm quy tắc `prefers-reduced-motion` và utility `focus-ring` |
| `src/primitives/` | Component dùng lại được: `Button`, `Card`, `Badge`, `Progress`, `Switch`, `Tabs`, `ConfirmDialog`, `Sheet`… |
| `src/motion/` | Provider animation và bộ preset variant dùng chung |
| `src/illustrations/` | Icon và tranh minh hoạ SVG viết tay |

## Token

Mọi biến trong `@theme` tự động thành utility Tailwind: `--color-brand-500` cho ra `bg-brand-500`, `--ease-out-expo` cho ra `ease-out-expo`, `--animate-shimmer` cho ra `animate-shimmer`.

App phải khai báo hai dòng trong CSS gốc, nếu thiếu dòng thứ hai thì Tailwind không quét thư mục này và class trong các primitive sẽ không được sinh ra:

```css
@import '@study/ui/tokens.css';
@source '../../../packages/ui/src';
```

Tailwind loại bỏ biến không ai dùng. Các minh hoạ tô màu bằng `var(--color-pass)` thay vì class, nên khi thêm token chỉ dành cho SVG hãy kiểm tra lại nó còn trong CSS đầu ra.

## Animation

`MotionProvider` bọc app một lần ở `main.tsx`. Nó nạp `LazyMotion` với bộ tính năng `domAnimation` thay vì toàn bộ Motion, bỏ qua engine layout projection và drag mà app không dùng.

Vì vậy trong component phải import `m` chứ không phải `motion`:

```tsx
import { m, fadeUp } from '@study/ui';

<m.div variants={fadeUp} initial="hidden" animate="visible" />;
```

Provider bật chế độ `strict`, nên lỡ dùng `motion.div` sẽ báo lỗi ngay thay vì âm thầm kéo thêm bundle.

`reducedMotion="user"` khiến Motion bỏ mọi biến đổi hình học khi người dùng bật giảm chuyển động ở hệ điều hành, chỉ giữ lại fade. Animation viết bằng CSS được xử lý riêng bởi khối `@media (prefers-reduced-motion: reduce)` trong `tokens.css`.

Quy ước phân chia: animation lặp vô hạn và micro-interaction (hover, nhấn) viết bằng CSS vì không tốn main thread; animation có dàn dựng — xuất hiện tuần tự, chuyển cảnh, vào/ra của overlay — thì dùng Motion.

## Accessibility

Đây là lý do chính chọn Radix. Những thứ dễ làm sai nếu tự viết đã có sẵn:

- `ConfirmDialog` thay cho `window.confirm`: khoá focus trong hộp thoại, trả focus về nút cũ khi đóng, đóng bằng Escape, tự nối `aria-labelledby` và `aria-describedby`.
- `Sheet` cho menu điện thoại: khoá focus và vô hiệu hoá nền phía sau.
- `Progress` phát ra `role="progressbar"` kèm `aria-valuenow`. Prop `label` là bắt buộc, vì một thanh tiến độ đọc lên thành con số không có chủ ngữ thì vô nghĩa.
- `Switch` phát ra `role="switch"` với `aria-checked`, khác với một cái nút bấm bình thường.

Ngoài Radix: mọi thành phần tương tác dùng chung utility `focus-ring`, và `Button` cỡ `md` cao tối thiểu 44px cho vừa đầu ngón tay trên điện thoại.

## Chi phí bundle

Tổng bundle của web app tăng từ 283 lên 354 KB gzip. Trong 71 KB đó, thư viện chiếm khoảng 56 KB — Motion 36 KB, năm primitive Radix 20 KB — phần còn lại là component, minh hoạ và CSS của chính design system.

Radix Tooltip từng nằm trong package nhưng đã bị gỡ: nó kéo theo `@floating-ui`, một mình tốn 18 KB gzip trong khi năm primitive Radix còn lại cộng lại chỉ 20 KB, và tất cả chỉ để phục vụ hai dòng chú thích vốn có thể viết thẳng ra màn hình. Chú thích hiển thị sẵn cũng hợp lý hơn trên điện thoại, nơi không có thao tác rê chuột. Nếu sau này cần popover thật thì thêm lại, nhưng hãy cân nhắc con số đó trước.

Khi thêm thư viện mới, đo bằng cách bundle riêng nó ra để biết giá thật:

```bash
echo "export * as x from '<package>';" > /tmp/probe.js
npx esbuild /tmp/probe.js --bundle --minify --format=esm --external:react --external:react-dom | gzip -c | wc -c
```

## Thêm component mới

Đặt file vào `src/primitives/`, dùng `cva` để khai báo biến thể và `cn()` để gộp class. `cn()` chạy qua `tailwind-merge` nên class truyền từ ngoài vào sẽ thắng class mặc định cùng nhóm — nhờ đó `className="px-8"` ghi đè được `px-4` của variant. Cuối cùng export lại trong `src/index.ts`.
