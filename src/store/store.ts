import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
// import { createMigrate } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import booksReducer from "@/features/books/store/booksSlice";
import authReducer from "@/features/auth/store/authSlice";



// what to do when state shape changes? Migrations! (optional, but recommended for production apps)
// const migrations = {
//   1: (state) => ({ ...state, ui: { ...state.ui, language: "en" } }), // add new field
//   2: (state) => {
//     delete state.ui.oldField;
//     return state;
//   }, // remove old field
// };

const persistConfig = {
  key: "root",
  storage,
  // version: 2, // bump this when your state shape changes
  // migrate: createMigrate(migrations, { debug: false }),
  whitelist: ["books" , "auth"], // ✅ only persist UI state
  // blacklist: ['auth'],  // ❌ never persist auth (security)
};
const rootReducer = combineReducers({
  auth: authReducer,
  books: booksReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist dispatches non-serializable actions internally
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});
export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
