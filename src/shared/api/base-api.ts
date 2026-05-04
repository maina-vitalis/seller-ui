import { createApi } from "@reduxjs/toolkit/query/react"
import type { BaseQueryFn } from "@reduxjs/toolkit/query"
import type { AxiosError, AxiosRequestConfig, Method } from "axios"

import { apiClient } from "@/shared/api/axios-client"

type AxiosBaseQueryArgs = {
  url: string
  method?: Method
  data?: unknown
  params?: Record<string, unknown>
  signal?: AbortSignal
  headers?: Record<string, string>
}

type AxiosBaseQueryError = {
  status: number | string
  data: unknown
}

const axiosBaseQuery = (): BaseQueryFn<
  AxiosBaseQueryArgs,
  unknown,
  AxiosBaseQueryError
> => {
  return async ({ url, method = "GET", data, params, signal, headers }) => {
    try {
      const config: AxiosRequestConfig = {
        url,
        method,
        data,
        params,
        signal,
        headers,
      }

      const result = await apiClient.request(config)

      return { data: result.data }
    } catch (rawError) {
      const error = rawError as AxiosError

      return {
        error: {
          status: error.response?.status ?? "AXIOS_ERROR",
          data: error.response?.data ?? error.message,
        },
      }
    }
  }
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Auth", "SellerOverview", "VendorStores"],
  endpoints: () => ({}),
})
