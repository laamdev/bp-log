import Image from "next/image"

import { getGuideBySlug } from "@/lib/mdx"

interface Params {
  slug: string
}

// // interface Meta {
// //   title: string
// //   slug: string
// //   image: string
// //   animation: string
// // }

const getPageContent = async (slug: string) => {
  const { meta, content } = await getGuideBySlug(slug)
  return { meta, content }
}

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { meta }: any = await getPageContent(params.slug)
  return { title: meta.title }
}

export default async function GuidePage({ params }: { params: Params }) {
  const { meta, content }: { meta: any; content: any } = await getPageContent(
    params.slug
  )

  return (
    <section className="bg-card mx-auto max-w-prose rounded-xl">
      <Image
        src={meta.image}
        alt={meta.title}
        width={1920}
        height={1080}
        className="rounded-t-xl bg-white bg-cover bg-center"
      />
      <div className="prose px-4 py-8">{content}</div>
    </section>
  )
}
