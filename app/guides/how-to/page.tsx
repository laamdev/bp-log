// // import { Metadata } from "next"

// // //@ts-expect-error
// // import HowTo, { meta } from "@/components/markdown/how-to.mdx"
import HowTo from "@/components/markdown/how-to.mdx"

// // export const metadata: Metadata = {
// //   title: meta.title,
// // }

export default function GlossaryRoute() {
  return (
    <div>
      <HowTo />
    </div>
  )
}
