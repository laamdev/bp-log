import { currentUser } from "@clerk/nextjs"
import type { User } from "@clerk/nextjs/api"
import { differenceInCalendarYears, parseISO } from "date-fns"

import { calculateAge } from "@/lib/utils"
import { UpdateProfileDialog } from "@/components/forms/update-profile-dialog"
import { AgeCard } from "@/components/profile/age-card"
import { DetailsCard } from "@/components/profile/details-card"
import { PersonalInfoCard } from "@/components/profile/personal-info-card"
import { PageHeading } from "@/components/shared/page-heading"

export default async function ProfilePage() {
  const user: User | null = await currentUser()

  if (!user?.id) return <div>Not authorized</div>

  const { birthday, sex, weight, height } = user.publicMetadata

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between space-y-2">
        <PageHeading>Your Profile</PageHeading>
        <UpdateProfileDialog
          birthday={birthday as string}
          sex={sex as string}
          weight={weight as number}
          height={height as number}
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <PersonalInfoCard user={user} />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <AgeCard label="Age" value={birthday as string} unit="years" />
        <DetailsCard label="Sex" value={sex as string} />
        <DetailsCard label="Height" value={height as string} unit="cm" />
        <DetailsCard label="Weight" value={weight as string} unit="kg" />
      </div>
    </div>
  )
}
