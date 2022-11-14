export interface UserSlice {
    isAuth: boolean
    mainInformation: {
        telephone: string
        country: string,
    }
    authorizationOrLogin: {
        stage: number,
        type: string
    },
    canEditProfile: boolean,
    isUserAuth: boolean
}

export interface NextStage {
    stage: number,
    type: string
}
export interface SetCountryAndTel {
    telephone: string,
    country?: string
}
export interface BankCard {
    bankCard: string
    date: string
    CVC: string
    scheme: string
}
export interface BankCards {
    bankCards: BankCard[]
    haveBankCards: boolean
}
