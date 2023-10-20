import Image from "next/image"
import { ArrowRightIcon } from "lucide-react"

import { SectionHeading } from "@/components/shared/section-heading"

export const FactSheetCard = () => {
  return (
    <div className="bg-card relative min-h-[180px] rounded-xl">
      <Image
        alt="Fact sheet card."
        src="/images/fact-sheet-cover.webp"
        fill
        className="rounded-xl object-cover object-center"
      />
      <div className="absolute inset-0 rounded-xl bg-black opacity-50" />
      <div className="relative z-10 flex h-full items-end justify-between p-4">
        <SectionHeading>Resources</SectionHeading>
        <div>
          <ArrowRightIcon className="text-gra h-8 w-8" />
        </div>
      </div>
    </div>
  )
}
