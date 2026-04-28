'use client'

import { useDashboard } from '@/components/DashboardProvider'
import { getKPISummaries } from '@/lib/data'
import CategoryPage from '@/components/CategoryPage'

export default function EHSPage() {
  const { tenantId, period } = useDashboard()
  const summary = getKPISummaries(tenantId, period).find((s) => s.category === 'EHS')!
  return <CategoryPage summary={summary} />
}
