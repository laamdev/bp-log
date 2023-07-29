import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="grid h-[calc(100vh-4rem)] place-content-center place-items-center">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-primary text-primary-foreground hover:bg-primary/90",
          },
        }}
      />
    </div>
  )
}
