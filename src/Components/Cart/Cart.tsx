import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import Cart_Item from "./Components/CartItem/Cart_Item";
import CartOrderingStage2 from "./Components/Stages/OrderingStage2/CartOrderingStage2";
import CartOrderingStage3 from "./Components/Stages/OrderingStage3/CartOrderingStage3";
import CartRight from "./Components/CartRight";
import CartOrderingStage4 from "./Components/Stages/OrderingStage4/CartOrderingStage4";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useMediaQuery } from "react-responsive";
import "./cart.scss"
const Cart = () => {
  const { itemsInCart } = useAppSelector((state) => state.cartSlice);
  const withoutDiscount = itemsInCart.reduce((previous, { count, defaultPrice, price }) => previous + (count * (defaultPrice || price)), 0)
  const withDiscount = itemsInCart.reduce((previous, { price, count }) => (previous + price * count), 0)
  const totalPoints = itemsInCart.reduce((previous, current) => previous + current.points * current.count, 0)
  const [stage, setStage] = useState(1)
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <div className="cart">
      <div className="cart__path">
        {!isMobile ?
          <ul className="cart__path-ul">
            <Link to="/" className="cart__path-text-gray">
              Главная
            </Link>
            {stage >= 1 &&
              <>
                <li className="cart__path-gray">{">"}</li>
                <span className={stage === 1 ? `cart__path-text-black` : `cart__path-text-gray`} onClick={() => setStage(1)}>Корзина</span>
              </>
            }
            {stage >= 2 &&
              <>
                <li className="cart__path-gray">{">"}</li>
                <span className={stage === 2 ? `cart__path-text-black` : `cart__path-text-gray`} onClick={() => setStage(2)}>Оформление заказа</span>
              </>
            }
            {stage >= 3 &&
              <>
                <li className="cart__path-gray">{">"}</li>
                <span className={stage === 3 || stage === 4 ? `cart__path-text-black` : `cart__path-text-gray`} onClick={() => setStage(stage === 3 ? 3 : 4)}>Оплата</span>
              </>
            }
          </ul>
          :
          <>
            {stage >= 1 &&
              <>
                <div className="cart__path-ul">
                  <ArrowBackIosIcon />
                  {/* <li className="cart__path-gray">{"<"}</li> */}
                  <span className="cart__path-text-black" onClick={() => setStage(1)}>Корзина</span>
                </div>
                <span className="cart__path-gray">Очистить</span>
              </>
            }
          </>
        }
      </div>
      <div className="cart__title" onClick={() => setStage(stage !== 1 ? stage - 1 : 1)} style={{ cursor: `${stage !== 1 ? "pointer" : "default"}` }}>
        {stage === 1 && !isMobile && <div className="cart__title-title" style={{ cursor: "default" }}>Корзина</div>}
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

            </div>
            <div className="cart__path-gray">Корзина пуста</div>
          </div>
        ) : (
          <>
            {stage == 1 &&
              <div className="cart__inner-notEmpty">
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
