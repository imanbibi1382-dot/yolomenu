# Build Instructions for YOLO Menu Project

This project is a Replit-based React application built with Vite, TypeScript, and Tailwind CSS.

## Prerequisites

### Option 1: Using Node.js (Recommended)
1. Install Node.js 20 or later from [https://nodejs.org](https://nodejs.org)
2. Install pnpm globally: `npm install -g pnpm`
3. Run the build script:
   - **Windows (Batch):** Double-click `build.bat`
   - **Windows (PowerShell):** Right-click `build.ps1` → "Run with PowerShell"
   - **Manual:** Run these commands:
     ```bash
     cd "c:\Users\Webmastersalam\Desktop\yolo menu"
     pnpm install
     set PORT=25125
     set BASE_PATH=/
     pnpm run build
     ```

### Option 2: Using Docker
1. Install Docker Desktop from [https://docker.com](https://docker.com)
2. Run: `docker-compose up builder`
3. Built files will be in the `dist` folder

## Build Output

After successful build, the files will be located in:
`artifacts\yolo-menu\dist\public\`

## Project Structure

- `artifacts/yolo-menu/` - Main application
- `src/` - React source code
- `public/` - Static assets
- `vite.config.ts` - Build configuration

## Environment Variables Required for Build

- `PORT=25125` - Port for development server
- `BASE_PATH=/` - Base URL path

## Troubleshooting

1. **Node.js not found**: Install Node.js from official website
2. **pnpm not found**: Run `npm install -g pnpm`
3. **Build fails with environment errors**: Make sure PORT and BASE_PATH are set
4. **Permission errors**: Run PowerShell/CMD as Administrator

## Quick Start (After Build)

To preview the built application:
1. Open `artifacts\yolo-menu\dist\public\index.html` in a web browser
2. Or use a simple HTTP server:
   ```bash
   cd artifacts\yolo-menu\dist\public
   npx serve
   ```