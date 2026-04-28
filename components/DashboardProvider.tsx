'use client'

import { createContext, useContext, useState } from 'react'
import { PERIODS } from '@/lib/data'
import type { Period } from '@/lib/data'

interface DashboardContextValue {
  tenantId: string
  period: Period
  setTenantId: (id: string) => void
  setPeriod: (p: Period) => void
}

const DashboardContext = createContext<DashboardContextValue>({
  tenantId: 'tenant-001',
  period: 'Q1 2026',
  setTenantId: () => {},
  setPeriod: () => {},
})

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [tenantId, setTenantId] = useState('tenant-001')
  const [period, setPeriod] = useState<Period>(PERIODS[0])

  return (
    <DashboardContext.Provider value={{ tenantId, period, setTenantId, setPeriod }}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  return useContext(DashboardContext)
}
