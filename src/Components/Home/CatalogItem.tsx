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
  return (
    <div className="item-wrapper"  >
      <div className="item">
        <div className="item-tags">
          {tags.includes("Новинка") && <div className="item-tag-new">Новинка</div>}
          {(tags.includes("discount") || tags.includes("bonus")) && <div className="item-tag-stock">Акция</div>}
          {tags.includes("discount") && <div className="item-tag-stock">-{discounts[0]}%</div>}
          {tags.includes("Хит") && <div className="item-tag-hit">Хит</div>}
        </div>
        <figure className="item-information">
          <img src={image.length > 5 ? image : "https://i.ibb.co/dkm3qTZ/no-image.png"} alt={title} />
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
            {tags.includes("discount") ?
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
      </div>
    </div >
  );
};

export default CatalogItem;
