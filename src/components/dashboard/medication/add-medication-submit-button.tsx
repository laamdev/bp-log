import { Loader2Icon } from "lucide-react"
import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"

export const AddMedicationSubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <div className="flex items-center">
          <span>Adding</span>
          <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
        </div>
      ) : (
        <span>Add</span>
      )}
    </Button>
  )
}
