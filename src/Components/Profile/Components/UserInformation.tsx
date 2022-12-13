import { getDocs, query, collection, where, doc, setDoc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { db } from '../../../firebase';
import { formattedTelephone } from '../../Auth/FunctionsAndTypes/functions';
interface userInformation {
    nameSurname: string,
    telephone: string
    email: string
    sex: string
    dateOfBirth: string
    familyStatus: string
    isHaveChild: boolean
    childCount: number | null
}
const UserInformation: React.FC = () => {
    const [canEdit, setCanEdit] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userInformation, setUserInformation] = useState<userInformation>()
    const { register, formState: { errors, isValid }, control, trigger, setError, handleSubmit, setValue, clearErrors, reset, watch } = useForm<userInformation>({ mode: "onChange" })

    const sexOption = [
        { value: 'female', label: <div className="select-option">Женский</div> },
        { value: 'male', label: <div className="select-option">Мужской</div> },
    ]

    const familyStatusOptions = [
        { value: 'married', label: <div className="select-option">Женат (Замужем)</div> },
        { value: 'notMarried', label: <div className="select-option">Не женат (Не замужем)</div> },
        { value: 'widower', label: <div className="select-option">Вдовец (вдова)</div> },
    ]

    const childOptions = [
        { value: true, label: <div className="select-option">Есть</div> },
        { value: false, label: <div className="select-option">Нет</div> },
    ]

    const updateHaveChild = (newValue: any) => {
        newValue.value === false && setValue("childCount", null)
        setValue("isHaveChild", newValue.value)
        trigger("isHaveChild")
        trigger("childCount")
    }

    const onSubmit: SubmitHandler<userInformation> = async (data) => {
        setLoading(true)
        const { sex, telephone, nameSurname, email, dateOfBirth, familyStatus, isHaveChild, childCount } = data
        let isValid = true
        try {
            const checkUniqueTelephone = await (getDocs(query(collection(db, "users"), where("telephone", '==', telephone))))
            const checkUniqueEmail = await (getDocs(query(collection(db, "users"), where("telephone", '==', email), where("telephone", "!=", telephone))))
            if (checkUniqueTelephone.empty && checkUniqueEmail.empty) {
                const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
                const userRef = doc(db, 'users', q.docs[0].id);
                if (isValid) {
                    await setDoc(userRef, {
                        profileInformation: {
                            aboutUser: {
                                nameSurname, email, sex, dateOfBirth, familyStatus, isHaveChild, childCount
                            }
                        },
                        telephone
                    }, { merge: true });
                    localStorage.setItem("telephone", telephone)
                    setCanEdit(false)
                }
            } else {
                !checkUniqueEmail.empty && setError("email", { type: "custom", message: "Введите уникальные данные!" })
                !checkUniqueTelephone.empty && setError("telephone", { type: "custom", message: "Введите уникальные данные!" })
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
                const userRef = doc(db, 'users', q.docs[0].id);
                const docSnap = await getDoc(userRef)
                const data = docSnap.data()
                const telephone = data?.telephone
                if (data?.profileInformation?.aboutUser) {
                    const { childCount, dateOfBirth, email, familyStatus, isHaveChild, nameSurname, sex } = data.profileInformation.aboutUser
                    setUserInformation({ telephone, childCount, dateOfBirth, email, familyStatus, isHaveChild, nameSurname, sex })
                    Object.keys(data?.profileInformation?.aboutUser).map((el, idx) => {
                        //@ts-ignore
                        setValue(el, Object.values(data?.profileInformation?.aboutUser)[idx])
                    })
                } else {
                    setUserInformation({ telephone, childCount: 0, dateOfBirth: "", email: "", familyStatus: "", isHaveChild: false, nameSurname: "", sex: "" })
                }
                setValue("telephone", telephone)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        getData()
    }, [])

    return (
        <>
            {loading ?
                <div className="container__loader-absolute">
                    <div className="lds-ring" ><div></div><div></div><div></div><div></div></div>
                </div>
                :
                <div className='profile-parent'>
                    <form className="profile__right" onSubmit={handleSubmit(onSubmit)}>
                        <div className="profile__right-top">
                            <span className="profile__right-top-text bold">Статус:</span>
                            <div className="profile__right-top-parent">
                                <div className="profile__right-top-parent-circle"></div>
                                <span className="bold">Золото</span>
                            </div>
                        </div>
                        <div className="profile__right-bottom">
                            <div className="profile__right-bottom-child-element">
                                <span className="profile__right-bottom-child-element-text bold">ФИО:</span>
                                <input disabled={!canEdit} defaultValue={userInformation?.nameSurname}
                                    className={`input${errors.nameSurname ? "-error" : ""}`}  {...register("nameSurname", {
                                        required: "Поле обязательно к заполнению!",
                                        maxLength: {
                                            value: 50,
                                            message: "Максимальная длина -50 символов!"
                                        }
                                    })}
                                    placeholder="Жанара Ибрагимова" />
                                {errors.nameSurname && <p className="errorAuth" >{errors?.nameSurname.message || "Ошибка!"} </p>}
                            </div>
                            <div className="profile__right-bottom-child-element">
                                <span className="profile__right-bottom-child-element-text bold">Номер телефона:</span>
                                <input disabled={!canEdit} className={`input${errors.telephone ? "-error" : ""}`} defaultValue={userInformation?.telephone}
                                    placeholder='+7 (707) 456 - 78 - 45' {...register("telephone", {
                                        required: "Поле обязательно к заполнению!",
                                        pattern: {
                                            message: "Введите корректный номер телефона!",
                                            value: /^[+]{1}[0-9]{1} [(]{1}[0-9]{3}[)]{1} [0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/
                                        },
                                        onChange: (e) => {
                                            setValue("telephone", formattedTelephone(e, setError, clearErrors))
                                        }
                                    })} />
                                {errors.telephone && <p className="errorAuth">{errors.telephone.message || "Ошибка!"} </p>}
                            </div>
                            <div className="profile__right-bottom-child-element">
                                <span className="profile__right-bottom-child-element-text bold">Электронная почта:</span>
                                <input disabled={!canEdit} defaultValue={userInformation?.email} className={`input${errors.email ? "-error" : ""}`}
                                    {...register("email", {
                                        required: "Поле обязательно к заполнению",
                                        pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
                                    })} placeholder='zhnara.yelemiesova@gmail.com' />
                                {errors.email && <p className="errorAuth">{errors.email.message || "Введите корректный Email!"} </p>}
                            </div>
                            <div className="profile__right-bottom-child-element">
                                <span className="profile__right-bottom-child-element-text bold">Пол:</span>
                                <Controller
                                    control={control}
                                    name="sex"
                                    render={() => (
                                        <>
                                            <Select isSearchable={false} options={sexOption} value={sexOption.find((el) => el.value === watch("sex"))}
                                                classNamePrefix="reactSelect" maxMenuHeight={100} isDisabled={!canEdit}
                                                onChange={(newValue: any) => {
                                                    setValue("sex", newValue.value)
                                                    trigger("sex")
                                                }}
                                                placeholder="Выбрать" components={makeAnimated()} />
                                            {errors.sex && <p className="errorAuth">{errors.sex.message || "Ошибка!"} </p>}
                                        </>
                                    )}
                                    rules={{ required: "Поле обязательно к заполнению!" }}
                                />
                            </div>
                            <div className="profile__right-bottom-child-element">
                                <span className="profile__right-bottom-child-element-text bold">Дата рождения:</span>
                                <input disabled={!canEdit} defaultValue={userInformation?.dateOfBirth} type="date" className={`input${errors.dateOfBirth ? "-error" : ""}`}
                                    {...register("dateOfBirth", {
                                        required: "Поле обязательно к заполнению!",
                                    })} />
                                {errors.dateOfBirth && <p className="errorAuth">{errors.dateOfBirth.message || "Ошибка!"} </p>}
                            </div>
                            <div className="profile__right-bottom-child-element">
                                <span className="profile__right-bottom-child-element-text bold">Семейное положение:</span>
                                <Controller
                                    control={control}
                                    name="familyStatus"
                                    render={() => (
                                        <>
                                            <Select defaultValue={"123"} value={familyStatusOptions.find((el) => el.value === watch("familyStatus"))} classNamePrefix="reactSelect"
                                                isDisabled={!canEdit} maxMenuHeight={100} onChange={(newValue: any) => {
                                                    setValue("familyStatus", newValue.value)
                                                    trigger("familyStatus")
                                                }}
                                                isSearchable={false} options={familyStatusOptions} placeholder="Выбрать" components={makeAnimated()} />
                                            {errors.familyStatus && <p className="errorAuth">{errors.familyStatus.message || "Ошибка!"} </p>}
                                        </>
                                    )}
                                    rules={{ required: "Поле обязательно к заполнению!" }}
                                />
                            </div>
                            <div className="profile__right-bottom-child-element">
                                <span className="profile__right-bottom-child-element-text bold">Дети:</span>
                                <Controller
                                    control={control}
                                    name="isHaveChild"
                                    render={({ fieldState: { error } }) => (
                                        <>
                                            <Select isDisabled={!canEdit} value={childOptions.find((el) => !!el.value === watch("isHaveChild"))}
                                                classNamePrefix="reactSelect" maxMenuHeight={100} onChange={(newValue: any) => updateHaveChild(newValue)}
                                                isSearchable={false} options={childOptions} placeholder="Выбрать" components={makeAnimated()} />
                                            {error && <p className="errorAuth">{error.message || "Ошибка!"} </p>}
                                        </>
                                    )}
                                />
                            </div>
                            {watch("isHaveChild") &&
                                <div className="profile__right-bottom-child-element">
                                    <span className="profile__right-bottom-child-element-text bold">Кол-во человек в семье:</span>
                                    <Controller
                                        control={control}
                                        name="childCount"
                                        render={({ fieldState: { error } }) => (
                                            <>
                                                <PatternFormat disabled={!canEdit} defaultValue={watch("childCount")} className={`input${errors.childCount ? "-error" : ""}`}
                                                    onValueChange={(e) => {
                                                        setValue("childCount", Number(e.value))
                                                        trigger("childCount")
                                                    }}
                                                    format='##' placeholder='1' style={{ width: 100, textAlign: 'center' }} />
                                                {error && <p className="errorAuth">{error.message || "Ошибка!"} </p>}
                                            </>
                                        )}
                                        rules={{
                                            min: {
                                                value: 2,
                                                message: "Введите корректные данные"
                                            }
                                        }}
                                    />
                                </div>
                            }
                        </div>
                    </form >
                    {canEdit ?
                        <input type="submit" value={"Сохранить"} className={`button-submit${isValid ? "" : "-false"} profileButton`} />
                        :
                        <button type="button" className={"button-submit profileButton"} onClick={() => !canEdit && setCanEdit(true)}>Редактировать</button>
                    }
                </div>
            }
        </>
    )
}

export default UserInformation

