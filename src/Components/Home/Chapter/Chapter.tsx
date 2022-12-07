import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Skeleton from "../../CustomComponents/Skeleton";
import CatalogItem from "./../CatalogItem";
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import { useMediaQuery } from "react-responsive";
import './chapter.scss';
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
        slidesPerView={useMediaQuery({ query: '(max-width: 768px)' }) ? 2 : 4}
      >
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
