# 📋 PACKSHEET LITE - MCP CONTEXT7 DOCUMENTATION
## 🗂️ **TRẠNG THÁI DỰ ÁN HIỆN TẠI** (Ngày: 30/08/2025)

---

## 🎯 **TỔNG QUAN DỰ ÁN**

**PackSheet Lite** - Ứng dụng web tạo phiếu gửi hàng chuyên nghiệp
- **Ngôn ngữ:** TypeScript + React 18.3.1
- **Build Tool:** Vite 5.4.19
- **Styling:** Tailwind CSS 3.4.17
- **Deployment:** Netlify Ready
- **Repository:** https://github.com/tungvu82nt/dh

---

## 📁 **CẤU TRÚC THỤ MỤC**

```
📦 PackSheet Lite/
├── 📁 public/
│   ├── _redirects          # Netlify SPA routing
│   ├── .htaccess          # Apache fallback
│   └── favicon.ico        # Website icon
├── 📁 src/
│   ├── 📁 components/
│   │   ├── App.tsx        # Main application component
│   │   ├── Navigation.tsx # Sidebar navigation
│   │   ├── NewForm.tsx    # Form creation interface
│   │   ├── FormsHistory.tsx # History display
│   │   ├── SettingsBackup.tsx # Data management
│   │   ├── WelcomeModal.tsx   # First-time user modal
│   │   └── LanguageSwitcher.tsx # Language toggle
│   ├── 📁 hooks/
│   │   ├── useLocalStorage.ts  # Local storage management
│   │   └── useLanguage.ts      # Language state management
│   ├── 📁 types/
│   │   └── index.ts       # TypeScript type definitions
│   ├── 📁 utils/
│   │   └── translations.ts # Multi-language support
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── 📁 dist/               # Production build output
├── netlify.toml          # Netlify deployment config
├── package.json          # Dependencies & scripts
├── vite.config.ts        # Build configuration
├── tailwind.config.js    # Styling configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

---

## 🔧 **DEPENDENCIES HIỆN TẠI**

### **Production Dependencies:**
- **react:** ^18.3.1 - UI Framework
- **react-dom:** ^18.3.1 - React DOM rendering
- **lucide-react:** ^0.542.0 - Icon library
- **html2canvas:** ^1.4.1 - HTML to Canvas conversion
- **jspdf:** ^3.0.2 - PDF generation
- **xlsx:** ^0.18.5 - Excel file handling

### **Development Dependencies:**
- **typescript:** ^5.9.2 - Type safety
- **vite:** ^5.4.19 - Build tool
- **@vitejs/plugin-react:** ^4.7.0 - React plugin for Vite
- **tailwindcss:** ^3.4.17 - Utility-first CSS
- **eslint:** ^9.34.0 - Code linting
- **typescript-eslint:** ^8.41.0 - TypeScript ESLint rules
- **@types/react:** ^18.3.24 - React type definitions
- **@types/react-dom:** ^18.3.7 - React DOM types

---

## 🚀 **TÍNH NĂNG CHÍNH**

### **1. Form Creation System**
- Dynamic product addition/removal
- Real-time calculation (quantity, weight, total)
- Customer information input
- Form validation

### **2. Multi-Language Support**
- Vietnamese (vi) - Primary
- Chinese (zh) - Secondary
- 95+ translation keys
- Runtime language switching

### **3. Data Management**
- Local storage persistence
- JSON export/import
- Excel export functionality
- Data backup & restore

### **4. Print & Export**
- PDF generation with jsPDF
- Excel export with xlsx
- Print-optimized CSS
- Professional form layout

### **5. User Experience**
- Responsive design
- Dark/light theme support
- Loading states
- Error handling

---

## 📱 **COMPONENTS ARCHITECTURE**

### **App.tsx** - Root Component
```typescript
- State management for current view
- Language context
- Form data persistence
- Welcome modal logic
```

### **Navigation.tsx** - Sidebar
```typescript
- View switching (new_form, history, settings)
- Language switcher integration
- Responsive design
```

### **NewForm.tsx** - Main Form Interface
```typescript
- Customer information input
- Dynamic product list
- Real-time calculations
- Form validation & submission
```

### **FormsHistory.tsx** - History Display
```typescript
- Table view of all forms
- Search & filter capabilities
- Delete functionality
- Export options
```

### **SettingsBackup.tsx** - Data Management
```typescript
- JSON backup/restore
- Excel export
- Clear all data
- Data overview
```

---

## 🎨 **STYLING & DESIGN**

### **Design System:**
- **Framework:** Tailwind CSS
- **Icons:** Lucide React
- **Typography:** System fonts
- **Colors:** Professional blue/gray palette
- **Layout:** Flexbox/Grid responsive

### **Key Design Patterns:**
- Card-based layout
- Shadow effects for depth
- Hover states for interactivity
- Loading skeletons
- Form validation states

---

## 🌐 **DEPLOYMENT CONFIGURATION**

### **Netlify Configuration (netlify.toml):**
```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

# MIME type headers for JavaScript
[[headers]]
  for = "/assets/*.js"
  [headers.values]
    Content-Type = "application/javascript"

# SPA routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### **SPA Routing (_redirects):**
```
/*    /index.html   200
/assets/*.js  /assets/:splat  200  Content-Type: application/javascript
/assets/*.css  /assets/:splat  200
```

---

## 🔒 **SECURITY & PERFORMANCE**

### **Security Measures:**
- Content Security Policy headers
- HTTPS enforcement (Netlify)
- Local storage data isolation
- Input validation & sanitization

### **Performance Optimizations:**
- Vite build optimization
- Code splitting
- Asset optimization
- Lazy loading components
- Bundle analysis

---

## 📊 **DATA STRUCTURE**

### **TypeScript Types:**
```typescript
interface ShippingForm {
  id: number;
  customer: Customer;
  items: FormItem[];
  createdAt: string;
  totalWeight: number;
  totalQuantity: number;
}

interface Customer {
  id: number;
  name: string;
  address: string;
  phone?: string;
}

interface FormItem {
  id: number;
  name: string;
  weight: number;
  quantity: number;
}

type ViewType = 'new_form' | 'forms_history' | 'settings';
type Language = 'vi' | 'zh';
```

### **Storage Structure:**
```javascript
localStorage = {
  'packsheet_forms': ShippingForm[],     // Form history
  'packsheet_language': Language,        // Current language
  'packsheet_has_visited': boolean       // First visit flag
}
```

---

## 🔧 **BUILD & DEVELOPMENT SCRIPTS**

### **Available Scripts:**
```json
{
  "dev": "vite",              // Development server
  "build": "vite build",      // Production build
  "lint": "eslint .",         // Code linting
  "preview": "vite preview"   // Preview production build
}
```

### **Build Output:**
```
dist/
├── index.html
├── _redirects
├── assets/
│   ├── index-[hash].css    # Main stylesheet
│   └── index-[hash].js     # Main JavaScript bundle
└── favicon.ico
```

---

## 🚨 **KNOWN ISSUES & FIXES**

### **1. MIME Type Errors (Netlify)**
**Issue:** `application/octet-stream` instead of `application/javascript`
**Solution:** Headers configuration in `netlify.toml`

### **2. SPA Routing Issues**
**Issue:** 404 on page refresh
**Solution:** `_redirects` file with proper routing rules

### **3. ESLint Configuration**
**Issue:** TypeScript/ESLint compatibility
**Solution:** Updated to latest versions with proper configuration

---

## 📈 **ROADMAP & FUTURE FEATURES**

### **Version 1.1 (Planned)**
- PDF template customization
- Advanced form templates
- Bulk operations
- Search & filter in history

### **Version 1.2 (Future)**
- Cloud storage integration
- Multi-user collaboration
- Advanced analytics
- API integrations

---

## 👥 **MAINTENANCE NOTES**

### **Regular Updates:**
- Dependencies: Monthly updates
- Security patches: As needed
- Node.js version: Keep current LTS

### **Code Quality:**
- ESLint: Strict rules enforced
- TypeScript: Strict mode enabled
- Tests: Unit tests for critical functions

### **Documentation:**
- README.md: Keep updated
- Code comments: Comprehensive
- API documentation: Generated

---

## 🎯 **DEPLOYMENT CHECKLIST**

### **Pre-deployment:**
- [x] Build successful (`npm run build`)
- [x] Linting passes (`npm run lint`)
- [x] Dependencies updated
- [x] TypeScript compilation clean
- [x] Netlify configuration present

### **Post-deployment:**
- [ ] Test all features on live site
- [ ] Check console for errors
- [ ] Verify MIME types
- [ ] Test form submission
- [ ] Verify export functionality

---

## 📞 **SUPPORT & CONTACT**

**Repository:** https://github.com/tungvu82nt/dh
**Issues:** Create GitHub issues for bugs/features
**Documentation:** This file (PROJECT_CONTEXT.md)

---

## 🏷️ **VERSION HISTORY**

- **v1.0.0** (30/08/2025): Initial release
  - Complete shipping form system
  - Multi-language support
  - PDF/Excel export
  - Netlify deployment ready
  - ESLint/TypeScript optimized

---

**📝 This document serves as the authoritative source of truth for PackSheet Lite project state. Any changes to the codebase should be reflected in this documentation to maintain consistency.**

**🔄 Last Updated:** 30/08/2025
**📊 Project Status:** ✅ Ready for Production
