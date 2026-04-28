import { activeTenant } from '@/lib/data'
import CategoryPage from '@/components/CategoryPage'

export default function NPSPage() {
  const summary = activeTenant.kpiSummaries.find((s) => s.category === 'NPS')!
  return <CategoryPage summary={summary} />
}
