import { FormControlLabel, Checkbox } from '@mui/material'
import axios from 'axios'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { NumberFormatBase, PatternFormat } from 'react-number-format'
import { db } from '../../../../firebase'
import { useAppDispatch } from '../../../../hooks/hooks'
import { setCanEditProfile } from '../../../../redux/user/slice'
import { RegStage } from './RegProfile'
interface BankCard {
    bankCard: string
    date: string
    CVC: string
}
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
    return <NumberFormatBase placeholder='ММ/ГГ' disabled={props.disable} className='input' {...props} format={format} />;
}
const CardRegistration: React.FC<RegStage> = ({ setStage, userData }) => {
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
                        console.log("");
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
                    localStorage.setItem("CanEditProfile", "true")
                    dispatch(setCanEditProfile(true))
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
                localStorage.setItem("CanEditProfile", "true")
                dispatch(setCanEditProfile(true))
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    return (
        <form className="auth" onSubmit={handleSubmit(onSubmit)}>
            {
                loading ?
                    <div className="container__loader-absolute">
                        <div className="lds-ring" ><div></div><div></div><div></div><div></div></div>
                    </div>
                    :
                    <>
                        <div className="auth__title">
                            <div className="auth__title-arrow" onClick={() => setStage(1)}>❮</div>
                            <h1 className="auth__title-text">Карта</h1>
                        </div>
                        <div className="auth__registration">
                            <div className="auth__registration-top">
                                <Controller
                                    control={control}
                                    name="bankCard"
                                    render={({ fieldState: { error } }) => (
                                        <div className='auth__form-parent'>
                                            <PatternFormat disabled={withoutBankCard} onValueChange={(e) => {
                                                setValue("bankCard", e.value)
                                                trigger("bankCard")
                                            }} placeholder='0000 0000 0000 0000'
                                                style={{ width: 320 }} className='input' format="#### #### #### ####" />
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
                            <div className="auth__registration-bottom">
                                <Controller
                                    render={({ fieldState: { error } }) => (
                                        <div className='auth__form-parent' style={{ width: 180 }}  >
                                            <CardExpiry
                                                onValueChange={(values: any) => {
                                                    setValue("date", values.formattedValue)
                                                    trigger("date")
                                                }}
                                                disabled={withoutBankCard}
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
                                <Controller
                                    control={control}
                                    name="CVC"
                                    render={({ fieldState: { error } }) => (
                                        <div className='auth__form-parent' style={{ width: 180 }}>
                                            <PatternFormat disabled={withoutBankCard} onValueChange={(e) => {
                                                setValue("CVC", e.value)
                                                trigger("CVC")
                                            }} placeholder='CVC'
                                                className='input' format="###" />
                                            {error && <p className="error" style={{ whiteSpace: "normal", bottom: -52 }}>{error.message || "Ошибка!"}</p>}
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
                                <button type='submit' style={{ marginTop: -15, width: 370 }} className={`button-submit`} onClick={() => registerWithoutBankCard()} >Продолжить</button>
                                :
                                <button type="submit" style={{ marginTop: -15, width: 370 }} className={isValid ? `button-submit` : "button-submit-false"}>Продолжить</button>
                            }
                        </div >
                    </>
            }
        </form>
    )
}
export default CardRegistration