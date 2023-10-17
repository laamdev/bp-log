import Link from "next/link"
import { currentUser, SignOutButton } from "@clerk/nextjs"
import {
  LineChartIcon,
  ListIcon,
  LogOut,
  PillIcon,
  UserIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const ProfileMenu = async () => {
  const user = await currentUser()

  if (!user) return <div>Not logged in</div>

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.imageUrl ?? ""}
              alt={`${user?.firstName} ${user?.lastName}`}
            />
            <AvatarFallback>
              {user?.firstName?.split("")[0]}
              {user?.lastName?.split("")[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs leading-none opacity-50">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href="/dashboard/overview">
            <DropdownMenuItem>
              <LineChartIcon className="mr-2 h-4 w-4" />
              <span>Overview</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/history">
            <DropdownMenuItem>
              <ListIcon className="mr-2 h-4 w-4" />
              <span>History</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/medication">
            <DropdownMenuItem>
              <PillIcon className="mr-2 h-4 w-4" />
              <span>Medication</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <SignOutButton>
            <div className="flex items-center gap-x-2">
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
