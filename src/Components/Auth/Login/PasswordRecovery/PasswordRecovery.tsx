import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
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


    return (
        <div className="auth">
            <div className="auth__top">
                <div className="auth__recovery">
                    <h1  >Восстановление пароля</h1>
                    <h1  > ----- </h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} >

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

                    <button type="submit" className={isValid ? `cart__inner-notEmpty-makeOrder-submitOrder` : `cart__inner-notEmpty-makeOrder-submitOrder-false`} >
                        отправить СМС
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PasswordRecovery