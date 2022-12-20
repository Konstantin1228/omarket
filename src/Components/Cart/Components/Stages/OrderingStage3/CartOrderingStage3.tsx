import React, { useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler, } from 'react-hook-form'
import { NumberFormatBase, PatternFormat } from 'react-number-format'
import { BankCard, stageType3 } from '../../../FunctionsAndTypes/types'
import ModalWindow from '../../../../Other/ModalWindow/ModalWindow'
import Select from "react-select";
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks'
import makeAnimated from 'react-select/animated';
import { setBankCardInformation } from '../../../../../redux/cart/slice'
import { BankCards } from '../../../../../redux/user/types'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../../firebase'
import axios from 'axios'
import "./stage3.scss"
function CardExpiry(props: any) {
    const format = (val: string) => {
        if (val === "") return "";
        let month = val.substring(0, 2);
        let year = val.substring(2, 4);
        if (month.length === 1 && Number(month[0]) > 1) {
            month = `0${month[0]}`;
        } else if (month.length === 2) {
            if (Number(month) === 0) {
                month = `01`;
            } else if (Number(month) > 12) {
                month = "12";
            }
        }
        if (year.length === 1 && Number(year[0]) >= 0) {
            year = `2`;
        } else if (year.length === 2) {
            if (Number(year) === 0) {
                year = `20`;
            } else if (Number(year) >= 29) {
                year = "29";
            }
            else if (Number(year) <= 22) {
                year = "22"
            }
        }
        return `${month}/${year}`;
    };
    return <NumberFormatBase placeholder='ММ/ГГ' {...props} format={format} />;
}
const CartOrderingStage3: React.FC<stageType3> = ({ withDiscount, setStage }) => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true)
    const [activeModal, setAciveModal] = useState(false)
    const [userBankCard, setUserBankCard] = useState<BankCard>({ bankCard: "", CVC: "", date: "", scheme: "" })
    const [bankCardData, setBankCardData] = useState<BankCards>({ bankCards: [{ CVC: "", bankCard: "", date: "", scheme: "" }], haveBankCards: false })
    const { formState: { isValid }, setValue, control, handleSubmit, trigger, setError } = useForm<BankCard>({ mode: "onChange", shouldFocusError: true })
    const { writeOffBonuses, adress, floor, flat, deliviryCost } = useAppSelector(state => state.cartSlice.userInformation.generalInformation)

    useEffect(() => {
        const getData = async () => {
            try {
                const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
                const userRef = doc(db, 'users', q.docs[0].id);
                const docSnap = await getDoc(userRef);
                // console.log(docSnap.data()?.profileInformation?.otherInformation?.bankCards.length)
                docSnap.data()?.profileInformation?.otherInformation?.bankCards.length ? setBankCardData({ bankCards: docSnap.data()?.profileInformation?.otherInformation?.bankCards, haveBankCards: true })
                    : setBankCardData({ bankCards: docSnap.data()?.profileInformation?.otherInformation?.bankCards, haveBankCards: false })
                // dispatch(setUserAdresses(docSnap.data().profileInformation.otherInformation.deliviryAdresses))
            }
            catch (error) {
                console.log(error);
            }
            setLoading(false)
        }
        getData()
    }, [])

    const onSubmit: SubmitHandler<BankCard> = async (data) => {
        const { date, bankCard, CVC } = data
        let axiosAnswer: any = ""
        await axios.get(`https://lookup.binlist.net/${bankCard.slice(0, 6)}`).then((res) => axiosAnswer = res.data).catch((status) => axiosAnswer = status.message)
        if (typeof axiosAnswer === "object") {
            userBankCard.bankCard.length > 3 ?
                dispatch(setBankCardInformation({ bankCard: userBankCard.bankCard, CVC: userBankCard.CVC, date: userBankCard.date, scheme: userBankCard.scheme }))
                :
                dispatch(setBankCardInformation({ bankCard, CVC, date, scheme: axiosAnswer.scheme }))
            setStage(4)
        } else {
            setError("bankCard", { type: "custom", message: "Проверьте правильность ввода!" })
        }
    };

    const selectBankCard = (newValue: any) => {
        const { CVC, value, date, scheme } = newValue
        setUserBankCard({ CVC, bankCard: value, date, scheme })
        setValue("bankCard", value)
        setValue("CVC", CVC)
        setValue("date", date)
        setValue("scheme", scheme)
    }

    const bankCardsOptions = bankCardData.haveBankCards ? bankCardData.bankCards.map(({ bankCard, date, scheme, CVC }, idx) => ({
        value: bankCard,
        date,
        scheme,
        CVC,
        label:
            <>
                {(scheme === "Visa" || scheme === "Mastercard" || scheme === "Jcb" || scheme === "Amex")
                    ? <img src={require(`../../../../../images/cards/${scheme}.png`)} alt={scheme} /> :
                    <img src={require(`../../../../../images/cards/unkownCard.png`)} alt={scheme} />}
                <div className="profile__adress__inner-bottom-bankCardElement-center">
                    <svg width="5" height="5" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2" cy="2" r="2" fill="#0D0D0D" />
                    </svg>
                    <svg width="5" height="5" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2" cy="2" r="2" fill="#0D0D0D" />
                    </svg>
                    <svg width="5" height="5" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2" cy="2" r="2" fill="#0D0D0D" />
                    </svg>
                    <svg width="5" height="5" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2" cy="2" r="2" fill="#0D0D0D" />
                    </svg>
                </div>
                <div className="profile__adress__inner-bottom-bankCardElement-left">
                    <p className='text bold'>{bankCard.slice(-4)}</p>
                </div>
            </>
    })) : undefined

    return (
        <form className="cart__inner-notEmpty" onSubmit={handleSubmit(onSubmit)}>
            {loading ? <div className="container__loader-absolute">
                <div className="lds-ring" ><div></div><div></div><div></div><div></div></div>
            </div>
                :
                <>
                    <div className="cart__inner-notEmpty-left" >
                        <ModalWindow active={activeModal} setActive={setAciveModal} type={'items'} />
                        <div className="cart__inner-notEmpty-left-ordering-adress">
                            {bankCardData.haveBankCards &&
                                <>
                                    <div className="cart__inner-notEmpty-left-ordering-adress-text">Выбрать карту:</div>
                                    <div className="select-rotate">
                                        <Select value={userBankCard ? bankCardsOptions?.find((el) => el.value === userBankCard.bankCard) : ""}
                                            classNamePrefix="reactSelect" maxMenuHeight={150}
                                            onChange={(newValue: any) => selectBankCard(newValue)}
                                            isSearchable={false} options={bankCardsOptions} placeholder="Оплата" components={makeAnimated()}
                                        />
                                    </div>
                                </>
                            }
                            <div className="cart__inner-notEmpty-left-ordering-adress-text">Ввести вручную:</div>
                            <div className="cart__inner-notEmpty-left-ordering-adress-more">
                                <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                                    <div className="cart__inner-notEmpty-left-ordering-adress-text">Номер карты:</div>
                                    <Controller
                                        control={control}
                                        name="bankCard"
                                        render={({ fieldState: { error } }) => (
                                            <div className='auth__form-parent'>
                                                <PatternFormat disabled={userBankCard.bankCard.length >= 1} onValueChange={(e) => {
                                                    setValue("bankCard", e.value)
                                                    trigger("bankCard")
                                                }} placeholder='0000 0000 0000 0000'
                                                    className={error ? 'input-error' : `input`} format="#### #### #### ####" />
                                                {error && <p className="error">{error.message || "Ошибка!"}</p>}
                                            </div>
                                        )}
                                        rules={{
                                            required: "Поле обязательно к заполнению!",
                                            minLength: {
                                                value: 16,
                                                message: "Введите корректные данные!"
                                            }
                                        }}
                                    />
                                </div>
                                <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                                    <div className="cart__inner-notEmpty-left-ordering-adress-text">Номер карты:</div>
                                    <Controller
                                        render={({ fieldState: { error } }) => (
                                            <div className='auth__form-parent'>
                                                <CardExpiry
                                                    disabled={userBankCard.bankCard.length >= 1}
                                                    className={error ? 'input-error' : `input`}
                                                    onValueChange={(values: any) => {
                                                        setValue("date", values.formattedValue)
                                                        trigger("date")
                                                    }}
                                                />
                                                {error && <p className="error">{error.message || "Ошибка!"}</p>}
                                            </div>
                                        )}
                                        control={control}
                                        name="date"
                                        rules={{
                                            required: "Поле обязательно к заполнению!",
                                            minLength: {
                                                value: 5,
                                                message: "Введите корректные данные!"
                                            }
                                        }}
                                    />
                                </div>
                                <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                                    <div className="cart__inner-notEmpty-left-ordering-adress-text">Номер карты:</div>
                                    <Controller
                                        control={control}
                                        name="CVC"
                                        render={({ fieldState: { error } }) => (
                                            <div className='auth__form-parent'>
                                                <PatternFormat onValueChange={(e) => {
                                                    setValue("CVC", e.value)
                                                    trigger("CVC")
                                                }} placeholder='CVC'
                                                    disabled={userBankCard.bankCard.length >= 1}
                                                    className={error ? 'input-error' : `input`} format="###" />
                                                {error && <p className="error">{error.message || "Ошибка!"}</p>}

                                            </div>
                                        )}
                                        rules={{
                                            required: "Поле обязательно к заполнению!"
                                            , minLength: {
                                                value: 3,
                                                message: "Введите корректные данные!"
                                            }
                                        }}
                                    />
                                </div>
                                <div className="cart__inner-notEmpty-left-ordering-adress-more-bottom">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cart__inner-notEmpty-makeOrder">
                        <div className="cart__inner-notEmpty-makeOrder-count">
                            <div className="cart__inner-notEmpty-makeOrder-count-toCharge">
                                <div className="cart__inner-notEmpty-makeOrder-promoCode-title">
                                    Заказ №976458
                                </div>
                                <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg" onClick={() => setAciveModal(true)} >
                                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 4.99967C9 6.10424 8.10457 6.99967 7 6.99967C5.89543 6.99967 5 6.10424 5 4.99967C5 3.89511 5.89543 2.99967 7 2.99967C8.10457 2.99967 9 3.89511 9 4.99967Z" fill="#FF6600" />
                                        <path d="M13.5963 4.70153C12.1575 1.82391 9.60209 0.333008 7 0.333008C4.39792 0.333008 1.84253 1.82391 0.403718 4.70153C0.309875 4.88922 0.309875 5.11013 0.403718 5.29782C1.84253 8.17544 4.39792 9.66634 7 9.66634C9.60209 9.66634 12.1575 8.17544 13.5963 5.29782C13.6901 5.11013 13.6901 4.88922 13.5963 4.70153ZM7 8.33301C5.02081 8.33301 2.99871 7.25249 1.75311 4.99967C2.99871 2.74686 5.02081 1.66634 7 1.66634C8.97919 1.66634 11.0013 2.74686 12.2469 4.99967C11.0013 7.25249 8.97919 8.33301 7 8.33301Z" fill="#FF6600" />
                                    </svg>
                                </div>
                            </div>
                            <div className="cart__inner-notEmpty-makeOrder-count-payment">
                                <div className="cart__inner-notEmpty-makeOrder-count-payment-title">Адрес доставки:</div>
                                <div className="cart__inner-notEmpty-makeOrder-count-payment-multipleFields">
                                    <div className="cart__inner-notEmpty-makeOrder-count-payment-multipleFields-text">{adress}</div>
                                    <div className="cart__inner-notEmpty-makeOrder-count-payment-multipleFields-text">Квартира/офис {flat}</div>
                                    <div className="cart__inner-notEmpty-makeOrder-count-payment-multipleFields-text">Этаж {floor}</div>
                                </div>
                            </div>
                            <div className="cart__inner-notEmpty-makeOrder-count-payment">
                                <div className="cart__inner-notEmpty-makeOrder-count-payment-title">Доставка:</div>
                                <div className="cart__inner-notEmpty-makeOrder-count-payment-text">
                                    {deliviryCost > 0 ? `${deliviryCost}₽` : "Бесплатно"}
                                </div>
                            </div>
                        </div>
                        {writeOffBonuses > 0 &&
                            <div className="cart__inner-notEmpty-makeOrder-grandTotal">
                                <div className="cart__inner-notEmpty-makeOrder-grandTotal-price">
                                    <div className="cart__inner-notEmpty-makeOrder-grandTotal-price-text">
                                        Итоговая сумма:
                                    </div>
                                    <div className="cart__inner-notEmpty-makeOrder-grandTotal-price-text">
                                        {withDiscount}₽
                                    </div>
                                </div>
                                <div className="cart__inner-notEmpty-makeOrder-grandTotal-bonuses">
                                    <div className="cart__inner-notEmpty-makeOrder-grandTotal-bonuses-text">
                                        Оплата бонусами
                                    </div>
                                    <div className="cart__inner-notEmpty-makeOrder-grandTotal-bonuses-left">
                                        <div className={`cart__inner-notEmpty-makeOrder-grandTotal-bonuses-left-text-green`}>-{writeOffBonuses}</div>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.99984 2.66699C12.0498 2.66699 15.3332 4.45766 15.3332 6.66699V9.33366C15.3332 11.543 12.0498 13.3337 7.99984 13.3337C4.02184 13.3337 0.783837 11.6063 0.669837 9.45166L0.666504 9.33366V6.66699C0.666504 4.45766 3.94984 2.66699 7.99984 2.66699ZM7.99984 10.667C5.51984 10.667 3.3265 9.99566 1.99984 8.96699V9.33366C1.99984 10.5883 4.5885 12.0003 7.99984 12.0003C11.3398 12.0003 13.8918 10.647 13.9965 9.41233L13.9998 9.33366L14.0005 8.96699C12.6738 9.99499 10.4805 10.667 7.99984 10.667ZM7.99984 4.00033C4.5885 4.00033 1.99984 5.41233 1.99984 6.66699C1.99984 7.92166 4.5885 9.33366 7.99984 9.33366C11.4112 9.33366 13.9998 7.92166 13.9998 6.66699C13.9998 5.41233 11.4112 4.00033 7.99984 4.00033Z" fill="#00953F" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        }
                        <button type='submit' className={`button-submit${isValid || userBankCard.bankCard.length > 1 ? "" : "-false"}`} >Оплатить</button>
                    </div>
                </>
            }
        </form>
    )
}

export default CartOrderingStage3

