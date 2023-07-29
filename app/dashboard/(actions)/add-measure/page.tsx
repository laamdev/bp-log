import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { now } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addMeasureAction } from "@/app/_actions"

export default function AddMeasure() {
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

    redirect("/dashboard/overview")
  }
  return (
    <section className="mx-auto max-w-lg">
      <div>
        <h2 className="text-3xl font-semibold">Add a new reading</h2>
        <p className="mt-1 flex items-center gap-x-2">
          Input the readings of your blood preassure machine
        </p>
      </div>

      <Card className="mt-12 p-6">
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

            <div className="col-span-1 flex items-center gap-x-2.5">
              <Checkbox id="af" name="af" />
              <Label htmlFor="af">Irregular pulse?</Label>
            </div>
          </div>
          {/* <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="col-span-1 flex flex-col gap-y-2.5">
              <Label>Measurement Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a device and a location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Arm Cuff</SelectLabel>
                    <SelectItem value="arm-left">Left Arm</SelectItem>
                    <SelectItem value="arm-right">Right Arm</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Wrist Cuff</SelectLabel>
                    <SelectItem value="wrist-left">Left Wrist</SelectItem>
                    <SelectItem value="wrist-right">Right Wrist</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          
          </div> */}

          <Button type="submit" className="mt-10">
            Submit
          </Button>
        </form>
      </Card>
    </section>
  )
}
