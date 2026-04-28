import { activeTenant } from '@/lib/data'
import CategoryPage from '@/components/CategoryPage'

export default function CHSPage() {
  const summary = activeTenant.kpiSummaries.find((s) => s.category === 'CHS')!
  return <CategoryPage summary={summary} />
}
