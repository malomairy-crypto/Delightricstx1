# Delightrics — Project State

## Progress

| Step | Title | Status |
|------|-------|--------|
| 1 | Base Structure & Design System | Complete |
| 2 | Shell Layout | Complete |
| 3 | KPI Category Pages | Complete |
| 4 | Polish & Enhancements | Complete |
| 5 | Interactivity & Data | Complete |
| 6 | localStorage Persistence | Complete |
| 7 | Supabase Integration | Upcoming |
| 8 | Authentication | Upcoming |

---

## Completed Work

### Step 1: Base Structure & Design System
- Scaffolded Next.js 16 app (App Router, TypeScript, Tailwind CSS v4)
- Configured `DM Sans` + `DM Mono` as the project font pair
- Established design token system in `app/globals.css` (dark surface palette, 5 KPI accent colors, grid texture, custom scrollbar)
- `types/index.ts` — shared TypeScript types: `KPI`, `KPICategory`, `KPISummary`, `Tenant`, `TrendDirection`
- `lib/data.ts` — centralized mock data with 2 demo tenants and 5 KPI categories (CHS, CES, NPS, EHS, OX), each with 3 typed KPIs

### Step 2: Shell Layout
- `components/Sidebar.tsx` — Client Component; `usePathname` active links, brand mark, KPI category nav with accent colors
- `components/TopBar.tsx` — tenant name, industry badge, period pill
- `app/layout.tsx` — root shell: `<Sidebar>` + `<TopBar>` + `<main>`
- `app/page.tsx` — dashboard overview: 5 KPI summary cards in responsive grid

### Step 3: KPI Category Pages
- `components/KPICard.tsx` — reusable detail card: label + trend chip, description, large value + unit, progress bar (% of target), period footer
- `components/CategoryPage.tsx` — shared page shell: category badge, title, period, metric count, "X/3 at target" status, `grid-cols-1 md:2 lg:3` card grid
- `app/chs/page.tsx` — `/chs` → CHS (cyan)
- `app/ces/page.tsx` — `/ces` → CES (violet, `isInverted` — lower is better)
- `app/nps/page.tsx` — `/nps` → NPS (emerald)
- `app/ehs/page.tsx` — `/ehs` → EHS (orange)
- `app/ox/page.tsx`  — `/ox`  → OX (pink)

### Step 4: Polish & Enhancements
- `components/Sparkline.tsx` — SVG polyline charts from 8-point history arrays; color follows trend direction
- `components/SidebarProvider.tsx` — React Context managing sidebar open/close state
- `components/MobileBackdrop.tsx` — tap-to-close overlay on mobile
- `components/TopBar.tsx` — updated to Client Component; `usePathname` breadcrumb, hamburger button on mobile
- `components/Sidebar.tsx` — updated; fixed overlay + slide-in animation on mobile, close button
- `components/KPICard.tsx` — updated; Sparkline added alongside primary value
- `app/layout.tsx` — wrapped in `SidebarProvider`, added `MobileBackdrop`
- `types/index.ts` — added `history: number[]` to `KPI` interface
- `lib/data.ts` — added 8-point history array to all 15 KPIs; `shiftKPI()` algorithm generates historical period data
- `app/loading.tsx` + `app/_loading-category.tsx` + 5 route `loading.tsx` files — pulse-animated skeletons

### Step 5: Interactivity & Data
- `components/DashboardProvider.tsx` — React Context managing `tenantId` + `period` with setters; default Q1 2026 / tenant-001
- `components/PeriodSelector.tsx` — dropdown listing 4 periods; reads/sets via `useDashboard()`; click-outside-to-close backdrop
- `components/TenantSwitcher.tsx` — dropdown listing mock tenants; reads/sets via `useDashboard()`; shows name + industry
- `components/KPIModal.tsx` — full-screen drill-down modal; ESC key to close; responsive sparkline, 3-stat grid, progress bar
- `components/KPICard.tsx` — updated to `'use client'`; wraps as `<button>` opening `KPIModal` on click
- `app/layout.tsx` — wrapped with `DashboardProvider` (outermost)
- `app/page.tsx` — updated to `'use client'`; reads `tenantId + period` from context; On Track / At Risk / Off Track status badges
- `app/chs|ces|nps|ehs|ox/page.tsx` — all updated to `'use client'`; read tenant + period from context

### Step 6: localStorage Persistence
- `components/DashboardProvider.tsx` — updated; reads `delightrics-tenant` + `delightrics-period` from localStorage on mount; validates stored values against known tenants/periods before applying; writes to localStorage immediately on each setter call
- Selections survive hard refresh; invalid or stale keys fall back to defaults silently

---

## Remaining Steps

### Step 7: Supabase Integration
Replace mock data with a real Postgres database.
- Create Supabase project + schema (`tenants`, `kpi_categories`, `kpis`, `kpi_history` tables)
- Install `@supabase/supabase-js`; add environment variables
- Replace `lib/data.ts` mock functions with Supabase client queries
- Enable Row Level Security (RLS) for per-tenant data isolation
- Real data visible across period selector and tenant switcher

### Step 8: Authentication
Login page and protected routes using Next.js middleware.
- Supabase Auth (email/password or magic link)
- `middleware.ts` — redirect unauthenticated users to `/login`
- `app/login/page.tsx` — login form
- Session-aware tenant access: user is scoped to their own tenant's data
- Logout button in Sidebar footer

---

## Folder Structure

```
mho1-274/
├── app/
│   ├── _loading-category.tsx       # Shared category skeleton
│   ├── chs/page.tsx + loading.tsx
│   ├── ces/page.tsx + loading.tsx
│   ├── nps/page.tsx + loading.tsx
│   ├── ehs/page.tsx + loading.tsx
│   ├── ox/page.tsx  + loading.tsx
│   ├── globals.css
│   ├── layout.tsx                  # Root shell — DashboardProvider + SidebarProvider
│   ├── loading.tsx                 # Dashboard skeleton
│   └── page.tsx                    # Dashboard overview
├── components/
│   ├── CategoryPage.tsx
│   ├── DashboardProvider.tsx       # tenantId + period context + localStorage
│   ├── KPICard.tsx
│   ├── KPIModal.tsx
│   ├── MobileBackdrop.tsx
│   ├── PeriodSelector.tsx
│   ├── Sidebar.tsx
│   ├── SidebarProvider.tsx
│   ├── Sparkline.tsx
│   ├── TenantSwitcher.tsx
│   └── TopBar.tsx
├── lib/data.ts                     # Mock data + shiftKPI() — replaced in Step 7
├── types/index.ts
├── PROJECT_STATE.md
└── ...config files
```

---

## Run Instructions

```bash
npm run dev -- -p 3001   # http://localhost:3001
npx tsc --noEmit         # type-check
npm run build            # production build
```

> **Note:** Port 3000 is occupied on this machine. Always use port 3001.
