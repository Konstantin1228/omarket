import React, { ChangeEvent, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import ReactCountryFlag from 'react-country-flag';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useAppDispatch } from '../../../hooks/hooks';
import { setContryAndTel, setNextStage } from '../../../redux/user/slice';
import { formattedTelephone } from '../FunctionsAndTypes/functions';
interface RegIndex {
    tel: string,
    country: string
}

const RegIndex: React.FC = () => {
    const dispach = useAppDispatch()
    const options = [
        { value: 'rus', label: <div className="select-option"> <ReactCountryFlag countryCode="RU" svg /> Россия</div> },
        { value: 'kaz', label: <div className="select-option"> <ReactCountryFlag countryCode="KZ" svg /> Казахстан</div> },
        { value: 'uzb', label: <div className="select-option"> <ReactCountryFlag countryCode="UZ" svg /> Узбекистан</div> },
        { value: 'bel', label: <div className="select-option"> <ReactCountryFlag countryCode="BY" svg /> Беларусь</div> },
    ]
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false)
    const { register, formState: { errors, isValid }, control, trigger, setError, handleSubmit, setValue, clearErrors } = useForm<RegIndex>({ mode: "onChange" })
    const onSubmit: SubmitHandler<RegIndex> = async (data) => {
        const { tel, country } = data
        setLoading(true)
        const queryTotal = await getDocs(query(collection(db, "users"), where("telephone", '==', tel)))
        if (queryTotal.size === 0) {
            dispach(setNextStage({ stage: 2, type: "registration" }))
            dispach(setContryAndTel({ telephone: tel, country }))
        } else {
            setError("tel", { type: "custom", message: "Данный номер телефона занят!" })
        }
        setLoading(false)
    }
    useEffect(() => {
        setError("tel", { type: 'custom', message: 'Поле обязательно к заполнению!' })
        setError("country", { type: 'custom', message: 'Выберите страну, в которой вы находитесь!' })
    }, [])
    return (
        <>
            {loading ?
                <div className="container__loader-absolute">
                    <div className="lds-ring" ><div></div><div></div><div></div><div></div></div>
                </div>
                :
                <div className="auth">
                    <div className="auth__title">
                        <div className="auth__title-arrow" onClick={() => dispach(setNextStage({ stage: 0, type: "" }))}>❮</div>
                        <h1 className="auth__title-text"> Регестрация</h1>
                    </div>
                    <form className="auth__form" onSubmit={handleSubmit(onSubmit)} >
                        <Controller
                            control={control}
                            name="country"
                            render={({ fieldState: { error } }) => (
                                <div className="auth__form-parent">
                                    <Select value={country ? options.find((el) => el.value === country) : ""} classNamePrefix="reactSelect" maxMenuHeight={150} onChange={(newValue: any) => {
                                        setValue("country", newValue.value);
                                        trigger("country");
                                        setCountry(newValue.value);
                                    }} isSearchable={false} options={options} placeholder="Страна" components={makeAnimated()} />
                                    {error && <p className="errorAuth" >{error.message || "Ошибка!"} </p>}
                                </div>
                            )}
                            rules={{ required: "Выберите страну, в которой вы находитесь!" }}
                        />
                        <div className="auth__form-parent" >
                            <input type="tel" {...register("tel", {
                                required: "Поле обязательно к заполнению!",
                                pattern: {
                                    message: "Введите корректный номер телефона!",
                                    value: /^[+]{1}[0-9]{1} [(]{1}[0-9]{3}[)]{1} [0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/
                                },
                                onChange: (e: ChangeEvent<HTMLInputElement>) => setValue("tel", formattedTelephone(e, setError, clearErrors))
                            })} className={`${errors.tel ? "input-error" : "input"}`} placeholder="Номер телефона" />
                            {errors.tel && <p className="errorAuth">{errors?.tel?.message || "Ошибка!"}</p>}
                        </div>
                        <button type='submit' className={`button-submit${!errors.tel?.message && !errors.country?.message ? "" : "-false"}`}>Отправить СМС</button>
                    </form >
                </div >
            }
        </>
    )
}
export default RegIndex
