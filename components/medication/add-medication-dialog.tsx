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
import { AddMedicationForm } from "@/components/medication/add-medication-form"

export const AddMedicationDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusIcon className="mr-2 h-4 w-4" />
          <span>{`Add Medication`}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Medication</DialogTitle>
          <DialogDescription>
            Enter the information of your new meds.
          </DialogDescription>
        </DialogHeader>

        <AddMedicationForm setOpen={setOpen} />

        {/* <Button
            variant="destructive"
            onClick={() => {
              startTransition(() => {
                deleteMedication(medicationId)
                setOpen(false)
              })
            }}
          >
            Delete
          </Button> */}
      </DialogContent>
    </Dialog>
  )
}
