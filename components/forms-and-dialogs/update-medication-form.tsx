"use client"

import { useEffect } from "react"
import { useFormState } from "react-dom"

import { Medication } from "@/lib/db/schema"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { SubmitButton } from "@/components/forms-and-dialogs/submit-button"
import { updateMedication } from "@/app/_actions"

export const UpdateMedicationForm = ({
  setOpen,
  medication,
}: {
  setOpen: any
  medication: Medication
}) => {
  const initialState = {
    name: medication.name,
    dose: medication.dose,
    unit: medication.unit,
    time: medication.time,
    note: medication.note,
  }

  const [state, formAction] = useFormState(updateMedication, initialState)
  const { toast } = useToast()

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: state.error,
      })
    } else if (state.success) {
      toast({
        title: "Success!",
        description: state.success,
      })

      setOpen(false)
    } else {
      return
    }
  }, [state, toast])

  return (
    <form action={formAction} className="mt-5 space-y-10">
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1 grid gap-y-2">
          <Label htmlFor="name">Medication</Label>
          <Input
            type="text"
            name="name"
            id="name"
            defaultValue={medication.name as string}
          />
        </div>
        <div className="col-span-1 grid gap-y-2">
          <Label htmlFor="time">Time</Label>
          <Select name="time" defaultValue={medication.time}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a time of day" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Time of Day</SelectLabel>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="night">Night</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1 grid gap-y-2">
          <Label htmlFor="dose">Dose</Label>
          <Input
            type="number"
            name="dose"
            id="dose"
            defaultValue={medication.dose as number}
          />
        </div>
        <div className="col-span-1 grid gap-y-2">
          <Label htmlFor="unit">Unit</Label>
          <Select name="unit" defaultValue={medication.unit}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a dose unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Unit of Dose</SelectLabel>
                <SelectItem value="pill">pill</SelectItem>
                <SelectItem value="mg">mg</SelectItem>
                <SelectItem value="ml">ml</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <input type="hidden" name="id" value={medication.id} />

      <SubmitButton label="Edit" labelPending="Editing" />

      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  )
}
