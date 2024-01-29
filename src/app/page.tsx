import { ArticleCard } from "@/components/home/article-card"
import { AuthCard } from "@/components/home/auth-card"
import { FactSheetCard } from "@/components/home/fact-sheet-card"
import { getAllGuidesMeta } from "@/lib/mdx"

export default async function HomeRoute() {
  const guides = await getAllGuidesMeta()
  const orderedGuides = guides.sort((a: any, b: any) => a.order - b.order)

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <AuthCard />
        <FactSheetCard />
      </div>

      <section>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {orderedGuides.map((guide: any) => (
            <ArticleCard
              label={guide.title}
              url={`/guides/${guide.slug}`}
              animation={guide.animation}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
