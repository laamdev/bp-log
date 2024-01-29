export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "BP Log",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  publicNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  privateNav: [
    {
      title: "Dashboard",
      href: "/dashboard/overview",
    },
    {
      title: "Profile",
      href: "/profile",
    },
  ],
  // // links: {
  // //   twitter: "https://twitter.com/shadcn",
  // //   github: "https://github.com/shadcn/ui",
  // //   docs: "https://ui.shadcn.com",
  // // },
}
