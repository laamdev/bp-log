"use client"

import { PlusIcon } from "lucide-react"
import { useState } from "react"

import { AddMeasureForm } from "@/components/forms-and-dialogs/add-measure-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const AddMeasureDialog = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="mr-2 size-4" />
          <span>{`New Measure`}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new measure</DialogTitle>
          <DialogDescription>
            {`Input the details of your blood preassure reading.`}
          </DialogDescription>
        </DialogHeader>

        <AddMeasureForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
