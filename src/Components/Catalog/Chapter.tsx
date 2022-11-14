import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Skeleton from "../CustomComponents/Skeleton";
import CatalogItem from "./CatalogItem";
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import 'swiper/css';
interface ChapterProps {
  title: string;
  titleTheme: string;
  databaseName?: string;
  tagSorting?: string;
};
export interface GoodsType {
  id: number,
  discounts: number[]
  description: string
  image: string
  points: number[]
  price: number[]
  tags: string[]
  title: string
  typeOfUnit: string
  weight: number[]
}
const Chapter: React.FC<ChapterProps> = ({ title, titleTheme, databaseName, tagSorting }) => {
  const [goods, setGoods] = useState<GoodsType[]>([]);
  const [loading, setLoading] = useState(true)
  const swiperRef = useRef<SwiperCore>();

  useEffect(() => {
    setLoading(true)
    if (databaseName) {
      // const getRes = async () => {
      //   await axios.get(`http://localhost:3001/${databaseName}?_limit=4&_page=${page}`).then((res) => {
      //     setTotalPages(Math.ceil(Number(res.headers["x-total-count"]) / 4))
      //     totalPages >= page && setGoods(res.data);
      //   });
      //   setLoading(false)
      // };
      // getRes();
    } else if (tagSorting) {
      const getRes = async () => {
        await axios.get(`https://636a3f3db10125b78fd50f7d.mockapi.io/goods/goods/?tags=${tagSorting}`).then((res) => {
          setGoods(res.data);
        });
        setLoading(false)
      };
      getRes();
    }
  }, []);

  return (
    <div className="chapter">
      <div className="chapter-top">
        <h1 className={`chapter-title-${titleTheme}`}>{title}</h1>
        <div className="chapter-top-pagination">
          <button className="chapter-top-pagination-svg" onClick={() => swiperRef.current?.slidePrev()}>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.44635 0.251051C6.73924 0.585787 6.73924 1.1285 6.44635 1.46323L2.47668 6L6.44635 10.5368C6.73924 10.8715 6.73924 11.4142 6.44635 11.7489C6.15345 12.0837 5.67858 12.0837 5.38569 11.7489L0.885689 6.60609C0.592797 6.27136 0.592797 5.72864 0.885689 5.39391L5.38569 0.251051C5.67858 -0.0836839 6.15345 -0.0836838 6.44635 0.251051Z" fill="#FF6600" />
            </svg>
          </button>
          <button className="chapter-top-pagination-svg" onClick={() => swiperRef.current?.slideNext()}>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path d="M0.553654 11.7489C0.260761 11.4142 0.260761 10.8715 0.553654 10.5368L4.52332 6L0.553654 1.46323C0.260761 1.1285 0.260761 0.585785 0.553654 0.25105C0.846547 -0.0836859 1.32142 -0.0836859 1.61431 0.25105L6.11431 5.39391C6.4072 5.72864 6.4072 6.27136 6.11431 6.60609L1.61431 11.7489C1.32142 12.0837 0.846547 12.0837 0.553654 11.7489Z" fill="#FF6600" />
            </svg>
          </button>
        </div>
      </div>
      <Swiper
        className="chapter-bottom"
        modules={[Navigation, A11y]}
        speed={300}
        spaceBetween={50}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={4}
      >
        {/* <div className={"item-big-about"}  >
          <div className="item-big-about-chapter" >
            <span className="item-about-chapter-weight">Вес</span>
            <span className="item-big-about-chapter-price">Цена</span>
          </div>
          <div className="item-big-about-chapter">
            <div className="item-big-about-chapter-weight">1</div>
            <div className="item-big-about-chapter-amount">
              <button className="item-big-about-chapter-amount-minus">-</button>
              <span className="item-big-about-chapter-amount-total">{`3 шт`}</span>
              <button className="item-big-about-chapter-amount-plus" >+</button>
            </div>
            <div className="item-big-about-chapter-shareType">
              132
            </div>
            <div className="item-big-about-chapter-bonus">
              3
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >   <path d="M7.99935 2.66797C12.0493 2.66797 15.3327 4.45864 15.3327 6.66797V9.33463C15.3327 11.544 12.0493 13.3346 7.99935 13.3346C4.02135 13.3346 0.783349 11.6073 0.669349 9.45263L0.666016 9.33463V6.66797C0.666016 4.45864 3.94935 2.66797 7.99935 2.66797ZM7.99935 10.668C5.51935 10.668 3.32602 9.99663 1.99935 8.96797V9.33463C1.99935 10.5893 4.58802 12.0013 7.99935 12.0013C11.3393 12.0013 13.8913 10.648 13.996 9.4133L13.9993 9.33463L14 8.96797C12.6733 9.99597 10.48 10.668 7.99935 10.668ZM7.99935 4.0013C4.58802 4.0013 1.99935 5.4133 1.99935 6.66797C1.99935 7.92264 4.58802 9.33463 7.99935 9.33463C11.4107 9.33463 13.9993 7.92264 13.9993 6.66797C13.9993 5.4133 11.4107 4.0013 7.99935 4.0013Z" fill="#0D0D0D" /> </svg>
            </div>
            <div className="item-big-about-chapter-block">
              <div className="item-about-chapter-block-crossOut"></div>
              <span className="item-about-chapter-block-lastPrice">32131₽</span>
            </div>
          </div>
          <div className="item-big-total">
            <span className="item-big-totalPrice">Итог:{`${3213213}₽`}</span>
            <span className="item-big-totalBonus">
              Бонус:{312312}
              <svg style={{ cursor: "default" }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M7.99935 2.66797C12.0493 2.66797 15.3327 4.45864 15.3327 6.66797V9.33463C15.3327 11.544 12.0493 13.3346 7.99935 13.3346C4.02135 13.3346 0.783349 11.6073 0.669349 9.45263L0.666016 9.33463V6.66797C0.666016 4.45864 3.94935 2.66797 7.99935 2.66797ZM7.99935 10.668C5.51935 10.668 3.32602 9.99663 1.99935 8.96797V9.33463C1.99935 10.5893 4.58802 12.0013 7.99935 12.0013C11.3393 12.0013 13.8913 10.648 13.996 9.4133L13.9993 9.33463L14 8.96797C12.6733 9.99597 10.48 10.668 7.99935 10.668ZM7.99935 4.0013C4.58802 4.0013 1.99935 5.4133 1.99935 6.66797C1.99935 7.92264 4.58802 9.33463 7.99935 9.33463C11.4107 9.33463 13.9993 7.92264 13.9993 6.66797C13.9993 5.4133 11.4107 4.0013 7.99935 4.0013Z" fill="#0D0D0D" /></svg>
            </span>
            <button className="item-big-addToCart"
            >
              Добавить в корзину
            </button>
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
        </div> */}
        {loading && [...new Array(4)].map((el, idx) => <SwiperSlide key={idx}> <Skeleton key={idx} /> </SwiperSlide >)}
        {!loading && tagSorting ?
          goods.map((obj) => <SwiperSlide key={obj.id}><CatalogItem key={`${obj.id}__${obj.title}`} {...obj} /> </SwiperSlide >) :
          goods.map((obj) => <SwiperSlide key={obj.id}><CatalogItem key={`${obj.id}__${obj.title}`} {...obj} /> </SwiperSlide >)
        }
      </Swiper>
    </div>
  );
};

export default Chapter;
