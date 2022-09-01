import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { cartSliceState, itemsInCart, itemsOperationWithCount } from "./types";
const initialState: cartSliceState = {
  itemsInCart: [],
  totalPrice: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action: PayloadAction<itemsInCart>) {
      if (action.payload.count !== 0) {
        const findItem = state.itemsInCart.find(
          (el) =>
            el.title === action.payload.title &&
            el.weight === action.payload.weight
        );
        if (findItem) {
          findItem.count++;
          findItem.totalPoints = findItem.totalPoints + findItem.totalPoints;

          if (findItem.tags == 'discount') {
            findItem.totalPrice = findItem.totalPrice + Math.round(action.payload.price - (action.payload.price / 100) * action.payload.discounts);

          } else {

            findItem.totalPrice = findItem.totalPrice + action.payload.price;
          }
        } else {
          state.itemsInCart.push(action.payload);
        }
      }
    },
    countPlus(state, action: PayloadAction<itemsOperationWithCount>) {
      const findItem = state.itemsInCart.find(
        (el) =>
          el.title === action.payload.title &&
          el.weight === action.payload.weight
      );
      if (findItem) {
        findItem.count++
        if (findItem.tags == 'discount') {
          findItem.totalPrice = findItem.totalPrice + Math.round(findItem.price - (findItem.price / 100) * findItem.discounts);
        } else {
          findItem.totalPrice = findItem.totalPrice + findItem.price;
        }
      }
    },
    countMinus(state, action: PayloadAction<itemsOperationWithCount>) {
      const findItem = state.itemsInCart.find(
        (el) =>
          el.title === action.payload.title &&
          el.weight === action.payload.weight
      );
      if (findItem) {
        findItem.count--
        if (findItem.count !== 0) {
          if (findItem.tags == 'discount') {
            findItem.totalPrice = findItem.totalPrice - Math.round(findItem.price - (findItem.price / 100) * findItem.discounts);
          } else {
            findItem.totalPrice = findItem.totalPrice - findItem.price;
          }
        } else {
          state.itemsInCart.splice(state.itemsInCart.indexOf(findItem), 1)
        }
      }
    },
    deleteItem(state, action: PayloadAction<itemsOperationWithCount>) {

      const findItem = state.itemsInCart.find(
        (el) =>
          el.title === action.payload.title &&
          el.weight === action.payload.weight
      );
      if (findItem) {
        state.itemsInCart.splice(state.itemsInCart.indexOf(findItem), 1)
      }
    },
  },
});

export const { addToCart, countPlus, countMinus, deleteItem } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cartSlice;

export default cartSlice.reducer;
