import codes from "country-calling-code";
import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks"
import "../../../scss/components/auth.scss"


interface IFormAuth {
    city: string;
    phoneNumber: String;
    password: string;
}


type PropsType = {
    setStage: (value: number) => void
}

const Login: React.FC<PropsType> = ({ setStage }) => {

    const isLoggedIn = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const [value, setValue] = useState('Страна')

    const [code, setCode] = useState('')
    const [phone, setNumber] = useState('')


    const [passwordShown, setPasswordShown] = useState(false);
    const [eyeShown, setEyeShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(state => !state);
    };
    const toggleEyeVisiblity = () => {
        setEyeShown(true)

    };

    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,

    } = useForm<IFormAuth>({ mode: "onChange" })

    const onSubmit: SubmitHandler<IFormAuth> = (data) => {
        console.log(JSON.stringify(data));

        setStage(3)
    };


    const mappedOptions: any[] = codes.map((c, i) => (
        <option key={c + '-' + i}>{c.country}</option>
    ))

    const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const countryValue = e.currentTarget.value
        setValue(countryValue)
        const countryFound = codes.find(c => c.country === countryValue)
        const countryCode = (`+${countryFound?.countryCodes}`)
        setCode(`${countryCode} `)
        setNumber(`${countryCode} `)
    }
    const onChangeInputNumber = (event: ChangeEvent<HTMLInputElement>) => {
        const ev = event.currentTarget.value.replace(/[^0-9()\-+\s]/g, '')

        const e = ev.substring(0, code.length + 19)

        const bracket = e.length - code.length === 4 && e.length > phone.length ? ') ' : ''
        const firstDash = e.length - code.length === 9 && e.length > phone.length ? ' - ' : ''
        const twoDash = e.length - code.length === 14 && e.length > phone.length ? ' - ' : ''

        setNumber(`${e}${bracket}${firstDash}${twoDash}`)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Backspace") {
            if (phone.length < code.length + 2) e.preventDefault()
            if (phone.length - code.length === 17 || phone.length - code.length === 12) setNumber(phone.slice(0, -3))
            if (phone.length - code.length === 6) setNumber(phone.slice(0, -2))
            if (phone.length - code.length !== 17
                && phone.length - code.length !== 12
                && phone.length - code.length !== 6) setNumber(phone.slice(0, phone.length))
        }
    }
    const onMouseDownHandler = (e: MouseEvent<HTMLInputElement>) => {
        if (phone.length === code.length) {
            setNumber(prev => prev + '(')
        }
    }


    return (
        <div className="auth">
            <div className="auth__top">
                <h1>Авторизация</h1>

                <form onSubmit={handleSubmit(onSubmit)} >

                    <div className={"select-rotate"}>
                        <select
                            {...register("city")}
                            className="select__inner"
                            value={value}
                            onChange={onChangeSelect}
                        >
                            <option disabled>Страна</option>
                            {mappedOptions}
                        </select>
                    </div>

                    <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                        <div className="auth__inputBlock">
                            <input {...register("phoneNumber", {
                                required: "Поле обязательно к к заполнению!"
                            })}
                                type="tel"
                                value={phone}
                                disabled={!code}
                                onMouseDown={onMouseDownHandler}
                                onKeyDown={onKeyDownHandler}
                                onChange={onChangeInputNumber}
                                placeholder="Номер телефона"
                                className="cart__inner-notEmpty-left-ordering-adress-more-input-adress"
                            />
                            {errors.phoneNumber && <p className="error">{errors?.phoneNumber?.message || "Ошибка!"}</p>}
                        </div>
                    </div>

                    <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                        <div className="auth__inputBlock">
                            <input {...register("password", {
                                required: "Поле обязательно к к заполнению!"
                            })} type={passwordShown ? "text" : "password"}
                                onMouseDown={toggleEyeVisiblity}
                                placeholder="Введите пароль"
                                className="cart__inner-notEmpty-left-ordering-adress-more-input-adress"
                            />
                            {
                                eyeShown &&
                                <span className="auth__eye" onClick={togglePasswordVisiblity}>
                                    {
                                        passwordShown ? <i className="fa fa-eye" />
                                            : <i className="fa fa-eye-slash" />
                                    }
                                </span>
                            }
                            {errors.password && <p className="error">{errors?.password?.message || "Ошибка!"}</p>}
                        </div>
                    </div>

                    <button type="submit" className={isValid ? `cart__inner-notEmpty-makeOrder-submitOrder` : `cart__inner-notEmpty-makeOrder-submitOrder-false`} >
                        отправить СМС
                    </button>

                    <div className="form__span" >
                        <span onClick={() => setStage(5)} >Забыли пароль?</span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login