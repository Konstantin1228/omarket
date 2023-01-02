import React, { useState } from 'react'
import SelectBar from './SelectBar/SelectBar'
import UserInformation from './UserInformation/UserInformation'
import MyOrders from './MyOrders/MyOrders'
import MyPatterns from './MyPatterns/MyPatterns'
import MyAdresses from './MyAdresses/MyAdresses'
import MyBankCards from './MyBankCards/MyBankCards'
import { useLocation } from 'react-router-dom'
import { FilterOrders } from '../FunctionsAndTypes/types'
import "./profile.scss"

const ProfileIndex: React.FC = () => {
    const location = useLocation().pathname
    const [filterOrders, setFilterOrders] = useState<FilterOrders>({ adresses: [{ adress: "", isActive: false }], payment: [{ paymentType: "", isActive: false }] })
    return (
        <div className="profile">
            <SelectBar filterOrders={filterOrders} setFilterOrders={setFilterOrders} />
            <div className="profile__parent">
                {location === "/profile" && <UserInformation />}
                {location === "/profile/myOrders" && <MyOrders setFilterOrders={setFilterOrders} filterOrders={filterOrders} />}
                {location === "/profile/myPatterns" && <MyPatterns />}
                {location === "/profile/myAdress" && <MyAdresses />}
                {location === "/profile/myBankCards" && <MyBankCards />}
            </div>
        </div>
    )
}

export { MyAdresses, MyOrders, MyBankCards, MyPatterns, ProfileIndex }