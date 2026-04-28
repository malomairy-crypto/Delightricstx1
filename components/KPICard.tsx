import type { KPI } from '@/types'

interface KPICardProps {
  kpi: KPI
  color: string
  isInverted?: boolean  // true for CES: lower value = better outcome
}

export default function KPICard({ kpi, color, isInverted = false }: KPICardProps) {
  const isPositive =
    kpi.trend === 'stable'
      ? null
      : isInverted
      ? kpi.trend === 'down'
      : kpi.trend === 'up'

  const trendColor =
    isPositive === null
      ? 'var(--color-content-muted)'
      : isPositive
      ? 'var(--color-success)'
      : 'var(--color-danger)'

  const trendBg =
    isPositive === null
      ? 'var(--color-surface-border)'
      : isPositive
      ? '#34d39918'
      : '#f8717118'

  const trendLabel =
    kpi.trend === 'stable'
      ? '→ stable'
      : kpi.trendValue > 0
      ? `↑ +${kpi.trendValue}%`
      : `↓ ${kpi.trendValue}%`

  const progress = isInverted
    ? Math.min((kpi.target / kpi.value) * 100, 100)
    : Math.min((kpi.value / kpi.target) * 100, 100)

  const atOrBeyondTarget = isInverted
    ? kpi.value <= kpi.target
    : kpi.value >= kpi.target

  return (
    <div className="flex flex-col gap-5 p-6 rounded-xl border border-surface-border bg-surface-raised">
      {/* Label + trend chip */}
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-content leading-snug">{kpi.label}</p>
        <span
          className="font-mono text-[10px] px-2 py-1 rounded whitespace-nowrap shrink-0"
          style={{ color: trendColor, backgroundColor: trendBg }}
        >
          {trendLabel}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-content-muted leading-relaxed -mt-3">
        {kpi.description}
      </p>

      {/* Primary value */}
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-semibold text-content font-mono tabular-nums leading-none">
          {kpi.value}
        </span>
        {kpi.unit && (
          <span className="text-base text-content-muted">{kpi.unit}</span>
        )}
      </div>

      {/* Progress toward target */}
      <div className="space-y-2">
        <div className="h-1 rounded-full bg-surface-border overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: atOrBeyondTarget ? 'var(--color-success)' : color,
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-content-faint">
            {progress.toFixed(0)}% of target
          </span>
          <span className="font-mono text-[10px] text-content-faint">
            target&nbsp;{kpi.target}{kpi.unit}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-surface-border">
        <span className="font-mono text-[10px] text-content-faint">{kpi.period}</span>
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: atOrBeyondTarget ? 'var(--color-success)' : color }}
        />
      </div>
    </div>
  )
}
