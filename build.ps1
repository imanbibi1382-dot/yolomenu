Write-Host "Building YOLO Menu Project..." -ForegroundColor Cyan
Write-Host ""

# Check for Node.js
try {
    $nodeVersion = node --version
    Write-Host "Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js is not installed or not in PATH." -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org" -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check for pnpm
try {
    $pnpmVersion = pnpm --version
    Write-Host "pnpm found: $pnpmVersion" -ForegroundColor Green
} catch {
    Write-Host "Installing pnpm globally..." -ForegroundColor Yellow
    npm install -g pnpm
}

Write-Host "Installing dependencies..." -ForegroundColor Cyan
Set-Location $PSScriptRoot
pnpm install

Write-Host "Building project..." -ForegroundColor Cyan
$env:PORT = "25125"
$env:BASE_PATH = "/"
pnpm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build completed successfully!" -ForegroundColor Green
    Write-Host "Built files are in: artifacts\yolo-menu\dist\public\" -ForegroundColor Green
} else {
    Write-Host "Build failed." -ForegroundColor Red
}

Read-Host "Press Enter to exit"