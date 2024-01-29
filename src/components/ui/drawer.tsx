import { ReactNode } from "react"
import { Drawer as VaulDrawer } from "vaul"

export const Drawer = ({ children }: { children: ReactNode }) => {
  return (
    <VaulDrawer.Root>
      <VaulDrawer.Trigger>Open</VaulDrawer.Trigger>
      <VaulDrawer.Portal>
        <VaulDrawer.Content>{children}</VaulDrawer.Content>
        <VaulDrawer.Overlay />
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  )
}
