export interface ToastSlice {
    toasts: ItemType[]
}
export interface ItemType {
    id: number
    title?: string
    img?: string
    count?: number
    message?: string
    isComplete?: boolean
    weight?: number
    typeOfUnit?: string
}
export interface Item {
    id: number
    title: string
    count: number
    img: string
    typeOfUnit: string
    weight: number
}
export interface ActionStatus {
    message: string
    isComplete: boolean
}
