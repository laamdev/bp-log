"use client"

import { RotateCwIcon } from "lucide-react"
import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"

export const SubmitButton = ({
  label,
  labelPending,
  variant = "default",
}: {
  label: string
  labelPending: string
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined
}) => {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      variant={variant}
      aria-disabled={pending}
      className="mt-10"
    >
      {pending ? (
        <p className="flex items-center gap-x-1">
          <span>{labelPending}</span>
          <RotateCwIcon className="size-4 animate-spin" />
        </p>
      ) : (
        <p>{label}</p>
      )}
    </Button>
  )
}
