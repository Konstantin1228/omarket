export interface AddAdress {
    comment: string
    adress: string,
}
export interface cities {
    city: string,
    isDefault: boolean,
    comment?: string
}
export interface DeliviryAddress {
    cities: cities[]
}
export interface DeliviryAddress1 {
    city: string,
    isDefault: boolean,
    comment?: string
}