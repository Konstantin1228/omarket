import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { stageType3 } from '../FunctionsAndTypes/types'
const CartRight: React.FC<stageType3> = ({ setStage, withoutDiscount, withDiscount, totalPoints, itemsInCart }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return (
        <div className="cart__inner-notEmpty-makeOrder">
            {!isMobile &&
                <>
                    <div className="cart__inner-notEmpty-makeOrder-promoCode">
                        <span className="cart__inner-notEmpty-makeOrder-promoCode-title">Введите промокод:</span>
                        <div className="cart__inner-notEmpty-makeOrder-promoCode-enter">
                            <input
                                className="cart__inner-notEmpty-makeOrder-promoCode-enter-input"
                                type="text"
                                placeholder="Ввести"
                            />
                            <button className="cart__inner-notEmpty-makeOrder-promoCode-enter-button">Получить</button>
                        </div>
                        <span className="cart__inner-notEmpty-makeOrder-promoCode-prompt">Как получить промокод, если его нет?</span>
                    </div>
                    <div className="cart__inner-notEmpty-makeOrder-count">
                        <div className="cart__inner-notEmpty-makeOrder-count-toCharge">
                            <span className="cart__inner-notEmpty-makeOrder-promoCode-title">Бонусы к начислению:</span>
                            <span className="cart__inner-notEmpty-makeOrder-count-toCharge-totalBonus">
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
                            </span>
                        </div>
                        {itemsInCart.map(obj => obj.tags === 'discount' || obj.tags === 'bonus').includes(true) ?
                            <>
                                <div className="cart__inner-notEmpty-makeOrder-count-noDiscount" style={{ borderBottom: "none" }}>
                                    <span className="cart__inner-notEmpty-makeOrder-count-noDiscount-text">Итоговая цена <span>без</span> скидки:</span>
                                    <span className="cart__inner-notEmpty-makeOrder-count-noDiscount-text">{withoutDiscount}₽</span>
                                </div>
                                <div className="cart__inner-notEmpty-makeOrder-count-withDiscount" style={{ marginBottom: "0" }}>
                                    <span className="cart__inner-notEmpty-makeOrder-count-withDiscount-text">Итоговая цена <span>cо</span> скидкой:</span>
                                    <span className="cart__inner-notEmpty-makeOrder-count-withDiscount-text">{withDiscount}₽</span>
                                </div>
                            </>
                            :
                            <div className="cart__inner-notEmpty-makeOrder-count-noDiscount">
                                <span className="cart__inner-notEmpty-makeOrder-count-noDiscount-text">Итоговая цена:</span>
                                <span className="cart__inner-notEmpty-makeOrder-count-noDiscount-text">{withDiscount}₽ </span>
                            </div>
                        }
                        <span className="cart__inner-notEmpty-makeOrder-count-prompt">
                            При покупке заказа до 1 000₽ - цена доставки 300₽ От 1 000₽
                            бесплатно в черте города За чертой города доставка не
                            осуществляется
                        </span>
                    </div>
                </>
            }
            {!isMobile ?
                <>
                    <div className="cart__inner-notEmpty-makeOrder-grandTotal">
                        <div className="cart__inner-notEmpty-makeOrder-grandTotal-price">
                            <span className="cart__inner-notEmpty-makeOrder-grandTotal-price-text">Итоговая сумма:</span>
                            <span className="cart__inner-notEmpty-makeOrder-grandTotal-price-text">{withDiscount}₽</span>
                        </div>
                        <span className="cart__inner-notEmpty-makeOrder-grandTotal-deliviryType">Без доставки</span><br />
                        <span className="cart__inner-notEmpty-makeOrder-grandTotal-deliviryTypePrompt">Цена с доставкой указывается при оформлении заказа</span>
                    </div>
                    <button type='submit' className={`button-submit`} onClick={() => setStage(2)} >Оформить заказ</button>
                </>
                :
                <>
                    <div className="cart__inner-notEmpty-makeOrder-top">
                        <span className="cart__inner-notEmpty-makeOrder-grandTotal-price-text">Итого:</span>
                        <span className="cart__inner-notEmpty-makeOrder-grandTotal-price-text">{withDiscount}₽</span>
                    </div>
                        <button className="button-submit">Перейти к оформлению</button>
                </>
            }
        </div>
    )
}

export default CartRight
