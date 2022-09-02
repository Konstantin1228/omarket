import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks"
import "../../../../scss/components/auth.scss"


interface IFormAuth {
    code: string;
}


type PropsType = {
    setStage: (value: number) => void
}

const RegistarationCode: React.FC<PropsType> = ({ setStage }) => {

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

        setStage(4)
    };



    return (
        <div className="auth">
            <div className="auth__top">
                <h1>Введите СМС код</h1>
                <div className="auth__part"></div>
                <div className="auth__code">На ваш номер был отправлен 4-х значный код</div>

                <form onSubmit={handleSubmit(onSubmit)} >

                    <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                        <div className="auth__inputBlock">
                            <input {...register("code", {
                                required: "Поле обязательно к к заполнению!"
                            })}
                                type="string"
                                maxLength={4}
                                className={"cart__inner-notEmpty-left-ordering-adress-more-input-adress auth__input-code"}
                            />
                            {errors.code && <p className="error">{errors?.code?.message || "Введен неправильный СМС код!"}</p>}
                        </div>
                    </div>

                    <button type="submit" className={isValid ? `cart__inner-notEmpty-makeOrder-submitOrder` : `cart__inner-notEmpty-makeOrder-submitOrder-false`} >
                        Продолжить
                    </button>
                    <div className="form__span">
                        <span>Отправить повторно (00:24)</span>
                        <div>Отправить повторно</div>
                        <div>Повторите попытку</div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default RegistarationCode