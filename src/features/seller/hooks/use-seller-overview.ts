import { useEffect, useState } from "react"
import { fetchSellerOverview } from "@/features/seller/api/seller-api"
import { mockSellerOverview } from "@/features/seller/api/mock-data"
import type { SellerOverview } from "@/features/seller/types"

type SellerOverviewState = {
  isLoading: boolean
  data: SellerOverview | null
  error: string | null
}

export function useSellerOverview(): SellerOverviewState {
  const [state, setState] = useState<SellerOverviewState>({
    isLoading: false,
    data: mockSellerOverview,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    fetchSellerOverview(controller.signal)
      .then((data) => {
        setState({ isLoading: false, data, error: null })
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setState((currentState) => ({
            ...currentState,
            isLoading: false,
          }))
        }
      })

    return () => controller.abort()
  }, [])

  return state
}
