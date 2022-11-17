export interface ToastSlice {
    toasts: ItemType[]
}
export interface ItemType {
    id: number
    title: string
    img: string
    message?: string
    isComplete?: boolean
    weight: number
    typeOfUnit: string
    type: string
}
export interface Item {
    id: number
    title: string
    img: string
    typeOfUnit: string
    weight: number
    type: string
}
export interface ActionStatus {
    message: string
    isComplete: boolean
    type: string
}
