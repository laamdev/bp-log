import localFont from "next/font/local"

export const telefraf = localFont({
  src: [
    {
      path: "../public/fonts/telegraf-ultralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/telegraf-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/telegraf-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/telegraf-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/telegraf-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/telegraf-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/telegraf-ultrabold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/telegraf-black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-telegraf",
})
