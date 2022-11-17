import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { getDocs, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import { auth, db } from '../../../firebase'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { setNextStage } from '../../../redux/user/slice'
import { PasswordRecoveryInterface } from '../FunctionsAndTypes/types'

const GetSmsCode: React.FC = () => {
    const [time, setTime] = useState(15)
    const dispatch = useAppDispatch()
    const { register, formState: { errors, isValid }, trigger, handleSubmit, setValue, watch, control } = useForm<PasswordRecoveryInterface>({ mode: "onChange" })
    const { type, stage } = useAppSelector(state => state.userSlice.authorizationOrLogin)
    useEffect(() => {
        if (time !== 0) {
            setTimeout(() => {
                setTime(time - 1)
            }, 1000);
        }
    }, [time])
    const generateRecaptcha = () => {
        //@ts-ignore
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            size: 'invisible',
            сallback: (response: any) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
            }
        }, auth);
    }
    // useEffect(() => {
    //     generateRecaptcha()
    //     // @ts-ignore
    //     let appVerifier = window.recaptchaVerifier
    //     const phone = "+79523661409"
    //     signInWithPhoneNumber(auth, phone, appVerifier)
    //         .then((confirmationResult) => {
    //             //@ts-ignore
    //             window.confirmationResult = confirmationResult;
    //             let code = watch("tel")
    //             //@ts-ignore
    //             window.confirmationResult.confirm(code).then((result) => {
    //                 const user = result.user;
    //                 console.log(user);
    //                 console.log("otp true");
    //                 // @ts-ignore
    //             }).catch((error) => {
    //                 console.log(error)
    //             });
    //         }).catch((error) => {
    //             console.log(error)
    //         });

    // }, [])

    const onSubmit: SubmitHandler<PasswordRecoveryInterface> = async (data) => {
        if (type === "registration") {
            dispatch(setNextStage({ stage: 3, type: "registration" }))
        } else if (type === "recoveryPass") {
            //@ts-ignore
            window.recaptchaVerifier.render().then(function (widgetId) {
                //@ts-ignore
                grecaptcha.reset(widgetId);
            });
            // @ts-ignore
            let appVerifier = window.recaptchaVerifier
            const phone = "+79523661409"
            signInWithPhoneNumber(auth, phone, appVerifier)
                .then((confirmationResult) => {
                    //@ts-ignore
                    window.confirmationResult = confirmationResult;
                    let code = watch("tel")
                    //@ts-ignore
                    window.confirmationResult.confirm(code).then((result) => {
                        const user = result.user;
                        console.log(user);
                        console.log("otp true");
                        // @ts-ignore
                    }).catch((error) => {
                        console.log(error)
                    });
                }).catch((error) => {
                    console.log(error)
                });
            dispatch(setNextStage({ stage: 3, type: "recoveryPass" }))
        }
    };

    return (
        <div className="auth" >
            <div className="auth__title">
                {time === 0 && <div className="auth__title-arrow" onClick={() => dispatch(setNextStage({ stage: stage - 1, type }))}>❮</div>}
                {/* <h1 className="auth__title-text">Введите СМС код</h1> */}
                <h1 className="auth__title-text">Введите СМС код(на данный момент код не приходит, введите любые 6 цифр)</h1>
            </div>
            <p className='bold' style={{ marginBottom: 10 }}>На ваш номер был отправлен 6х значный код</p>
            <form className="auth__form" onSubmit={handleSubmit(onSubmit)} >
                <div className="auth__form-parent" >
                    <Controller
                        control={control}
                        name="tel"
                        render={({ field }) => (
                            <PatternFormat onValueChange={(e) => {
                                setValue("tel", e.value)
                                trigger("tel")
                            }} format='######' className={`${errors.tel ? "input-error" : "input"}`}
                                placeholder="- - - -" style={{ textAlign: "center", letterSpacing: 3 }} />
                        )}
                        rules={{
                            required: "Поле обязательно к заполнению!",
                            minLength: {
                                value: 6,
                                message: "Введите корректные данные!"
                            }
                        }}
                    />
                    {errors.tel && <p className="errorAuth">{errors?.tel?.message || "Ошибка!"}</p>}
                </div>
                <button type='submit' className={`button-submit${isValid ? "" : "-false"}`}>Продолжить</button>
                {time > 0 ? <button className="auth__form-help bold" style={{ color: "#9C9C9C" }}>Отправить повторно (00:{time >= 10 ? time : `0${time}`})</button> :
                    <button className="auth__form-help bold" onClick={() => setTime(30)} style={{ cursor: 'pointer' }}>Повторить отправку</button>}
            </form >
            <div id="sign-in-button" />
        </div >
    )
}

export default GetSmsCode

function onSignInSubmit() {
    throw new Error('Function not implemented.')
}
