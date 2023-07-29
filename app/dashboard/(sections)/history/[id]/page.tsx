import { notFound, redirect } from "next/navigation"

import { getMeasureById } from "@/lib/actions/measures"
import { Measure } from "@/lib/db/schema"
// import { getDefaultDatetime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateMeasureAction } from "@/app/_actions"

export default async function MeasurePage({
  params,
}: {
  params: { id: number }
}) {
  const { id } = params
  const measure = (await getMeasureById(id as number)) as Measure

  if (!measure) {
    return notFound()
  }

  async function action(data: FormData) {
    "use server"
    const id = measure.id
    const sys = +data.get("sys")!
    const dia = +data.get("dia")!
    const pul = +data.get("pul")!
    const pp = sys - dia
    const afString = data.get("af")!
    const af = afString === "on" ? true : false
    const measureTime = data.get("measureTime")
    // // const updatedAt = now
    await updateMeasureAction({
      id: id,
      sys: sys,
      dia: dia,
      pp: pp,
      pul: pul,
      af: af,
      measureTime: measureTime as string,
      // //   updatedAt: updatedAt,
    })

    redirect("/dashboard/history")
  }

  return (
    <main className="mx-auto max-w-xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Edit Measure</h2>
      </div>

      <Card className="mt-6">
        <CardContent className="pt-6">
          <form action={action}>
            <div className="grid grid-cols-3 gap-6">
              <div className="grid gap-y-2.5">
                <Label htmlFor="sys">Systolic</Label>
                <Input
                  type="number"
                  name="sys"
                  id="sys"
                  defaultValue={measure.sys}
                />
              </div>
              <div className="grid gap-y-2.5">
                <Label htmlFor="dia">Diastolic</Label>
                <Input
                  type="number"
                  name="dia"
                  id="dia"
                  defaultValue={measure.dia}
                />
              </div>
              <div className="grid gap-y-2.5">
                <Label htmlFor="pul">BPM</Label>
                <Input
                  type="number"
                  name="pul"
                  id="pul"
                  defaultValue={measure.pul}
                />
              </div>
              <div className="col-span-3 grid gap-y-2.5">
                <Label htmlFor="time">Date and time</Label>
                <Input
                  type="datetime-local"
                  name="measureTime"
                  id="measureTime"
                  // defaultValue={getDefaultDatetime(measure.measureTime!)}
                  defaultValue={new Date(measure.measureTime!)
                    .toISOString()
                    .slice(0, 16)}
                />
              </div>
              <div className="col-span-3 flex items-center gap-x-2.5">
                <Checkbox
                  id="af"
                  name="af"
                  defaultChecked={measure.af as boolean}
                />
                <Label htmlFor="af">Irregular pulse?</Label>
              </div>
            </div>
            <Button type="submit" className="mt-12">
              Update
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
