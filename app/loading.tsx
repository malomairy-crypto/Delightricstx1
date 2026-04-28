function SkeletonCard() {
  return (
    <div className="flex flex-col gap-4 p-5 rounded-xl border border-surface-border bg-surface-raised animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 w-8 rounded bg-surface-border" />
        <div className="h-3 w-16 rounded bg-surface-border" />
      </div>
      <div className="h-3 w-3/4 rounded bg-surface-border" />
      <div className="h-8 w-20 rounded bg-surface-border" />
      <div className="h-0.5 rounded-full bg-surface-border" />
    </div>
  )
}

export default function Loading() {
  return (
    <div className="p-6 space-y-6 max-w-7xl">
      <div className="space-y-2">
        <div className="h-6 w-24 rounded bg-surface-border animate-pulse" />
        <div className="h-4 w-48 rounded bg-surface-border animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  )
}
