import { ReactNode } from "react"
import { SellerSidebar } from "./seller-sidebar"
import { SellerTopbar } from "./seller-topbar"
import type { UserProfile } from "@/features/auth/types"

type SellerLayoutProps = {
  user: UserProfile
  children: ReactNode
}

export function SellerLayout({ user, children }: SellerLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <SellerSidebar />
      <div className="flex-1 flex flex-col">
        <SellerTopbar user={user} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}