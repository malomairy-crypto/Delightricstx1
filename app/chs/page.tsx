'use client'

import { useDashboard } from '@/components/DashboardProvider'
import { getKPISummaries } from '@/lib/data'
import CategoryPage from '@/components/CategoryPage'

export default function CHSPage() {
  const { tenantId, period } = useDashboard()
  const summary = getKPISummaries(tenantId, period).find((s) => s.category === 'CHS')!
  return <CategoryPage summary={summary} />
}
