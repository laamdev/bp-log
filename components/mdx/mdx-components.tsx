import Image from "next/image"
import Link from "next/link"
import { useMDXComponent } from "next-contentlayer/hooks"

const CustomLink = ({ href, children }: { href: string; children: string }) => {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className="font-thin text-[#C4DBE0] hover:underline">
        {children}
      </Link>
    )
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className="font-thin text-[#C4DBE0] hover:underline">
        {children}
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-thin text-[#C4DBE0] hover:underline"
    >
      {children}
    </a>
  )
}

const CustomBullet = ({ children }: { children: string }) => {
  return <li className="list-disc">{children}</li>
}

const RoundedImage = ({ src, alt }: { src: string; alt: string }) => {
  return <Image src={src} alt={alt} className="rounded-lg" />
}

const components: any = {
  Image: RoundedImage,
  a: CustomLink,
  li: CustomBullet,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
