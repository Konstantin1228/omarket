import React from 'react'
import { useAppSelector } from '../redux/hooks/hooks'
import Cart_Item from './Cart/Cart_Item'
interface ModalWindow {
    active: boolean
    setActive: React.Dispatch<React.SetStateAction<boolean>>
    type: string,
}

const ModalWindow: React.FC<ModalWindow> = ({ active, setActive, type }) => {
    const { itemsInCart } = useAppSelector((state) => state.cartSlice)
    return (
        <div className={active ? 'modal-active' : 'modal'} onClick={() => setActive(false)}>
            {/* e.stopPropagation()-прекращает передачу текущего события   */}
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <div className="modal__content-top">
                    <div className="modal__content-top-title">Заказ №976458</div>
                    <div className="modal__content-top-svg" onClick={() => setActive(false)}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="#0D0D0D" />
                        </svg>

                    </div>
                </div>
                <div className="modal__content-bottom">
                    <div className="cart__inner-notEmpty-left-items" style={{}}>
                        {itemsInCart.map((obj) => <Cart_Item key={`${obj.title}__${obj.weight}`} {...obj} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow