"use client"

import { useEffect } from "react"
import { useFormState } from "react-dom"

import { addMeasure } from "@/app/_actions"
import { InputUnit } from "@/components/forms-and-dialogs/input-unit"
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
import { now } from "@/lib/utils"

const initialState = {
  sys: 120,
  dia: 80,
  pul: 75,
  af: false,
  measureTime: now,
  cuffLocation: "left arm",
  bodyPosition: "seated",
}

export const AddMeasureForm = ({
  setOpen,
}: {
  setOpen: (value: boolean) => void
}) => {
  const [state, formAction] = useFormState(addMeasure, initialState)
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
        description: state.message,
      })

      setOpen(false)
    } else {
      return
    }
  }, [state, setOpen, toast])

  return (
    <form action={formAction} className="mt-5 space-y-10">
      <div className="grid grid-cols-3 gap-5">
        <div>
          <Label>Systolic</Label>
          <Input
            type="number"
            name="sys"
            defaultValue={120}
            className="mt-1.5"
          />
          <InputUnit>mmHg</InputUnit>
        </div>

        <div>
          <Label>Diastolic</Label>
          <Input
            type="number"
            name="dia"
            defaultValue={80}
            className="mt-1.5"
          />
          <InputUnit>mmHg</InputUnit>
        </div>

        <div>
          <Label>Pulse</Label>
          <Input
            type="number"
            name="pul"
            defaultValue={75}
            className="mt-1.5"
          />
          <InputUnit>bpm</InputUnit>
        </div>
      </div>

      <div>
        <Label>Date and Time</Label>
        <Input
          type="datetime-local"
          name="measureTime"
          defaultValue={now}
          className="mt-1.5"
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <Label>Body position</Label>
          <div className="mt-1.5">
            <Select name="bodyPosition" defaultValue="seated">
              <SelectTrigger>
                <SelectValue placeholder="Select an arm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seated">Seated</SelectItem>
                <SelectItem value="lying">Lying</SelectItem>
                <SelectItem value="semi-recumbent">Semi-recumbent</SelectItem>
                <SelectItem value="standing">Standing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label>Cuff Location</Label>
          <div className="mt-1.5">
            <Select name="cuffLocation" defaultValue="left arm">
              <SelectTrigger>
                <SelectValue placeholder="Select an arm" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Arm</SelectLabel>
                  <SelectItem value="left arm">Left arm</SelectItem>
                  <SelectItem value="right arm">Right arm</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Wrist</SelectLabel>
                  <SelectItem value="left wrist">Left wrist</SelectItem>
                  <SelectItem value="right wrist">Right wrist</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Tight</SelectLabel>
                  <SelectItem value="left tight">Left tight</SelectItem>
                  <SelectItem value="right tight">Right tight</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Calf</SelectLabel>
                  <SelectItem value="left calf">Left calf</SelectItem>
                  <SelectItem value="right calf">Right calf</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Ankle</SelectLabel>
                  <SelectItem value="left ankle">Left ankle</SelectItem>
                  <SelectItem value="right ankle">Right ankle</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <SubmitButton label="Add" labelPending="Adding" />
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  )
}
