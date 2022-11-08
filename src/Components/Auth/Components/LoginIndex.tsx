import React, { ChangeEvent, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import "../../../scss/components/AuthComponents/auth.scss"
import ReactCountryFlag from "react-country-flag";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAppDispatch } from "../../../hooks/hooks";
import { setUserInformation, setNextStage, setCanEditProfile } from "../../../redux/user/slice";
import { formattedTelephone } from "../FunctionsAndTypes/functions";
import { LoginInterface } from "../FunctionsAndTypes/types";
const LoginIndex: React.FC = () => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [visibilityEye, setVisibilityEye] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [country, setCountry] = useState("");
    const { register, formState: { errors, isValid }, control, trigger, setError, handleSubmit, setValue, watch, clearErrors } = useForm<LoginInterface>({ mode: "onChange" })

    const onSubmit: SubmitHandler<LoginInterface> = async (data) => {
        const { tel, country, password } = data
        setLoading(true)
        const q = await getDocs(query(collection(db, "users"), where("country", '==', country), where("telephone", '==', tel)))
        if (q.size !== 0) {
            //@ts-ignore
            const userPassword = q.docs[0]["_document"].data.value.mapValue.fields.password.stringValue
            if (userPassword === password) {
                localStorage.setItem("isLogged", "true")
                localStorage.setItem("telephone", data.tel)
                //@ts-ignore
                dispatch(setUserInformation(q.docs[0]["_document"].data.value.mapValue.fields))
            }
            else setError("password", { type: 'custom', message: 'Неправильный пароль!' })
        } else setError("tel", { type: 'custom', message: 'Неправильный телефон/страна!' })
        setLoading(false)
    }

    const options = [
        { value: 'rus', label: <div className="select-option"> <ReactCountryFlag countryCode="RU" svg /> Россия</div> },
        { value: 'kaz', label: <div className="select-option"> <ReactCountryFlag countryCode="KZ" svg /> Казахстан</div> },
        { value: 'uzb', label: <div className="select-option"> <ReactCountryFlag countryCode="UZ" svg /> Узбекистан</div> },
        { value: 'bel', label: <div className="select-option"> <ReactCountryFlag countryCode="BY" svg /> Беларусь</div> },
    ]

    return (
        <>
            {loading ?
                <div className="container__loader-absolute">
                    <div className="lds-ring" ><div></div><div></div><div></div><div></div></div>
                </div>
                :
                <div className="auth">
                    <div className="auth__title">
                        <h1 className="auth__title-text">Авторизация </h1>
                    </div>
                    <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            control={control}
                            name="country"
                            render={({ fieldState: { error } }) => (
                                <div className="auth__form-parent">
                                    <Select value={country ? options.find((el) => el.value === country) : ""} classNamePrefix="reactSelect" maxMenuHeight={150}
                                        onChange={(newValue: any) => {
                                            setValue("country", newValue.value)
                                            trigger("country")
                                            setCountry(newValue.value)
                                        }} isSearchable={false} options={options} placeholder="Страна" components={makeAnimated()} />
                                    {error && <p className="errorAuth" >{error.message || "Ошибка!"} </p>}
                                </div>
                            )}
                            rules={{ required: "Выберите вашу страну!" }}
                        />
                        <div className="auth__form-parent" >
                            <input type="tel" {...register("tel", {
                                required: "Поле обязательно к заполнению!",
                                pattern: {
                                    message: "Введите корректный номер телефона!",
                                    value: /^[+]{1}[0-9]{1} [(]{1}[0-9]{3}[)]{1} [0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/
                                },
                                onChange: (e) => setValue("tel", formattedTelephone(e, setError, clearErrors))
                            })} className={`${errors.tel ? "input-error" : "input"}`} placeholder="Номер телефона" />
                            {errors.tel && <p className="errorAuth">{errors?.tel?.message || "Ошибка!"}</p>}
                        </div>
                        <div className="auth__form-parentPassword" onMouseEnter={() => setVisibilityEye(true)} onMouseLeave={() => setVisibilityEye(false)} >
                            <input  {...register("password", {
                                required: "Поле обязательно к заполнению!",
                                minLength: {
                                    value: 8,
                                    message: "Введите корректный пароль!"
                                }
                            })}
                                className={`${errors.password ? passwordShown ? "input-error" : "input-passwordError" : passwordShown ? "input" : "input-password"}`}
                                type={passwordShown ? "text" : "password"} placeholder="Пароль" />
                            {errors.password && <p className="errorAuth">{errors?.password?.message || "Ошибка!"}</p>}
                            {visibilityEye &&
                                <span className="eye" onClick={() => setPasswordShown(!passwordShown)}>
                                    {passwordShown ? <i className="fa fa-eye" /> : <i className="fa fa-eye-slash" />}
                                </span>
                            }
                        </div>
                        <button type="submit" className={`button-submit${isValid ? "" : "-false"}`}>Войти</button>
                        <div className="auth__form-help bold" onClick={() => dispatch(setNextStage({ stage: 1, type: "recoveryPass" }))}>Забыли пароль?</div>
                        <div className="auth__form-help bold" onClick={() => dispatch(setNextStage({ stage: 1, type: "registration" }))} style={{ marginTop: -13 }}>У вас нет аккаунта?</div>
                    </form >
                </div >
            }
        </>
    )
}

export default LoginIndex
