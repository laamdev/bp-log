"use client"

import { redirect } from "next/navigation"

import { Measure } from "@/lib/db/schema"
import { useToast } from "@/components/ui/use-toast"
import { SubmitButton } from "@/components/forms-and-dialogs/submit-button"
import { deleteMeasure } from "@/app/_actions"

export const DeleteMeasureForm = ({ measure }: { measure: Measure }) => {
  const { toast } = useToast()

  return (
    <form
      action={(data) =>
        deleteMeasure(data).then((res) => {
          if (res.error) {
            toast({
              title: "Error",
            })
          } else if (res.success) {
            toast({
              title: "Success",
            })
            redirect("/dashboard/history")
          }
        })
      }
      className="mt-5 space-y-10"
    >
      <input type="hidden" name="id" value={measure?.id} />
      <p>{`Are you sure you want to delete this measure? This action cannot be reversed.`}</p>
      <SubmitButton
        label="Delete"
        labelPending="Deleting"
        variant="destructive"
      />
    </form>
  )
}
