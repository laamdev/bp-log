"use client"

import { Loader2Icon } from "lucide-react"
import useSWR, { preload } from "swr"

import {
  addMeasure,
  addMeasureOptions,
  userMeasuresEndpoint as cacheKey,
  getAllUserMeasures,
} from "@/lib/api"
import { type Measure } from "@/lib/db/schema"
import { useToast } from "@/components/ui/use-toast"
import { LatestMeasure } from "@/components/dashboard/overview/latest-measure"
import { RecentMeasures } from "@/components/dashboard/overview/recent-measures"

// // preload(cacheKey, getAllUserMeasures)

export const OverviewPage = () => {
  const {
    isLoading,
    data: allUserMeasures,
    error,
    mutate,
  } = useSWR(cacheKey, getAllUserMeasures, {
    onSuccess: (data) => data.sort((a, b) => a.measureTime - b.measureTime),
  })

  const { toast } = useToast()

  // // if (isLoading) return <OverviewPageSkeleton />
  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader2Icon className="bg-primary text-primary-foreground h-8 w-8 animate-spin rounded-full p-1" />
      </div>
    )
  if (error) return <div>{error.message}</div>

  const addMeasureMutation = async (newMeasure: Measure) => {
    try {
      await mutate(
        addMeasure(newMeasure, allUserMeasures),
        addMeasureOptions(newMeasure, allUserMeasures)
      )

      toast({
        title: "Success!",
        description: "Your measure has been added.",
      })
    } catch (err) {
      toast({
        title: "Error!",
        description: "There was a problem. Please, try again.",
      })
    }
  }

  return (
    <div className="grid gap-4">
      <LatestMeasure
        allUserMeasures={allUserMeasures}
        addMeasureMutation={addMeasureMutation}
      />
      <RecentMeasures allUserMeasures={allUserMeasures} />
      {/* <DataViz recentMeasures={allUserMeasures.slice(-10)} /> */}
    </div>
  )
}

// // // import { Suspense } from "react"
// // // import { useQuery } from "@tanstack/react-query"

// // // import { getBaseURL } from "@/lib/utils"

// // // const baseURL = getBaseURL()

// // // const useWaitQuery = (props: { wait: number }) => {
// // //   const query = useQuery({
// // //     queryKey: ["wait", props.wait],
// // //     queryFn: async () => {
// // //       // make a mock delayed request to our API
// // //       const path = `/api/wait?wait=${props.wait}`
// // //       const url = baseURL + path

// // //       const res: string = await (await fetch(url, { cache: "no-store" })).json()
// // //       return res
// // //     },
// // //     suspense: true,
// // //   })

// // //   return [query.data as string, query] as const
// // // }

// // // function MyComponent(props: { wait: number }) {
// // //   const [data] = useWaitQuery(props)
// // //   return <div>result: {data}</div>
// // // }

// // // export const OverviewPage = () => {
// // //   return (
// // //     <>
// // //       <Suspense fallback={<div>waiting 100...</div>}>
// // //         <MyComponent wait={100} />
// // //       </Suspense>
// // //       <Suspense fallback={<div>waiting 500...</div>}>
// // //         <MyComponent wait={500} />
// // //       </Suspense>
// // //       <Suspense fallback={<div>waiting 1000...</div>}>
// // //         <MyComponent wait={1000} />
// // //       </Suspense>
// // //     </>
// // //   )
// // // }
