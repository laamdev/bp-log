import { auth, currentUser } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// // import { zodResolver } from "@hookform/resolvers/zod"
// // import * as z from "zod"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// // import { toast } from "@/components/ui/use-toast"
import { updateProfileAction } from "@/app/_actions"

// // const validationSchema = z.object({
// //   sex: z.enum(["male", "female"], {
// //     required_error: "You need to pick a sex.",
// //   }),
// //   age: z
// //     .number({
// //       required_error: "You need to input your age.",
// //     })
// //     .min(1, {
// //       message: "You must be at least 1 year old.",
// //     })
// //     .max(100, {
// //       message: "You must be at least 100 years old.",
// //     }),
// // })

// // type FormValues = z.infer<typeof validationSchema>

export const UpdateProfileForm = async () => {
  async function action(formData: FormData) {
    "use server"
    const { userId } = await auth()

    if (!userId) {
      throw new Error("You must be signed in to add an item to your cart")
    }

    const birthday = formData.get("birthday")!
    const sex = formData.get("sex")!

    await updateProfileAction({
      birthday: birthday,
      sex: sex,
      userId: userId,
    })
  }

  const user = await currentUser()

  return (
    <form action={action}>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 grid gap-y-2.5">
          <Label htmlFor="birthday">Birthday</Label>
          <Input
            type="date"
            name="birthday"
            id="birthday"
            defaultValue={
              !user?.publicMetadata.birthday
                ? new Date().toISOString().substring(0, 10)
                : (user.publicMetadata.birthday as string)
            }
          />
        </div>

        <RadioGroup
          defaultValue={
            !user?.publicMetadata.sex
              ? "male"
              : (user.publicMetadata.sex as string)
          }
          id="sex"
          name="sex"
        >
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
      <Button type="submit" className="mt-10">
        Submit
      </Button>
    </form>
  )
}
