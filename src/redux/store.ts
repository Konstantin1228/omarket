import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/slice";
import userSlice from "./user/slice";
import toastSlice from "./toasts/slice";
export const store = configureStore({
  reducer: {
    cartSlice,
    userSlice,
    toastSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
