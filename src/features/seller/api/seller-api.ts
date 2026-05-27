import { requestJson } from "@/shared/api/http-client"
import type { SellerOverview, Store } from "@/features/seller/types"
import { baseApi } from "@/shared/api/base-api"
import { mockSellerOverview } from "./mock-data"

export const sellerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSellerOverview: builder.query<SellerOverview, void>({
      queryFn: async () => {
        // Mock data - replace with real API call when backend is ready
        await new Promise((resolve) => setTimeout(resolve, 500))
        return { data: mockSellerOverview }
      },
      providesTags: ["SellerOverview"],
    }),

    getAllStores: builder.query<Store[], void>({
      query: () => ({
        url: "/vendor-store",
        method: "GET",
      }),

      providesTags: ["VendorStores"],
    }),
  }),
})

export const { useGetSellerOverviewQuery, useGetAllStoresQuery } = sellerApi

export async function fetchSellerOverview(
  signal?: AbortSignal
): Promise<SellerOverview> {
  return requestJson<SellerOverview>("/seller/overview", {
    method: "GET",
    signal,
  })
}
