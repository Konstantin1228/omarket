import { getDocs, query, collection, where, doc, setDoc } from 'firebase/firestore'
import React from 'react'
import { db } from '../../../firebase'
import { useAppSelector } from '../../../hooks/hooks'
import Cart_Item from '../../Cart/Components/CartItem/Cart_Item'
import { BankCard } from '../../Cart/FunctionsAndTypes/types'
import { DeliviryAddress1 } from '../../Profile/FunctionsAndTypes/types'
import "./modalWindow.scss"
interface ModalWindow {
    active: boolean
    setActive: React.Dispatch<React.SetStateAction<boolean>>
    type: string,
    itemName?: string
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
    deliviryAdresses?: DeliviryAddress1[]
    bankCards?: BankCard[]
}
const ModalWindow: React.FC<ModalWindow> = ({ active, setActive, type, itemName, setLoading, deliviryAdresses, bankCards }) => {
    const { itemsInCart } = useAppSelector((state) => state.cartSlice)
    const { writeOffBonuses, adress, deliviryCost, flat, floor } = useAppSelector((state) => state.cartSlice.userInformation.generalInformation)
    const { bankCard, scheme } = useAppSelector((state) => state.cartSlice.userInformation.bankCardInformation)
    const withDiscount = itemsInCart.reduce((previous, current) => previous + current.count * current.price, 0)

    const deleteItem = async () => {
        if (setLoading) {
            try {
                setLoading(true)
                const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
                const userRef = doc(db, 'users', q.docs[0].id);
                const setNewDocs = async () => {
                    if (deliviryAdresses) {
                        deliviryAdresses.map(async (el) => {
                            if (el.city === itemName) {
                                const newAdresses = deliviryAdresses.filter(adress => adress !== el)
                                await setDoc(userRef, {
                                    profileInformation: {
                                        otherInformation: {
                                            deliviryAdresses: [...newAdresses]
                                        },
                                    }
                                }, { merge: true });
                                setActive(false)
                            }
                        })
                    } else if (bankCards) {
                        bankCards.map(async (el) => {
                            if (el.bankCard === itemName) {
                                const newBankcards = bankCards.filter(bankCard => bankCard !== el)
                                await setDoc(userRef, {
                                    profileInformation: {
                                        otherInformation: {
                                            bankCards: [...newBankcards]
                                        },
                                    }
                                }, { merge: true });
                                setActive(false)
                            }
                        })
                    }
                }
                setNewDocs()
            } catch (error) {
                console.log(error);
            }
        }
    }

    const makeMain = async () => {
        if (setLoading) {
            try {
                const setNewDocs = async () => {
                    // setLoading(true)
                    const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
                    const userRef = doc(db, 'users', q.docs[0].id)
                    // const fads = [...adresses]
                    // console.log(fads[0].isDefault = false)
                    // adresses.map(async (el, idx) => {
                    //     if (el.city === itemName) {
                    //         adresses[idx].isDefault = true
                    //         await setDoc(userRef, {
                    //             profileInformation: {
                    //                 otherInformation: {
                    //                     deliviryAdresses: [...adresses]
                    //                 },
                    //             }
                    //         }, { merge: true });
                    //         dispatch(setUserAdresses(adresses))
                    //         setActive(false)
                    //         return
                    //     }
                    // })
                }
                setNewDocs()
            } catch (error) {
                console.log(error);
            }
        }
    }

    const deleteItemFromCart = () => {

    }

    return (
        <div className={active ? 'modal-active' : 'modal'} onClick={() => setActive(false)}>
            {/* e.stopPropagation()-прекращает передачу текущего события   */}
            {type === "items" &&
                <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__content-top">
                        <div className="modal__content-top-title">Заказ №976458</div>
                        <div className="modal__content-top-svg" onClick={() => setActive(false)}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="#0D0D0D" />
                            </svg>
                        </div>
                    </div>
                    <div className="modal__content-bottom">
                        <div className="cart__inner-notEmpty-left-items" >
                            {itemsInCart.map((obj) => <Cart_Item key={`${obj.title}__${obj.weight}`} {...obj} />)}
                        </div>
                    </div>
                </div>
            }
            {type === "check" &&
                <div className="modal__content-short" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__content-top">
                        <div className="modal__content-top-title">Заказ №976458</div>
                        <div className="modal__content-top-svg" onClick={() => setActive(false)}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="#0D0D0D" />
                            </svg>
                        </div>
                    </div>
                    <div className="modal__content-bottom">
                        <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-payment">
                            <div className="bold">Адрес доставки:</div>
                            <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-payment-multipleFields">
                                <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-payment-multipleFields-text">{adress}</div>
                                <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-payment-multipleFields-text">Квартира/офис {flat}</div>
                                <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-payment-multipleFields-text">Этаж {floor}</div>
                            </div>
                        </div>
                        <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-payment">
                            <div className="bold">Тип оплаты:</div>
                            <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-payment-text">{scheme?.split("")[0].toUpperCase() + scheme.slice(1)}</div>
                        </div>
                        <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-payment">
                            <div className="bold">Оплата:</div>
                            <div className='bankCard'>
                                <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" width={38} alt="" />
                                <div className="profile__adress__inner-bottom-bankCardElement-center">
                                    <svg width="5" height="5" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="2" cy="2" r="2" fill="#0D0D0D" />
                                    </svg>
                                    <svg width="5" height="5" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="2" cy="2" r="2" fill="#0D0D0D" />
                                    </svg>
                                    <svg width="5" height="5" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="2" cy="2" r="2" fill="#0D0D0D" />
                                    </svg>
                                    <svg width="5" height="5" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="2" cy="2" r="2" fill="#0D0D0D" />
                                    </svg>
                                </div>
                                <div className="profile__adress__inner-bottom-bankCardElement-left">
                                    <p className='text bold'>{bankCard.slice(-4)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-paymentWithBorder">
                            <div className="bold">Доставка:</div>
                            <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-payment-text">
                                {deliviryCost > 0 ? `${deliviryCost}₽` : "Бесплатно"}
                            </div>
                        </div>
                    </div>
                    <div className="cart__inner-notEmpty-makeOrder-grandTotal-price">
                        <div className="cart__inner-notEmpty-makeOrder-grandTotal-price-text">
                            Итоговая сумма:
                        </div>
                        <div className="cart__inner-notEmpty-makeOrder-grandTotal-price-text">
                            {withDiscount}₽
                        </div>
                    </div>
                    {Number(writeOffBonuses) > 0 &&
                        <div className="cart__inner-notEmpty-makeOrder-grandTotal-bonuses">
                            <div className="cart__inner-notEmpty-makeOrder-grandTotal-bonuses-text">
                                Оплата бонусами
                            </div>
                            <div className="cart__inner-notEmpty-makeOrder-grandTotal-bonuses-left">
                                <div className="cart__inner-notEmpty-makeOrder-grandTotal-bonuses-left-text-green">-{writeOffBonuses}</div>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "default" }}>
                                    <path d="M7.99984 2.66699C12.0498 2.66699 15.3332 4.45766 15.3332 6.66699V9.33366C15.3332 11.543 12.0498 13.3337 7.99984 13.3337C4.02184 13.3337 0.783837 11.6063 0.669837 9.45166L0.666504 9.33366V6.66699C0.666504 4.45766 3.94984 2.66699 7.99984 2.66699ZM7.99984 10.667C5.51984 10.667 3.3265 9.99566 1.99984 8.96699V9.33366C1.99984 10.5883 4.5885 12.0003 7.99984 12.0003C11.3398 12.0003 13.8918 10.647 13.9965 9.41233L13.9998 9.33366L14.0005 8.96699C12.6738 9.99499 10.4805 10.667 7.99984 10.667ZM7.99984 4.00033C4.5885 4.00033 1.99984 5.41233 1.99984 6.66699C1.99984 7.92166 4.5885 9.33366 7.99984 9.33366C11.4112 9.33366 13.9998 7.92166 13.9998 6.66699C13.9998 5.41233 11.4112 4.00033 7.99984 4.00033Z" fill="#00953F" />
                                </svg>
                            </div>
                        </div>
                    }
                </div>
            }
            {type.includes("confirmDelete") &&
                <div className="modal__content-short" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__content-top">
                        <div className="modal__content-top-title" style={{ textAlign: 'center' }}>
                            Вы действительно хотите удалить {type === "confirmDeleteAdress" ? "адрес" : "банковскую карточку"} {itemName} из списка?
                        </div>
                    </div>
                    <div className="modal__content-bottom" style={{ display: 'flex', gap: 30, justifyContent: 'center' }} >
                        <button type='button' className="modalButton" onClick={() => deleteItem()}>Да</button>
                        <button type='button' className="modalButton" onClick={() => setActive(false)}>Нет</button>
                    </div>
                </div>
            }
            {type === "makeMain" &&
                <div className="modal__content-short" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__content-top">
                        <div className="modal__content-top-title" style={{ textAlign: 'center' }}>Вы действительно хотите сделать адрес {`<<${itemName}>>`} основным?</div>
                    </div>
                    <div className="modal__content-bottom" style={{ display: 'flex', gap: 30, justifyContent: 'center' }} >
                        <button className="modalButton" onClick={() => makeMain()}>Да</button>
                        <span className="modalButton" onClick={() => setActive(false)}>Нет</span>
                    </div>
                </div>
            }
        </div >
    )
}
export default ModalWindow