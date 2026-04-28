'use client'

import { usePathname } from 'next/navigation'
import { useSidebar } from '@/components/SidebarProvider'
import { useDashboard } from '@/components/DashboardProvider'
import { mockTenants } from '@/lib/data'
import PeriodSelector from '@/components/PeriodSelector'

const BREADCRUMBS: Record<string, { label: string; color: string }> = {
  '/':    { label: 'Dashboard',                  color: '' },
  '/chs': { label: 'Customer Happiness Score',   color: '#22d3ee' },
  '/ces': { label: 'Customer Effort Score',      color: '#a78bfa' },
  '/nps': { label: 'Net Promoter Score',         color: '#34d399' },
  '/ehs': { label: 'Employee Happiness Score',   color: '#fb923c' },
  '/ox':  { label: 'Operational Excellence',     color: '#f472b6' },
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
  const { tenantId } = useDashboard()
  const crumb = BREADCRUMBS[pathname] ?? BREADCRUMBS['/']
  const tenant = mockTenants.find((t) => t.id === tenantId) ?? mockTenants[0]

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

      {/* Right: industry badge + period selector */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-border text-content-muted uppercase tracking-wider hidden md:block">
          {tenant.industry}
        </span>
        <PeriodSelector />
      </div>
    </header>
  )
}
