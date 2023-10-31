"use client"

import { useState } from "react"
import { DialogClose } from "@radix-ui/react-dialog"

import { Button } from "@/components/ui/button"

export const SubmitButton = () => {
  return (
    <DialogClose asChild>
      <Button type="submit">Submit</Button>
    </DialogClose>
  )
}
