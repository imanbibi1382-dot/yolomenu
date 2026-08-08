# 🎯 پروژه YOLO Coffee Menu

یک منوی دیجیتال مدرن و حرفه‌ای برای کافه یولو با پشتیبانی کامل از زبان فارسی و طراحی RTL.

## 📋 ویژگی‌ها

- ✅ طراحی RTL کامل برای فارسی
- ✅ Mobile-first و Responsive
- ✅ Dark mode
- ✅ فیلتر دسته‌بندی محصولات
- ✅ جستجو
- ✅ انیمیشن‌های زیبا
- ✅ تایپوگرافی فارسی (فونت وزیرمتن)
- ✅ بدون نیاز به Backend

## 🚀 شروع سریع

### پیش‌نیازها

- Node.js نسخه 20 یا بالاتر
- pnpm (نصب خودکار توسط اسکریپت)

### نصب و اجرا

#### روش ۱: استفاده از اسکریپت خودکار (پیشنهادی)

فقط فایل `quick-build.bat` را دابل‌کلیک کنید!

این اسکریپت به صورت خودکار:
1. Node.js و pnpm را بررسی می‌کند
2. وابستگی‌ها را نصب می‌کند  
3. پروژه را build می‌کند

#### روش ۲: دستی

```bash
# نصب pnpm (اگر نصب نیست)
npm install -g pnpm

# نصب وابستگی‌ها
pnpm install

# Build پروژه
pnpm run build
```

## 📁 ساختار پروژه

```
yolo menu/
├── artifacts/
│   └── yolo-menu/              # اپلیکیشن اصلی
│       ├── src/                # کدهای React
│       ├── public/             # فایل‌های استاتیک
│       ├── dist/               # خروجی build (بعد از build)
│       ├── index.html          # HTML اصلی
│       ├── package.json        # وابستگی‌ها
│       └── vite.config.ts      # تنظیمات Vite
├── quick-build.bat             # اسکریپت build سریع
├── build.bat                   # اسکریپت build
├── build.ps1                   # اسکریپت PowerShell
├── Dockerfile                  # تنظیمات Docker
└── README_FA.md               # این فایل
```

## 🔧 دستورات موجود

```bash
# اجرای سرور توسعه
pnpm --filter @workspace/yolo-menu run dev

# Build برای production
pnpm --filter @workspace/yolo-menu run build

# پیش‌نمایش build
pnpm --filter @workspace/yolo-menu run serve

# بررسی نوع (Type checking)
pnpm --filter @workspace/yolo-menu run typecheck
```

## 🌐 پیش‌نمایش

بعد از build، فایل‌های خروجی در `artifacts/yolo-menu/dist/public/` قرار می‌گیرند.

برای پیش‌نمایش:

**روش ۱: مرورگر**
```
فایل artifacts\yolo-menu\dist\public\index.html را باز کنید
```

**روش ۲: سرور محلی**
```bash
cd artifacts/yolo-menu/dist/public
npx serve
```

سپس به http://localhost:3000 بروید.

## 🛠️ تکنولوژی‌های استفاده شده

- **React 18** - کتابخانه UI
- **TypeScript** - زبان برنامه‌نویسی
- **Vite** - ابزار build
- **Tailwind CSS** - فریم‌ورک CSS
- **Radix UI** - کامپوننت‌های UI
- **Framer Motion** - انیمیشن
- **Lucide Icons** - آیکون‌ها
- **Vazirmatn** - فونت فارسی

## 📦 Build با Docker

اگر ترجیح می‌دهید از Docker استفاده کنید:

```bash
docker-compose up builder
```

## 🐛 عیب‌یابی

### Node.js پیدا نشد
1. از https://nodejs.org دانلود کنید
2. نصب کنید
3. ترمینال را ری‌استارت کنید

### pnpm پیدا نشد
```bash
npm install -g pnpm
```

### خطای PORT environment variable
قبل از build:
```bash
set PORT=25125
set BASE_PATH=/
```

یا در PowerShell:
```powershell
$env:PORT = "25125"
$env:BASE_PATH = "/"
```

### خطای نصب وابستگی‌ها
```bash
# پاک کردن cache
pnpm store prune

# حذف node_modules
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force artifacts/yolo-menu/node_modules

# نصب مجدد
pnpm install
```

## 📝 یادداشت‌ها

- این پروژه برای Replit طراحی شده اما در هر محیطی قابل اجراست
- برای اجرا در محیط توسعه، متغیرهای PORT و BASE_PATH لازم هستند
- برای production، این متغیرها در زمان build تنظیم می‌شوند

## 📄 مجوز

MIT License

## 👨‍💻 توسعه‌دهنده

YOLO Coffee Shop

---

**نکته**: برای هرگونه سوال یا مشکل، به فایل `SETUP_GUIDE_FA.md` مراجعه کنید.
