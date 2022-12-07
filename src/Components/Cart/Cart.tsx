import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import Cart_Item from "./Components/CartItem/Cart_Item";
import CartOrderingStage2 from "./Components/Stages/OrderingStage2/CartOrderingStage2";
import CartOrderingStage3 from "./Components/Stages/OrderingStage3/CartOrderingStage3";
import CartRight from "./Components/CartRight";
import CartOrderingStage4 from "./Components/Stages/OrderingStage4/CartOrderingStage4";
import "./cart.scss"
const Cart = () => {
  const { itemsInCart } = useAppSelector((state) => state.cartSlice);
  const withoutDiscount = itemsInCart.reduce((previous, { count, defaultPrice, price }) => previous + (count * (defaultPrice || price)), 0)
  const withDiscount = itemsInCart.reduce((previous, { price, count }) => (previous + price * count), 0)
  const totalPoints = itemsInCart.reduce((previous, current) => previous + current.points * current.count, 0)
  const [stage, setStage] = useState(1)
  return (
    <div className="cart">
      <div className="cart__path">
        <ul>
          <Link to="/" className="cart__path-text-gray">
            Главная
          </Link>
          {stage >= 1 &&
            <>
              <li className="cart__path-gray">{">"}</li>
              <div className={stage === 1 ? `cart__path-text-black` : `cart__path-text-gray`} onClick={() => setStage(1)}>Корзина</div>
            </>
          }
          {stage >= 2 &&
            <>
              <li className="cart__path-gray">{">"}</li>
              <div className={stage === 2 ? `cart__path-text-black` : `cart__path-text-gray`} onClick={() => setStage(2)}>Оформление заказа</div>
            </>
          }
          {stage >= 3 &&
            <>
              <li className="cart__path-gray">{">"}</li>
              <div className={stage === 3 || stage === 4 ? `cart__path-text-black` : `cart__path-text-gray`} onClick={() => setStage(stage === 3 ? 3 : 4)}>Оплата</div>
            </>
          }
        </ul>
      </div>
      <div className="cart__title" onClick={() => setStage(stage !== 1 ? stage - 1 : 1)} style={{ cursor: `${stage !== 1 ? "pointer" : "default"}` }}>
        {stage === 1 && <div className="cart__title-title" style={{ cursor: "default" }}>Корзина</div>}
        {stage === 2 &&
          <>
            <div className="cart__title-arrow">❮</div>
            <div className="cart__title-title">Оформление заказа</div>
          </>}
        {stage >= 3 &&
          <>
            {stage != 4 && <div className="cart__title-arrow">❮</div>}
            <div className="cart__title-title">Оплата</div>
          </>
        }
      </div>
      <div className="cart__inner">
        {itemsInCart.length == 0 ? (
          <div className="cart__inner-empty">
            <div className="cart__inner-empty-svg">
              <svg
                style={{ cursor: "default" }}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.8579 2.00014L15.9909 14.1358C15.9773 14.236 15.9489 14.3314 15.9079 14.4199C15.7846 14.6862 15.5475 14.8891 15.2591 14.9662C15.171 14.9899 15.0787 15.0017 14.9842 15.0001H4C3.55839 15.0001 3.16907 14.7105 3.04217 14.2875L0.0421734 4.28749C-0.0486584 3.98471 0.00901413 3.65682 0.197708 3.40321C0.386402 3.1496 0.683895 3.00014 1 3.00014H15.6805L16.0094 0.862329C16.0217 0.772947 16.0459 0.687334 16.0802 0.607118C16.1425 0.461042 16.2379 0.334509 16.3557 0.235329C16.465 0.143138 16.5944 0.0739612 16.7363 0.0352648C16.8257 0.0108006 16.9194 -0.00145301 17.0153 0.00013733H19C19.5523 0.00013733 20 0.447853 20 1.00014C20 1.55242 19.5523 2.00014 19 2.00014H17.8579ZM14.1421 13.0001L15.3728 5.00014H2.34403L4.74403 13.0001H14.1421Z"
                  fill="#CFCFCF"
                />
                <path
                  d="M12 18.0001C12 19.1047 12.8954 20.0001 14 20.0001C15.1046 20.0001 16 19.1047 16 18.0001C16 16.8956 15.1046 16.0001 14 16.0001C12.8954 16.0001 12 16.8956 12 18.0001Z"
                  fill="#CFCFCF"
                />
                <path
                  d="M3 18.0001C3 19.1047 3.89543 20.0001 5 20.0001C6.10457 20.0001 7 19.1047 7 18.0001C7 16.8956 6.10457 16.0001 5 16.0001C3.89543 16.0001 3 16.8956 3 18.0001Z"
                  fill="#CFCFCF"
                />
              </svg>
            </div>
            <div className="cart__path-gray">Корзина пуста</div>
          </div>
        ) : (
          <>
            {stage == 1 &&
              <div className="cart__inner-notEmpty" >
                <div className="cart__inner-notEmpty-left-items" >
                  {itemsInCart.map((obj) => <Cart_Item key={`${obj.title}__${obj.weight}`} {...obj} canDeleteAndAdd={true} />)}
                </div>
                <CartRight setStage={setStage} withoutDiscount={withoutDiscount} withDiscount={withDiscount} totalPoints={totalPoints} itemsInCart={itemsInCart} />
              </div>
            }
            {stage == 2 && <CartOrderingStage2 setStage={setStage} withoutDiscount={withoutDiscount} withDiscount={withDiscount} totalPoints={totalPoints} itemsInCart={itemsInCart} />}
            {stage == 3 && <CartOrderingStage3 setStage={setStage} withoutDiscount={withoutDiscount} withDiscount={withDiscount} totalPoints={totalPoints} itemsInCart={itemsInCart} />}
            {stage == 4 && <CartOrderingStage4 setStage={setStage} />}
          </>
        )}
      </div>
    </div >
  );
};

export default Cart;
