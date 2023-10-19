import Link from "next/link"

export const ArticleCard = ({ label, url }: { label: string; url: string }) => {
  return (
    <Link
      href={url}
      className="bg-primary text-primary-foreground flex items-center justify-center rounded-xl p-4 shadow"
    >
      <h3 className="text-center text-2xl font-semibold">{label}</h3>
    </Link>
  )
}
