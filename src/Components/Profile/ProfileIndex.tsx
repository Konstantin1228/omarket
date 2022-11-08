import React, { useState } from 'react'
import "../../scss/components/Profile/profile.scss"
import SelectBar from './SelectBar'
import UserInformation from './Components/UserInformation'
import MyOrders from './Components/MyOrders'
import MyPatterns from './Components/MyPatterns'
import MyAdresses from './Components/MyAdresses'
import MyBankCards from './Components/MyBankCards'
import RegistrationProfileIndex from './Components/RegProfile/RegistrationIndex'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
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
    const { canEditProfile } = useAppSelector((state) => state.userSlice)
    const location = useLocation().pathname
    const [filterOrders, setFilterOrders] = useState<FilterOrders>({ adresses: [{ adress: "", isActive: false }], payment: [{ paymentType: "", isActive: false }] })
    return (
        <>
            {canEditProfile ?
                <div className="profile">
                    <SelectBar filterOrders={filterOrders} setFilterOrders={setFilterOrders} />
                    {location === "/profile" && <UserInformation />}
                    {location === "/profile/myOrders" && <MyOrders setFilterOrders={setFilterOrders} filterOrders={filterOrders} />}
                    {location === "/profile/myPatterns" && <MyPatterns />}
                    {location === "/profile/myAdress" && <MyAdresses />}
                    {location === "/profile/myBankCards" && <MyBankCards />}
                </div>
                :
                <RegistrationProfileIndex />
            }
        </>
    )
}

export default ProfileIndex