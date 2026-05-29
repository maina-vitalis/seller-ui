import { baseApi } from "@/shared/api/base-api"
import type { CreateProductInput } from "../types"

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<null, CreateProductInput>({
      query: () => ({
        url: "/product",
        method: "POST",
      }),
    }),
  }),
})

export const { useCreateProductMutation } = productApi
