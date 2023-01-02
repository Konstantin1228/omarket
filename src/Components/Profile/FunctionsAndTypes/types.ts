import { ItemsInCart } from "../../../redux/cart/types"
import { userData } from "../Components/RegProfile/RegistrationIndex"

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
    haveDeliviryAdresses: boolean
}
export interface DeliviryAddress1 {
    city: string,
    isDefault: boolean,
    comment?: string
}

export interface SearchAdressOrCard {
    filterOrders: FilterOrders
    setFilterOrders: React.Dispatch<React.SetStateAction<FilterOrders>>
}

export interface Orders {
    itemsInCart: ItemsInCart[]
    orderInformation: {
        adress: string
        comment: string
        deliviryCost: string
        orderDate: string
        orderNumber: string
        status: string
    }
    bankCardInformation: {
        bankCard: string
        scheme: string
    }
}

export interface ModalWindowCheckProps {
    active: {
        condition: boolean,
        itemIdx: number
    }
    setActive: React.Dispatch<React.SetStateAction<{ condition: boolean; itemIdx: number; }>>
    orderDetails: Orders
}

export interface ShapeComponents {
    nameSurname: string
    deliviryAddress: string
    userEmail: string
}

export interface RegProfileProps {
    setStage: React.Dispatch<React.SetStateAction<number>>
    setUserData?: React.Dispatch<React.SetStateAction<userData | undefined>>
    userData?: userData
}

export interface FilterOrders {
    adresses: {
        adress: string
        isActive: boolean
    }[]
    payment: {
        paymentType: string
        isActive: boolean
    }[]
}

export interface BankCard {
    bankCard: string
    date: string
    CVC: string
}