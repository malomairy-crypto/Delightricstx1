import { activeTenant } from '@/lib/data'
import CategoryPage from '@/components/CategoryPage'

export default function EHSPage() {
  const summary = activeTenant.kpiSummaries.find((s) => s.category === 'EHS')!
  return <CategoryPage summary={summary} />
}
