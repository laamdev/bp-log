import { SignIn } from "@clerk/nextjs"
import Image from "next/image"

export default function SignInPage() {
  return (
    <>
      <div className="flex items-center justify-center">
        <SignIn
          appearance={{
            elements: {
              card: "bg-card rounded-xl mx-0",
              formButtonPrimary:
                "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary",
            },
          }}
          redirectUrl="/dashboard/overview"
        />
      </div>

      {/* <div className="relative rounded-xl">
        <Image
          src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          fill
          className="rounded-xl object-cover object-center"
        />
      </div> */}
    </>
  )
}
