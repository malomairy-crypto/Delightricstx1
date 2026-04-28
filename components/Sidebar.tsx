'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { KPICategory } from '@/types'

const NAV_ITEMS: { category: KPICategory; label: string; href: string; color: string }[] = [
  { category: 'CHS', label: 'Customer Happiness',     href: '/chs', color: '#22d3ee' },
  { category: 'CES', label: 'Customer Effort',        href: '/ces', color: '#a78bfa' },
  { category: 'NPS', label: 'Net Promoter',            href: '/nps', color: '#34d399' },
  { category: 'EHS', label: 'Employee Happiness',     href: '/ehs', color: '#fb923c' },
  { category: 'OX',  label: 'Operational Excellence', href: '/ox',  color: '#f472b6' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col w-60 shrink-0 h-full overflow-y-auto bg-surface-raised border-r border-surface-border">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 h-14 shrink-0 border-b border-surface-border">
        <div
          className="w-6 h-6 rounded flex items-center justify-center font-mono text-[10px] font-bold shrink-0"
          style={{ backgroundColor: '#22d3ee', color: '#0d1117' }}
        >
          Dx
        </div>
        <span className="font-semibold text-sm text-content">Delightrics</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 p-3 flex-1">
        <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-content-faint">
          Overview
        </span>

        <Link
          href="/"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            pathname === '/'
              ? 'bg-surface-border text-content'
              : 'text-content-muted hover:bg-surface-border/60 hover:text-content'
          }`}
        >
          <span className="font-mono text-[10px] w-7 text-center opacity-60">ALL</span>
          <span>Dashboard</span>
        </Link>

        <span className="px-3 py-1 mt-4 text-[10px] font-mono uppercase tracking-widest text-content-faint">
          KPI Categories
        </span>

        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.category}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-surface-border text-content'
                  : 'text-content-muted hover:bg-surface-border/60 hover:text-content'
              }`}
            >
              <span
                className="font-mono text-[10px] font-semibold w-7 text-center rounded py-0.5 shrink-0 transition-colors"
                style={{
                  color: item.color,
                  backgroundColor: isActive ? `${item.color}1a` : 'transparent',
                }}
              >
                {item.category}
              </span>
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Version footer */}
      <div className="px-5 py-3 border-t border-surface-border shrink-0">
        <span className="font-mono text-[10px] text-content-faint">v0.2.0-alpha</span>
      </div>
    </aside>
  )
}
