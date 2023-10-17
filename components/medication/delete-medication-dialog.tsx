"use client"

import { startTransition } from "react"
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
import { useToast } from "@/components/ui/use-toast"
import { deleteMedication } from "@/app/_actions"

export const DeleteMedicationDialog = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  medicationId,
  medicationName,
}: {
  openDeleteDialog: boolean
  setOpenDeleteDialog: any
  medicationId: number
  medicationName: string
}) => {
  const { toast } = useToast()

  const handleDelete = () => {
    deleteMedication(medicationId)
    setOpenDeleteDialog(false)
    toast({
      variant: "destructive",
      title: "Medication deleted",
      description:
        "The medication has been successfully removed from your log.",
    })
  }

  return (
    <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <TrashIcon className="h-4 w-4 text-red-700" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Medication</DialogTitle>
          <DialogDescription>
            <p>
              {`Do you want to delete `}
              <span className="font-semibold">{medicationName}</span>
              {` this medication? This action cannot be undone.`}
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => {
              startTransition(() => {
                handleDelete()
              })
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
