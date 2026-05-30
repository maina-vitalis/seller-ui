import { baseApi } from "@/shared/api/base-api"

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<null, FormData>({
      query: (productData: FormData) => ({
        url: "/product",
        method: "POST",
        data: productData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
  }),
})

export const { useCreateProductMutation } = productApi
