import Link from "next/link"

import { LottieAnimation } from "@/components/home/lottie-animation"

export const ArticleCard = ({
  label,
  url,
  animation,
}: {
  label: string
  url: string
  animation: any
}) => {
  return (
    <Link
      href={url}
      className="bg-primary text-primary-foreground flex flex-col items-center justify-center rounded-xl p-4 shadow"
    >
      <div className="relative flex h-24 w-24 items-center justify-center md:h-32 md:w-32">
        <LottieAnimation animation={animation} />
      </div>
      <h3 className="mt-2 text-center text-lg font-semibold md:text-2xl">
        {label}
      </h3>
    </Link>
  )
}
