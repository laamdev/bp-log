import Link from "next/link"
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs"
import {
  LayoutDashboardIcon,
  LogInIcon,
  LogOut,
  UserPlusIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const AuthCard = () => {
  return (
    <Card className="border-0">
      <CardHeader className="space-y-1">
        <CardTitle className="mb-4 text-5xl font-bold">BP Log</CardTitle>
        <CardDescription>
          <SignedIn>
            {`Go to your dashboard to see your blood preassure overview, measures
            history and medication tracking.`}
          </SignedIn>

          <SignedOut>
            {`Log in or sign up to keep a log of your daily blood preassure
            readings and track your medication intake.`}
          </SignedOut>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <SignedIn>
            <Link
              href="/dashboard/overview"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              <LayoutDashboardIcon className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
            <div
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "cursor-pointer"
              )}
            >
              <SignOutButton>
                <div className="flex w-full items-center justify-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </div>
              </SignOutButton>
            </div>
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              <LogInIcon className="mr-2 h-4 w-4" />
              Login
            </Link>
            <Link
              href="/sign-up"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              <UserPlusIcon className="mr-2 h-4 w-4" />
              Sign up
            </Link>
          </SignedOut>
        </div>
      </CardContent>
    </Card>
  )
}
