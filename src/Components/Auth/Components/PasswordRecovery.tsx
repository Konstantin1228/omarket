import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { db } from '../../../config/firebase'
import { useAppDispatch } from '../../../hooks/hooks'
import { setContryAndTel, setNextStage } from '../../../redux/user/slice'
import { formattedTelephone } from '../FunctionsAndTypes/functions'

const PasswordRecovery: React.FC = () => {
    const dispach = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const { register, formState: { errors }, trigger, handleSubmit, setValue, setError, clearErrors } = useForm<{ tel: string }>({ mode: "onChange" })
    const onSubmit: SubmitHandler<{ tel: string }> = async (data) => {
        setLoading(true)
        const queryTelehpone = await getDocs(query(collection(db, "users"), where("telephone", '==', data.tel)))
        if (queryTelehpone.size == 0) {
            setError("tel", { type: "custom", message: "Данный номер не зарегестрирован в базе данных!" })
            setLoading(false)
        } else {
            dispach(setContryAndTel({ telephone: data.tel }))
            dispach(setNextStage({ stage: 2, type: "recoveryPass" }))
            setLoading(false)
        }
    };

    useEffect(() => {
        setError("tel", { type: 'custom', message: 'Введите корректный номер телефона!' })
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
                        <h1 className="auth__title-text">Восстановление пароля</h1>
                    </div>
                    <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="auth__form-parent" >
                            <input type="tel" {...register("tel", {
                                required: "Поле обязательно к заполнению!",
                            })} onChange={(e: ChangeEvent<HTMLInputElement>) => { setValue("tel", formattedTelephone(e, setError, clearErrors)) }}
                                className={`${errors.tel ? "input-error" : "input"}`} placeholder="Номер телефона" />
                            {errors.tel && <p className="errorAuth">{errors?.tel?.message || "Ошибка!"}</p>}
                        </div>
                        <button type='submit' disabled={errors.tel ? true : false} className={`button-submit${errors.tel ? "-false" : ""}`}>Отправить СМС</button>
                    </form >
                </div >
            }
        </>
    )
}

export default PasswordRecovery