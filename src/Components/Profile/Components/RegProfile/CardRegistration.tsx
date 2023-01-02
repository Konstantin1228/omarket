import React, { useState } from 'react'
import { FormControlLabel, Checkbox } from '@mui/material'
import axios from 'axios'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import { db } from '../../../../config/firebase'
import { useAppDispatch } from '../../../../hooks/hooks'
import { addStatusToasts } from '../../../../redux/toasts/slice'
import { setCanEditProfile } from '../../../../redux/user/slice'
import Loader from '../../../Other/Loader/Loader'
import { CardExpiry } from '../../FunctionsAndTypes/functions'
import { BankCard, RegProfileProps } from '../../FunctionsAndTypes/types'

const CardRegistration: React.FC<RegProfileProps> = ({ setStage, userData }) => {
    const dispatch = useAppDispatch()
    const [withoutBankCard, setWhithoutBankCard] = useState(false)
    const [loading, setLoading] = useState(false)
    const { formState: { isValid }, setValue, handleSubmit, control, trigger, setError, unregister, clearErrors } = useForm<BankCard>({ mode: "onChange" })

    const onSubmit: SubmitHandler<BankCard> = async (data) => {
        const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
        const userRef = doc(db, 'users', q.docs[0].id);
        const { CVC, date, bankCard } = data
        try {
            let axiosAnswer: any = ""
            await axios.get(`https://lookup.binlist.net/${bankCard}`).then((res) => axiosAnswer = res.data).catch((status) => axiosAnswer = status.message)
            if (axiosAnswer.scheme) {
                if (userData) {
                    const { deliviryAddress, nameSurname, userEmail } = userData
                    if (!withoutBankCard) {
                        await setDoc(userRef, {
                            profileInformation: {
                                aboutUser: { userEmail, nameSurname },
                                otherInformation: {
                                    deliviryAdresses: [{ city: deliviryAddress, comment: "", isDefault: true }],
                                    bankCards: [{
                                        bankCard, date, CVC, scheme: axiosAnswer.scheme
                                    }]
                                },
                            }
                        }, { merge: true });
                    } else if (withoutBankCard) {
                        await setDoc(userRef, {
                            profileInformation: {
                                aboutUser: { userEmail, nameSurname },
                                otherInformation: {
                                    deliviryAdresses: [{ city: deliviryAddress, comment: "", isDefault: true }],
                                    bankCards: []
                                }
                            }
                        }, { merge: true });
                    }
                    dispatch(setCanEditProfile(true))
                    dispatch(addStatusToasts({ message: "Ваш профиль теперь зарегестрирован!", isComplete: true }))
                }
            } else {
                setError("bankCard", { type: "custom", message: "Проверьте правильность ввода" })
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    };

    const noBankCard = async () => {
        setWhithoutBankCard(!withoutBankCard)
        !withoutBankCard ? clearErrors(["date", "bankCard", "CVC"]) : trigger(["CVC", "bankCard", "date"])
    }

    const registerWithoutBankCard = async () => {
        setLoading(true)
        try {
            const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
            const userRef = doc(db, 'users', q.docs[0].id);
            if (userData) {
                const { deliviryAddress, nameSurname, userEmail } = userData
                await setDoc(userRef, {
                    profileInformation: {
                        aboutUser: { userEmail, nameSurname },
                        otherInformation: {
                            deliviryAdresses: [{ city: deliviryAddress, comment: "", isDefault: true }],
                            bankCards: []
                        }
                    }
                }, { merge: true });
                dispatch(setCanEditProfile(true))
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
        dispatch(addStatusToasts({ message: "Ваш профиль зарегестрирован!", isComplete: true }))
    }

    return (
        <>
            {
                loading ?
                    <Loader />
                    :
                    <form className="auth" onSubmit={handleSubmit(onSubmit)}>
                        <div className="auth__title">
                            <div className="auth__title-arrow" onClick={() => setStage(1)}>❮</div>
                            <h1 className="auth__title-text">Карта</h1>
                        </div>
                        <div className="auth__registration">
                            <Controller
                                control={control}
                                name="bankCard"
                                render={({ fieldState: { error } }) => (
                                    <div className='auth__form-parent'>
                                        <PatternFormat disabled={withoutBankCard} onValueChange={(e) => {
                                            setValue("bankCard", e.value)
                                            trigger("bankCard")
                                        }} placeholder='0000 0000 0000 0000'
                                            className='input' format="#### #### #### ####" />
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
                            <div className="auth__registration-bottom">
                                <Controller
                                    render={({ fieldState: { error } }) => (
                                        <div className='auth__form-parent'   >
                                            <CardExpiry
                                                className="input"
                                                onValueChange={(values: any) => {
                                                    setValue("date", values.formattedValue)
                                                    trigger("date")
                                                }}
                                                disabled={withoutBankCard}
                                            />
                                            {error && <p className="error" style={{ width: "2rem", wordBreak: "break-all" }}>{error.message || "Ошибка!"}</p>}
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
                                <Controller
                                    control={control}
                                    name="CVC"
                                    render={({ fieldState: { error } }) => (
                                        <div className='auth__form-parent'>
                                            <PatternFormat disabled={withoutBankCard} onValueChange={(e) => {
                                                setValue("CVC", e.value)
                                                trigger("CVC")
                                            }} placeholder='CVC'
                                                className='input' format="###" />
                                            {error && <p className="error" style={{ whiteSpace: "normal", bottom: "-3.2rem" }}>{error.message || "Ошибка!"}</p>}
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
                            <FormControlLabel control={<Checkbox size='small' color='success' onClick={() => noBankCard()} />} label="Продолжить без карты" />
                            {withoutBankCard ?
                                <button type='submit' style={{ marginTop: -15, width: "100%" }} className="button-submit" onClick={() => registerWithoutBankCard()} >Продолжить</button>
                                :
                                <button type="submit" style={{ marginTop: -15 }} className={isValid ? `button-submit` : "button-submit-false"}>Продолжить</button>
                            }
                        </div >
                    </form >
            }
        </>

    )
}
export default CardRegistration