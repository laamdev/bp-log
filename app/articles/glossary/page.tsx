import { Metadata } from "next"

//@ts-expect-error
import Glossary, { meta } from "@/components/markdown/glossary.mdx"

export const metadata: Metadata = {
  title: meta.title,
}

export default function GlossaryRoute() {
  return (
    <div>
      <Glossary />
    </div>
  )
}
