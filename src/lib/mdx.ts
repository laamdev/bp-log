import fs from "fs"
import { compileMDX } from "next-mdx-remote/rsc"
import path from "path"

const rootDirectory = path.join(process.cwd(), "src", "content")

export const getGuideBySlug = async (slug: string) => {
  const realSlug = slug.replace(/\.mdx$/, "")
  const filePath = path.join(`${rootDirectory}/guides`, `${realSlug}.mdx`)

  const fileContent = fs.readFileSync(filePath, { encoding: "utf8" })

  const { frontmatter, content } = await compileMDX({
    source: fileContent,
    options: { parseFrontmatter: true },
  })

  return { meta: { ...frontmatter, slug: realSlug }, content }
}

export const getAllGuidesMeta = async () => {
  const files = fs.readdirSync(`${rootDirectory}/guides`)

  let guides = []

  for (const file of files) {
    const { meta } = await getGuideBySlug(file)
    guides.push(meta)
  }

  return guides
}
