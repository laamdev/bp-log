"use client"

// // import { currentUser } from "@clerk/nextjs"
import { useEffect } from "react"
import {
  // @ts-expect-error
  experimental_useFormState as useFormState,
  // @ts-expect-error
  experimental_useFormStatus as useFormStatus,
} from "react-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { SexRadio } from "@/components/profile/sex-radio"
import { updateProfile } from "@/app/_actions"

const initialState = {
  birthday: null,
  weight: null,
  height: null,
  sex: null,
}

export const UpdateProfileForm = ({
  setOpen,
  birthday,
  sex,
  weight,
  height,
}: {
  setOpen: any
  birthday: string
  sex: string
  weight: number
  height: number
}) => {
  const { toast } = useToast()
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(updateProfile, initialState)

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

  // // // In case the user signs out while on the page.
  // // if (!isLoaded || !userId) {
  // //   return null
  // // }

  return (
    <form action={formAction}>
      <div className="mt-8 grid grid-cols-2 gap-5">
        <div className="col-span-2 grid gap-y-2">
          <Label htmlFor="birthday">Age</Label>
          <Input
            type="date"
            name="birthday"
            id="birthday"
            defaultValue={birthday ?? new Date().toISOString().substring(0, 10)}
          />
        </div>
        <div className="col-span-1 grid gap-y-2">
          <Label htmlFor="weight">Weight</Label>
          <Input
            type="number"
            name="weight"
            id="weight"
            defaultValue={weight as number}
          />
        </div>
        <div className="col-span-1 grid gap-y-2">
          <Label htmlFor="height">Height</Label>
          <Input
            type="number"
            name="height"
            id="height"
            defaultValue={height as number}
          />
        </div>
        <div className="col-span-1 grid gap-y-2">
          <SexRadio defaultValue={(sex as string) ?? "male"} />
        </div>
        {/* <div className="col-span-1 grid gap-y-2">
          <Label htmlFor="height">Sex</Label>
          <Input
            type="number"
            name="height"
            id="height"
            defaultValue={height as number}
          />
        </div> */}
      </div>
      <Button type="submit" className="mt-8" aria-disabled={pending}>
        Edit
      </Button>

      <p aria-live="polite" className="sr-only" role="status">
        {state?.error}
      </p>
    </form>
  )
}
