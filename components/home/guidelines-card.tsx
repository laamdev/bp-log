import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const GuidelinesCard = () => {
  return (
    <Link href="/articles/guidelines">
      <Card className="bg-primary text-primary-foreground border-0">
        <CardHeader className="space-y-1">
          <CardTitle className="mb-4 text-xl font-bold">Guidelines</CardTitle>
          <CardDescription>x</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">x </CardContent>
      </Card>
    </Link>
  )
}
