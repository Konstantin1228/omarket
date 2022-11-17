import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BankCard } from "../../Components/Cart/FunctionsAndTypes/types";
import { itemType } from "../../Components/Catalog/CatalogItem";
import { CartSliceState, GeneralInformation, getCartFromLS, ItemsInCart, itemsOperationWithCount, UserInformationObj } from "./types";

const { items } = getCartFromLS()
const initialState: CartSliceState = {
  itemsInCart: items,
  userInformation: UserInformationObj,
  //@ts-ignore
  bigItemInformation: undefined,
  isActivePopup: false
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ItemsInCart>) {
      const findItem = state.itemsInCart.find((el) => el.title === action.payload.title && el.weight === action.payload.weight);
      findItem ? findItem.count++ : state.itemsInCart.push(action.payload)
      const json = JSON.stringify(state.itemsInCart)
      localStorage.setItem("items", json)
    },
    countPlus(state, action: PayloadAction<itemsOperationWithCount>) {
      const findItem = state.itemsInCart.find(
        ({ title, weight }) =>
          title === action.payload.title &&
          weight === action.payload.weight
      );
      if (findItem) {
        findItem.count++
      }
      const json = JSON.stringify(state.itemsInCart)
      localStorage.setItem("items", json)
    },
    countMinus(state, action: PayloadAction<itemsOperationWithCount>) {
      const findItem = state.itemsInCart.find((el) => el.title === action.payload.title && el.weight === action.payload.weight);
      if (findItem) {
        findItem.count--
        if (findItem.count == 0) {
          state.itemsInCart.splice(state.itemsInCart.indexOf(findItem), 1)
        }
      }
      const json = JSON.stringify(state.itemsInCart)
      localStorage.setItem("items", json)
    },
    deleteItem(state, action: PayloadAction<itemsOperationWithCount>) {
      const findItem = state.itemsInCart.find((el) => el.title === action.payload.title && el.weight === action.payload.weight);
      if (findItem) {
        state.itemsInCart.splice(state.itemsInCart.indexOf(findItem), 1)
      }
      const json = JSON.stringify(state.itemsInCart)
      localStorage.setItem("items", json)
    },
    clearCart(state) {
      state.itemsInCart.splice(0, state.itemsInCart.length)
      const json = JSON.stringify(state.itemsInCart)
      localStorage.setItem("items", json)
    },
    setGeneralInformation(state, action: PayloadAction<GeneralInformation>) {
      state.userInformation.generalInformation = action.payload
    },
    setBankCardInformation(state, action: PayloadAction<BankCard>) {
      state.userInformation.bankCardInformation = action.payload
    },
    openPopup(state, action: PayloadAction<itemType>) {
      state.bigItemInformation = action.payload
      state.isActivePopup = true
    },
    closePopup(state) {
      state.isActivePopup = false
    }
  },
});

export const { addToCart, countPlus, countMinus, deleteItem, clearCart, setGeneralInformation, setBankCardInformation, openPopup, closePopup } = cartSlice.actions;

export default cartSlice.reducer;
