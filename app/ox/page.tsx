import { activeTenant } from '@/lib/data'
import CategoryPage from '@/components/CategoryPage'

export default function OXPage() {
  const summary = activeTenant.kpiSummaries.find((s) => s.category === 'OX')!
  return <CategoryPage summary={summary} />
}
