export type itemsInCart = {
    title: string;
    count: number;
    price: number;
    weight: number;
    points: number;
    image: string;
    discounts: number;
    tags: string;
    totalPrice: number;
    totalPoints: number;
    typeOfUnit: string
};
export interface cartSliceState {
    itemsInCart: itemsInCart[];
    totalPrice: number;
}
export type itemsOperationWithCount = {
    title: string;
    weight: number;
}