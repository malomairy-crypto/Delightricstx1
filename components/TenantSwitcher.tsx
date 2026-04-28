'use client'

import { useState } from 'react'
import { mockTenants } from '@/lib/data'
import { useDashboard } from '@/components/DashboardProvider'

function ChevronIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function TenantSwitcher() {
  const { tenantId, setTenantId } = useDashboard()
  const [open, setOpen] = useState(false)
  const active = mockTenants.find((t) => t.id === tenantId) ?? mockTenants[0]

  return (
    <div className="relative px-3 pb-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors text-content-muted hover:bg-surface-border/60 hover:text-content border border-transparent hover:border-surface-border"
      >
        <div className="flex-1 text-left min-w-0">
          <p className="font-medium text-content truncate">{active.name}</p>
          <p className="font-mono text-[10px] text-content-faint mt-0.5">{active.industry}</p>
        </div>
        <ChevronIcon />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-3 right-3 bottom-full mb-1 rounded-lg border border-surface-border bg-surface-raised shadow-xl z-50 overflow-hidden">
            {mockTenants.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTenantId(t.id); setOpen(false) }}
                className={`w-full text-left px-3 py-2.5 text-xs transition-colors ${
                  t.id === tenantId
                    ? 'text-content bg-surface-border'
                    : 'text-content-muted hover:text-content hover:bg-surface-border/60'
                }`}
              >
                <p className="font-medium">{t.name}</p>
                <p className="font-mono text-[10px] opacity-60 mt-0.5">{t.industry}</p>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
