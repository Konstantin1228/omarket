import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { initialType } from "./types";
const initialState: initialType = {
    stage: 1,
    canTakeNewStep: false,

};
export const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {
        setCanTakeNewStep(state,action:PayloadAction<any>){
            
        }
    },
});

export const {  setCanTakeNewStep} = orderSlice.actions;

export const selectCart = (state: RootState) => state.orderSlice;

export default orderSlice.reducer;
