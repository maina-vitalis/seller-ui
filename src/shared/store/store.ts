import { configureStore } from "@reduxjs/toolkit"
import activeStoreReducer from "../../features/seller/storeSlice"

import { baseApi } from "@/shared/api/base-api"

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    activeStore: activeStoreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
