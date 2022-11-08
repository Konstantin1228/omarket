import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/slice";
import userSlice from "./user/slice";
export const store = configureStore({
  reducer: {
    cartSlice,
    userSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
