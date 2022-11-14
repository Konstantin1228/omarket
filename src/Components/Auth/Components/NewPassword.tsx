import { collection, doc, Firestore, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../../firebase';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { setNextStage } from '../../../redux/user/slice';
interface NewPassword {
    firstInput: string
    secondInput: string
}
const NewPassword = () => {
    const dispatch = useAppDispatch()
    const { type } = useAppSelector(state => state.userSlice.authorizationOrLogin)
    const { telephone, country } = useAppSelector(state => state.userSlice.mainInformation)
    const { register, formState: { errors, isValid }, handleSubmit, setError } = useForm<NewPassword>({ mode: "onChange" })
    const [loading, setLoading] = useState(false)
    const onSubmit: SubmitHandler<NewPassword> = async (data) => {
        setLoading(true)
        if (data.firstInput === data.secondInput) {
            const newUserRef = doc(collection(db, "users"));
            await setDoc(newUserRef, {
                telephone,
                country,
                password: data.firstInput
            });
            dispatch((setNextStage({ stage: 0, type: "" })))
        } else {
            setError("secondInput", { type: "custom", message: "Пароли не совпадают!" })
        }
        setLoading(false)
    }
    const [firstInput, setFirstInput] = useState({ visibilityEye: false, passwordShown: false });
    const [secondInput, setSecondInput] = useState({ visibilityEye: false, passwordShown: false });
    return (

        <div className="auth">
            {loading ?
                <div className="container__loader-absolute">
                    <div className="lds-ring" ><div></div><div></div><div></div><div></div></div>
                </div>
                :
                <>
                    <div className="auth__title">
                        <div className="auth__title-arrow" onClick={() => dispatch(setNextStage({ stage: 1, type }))}>❮</div>
                        <h1 className="auth__title-text">Придумайте пароль</h1>
                    </div>
                    <form className="auth__form" onSubmit={handleSubmit(onSubmit)} >
                        <div className="auth__form-parentPassword" onMouseEnter={() => setFirstInput(prevState => ({ ...prevState, visibilityEye: true }))}
                            onMouseLeave={() => setFirstInput(prevState => ({ ...prevState, visibilityEye: false }))} >
                            <input  {...register("firstInput", {
                                required: "Введите ваш новый пароль!",
                                minLength: {
                                    value: 8,
                                    message: "Пароль должен быть не менее 8 символов!"
                                },
                                maxLength: {
                                    value: 16,
                                    message: "Пароль должен быть не более 16 символов!"
                                }
                            })}
                                className={`${errors.firstInput ? firstInput.passwordShown ? "input-error" : "input-passwordError" : firstInput.passwordShown ? "input" : "input-password"}`}
                                type={firstInput.passwordShown ? "text" : "password"} placeholder="Пароль" />
                            {errors.firstInput && <p className="errorAuth">{errors?.firstInput?.message || "Ошибка!"}</p>}
                            {firstInput.visibilityEye &&
                                <span className="eye" onClick={() => setFirstInput(prevState => ({ ...prevState, passwordShown: !prevState.passwordShown }))}>
                                    {firstInput.passwordShown ? <i className="fa fa-eye" /> : <i className="fa fa-eye-slash" />}
                                </span>
                            }
                        </div>
                        <div className="auth__form-parentPassword" onMouseEnter={() => setSecondInput(prevState => ({ ...prevState, visibilityEye: true }))}
                            onMouseLeave={() => setSecondInput(prevState => ({ ...prevState, visibilityEye: false }))} >
                            <input  {...register("secondInput", {
                                required: "Введите ваш новый пароль!",
                            })}
                                className={`${errors.secondInput ? secondInput.passwordShown ? "input-error" : "input-passwordError" : secondInput.passwordShown ? "input" : "input-password"}`}
                                type={secondInput.passwordShown ? "text" : "password"} placeholder="Пароль" />
                            {errors.secondInput && <p className="errorAuth">{errors?.secondInput?.message || "Ошибка!"}</p>}
                            {secondInput.visibilityEye &&
                                <span className="eye" onClick={() => setSecondInput(prevState => ({ ...prevState, passwordShown: !prevState.passwordShown }))}>
                                    {secondInput.passwordShown ? <i className="fa fa-eye" /> : <i className="fa fa-eye-slash" />}
                                </span>
                            }
                        </div>
                        <button type='submit' className={`button-submit${isValid ? "" : "-false"}`}>{type === "registration" ? "Зарегистрироваться" : "Готово"}</button>
                    </form >
                </>
            }
        </div >
    )
}
export default NewPassword

