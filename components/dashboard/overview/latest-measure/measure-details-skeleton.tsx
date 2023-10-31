import { Skeleton } from "@/components/ui/skeleton"

export const MeasureDetailsSkeleton = () => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-2 md:grid-cols-2 2xl:grid-cols-3">
      <Skeleton className="h-24" />
      <Skeleton className="h-24" />
      <Skeleton className="h-24" />
      <Skeleton className="h-24" />
      <Skeleton className="h-24" />
      <Skeleton className="h-24" />
    </div>
  )
}
