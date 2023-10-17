import { useEffect } from "react"
import { SelectValue } from "@radix-ui/react-select"
import {
  // @ts-expect-error
  experimental_useFormState as useFormState,
  // @ts-expect-error
  experimental_useFormStatus as useFormStatus,
} from "react-dom"

import { Medication } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { editMedication } from "@/app/_actions"

const initialState = {
  name: null,
  dose: null,
  unit: null,
  time: null,
  note: null,
}

export const EditMedicationForm = ({
  setOpenEditDialog,
  medication,
}: {
  setOpenEditDialog: any
  medication: Medication
}) => {
  const { toast } = useToast()
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(editMedication, initialState)

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: state.error,
      })
    } else if (state.message) {
      toast({
        title: "Success!",
        description: state.message,
      })

      setOpenEditDialog(false)
    } else {
      return
    }
  }, [state])

  return (
    <form action={formAction}>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="col-span-1 grid gap-y-2">
          <Label htmlFor="name">Medication</Label>
          <Input
            type="text"
            name="name"
            id="name"
            defaultValue={medication.name}
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
            defaultValue={medication.dose}
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

        <input
          className="hidden"
          type="number"
          name="medicationId"
          defaultValue={medication.id}
        />
      </div>

      <DialogFooter>
        <Button type="submit" className="mt-8" aria-disabled={pending}>
          Edit
        </Button>

        <p aria-live="polite" className="sr-only" role="status">
          {state?.error}
        </p>
      </DialogFooter>
    </form>
  )
}
