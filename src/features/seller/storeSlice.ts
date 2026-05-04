import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface StoreState {
  activeStoreId: string | null
}

const initialState: StoreState = {
  activeStoreId: localStorage.getItem("activeStoreId"), // Persist selection
}

const storeSlice = createSlice({
  name: "activeStore",
  initialState,
  reducers: {
    setActiveStore(state, action: PayloadAction<string>) {
      state.activeStoreId = action.payload
      localStorage.setItem("activeStoreId", action.payload)
    },
  },
})
export const { setActiveStore } = storeSlice.actions
export default storeSlice.reducer
