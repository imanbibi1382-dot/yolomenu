# راهنمای نصب و بیلد پروژه YOLO Menu

## وضعیت فعلی
این پروژه یک اپلیکیشن React است که با Vite ساخته شده و برای build شدن نیاز به Node.js دارد.

## راه‌حل‌های موجود

### روش ۱: نصب Node.js (ساده‌ترین روش)

#### مرحله ۱: دانلود Node.js
1. به سایت https://nodejs.org بروید
2. نسخه LTS (Long Term Support) را دانلود کنید
3. فایل نصب را اجرا کنید و مراحل نصب را دنبال کنید
4. کامپیوتر را ری‌استارت کنید

#### مرحله ۲: نصب pnpm
PowerShell یا Command Prompt را باز کنید و دستور زیر را اجرا کنید:
```
npm install -g pnpm
```

#### مرحله ۳: نصب وابستگی‌ها
```
cd "c:\Users\Webmastersalam\Desktop\yolo menu"
pnpm install
```

#### مرحله ۴: بیلد پروژه
```
cd "c:\Users\Webmastersalam\Desktop\yolo menu"
pnpm run build
```

یا می‌توانید فایل `build.bat` را دابل‌کلیک کنید.

### روش ۲: استفاده از Docker

#### مرحله ۱: نصب Docker
1. Docker Desktop را از https://docker.com دانلود کنید
2. نصب کنید و اجرا کنید

#### مرحله ۲: بیلد با Docker
```
cd "c:\Users\Webmastersalam\Desktop\yolo menu"
docker-compose up builder
```

### روش ۳: استفاده از Node.js Portable (بدون نصب)

این روش نیاز به دانلود دستی دارد:

1. Node.js portable را از این لینک دانلود کنید:
   https://nodejs.org/dist/v20.18.0/node-v20.18.0-win-x64.zip

2. فایل zip را در پوشه پروژه extract کنید

3. PowerShell را باز کنید و دستورات زیر را اجرا کنید:
```powershell
cd "c:\Users\Webmastersalam\Desktop\yolo menu"
$env:PATH = "$PWD\node-v20.18.0-win-x64;$env:PATH"
.\node-v20.18.0-win-x64\npm install -g pnpm
pnpm install
$env:PORT = "25125"
$env:BASE_PATH = "/"
pnpm run build
```

## خروجی Build

بعد از build موفق، فایل‌های خروجی در این مسیر قرار می‌گیرند:
```
artifacts\yolo-menu\dist\public\
```

## پیش‌نمایش پروژه

### روش ۱: باز کردن مستقیم
فایل `artifacts\yolo-menu\dist\public\index.html` را در مرورگر باز کنید.

### روش ۲: استفاده از سرور محلی
```
cd artifacts\yolo-menu\dist\public
npx serve
```

سپس به آدرس http://localhost:3000 بروید.

## عیب‌یابی

### خطا: Node.js پیدا نشد
- مطمئن شوید Node.js نصب شده است
- ترمینال را ری‌استارت کنید
- کامپیوتر را ری‌استارت کنید

### خطا: pnpm پیدا نشد
```
npm install -g pnpm
```

### خطا: PORT environment variable is required
قبل از build دستورات زیر را اجرا کنید:
```
set PORT=25125
set BASE_PATH=/
```

یا در PowerShell:
```powershell
$env:PORT = "25125"
$env:BASE_PATH = "/"
```

## اطلاعات تکنیکی پروژه

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Node Version**: 20.x یا بالاتر

## پشتیبانی

اگر مشکلی داشتید:
1. مطمئن شوید Node.js نسخه 20 یا بالاتر نصب است
2. مطمئن شوید pnpm نصب است
3. تمام ترمینال‌ها را ببندید و دوباره باز کنید
4. در صورت نیاز کامپیوتر را ری‌استارت کنید
