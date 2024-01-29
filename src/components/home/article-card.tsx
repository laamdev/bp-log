import Link from "next/link"

import { LottieAnimation } from "@/components/home/lottie-animation"

export const ArticleCard = ({
  label,
  url,
  animation,
}: {
  label: string
  url: string
  animation: string
}) => {
  return (
    <Link
      href={url}
      className="bg-card tw-transition text-card-foreground group flex flex-col items-center justify-center rounded-xl p-4 shadow hover:bg-white"
    >
      <div className="tw-transition relative flex size-24 scale-95 items-center justify-center group-hover:scale-105 md:size-32">
        <LottieAnimation animation={animation} />
      </div>
      <h3 className="mt-2 text-center text-lg font-semibold md:text-2xl">
        {label}
      </h3>
    </Link>
  )
}
