  import { requestJson } from "@/shared/api/http-client"
import type { SellerOverview, Store } from "@/features/seller/types"
import { baseApi } from "@/shared/api/base-api"

export const sellerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStores: builder.query<Store[], void>({
      query: () => ({
        url: "/vendor-store",
        method: "GET",
      }),

      providesTags: ["VendorStores"],
    }),
  }),
})

export const { useGetAllStoresQuery } = sellerApi

export async function fetchSellerOverview(
  signal?: AbortSignal
): Promise<SellerOverview> {
  return requestJson<SellerOverview>("/seller/overview", {
    method: "GET",
    signal,
  })
}
