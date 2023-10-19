import { ArticleCard } from "@/components/home/article-card"
import { GuidelinesCard } from "@/components/home/guidelines-card"
import { HowToCard } from "@/components/home/how-to-card"
import { WelcomeCard } from "@/components/home/welcome-card"

export default function HomePage() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <WelcomeCard />
        <div className="grid grid-cols-2 gap-4">
          <ArticleCard label="Guidelines" url="/articles/guidelines" />
          <ArticleCard label="How-to" url="/articles/how-to" />
          <ArticleCard label="Advice" url="/articles/advice" />
          <ArticleCard label="Glossary" url="/articles/glossary" />
        </div>
      </div>
    </div>
  )
}
