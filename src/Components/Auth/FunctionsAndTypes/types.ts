export interface LoginInterface {
    country: string
    tel: string
    password: string
}
export interface PasswordRecoveryInterface {
    tel: string
}
export interface RegIndexForm {
    tel: string,
    country: string
}

export interface NewPasswordForm {
    firstInput: string
    secondInput: string
}