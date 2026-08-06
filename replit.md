# YOLO Coffee — Digital QR Menu

A premium Persian-first RTL digital QR menu for YOLO specialty coffee shop. Customers scan a QR code at their table and get a beautiful, mobile-first menu experience in Persian.

## Run & Operate

- `pnpm --filter @workspace/yolo-menu run dev` — run the menu app (port assigned by workflow)
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- React + Vite + Tailwind CSS v4
- Framer Motion (animations)
- Wouter (routing)
- next-themes (dark mode)

## Where things live

- `artifacts/yolo-menu/src/data/menuData.ts` — all menu items (Persian content, prices in Toman)
- `artifacts/yolo-menu/src/features/menu/` — category filtering and search logic
- `artifacts/yolo-menu/src/features/home/` — home page components
- `artifacts/yolo-menu/src/components/layout/` — Header, BottomNav, PageWrapper
- `artifacts/yolo-menu/src/pages/` — HomePage, MenuPage, NotFoundPage
- `artifacts/yolo-menu/src/index.css` — design tokens (YOLO color palette, Vazirmatn font)

## Product

A mobile QR menu (max-width 430px) with:
- **Home page:** YOLO branding, hero, today's recommendation, category grid, brand story
- **Menu page:** 9 categories, live search, sticky category tabs, product cards with Persian names/prices/badges
- Dark mode (localStorage persisted, respects system preference)
- Full RTL layout with Vazirmatn Persian typography
- Framer Motion stagger animations on cards and page transitions

## Architecture decisions

- No backend — all menu data is static in `menuData.ts` for fast QR scan loads
- RTL applied at `<html dir="rtl">` level; all Tailwind utilities respect RTL logical properties
- ThemeProvider wraps the app and toggles `dark` class on `<html>`
- Feature-based folder structure separates menu, home, and shared UI concerns
- Prices displayed in Toman (تومان), formatted with Persian-style thousands separator

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- This is a frontend-only app — no API routes are needed for the menu
- When adding new menu items, update `src/data/menuData.ts` only
- RTL: use `start`/`end` logical Tailwind classes (e.g. `ms-2`, `pe-4`) rather than `left`/`right` where possible
