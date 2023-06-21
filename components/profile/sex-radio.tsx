import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function SexRadio() {
  return (
    <div>
      <Label htmlFor="sex">Sex</Label>

      <RadioGroup defaultValue="male">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="male" id="male" />
          <Label htmlFor="male">Male</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="female" id="female" />
          <Label htmlFor="female">Female</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
