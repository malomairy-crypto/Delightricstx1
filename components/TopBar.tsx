'use client'

import { usePathname } from 'next/navigation'
import { activeTenant } from '@/lib/data'
import { useSidebar } from '@/components/SidebarProvider'

const BREADCRUMBS: Record<string, { label: string; color: string }> = {
  '/':    { label: 'Dashboard',                  color: '' },
  '/chs': { label: 'Customer Happiness Score',   color: '#22d3ee' },
  '/ces': { label: 'Customer Effort Score',      color: '#a78bfa' },
  '/nps': { label: 'Net Promoter Score',         color: '#34d399' },
  '/ehs': { label: 'Employee Happiness Score',   color: '#fb923c' },
  '/ox':  { label: 'Operational Excellence',     color: '#f472b6' },
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <rect x="1" y="2.5" width="11" height="9.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1 6h11" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4.5 1v3M8.5 1v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function TopBar() {
  const pathname = usePathname()
  const { toggle } = useSidebar()
  const crumb = BREADCRUMBS[pathname] ?? BREADCRUMBS['/']

  return (
    <header className="flex items-center justify-between px-4 md:px-6 h-14 shrink-0 border-b border-surface-border bg-surface-raised">
      {/* Left: mobile menu + breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={toggle}
          className="md:hidden p-1.5 rounded-md text-content-muted hover:text-content hover:bg-surface-border transition-colors"
          aria-label="Toggle navigation"
        >
          <MenuIcon />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs text-content-muted hidden sm:block">Dashboard</span>
          {pathname !== '/' && (
            <>
              <span className="text-content-faint hidden sm:block">/</span>
              {crumb.color && (
                <span
                  className="font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded hidden sm:block"
                  style={{ color: crumb.color, backgroundColor: `${crumb.color}1a` }}
                >
                  {pathname.slice(1).toUpperCase()}
                </span>
              )}
              <span className="text-sm font-medium text-content truncate">{crumb.label}</span>
            </>
          )}
          {pathname === '/' && (
            <span className="text-sm font-medium text-content sm:hidden">Dashboard</span>
          )}
        </div>
      </div>

      {/* Right: tenant + period */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-border text-content-muted uppercase tracking-wider hidden md:block">
          {activeTenant.industry}
        </span>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-surface-border bg-surface text-sm font-mono text-content-muted cursor-default select-none">
          <CalendarIcon />
          <span>Q1 2026</span>
        </div>
      </div>
    </header>
  )
}
