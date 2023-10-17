import { useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { RotateCwIcon } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"

import { now } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const validationSchema = z.object({
  sys: z.coerce.number().int().positive(),
  dia: z.coerce.number().min(2, {
    message: "Your diastolic pressure must be at least 2.",
  }),
  pul: z.coerce.number().min(2, {
    message: "Your pulse must be at least 2.",
  }),
  af: z.coerce.boolean(),
  measureTime: z.string(),
  cuffLocation: z.string({
    required_error: "Please select a cuff location.",
  }),
  bodyPosition: z.string({
    required_error: "Please select a body position.",
  }),
})

type FormValues = z.infer<typeof validationSchema>

const defaultValues: Partial<FormValues> = {
  sys: 120,
  dia: 80,
  pul: 75,
  af: false,
  measureTime: now,
  cuffLocation: "left arm",
  bodyPosition: "seated",
}

export const AddMeasureForm = ({ addMeasureMutation, setOpen }: any) => {
  // // const [success, setSuccess] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const { isLoaded, userId, sessionId, getToken } = useAuth()

  // 1. Define your form.
  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues,
  })

  // 2. Define a submit handler.
  const onSubmit: SubmitHandler<FormValues> = async (formData: any) => {
    if (submitting) {
      return false
    }

    setSubmitting(true)

    const formattedMeasureTime = await new Date(
      formData.measureTime
    ).toISOString()

    const data = await addMeasureMutation({
      userId: userId,
      sys: formData.sys,
      dia: formData.dia,
      pul: formData.pul,
      pp: formData.sys - formData.dia,
      af: formData.af,
      measureTime: formattedMeasureTime,
      cuffLocation: formData.cuffLocation,
      bodyPosition: formData.bodyPosition,
    })

    setSubmitting(false)
    setOpen(false)

    return data
  }

  if (!isLoaded || !userId) {
    return null
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-10">
        <div className="grid grid-cols-3 gap-5">
          <FormField
            control={form.control}
            name="sys"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Systolic</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>mmHg</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diastolic</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>mmHg</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pul"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pulse</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>bpm</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="measureTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date and Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="af"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-x-5">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Irregular heartbeat?</FormLabel>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="cuffLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuff Location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an arm" />
                    </SelectTrigger>
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bodyPosition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body position</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an arm" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="seated">Seated</SelectItem>
                    <SelectItem value="lying">Lying</SelectItem>
                    <SelectItem value="semi-recumbent">
                      Semi-recumbent
                    </SelectItem>
                    <SelectItem value="standing">Standing</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mt-10">
          {submitting ? (
            <p className="flex items-center gap-x-1">
              <span>{`Submitting`}</span>
              <RotateCwIcon className="h-5 w-5 animate-spin" />
            </p>
          ) : (
            <p>{`Submit`}</p>
          )}
        </Button>
      </form>
    </Form>
  )
}
