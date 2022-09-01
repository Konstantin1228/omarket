import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { setCanTakeNewStep } from '../../redux/order/slice';
import ModalWindow from '../ModalWindow';
import CartRight from './CartRight';

export interface IFormInput {
    adress: String;
    flat: String;
    floor: String;
    comment: String;
    city: string
    bankCard: string
}
const CartOrderingStage2: React.FC = () => {
    const dispatch=useAppDispatch()
    const [activeModal, setAciveModal] = useState(false)
    const { register, formState: { errors, isValid }, handleSubmit, reset } = useForm<IFormInput>({ mode: 'onBlur' })
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
        // reset()
    };
    useEffect(() => {
        setIsValidState(isValid)
    }, [isValid])
    const [isValidState,setIsValidState]=useState(isValid)
    return (
        <form className="cart__inner-notEmpty" onSubmit={handleSubmit(onSubmit)}>
            <div className="cart__inner-notEmpty-left">
                <div className="cart__inner-notEmpty-left-ordering">
                    <ModalWindow active={activeModal} setActive={setAciveModal} type={'d'} />
                    <div className="cart__inner-notEmpty-left-ordering-orderNumber">
                        <div className="cart__inner-notEmpty-left-ordering-orderNumber-left">Заказ №976458</div>
                        <div className="cart__inner-notEmpty-left-ordering-orderNumber-right">
                            <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg" onClick={() => setAciveModal(true)}>
                                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.99967 4.99967C8.99967 6.10424 8.10424 6.99967 6.99967 6.99967C5.8951 6.99967 4.99967 6.10424 4.99967 4.99967C4.99967 3.89511 5.8951 2.99967 6.99967 2.99967C8.10424 2.99967 8.99967 3.89511 8.99967 4.99967Z" fill="#FF6600" />
                                    <path d="M13.596 4.70153C12.1571 1.82391 9.60176 0.333008 6.99967 0.333008C4.39759 0.333008 1.8422 1.82391 0.40339 4.70153C0.309547 4.88922 0.309547 5.11013 0.40339 5.29782C1.8422 8.17544 4.39759 9.66634 6.99967 9.66634C9.60176 9.66634 12.1571 8.17544 13.596 5.29782C13.6898 5.11013 13.6898 4.88922 13.596 4.70153ZM6.99967 8.33301C5.02048 8.33301 2.99838 7.25249 1.75278 4.99967C2.99838 2.74686 5.02048 1.66634 6.99967 1.66634C8.97887 1.66634 11.001 2.74686 12.2466 4.99967C11.001 7.25249 8.97887 8.33301 6.99967 8.33301Z" fill="#FF6600" />
                                </svg>
                            </div>
                            <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg">
                                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.666992 1.66634C0.666992 0.929962 1.26395 0.333008 2.00033 0.333008H7.33366C7.51047 0.333008 7.68004 0.403246 7.80506 0.52827L11.1384 3.8616C11.2634 3.98663 11.3337 4.1562 11.3337 4.33301V12.333C11.3337 13.0694 10.7367 13.6663 10.0003 13.6663H2.00033C1.26395 13.6663 0.666992 13.0694 0.666992 12.333V1.66634ZM9.72418 4.33301L7.33366 1.94248V4.33301H9.72418ZM6.00033 1.66634L2.00033 1.66634V12.333H10.0003V5.66634H6.66699C6.2988 5.66634 6.00033 5.36786 6.00033 4.99967V1.66634ZM3.33366 7.66634C3.33366 7.29815 3.63214 6.99967 4.00033 6.99967H8.00033C8.36852 6.99967 8.66699 7.29815 8.66699 7.66634C8.66699 8.03453 8.36852 8.33301 8.00033 8.33301H4.00033C3.63214 8.33301 3.33366 8.03453 3.33366 7.66634ZM3.33366 10.333C3.33366 9.96482 3.63214 9.66634 4.00033 9.66634H8.00033C8.36852 9.66634 8.66699 9.96482 8.66699 10.333C8.66699 10.7012 8.36852 10.9997 8.00033 10.9997H4.00033C3.63214 10.9997 3.33366 10.7012 3.33366 10.333Z" fill="#FF6600" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="cart__inner-notEmpty-left-ordering-adress">
                        <div className="cart__inner-notEmpty-left-ordering-adress-text">Выбрать существующий адрес доставки:</div>
                        <div className={"select-rotate"}>
                            <select {...register('city')} className='select__inner'  >
                                <option value="moscow">Москва</option>
                                <option value="berlin">Берлин</option>
                                <option value="paris">Париж</option>
                            </select>
                        </div>
                        <div className="cart__inner-notEmpty-left-ordering-adress-more">
                            <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                                <div className="cart__inner-notEmpty-left-ordering-adress-text">Адрес:</div>
                                <div>
                                    <input {...register('adress', {
                                        required: 'Поле обязательно к к заполнению!'
                                    })} type="text" placeholder="Ввести" className="cart__inner-notEmpty-left-ordering-adress-more-input-adress" />
                                    {errors.adress && <p className="error">{errors?.adress?.message || "Ошибка!"}</p>}
                                </div>
                            </div>
                            <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                                <div className="cart__inner-notEmpty-left-ordering-adress-text">Квартира:</div>
                                <div>
                                    <input {...register('flat', {
                                        required: 'Поле обязательно к к заполнению!'
                                    })} type="text" placeholder="Ввести" className="cart__inner-notEmpty-left-ordering-adress-more-input-adress" />
                                    {errors.flat && <p className="error">{errors?.flat?.message || "Ошибка!"}</p>}
                                </div>
                            </div>
                            <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                                <div className="cart__inner-notEmpty-left-ordering-adress-text">Этаж:</div>
                                <div>
                                    <input {...register('floor', {
                                        required: 'Поле обязательно к к заполнению!'
                                    })} type="text" placeholder="Ввести" className="cart__inner-notEmpty-left-ordering-adress-more-input-adress" />
                                    {errors.floor && <p className="error">{errors?.floor?.message || "Ошибка!"}</p>}
                                </div>
                            </div>
                            <div className="cart__inner-notEmpty-left-ordering-adress-more-bottom">
                            </div>
                        </div>
                        <div className="cart__inner-notEmpty-left-ordering-adress-text">Комментарий:</div>
                        <input {...register('comment')} type="text" placeholder="Ввести" className="cart__inner-notEmpty-left-ordering-adress-more-input-flat" style={{ maxWidth: 650 }} />
                    </div>
                    <div className="cart__inner-notEmpty-left-ordering-paymentType">
                        <div className="cart__inner-notEmpty-left-ordering-adress-text">Выбрать тип оплаты:</div>
                        {/* <Select options={optionsBankCard} isSearchable={false} placeholder='Выбрать' classNamePrefix="cart__inner-notEmpty-left-ordering-adress-select" /> */}
                        <div className={"select-rotate"}>
                            <select {...register('bankCard')} className='select__inner'>
                                <option value="visa/mastercard">Оплата картой (Visa, MasterCard)</option>
                                <option value="kaspiGold">Kaspi Gold</option>
                                <option value="kaspiQR">Kaspi QR</option>
                            </select>
                        </div>
                        <div className="cart__inner-notEmpty-left-ordering-paymentType-bonuses">
                            <input className="cart__inner-notEmpty-left-ordering-paymentType-bonuses-paymentBonuses-false" placeholder="0" />
                            <div className="cart__inner-notEmpty-left-ordering-paymentType-bonuses-right">
                                <div className="cart__inner-notEmpty-left-ordering-paymentType-bonuses-right-text"> Введите количество бонусов которые вы хотите потратить</div>
                                {/* <div className="cart__inner-notEmpty-left-ordering-paymentType-bonuses-right-text-error">Количество бонусов не может превысить более чем 50 % от стоимости чека</div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CartRight />

        </form>
    )
}

export default CartOrderingStage2