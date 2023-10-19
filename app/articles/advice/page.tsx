import { Metadata } from "next"

//@ts-expect-error
import Advice, { meta } from "@/components/markdown/advice.mdx"

export const metadata: Metadata = {
  title: meta.title,
}

export default function AdviceRoute() {
  return (
    <div>
      <Advice />
    </div>
  )
}
