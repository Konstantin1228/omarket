import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/slice";
import orderSlice from "./order/slice";
export const store = configureStore({
  reducer: {
    cartSlice,
    orderSlice: orderSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
