// // "use client"

// // import { MouseEvent } from "react"
// // import { motion, useMotionTemplate, useMotionValue } from "framer-motion"

// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card"

// // export const HowToCard = () => {
// //   return (
// //     <Card className="bg-primary text-primary-foreground border-0">
// //       <CardHeader className="space-y-1">
// //         <CardTitle className="mb-4 text-3xl font-bold">How to?</CardTitle>
// //         <CardDescription>x</CardDescription>
// //       </CardHeader>
// //       <CardContent className="grid gap-4">x </CardContent>
// //     </Card>
// //   )
// // }

"use client"

import { MouseEvent } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"

export const HowToCard = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect()

    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className="bg-card group relative rounded-xl border px-8 py-16 shadow-2xl"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(251, 255, 44, 0.25),
              transparent 80%
            )
          `,
        }}
      />
      <div>
        <h3 className="text-base font-semibold leading-7 text-sky-500">
          Byline
        </h3>
        <div className="mt-2 flex items-center gap-x-2">
          <span className="text-5xl font-bold tracking-tight text-white">
            Hero
          </span>
        </div>
        <p className="mt-6 text-base leading-7 text-zinc-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit, facilis illum
          eum ullam nostrum atque quam.
        </p>
      </div>
    </div>
  )
}
