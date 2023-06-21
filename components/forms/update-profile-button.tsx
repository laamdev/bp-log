"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"

import { Button } from "@/components/ui/button"

export const UpdateProfileButton = () => {
  return (
    <Button type="submit" className="mt-10">
      <DialogPrimitive.Close>Submit</DialogPrimitive.Close>
    </Button>
  )
}
