'use client'

import { useState } from 'react'
import { PERIODS } from '@/lib/data'
import { useDashboard } from '@/components/DashboardProvider'

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <rect x="1" y="2.5" width="11" height="9.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1 6h11" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4.5 1v3M8.5 1v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function PeriodSelector() {
  const { period, setPeriod } = useDashboard()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-surface-border bg-surface text-sm font-mono text-content-muted hover:text-content hover:border-content-faint transition-colors"
      >
        <CalendarIcon />
        <span>{period}</span>
        <ChevronIcon />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-28 rounded-lg border border-surface-border bg-surface-raised shadow-xl z-50 overflow-hidden">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => { setPeriod(p); setOpen(false) }}
                className={`w-full text-left px-3 py-2 text-xs font-mono transition-colors ${
                  p === period
                    ? 'text-content bg-surface-border'
                    : 'text-content-muted hover:text-content hover:bg-surface-border/60'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
