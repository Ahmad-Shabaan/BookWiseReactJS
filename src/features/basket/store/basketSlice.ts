import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "wishlist",
  initialState: {
    basketCount: 0,
  },
  reducers: {
    mergeBasketCount: (state, { payload: count }: { payload: number }) => {
      state.basketCount = count;
    },
    incrementBasketCount: (state) => {
      state.basketCount += 1;
    },
    decrementBasketCount: (state) => {
      state.basketCount -= 1;
    },
  },
});

export const {
  mergeBasketCount,
  incrementBasketCount,
  decrementBasketCount
} = basketSlice.actions;
export default basketSlice.reducer;
