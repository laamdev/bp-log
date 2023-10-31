"use client"

import { useState } from "react"
import { TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { DeleteMedicationButton } from "./delete-medication-button"

export const DeleteMedicationDialog = ({
  medicationId,
  medicationName,
}: {
  medicationId: number
  medicationName: string
}) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <TrashIcon className="tw-transition h-4 w-4 opacity-50 hover:text-red-700 hover:opacity-100" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {medicationName}</DialogTitle>
          <DialogDescription>
            <p>
              {`Do you want to delete `}
              <span className="font-semibold">{medicationName}</span>
              {`? This action cannot be undone.`}
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DeleteMedicationButton
            medicationId={medicationId}
            setOpen={setOpen}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
