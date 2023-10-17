import { Grid } from "@tremor/react"
import { ClockIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { SectionHeading } from "@/components/shared/section-heading"

export const OverviewPageSkeleton = () => {
  return (
    <div>x</div>
    // <>
    //   <section>
    //     <div className="flex flex-col justify-between gap-y-4 md:flex-row md:gap-y-0">
    //       <div>
    //         <SectionHeading>Latest Measure</SectionHeading>
    //         <div className="mt-1.5 flex items-center gap-x-2">
    //           <ClockIcon className="h-4 w-4" />
    //           <Skeleton className="h-[20px] w-[100px] rounded-lg" />
    //         </div>
    //       </div>
    //       <Button variant="outline" disabled>
    //         <PlusIcon className="mr-2 h-4 w-4" />
    //         {`New Measure`}
    //       </Button>
    //     </div>

    //     <Grid numItemsSm={2} numItemsLg={3} className="mt-6 gap-6">
    //       <Skeleton className="h-28 w-full" />
    //       <Skeleton className="h-28 w-full" />
    //       <Skeleton className="h-28 w-full" />
    //       <Skeleton className="h-28 w-full" />
    //       <Skeleton className="h-28 w-full" />
    //       <Skeleton className="h-28 w-full" />
    //     </Grid>
    //   </section>

    //   <section className="mt-12">
    //     <div>
    //       <h2 className="text-3xl font-bold tracking-tight">
    //         Measures Evolution
    //       </h2>
    //       <Skeleton className="mt-1.5 h-[20px] w-[100px] rounded-lg" />
    //     </div>
    //     <Grid numItemsSm={2} numItemsLg={4} className="mt-6 gap-6">
    //       <Skeleton className="h-48 w-full" />
    //       <Skeleton className="h-48 w-full" />
    //       <Skeleton className="h-48 w-full" />
    //       <Skeleton className="h-48 w-full" />
    //     </Grid>
    //   </section>
    // </>
  )
}
