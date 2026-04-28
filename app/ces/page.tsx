'use client'

import { useDashboard } from '@/components/DashboardProvider'
import { getKPISummaries } from '@/lib/data'
import CategoryPage from '@/components/CategoryPage'

export default function CESPage() {
  const { tenantId, period } = useDashboard()
  const summary = getKPISummaries(tenantId, period).find((s) => s.category === 'CES')!
  return <CategoryPage summary={summary} isInverted />
}
