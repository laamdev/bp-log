import { Metadata } from "next"

//@ts-expect-error
import Guidelines, { meta } from "@/components/markdown/guidelines.mdx"

export const metadata: Metadata = {
  title: meta.title,
}

export default function GuidelinesRoute() {
  return (
    <div>
      <Guidelines />
    </div>
  )
}
