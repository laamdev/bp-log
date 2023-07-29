import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="grid h-[calc(100vh-4rem)] place-content-center place-items-center">
      <SignIn
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
