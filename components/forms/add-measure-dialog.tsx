import { auth } from "@clerk/nextjs"
import { format, parseISO } from "date-fns"
import { CalendarIcon, PlusIcon } from "lucide-react"

import { now } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addMeasureAction } from "@/app/_actions"

export const AddMeasureDialog = () => {
  async function action(data: FormData) {
    "use server"
    const userid = await auth().userId!
    const sys = +data.get("sys")!
    const dia = +data.get("dia")!
    const pul = +data.get("pul")!
    const pp = sys - dia
    const afString = data.get("af")!
    const af = afString === "on" ? true : false
    const measureTime = data.get("measureTime")
    const userId = userid
    await addMeasureAction({
      sys: sys,
      dia: dia,
      pul: pul,
      pp: pp,
      af: af,
      userId: userId,
      measureTime: measureTime as string,
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="mr-2 h-4 w-4" />
          <span>{`New measure`}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new reading</DialogTitle>
          <DialogDescription>
            Input the readings of your blood preassure machine.
          </DialogDescription>
        </DialogHeader>

        <form action={action}>
          <div className="grid grid-cols-3 gap-5">
            <div className="grid gap-y-2.5">
              <Label htmlFor="sys">Systolic</Label>
              <Input
                type="number"
                name="sys"
                id="sys"
                defaultValue={120}
                // // // placeholder="Diastolic"
              />
            </div>
            <div className="grid gap-y-2.5">
              <Label htmlFor="dia">Diastolic</Label>
              <Input
                type="number"
                name="dia"
                id="dia"
                defaultValue={80}
                // // // placeholder="Diastolic"
              />
            </div>
            <div className="grid gap-y-2.5">
              <Label htmlFor="pul">BPM</Label>
              <Input
                type="number"
                name="pul"
                id="pul"
                // // // placeholder="Diastolic"
                defaultValue={75}
              />
            </div>
            <div className="col-span-3 grid gap-y-2.5">
              <Label htmlFor="time">Date and time</Label>
              <Input
                type="datetime-local"
                name="measureTime"
                id="measureTime"
                defaultValue={now.slice(0, 16)} // // // placeholder="Diastolic"
              />
            </div>
            <div className="col-span-3 flex items-center gap-x-2.5">
              <Checkbox id="af" name="af" />
              <Label htmlFor="af">Irregular pulse?</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="mt-10">
              Submit
            </Button>
          </DialogFooter>
        </form>

        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
