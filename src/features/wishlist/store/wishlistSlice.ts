import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistBooks: [] as number[],
    // isWished: false,
    wishlistCount: 0,
  },
  reducers: {
    mergeWishlist: (state, { payload: ids }: { payload: number[] }) => {
      state.wishlistBooks = ids;
    },
    mergeWishlistCount: (state, { payload: count }: { payload: number }) => {
      state.wishlistCount = count;
    },
    optimisticToggle: (state, { payload: bookId }: { payload: number }) => {
      const idx = state.wishlistBooks.indexOf(bookId);
      if (idx === -1) {
        state.wishlistBooks.push(bookId);
        state.wishlistCount += 1;
      } else {
        state.wishlistBooks.splice(idx, 1);
        state.wishlistCount -= 1;
      }
    },
    revertToggle: (state, { payload: bookId }: { payload: number }) => {
      const idx = state.wishlistBooks.indexOf(bookId);
      if (idx === -1) {
        state.wishlistBooks.push(bookId);
        state.wishlistCount += 1;
      } else {
        state.wishlistBooks.splice(idx, 1);
        state.wishlistCount -= 1;
      }
    },
    // toggleIsWished: (state, { payload: bookId }: { payload: number }) => {
    //   state.isWished =
    //     state.wishlistBooks.findIndex((el) => el === bookId) === -1;
    // },
  },
});

export const { optimisticToggle, revertToggle, mergeWishlist, mergeWishlistCount } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
