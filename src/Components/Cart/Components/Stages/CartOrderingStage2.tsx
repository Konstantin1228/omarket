import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, } from '../../../../hooks/hooks';
import makeAnimated from 'react-select/animated';
import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from 'react-dadata';
import { IFormInputStage2, stageType3 } from '../../FunctionsAndTypes/types';
import ModalWindow from '../../../Other/ModalWindow';
import { PatternFormat } from 'react-number-format';
import { setGeneralInformation } from '../../../../redux/cart/slice';
import Select from "react-select";
import { getDocs, query, collection, where, getDoc, doc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { DeliviryAddress } from '../../../Profile/FunctionsAndTypes/types';
import { AntSwitch } from '../../../CustomComponents/AntSwtich';
import axios from 'axios';
import { calcCrow, onlyNumberInput } from '../../FunctionsAndTypes/functionHelpers';
const CartOrderingStage2: React.FC<stageType3> = ({ setStage, withoutDiscount, withDiscount, totalPoints, itemsInCart }) => {
    const dispatch = useAppDispatch()
    const [activeBonus, setActiveBonus] = useState(false)
    const [loading, setLoading] = useState(true)
    const [deliviryAdresses, setDeliviryAdresses] = useState<DeliviryAddress>({ cities: [{ city: "321312", isDefault: false }] })
    const [activeModal, setAciveModal] = useState(false)
    const { register, formState: { errors, isValid }, setValue, watch, handleSubmit, control, trigger, setError, clearErrors } = useForm<IFormInputStage2>({ mode: "onChange" })
    const watchWriteOffBonuses = watch("writeOffBonuses")
    const watchDeliviryCost = watch("deliviryCost")
    const [userAdress, setUserAdress] = useState("")

    useEffect(() => {
        try {
            const getData = async () => {
                const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
                const userRef = doc(db, 'users', q.docs[0].id);
                const docSnap = await getDoc(userRef);
                //@ts-ignore
                setDeliviryAdresses({ cities: docSnap.data().profileInformation.otherInformation.deliviryAdresses })
                //@ts-ignore
                // dispatch(setUserAdresses(docSnap.data().profileInformation.otherInformation.deliviryAdresses))
                setLoading(false)
            }
            getData()
        }
        catch (error) {
            console.log(error);
        }
    }, [])

    const onSubmit: SubmitHandler<IFormInputStage2> = async (data) => {
        const { adress, floor, flat, comment, writeOffBonuses, deliviryCost } = data
        dispatch(setGeneralInformation({ adress: userAdress ? userAdress : adress, floor, flat, comment, writeOffBonuses: Number(writeOffBonuses), deliviryCost }))
        setStage(3)
    };

    const adressOptions = deliviryAdresses.cities.map((el) => ({
        value: el.city,
        label: <div className="select-option">{el.city}</div>
    }))

    const validateAdressSuggestions = (e: DaDataSuggestion<DaDataAddress> | undefined) => {
        if (e) {
            const { region, city_with_type, street_with_type, house_type_full, house, geo_lat, geo_lon } = e.data
            const { value } = e
            setValue("adress", value)
            if (region === "Санкт-Петербург" || region === "Москва") {
                if ((city_with_type && street_with_type && house_type_full && house) !== null) {
                    const lengthBetweenPoints = calcCrow(59.93578, 30.3078, geo_lat, geo_lon)
                    console.log(lengthBetweenPoints, geo_lat, geo_lon);
                    if (lengthBetweenPoints < 13) {
                        withDiscount >= 1000 ? setValue("deliviryCost", 0) : setValue("deliviryCost", 300)
                        clearErrors("adress")
                        trigger("adress")
                    } else {
                        setError("adress", { type: "custom", message: "На данный адрес невозможна доставка!" })
                    }
                }
                else {
                    setError("adress", { type: "custom", message: "Укажите адрес в формате:город,улица,дом,номер дома!" })
                }
            } else {
                setError("adress", { type: "custom", message: "Адрес осуществляется только по г.Санкт-Петербург и по г.Москва!" })
            }
        }
    }

    const changeSelectAdress = async (newValue: any) => {
        setUserAdress(newValue.value)
        withDiscount >= 1000 ? setValue("deliviryCost", 0) : setValue("deliviryCost", 300)
        setValue("adress", newValue.value)
    }

    const setBonus = () => {
        setValue("writeOffBonuses", "")
        clearErrors("writeOffBonuses")
        setActiveBonus(!activeBonus)
    }

    return (
        <form className="cart__inner-notEmpty" onSubmit={handleSubmit(onSubmit)}>
            {loading ?
                <div className="container__loader-absolute">
                    <div className="lds-ring" ><div></div><div></div><div></div><div></div></div>
                </div>
                :
                <>
                    <div className="cart__inner-notEmpty-left">
                        <div className="cart__inner-notEmpty-left-ordering">
                            <ModalWindow active={activeModal} setActive={setAciveModal} type={'items'} />
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
                                {deliviryAdresses.cities.length > 0 &&
                                    <>
                                        <div className="cart__inner-notEmpty-left-ordering-adress-text">Выбрать существующий адрес доставки:</div>
                                        <div className="select-rotate">
                                            <Select value={userAdress ? adressOptions.find((el) => el.value === userAdress) : ""}
                                                classNamePrefix="reactSelect" maxMenuHeight={150}
                                                onChange={(newValue: any) => changeSelectAdress(newValue)}
                                                isSearchable={false} options={adressOptions} placeholder="Адрес" components={makeAnimated()}
                                            />
                                        </div>
                                    </>
                                }
                                <div className="cart__inner-notEmpty-left-ordering-adress-more" style={{ paddingBottom: 40 }}>
                                    {userAdress.length === 0 &&
                                        <Controller
                                            control={control}
                                            name="adress"
                                            render={({ fieldState: { error }, }) => (
                                                <div style={{ width: 250 }} className='auth__form-parent'>
                                                    <div className="cart__inner-notEmpty-left-ordering-adress-text">Адрес:</div>
                                                    <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                                                        <AddressSuggestions onChange={(e) => { validateAdressSuggestions(e) }}
                                                            currentSuggestionClassName={`input${error ? "-error" : ""}`}
                                                            highlightClassName="react-dadata__suggestions-liHelp" suggestionClassName="react-dadata__suggestions-li"
                                                            token='fa4b2c103c0b276d9f833e9a1351f45d3a8beda3' delay={500} count={3} minChars={2} inputProps={{ "placeholder": "Ввести" }}
                                                        />
                                                        {error && <p className="errorAuth" style={{ whiteSpace: "normal", bottom: -50, wordBreak: "break-all" }}>{error.message || "Ошибка!"}</p>}
                                                    </div>
                                                </div>
                                            )}
                                            rules={{
                                                required: "Поле обязательно к заполнению!"
                                            }}
                                        />
                                    }
                                    <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                                        <div className="cart__inner-notEmpty-left-ordering-adress-text">Квартира:</div>
                                        <Controller
                                            control={control}
                                            name="flat"
                                            render={({ fieldState: { error } }) => (
                                                <div className='auth__form-parent'>
                                                    <PatternFormat onValueChange={(e) => {
                                                        setValue("flat", e.value)
                                                        trigger("flat")
                                                    }}
                                                        placeholder='Ввести'
                                                        className={`input${error ? "-error" : ""}`} style={{ maxWidth: 200 }} format="###" />
                                                    {error && <p className="error">{error.message || "Ошибка!"}</p>}
                                                </div>
                                            )}
                                            rules={{
                                                required: "Поле обязательно к заполнению!",
                                                min: {
                                                    value: 1,
                                                    message: "Введите корректные данные!"
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                                        <div className="cart__inner-notEmpty-left-ordering-adress-text">Этаж:</div>
                                        <Controller
                                            control={control}
                                            name="floor"
                                            render={({ fieldState: { error } }) => (
                                                <div className='auth__form-parent' style={{ marginLeft: 10 }}>
                                                    <PatternFormat onValueChange={(e) => {
                                                        setValue("floor", e.value)
                                                        trigger("floor")
                                                    }} placeholder='Ввести'
                                                        className={`input${error ? "-error" : ""}`} style={{ maxWidth: 200 }} format="###" />
                                                    {error && <p className="error">{error?.message || "Ошибка!"}</p>}
                                                </div>
                                            )}
                                            rules={{
                                                required: "Поле обязательно к заполнению!",
                                                max: {
                                                    value: 100,
                                                    message: "Введите корректные данные!"
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="auth__form-parent">
                                    <div className="cart__inner-notEmpty-left-ordering-adress-text">Комментарий:</div>
                                    <input {...register('comment', {
                                        maxLength: {
                                            value: 150,
                                            message: "Превышено максимальное число допустимых символов!"
                                        }
                                    })} type="text"
                                        defaultValue={userAdress ? deliviryAdresses.cities[deliviryAdresses.cities.findIndex((el) => el.city == userAdress)].comment : ""}
                                        placeholder="Ввести" className={`input${errors.comment ? "-error" : ""}`} style={{ maxWidth: 600 }}
                                    />
                                    {errors.comment && <p className="error">{errors.comment?.message || "Ошибка!"}</p>}
                                </div>
                            </div>
                            <div className="cart__inner-notEmpty-left-ordering-adress">
                                <p className="bold">Бонусы:</p>
                                <div className="cart__inner-notEmpty-left-ordering-adress-more">
                                    <AntSwitch color="success" onChange={() => setBonus()} />
                                    <div className={!activeBonus ? "cart__inner-notEmpty-left-ordering-paymentType-bonuses-right-text bold" : "bold"}> Воспользоваться бонусами</div>
                                </div>
                                <div className="cart__inner-notEmpty-left-ordering-adress-more">
                                    <input disabled={!activeBonus} {...register("writeOffBonuses", {
                                        max: {
                                            value: withDiscount / 100 * 50,
                                            message: "Количество бонусов не может превысить более чем 50 % от стоимости чека"
                                        },
                                        min: {
                                            value: 150,
                                            message: "Минимальное количество бонусов к списанию:150!"
                                        },
                                        onChange: (e) => onlyNumberInput(e.target.value, setValue, 6, "writeOffBonuses")
                                    })} className={`cart__inner-notEmpty-left-ordering-paymentType-bonuses-paymentBonuses-${errors.writeOffBonuses ? "false" : "true"}`} placeholder="0" />
                                    <div className="cart__inner-notEmpty-left-ordering-paymentType-right">
                                        <div className={"cart__inner-notEmpty-left-ordering-paymentType-bonuses-right-text bold"}>Введите количество бонусов которые вы хотите потратить</div>
                                        {errors.writeOffBonuses && <p className="errorRelative" >{errors?.writeOffBonuses?.message || "Ошибка!"}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cart__inner-notEmpty-makeOrder">
                        <div className="cart__inner-notEmpty-makeOrder-promoCode">
                            <div className="cart__inner-notEmpty-makeOrder-promoCode-title">
                                Введите промокод:
                            </div>
                            <div className="cart__inner-notEmpty-makeOrder-promoCode-enter">
                                <input
                                    className="cart__inner-notEmpty-makeOrder-promoCode-enter-input"
                                    type="text"
                                    placeholder="Ввести"
                                />
                                <button className="cart__inner-notEmpty-makeOrder-promoCode-enter-button">
                                    Получить
                                </button>
                            </div>
                            <div className="cart__inner-notEmpty-makeOrder-promoCode-prompt">
                                Как получить промокод, если его нет?
                            </div>
                        </div>
                        <div className="cart__inner-notEmpty-makeOrder-count">
                            <div className="cart__inner-notEmpty-makeOrder-count-toCharge">
                                <div className="cart__inner-notEmpty-makeOrder-promoCode-title">
                                    Бонусы к начислению:
                                </div>
                                <div className="cart__inner-notEmpty-makeOrder-count-toCharge-totalBonus">
                                    {totalPoints}
                                    <svg
                                        width="22"
                                        height="16"
                                        viewBox="0 0 22 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11 0C17.075 0 22 2.686 22 6V10C22 13.314 17.075 16 11 16C5.033 16 0.176 13.409 0.005 10.177L0 10V6C0 2.686 4.925 0 11 0ZM11 12C7.28 12 3.99 10.993 2 9.45V10C2 11.882 5.883 14 11 14C16.01 14 19.838 11.97 19.995 10.118L20 10L20.001 9.45C18.011 10.992 14.721 12 11 12ZM11 2C5.883 2 2 4.118 2 6C2 7.882 5.883 10 11 10C16.117 10 20 7.882 20 6C20 4.118 16.117 2 11 2Z"
                                            fill="#0D0D0D"
                                        />
                                    </svg>
                                </div>
                            </div>
                            {itemsInCart.map(obj => obj.tags === 'discount' || obj.tags === 'bonus').includes(true) ?
                                <div className="cart__inner-notEmpty-makeOrder-count-totalPrice">
                                    <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-noDiscount">
                                        <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-noDiscount-text">
                                            Итоговая цена <span>без</span> скидки:
                                        </div>
                                        <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-noDiscount-text">
                                            {withoutDiscount}₽
                                        </div>
                                    </div>
                                    <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-withDiscount">
                                        <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-withDiscount-text">
                                            Итоговая цена <span>cо</span> скидкой:
                                        </div>
                                        <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-withDiscount-text">
                                            {withDiscount}₽
                                        </div>
                                    </div>
                                </div> :
                                <div className="cart__inner-notEmpty-makeOrder-count-totalPrice">
                                    <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-noDiscount">
                                        <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-noDiscount-text">
                                            Итоговая цена:
                                        </div>
                                        <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-noDiscount-text">
                                            {withDiscount}₽
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-prompt">
                                {watchDeliviryCost !== undefined ?
                                    <>
                                        <div className="cart__inner-notEmpty-makeOrder-count-totalPrice-prompt-bold">Доставка:</div>
                                        {watchDeliviryCost === 0 ?
                                            <div>От 1 000₽ бесплатно черте города</div>
                                            : "Стоимость доставки:300₽"}
                                    </>
                                    : <p>При покупке заказа до 1 000₽ - цена доставки 300₽. От 1 000₽ бесплатно в черте города. За чертой города доставка неосуществляется</p>}
                            </div>
                        </div>
                        <div className="cart__inner-notEmpty-makeOrder-grandTotal">
                            <div className="cart__inner-notEmpty-makeOrder-grandTotal-price">
                                <div className="cart__inner-notEmpty-makeOrder-grandTotal-price-text">
                                    Итоговая сумма:
                                </div>
                                <div className="cart__inner-notEmpty-makeOrder-grandTotal-price-text">
                                    {withDiscount}₽
                                </div>
                            </div>
                            {Number(watchWriteOffBonuses) > 0 &&
                                <div className="cart__inner-notEmpty-makeOrder-grandTotal-bonuses">
                                    <div className="cart__inner-notEmpty-makeOrder-grandTotal-bonuses-text">
                                        Оплата бонусами
                                    </div>
                                    <div className="cart__inner-notEmpty-makeOrder-grandTotal-bonuses-left">
                                        <div className={`cart__inner-notEmpty-makeOrder-grandTotal-bonuses-left-text-${errors.writeOffBonuses ? "red" : "green"}`}>-{watchWriteOffBonuses}</div>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.99984 2.66699C12.0498 2.66699 15.3332 4.45766 15.3332 6.66699V9.33366C15.3332 11.543 12.0498 13.3337 7.99984 13.3337C4.02184 13.3337 0.783837 11.6063 0.669837 9.45166L0.666504 9.33366V6.66699C0.666504 4.45766 3.94984 2.66699 7.99984 2.66699ZM7.99984 10.667C5.51984 10.667 3.3265 9.99566 1.99984 8.96699V9.33366C1.99984 10.5883 4.5885 12.0003 7.99984 12.0003C11.3398 12.0003 13.8918 10.647 13.9965 9.41233L13.9998 9.33366L14.0005 8.96699C12.6738 9.99499 10.4805 10.667 7.99984 10.667ZM7.99984 4.00033C4.5885 4.00033 1.99984 5.41233 1.99984 6.66699C1.99984 7.92166 4.5885 9.33366 7.99984 9.33366C11.4112 9.33366 13.9998 7.92166 13.9998 6.66699C13.9998 5.41233 11.4112 4.00033 7.99984 4.00033Z" fill={errors.writeOffBonuses ? "#F83C3C" : "#00953F"} />
                                        </svg>
                                    </div>
                                </div>
                            }
                        </div>
                        <button type='submit' className={isValid ? `button-submit` : `button-submit-false`}>Оплатить</button>
                    </div>
                </>
            }
        </form >
    )
}

export default CartOrderingStage2

