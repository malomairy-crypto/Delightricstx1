function SkeletonKPICard() {
  return (
    <div className="flex flex-col gap-5 p-6 rounded-xl border border-surface-border bg-surface-raised animate-pulse">
      <div className="flex items-start justify-between gap-3">
        <div className="h-4 w-32 rounded bg-surface-border" />
        <div className="h-5 w-16 rounded bg-surface-border" />
      </div>
      <div className="h-3 w-full rounded bg-surface-border -mt-3" />
      <div className="flex items-end justify-between">
        <div className="h-10 w-24 rounded bg-surface-border" />
        <div className="h-7 w-20 rounded bg-surface-border opacity-40" />
      </div>
      <div className="space-y-2">
        <div className="h-1 rounded-full bg-surface-border" />
        <div className="flex justify-between">
          <div className="h-3 w-20 rounded bg-surface-border" />
          <div className="h-3 w-16 rounded bg-surface-border" />
        </div>
      </div>
      <div className="flex justify-between pt-3 border-t border-surface-border">
        <div className="h-3 w-14 rounded bg-surface-border" />
        <div className="w-1.5 h-1.5 rounded-full bg-surface-border" />
      </div>
    </div>
  )
}

export default function CategoryLoading() {
  return (
    <div className="p-6 space-y-8 max-w-6xl">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-surface-border animate-pulse" />
        <div className="space-y-2">
          <div className="h-6 w-48 rounded bg-surface-border animate-pulse" />
          <div className="h-4 w-36 rounded bg-surface-border animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, i) => <SkeletonKPICard key={i} />)}
      </div>
    </div>
  )
}
