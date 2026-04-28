'use client'

import { useSidebar } from '@/components/SidebarProvider'

export default function MobileBackdrop() {
  const { open, close } = useSidebar()
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-30 bg-surface/80 backdrop-blur-sm md:hidden"
      onClick={close}
      aria-hidden="true"
    />
  )
}
