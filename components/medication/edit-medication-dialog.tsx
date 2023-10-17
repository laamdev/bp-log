import { Edit2Icon } from "lucide-react"

import { Medication } from "@/lib/types"
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
import { EditMedicationForm } from "@/components/medication/edit-medication-form"

export const EditMedicationDialog = ({
  openEditDialog,
  setOpenEditDialog,
  medication,
}: {
  openEditDialog: boolean
  setOpenEditDialog: any
  medication: Medication
}) => {
  return (
    <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit2Icon className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Medication</DialogTitle>
          <DialogDescription>
            {`Update the details of your ${medication.name} medication.`}
          </DialogDescription>
        </DialogHeader>

        <EditMedicationForm
          medication={medication}
          setOpenEditDialog={setOpenEditDialog}
        />
      </DialogContent>
    </Dialog>
  )
}
