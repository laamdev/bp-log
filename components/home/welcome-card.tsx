import Link from "next/link"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { LayoutDashboardIcon, LogInIcon, UserPlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const WelcomeCard = () => {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">BP Log</CardTitle>
        <CardDescription>
          <SignedOut>
            Sing up or log in to keep a log of your daily blood preassure
            readings.
          </SignedOut>
          <SignedIn>
            Go to your dashboard to see your blood preassure overview, measures
            history and medication tracking.
          </SignedIn>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <SignedIn>
            <Link
              href="/dashboard/overview"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              <LayoutDashboardIcon className="mr-2 h-4 w-4" />
              Personal Dashboard
            </Link>
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <LogInIcon className="mr-2 h-4 w-4" />
              Login
            </Link>
            <Link
              href="/sign-up"
              className={cn(buttonVariants({ variant: "default" }))}
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
