import { Skeleton } from "@/components/ui/skeleton"

export const RecentMeasuresSectionSkeleton = () => {
  return (
    <div className="grid gap-2">
      <Skeleton className="h-24" />
      <Skeleton className="h-24" />
    </div>
  )
}
