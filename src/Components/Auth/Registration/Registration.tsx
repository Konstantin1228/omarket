import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks"
import "../../../scss/components/auth.scss"

interface IFormAuth {
    city: string;
    phoneNumber: String;

}


const Registration: React.FC = () => {


    const isLoggedIn = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

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

        navigate("/code")
    };



    return (
        <div className="auth">
            <div className="auth__top">
                <h1>Регистрация</h1>

                <form onSubmit={handleSubmit(onSubmit)} >

                    <div className={"select-rotate"}>
                        <select {...register("city")} className="select__inner"  >
                            <option value="moscow">Москва</option>
                            <option value="berlin">Берлин</option>
                            <option value="paris">Париж</option>
                        </select>
                    </div>

                    <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                        <div className="auth__inputBlock">
                            <input {...register("phoneNumber", {
                                required: "Поле обязательно к к заполнению!"
                            })}
                                   type="text"
                                   placeholder="Номер телефона"
                                   className="cart__inner-notEmpty-left-ordering-adress-more-input-adress"
                            />
                            {errors.phoneNumber && <p className="error">{errors?.phoneNumber?.message || "Ошибка!"}</p>}
                        </div>
                    </div>

                    <button type="submit" className={isValid ? `cart__inner-notEmpty-makeOrder-submitOrder` : `cart__inner-notEmpty-makeOrder-submitOrder-false`}  >
                        отправить СМС
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Registration