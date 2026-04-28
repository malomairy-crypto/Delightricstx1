import KPICard from '@/components/KPICard'
import type { KPISummary } from '@/types'

interface CategoryPageProps {
  summary: KPISummary
  isInverted?: boolean
}

export default function CategoryPage({ summary, isInverted = false }: CategoryPageProps) {
  const { kpis } = summary

  const atTarget = kpis.filter((k) => {
    return isInverted ? k.value <= k.target : k.value >= k.target
  }).length

  return (
    <div className="p-6 space-y-8 max-w-6xl">
      {/* Page header */}
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center font-mono text-sm font-bold shrink-0"
          style={{ backgroundColor: `${summary.color}18`, color: summary.color }}
        >
          {summary.category}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold text-content leading-tight">{summary.title}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-sm text-content-muted">{kpis[0].period}</span>
            <span className="text-content-faint">·</span>
            <span className="text-sm text-content-muted">{kpis.length} metrics</span>
            <span className="text-content-faint">·</span>
            <span className="text-sm" style={{ color: atTarget === kpis.length ? 'var(--color-success)' : 'var(--color-content-muted)' }}>
              {atTarget}/{kpis.length} at target
            </span>
          </div>
        </div>

        {/* Category accent rule */}
        <div
          className="hidden sm:block h-8 w-0.5 rounded-full shrink-0"
          style={{ backgroundColor: summary.color, opacity: 0.4 }}
        />
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {kpis.map((kpi) => (
          <KPICard
            key={kpi.id}
            kpi={kpi}
            color={summary.color}
            isInverted={isInverted}
          />
        ))}
      </div>
    </div>
  )
}
