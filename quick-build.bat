@echo off
chcp 65001 >nul
cls
echo ================================================
echo       YOLO Menu - Quick Build Script
echo ================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js پیدا نشد!
    echo.
    echo لطفاً Node.js را از این لینک دانلود و نصب کنید:
    echo https://nodejs.org
    echo.
    echo بعد از نصب، این فایل را دوباره اجرا کنید.
    echo.
    pause
    exit /b 1
)

echo [✓] Node.js پیدا شد
node --version

REM Check if pnpm is installed
where pnpm >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] pnpm پیدا نشد. در حال نصب...
    call npm install -g pnpm
    if %errorlevel% neq 0 (
        echo [ERROR] نصب pnpm با خطا مواجه شد
        pause
        exit /b 1
    )
)

echo [✓] pnpm پیدا شد
pnpm --version

echo.
echo [1/3] در حال نصب وابستگی‌ها...
call pnpm install
if %errorlevel% neq 0 (
    echo [ERROR] نصب وابستگی‌ها با خطا مواجه شد
    pause
    exit /b 1
)

echo.
echo [2/3] تنظیم متغیرهای محیطی...
set PORT=25125
set BASE_PATH=/

echo.
echo [3/3] در حال build کردن پروژه...
call pnpm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build با خطا مواجه شد
    pause
    exit /b 1
)

echo.
echo ================================================
echo [✓] Build با موفقیت تکمیل شد!
echo ================================================
echo.
echo فایل‌های خروجی در این مسیر قرار دارند:
echo artifacts\yolo-menu\dist\public\
echo.
echo برای پیش‌نمایش می‌توانید:
echo 1. فایل index.html را در مرورگر باز کنید
echo 2. یا دستور زیر را اجرا کنید:
echo    cd artifacts\yolo-menu\dist\public
echo    npx serve
echo.
pause
