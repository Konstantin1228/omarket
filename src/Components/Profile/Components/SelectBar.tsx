import { FormControlLabel } from '@mui/material'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import React, { memo, useEffect, useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FilterOrders } from '../ProfileIndex'
export interface SearchAdressOrCard {
    filterOrders: FilterOrders
    setFilterOrders: React.Dispatch<React.SetStateAction<FilterOrders>>
}
const SelectBar: React.FC<SearchAdressOrCard> = ({ filterOrders, setFilterOrders }) => {
    const location = useLocation().pathname

    return (
        <div className="profile__left">
            <ul className="profile__left-ul">
                <NavLink to="/profile" className={() => `profile__left-ul-${location === "/profile" ? `liActive` : `li`}`} >
                    <div className="profile__left-ul-li-svg">
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 1.66732C4.52724 1.66732 3.33333 2.86123 3.33333 4.33398C3.33333 5.80674 4.52724 7.00065 6 7.00065C7.47276 7.00065 8.66667 5.80674 8.66667 4.33398C8.66667 2.86123 7.47276 1.66732 6 1.66732ZM2 4.33398C2 2.12485 3.79086 0.333984 6 0.333984C8.20914 0.333984 10 2.12485 10 4.33398C10 6.54312 8.20914 8.33398 6 8.33398C3.79086 8.33398 2 6.54312 2 4.33398ZM3.33333 11.0007C2.22876 11.0007 1.33333 11.8961 1.33333 13.0007C1.33333 13.3688 1.03486 13.6673 0.666667 13.6673C0.298477 13.6673 0 13.3688 0 13.0007C0 11.1597 1.49239 9.66732 3.33333 9.66732H8.66667C10.5076 9.66732 12 11.1597 12 13.0007C12 13.3688 11.7015 13.6673 11.3333 13.6673C10.9651 13.6673 10.6667 13.3688 10.6667 13.0007C10.6667 11.8961 9.77124 11.0007 8.66667 11.0007H3.33333Z" fill="#0D0D0D" />
                            <defs>
                                <linearGradient id="paint0_linear_2015_76691" x1="14.4375" y1="4.29232" x2="0.556285" y2="16.7854" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#00953F" />
                                    <stop offset="1" stopColor="#006834" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="profile__left-ul-li-text">
                        Профиль
                    </div>
                </NavLink>
                <NavLink to="myOrders" className={() => `profile__left-ul-${location === "/profile/myOrders" ? `liActive` : `li`}`} >
                    <div className="profile__left-ul-li-svg">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.76205 1.66741L3.00674 9.75786C3.01579 9.82464 3.03474 9.88828 3.06205 9.94726C3.14427 10.1248 3.30229 10.26 3.49457 10.3115C3.55331 10.3273 3.61487 10.3351 3.67784 10.3341H11.0007C11.2951 10.3341 11.5546 10.141 11.6392 9.85897L13.6392 3.19231C13.6998 2.99046 13.6613 2.77186 13.5355 2.60279C13.4097 2.43372 13.2114 2.33408 13.0007 2.33408H3.21363L2.99437 0.908871C2.98616 0.849282 2.97007 0.792207 2.94719 0.73873C2.90566 0.641346 2.84207 0.55699 2.76351 0.49087C2.69063 0.42941 2.60439 0.383292 2.50976 0.357494C2.45021 0.341185 2.38772 0.333016 2.32378 0.334076H1.00065C0.632461 0.334076 0.333984 0.632553 0.333984 1.00074C0.333984 1.36893 0.632461 1.66741 1.00065 1.66741H1.76205ZM4.23928 9.00074L3.41876 3.66741H12.1046L10.5046 9.00074H4.23928Z" fill="#0D0D0D" />
                            <path d="M5.66732 12.3341C5.66732 13.0705 5.07036 13.6674 4.33398 13.6674C3.5976 13.6674 3.00065 13.0705 3.00065 12.3341C3.00065 11.5977 3.5976 11.0007 4.33398 11.0007C5.07036 11.0007 5.66732 11.5977 5.66732 12.3341Z" fill="#0D0D0D" />
                            <path d="M11.6673 12.3341C11.6673 13.0705 11.0704 13.6674 10.334 13.6674C9.5976 13.6674 9.00065 13.0705 9.00065 12.3341C9.00065 11.5977 9.5976 11.0007 10.334 11.0007C11.0704 11.0007 11.6673 11.5977 11.6673 12.3341Z" fill="#0D0D0D" />
                        </svg>
                    </div>
                    <div className="profile__left-ul-li-text">
                        Мои заказы
                    </div>
                </NavLink>
                <NavLink to="myPatterns" className={() => `profile__left-ul-${location === "/profile/myPatterns" ? `liActive` : `li`}`} >
                    <div className="profile__left-ul-li-svg">
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.666016 1.66732C0.666016 0.930939 1.26297 0.333984 1.99935 0.333984H7.33268C7.50949 0.333984 7.67906 0.404222 7.80409 0.529247L11.1374 3.86258C11.2624 3.9876 11.3327 4.15717 11.3327 4.33398V12.334C11.3327 13.0704 10.7357 13.6673 9.99935 13.6673H1.99935C1.26297 13.6673 0.666016 13.0704 0.666016 12.334V1.66732ZM9.72321 4.33398L7.33268 1.94346V4.33398H9.72321ZM5.99935 1.66732L1.99935 1.66732V12.334H9.99935V5.66732H6.66602C6.29783 5.66732 5.99935 5.36884 5.99935 5.00065V1.66732ZM3.33268 7.66732C3.33268 7.29913 3.63116 7.00065 3.99935 7.00065H7.99935C8.36754 7.00065 8.66602 7.29913 8.66602 7.66732C8.66602 8.03551 8.36754 8.33398 7.99935 8.33398H3.99935C3.63116 8.33398 3.33268 8.03551 3.33268 7.66732ZM3.33268 10.334C3.33268 9.96579 3.63116 9.66732 3.99935 9.66732H7.99935C8.36754 9.66732 8.66602 9.96579 8.66602 10.334C8.66602 10.7022 8.36754 11.0007 7.99935 11.0007H3.99935C3.63116 11.0007 3.33268 10.7022 3.33268 10.334Z" fill="#0D0D0D" />
                        </svg>
                    </div>
                    <div className="profile__left-ul-li-text">
                        Мои шаблоны
                    </div>
                </NavLink>
                <NavLink to="myAdress" className={() => `profile__left-ul-${location === "/profile/myAdress" ? `liActive` : `li`}`}>
                    <div className="profile__left-ul-li-svg">
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.99935 0.333984C3.06602 0.333984 0.666016 2.73398 0.666016 5.66732C0.666016 9.26732 5.33268 13.334 5.53268 13.534C5.66602 13.6007 5.86602 13.6673 5.99935 13.6673C6.13268 13.6673 6.33268 13.6007 6.46602 13.534C6.66602 13.334 11.3327 9.26732 11.3327 5.66732C11.3327 2.73398 8.93268 0.333984 5.99935 0.333984ZM5.99935 12.134C4.59935 10.8007 1.99935 7.93398 1.99935 5.66732C1.99935 3.46732 3.79935 1.66732 5.99935 1.66732C8.19935 1.66732 9.99935 3.46732 9.99935 5.66732C9.99935 7.86732 7.39935 10.8007 5.99935 12.134ZM5.99935 3.00065C4.53268 3.00065 3.33268 4.20065 3.33268 5.66732C3.33268 7.13398 4.53268 8.33398 5.99935 8.33398C7.46602 8.33398 8.66602 7.13398 8.66602 5.66732C8.66602 4.20065 7.46602 3.00065 5.99935 3.00065ZM5.99935 7.00065C5.26602 7.00065 4.66602 6.40065 4.66602 5.66732C4.66602 4.93398 5.26602 4.33398 5.99935 4.33398C6.73268 4.33398 7.33268 4.93398 7.33268 5.66732C7.33268 6.40065 6.73268 7.00065 5.99935 7.00065Z" fill="#0D0D0D" />
                        </svg>
                    </div>
                    <div className="profile__left-ul-li-text">
                        Мои адреса
                    </div>
                </NavLink>
                <NavLink to="myBankCards" className={() => `profile__left-ul-${location === "/profile/myBankCards" ? `liActive` : `li`}`}>
                    <div className="profile__left-ul-li-svg">
                        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.6673 1.99935C13.6673 1.26297 13.0704 0.666016 12.334 0.666016H1.66732C0.930937 0.666016 0.333984 1.26297 0.333984 1.99935V9.99935C0.333984 10.7357 0.930938 11.3327 1.66732 11.3327H12.334C13.0704 11.3327 13.6673 10.7357 13.6673 9.99935V1.99935ZM12.334 3.33268H1.66732V1.99935L12.334 1.99935V3.33268ZM1.66732 5.33268H12.334V9.99935H1.66732L1.66732 5.33268Z" fill="#0D0D0D" />
                        </svg>
                    </div>
                    <div className="profile__left-ul-li-text">
                        Моя карта
                    </div>
                </NavLink>
            </ul>
            {location === "/profile/myOrders" &&
                (filterOrders.adresses[0].adress || filterOrders.payment[0].paymentType) &&
                <ul className="profile__left-ul">
                    <div className="profile__left-ul-li-title bold">Адрес</div>
                    <ul className="profile__left-ul-checkboxes">
                        {filterOrders.adresses.map((userAdress) =>
                            <li className="profile__left-ul-checkboxes-li" key={userAdress.adress} >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={userAdress.isActive}
                                            onChange={() => setFilterOrders(({ adresses, payment }) => ({
                                                adresses: adresses.map(({ adress, isActive }) => { return { adress, isActive: adress === userAdress.adress ? !isActive : isActive } }), payment
                                            }))}
                                        />
                                    }
                                    label={userAdress.adress} />
                            </li>
                        )}
                    </ul>
                    <div className="profile__left-ul-li-title bold">Способ оплаты</div>
                    <ul className="profile__left-ul-checkboxes">
                        {filterOrders.payment.map((typeOfPayment, idx) =>
                            <li className="profile__left-ul-checkboxes-li" key={typeOfPayment.paymentType}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={typeOfPayment.isActive}
                                            onChange={() => setFilterOrders(({ adresses, payment }) => ({
                                                adresses: adresses, payment: payment.map(({ paymentType, isActive }) => { return { paymentType, isActive: paymentType === typeOfPayment.paymentType ? !isActive : isActive } })
                                            }))}
                                        />
                                    }
                                    label={typeOfPayment.paymentType} />
                            </li>
                        )}
                    </ul>
                </ul>
            }
        </div >
    )
}

export default SelectBar 