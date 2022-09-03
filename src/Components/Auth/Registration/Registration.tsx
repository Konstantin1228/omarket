import React, { ChangeEvent, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks"
import "../../../scss/components/auth.scss"
import lookup from 'country-code-lookup'
import InputMask from 'react-input-mask';

interface IFormAuth {
    city: string;
    phoneNumber: String;

}


type PropsType = {
    setStage: (value: number) => void
}

const Registration: React.FC<PropsType> = ({ setStage }) => {

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

    const mappedOptions: any[] = lookup.countries.map((c, i) => ( // map options with key
        <option key={c + '-' + i}>{c.country}</option>
    ))

    const [value, setValue] = useState('Страна')

    const [code, setCode] = useState('')


    const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.currentTarget.value)
        const countryFound = lookup.countries.find(c => c.country === value)
        const countryCode = (`+${countryFound?.isoNo}`);
        setCode(`${countryCode}(`)

    }
    console.log('code', code.indexOf('('))
    console.log(code.length - code.indexOf('('))

    const onChangeInputNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(`${e.currentTarget.value}${code.length - code.indexOf('(') === 3 ? ')' : ''}`)
    }

    return (
        <div className="auth">
            <div className="auth__top">
                <h1>Регистрация</h1>

                <form onSubmit={handleSubmit(onSubmit)} >

                    <div className={"select-rotate"}>
                        <select
                            {...register("city")}
                            className="select__inner"
                            value={value}
                            onChange={onChangeSelect}
                        >
                            {mappedOptions}
                        </select>
                    </div>

                    <div className="cart__inner-notEmpty-left-ordering-adress-more-element">
                        <div className="auth__inputBlock">
                            <input {...register("phoneNumber", {
                                required: "Поле обязательно к к заполнению!"
                            })}
                                value={code === '+' ? '' : code}
                                type="text"
                                onChange={onChangeInputNumber}
                                placeholder="Номер телефона"
                                className="cart__inner-notEmpty-left-ordering-adress-more-input-adress"
                            />
                            {errors.phoneNumber && <p className="error">{errors?.phoneNumber?.message || "Ошибка!"}</p>}
                        </div>
                    </div>

                    <button type="submit" className={isValid ? `cart__inner - notEmpty - makeOrder - submitOrder` : `cart__inner - notEmpty - makeOrder - submitOrder - false`}  >
                        отправить СМС
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Registration