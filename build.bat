@echo off
echo Building YOLO Menu Project...
echo.

echo Checking for Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org
    echo Then run this script again.
    pause
    exit /b 1
)

echo Checking for pnpm...
where pnpm >nul 2>nul
if %errorlevel% neq 0 (
    echo Installing pnpm globally...
    npm install -g pnpm
)

echo Installing dependencies...
cd /d "%~dp0"
pnpm install

echo Building project...
set PORT=25125
set BASE_PATH=/
pnpm run build

if %errorlevel% equ 0 (
    echo Build completed successfully!
    echo Built files are in: artifacts\yolo-menu\dist\public\
) else (
    echo Build failed.
)

pause