@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ================================================
echo   YOLO Menu - Final Build Script
echo ================================================
echo.

REM Set Node.js path
set "NODE_PATH=C:\Program Files\nodejs"
set "PATH=%NODE_PATH%;%APPDATA%\npm;%PATH%"

echo [1/6] Checking Node.js...
where node >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found!
    pause
    exit /b 1
)
node --version
echo.

echo [2/6] Checking/Installing pnpm...
where pnpm >nul 2>&1
if errorlevel 1 (
    echo Installing pnpm...
    call npm install -g pnpm
    if errorlevel 1 (
        echo [ERROR] Failed to install pnpm
        pause
        exit /b 1
    )
)
pnpm --version
echo.

echo [3/6] Installing project dependencies...
echo This may take several minutes...
call pnpm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [4/6] Setting environment variables...
set PORT=25125
set BASE_PATH=/
echo PORT=%PORT%
echo BASE_PATH=%BASE_PATH%
echo.

echo [5/6] Building the project...
echo This may take a few minutes...
call pnpm run build
if errorlevel 1 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)
echo.

echo [6/6] Verifying build output...
if exist "artifacts\yolo-menu\dist\public\index.html" (
    echo [SUCCESS] Build completed successfully!
    echo.
    echo Output location: artifacts\yolo-menu\dist\public\
    echo.
    echo To preview:
    echo 1. Open artifacts\yolo-menu\dist\public\index.html in browser
    echo 2. Or run: cd artifacts\yolo-menu\dist\public ^&^& npx serve
) else (
    echo [WARNING] Build directory not found
)

echo.
echo ================================================
pause
