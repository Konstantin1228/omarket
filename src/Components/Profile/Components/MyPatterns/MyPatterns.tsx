import React from 'react'
import { CartIconSmall, EyeIcon, ListIcon } from '../../Icons'

const MyPatterns = () => {

  return (
    <div className='profile__parent'>
      <div className="profile__myOrders">
        <div className="profile__myOrders-elementSixColumns">
          <div className="profile__myOrders-text bold">Номер</div>
          <div className="profile__myOrders-text bold">Название</div>
          <div className="profile__myOrders-text bold">Комментарии</div>
          <div className="profile__myOrders-text bold">Количество SKU</div>
          <div className="profile__myOrders-text bold">Сумма</div>
          <div className="profile__myOrders-text bold"></div>
        </div>
        <div className="profile__myOrders-elementSixColumns">
          <div className="profile__myOrders-text-left">754</div>
          <div className="profile__myOrders-text-left">Для гостей</div>
          <div className="profile__myOrders-text-left">Чаепитие с тортом для подруг</div>
          <div className="profile__myOrders-text-left">10</div>
          <div className="profile__myOrders-text-left">14 750₸</div>
          <div className="profile__myOrders-text-left">
            <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg">
              <CartIconSmall />
            </div>
            <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg">
              <ListIcon />
            </div>
            <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg">
              <EyeIcon />
            </div>
          </div>
        </div>
        <div className="profile__myOrders-elementSixColumns">
          <div className="profile__myOrders-text-left">753</div>
          <div className="profile__myOrders-text-left">Продукты на новый год</div>
          <div className="profile__myOrders-text-left">Для салата оливье и подшубой, горячего блюда с острым соусом. Детские напитки на праздник и сладости для гостей. Фрукты и офощи дополнительно.</div>
          <div className="profile__myOrders-text-left">5</div>
          <div className="profile__myOrders-text-left">20 000₸</div>
          <div className="profile__myOrders-text-left">
            <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg">
              <CartIconSmall />
            </div>
            <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg">
              <ListIcon />
            </div>
            <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg">
              <EyeIcon />
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

export default MyPatterns