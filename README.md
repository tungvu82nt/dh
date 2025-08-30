# PackSheet Lite ⚡

> **Tạo phiếu gửi hàng tức thì, không cần đăng nhập**

Một ứng dụng web miễn phí, gọn nhẹ, giúp tạo phiếu gửi hàng (delivery form) chuyên nghiệp ngay lập tức mà không cần đăng ký tài khoản. Toàn bộ dữ liệu được lưu trữ an toàn ngay trên trình duyệt của bạn.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)

---

## ✨ Tính năng chính

### 📝 Tạo Form động
- Giao diện tạo phiếu trực quan với bản xem trước (live preview)
- Tự động tính toán tổng số lượng và tổng trọng lượng
- Nhập thông tin khách hàng và sản phẩm trực tiếp
- Điều chỉnh số lượng cho từng sản phẩm

### 🖨️ Xuất PDF & In ấn
- In trực tiếp phiếu gửi hàng chỉ với một cú nhấp chuột  
- Định dạng in tối ưu, loại bỏ các thành phần không cần thiết
- Giao diện form chuyên nghiệp, phù hợp cho doanh nghiệp

### 🗂️ Lịch sử Form
- Tự động lưu lại tất cả các phiếu đã tạo
- Xem chi tiết từng phiếu với thông tin đầy đủ
- Xóa các phiếu không cần thiết

### 💾 Sao lưu & Phục hồi  
- **Tính năng quan trọng nhất**: Xuất toàn bộ dữ liệu ra file .json
- Nhập dữ liệu từ file sao lưu để phục hồi
- Đảm bảo an toàn tuyệt đối cho dữ liệu của bạn
- Chuyển dữ liệu giữa các máy tính/trình duyệt

### 🌐 Đa ngôn ngữ (Multi-language)
- **🇻🇳 Tiếng Việt**: Giao diện hoàn toàn bằng tiếng Việt
- **🇨🇳 Tiếng Trung**: Hỗ trợ đầy đủ tiếng Trung giản thể
- **🔄 Chuyển đổi tức thời**: Chuyển ngôn ngữ mà không mất dữ liệu
- **📝 Translation hoàn chỉnh**: Tất cả 95+ keys đã được dịch chuyên nghiệp

### 🌐 Hoạt động Offline
- Ứng dụng hoạt động bình thường không cần internet
- Dữ liệu được lưu trực tiếp trên máy tính
- Không gửi thông tin lên máy chủ online

---

## 🚀 Trạng thái Deployment

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_SITE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_SITE_NAME/deploys)

*Badge này hiển thị trạng thái deployment real-time của dự án*

## 📦 Repository

**GitHub:** [https://github.com/tungvu82nt/dh](https://github.com/tungvu82nt/dh)

**Live Demo:** [Sẽ có sau khi deploy Netlify](#deployment-guide)

## 🚀 Deployment Guide

### Netlify (Khuyên dùng)

#### Bước 1: Truy cập Netlify
1. Vào [https://netlify.com](https://netlify.com)
2. Đăng nhập bằng GitHub

#### Bước 2: Deploy từ GitHub
1. Click **"Add new site"** → **"Import an existing project"**
2. Chọn **"Deploy with GitHub"**
3. Tìm repository `tungvu82nt/dh`
4. Click **"Deploy site"**

#### Bước 3: Cấu hình Build (Tự động)
Netlify sẽ tự động phát hiện cấu hình từ file `netlify.toml`:
```
Build command: npm run build
Publish directory: dist
Node version: 18
```

#### Bước 4: Kết quả
- ✅ **URL:** `https://[site-name].netlify.app`
- ✅ **Build time:** ~2-3 phút
- ✅ **Auto-deployment:** Tự động deploy khi push code

### Vercel (Alternative)

1. Import từ GitHub: `tungvu82nt/dh`
2. Build Settings:
   - Framework: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`

## 🛠️ Công nghệ sử dụng

**Frontend Framework:**
- **React 18** - Library UI hiện đại và hiệu quả
- **TypeScript** - Type safety và developer experience tốt hơn  
- **Vite** - Build tool nhanh và tối ưu

**Styling & UI:**
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful & consistent icons
- **Responsive Design** - Tối ưu cho mọi kích thước màn hình

**Data Storage:**
- **localStorage** - Web Storage API cho việc lưu trữ client-side
- **JSON** - Format dữ liệu đơn giản và dễ đọc

**Export & Print:**
- **jsPDF** - Tạo file PDF từ JavaScript
- **html2canvas** - Chuyển đổi HTML thành hình ảnh
- **Browser Print API** - In trực tiếp từ trình duyệt

---

## 🚀 Cách cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18+ 
- npm hoặc yarn
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)

### Cài đặt

1. **Clone repository:**
   ```bash
   git clone https://github.com/your-username/packsheet-lite.git
   cd packsheet-lite
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Chạy development server:**
   ```bash
   npm run dev
   ```

4. **Mở trình duyệt:**
   - Truy cập `http://localhost:5173`
   - Ứng dụng đã sẵn sàng sử dụng!

### Build cho production

```bash
npm run build
```

Files được build sẽ nằm trong thư mục `dist/` và có thể deploy lên bất kỳ static hosting nào.

---

## ☁️ Triển khai (Deploy)

### Option 1: Netlify (Khuyên dùng) 🚀
1. Push code lên GitHub
2. Kết nối GitHub với Netlify
3. **Quan trọng**: Cấu hình build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18
4. Deploy tự động từ main branch

#### 🔧 Fix lỗi MIME type trên Netlify:
Đã được cấu hình sẵn với:
- File `netlify.toml` cho cấu hình build
- File `_redirects` trong thư mục `public/`
- Vite config được tối ưu cho deployment
- Headers MIME type configuration

##### 🚨 Nếu vẫn gặp lỗi MIME type:

**Bước 1: Kiểm tra Netlify Build Settings**
```
Build command: npm run build
Publish directory: dist
Node version: 18
```

**Bước 2: Clear cache và rebuild**
- Vào Netlify Dashboard
- Site Settings > Build & Deploy
- Click "Clear cache and deploy site"

**Bước 3: Thay đổi build command (nếu cần)**
```
npm install && npm run build
```

**Bước 4: Alternative - Sử dụng .htaccess**
```apache
# Thêm vào dist/.htaccess
<IfModule mod_mime.c>
  AddType application/javascript .js
  AddType text/css .css
</IfModule>
```

### Option 2: Vercel
1. Import project từ GitHub
2. Deploy với một cú click

### Option 3: GitHub Pages
1. Build project: `npm run build`
2. Push folder `dist/` lên GitHub Pages

**Lưu ý:** Tất cả các platform trên đều miễn phí cho các dự án open source!

---

## 🏗️ Kiến trúc ứng dụng

### Cấu trúc thư mục
```
src/
├── components/           # React components
│   ├── Navigation.tsx   # Sidebar navigation
│   ├── NewForm.tsx      # Form creation page
│   ├── FormsHistory.tsx # Forms history page
│   ├── SettingsBackup.tsx
│   └── WelcomeModal.tsx
├── hooks/
│   └── useLocalStorage.ts # Custom hook cho localStorage
├── types/
│   └── index.ts         # TypeScript type definitions
├── App.tsx              # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

### Data Flow
```
localStorage ←→ Custom Hooks ←→ React State ←→ Components
```

### Lưu trữ dữ liệu
Ứng dụng sử dụng **localStorage** để lưu trữ:
- `packsheet_forms` - Lịch sử các form đã tạo
- `packsheet_has_visited` - Flag cho welcome modal

---

## ⚠️ Lưu ý quan trọng về dữ liệu

### ✅ Ưu điểm
- **Tốc độ:** Cực kỳ nhanh vì không có độ trễ mạng
- **Riêng tư:** Dữ liệu không rời khỏi máy tính của bạn
- **Chi phí:** Miễn phí hoàn toàn để vận hành
- **Offline:** Hoạt động không cần internet

### ⚠️ Nhược điểm (CẦN ĐỌC KỸ)
- **Rủi ro mất dữ liệu:** Nếu xóa cache/dữ liệu trình duyệt hoặc định dạng máy tính, toàn bộ dữ liệu sẽ **MẤT VĨNH VIỄN**
- **Không đồng bộ:** Dữ liệu trên Chrome khác với Firefox, hoặc máy tính khác
- **Giới hạn dung lượng:** localStorage có giới hạn ~10MB

### 🛡️ HÀNH ĐỘNG BẮT BUỘC
> **Để đảm bảo an toàn, hãy vào mục ⚙️ Cài Đặt & Sao Lưu và sử dụng tính năng "Tải Xuống Bản Sao Lưu" một cách thường xuyên (ví dụ: cuối mỗi ngày làm việc).**

File .json được tải về chính là "bảo hiểm" cho toàn bộ công sức của bạn!

---

## 🎯 Hướng dẫn sử dụng

### Bước 1: Tạo phiếu gửi hàng
1. Vào mục **"Tạo Form Mới"**
2. Nhập thông tin khách hàng (tên, địa chỉ, SĐT)
3. Thêm sản phẩm vào form và nhập tên, số lượng, trọng lượng
4. Xem preview bên phải
5. Click **"Lưu Đơn Hàng"**

### Bước 2: Sao lưu dữ liệu (QUAN TRỌNG!)
1. Vào mục **"Cài Đặt & Sao Lưu"**  
2. Click **"Tải Xuống Bản Sao Lưu"**
3. Lưu file .json vào nơi an toàn

---

## 🔄 Phục hồi dữ liệu

Nếu bạn cần chuyển dữ liệu sang máy tính/trình duyệt khác:

1. Tải file sao lưu .json từ máy cũ
2. Mở PackSheet Lite trên máy mới
3. Vào **"Cài Đặt & Sao Lưu"** 
4. Chọn **"Phục Hồi Dữ Liệu"** và upload file .json
5. Xác nhận ghi đè dữ liệu

---

## 🔧 Troubleshooting Deployment

### Lỗi MIME type trên Netlify
Nếu gặp lỗi: *"Failed to load module script: Expected a JavaScript module"*

**Giải pháp:**
1. Đảm bảo file `netlify.toml` có trong root directory
2. File `_redirects` được copy vào thư mục `dist/` sau khi build
3. Cấu hình Netlify build settings chính xác:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Lỗi 404 khi refresh trang
1. Kiểm tra file `_redirects` trong thư mục `dist/`
2. Đảm bảo có dòng: `/*    /index.html   200`

### Build failed
1. Cập nhật Node.js version trong Netlify (18+)
2. Chạy `npm install` trước khi build
3. Kiểm tra dependencies trong `package.json`

---

## 🚀 Roadmap phát triển

### Version 1.0.1 (Đã hoàn thành)
- [x] **Multi-language support** (Vietnamese & Chinese) - ✅ HOÀN THÀNH
- [x] **Clean translation system** với 95+ keys - ✅ HOÀN THÀNH
- [x] **Remove duplicate keys** - ✅ HOÀN THÀNH
- [x] **Build optimization** - ✅ HOÀN THÀNH

### Version 1.1 (Đang phát triển)
- [ ] Export PDF với tùy chọn template
- [ ] Dark mode
- [ ] Tìm kiếm và filter trong danh sách
- [ ] Bulk operations cho sản phẩm/khách hàng

### Version 1.2 (Tương lai)
- [ ] Advanced form templates
- [ ] Data analytics và báo cáo
- [ ] Cloud sync option (tùy chọn)

---

## 👥 Contributing

Chúng tôi hoan nghênh mọi đóng góp! Hãy:

1. Fork repository này
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

### Development Guidelines
- Sử dụng TypeScript cho type safety
- Follow React best practices
- Viết code clean và có comment
- Test trên nhiều trình duyệt
- Đảm bảo responsive design

---

## 🐛 Bug Reports & Feature Requests

Có lỗi hay ý tưởng mới? Hãy tạo [Issue mới](https://github.com/your-username/packsheet-lite/issues) với:

**Bug Report:**
- Mô tả chi tiết lỗi
- Các bước để reproduce
- Screenshots nếu có
- Thông tin trình duyệt và hệ điều hành

**Feature Request:**  
- Mô tả tính năng mong muốn
- Lý do tại sao tính năng này hữu ích
- Mockup hoặc ý tưởng thiết kế (nếu có)

---

## 📱 Khả năng tương thích

### Trình duyệt được hỗ trợ
- ✅ Chrome 90+
- ✅ Firefox 88+  
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Thiết bị được tối ưu
- 📱 **Mobile** (320px - 767px): Navigation collapse, touch-friendly
- 📱 **Tablet** (768px - 1023px): Optimized grid layouts  
- 🖥️ **Desktop** (1024px+): Full feature set, multi-column layouts

---

## 🔐 Bảo mật & Quyền riêng tư

### Cam kết bảo mật
- **100% Client-side**: Không có server, không có database trung tâm
- **Zero tracking**: Không thu thập dữ liệu người dùng
- **Local storage only**: Dữ liệu chỉ tồn tại trên máy tính của bạn
- **No analytics**: Không có Google Analytics hay tracking tools

### Quyền riêng tư
- Không cần đăng ký tài khoản
- Không yêu cầu thông tin cá nhân  
- Dữ liệu không được gửi đến bất kỳ server nào
- Hoàn toàn GDPR compliant

---

## 🤝 Hỗ trợ

### Cách liên hệ
- 📧 Email: support@packsheet-lite.com
- 💬 GitHub Issues: [Tạo issue mới](https://github.com/your-username/packsheet-lite/issues)

### FAQ

**Q: Tôi có thể sử dụng trên điện thoại không?**
A: Có! Ứng dụng được tối ưu hoàn toàn cho mobile và tablet.

**Q: Dữ liệu có bị mất khi tắt trình duyệt không?**  
A: Không, dữ liệu được lưu vĩnh viễn trong localStorage cho đến khi bạn xóa cache.

**Q: Có giới hạn số lượng sản phẩm/khách hàng không?**
A: Giới hạn duy nhất là dung lượng localStorage (~10MB), thực tế có thể lưu hàng nghìn records.

**Q: Tôi có thể tùy chỉnh template form không?**
A: Hiện tại chưa, nhưng tính năng này đang trong roadmap phiên bản 1.1.

---

## 📄 Giấy phép

Dự án này được cấp phép theo [MIT License](LICENSE) - xem file LICENSE để biết chi tiết.

**Tóm tắt giấy phép:**
- ✅ Sử dụng cho mục đích thương mại
- ✅ Modify và distribute  
- ✅ Private use
- ❌ Không có warranty
- ❌ Author không chịu trách nhiệm

---

## ✍️ Tác giả & Credits

**Được phát triển bởi:** Sản phẩm Đổi mới Studio
**Version:** 1.0.1
**Release Date:** 30/08/2025
**Last Updated:** October 2024

### Lời cảm ơn
- React team cho framework tuyệt vời
- Tailwind CSS cho styling system  
- Lucide team cho icon set đẹp
- Community contributors

---

## 🌟 Nếu bạn thấy hữu ích

Nếu PackSheet Lite giúp ích cho công việc của bạn, hãy:
- ⭐ Star repository này
- 🔄 Share với bạn bè, đồng nghiệp  
- 💡 Contribute với ý tưởng mới
- 🐛 Report bugs để cùng cải thiện

**Cảm ơn bạn đã sử dụng PackSheet Lite!** 🙏

---

*📱 Ứng dụng hoạt động 100% offline - Dữ liệu của bạn, quyền kiểm soát của bạn!*#   d h 
 
 