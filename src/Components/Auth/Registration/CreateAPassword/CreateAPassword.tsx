import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"

interface IFormAuth {
    password: string;
    confirmPassword: string;
}



const CreateAPassword: React.FC = () => {

    const isLoggedIn = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setСonfirmPasswordShown] = useState(false);

    const [eyeShownPassword, setEyeShownPassword] = useState(false);
    const [eyeShownConfirmPasswordShown, setEyeShownConfirmPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(state => !state);
    };
    const toggleСonfirmPasswordVisiblity = () => {
        setСonfirmPasswordShown(state => !state);
    };

    const toggleEyeVisiblityPasswordShown = () => {
        setEyeShownPassword(true)
    };
    const toggleEyeVisiblityConfirmPasswordShown = () => {
        setEyeShownConfirmPasswordShown(true)
    };

    const validationsSchema = yup.object().shape({
        password: yup.string().typeError("Должно быть строкой").required("Поле обязательно к к заполнению!"),
        confirmPassword: yup.string().oneOf([yup.ref("password")], "Пароли не совпадают").required("Поле обязательно к к заполнению!"),
    })


    const {
        register,
        formState: {
            errors,
            isValid

        },

        handleSubmit,

    } = useForm<IFormAuth>({
        mode: "onChange",
        resolver: yupResolver(validationsSchema),
        reValidateMode: "onChange",
    })

    const onSubmit: SubmitHandler<IFormAuth> = (data) => {
        console.log(JSON.stringify(data));

        navigate("/")
    };


    return (
        <div className="auth">
            <div className="auth__top">
                <h1>Придумайте пароль</h1>

                <form onSubmit={handleSubmit(onSubmit)} >

                    <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                        <div className="auth__inputBlock">
                            <input {...register("password", {
                                required: "Поле обязательно к к заполнению!"
                            })} type={passwordShown ? "text" : "password"}
                                placeholder="Введите пароль"
                                onMouseDown={toggleEyeVisiblityPasswordShown}
                                className="cart__inner-notEmpty-left-ordering-adress-more-input-adress"
                            />
                            {
                                eyeShownPassword &&
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

                    <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                        <div className="auth__inputBlock">
                            <input {...register("confirmPassword", {
                                required: "Поле обязательно к к заполнению!"
                            })}
                                type={confirmPasswordShown ? "text" : "password"}
                                onMouseDown={toggleEyeVisiblityConfirmPasswordShown}
                                placeholder="Повторите пароль"
                                className="cart__inner-notEmpty-left-ordering-adress-more-input-adress"
                            />
                            {eyeShownConfirmPasswordShown &&
                                <span className="auth__eye" onClick={toggleСonfirmPasswordVisiblity}>
                                    {
                                        confirmPasswordShown ? <i className="fa fa-eye" />
                                            : <i className="fa fa-eye-slash" />
                                    }
                                </span>
                            }

                            {errors.confirmPassword && <p className="error">{errors?.confirmPassword?.message || "Пароли не совпадают!"}</p>}
                        </div>
                    </div>

                    <button type="submit" className={isValid ? `cart__inner-notEmpty-makeOrder-submitOrder` : `cart__inner-notEmpty-makeOrder-submitOrder-false`}  >
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateAPassword