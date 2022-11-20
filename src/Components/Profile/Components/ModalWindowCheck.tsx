import React, { FC } from 'react'
import { useAppDispatch } from '../../../hooks/hooks';
import { addToCart } from '../../../redux/cart/slice';
import { addStatusToasts } from '../../../redux/toasts/slice';
import MyOrders from './MyOrders';
interface ModalWindow {
    active: {
        condition: boolean,
        itemIdx: number
    }
    setActive: React.Dispatch<React.SetStateAction<{ condition: boolean; itemIdx: number; }>>
    orderDetails: MyOrders
}
const ModalWindowCheck: FC<ModalWindow> = ({ active, setActive, orderDetails }) => {
    const dispatch = useAppDispatch()
    const { adress, orderDate, orderNumber, status, comment } = orderDetails.orderInformation
    const { bankCard, scheme } = orderDetails.bankCardInformation

    const addItemsToCart = () => {
        setActive({ condition: false, itemIdx: active.itemIdx })
        orderDetails.itemsInCart.map((order) => dispatch(addToCart(order)))
        dispatch(addStatusToasts({ message: "Товары добавлены в корзину!", isComplete: true }))
    }
    return (
        <div className={active.condition ? 'modal-active' : "modal"} onClick={() => setActive({ condition: false, itemIdx: active.itemIdx })}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <div className="modal__content-top">
                    <div className="modal__content-top-orderInformation">
                        <div className="modal__content-top-orderInformation-top">
                            <div className="modal__content-top-orderInformation-top-left">
                                <div className="modal__content-top-orderInformation-top-left-number element">№{orderNumber}</div>
                                <div className="modal__content-top-orderInformation-top-left-time element ">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.00065 2.66634C5.05513 2.66634 2.66732 5.05416 2.66732 7.99967C2.66732 10.9452 5.05513 13.333 8.00065 13.333C10.9462 13.333 13.334 10.9452 13.334 7.99967C13.334 5.05416 10.9462 2.66634 8.00065 2.66634ZM1.33398 7.99967C1.33398 4.31778 4.31875 1.33301 8.00065 1.33301C11.6826 1.33301 14.6673 4.31778 14.6673 7.99967C14.6673 11.6816 11.6826 14.6663 8.00065 14.6663C4.31875 14.6663 1.33398 11.6816 1.33398 7.99967ZM8.00065 3.99967C8.36884 3.99967 8.66732 4.29815 8.66732 4.66634V7.72353L10.4721 9.52827C10.7324 9.78862 10.7324 10.2107 10.4721 10.4711C10.2117 10.7314 9.7896 10.7314 9.52925 10.4711L7.52925 8.47108C7.40422 8.34606 7.33398 8.17649 7.33398 7.99967V4.66634C7.33398 4.29815 7.63246 3.99967 8.00065 3.99967Z" fill="#9C9C9C" />
                                    </svg>
                                    <p>{orderDate}</p>
                                </div>
                                <div className="modal__content-top-orderInformation-top-left-deliviryStatus element">Статус:&nbsp;
                                    <span className={`bold ${status === "Доставлен" ? "green" : "red"}`}>{status}</span>
                                </div>
                            </div>
                            <div className="modal__content-top-orderInformation-right">
                                <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg" onClick={addItemsToCart}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.76205 1.66643L3.00674 9.75688C3.01579 9.82366 3.03474 9.8873 3.06205 9.94628C3.14427 10.1238 3.30229 10.2591 3.49457 10.3105C3.55331 10.3263 3.61487 10.3342 3.67784 10.3331H11.0007C11.2951 10.3331 11.5546 10.14 11.6392 9.858L13.6392 3.19133C13.6998 2.98948 13.6613 2.77089 13.5355 2.60181C13.4097 2.43274 13.2114 2.3331 13.0007 2.3331H3.21363L2.99437 0.907894C2.98616 0.848306 2.97007 0.791231 2.94719 0.737753C2.90566 0.640369 2.84207 0.556014 2.76351 0.489894C2.69063 0.428433 2.60439 0.382315 2.50976 0.356518C2.45021 0.340208 2.38772 0.332039 2.32378 0.333099H1.00065C0.632461 0.333099 0.333984 0.631576 0.333984 0.999766C0.333984 1.36796 0.632461 1.66643 1.00065 1.66643H1.76205ZM4.23928 8.99977L3.41876 3.66643H12.1046L10.5046 8.99977H4.23928Z" fill="#FF6600" />
                                        <path d="M5.66732 12.3331C5.66732 13.0695 5.07036 13.6664 4.33398 13.6664C3.5976 13.6664 3.00065 13.0695 3.00065 12.3331C3.00065 11.5967 3.5976 10.9998 4.33398 10.9998C5.07036 10.9998 5.66732 11.5967 5.66732 12.3331Z" fill="#FF6600" />
                                        <path d="M11.6673 12.3331C11.6673 13.0695 11.0704 13.6664 10.334 13.6664C9.5976 13.6664 9.00065 13.0695 9.00065 12.3331C9.00065 11.5967 9.5976 10.9998 10.334 10.9998C11.0704 10.9998 11.6673 11.5967 11.6673 12.3331Z" fill="#FF6600" />
                                    </svg>
                                </div>
                                <div className="modal__content-top-svg" onClick={() => setActive({ condition: false, itemIdx: active.itemIdx })}  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="#0D0D0D" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="modal__content-top-orderInformation-adress">
                            <p className="bold">Адрес:&nbsp;</p>{adress}
                        </div>
                        <div className="modal__content-top-orderInformation-orderInformationFrame">
                            <div className="modal__content-top-orderInformation-orderInformationFrame-element">
                                <p className="bold">Комментарий</p>
                                <p>{comment.length === 0 ? "Отсуствует" : comment}</p>
                            </div>
                            <div className="modal__content-top-orderInformation-orderInformationFrame-element">
                                <p className="bold">Количество товаров</p>
                                <p>5</p>
                            </div>
                            <div className="modal__content-top-orderInformation-orderInformationFrame-element">
                                <p className="bold">Способ оплаты</p>
                                <p>{scheme} ****{bankCard.slice(12, 16)}</p>
                            </div>
                        </div>
                        <div className="modal__content-top-orderInformation-items">
                            <div className="profile__myOrders-elementFouthColumns">
                                <div className="profile__myOrders-text-left bold">Картинка</div>
                                <div className="profile__myOrders-text-left bold">Наименование</div>
                                <div className="profile__myOrders-text-left bold">Количество товаров</div>
                                <div className="profile__myOrders-text-left bold">Цена</div>
                            </div>
                            {orderDetails.itemsInCart.map(({ title, price, image, count }, idx) => (
                                <div className="profile__myOrders-elementFouthColumns" key={idx}>
                                    <img className='profile__myOrders-text-left' src={image.length > 5 ? image : "https://i.ibb.co/dkm3qTZ/no-image.png"} width={198} height={160} alt="Картинка товара" />
                                    <div className="profile__myOrders-text-left bold">{title}</div>
                                    <div className="profile__myOrders-text-left bold">{count}</div>
                                    <div className="profile__myOrders-text-left bold">{price * count}₽</div>
                                </div>
                            ))}
                        </div>
                        <div className="modal__content-top-orderInformation-totalSum">
                            <p className="bold">Сумма</p>
                            <p className="bold">{orderDetails.itemsInCart.reduce((previous, current) => previous + current.price * current.count, 0)}₽</p>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ModalWindowCheck