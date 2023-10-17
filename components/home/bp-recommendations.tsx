import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const BpRecommendations = () => {
  return (
    <Card className="bg-primary text-primary-foreground mx-auto w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="mb-4 text-3xl font-bold">Guidelines</CardTitle>
        <CardDescription>xxx</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">xxx</CardContent>
    </Card>
  )
}
