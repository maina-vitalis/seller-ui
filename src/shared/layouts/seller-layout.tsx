import type { ReactNode } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SellerSidebar } from "./seller-sidebar"
import { SellerTopbar } from "./seller-topbar"
import type { UserProfile } from "@/features/auth/types"

type SellerLayoutProps = {
  user: UserProfile
  children: ReactNode
}

export function SellerLayout({ user, children }: SellerLayoutProps) {
  return (
    <SidebarProvider>
      <SellerSidebar />
      <SidebarInset>
        <SellerTopbar user={user} />
        <div className="flex flex-1 flex-col gap-4 p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
