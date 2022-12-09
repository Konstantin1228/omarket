import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import Cart_Item from "./Components/CartItem/Cart_Item";
import CartOrderingStage2 from "./Components/Stages/OrderingStage2/CartOrderingStage2";
import CartOrderingStage3 from "./Components/Stages/OrderingStage3/CartOrderingStage3";
import CartRight from "./Components/CartRight";
import CartOrderingStage4 from "./Components/Stages/OrderingStage4/CartOrderingStage4";
import { useMediaQuery } from "react-responsive";
import "./cart.scss"
import CartPath from "./CartPath";
const Cart = () => {
  const { itemsInCart } = useAppSelector((state) => state.cartSlice);
  const withoutDiscount = itemsInCart.reduce((previous, { count, defaultPrice, price }) => previous + (count * (defaultPrice || price)), 0)
  const withDiscount = itemsInCart.reduce((previous, { price, count }) => (previous + price * count), 0)
  const totalPoints = itemsInCart.reduce((previous, current) => previous + current.points * current.count, 0)
  const [stage, setStage] = useState(1)
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <div className="cart">
      <CartPath stage={stage} setStage={setStage} isMobile={isMobile} />
      <div className="cart__inner">
        {itemsInCart.length == 0 ? (
          <div className="cart__inner-empty">
            <div className="cart__inner-empty-svg"></div>
            <div className="cart__path-gray">Корзина пуста</div>
          </div>
        ) : (
          <>
            {stage == 1 &&
              <div className="cart__inner-notEmpty">
                <div className="cart__inner-notEmpty-left-items" >
                  {itemsInCart.map((obj) => <Cart_Item key={`${obj.title}__${obj.weight}`} {...obj} />)}
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
