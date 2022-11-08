import { ItemsInCart, } from "../../../redux/cart/types"

export interface stageType3 {
    setStage: React.Dispatch<React.SetStateAction<number>>
    withoutDiscount: number
    withDiscount: number
    totalPoints: number
    itemsInCart: ItemsInCart[]
}
export interface stageType {
    setStage: React.Dispatch<React.SetStateAction<number>>
    bankCard: React.Dispatch<React.SetStateAction<string>>
    withoutDiscount: number
    withDiscount: number
    totalPoints: number
    itemsInCart: ItemsInCart[]

}
export type IFormInputStage2 = {
    adress: string;
    flat: string;
    floor: string;
    comment: string;
    city: string
    writeOffBonuses: string
    deliviryCost: number;
}

export interface BankCard {
    bankCard: string
    date: string
    CVC: string
    scheme : string
}


