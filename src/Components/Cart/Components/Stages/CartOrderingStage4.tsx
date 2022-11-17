import { getDocs, query, collection, where, doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../../../firebase'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { clearCart } from '../../../../redux/cart/slice'
import ModalWindow from '../../../Other/ModalWindow'
interface SetStage {
    setStage: React.Dispatch<React.SetStateAction<number>>
}
const CartOrderingStage4: React.FC<SetStage> = ({ setStage }) => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true)
    const [activeModal, setAciveModal] = useState(false)
    const { bankCard, scheme, } = useAppSelector(state => state.cartSlice.userInformation.bankCardInformation)
    const { comment, adress, deliviryCost } = useAppSelector(state => state.cartSlice.userInformation.generalInformation)
    const { itemsInCart } = useAppSelector(state => state.cartSlice)
    const newDate = new Date()
    let orderDate = `${newDate.toLocaleDateString().replace("/", ".")}  
    ${newDate.getHours()}:${newDate.getMinutes().toString().length === 2 ? newDate.getMinutes() : `0${newDate.getMinutes()}`}`
    const userScheme = scheme.charAt(0).toUpperCase() + scheme.slice(1, scheme.length)
    useEffect(() => {
        const getData = async () => {
            try {
                const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
                const userRef = doc(db, 'users', q.docs[0].id);
                const ordersData = await getDoc(userRef)
                //@ts-ignore  
                const previousData = ordersData.data().profileInformation?.userOrders
                let uniqueOrderNumber = 0
                const generateOrderNumber = () => {
                    const newOrderNumber = Math.floor(Math.random() * 1000)
                    if (previousData && previousData.map((el: any) => el.orderInformation.orderNumber).find((orderNumber: any) => orderNumber === newOrderNumber)) {
                        generateOrderNumber()
                    } else {
                        uniqueOrderNumber = newOrderNumber
                    }
                }
                generateOrderNumber()
                previousData ?
                    await setDoc(userRef, {
                        profileInformation: {
                            userOrders: [...previousData, {
                                itemsInCart,
                                orderInformation: { orderNumber: uniqueOrderNumber, status: "Не доставлен", comment, adress, orderDate, deliviryCost },
                                bankCardInformation: { bankCard, scheme: userScheme, }
                            }]
                        }
                    }, { merge: true })
                    :
                    await setDoc(userRef, {
                        profileInformation: {
                            userOrders: [{
                                itemsInCart,
                                orderInformation: { orderNumber: uniqueOrderNumber, status: "Не доставлен", comment, adress, orderDate, deliviryCost },
                                bankCardInformation: { bankCard, scheme: userScheme }
                            }]
                        }
                    }, { merge: true });
            } catch (error) {
                console.log(error);
            }
        }
        getData()
        setLoading(false)

        return () => {
            dispatch(clearCart())
            setStage(1)
        }
    }, [])

    return (
        <div className="container">
            <ModalWindow active={activeModal} setActive={setAciveModal} type={'check'} />
            {loading ?
                <div className="container__loader">
                    <div className="lds-ring" ><div></div><div></div><div></div><div></div></div >
                    <div className="container__text">Подождите, пожалуйста, Ваш запрос в обработке</div>
                </div>
                :
                <>
                    {/* {typeof (data) == "string" &&
                        <div className="container__status">
                            <div className="container__status-svg">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.23223 1.23223C2.20854 0.255922 3.79146 0.255922 4.76777 1.23223L18 14.4645L31.2322 1.23223C32.2085 0.255922 33.7915 0.255922 34.7678 1.23223C35.7441 2.20854 35.7441 3.79146 34.7678 4.76777L21.5355 18L34.7678 31.2322C35.7441 32.2085 35.7441 33.7915 34.7678 34.7678C33.7915 35.7441 32.2085 35.7441 31.2322 34.7678L18 21.5355L4.76777 34.7678C3.79146 35.7441 2.20854 35.7441 1.23223 34.7678C0.255922 33.7915 0.255922 32.2085 1.23223 31.2322L14.4645 18L1.23223 4.76777C0.255922 3.79146 0.255922 2.20854 1.23223 1.23223Z" fill="white" />
                                </svg>
                            </div>
                            <div className="container__status-title">Ваш запрос был отклонён</div>
                            <div className="container__status-block">
                                <div className="container__status-block-text">Произошла ошибка в данных</div>
                                <div className="container__status-block-text"> Вы можете обратиться к тех поддержке по номеру телефона:</div>
                                <div className="container__status-block-text bold">+7 (712) 654 - 12 - 32</div>
                            </div>
                            <button className="container__status-send">Оставить заявку для тех. поддержки</button>
                        </div>
                    } */}
                    <div className="container__status">
                        <div className="container__status-svgGreen">
                            <svg width="44" height="34" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M43.3514 0.525704C44.1657 1.27209 44.2207 2.53722 43.4743 3.35146L15.9743 33.3515C15.6057 33.7536 15.0888 33.9877 14.5434 33.9995C13.9981 34.0114 13.4715 33.8 13.0858 33.4142L0.585786 20.9142C-0.195262 20.1332 -0.195262 18.8668 0.585786 18.0858C1.36683 17.3048 2.63317 17.3048 3.41421 18.0858L14.4372 29.1088L40.5257 0.648563C41.2721 -0.165676 42.5372 -0.220681 43.3514 0.525704Z" fill="white" />
                            </svg>
                        </div>
                        <div className="container__status-block">
                            <div className="container__status-block-text bold">Спасибо!</div>
                            <div className="container__status-block-text bold">Ваш заказ был успешно принят</div>
                        </div>
                        <div className="container__status-order">
                            <div className="container__status-order-text bold">Заказ №{1451}</div>
                            <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg" onClick={() => setAciveModal(true)}>
                                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.99967 4.99967C8.99967 6.10424 8.10424 6.99967 6.99967 6.99967C5.8951 6.99967 4.99967 6.10424 4.99967 4.99967C4.99967 3.89511 5.8951 2.99967 6.99967 2.99967C8.10424 2.99967 8.99967 3.89511 8.99967 4.99967Z" fill="#FF6600" />
                                    <path d="M13.596 4.70153C12.1571 1.82391 9.60176 0.333008 6.99967 0.333008C4.39759 0.333008 1.8422 1.82391 0.40339 4.70153C0.309547 4.88922 0.309547 5.11013 0.40339 5.29782C1.8422 8.17544 4.39759 9.66634 6.99967 9.66634C9.60176 9.66634 12.1571 8.17544 13.596 5.29782C13.6898 5.11013 13.6898 4.88922 13.596 4.70153ZM6.99967 8.33301C5.02048 8.33301 2.99838 7.25249 1.75278 4.99967C2.99838 2.74686 5.02048 1.66634 6.99967 1.66634C8.97887 1.66634 11.001 2.74686 12.2466 4.99967C11.001 7.25249 8.97887 8.33301 6.99967 8.33301Z" fill="#FF6600" />
                                </svg>
                            </div>
                        </div>
                        <Link to={"/"} className="container__status-return">Вернуться на главную</Link>
                    </div>
                </>
            }

        </div>
    )
}

export default CartOrderingStage4


