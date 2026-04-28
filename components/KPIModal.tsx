'use client'

import { useEffect } from 'react'
import type { KPI } from '@/types'
import Sparkline from '@/components/Sparkline'

interface KPIModalProps {
  kpi: KPI
  color: string
  isInverted?: boolean
  onClose: () => void
}

export default function KPIModal({ kpi, color, isInverted = false, onClose }: KPIModalProps) {
  const isPositive =
    kpi.trend === 'stable' ? null : isInverted ? kpi.trend === 'down' : kpi.trend === 'up'

  const trendColor =
    isPositive === null ? 'var(--color-content-muted)' : isPositive ? 'var(--color-success)' : 'var(--color-danger)'

  const trendLabel =
    kpi.trend === 'stable' ? '→ stable' : kpi.trendValue > 0 ? `↑ +${kpi.trendValue}%` : `↓ ${kpi.trendValue}%`

  const progress = isInverted
    ? Math.min((kpi.target / kpi.value) * 100, 100)
    : Math.min((kpi.value / kpi.target) * 100, 100)

  const atTarget = isInverted ? kpi.value <= kpi.target : kpi.value >= kpi.target

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-lg rounded-2xl border border-surface-border bg-surface-raised shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-surface-border">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded"
                style={{ color, backgroundColor: `${color}1a` }}
              >
                {kpi.category}
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded" style={{ color: trendColor }}>
                {trendLabel}
              </span>
            </div>
            <h2 className="text-base font-semibold text-content leading-snug">{kpi.label}</h2>
            <p className="text-xs text-content-muted mt-1 leading-relaxed">{kpi.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-content-faint hover:text-content hover:bg-surface-border transition-colors shrink-0"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Primary value */}
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-semibold text-content font-mono tabular-nums leading-none">
              {kpi.value}
            </span>
            {kpi.unit && <span className="text-xl text-content-muted">{kpi.unit}</span>}
          </div>

          {/* Full-width sparkline */}
          <div className="w-full overflow-hidden rounded-lg bg-surface border border-surface-border p-3">
            <Sparkline data={kpi.history} color={color} width={432} height={72} responsive />
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Target', value: `${kpi.target}${kpi.unit}` },
              { label: 'Progress', value: `${progress.toFixed(0)}%` },
              { label: 'Period', value: kpi.period },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 rounded-lg bg-surface border border-surface-border">
                <p className="font-mono text-[10px] text-content-faint mb-1">{label}</p>
                <p className="font-mono text-sm font-semibold text-content">{value}</p>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="h-1.5 rounded-full bg-surface-border overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, backgroundColor: atTarget ? 'var(--color-success)' : color }}
              />
            </div>
            <p className="font-mono text-[10px] text-content-faint text-right">
              {progress.toFixed(0)}% of target
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
