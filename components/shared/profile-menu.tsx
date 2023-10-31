import Link from "next/link"
import { redirect } from "next/navigation"
import { currentUser, SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs"
import {
  ActivitySquareIcon,
  BookOpenTextIcon,
  HeartHandshakeIcon,
  LineChartIcon,
  ListIcon,
  LogOutIcon,
  MenuIcon,
  PillIcon,
  StethoscopeIcon,
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

import { SignOutBtn } from "../auth/sign-out-btn"

export const ProfileMenu = async () => {
  const user = await currentUser()

  return (
    <DropdownMenu>
      <SignedIn>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user?.imageUrl}
                alt={`${user?.firstName} ${user?.lastName}`}
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.firstName?.split("")[0]}
                {user?.lastName?.split("")[0]}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
      </SignedIn>

      <SignedOut>
        <DropdownMenuTrigger asChild>
          <div className="bg-primary text-primary-foreground flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-2">
            <MenuIcon className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
      </SignedOut>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <SignedIn>
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
        </SignedIn>

        <SignedOut>
          <DropdownMenuLabel className="font-normal">BP Log</DropdownMenuLabel>

          <DropdownMenuSeparator />
        </SignedOut>

        <SignedIn>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Dashboard</DropdownMenuLabel>

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
        </SignedIn>

        <DropdownMenuGroup>
          <DropdownMenuLabel>Guides</DropdownMenuLabel>
          <Link href="/guides/guidelines">
            <DropdownMenuItem>
              <HeartHandshakeIcon className="mr-2 h-4 w-4" />
              <span>Guidelines</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/guides/how-to">
            <DropdownMenuItem>
              <ActivitySquareIcon className="mr-2 h-4 w-4" />
              <span>How-to</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/guides/advice">
            <DropdownMenuItem>
              <StethoscopeIcon className="mr-2 h-4 w-4" />
              <span>Advice</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/guides/glossary">
            <DropdownMenuItem>
              <BookOpenTextIcon className="mr-2 h-4 w-4" />
              <span>Glossary</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <SignedIn>
          <DropdownMenuSeparator />
        </SignedIn>

        <SignedIn>
          <DropdownMenuGroup>
            <Link href="/profile">
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
        </SignedIn>

        <SignedIn>
          <DropdownMenuItem>
            <SignOutBtn />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
