import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-primary text-primary-foreground hover:bg-primary/90",
        },
      }}
      redirectUrl="/dashboard/overview"
    />
  )
}
