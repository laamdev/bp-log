import { User } from "@clerk/nextjs/dist/types/server"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const PersonalInfoCard = ({ user }: { user: User }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-x-4">
          <Avatar className="h-16 w-16 md:h-24 md:w-24">
            <AvatarImage
              src={user?.imageUrl}
              alt={`${user?.firstName} ${user?.lastName}`}
            />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
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
  )
}
