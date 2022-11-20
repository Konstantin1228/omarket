import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType, ActionStatus, ToastSlice, Item } from "./types";

const initialState: ToastSlice = {
    toasts: []
};

export const toastsSlice = createSlice({
    name: "toasts",
    initialState: initialState,
    reducers: {
        addItemToasts(state, action: PayloadAction<Item>) {
            const { title, img, weight, typeOfUnit, count } = action.payload;
            let uniqueId = 0;
            function generateUniqueId() {
                const id = Math.floor(Math.random() * 100)
                state.toasts.find((el) => el.id === id) ? generateUniqueId() : uniqueId = id
            };
            generateUniqueId()
            state.toasts = [...state.toasts, { title, id: uniqueId, img, count, weight, typeOfUnit }]
        },
        addStatusToasts(state, action: PayloadAction<ActionStatus>) {
            const { message, isComplete } = action.payload
            let uniqueId = 0;
            function generateUniqueId() {
                const id = Math.floor(Math.random() * 1000)
                state.toasts.find((el) => el.id === id) ? generateUniqueId() : uniqueId = id
            };
            generateUniqueId()
            state.toasts = [...state.toasts, { message, id: uniqueId, isComplete }]
        },
        closeToast(state, action: PayloadAction<number>) {
            state.toasts = state.toasts.filter((el) => el.id !== action.payload)
        },
        clearToasts(state) {
            state.toasts = []
        }
    },
});

export const { addItemToasts, addStatusToasts, closeToast, clearToasts } = toastsSlice.actions;

export default toastsSlice.reducer;

