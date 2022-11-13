import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Link } from 'react-router-dom';
import { Swiper as SwiperCore } from 'swiper/types';
import "./slider.scss"
import "swiper/css/pagination";

const Slider = () => {
    const swiperRef = useRef<SwiperCore>();
    return (
        <div className="slider">
            <Swiper
                className="slider__left"
                modules={[Autoplay, Pagination, Navigation]}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                <div className="slider__left-arrows">
                    <button onClick={() => swiperRef.current?.slidePrev()}>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.0607 7.93934C22.6464 8.52513 22.6464 9.47487 22.0607 10.0607L14.1213 18L22.0607 25.9393C22.6464 26.5251 22.6464 27.4749 22.0607 28.0607C21.4749 28.6464 20.5251 28.6464 19.9393 28.0607L10.9393 19.0607C10.3536 18.4749 10.3536 17.5251 10.9393 16.9393L19.9393 7.93934C20.5251 7.35355 21.4749 7.35355 22.0607 7.93934Z" fill="white" />
                        </svg>
                    </button>
                    <button onClick={() => swiperRef.current?.slideNext()}>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.9393 28.0607C13.3536 27.4749 13.3536 26.5251 13.9393 25.9393L21.8787 18L13.9393 10.0607C13.3536 9.47487 13.3536 8.52513 13.9393 7.93934C14.5251 7.35355 15.4749 7.35355 16.0607 7.93934L25.0607 16.9393C25.6464 17.5251 25.6464 18.4749 25.0607 19.0607L16.0607 28.0607C15.4749 28.6464 14.5251 28.6464 13.9393 28.0607Z" fill="white" />
                        </svg>
                    </button>
                </div>
                <SwiperSlide>
                    <Link to="">
                        <img src={require("../images/banner-dowload.png")} alt="dowload our app" className="slider__right-img" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to="">
                        <img src={require("../images/banner-dowload.png")} alt="dowload our app" className="slider__right-img" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to="">
                        <img src={require("../images/banner-dowload.png")} alt="dowload our app" className="slider__right-img" />
                    </Link>
                </SwiperSlide>
            </Swiper>
            <div className="slider__right">
                <img src={require("../images/slider-image2.png")} alt="stock" className="slider__right-img" />
                <img src={require("../images/slider-image.png")} alt="stock" className="slider__right-img" />
            </div>
        </div >
    )
}

export default Slider