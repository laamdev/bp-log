"use client"

import { useEffect } from "react"
import { useFormState } from "react-dom"

import { addMedication } from "@/app/_actions"
import { SubmitButton } from "@/components/forms-and-dialogs/submit-button"
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

const initialState = {
  name: null,
  dose: null,
  unit: null,
  time: null,
  note: null,
}

export const AddMedicationForm = ({ setOpen }: { setOpen: any }) => {
  const [state, formAction] = useFormState(addMedication, initialState)
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
  }, [state, toast, setOpen])

  return (
    <form action={formAction} className="mt-5 space-y-10">
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1 grid gap-y-2">
          <Label htmlFor="name">Medication</Label>
          <Input
            type="text"
            name="name"
            id="name"
            // // defaultValue={medication as string}
          />
        </div>
        <div className="col-span-1 grid gap-y-2">
          <Label htmlFor="time">Time</Label>
          <Select name="time">
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
            // // defaultValue={dose as number}
          />
        </div>
        <div className="col-span-1 grid gap-y-2">
          <Label htmlFor="unit">Unit</Label>
          <Select name="unit">
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

      <SubmitButton label="Add" labelPending="Adding" />

      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  )
}
