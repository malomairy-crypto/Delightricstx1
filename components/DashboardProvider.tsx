'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { PERIODS, mockTenants } from '@/lib/data'
import type { Period } from '@/lib/data'

const STORAGE_TENANT = 'delightrics-tenant'
const STORAGE_PERIOD = 'delightrics-period'

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
  const [tenantId, setTenantIdState] = useState('tenant-001')
  const [period, setPeriodState] = useState<Period>(PERIODS[0])

  useEffect(() => {
    const storedTenant = localStorage.getItem(STORAGE_TENANT)
    const storedPeriod = localStorage.getItem(STORAGE_PERIOD)
    if (storedTenant && mockTenants.some((t) => t.id === storedTenant)) {
      setTenantIdState(storedTenant)
    }
    if (storedPeriod && (PERIODS as readonly string[]).includes(storedPeriod)) {
      setPeriodState(storedPeriod as Period)
    }
  }, [])

  const setTenantId = (id: string) => {
    setTenantIdState(id)
    localStorage.setItem(STORAGE_TENANT, id)
  }

  const setPeriod = (p: Period) => {
    setPeriodState(p)
    localStorage.setItem(STORAGE_PERIOD, p)
  }

  return (
    <DashboardContext.Provider value={{ tenantId, period, setTenantId, setPeriod }}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  return useContext(DashboardContext)
}
