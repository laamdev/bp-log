"use client"

import { useRouter } from "next/navigation"
import { Loader2Icon } from "lucide-react"
import useSWR from "swr"

import {
  userMeasuresEndpoint as cacheKey,
  editMeasure,
  getMeasureById,
} from "@/lib/api"
import { Measure } from "@/lib/db/schema"
import { useToast } from "@/components/ui/use-toast"
import { UpdateMeasureForm } from "@/components/forms/update-measure-form"
import { SectionHeading } from "@/components/shared/section-heading"

export const MeasurePage = ({ measureId }: { measureId: string }) => {
  const fetcher = async () => await getMeasureById(measureId)
  const router = useRouter()

  const {
    isLoading,
    data: measure,
    error,
    mutate,
  } = useSWR(measureId ? `/api/measure/${measureId}` : null, fetcher)

  const { toast } = useToast()

  // // if (isLoading) return <OverviewPageSkeleton />
  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader2Icon className="bg-primary text-primary-foreground h-8 w-8 animate-spin rounded-full p-1" />
      </div>
    )
  if (error) return <div>{error.message}</div>

  const editMeasureMutation = async (editedMeasure: Measure) => {
    try {
      await mutate(
        editMeasure(editedMeasure, measureId, `/api/measure/${measureId}`)
      )

      toast({
        title: "Success!",
        description: "Your measure has been updated.",
      })

      router.push("/dashboard/history")
    } catch (err) {
      toast({
        title: "Error!",
        description: "There was a problem. Please, try again.",
      })
    }
  }

  return (
    <div className="bg-card rounded-xl p-4">
      <SectionHeading>Edit Measure</SectionHeading>

      <UpdateMeasureForm
        measure={measure}
        editMeasureMutation={editMeasureMutation}
      />
    </div>
  )
}
