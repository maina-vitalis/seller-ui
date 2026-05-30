import { baseApi } from "@/shared/api/base-api"
import type { GenericFormData } from "axios"

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<null, GenericFormData>({
      query: (productData: GenericFormData) => ({
        url: "/product",
        method: "POST",
        data: productData,
      }),
    }),
  }),
})

export const { useCreateProductMutation } = productApi
