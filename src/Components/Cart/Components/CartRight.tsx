import React from 'react'
import { stageType3 } from '../FunctionsAndTypes/types'
const CartRight: React.FC<stageType3> = ({ setStage, withoutDiscount, withDiscount, totalPoints, itemsInCart }) => {
    return (
        <div className="cart__inner-notEmpty-makeOrder">
            <div className="cart__inner-notEmpty-makeOrder-promoCode">
                <div className="cart__inner-notEmpty-makeOrder-promoCode-title">
                    Введите промокод:
                </div>
                <div className="cart__inner-notEmpty-makeOrder-promoCode-enter">
                    <input
                        className="cart__inner-notEmpty-makeOrder-promoCode-enter-input"
                        type="text"
                        placeholder="Ввести"
                    />
                    <button className="cart__inner-notEmpty-makeOrder-promoCode-enter-button">
                        Получить
                    </button>
                </div>
                <div className="cart__inner-notEmpty-makeOrder-promoCode-prompt">
                    Как получить промокод, если его нет?
                </div>
            </div>
            <div className="cart__inner-notEmpty-makeOrder-count">
                <div className="cart__inner-notEmpty-makeOrder-count-toCharge">
                    <div className="cart__inner-notEmpty-makeOrder-promoCode-title">
                        Бонусы к начислению:
                    </div>
                    <div className="cart__inner-notEmpty-makeOrder-count-toCharge-totalBonus">
                        {totalPoints}
                        <svg
                            width="22"
                            height="16"
                            viewBox="0 0 22 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11 0C17.075 0 22 2.686 22 6V10C22 13.314 17.075 16 11 16C5.033 16 0.176 13.409 0.005 10.177L0 10V6C0 2.686 4.925 0 11 0ZM11 12C7.28 12 3.99 10.993 2 9.45V10C2 11.882 5.883 14 11 14C16.01 14 19.838 11.97 19.995 10.118L20 10L20.001 9.45C18.011 10.992 14.721 12 11 12ZM11 2C5.883 2 2 4.118 2 6C2 7.882 5.883 10 11 10C16.117 10 20 7.882 20 6C20 4.118 16.117 2 11 2Z"
                                fill="#0D0D0D"
                            />
                        </svg>
                    </div>
                </div>
                {itemsInCart.map(obj => obj.tags === 'discount' || obj.tags === 'bonus').includes(true) ?
                    <div className="cart__inner-notEmpty-makeOrder-count-totalPrice">
                        <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-noDiscount">
                            <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-noDiscount-text">
                                Итоговая цена <span>без</span> скидки:
                            </div>
                            <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-noDiscount-text">
                                {withoutDiscount}₽
                            </div>
                        </div>
                        <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-withDiscount">
                            <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-withDiscount-text">
                                Итоговая цена <span>cо</span> скидкой:
                            </div>
                            <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-withDiscount-text">
                                {withDiscount}₽
                            </div>
                        </div>
                    </div> :
                    <div className="cart__inner-notEmpty-makeOrder-count-totalPrice">
                        <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-noDiscount">
                            <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-noDiscount-text">
                                Итоговая цена:
                            </div>
                            <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-noDiscount-text">
                                {withDiscount}₽
                            </div>
                        </div>
                    </div>
                }
                <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-prompt">
                    При покупке заказа до 7 000₽ - цена доставки 300₽ От 7 000₽
                    бесплатно в черте города За чертой города доставка не
                    осуществляется
                </div>
            </div>
            <div className="cart__inner-notEmpty-makeOrder-grandTotal">
                <div className="cart__inner-notEmpty-makeOrder-grandTotal-price">
                    <div className="cart__inner-notEmpty-makeOrder-grandTotal-price-text">
                        Итоговая сумма:
                    </div>
                    <div className="cart__inner-notEmpty-makeOrder-grandTotal-price-text">
                        {withDiscount}₽
                    </div>
                </div>
                <div className="cart__inner-notEmpty-makeOrder-grandTotal-deliviryType">
                    Без доставки
                </div>
                <div className="cart__inner-notEmpty-makeOrder-grandTotal-deliviryTypePrompt">
                    Цена с доставкой указывается при оформлении заказа
                </div>
            </div>
            <button type='submit' className={`button-submit`} onClick={() => setStage(2)} >
                Оформить заказ
            </button>
        </div>
    )
}

export default CartRight
