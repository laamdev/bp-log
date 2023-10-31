import fs from "fs"
import path from "path"
import { compileMDX } from "next-mdx-remote/rsc"

const rootDirectory = path.join(process.cwd(), "content")

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
