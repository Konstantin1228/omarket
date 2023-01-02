import React, { FC } from 'react'
import { useAppDispatch } from '../../../../hooks/hooks';
import { addToCart } from '../../../../redux/cart/slice';
import { addStatusToasts } from '../../../../redux/toasts/slice';
import { ModalWindowCheckProps } from '../../FunctionsAndTypes/types';
import { CartIconSmall, TimerIcon } from '../../Icons';
import CloseIcon from '@mui/icons-material/Close';

const ModalWindowCheck: FC<ModalWindowCheckProps> = ({ active, setActive, orderDetails }) => {
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
                                    <TimerIcon />
                                    <p>{orderDate}</p>
                                </div>
                                <div className="modal__content-top-orderInformation-top-left-deliviryStatus element">Статус:&nbsp;
                                    <span className={`bold ${status === "Доставлен" ? "green" : "red"}`}>{status}</span>
                                </div>
                            </div>
                            <div className="modal__content-top-orderInformation-right">
                                <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg" onClick={addItemsToCart}>
                                    <CartIconSmall />
                                </div>
                                <div className="modal__content-top-svg" onClick={() => setActive({ condition: false, itemIdx: active.itemIdx })}  >
                                    <CloseIcon sx={{ fontSize: "1.7rem" }} />
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
                                <p>{orderDetails.itemsInCart.length}</p>
                            </div>
                            <div className="modal__content-top-orderInformation-orderInformationFrame-element">
                                <p className="bold">Способ оплаты</p>
                                <p>{scheme} ****{bankCard.slice(12, 16)}</p>
                            </div>
                        </div>
                        <div className="modal__content-top-orderInformation-items" style={{ maxHeight: "35rem" }}>
                            <div className="profile__myOrders-elementFouthColumns">
                                <div className="profile__myOrders-text-left bold">Картинка</div>
                                <div className="profile__myOrders-text-left bold">Наименование</div>
                                <div className="profile__myOrders-text-left bold">Количество товаров</div>
                                <div className="profile__myOrders-text-left bold">Цена</div>
                            </div>
                            {orderDetails.itemsInCart.map(({ title, price, image, count, weight, typeOfUnit }, idx) => (
                                <div className="profile__myOrders-elementFouthColumns" key={idx} >
                                    <img className='profile__myOrders-text-left' src={image.length > 5 ? image : "https://i.ibb.co/dkm3qTZ/no-image.png"} alt={title} />
                                    {/* <img className='profile__myOrders-text-left' src={image.length > 5 ? image : "https://i.ibb.co/dkm3qTZ/no-image.png"} width={198} height={160} alt="Картинка товара" /> */}
                                    <div className="profile__myOrders-text-left bold">{title + " " + weight + typeOfUnit}</div>
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