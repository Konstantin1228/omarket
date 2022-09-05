import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks"
import "../../../../scss/components/auth.scss"

interface IFormAuth {
    phoneNumber: String;
}


type PropsType = {
    setStage: (value: number) => void
}

const PasswordRecovery: React.FC<PropsType> = ({ setStage }) => {

    const isLoggedIn = useAppSelector(state => state)
    const dispatch = useAppDispatch()

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


    const [phone, setNumber] = useState('')

    const [code, setCode] = useState('')


    const onChangeInputNumber = (event: ChangeEvent<HTMLInputElement>) => {
        const ev = event.currentTarget.value.replace(/[^0-9()\-+\s]/g, '')

        const e = ev.substring(0, code.length + 21)

        const firstBracket = e.length - code.length === 1 && e.length > phone.length ? ' (' : ''
        const bracket = e.length - code.length === 6 && e.length > phone.length ? ') ' : ''
        const firstDash = e.length - code.length === 11 && e.length > phone.length ? ' - ' : ''
        const twoDash = e.length - code.length === 16 && e.length > phone.length ? ' - ' : ''

        setNumber(`${e}${firstBracket}${bracket}${firstDash}${twoDash}`)
    }


    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Backspace") {
            if (phone.length < code.length + 1) e.preventDefault()
            if (phone.length - code.length === 19 || phone.length - code.length === 14) setNumber(phone.slice(0, -3))
            if (phone.length - code.length === 8) setNumber(phone.slice(0, -2))
            if (phone.length - code.length !== 19
                && phone.length - code.length !== 14
                && phone.length - code.length !== 8) setNumber(phone.slice(0, phone.length))
        }
    }

    const onMouseDownHandler = () => {
        if (phone.length === 0) {
            setNumber(prev => prev + '+')
            setCode(prev => prev + '+')

        }
    }


    return (
        <div className="auth">
            <div className="auth__top">
                <div className="auth__recovery">
                    <h1>Восстановление пароля</h1>
                    <h1> ----- </h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} >

                    <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                        <div className="auth__inputBlock">
                            <input {...register("phoneNumber", {
                                required: "Поле обязательно к к заполнению!"
                            })}
                                type="tel"
                                value={phone}
                                // disabled={!code}
                                onMouseDown={onMouseDownHandler}
                                onKeyDown={onKeyDownHandler}
                                onChange={onChangeInputNumber}
                                placeholder="Номер телефона"
                                className="cart__inner-notEmpty-left-ordering-adress-more-input-adress"
                            />
                            {errors.phoneNumber && <p className="error">{errors?.phoneNumber?.message || "Ошибка!"}</p>}
                        </div>
                    </div>

                    <button type="submit" className={isValid ? `cart__inner-notEmpty-makeOrder-submitOrder` : `cart__inner-notEmpty-makeOrder-submitOrder-false`} >
                        отправить СМС
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PasswordRecovery