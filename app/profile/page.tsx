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
  if (!user) return null

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

          {/* <div className="relative mx-4 aspect-square h-auto w-24">
            <Image
              src={user?.profileImageUrl}
              alt={`${user?.firstName} ${user?.lastName}`}
              fill
              className="rounded-lg"
            />
          </div>
          <div>
            <h2>
              {user?.firstName} {user?.lastName}
            </h2>

            <h3>{user?.emailAddresses[0].emailAddress}</h3>
          </div> */}
        </div>
      </div>
    </div>
  )
}

// // import { UserProfile } from "@clerk/nextjs"

// // export default function ProfilePage() {
// //   return <UserProfile />
// // }

// // import {
// //   CalendarIcon,
// //   EqualIcon,
// //   HeartIcon,
// //   HeartPulseIcon,
// //   MoveDownRightIcon,
// //   MoveUpRightIcon,
// // } from "lucide-react"

// // import { Measure } from "@/lib/db/schema"
// // import { getMeasures } from "@/lib/measures"
// // import { cn } from "@/lib/utils"
// // import { Button } from "@/components/ui/button"
// // import { Calendar } from "@/components/ui/calendar"
// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from "@/components/ui/popover"
// // import { AddDialog } from "@/components/forms/add-dialog"

// // export default async function HomePage() {
// //   const allMeasures = (await getMeasures()) as Measure[]
// //   const currentPP = allMeasures[0]?.sys - allMeasures[0]?.dia
// //   const previousPP = allMeasures[1]?.sys - allMeasures[1]?.sys
// //   return (
// //     <div className="container mt-20">
// //       <AddDialog />

// //       <div className="mt-10 grid grid-cols-3 gap-10">
// //         <div className="col-span-2 grid grid-cols-5 gap-5 rounded-2xl">
// //           <div className="col-span-2 rounded-2xl bg-neutral-800 p-5"></div>
// //           <div className="col-span-3 rounded-2xl bg-neutral-900 p-5">
// //             <div className="grid grid-cols-3 gap-x-10">
// //               <div className="flex flex-col items-center justify-center gap-y-2.5">
// //                 {allMeasures[0]?.af ? (
// //                   <HeartPulseIcon className="h-14 w-14" />
// //                 ) : (
// //                   <HeartIcon className="h-14 w-14" />
// //                 )}
// //                 <div className="flex items-baseline gap-x-1 text-3xl font-bold">
// //                   <span>{allMeasures[0].pul}</span>
// //                   <span className="text-sm font-normal">bpm</span>
// //                 </div>
// //               </div>
// //               <div className="relative col-span-2">
// //                 <h3 className="flex flex-col text-lg font-medium">
// //                   Blood Preassure
// //                 </h3>
// //                 {currentPP > previousPP && (
// //                   <MoveUpRightIcon className="absolute right-0 top-0" />
// //                 )}
// //                 {currentPP < previousPP && (
// //                   <MoveDownRightIcon className="absolute right-0 top-0" />
// //                 )}
// //                 {currentPP === previousPP && (
// //                   <EqualIcon className="absolute right-0 top-0" />
// //                 )}
// //                 <div className="mt-5 grid grid-cols-3">
// //                   <div className="flex flex-col">
// //                     <div
// //                       className={cn(
// //                         "text-3xl font-bold",
// //                         allMeasures[0]?.dia <= 60 && "text-blue-500",
// //                         allMeasures[0]?.dia > 60 &&
// //                           allMeasures[0]?.dia <= 80 &&
// //                           "text-green-500",
// //                         allMeasures[0]?.dia > 80 &&
// //                           allMeasures[0]?.dia < 90 &&
// //                           "text-yellow-500",
// //                         allMeasures[0]?.dia >= 90 &&
// //                           allMeasures[0]?.dia < 119 &&
// //                           "text-orange-500",
// //                         allMeasures[0]?.dia >= 120 && "text-red-500"
// //                       )}
// //                     >
// //                       {allMeasures[0]?.sys}
// //                     </div>
// //                     <div className="text-sm text-neutral-500">Sys (mm Hg)</div>
// //                   </div>
// //                   <div className="flex flex-col">
// //                     <div
// //                       className={cn(
// //                         "text-3xl font-bold",
// //                         allMeasures[0]?.dia <= 80 && "text-green-500"
// //                       )}
// //                     >
// //                       {allMeasures[0]?.dia}
// //                     </div>
// //                     <div className="text-sm text-neutral-500">Dia</div>
// //                   </div>
// //                   <div className="flex flex-col">
// //                     <div className="text-3xl font-bold">
// //                       {allMeasures[0]?.sys - allMeasures[0]?.dia}
// //                     </div>
// //                     <div className="text-sm text-neutral-500">PP</div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="col-span-1 rounded-2xl bg-neutral-900 p-5"></div>
// //       </div>

// //       <section className="mt-20">
// //         <div className="text-3xl font-bold">Measures</div>

// //         {allMeasures && allMeasures.length && (
// //           <ul className="mt-10 space-y-5">
// //             {allMeasures.map((measure: Measure) => (
// //               <li
// //                 key={measure.id}
// //                 className="rounded-full border-2 border-white px-5 py-2.5"
// //               >
// //                 {measure.sys}
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </section>
// //     </div>
// //   )
// // }
