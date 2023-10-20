"use client"

import { Player } from "@lottiefiles/react-lottie-player"

export const LottieAnimation = ({ animation }: { animation: any }) => {
  return <Player autoplay loop src={animation} />
}
