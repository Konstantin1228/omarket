import React from 'react'
import Select from "react-select";
const CartOrderingStage3 = () => {
    const options = [{ value: 'jack', label: `Jack` }, { value: 'germany', label: 'Germany' }]
    return (
        <form className="cart__inner-notEmpty-left-ordering-orderNumber-bankCard">
            <div className="cart__inner-notEmpty-left-ordering-adress-text">Выбрать карту:</div>
            <Select options={options} isSearchable={false} placeholder='Выбрать' classNamePrefix="cart__inner-notEmpty-left-ordering-adress-select" />
            <div className="cart__inner-notEmpty-left-ordering-adress-text">Ввести вручную:</div>
            <div className="cart__inner-notEmpty-left-ordering-adress-more">
                <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                    <div className="cart__inner-notEmpty-left-ordering-adress-text">Номер карты:</div>
                    <input type="text" placeholder="0000 0000 0000 0000" className="cart__inner-notEmpty-left-ordering-adress-more-input-adress" />
                </div>
                <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                    <div className="cart__inner-notEmpty-left-ordering-adress-text">Номер карты:</div>
                    <input type="text" placeholder="ММ/ГГ" className="cart__inner-notEmpty-left-ordering-adress-more-input-flat" />
                </div>
                <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                    <div className="cart__inner-notEmpty-left-ordering-adress-text">Номер карты:</div>
                    <input type="text" placeholder="CVC" className="cart__inner-notEmpty-left-ordering-adress-more-input-floor" />
                </div>
                <div className="cart__inner-notEmpty-left-ordering-adress-more-bottom">
                </div>
            </div>
        </form>
    )
}

export default CartOrderingStage3