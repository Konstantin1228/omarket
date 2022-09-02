import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
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



    return (
        <div className="auth">
            <div className="auth__top">
                <h1>Авторизация</h1>

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
                                type="text" placeholder="Номер телефона"
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