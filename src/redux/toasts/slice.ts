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
            const { title, img, type, weight, typeOfUnit } = action.payload;
            let uniqueId = 0;
            function generateUniqueId() {
                const id = Math.floor(Math.random() * 100)
                state.toasts.find((el) => el.id === id) ? generateUniqueId() : uniqueId = id
            };
            generateUniqueId()
            state.toasts = [...state.toasts, { title, id: uniqueId, img, type, weight, typeOfUnit }]
        },
        addStatusToasts(state, action: PayloadAction<ActionStatus>) {
            const { message, isComplete, type } = action.payload
            let uniqueId = 0;
            function generateUniqueId() {
                const id = Math.floor(Math.random() * 1000)
                state.toasts.filter((el) => el.id) ? generateUniqueId() : uniqueId = id
            };
            generateUniqueId()
            // state.toasts = [...state.toasts, { message, id: uniqueId, isComplete, type }]
        },
        closeToast(state, action: PayloadAction<number>) {
            state.toasts = state.toasts.filter((el) => el.id !== action.payload)
        }
    },
});

export const { addItemToasts, addStatusToasts, closeToast } = toastsSlice.actions;

export default toastsSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { NextStage, SetCountryAndTel, UserSlice } from "./types";

// const initialState: UserSlice = {
//     isAuth: localStorage.getItem("isLogged") === "true",
//     authorizationOrLogin: {
//         stage: 0,
//         type: ""
//     },
//     mainInformation: {
//         telephone: "",
//         country: "",
//     },
//     canEditProfile: false,
//     isUserAuth: false
// };

// export const userSlice = createSlice({
//     name: "cart",
//     initialState: initialState,
//     reducers: {
//         clearAuthLoginFields(state) {
//             state.authorizationOrLogin.stage = 0
//             state.authorizationOrLogin.type = ""
//         },
//         setNextStage(state, action: PayloadAction<NextStage>) {
//             state.authorizationOrLogin.stage = action.payload.stage
//             state.authorizationOrLogin.type = action.payload.type
//         },
//         setContryAndTel(state, action: PayloadAction<SetCountryAndTel>) {
//             state.mainInformation.telephone = action.payload.telephone
//             if (action.payload.country) state.mainInformation.country = action.payload.country
//         },
//         setUserInformation(state, action: PayloadAction<any>) {
//             Object.keys(action.payload).map((el, idx) => {
//                 if (Object.keys(action.payload)[idx] !== "password") {
//                     //@ts-ignore
//                     state.mainInformation[el] = Object.values(action.payload)[idx].stringValue
//                 }
//             })
//             state.isAuth = true
//         },
//         setIsUserAuth(state, action: PayloadAction<boolean>) {
//             state.isUserAuth = action.payload
//         },
//         setCanEditProfile(state, action: PayloadAction<boolean>) {
//             state.canEditProfile = action.payload
//         },
//     },
// });

// export const { clearAuthLoginFields, setNextStage, setContryAndTel, setUserInformation, setCanEditProfile, setIsUserAuth} = userSlice.actions;

// export default userSlice.reducer;
