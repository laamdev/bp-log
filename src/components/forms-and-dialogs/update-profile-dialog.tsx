"use client"

import { Edit3Icon } from "lucide-react"
import { useState } from "react"

import { UpdateProfileForm } from "@/components/forms-and-dialogs/update-profile-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const UpdateProfileDialog = ({
  birthday,
  sex,
  weight,
  height,
}: {
  birthday: string
  sex: string
  weight: number
  height: number
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Edit3Icon className="mr-2 size-4" />
          <span>{`Edit profile`}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Modify your personal information.
          </DialogDescription>
        </DialogHeader>

        <UpdateProfileForm
          setOpen={setOpen}
          birthday={birthday}
          sex={sex}
          weight={weight}
          height={height}
        />
      </DialogContent>
    </Dialog>
  )
}
