import { BankCard } from "../../Components/Cart/FunctionsAndTypes/types";
import { ItemType } from "../../Components/Home/CatalogItem";
export interface CartSliceState {
    itemsInCart: ItemsInCart[];
    userInformation: UserInformation
    bigItemInformation: ItemType
    isActivePopup: boolean
}
export const UserInformationObj = {
    generalInformation: {
        adress: "",
        comment: "",
        flat: "",
        floor: "",
        typeofBankCard: "",
        writeOffBonuses: 0,
        deliviryCost: 0
    },
    bankCardInformation: {
        bankCard: "",
        date: "",
        CVC: "",
        scheme: ""
    },
}

export interface ItemsInCart {
    title: string;
    count: number;
    price: number;
    weight: number;
    points: number;
    image: string;
    tags: string;
    typeOfUnit: string
    defaultPrice?: number
};
export const getCartFromLS = () => {
    const data = localStorage.getItem("items");
    const items = data ? JSON.parse(data) : [];
    return {
        items: items as ItemsInCart[],
    };
};
export interface UserInformation {
    generalInformation: GeneralInformation,
    bankCardInformation: BankCard
}

export type GeneralInformation = {
    adress: string
    comment: string
    flat: string
    floor: string
    writeOffBonuses: number
    deliviryCost: number
}

export type itemsOperationWithCount = {
    title: string;
    weight: number;
}