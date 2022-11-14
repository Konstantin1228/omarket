import React, { useState, useCallback } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { addToCart, openPopup } from "../../redux/cart/slice";
import "./item.scss"
export interface itemType {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  typeOfUnit: string
  discounts: number[];
  weight: number[];
  points: number[];
  price: number[];
}
const CatalogItem: React.FC<itemType> = ({ id, title, description, image, tags, typeOfUnit, discounts, weight, points, price }) => {
  const dispatch = useAppDispatch();
  const shareType = tags.find((tag) => tag === "bonus" || tag === "discount")
  const [items, setItems] = useState(
    tags.includes("bonus") || tags.includes("discount")
      ? tags.includes("discount")
        ? weight.map((weight, idx) => ({
          count: 1, weight, points: points[idx], discounts: discounts[idx],
          price: price[idx] - Math.round(price[idx] / 100 * discounts[idx]), totalPrice: price[idx] - Math.round(price[idx] / 100 * discounts[idx])
        }))
        : weight.map((weight, idx) => ({ weight, points: points[idx], discounts: discounts[idx], price: price[idx], count: 1, totalPrice: price[idx] }))
      : weight.map((weight, idx) => ({ weight: weight, points: points[idx], discounts: discounts[idx], price: price[idx], count: 1, totalPrice: price[idx] }))

  );
  const totalCount = items.reduce((previous, current) => previous + current.count, 0) > 0
  return (
    // onMouseEnter={() => setBigItem(true)} onMouseLeave={() => setBigItem(false)}
    <div className="item-wrapper"  >
      <div className="item">
        <div className="item-tags">
          {tags.includes("Новинка") && <div className="item-tag-new">Новинка</div>}
          {(shareType === "discount" || shareType === "bonus") && <div className="item-tag-stock">Акция</div>}
          {shareType === "discount" && <div className="item-tag-stock">-{discounts[0]}%</div>}
          {tags.includes("Хит") && <div className="item-tag-hit">Хит</div>}
        </div>
        <figure className="item-information">
          <img src={image.length > 5 ? image : "https://i.ibb.co/dkm3qTZ/no-image.png"} alt={title} width={280} height={280} />
          <h1 className="item-information-title">{title}</h1>
          <figcaption className="item-information-description">{description}</figcaption>
        </figure>
        <div className="item-about">
          <div className="item-about-chapter">
            <div className="item-about-chapter-weight">
              {typeOfUnit === 'л' ? "Литраж" : "Вес"}
            </div>
            <span className="item-about-chapter-price">Цена</span>
          </div>
          <div className="item-about-chapter-bottom">
            <span className="item-about-chapter-weight">  {`${weight[0]} ${typeOfUnit}`}.</span>
            {shareType === "discount" ?
              <div className="item-about-chapter-block">
                <div className="item-about-chapter-block-crossOut"></div>
                <span className="item-about-chapter-block-lastPrice">{price[0]}₽</span>
                <span className="item-about-chapter-price">{price[0] - (price[0] / 100) * discounts[0]}₽</span>
              </div>
              :
              <span className="item-about-chapter-price">{price[0]}₽</span>
            }
          </div>
          <button className="item-more" onClick={() => dispatch(openPopup({ id, title, description, image, tags, typeOfUnit, discounts, weight, points, price }))}>
            <span>Подробнее</span>
            <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg" >   <path d="M0.910093 0.744078C1.23553 0.418641 1.76317 0.418641 2.0886 0.744078L6.49935 5.15482L10.9101 0.744078C11.2355 0.418641 11.7632 0.418641 12.0886 0.744078C12.414 1.06951 12.414 1.59715 12.0886 1.92259L7.08861 6.92259C6.76317 7.24802 6.23553 7.24802 5.91009 6.92259L0.910093 1.92259C0.584656 1.59715 0.584656 1.06951 0.910093 0.744078Z" fill="#FF6600" /> </svg>
          </button>
        </div>
        {/* {bigItem && (
          <div className={"item-big-about"}>
            <div className="item-big-about-chapter" >
              <span className="item-about-chapter-weight">Вес</span>
              <span className="item-big-about-chapter-price">Цена</span>
            </div>
            {weight.map((weight, idx) => (
              <div key={weight} className="item-big-about-chapter">
                <div className="item-big-about-chapter-weight">{`${weight} ${typeOfUnit}.`}</div>
                <div className="item-big-about-chapter-amount">
                  <button className="item-big-about-chapter-amount-minus" onClick={() => minusItem(idx)}>-</button>
                  <span className="item-big-about-chapter-amount-total">{`${items[idx].count} шт`}</span>
                  <button className="item-big-about-chapter-amount-plus" onClick={() => addItem(idx)}>+</button>
                </div>
                <div className="item-big-about-chapter-shareType">
                  {renderSVG(shareType)}
                </div>
                {prompt && (
                  <div className="item-big-about-chapter-prompt">При покупке двух коробок сока “Сады Придонья” 2л, в подарок идёт третья коробка сока</div>
                )}
                <div className="item-big-about-chapter-bonus">
                  {items[idx].points}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >   <path d="M7.99935 2.66797C12.0493 2.66797 15.3327 4.45864 15.3327 6.66797V9.33463C15.3327 11.544 12.0493 13.3346 7.99935 13.3346C4.02135 13.3346 0.783349 11.6073 0.669349 9.45263L0.666016 9.33463V6.66797C0.666016 4.45864 3.94935 2.66797 7.99935 2.66797ZM7.99935 10.668C5.51935 10.668 3.32602 9.99663 1.99935 8.96797V9.33463C1.99935 10.5893 4.58802 12.0013 7.99935 12.0013C11.3393 12.0013 13.8913 10.648 13.996 9.4133L13.9993 9.33463L14 8.96797C12.6733 9.99597 10.48 10.668 7.99935 10.668ZM7.99935 4.0013C4.58802 4.0013 1.99935 5.4133 1.99935 6.66797C1.99935 7.92264 4.58802 9.33463 7.99935 9.33463C11.4107 9.33463 13.9993 7.92264 13.9993 6.66797C13.9993 5.4133 11.4107 4.0013 7.99935 4.0013Z" fill="#0D0D0D" /> </svg>
                </div>
                <div className="item-big-about-chapter-block">
                  {
                    tags.includes("discount") ?
                      <>
                        {items[idx].totalPrice !== 0 &&
                          <>
                            <div className="item-about-chapter-block-crossOut"></div>
                            <span className="item-about-chapter-block-lastPrice">{price[idx] * items[idx].count}₽</span>
                          </>
                        }
                        <span className="item-about-chapter-price">{Math.round(price[idx] - price[idx] / 100 * discounts[idx]) * items[idx].count}₽</span>
                      </>
                      :
                      `${items[idx].price * items[idx].count}₽`
                  }
                </div>
              </div>
            ))}
            <div className="item-big-total">
              <span className="item-big-totalPrice">Итог:{`${estimatedPrice}₽`}</span>
              <span className="item-big-totalBonus">
                Бонус:{totalBonus}
                <svg style={{ cursor: "default" }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M7.99935 2.66797C12.0493 2.66797 15.3327 4.45864 15.3327 6.66797V9.33463C15.3327 11.544 12.0493 13.3346 7.99935 13.3346C4.02135 13.3346 0.783349 11.6073 0.669349 9.45263L0.666016 9.33463V6.66797C0.666016 4.45864 3.94935 2.66797 7.99935 2.66797ZM7.99935 10.668C5.51935 10.668 3.32602 9.99663 1.99935 8.96797V9.33463C1.99935 10.5893 4.58802 12.0013 7.99935 12.0013C11.3393 12.0013 13.8913 10.648 13.996 9.4133L13.9993 9.33463L14 8.96797C12.6733 9.99597 10.48 10.668 7.99935 10.668ZM7.99935 4.0013C4.58802 4.0013 1.99935 5.4133 1.99935 6.66797C1.99935 7.92264 4.58802 9.33463 7.99935 9.33463C11.4107 9.33463 13.9993 7.92264 13.9993 6.66797C13.9993 5.4133 11.4107 4.0013 7.99935 4.0013Z" fill="#0D0D0D" /></svg>
              </span>
            </div>
            {totalCount ?
              <button className="item-big-addToCart" onClick={() =>
                items.map(({ discounts, weight, points, price, count, totalPrice }, idx) =>
                  dispatch(
                    addToCart({
                      title, count, price, weight, points, image,
                      discounts: discounts || 0, tags: shareType || "", totalPrice, totalPoints: points * count, typeOfUnit
                    })))}
              >
                Добавить в корзину
              </button>
              :
              <button className="item-big-addToCart-false">Выберите хотя бы одну позицию!</button>
            }

            <div className="item-big-grade">
              <span className="item-big-grade-reviews">Отзывы:12</span>
              <div className="item-big-grade-stars">
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M8.99937 0.0839844C9.31502 0.0839844 9.60357 0.26232 9.74473 0.54464L11.8938 4.84282L16.6193 5.53016C16.9332 5.57581 17.1939 5.79567 17.2919 6.09731C17.3899 6.39895 17.3082 6.73007 17.0811 6.95148L13.6419 10.3048L14.4155 15.0327C14.4667 15.3452 14.3363 15.6597 14.0791 15.8443C13.8218 16.0289 13.4822 16.0518 13.2025 15.9034L8.99937 13.6732L4.79622 15.9034C4.51653 16.0518 4.1769 16.0289 3.91968 15.8443C3.66246 15.6597 3.5321 15.3452 3.58323 15.0327L4.3569 10.3048L0.917623 6.95148C0.690535 6.73007 0.608818 6.39895 0.706824 6.09731C0.804829 5.79567 1.06556 5.57581 1.37942 5.53016L6.10493 4.84282L8.25402 0.54464C8.39518 0.26232 8.68373 0.0839844 8.99937 0.0839844Z" fill="#FF6600" /></svg>
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M8.99937 0.0839844C9.31502 0.0839844 9.60357 0.26232 9.74473 0.54464L11.8938 4.84282L16.6193 5.53016C16.9332 5.57581 17.1939 5.79567 17.2919 6.09731C17.3899 6.39895 17.3082 6.73007 17.0811 6.95148L13.6419 10.3048L14.4155 15.0327C14.4667 15.3452 14.3363 15.6597 14.0791 15.8443C13.8218 16.0289 13.4822 16.0518 13.2025 15.9034L8.99937 13.6732L4.79622 15.9034C4.51653 16.0518 4.1769 16.0289 3.91968 15.8443C3.66246 15.6597 3.5321 15.3452 3.58323 15.0327L4.3569 10.3048L0.917623 6.95148C0.690535 6.73007 0.608818 6.39895 0.706824 6.09731C0.804829 5.79567 1.06556 5.57581 1.37942 5.53016L6.10493 4.84282L8.25402 0.54464C8.39518 0.26232 8.68373 0.0839844 8.99937 0.0839844Z" fill="#FF6600" /></svg>
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M8.99937 0.0839844C9.31502 0.0839844 9.60357 0.26232 9.74473 0.54464L11.8938 4.84282L16.6193 5.53016C16.9332 5.57581 17.1939 5.79567 17.2919 6.09731C17.3899 6.39895 17.3082 6.73007 17.0811 6.95148L13.6419 10.3048L14.4155 15.0327C14.4667 15.3452 14.3363 15.6597 14.0791 15.8443C13.8218 16.0289 13.4822 16.0518 13.2025 15.9034L8.99937 13.6732L4.79622 15.9034C4.51653 16.0518 4.1769 16.0289 3.91968 15.8443C3.66246 15.6597 3.5321 15.3452 3.58323 15.0327L4.3569 10.3048L0.917623 6.95148C0.690535 6.73007 0.608818 6.39895 0.706824 6.09731C0.804829 5.79567 1.06556 5.57581 1.37942 5.53016L6.10493 4.84282L8.25402 0.54464C8.39518 0.26232 8.68373 0.0839844 8.99937 0.0839844Z" fill="#FF6600" /></svg>
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M8.99937 0.0839844C9.31502 0.0839844 9.60357 0.26232 9.74473 0.54464L11.8938 4.84282L16.6193 5.53016C16.9332 5.57581 17.1939 5.79567 17.2919 6.09731C17.3899 6.39895 17.3082 6.73007 17.0811 6.95148L13.6419 10.3048L14.4155 15.0327C14.4667 15.3452 14.3363 15.6597 14.0791 15.8443C13.8218 16.0289 13.4822 16.0518 13.2025 15.9034L8.99937 13.6732L4.79622 15.9034C4.51653 16.0518 4.1769 16.0289 3.91968 15.8443C3.66246 15.6597 3.5321 15.3452 3.58323 15.0327L4.3569 10.3048L0.917623 6.95148C0.690535 6.73007 0.608818 6.39895 0.706824 6.09731C0.804829 5.79567 1.06556 5.57581 1.37942 5.53016L6.10493 4.84282L8.25402 0.54464C8.39518 0.26232 8.68373 0.0839844 8.99937 0.0839844Z" fill="#FF6600" /></svg>
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" >   <path d="M8.99937 0.0839844C9.31502 0.0839844 9.60357 0.26232 9.74473 0.54464L11.8938 4.84282L16.6193 5.53016C16.9332 5.57581 17.1939 5.79567 17.2919 6.09731C17.3899 6.39895 17.3082 6.73007 17.0811 6.95148L13.6419 10.3048L14.4155 15.0327C14.4667 15.3452 14.3363 15.6597 14.0791 15.8443C13.8218 16.0289 13.4822 16.0518 13.2025 15.9034L8.99937 13.6732L4.79622 15.9034C4.51653 16.0518 4.1769 16.0289 3.91968 15.8443C3.66246 15.6597 3.5321 15.3452 3.58323 15.0327L4.3569 10.3048L0.917623 6.95148C0.690535 6.73007 0.608818 6.39895 0.706824 6.09731C0.804829 5.79567 1.06556 5.57581 1.37942 5.53016L6.10493 4.84282L8.25402 0.54464C8.39518 0.26232 8.68373 0.0839844 8.99937 0.0839844Z" fill="#FF6600" /> </svg>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div >
  );
};

export default CatalogItem;
