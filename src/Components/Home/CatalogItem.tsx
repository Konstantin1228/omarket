import React, { useState, useCallback } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    <div className="item-wrapper">
      <div className="item">
        <div className="item-tags">
          {tags.includes("Новинка") && <div className="item-tag-new">Новинка</div>}
          {(tags.includes("discount") || tags.includes("bonus")) && <div className="item-tag-stock">Акция</div>}
          {tags.includes("discount") && discounts[0] !== 0 && <div className="item-tag-stock">-{discounts[0]}%</div>}
          {tags.includes("Хит") && <div className="item-tag-hit">Хит</div>}
        </div>
        <figure className="item-information">
          <img src={image.length > 5 ? image : "https://i.ibb.co/dkm3qTZ/no-image.png"} alt={title} />
          <h1 className="item-information-title">{title}</h1>
          <figcaption className="item-information-description">{description}</figcaption>
        </figure>
        <div className="item-about">
          <div className="item-about-chapter">
            <span className="item-about-chapter-weight">{typeOfUnit === 'л' ? "Литраж" : "Вес"}</span>
            <span className="item-about-chapter-price">Цена</span>
          </div>
          <div className="item-about-chapter-bottom">
            <span className="item-about-chapter-weight">  {`${weight[0]} ${typeOfUnit}`}.</span>
            {tags.includes("discount") && discounts[0] !== 0 ?
              <div className="item-about-chapter-block">
                <div className="item-about-chapter-block-crossOut"></div>
                <span className="item-about-chapter-block-lastPrice">{price[0]}₽</span>
                <span className="item-about-chapter-price">{Math.ceil(price[0] - (price[0] / 100) * discounts[0])}₽</span>
              </div>
              :
              <span className="item-about-chapter-price">{price[0]}₽</span>
            }
          </div>
          <button className="item-about-more" onClick={() => dispatch(openPopup({ id, title, description, image, tags, typeOfUnit, discounts, weight, points, price }))}>
            <span>  Подробнее</span>
            <ExpandMoreIcon sx={{ color: "#FF6600", fontWeight: "600" }} />
          </button>
        </div>
      </div>
    </div >
  );
};

export default CatalogItem;
