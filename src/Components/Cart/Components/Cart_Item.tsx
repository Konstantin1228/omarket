import React from "react";
import { countPlus, countMinus, deleteItem } from "../../../redux/cart/slice";
import { ItemsInCart } from "../../../redux/cart/types";
import { useAppDispatch } from "../../../hooks/hooks";
const Cart_Item: React.FC<ItemsInCart> = ({ title, count, discounts, image, points, price, tags, totalPoints, typeOfUnit, totalPrice, weight, canDeleteAndAdd }) => {
  const renderSVG = (tags: string) => {
    switch (tags) {
      case "bonus":
        return;
      case "discount":
        return "%";
      default:
        return;
    }
  };
  const renderTag = (tags: string) => {
    switch (tags) {
      case "bonus":
        return <div className="itemCart-left-text-bottom">
          <div className="itemCart-left-text-bottom-svg">
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.17631 0.353117C3.38854 0.443263 2.66114 0.948101 2.29233 1.66074C2.0692 2.09187 2.02358 2.29639 2.02345 2.86693C2.02339 3.14199 2.03359 3.43384 2.04614 3.51552L2.06895 3.66399H1.69333C1.22454 3.66399 1.08017 3.69922 0.900878 3.85735C0.664144 4.06608 0.666016 4.04895 0.666016 6.00013C0.666016 7.19813 0.676843 7.74279 0.702679 7.84557C0.753009 8.04583 0.972238 8.26545 1.17215 8.31586C1.25219 8.33606 1.47295 8.35259 1.66272 8.35259H2.00773V10.7448C2.00773 13.3593 2.00111 13.2601 2.1888 13.4582C2.23507 13.5071 2.32506 13.5739 2.38871 13.6067C2.50132 13.6647 2.65337 13.6663 7.98278 13.6663C12.865 13.6663 13.4737 13.6611 13.5771 13.6178C13.7309 13.5534 13.8596 13.4288 13.9304 13.2756C13.985 13.1574 13.9882 13.02 13.9888 10.7516L13.9895 8.35259H14.3427C14.8092 8.35259 14.9745 8.3037 15.1382 8.11732C15.2107 8.03483 15.2759 7.91983 15.2964 7.83838C15.3448 7.64593 15.3448 4.37066 15.2964 4.1782C15.2759 4.09675 15.2107 3.98175 15.1382 3.89926C14.9713 3.70925 14.8118 3.66399 14.3096 3.66399H13.9233L13.9486 3.51552C13.9625 3.43384 13.9739 3.14199 13.9738 2.86693C13.9737 2.43051 13.9644 2.33696 13.9007 2.13238C13.63 1.26296 12.9863 0.637184 12.1292 0.410099C11.786 0.319203 11.147 0.320296 10.7913 0.412412C10.2448 0.553914 9.7339 0.884179 9.15222 1.47194C8.80575 1.82206 8.32226 2.43089 8.11483 2.77828C8.06007 2.87002 8.00777 2.94507 7.99863 2.94507C7.98949 2.94507 7.93719 2.87002 7.88243 2.77828C7.4943 2.12828 6.63214 1.18072 6.11705 0.838043C5.50467 0.430697 4.87447 0.273223 4.17631 0.353117ZM5.03878 1.75726C5.36454 1.88226 5.76324 2.21365 6.15842 2.68788C6.38658 2.96167 6.84413 3.60104 6.84413 3.64605C6.84413 3.67946 4.40025 3.66449 4.11403 3.62932C3.76465 3.58641 3.53176 3.50117 3.42876 3.37852C3.35683 3.29293 3.34944 3.25821 3.34944 3.00671C3.34944 2.53304 3.45197 2.21927 3.68215 1.98869C3.97508 1.69528 4.59957 1.58875 5.03878 1.75726ZM11.6393 1.69687C12.3312 1.79136 12.6478 2.20252 12.6478 3.00671C12.6478 3.25821 12.6404 3.29293 12.5685 3.37852C12.4655 3.50117 12.2326 3.58641 11.8832 3.62932C11.597 3.66449 9.15312 3.67946 9.15312 3.64605C9.15312 3.6362 9.25163 3.48313 9.37204 3.30594C9.95893 2.44223 10.6044 1.84315 11.0877 1.71362C11.3004 1.65661 11.3366 1.65552 11.6393 1.69687ZM7.34337 6.00829V7.00853H4.67555H2.00773V6.00829V5.00805H4.67555H7.34337V6.00829ZM13.9895 6.00829V7.00853H11.3217H8.65388V6.00829V5.00805H11.3217H13.9895V6.00829ZM7.33579 10.3452L7.32777 12.3379L5.33861 12.3459L3.34944 12.354V10.3533V8.35259H5.34662H7.34384L7.33579 10.3452ZM12.6478 10.3533V12.354L10.6586 12.3459L8.66948 12.3379L8.66146 10.3452L8.65341 8.35259H10.6506H12.6478V10.3533Z" fill="url(#paint0_linear_1490_1090)" />
              <defs>
                <linearGradient id="paint0_linear_1490_1090" x1="18.3118" y1="4.29134" x2="4.41668" y2="19.576" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00953F" />
                  <stop offset="1" stopColor="#006834" />
                </linearGradient>
              </defs>
            </svg>

          </div>
          <div className="itemCart-left-text-bottom-textGreen">
            Условия акции выполнены
          </div></div>
      case "discount":
        return (<div className="itemCart-left-text-bottom">
          <div className="itemCart-left-text-bottom-svg">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0.666016 1.08856V1.84412H5.99836H11.3307V1.08856V0.333008H5.99836H0.666016V1.08856ZM0.666016 3.68856V4.46634H2.89133H5.11664V9.06634V13.6663H5.97737H6.8381V9.06674V4.46714L9.07391 4.45563L11.3097 4.44412L11.3212 3.67745L11.3327 2.91079H5.99937H0.666016V3.68856Z" fill="#00953F" />
            </svg>

          </div>
          <div className="itemCart-left-text-bottom-textGreen">
            Ценовая акция
          </div></div>)
      default:
        return <div className="itemCart-left-text-bottom">
          <div className="itemCart-left-text-bottom-svg">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.82253 0.183542C7.58589 -0.0530905 7.20364 -0.0530905 6.96701 0.183542L4 3.14448L1.03299 0.177474C0.79636 -0.0591581 0.414107 -0.0591581 0.177474 0.177474C-0.0591581 0.414107 -0.0591581 0.79636 0.177474 1.03299L3.14448 4L0.177474 6.96701C-0.0591581 7.20364 -0.0591581 7.58589 0.177474 7.82253C0.414107 8.05916 0.79636 8.05916 1.03299 7.82253L4 4.85552L6.96701 7.82253C7.20364 8.05916 7.58589 8.05916 7.82253 7.82253C8.05916 7.58589 8.05916 7.20364 7.82253 6.96701L4.85552 4L7.82253 1.03299C8.05309 0.802427 8.05309 0.414107 7.82253 0.183542Z" fill="#CFCFCF" />
            </svg>
          </div>
          <div className="itemCart-left-text-bottom-text">
            На этот товар нет акции
          </div></div>;
    }
  };
  const dispatch = useAppDispatch()
  return (
    <div className="itemCart">
      <div className="itemCart-left">
        <div className="itemCart-left-img">
          <img
            src={image.length > 5 ? image : "https://i.ibb.co/dkm3qTZ/no-image.png"}
            height={90}
            width={90}
            alt=""
          />
        </div>
        <div className="itemCart-left-text">
          <div className="itemCart-left-text-top">{`${title} ${weight} ${typeOfUnit}.`}</div>
          <div className="itemCart-left-text-bottom">
            {renderTag(tags)}
          </div>
        </div>
      </div>
      <div className="itemCart-right">
        <div className="itemCart-right-counter">
          {canDeleteAndAdd &&
            <button className="itemCart-right-counter-minus" onClick={() => dispatch(countMinus({ title, weight }))}>
              <svg
                width="12"
                height="2"
                viewBox="0 0 12 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.666016 0.999675C0.666016 0.631485 0.964492 0.333008 1.33268 0.333008H10.666C11.0342 0.333008 11.3327 0.631485 11.3327 0.999675C11.3327 1.36786 11.0342 1.66634 10.666 1.66634H1.33268C0.964492 1.66634 0.666016 1.36786 0.666016 0.999675Z"
                  fill="#FF6600"
                />
              </svg>
            </button>
          }
          <div className="itemCart-right-counter-totalCounter">{count}шт.</div>
          {canDeleteAndAdd &&
            <button className="itemCart-right-counter-plus" onClick={() => dispatch(countPlus({ title, weight }))}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99935 0.666992C6.36754 0.666992 6.66602 0.965469 6.66602 1.33366V5.33366H10.666C11.0342 5.33366 11.3327 5.63214 11.3327 6.00033C11.3327 6.36852 11.0342 6.667 10.666 6.667H6.66602V10.667C6.66602 11.0352 6.36754 11.3337 5.99935 11.3337C5.63116 11.3337 5.33268 11.0352 5.33268 10.667V6.667H1.33268C0.964492 6.667 0.666016 6.36852 0.666016 6.00033C0.666016 5.63214 0.964492 5.33366 1.33268 5.33366H5.33268V1.33366C5.33268 0.965469 5.63116 0.666992 5.99935 0.666992Z"
                  fill="#FF6600"
                />
              </svg>
            </button>
          }
        </div>
        <div className="itemCart-right-totalPrice">
          {tags == 'discount' ?
            <div className="itemCart-right-totalPrice-withDiscount">
              <div className="item-about-chapter-block-crossOut"></div>
              <div className="itemCart-right-totalPrice-withDiscount-lastPrice">
                {price * count}₽
              </div>
              <div className="itemCart-right-totalPrice-withDiscount-currentPrice">
                {totalPrice}₽
              </div>
              <div className="itemCart-right-totalPrice-withDiscount-currentPrice"></div>
            </div>
            :
            <div className="itemCart-right-totalPrice-noDiscount">
              {totalPrice}₽
            </div>
          }
        </div>
        {
          canDeleteAndAdd &&
          <button className="itemCart-right-delete" onClick={() => dispatch(deleteItem({ title, weight }))}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.66732 1.66634C3.66732 0.929961 4.26427 0.333008 5.00065 0.333008H9.00065C9.73703 0.333008 10.334 0.929962 10.334 1.66634V2.99967H11.6604C11.6646 2.99964 11.6687 2.99964 11.6728 2.99967H13.0007C13.3688 2.99967 13.6673 3.29815 13.6673 3.66634C13.6673 4.03453 13.3688 4.33301 13.0007 4.33301H12.2881L11.7099 12.428C11.66 13.1257 11.0794 13.6663 10.3799 13.6663H3.6214C2.92188 13.6663 2.34129 13.1257 2.29145 12.428L1.71324 4.33301H1.00065C0.632461 4.33301 0.333984 4.03453 0.333984 3.66634C0.333984 3.29815 0.632461 2.99967 1.00065 2.99967H2.32848C2.33262 2.99964 2.33674 2.99964 2.34087 2.99967H3.66732V1.66634ZM5.00065 2.99967H9.00065V1.66634H5.00065V2.99967ZM3.04997 4.33301L3.6214 12.333H10.3799L10.9513 4.33301H3.04997Z"
                fill="#F83C3C"
              />
            </svg>
          </button>
        }
      </div>
    </div>
  );
};

export default Cart_Item;
