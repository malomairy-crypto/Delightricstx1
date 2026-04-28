import { activeTenant } from '@/lib/data'
import CategoryPage from '@/components/CategoryPage'

export default function CESPage() {
  const summary = activeTenant.kpiSummaries.find((s) => s.category === 'CES')!
  return <CategoryPage summary={summary} isInverted />
}
