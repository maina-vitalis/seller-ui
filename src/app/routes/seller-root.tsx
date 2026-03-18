import { Outlet, useOutletContext } from "react-router-dom"
import { SellerLayout } from "@/shared/layouts/seller-layout"
import type { UserProfile } from "@/features/auth/types"

type ProtectedContext = {
  user: UserProfile
}

export function SellerRoot() {
  const { user } = useOutletContext<ProtectedContext>()

  return (
    <SellerLayout user={user}>
      <Outlet />
    </SellerLayout>
  )
}
