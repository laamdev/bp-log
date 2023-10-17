"use client"

import { Loader2Icon } from "lucide-react"
import useSWR, { preload } from "swr"

import { userMeasuresEndpoint as cacheKey, getAllUserMeasures } from "@/lib/api"
import { columns } from "@/components/dashboard/history/measures/columns"
import { DataTable } from "@/components/dashboard/history/measures/data-table"

preload(cacheKey, getAllUserMeasures)

export const HistoryPage = () => {
  const {
    isLoading,
    data: allUserMeasures,
    error,
  } = useSWR(cacheKey, getAllUserMeasures, {
    onSuccess: (data) =>
      data.sort(
        (a: any, b: any) =>
          new Date(b.measureTime).getTime() - new Date(a.measureTime).getTime()
      ),
  })

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader2Icon className="bg-primary text-primary-foreground h-8 w-8 animate-spin rounded-full p-1" />
      </div>
    )
  if (error) return <div>{error.message}</div>

  return (
    <div className="bg-card rounded-xl py-4">
      <DataTable columns={columns} data={allUserMeasures} />
    </div>
  )
}
