import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
interface Props {
    stage: number
    setStage: React.Dispatch<React.SetStateAction<number>>
    isMobile: boolean
}
const CartPath: React.FC<Props> = ({ stage, setStage, isMobile }) => {
    return (
        <>
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
                    : ""
                }
            </div>
            <div className="cart__title" onClick={() => setStage(stage !== 1 ? stage - 1 : 1)} style={{ cursor: `${stage !== 1 ? "pointer" : "default"}` }}>
                {isMobile ?
                    <>
                        {stage === 1 &&
                            <>
                                <div className="cart__path-ul">
                                    <ArrowBackIosIcon />
                                    <span className="cart__path-black" onClick={() => setStage(1)}>Корзина</span>
                                </div>
                                <span className="cart__path-gray">Очистить</span>
                            </>
                        }
                        {stage === 2 &&
                            <div className="cart__path-ul">
                                <ArrowBackIosIcon />
                                <span className="cart__path-black" onClick={() => setStage(2)}>Оформление заказа</span>
                            </div>
                        }
                        {stage === 3 &&
                            <div className="cart__path-ul">
                                <ArrowBackIosIcon />
                                <span className="cart__path-black" onClick={() => setStage(3)}>Оплата</span>
                            </div>
                        }
                    </>
                    :
                    <>
                        {stage === 1 && <span className="cart__title-title">Корзина</span>}
                        {stage === 2 &&
                            <>
                                <span className="cart__title-arrow">❮</span>
                                <span className="cart__title-title" onClick={() => setStage(2)}>Оформление заказа</span>
                            </>
                        }
                        {stage >= 3 &&
                            <>
                                {stage != 4 && <span className="cart__title-arrow">❮</span>}
                                <span className="cart__title-title" onClick={() => setStage(3)} >Оплата</span>
                            </>
                        }
                    </>
                }
            </div>
        </>
    )
}

export default CartPath