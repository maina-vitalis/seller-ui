import type { SellerOverview } from "@/features/seller/types"

type SellerOverviewState = {
  isLoading: boolean
  data: SellerOverview | null
  error: string | null
}

export function useSellerOverview(): SellerOverviewState {}
