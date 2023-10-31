import advice from "@/public/animations/advice.json"
import glossary from "@/public/animations/glossary.json"
import guidelines from "@/public/animations/guidelines.json"
import howTo from "@/public/animations/how-to.json"

import { ArticleCard } from "@/components/home/article-card"
import { AuthCard } from "@/components/home/auth-card"
import { FactSheetCard } from "@/components/home/fact-sheet-card"
import { SectionHeading } from "@/components/shared/section-heading"

export default function HomeRoute() {
  return (
    <div className="grid gap-12">
      <div className="grid gap-4 md:grid-cols-2">
        <AuthCard />
        <FactSheetCard />
      </div>

      <section>
        <SectionHeading>Guides</SectionHeading>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <ArticleCard
            label="Guidelines"
            url="/guides/guidelines"
            animation={guidelines}
          />
          <ArticleCard label="How-to" url="/guides/how-to" animation={howTo} />
          <ArticleCard label="Advice" url="/guides/advice" animation={advice} />
          <ArticleCard
            label="Glossary"
            url="/guides/glossary"
            animation={glossary}
          />
        </div>
      </section>
    </div>
  )
}
