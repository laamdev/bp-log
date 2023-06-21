export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Next.js",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  privateNav: [
    {
      title: "Overview",
      href: "/dashboard/overview",
    },
    {
      title: "History",
      href: "/dashboard/history",
    },
    {
      title: "Medication",
      href: "/dashboard/medication",
    },
  ],
  publicNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
