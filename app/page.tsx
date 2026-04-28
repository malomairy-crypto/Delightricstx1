import Link from 'next/link'
import { activeTenant } from '@/lib/data'
import type { KPISummary } from '@/types'

const CATEGORY_HREFS: Record<string, string> = {
  CHS: '/chs',
  CES: '/ces',
  NPS: '/nps',
  EHS: '/ehs',
  OX:  '/ox',
}

function KPISummaryCard({ summary }: { summary: KPISummary }) {
  const primary = summary.kpis[0]

  // For CES, lower is better — invert the "positive" direction
  const isPositive =
    summary.category === 'CES'
      ? primary.trend === 'down'
      : primary.trend === 'up'

  const trendColor =
    primary.trend === 'stable'
      ? 'var(--color-content-muted)'
      : isPositive
      ? 'var(--color-success)'
      : 'var(--color-danger)'

  const trendLabel =
    primary.trend === 'stable'
      ? '→ stable'
      : primary.trendValue > 0
      ? `↑ +${primary.trendValue}%`
      : `↓ ${primary.trendValue}%`

  // Progress toward target (capped at 100%)
  const progress =
    summary.category === 'CES'
      ? Math.min((primary.target / primary.value) * 100, 100)
      : Math.min((primary.value / primary.target) * 100, 100)

  return (
    <Link
      href={CATEGORY_HREFS[summary.category]}
      className="group flex flex-col gap-4 p-5 rounded-xl border border-surface-border bg-surface-raised hover:border-content-faint transition-colors"
    >
      {/* Category badge + chevron */}
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded"
          style={{ color: summary.color, backgroundColor: `${summary.color}1a` }}
        >
          {summary.category}
        </span>
        <svg
          className="w-3.5 h-3.5 text-content-faint group-hover:text-content-muted transition-colors"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path d="M5 11l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Title + primary value */}
      <div>
        <p className="text-xs text-content-muted mb-1.5 leading-tight">{summary.title}</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-semibold text-content font-mono tabular-nums leading-none">
            {primary.value}
          </span>
          {primary.unit && (
            <span className="text-sm text-content-muted">{primary.unit}</span>
          )}
        </div>
      </div>

      {/* Trend + target */}
      <div className="flex items-center justify-between text-xs">
        <span style={{ color: trendColor }}>{trendLabel}</span>
        <span className="font-mono text-content-faint">
          {primary.target}{primary.unit}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 rounded-full bg-surface-border overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${progress}%`, backgroundColor: summary.color }}
        />
      </div>
    </Link>
  )
}

export default function DashboardPage() {
  const { kpiSummaries } = activeTenant

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      <div>
        <h1 className="text-lg font-semibold text-content">Overview</h1>
        <p className="text-sm text-content-muted mt-0.5">Q1 2026 · All KPI categories</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {kpiSummaries.map((summary) => (
          <KPISummaryCard key={summary.category} summary={summary} />
        ))}
      </div>
    </div>
  )
}
