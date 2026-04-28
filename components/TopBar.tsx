import { activeTenant } from '@/lib/data'

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <rect x="1" y="2.5" width="11" height="9.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1 6h11" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4.5 1v3M8.5 1v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export default function TopBar() {
  return (
    <header className="flex items-center justify-between px-6 h-14 shrink-0 border-b border-surface-border bg-surface-raised">
      <div className="flex items-center gap-3">
        <span className="font-semibold text-sm text-content">{activeTenant.name}</span>
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-border text-content-muted uppercase tracking-wider">
          {activeTenant.industry}
        </span>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-surface-border bg-surface text-sm font-mono text-content-muted cursor-default select-none">
        <CalendarIcon />
        <span>Q1 2026</span>
      </div>
    </header>
  )
}
