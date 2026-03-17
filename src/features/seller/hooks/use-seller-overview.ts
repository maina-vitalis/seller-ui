import { useGetSellerOverviewQuery } from "@/features/seller/api/seller-api"
import type { SellerOverview } from "@/features/seller/types"
import { getRtkQueryErrorMessage } from "@/shared/api/rtk-error"

type SellerOverviewState = {
  isLoading: boolean
  data: SellerOverview | null
  error: string | null
}

export function useSellerOverview(): SellerOverviewState {
  const { data, error, isLoading } = useGetSellerOverviewQuery()

  return {
    isLoading,
    data: data ?? null,
    error: getRtkQueryErrorMessage(error),
  }
}
