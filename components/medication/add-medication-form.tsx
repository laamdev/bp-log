import { useEffect } from "react"
import { SelectValue } from "@radix-ui/react-select"
import {
  // @ts-expect-error
  experimental_useFormState as useFormState,
  // @ts-expect-error
  experimental_useFormStatus as useFormStatus,
} from "react-dom"

import { Button } from "@/components/ui/button"
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
import { addMedication } from "@/app/_actions"

import { DialogFooter } from "../ui/dialog"

const initialState = {
  name: null,
  dose: null,
  unit: null,
  time: null,
  note: null,
}

export const AddMedicationForm = ({ setOpen }: { setOpen: any }) => {
  const { toast } = useToast()
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(addMedication, initialState)

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

      setOpen(false)
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

      <DialogFooter>
        <Button type="submit" className="mt-8" aria-disabled={pending}>
          Add
        </Button>

        <p aria-live="polite" className="sr-only" role="status">
          {state?.error}
        </p>
      </DialogFooter>
    </form>
    // <form className="mt-8 grid grid-cols-2" action="">
    //   <div className="grid-grid-cols-2 col-span-1 gap-x-2">
    //   </div>
    //   <div className="grid gap-y-2.5">
    //     <Label htmlFor="time">Time</Label>
    //     <Select name="time">
    //       <SelectTrigger className="w-full">
    //         <SelectValue placeholder="Select a time of day" />
    //       </SelectTrigger>
    //       <SelectContent>
    //         <SelectGroup>
    //           <SelectLabel>Time of Day</SelectLabel>
    //           <SelectItem value="morning">Morning</SelectItem>
    //           <SelectItem value="afternoon">Afternoon</SelectItem>
    //           <SelectItem value="night">Night</SelectItem>
    //         </SelectGroup>
    //       </SelectContent>
    //     </Select>
    //   </div>
    //   <div className="flex w-full gap-x-2.5">
    //     <div className="w-2/3">
    //       <Label htmlFor="dia">Dose</Label>
    //       <Input type="number" name="dose" placeholder="Dose of meds" />
    //     </div>
    //     <div className="w-1/3">
    //       <Label htmlFor="unit">Unit</Label>
    //       <Select name="unit">
    //         <SelectTrigger className="w-full">
    //           <SelectValue placeholder="Select a dose unit" />
    //         </SelectTrigger>
    //         <SelectContent>
    //           <SelectGroup>
    //             <SelectLabel>Unit of Dose</SelectLabel>
    //             <SelectItem value="pill">pill</SelectItem>
    //             <SelectItem value="mg">mg</SelectItem>
    //             <SelectItem value="ml">ml</SelectItem>
    //           </SelectGroup>
    //         </SelectContent>
    //       </Select>
    //     </div>
    //   </div>

    //   {/* {error && <p className="text-red-500">{error}</p>} */}
    // </form>
  )
}
