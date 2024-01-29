import localFont from "next/font/local"

export const aeonikMono = localFont({
  src: [
    {
      path: "../public/fonts/aeonik-mono/light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-mono/regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-mono/bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-aeonikMono",
})

export const aeonikSans = localFont({
  src: [
    {
      path: "../public/fonts/aeonik-sans/air.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-sans/air-italic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/aeonik-sans/thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-sans/thin-italic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/aeonik-sans/light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-sans/light-italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/aeonik-sans/regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-sans/regular-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/aeonik-sans/regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-sans/regular-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/aeonik-sans/medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-sans/medium-italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/aeonik-sans/bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-sans/bold-italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/aeonik-sans/black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/aeonik-sans/black-italic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-aeonikSans",
})
