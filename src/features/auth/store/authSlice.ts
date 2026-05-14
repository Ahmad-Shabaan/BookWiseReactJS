// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

type initialState = {
  user: {
    id: number;
    username: string;
    email: string;
  } | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
};
const initialState: initialState = {
  user: null,
  expiresAt: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user      = action.payload.user;
      state.isAuthenticated = true;
      state.expiresAt = Date.now() + action.payload.expiresIn * 1000;
    },
    clearUser(state) {
      state.user      = null;
      state.expiresAt = null;
      state.isAuthenticated = false;

    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;