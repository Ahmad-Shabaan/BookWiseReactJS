import { createSlice } from "@reduxjs/toolkit";

type Theme = "dark" | "light";
// const getInitialTheme = (): Theme => {
//   if (typeof window === "undefined") return "dark";
//   const stored = localStorage.getItem("theme");
//   if (stored === "dark" || stored === "light") return stored;
//   return "dark";
// };

const themeSlice = createSlice({
  name: "theme",
  initialState: "dark" as Theme,
  reducers: {
    toggleTheme(state) {
      return state === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
