import React, { useState } from 'react'
import "./styles/profile.scss"
import SelectBar from './Components/SelectBar'
import UserInformation from './Components/UserInformation'
import MyOrders from './Components/MyOrders'
import MyPatterns from './Components/MyPatterns'
import MyAdresses from './Components/MyAdresses'
import MyBankCards from './Components/MyBankCards'
import { useLocation } from 'react-router-dom'
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
const ProfileIndex: React.FC = () => {
    const location = useLocation().pathname
    const [filterOrders, setFilterOrders] = useState<FilterOrders>({ adresses: [{ adress: "", isActive: false }], payment: [{ paymentType: "", isActive: false }] })
    return (
        <div className="profile">
            <SelectBar filterOrders={filterOrders} setFilterOrders={setFilterOrders} />
            {location === "/profile" && <UserInformation />}
            {location === "/profile/myOrders" && <MyOrders setFilterOrders={setFilterOrders} filterOrders={filterOrders} />}
            {location === "/profile/myPatterns" && <MyPatterns />}
            {location === "/profile/myAdress" && <MyAdresses />}
            {location === "/profile/myBankCards" && <MyBankCards />}
        </div>
    )
}

export { MyAdresses, MyOrders, MyBankCards, MyPatterns, ProfileIndex }