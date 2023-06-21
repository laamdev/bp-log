import { currentUser } from "@clerk/nextjs"
import { differenceInCalendarYears, parseISO } from "date-fns"

import { getUserMeasuresCount } from "@/lib/actions/measures"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UpdateProfileDialog } from "@/components/forms/update-profile-dialog"

export default async function ProfilePage() {
  const user = await currentUser()
  if (!user) return <div>Loading...</div>

  const userMeasuresCount = await getUserMeasuresCount()

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">User Profile</h2>
        <UpdateProfileDialog />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-x-4">
                <Avatar className="h-16 w-16 md:h-24 md:w-24">
                  <AvatarImage src={user?.profileImageUrl} alt="@shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>
                    {user?.firstName} {user?.lastName}
                  </CardTitle>
                  <CardDescription>
                    {user?.emailAddresses[0].emailAddress}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid gap-4 md:col-span-2 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Measures</CardTitle>
            </CardHeader>
            <CardContent>
              {userMeasuresCount === 0 ? "N/A" : (userMeasuresCount as number)}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Sex</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="capitalize">
                {!user.publicMetadata.sex
                  ? "N/A"
                  : (user.publicMetadata.sex as string)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Age</CardTitle>
            </CardHeader>
            <CardContent>
              {!user.publicMetadata.birthday
                ? "N/A"
                : differenceInCalendarYears(
                    new Date(),
                    parseISO(user.publicMetadata.birthday as string)
                  )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
