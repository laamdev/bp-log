"use client"

import { Loader2Icon } from "lucide-react"
import { useFormStatus } from "react-dom"

import { deleteMedication } from "@/app/_actions"
import { useToast } from "@/components/ui/use-toast"

import { SubmitButton } from "./submit-button"

export const DeleteMedicationButton = ({
  medicationId,
}: {
  medicationId: number
  setOpen: (value: boolean) => void
}) => {
  const { pending } = useFormStatus()

  const { toast } = useToast()

  return (
    <form
      action={(data) =>
        deleteMedication(data).then((res) => {
          if (res.success) {
            toast({
              title: "Success",
            })
          }
          if (res.error) {
            toast({
              title: "Error",
            })
          }
        })
      }
    >
      <input type="hidden" name="id" value={medicationId} />

      <SubmitButton
        label="Delete"
        labelPending="Deleting"
        variant="destructive"
      />
    </form>
  )
}
