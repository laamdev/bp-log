"use client"

import { useState } from "react"
import { DialogClose } from "@radix-ui/react-dialog"

import { Button } from "@/components/ui/button"

export const SubmitButton = () => {
  const [open, setOpen] = useState(false)
  return (
    <DialogClose asChild>
      <Button type="submit">Submit</Button>
    </DialogClose>
  )
}
