"use client"

import { redirect } from "next/navigation"
import { format } from "date-fns"

import { Measure } from "@/lib/db/schema"
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
import { InputUnit } from "@/components/forms-and-dialogs/input-unit"
import { SubmitButton } from "@/components/forms-and-dialogs/submit-button"
import { updateMeasure } from "@/app/_actions"

export const UpdateMeasureForm = ({ measure }: { measure: Measure }) => {
  const updateInvoiceWithId = updateMeasure.bind(null, measure.id.toString())

  const { toast } = useToast()

  return (
    <form
      action={(data) =>
        updateInvoiceWithId(data).then((res) => {
          console.log(res)
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
      <div className="grid grid-cols-3 gap-5">
        <div>
          <Label>Systolic</Label>
          <Input
            type="number"
            name="sys"
            defaultValue={measure.sys}
            className="mt-1.5"
          />
          <InputUnit>mmHg</InputUnit>
        </div>

        <div>
          <Label>Diastolic</Label>
          <Input
            type="number"
            name="dia"
            defaultValue={measure.dia}
            className="mt-1.5"
          />
          <InputUnit>mmHg</InputUnit>
        </div>

        <div>
          <Label>Pulse</Label>
          <Input
            type="number"
            name="pul"
            defaultValue={measure.pul}
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
          defaultValue={format(
            new Date(measure.measureTime as string),
            "yyyy-MM-dd'T'HH:mm"
          )}
          className="mt-1.5"
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <Label>Body position</Label>
          <div className="mt-1.5">
            <Select name="bodyPosition" defaultValue={measure.bodyPosition}>
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
            <Select name="cuffLocation" defaultValue={measure.cuffLocation}>
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

      <input type="hidden" name="id" value={measure.id} />

      <SubmitButton label="Edit" labelPending="Editing" />
    </form>
  )
}
