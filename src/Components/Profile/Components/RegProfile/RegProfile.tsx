import React from 'react'
import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from 'react-dadata'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { calcCrow } from '../../../Cart/FunctionsAndTypes/functions'
import { userData } from './RegistrationIndex'
interface RegProfile {
    nameSurname: string
    deliviryAddress: string
    userEmail: string
}
export interface RegStage {
    setStage: React.Dispatch<React.SetStateAction<number>>
    setUserData?: React.Dispatch<React.SetStateAction<userData | undefined>>
    userData?: userData
}
const RegProfile: React.FC<RegStage> = ({ setStage, setUserData }) => {
    const { register, formState: { errors, isValid }, setValue, handleSubmit, control, trigger, setError, clearErrors } = useForm<RegProfile>({ mode: "onChange" })
    const validateAdressSuggestions = (e: DaDataSuggestion<DaDataAddress> | undefined) => {
        if (e) {
            const { region, city_with_type, street_with_type, house_type_full, house, geo_lat, geo_lon } = e.data
            const { value } = e
            setValue("deliviryAddress", value)
            if (region === "Санкт-Петербург" || region === "Москва") {
                if ((city_with_type && street_with_type && house_type_full && house) !== null) {
                    const lengthBetweenPoints = calcCrow(59.93578, 30.3078, geo_lat, geo_lon)
                    if (lengthBetweenPoints < 13) {
                        setValue("deliviryAddress", value)
                        clearErrors("deliviryAddress")
                        trigger("deliviryAddress")
                    } else {
                        setError("deliviryAddress", { type: "custom", message: "На данный адрес невозможна доставка!" })
                    }
                }
                else {
                    setError("deliviryAddress", { type: "custom", message: "Укажите адрес в формате:город,улица,дом,номер дома!" })
                }
            } else {
                setError("deliviryAddress", { type: "custom", message: "Адрес осуществляется только по СПБ и по Москве!" })
            }
        }
    }
    const onSubmit: SubmitHandler<RegProfile> = (data) => {
        const { nameSurname, deliviryAddress, userEmail } = data
        if (setUserData) {
            setUserData({ nameSurname, deliviryAddress, userEmail })
            setStage(2)
        }
    };
    return (
        <div className="auth">
            <div className="auth__title">
                <h1 className="auth__title-text">Профиль</h1>
            </div>
            <form className="profileReg" onSubmit={handleSubmit(onSubmit)} >
                <div className="auth__form-parent" >
                    <input className={`input`} placeholder="Имя Фамилия" {...register("nameSurname", {
                        required: "Поле обязательно к заполнению!",
                    })} />
                    {errors.nameSurname && <p className="error">{errors.nameSurname.message || "Ошибка!"}</p>}
                </div>
                <div className="auth__form-parent" >
                    <Controller
                        control={control}
                        name="deliviryAddress"
                        render={({ fieldState: { error }, }) => (
                            <>
                                <AddressSuggestions onChange={(e) => { validateAdressSuggestions(e) }}
                                    highlightClassName="react-dadata__suggestions-liHelp" suggestionClassName="react-dadata__suggestions-li"
                                    token='fa4b2c103c0b276d9f833e9a1351f45d3a8beda3' delay={300} count={3} minChars={2} inputProps={{ "placeholder": "Адрес доставки" }}
                                />
                                {error && <p className="error">{error.message || "Ошибка!"}</p>}
                            </>
                        )}
                        rules={{
                            required: "Поле обязательно к заполнению!"
                        }}
                    />
                </div>
                <div className="auth__form-parent" >
                    <input className={`input`} placeholder="Email" type="email" {...register("userEmail", {
                        required: "Поле обязательно к заполнению!",
                        pattern: {
                            message: "Введите корректный Email адрес",
                            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
                        }
                    })} />
                    {errors.userEmail && <p className="error" >{errors.userEmail.message || "Ошибка!"}</p>}
                </div>
                <p className='prompt bold' >Для получения квитанции на email</p>
                <button type="submit" style={{ marginTop: -10 }} className={isValid && !errors.deliviryAddress ? "button-submit" : "button-submit-false"}>Далее</button>
            </form >
        </div >
    )
}

export default RegProfile