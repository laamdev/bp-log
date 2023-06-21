import { Edit3Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UpdateProfileForm } from "@/components/forms/update-profile-form"

export const UpdateProfileDialog = async () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit3Icon className="mr-2 h-4 w-4" />
          <span className="hidden sm:block">{`Edit profile`}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Modify your personal information.
          </DialogDescription>
        </DialogHeader>

        <UpdateProfileForm />
      </DialogContent>
    </Dialog>
  )
}
