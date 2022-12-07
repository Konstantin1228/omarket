import React, { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { addToCart, closePopup } from '../../redux/cart/slice'
import { addItemToasts } from '../../redux/toasts/slice'
import { useTransition, animated } from '@react-spring/web'
import "./itemBig.scss"
const CatalogItemBig: FC = () => {
    const dispatch = useAppDispatch()
    const { isActivePopup } = useAppSelector(state => state.cartSlice)
    const { id, title, description, image, tags, typeOfUnit, discounts, weight, points, price, } = useAppSelector(state => state.cartSlice.bigItemInformation)
    const renderSVG = (shareType: string | undefined) => {
        switch (shareType) {
            case "bonus":
                return (
                    <svg onMouseEnter={() => setPrompt(true)} onMouseLeave={() => setPrompt(false)} width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" >   <path fillRule="evenodd" clipRule="evenodd" d="M4.5767 1.35409C3.78893 1.44424 3.06153 1.94908 2.69272 2.66171C2.46959 3.09285 2.42397 3.29736 2.42384 3.8679C2.42378 4.14297 2.43399 4.43482 2.44653 4.51649L2.46934 4.66497H2.09372C1.62493 4.66497 1.48056 4.70019 1.30127 4.85832C1.06453 5.06706 1.06641 5.04993 1.06641 7.00111C1.06641 8.19911 1.07723 8.74377 1.10307 8.84654C1.1534 9.04681 1.37263 9.26642 1.57254 9.31684C1.65258 9.33703 1.87334 9.35357 2.06311 9.35357H2.40812V11.7458C2.40812 14.3603 2.4015 14.2611 2.58919 14.4592C2.63546 14.508 2.72545 14.5749 2.7891 14.6077C2.90171 14.6657 3.05376 14.6673 8.38317 14.6673C13.2653 14.6673 13.8741 14.662 13.9775 14.6188C14.1313 14.5544 14.26 14.4298 14.3308 14.2766C14.3854 14.1584 14.3886 14.021 14.3892 11.7526L14.3899 9.35357H14.7431C15.2095 9.35357 15.3749 9.30468 15.5386 9.11829C15.6111 9.03581 15.6763 8.92081 15.6968 8.83935C15.7452 8.6469 15.7452 5.37163 15.6968 5.17918C15.6763 5.09772 15.6111 4.98273 15.5386 4.90024C15.3717 4.71023 15.2122 4.66497 14.71 4.66497H14.3237L14.349 4.51649C14.3629 4.43482 14.3743 4.14297 14.3742 3.8679C14.3741 3.43149 14.3648 3.33793 14.3011 3.13336C14.0304 2.26393 13.3867 1.63816 12.5296 1.41108C12.1864 1.32018 11.5474 1.32127 11.1917 1.41339C10.6452 1.55489 10.1343 1.88516 9.55261 2.47292C9.20614 2.82303 8.72265 3.43186 8.51522 3.77926C8.46046 3.871 8.40816 3.94605 8.39902 3.94605C8.38988 3.94605 8.33758 3.871 8.28282 3.77926C7.89469 3.12926 7.03253 2.18169 6.51744 1.83902C5.90506 1.43167 5.27486 1.2742 4.5767 1.35409ZM5.43917 2.75824C5.76493 2.88323 6.16363 3.21462 6.55881 3.68886C6.78697 3.96264 7.24452 4.60201 7.24452 4.64702C7.24452 4.68044 4.80064 4.66547 4.51442 4.6303C4.16504 4.58738 3.93215 4.50215 3.82915 4.37949C3.75723 4.29391 3.74983 4.25918 3.74983 4.00769C3.74983 3.53401 3.85236 3.22025 4.08254 2.98967C4.37547 2.69625 4.99996 2.58973 5.43917 2.75824ZM12.0397 2.69785C12.7316 2.79234 13.0482 3.2035 13.0482 4.00769C13.0482 4.25918 13.0408 4.29391 12.9689 4.37949C12.8659 4.50215 12.633 4.58738 12.2836 4.6303C11.9974 4.66547 9.55351 4.68044 9.55351 4.64702C9.55351 4.63718 9.65202 4.48411 9.77243 4.30691C10.3593 3.44321 11.0048 2.84413 11.4881 2.7146C11.7008 2.65759 11.737 2.65649 12.0397 2.69785ZM7.74376 7.00927V8.0095H5.07594H2.40812V7.00927V6.00903H5.07594H7.74376V7.00927ZM14.3899 7.00927V8.0095H11.7221H9.05427V7.00927V6.00903H11.7221H14.3899V7.00927ZM7.73618 11.3462L7.72816 13.3389L5.739 13.3469L3.74983 13.355V11.3543V9.35357H5.74702H7.74423L7.73618 11.3462ZM13.0482 11.3543V13.355L11.059 13.3469L9.06987 13.3389L9.06185 11.3462L9.0538 9.35357H11.051H13.0482V11.3543Z" fill="#F83C3C" /> </svg>
                );
            case "discount":
                return "%";
            default:
                return (
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"  >    <path d="M12.2229 4.18354C11.9863 3.94691 11.604 3.94691 11.3674 4.18354L8.40039 7.14448L5.43338 4.17747C5.19675 3.94084 4.8145 3.94084 4.57787 4.17747C4.34123 4.41411 4.34123 4.79636 4.57787 5.03299L7.54487 8L4.57787 10.967C4.34123 11.2036 4.34123 11.5859 4.57787 11.8225C4.8145 12.0592 5.19675 12.0592 5.43338 11.8225L8.40039 8.85552L11.3674 11.8225C11.604 12.0592 11.9863 12.0592 12.2229 11.8225C12.4595 11.5859 12.4595 11.2036 12.2229 10.967L9.25591 8L12.2229 5.03299C12.4535 4.80243 12.4535 4.41411 12.2229 4.18354Z" fill="#F83C3C" />  </svg>
                );
        }
    };
    const shareType = tags.find((tag) => tag === "bonus" || tag === "discount")
    const [prompt, setPrompt] = useState(false);
    const [items, setItems] = useState(tags.includes("bonus") || tags.includes("discount")
        ? tags.includes("discount")
            ? weight.map((weight, idx) => ({
                count: 1, weight, points: points[idx], defaultPrice: price[idx],
                price: price[idx] - Math.round(price[idx] / 100 * discounts[idx]), totalPrice: price[idx] - Math.round(price[idx] / 100 * discounts[idx])
            }))
            : weight.map((weight, idx) => ({ weight, points: points[idx], price: price[idx], count: 1, totalPrice: price[idx] }))
        : weight.map((weight, idx) => ({ weight: weight, points: points[idx], price: price[idx], count: 1, totalPrice: price[idx] })));
    const [estimatedPrice, setEstimatedPrice] = useState(items.reduce((previous, current) => previous + current.totalPrice, 0));
    const [totalBonus, setTotalBonus] = useState(items.reduce((previous, obj) => previous + obj.points * obj.count, 0));

    const addItem = (idx: number) => {
        const item = items[idx]
        item.count += 1;
        tags.includes("discount") ? item.totalPrice = item.price * item.count : item.totalPrice = price[idx] * item.count;
        item.points = points[idx] * item.count;
        setEstimatedPrice(items.reduce((previous, current) => previous + current.totalPrice, 0))
        setTotalBonus(items.reduce((previous, current) => previous + current.points, 0));
    };

    const minusItem = (idx: number) => {
        const item = items[idx]
        if (item.count !== 0) {
            item.count -= 1;
            tags.includes("discount") ? item.totalPrice = item.price * item.count : item.totalPrice = price[idx] * item.count;
            item.points = points[idx] * item.count
            setEstimatedPrice(items.reduce((previous, current) => previous + current.totalPrice, 0))
            setTotalBonus(items.reduce((previous, current) => previous + current.points, 0));
        }
    };

    const transition = useTransition(isActivePopup, {
        from: { scale: 0, opacity: 0, },
        enter: { scale: 1, opacity: 1, },
        leave: { scale: 0, opacity: 0, },
        config: { duration: 250 }
    })

    const containerTransition = useTransition(isActivePopup, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });

    const addItemsToCart = () => {
        items.map(({ weight, points, price, count }, idx) => {
            if (count !== 0) {
                dispatch(
                    addToCart(
                        discounts[0] !== undefined ?
                            //@ts-ignore
                            { title, count, price, weight, points, image, defaultPrice: items[idx].defaultPrice, tags: shareType || "", typeOfUnit }
                            :
                            { title, count, price, weight, points, image, tags: shareType || "", typeOfUnit }
                    ))
                dispatch(addItemToasts({ title, img: image, id, typeOfUnit, weight, count }))
            }
        })
    }

    const totalCount = items.reduce((previous, current) => previous + current.count, 0) > 0

    return (
        <div className='modal-active' onClick={() => dispatch(closePopup())} >
            {transition((style, isActivePopup) => (
                isActivePopup ?
                    <animated.div style={{ ...style }} className="modal__content item-big" onClick={(e) => e.stopPropagation()} >
                                <div className="item-tags">
                                    {tags.includes("Новинка") && <div className="item-tag-new">Новинка</div>}
                                    {shareType === "discount" || shareType === "bonus" && <div className="item-tag-stock">Акция</div>}
                                    {shareType === "discount" && <div className="item-tag-stock">-{discounts[0]}%</div>}
                                    {tags.includes("Хит") && <div className="item-tag-hit">Хит</div>}
                                </div>
                                <figure className="item-big-information">
                                    <img src={image.length > 5 ? image : "https://i.ibb.co/dkm3qTZ/no-image.png"} alt={title} />
                                    <h1 className="item-big-information-title">{title}</h1>
                                    <figcaption className="item-information-description">{description}</figcaption>
                                </figure>
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
                                                <span>{items[idx].points}</span>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >   <path d="M7.99935 2.66797C12.0493 2.66797 15.3327 4.45864 15.3327 6.66797V9.33463C15.3327 11.544 12.0493 13.3346 7.99935 13.3346C4.02135 13.3346 0.783349 11.6073 0.669349 9.45263L0.666016 9.33463V6.66797C0.666016 4.45864 3.94935 2.66797 7.99935 2.66797ZM7.99935 10.668C5.51935 10.668 3.32602 9.99663 1.99935 8.96797V9.33463C1.99935 10.5893 4.58802 12.0013 7.99935 12.0013C11.3393 12.0013 13.8913 10.648 13.996 9.4133L13.9993 9.33463L14 8.96797C12.6733 9.99597 10.48 10.668 7.99935 10.668ZM7.99935 4.0013C4.58802 4.0013 1.99935 5.4133 1.99935 6.66797C1.99935 7.92264 4.58802 9.33463 7.99935 9.33463C11.4107 9.33463 13.9993 7.92264 13.9993 6.66797C13.9993 5.4133 11.4107 4.0013 7.99935 4.0013Z" fill="#0D0D0D" /> </svg>
                                            </div>
                                            {
                                                tags.includes("discount") ?
                                                    <div className="item-big-about-chapter-block">
                                                        {items[idx].totalPrice !== 0 &&
                                                            <>
                                                                <div className="item-big-about-chapter-block-crossOut"></div>
                                                                <span className="item-big-about-chapter-block-lastPrice">{price[idx] * items[idx].count}₽</span>
                                                            </>
                                                        }
                                                        <span className="item-big-about-chapter-price">{Math.round(price[idx] - price[idx] / 100 * discounts[idx]) * items[idx].count}₽</span>
                                                    </div>
                                                    :
                                                    <span className='item-big-about-chapter-price'>{items[idx].price * items[idx].count}₽</span>
                                            }
                                        </div>
                                    ))}
                                    <div className="item-big-total">
                                        <span className="item-big-totalPrice">Итог:{estimatedPrice}₽</span>
                                        <span className="item-big-totalBonus">
                                            Бонус:{totalBonus}
                                            <svg style={{ cursor: "default" }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M7.99935 2.66797C12.0493 2.66797 15.3327 4.45864 15.3327 6.66797V9.33463C15.3327 11.544 12.0493 13.3346 7.99935 13.3346C4.02135 13.3346 0.783349 11.6073 0.669349 9.45263L0.666016 9.33463V6.66797C0.666016 4.45864 3.94935 2.66797 7.99935 2.66797ZM7.99935 10.668C5.51935 10.668 3.32602 9.99663 1.99935 8.96797V9.33463C1.99935 10.5893 4.58802 12.0013 7.99935 12.0013C11.3393 12.0013 13.8913 10.648 13.996 9.4133L13.9993 9.33463L14 8.96797C12.6733 9.99597 10.48 10.668 7.99935 10.668ZM7.99935 4.0013C4.58802 4.0013 1.99935 5.4133 1.99935 6.66797C1.99935 7.92264 4.58802 9.33463 7.99935 9.33463C11.4107 9.33463 13.9993 7.92264 13.9993 6.66797C13.9993 5.4133 11.4107 4.0013 7.99935 4.0013Z" fill="#0D0D0D" /></svg>
                                        </span>
                                    </div>
                                    {totalCount ?
                                        <button className="item-big-addToCart" onClick={addItemsToCart}> Добавить в корзину</button>
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
                    </animated.div>
                    : null
            ))}
        </div >
    )
}

export default CatalogItemBig