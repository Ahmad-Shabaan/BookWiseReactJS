import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BooksState {
  category: string;
  rating: number;
  page: number;
  authorId: number ;
  searchQuery: string;
}

const initialState: BooksState = {
  category: "all",
  rating: 0,
  page: 1,
  authorId: 0,
  searchQuery: "",
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    // reducers will be added here in the future
    changeCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    changeAuthor: (state, action: PayloadAction<number>) => {
      // This reducer can be implemented to change the author in the state
      state.authorId = action.payload;
    },
    changePage: (state, action: PayloadAction<number>) => {
      // This reducer can be implemented to change the page number in the state
      state.page = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { changeCategory,setSearchQuery, changeAuthor, changePage } = booksSlice.actions;

export default booksSlice.reducer;
