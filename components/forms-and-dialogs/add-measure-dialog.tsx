"use client"

import { useState } from "react"
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddMeasureForm } from "@/components/forms-and-dialogs/add-measure-form"

export const AddMeasureDialog = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusIcon className="mr-2 h-4 w-4" />
          <span>{`New Measure`}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new measure</DialogTitle>
          <DialogDescription>
            Input the details of your blood preassure reading.
          </DialogDescription>
        </DialogHeader>

        <AddMeasureForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
