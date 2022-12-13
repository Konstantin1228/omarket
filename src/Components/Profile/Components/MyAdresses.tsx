import React, { useEffect, useRef, useState } from 'react'
import { getDocs, query, collection, where, doc, getDoc, setDoc } from 'firebase/firestore'
import { DaDataSuggestion, DaDataAddress, AddressSuggestions } from 'react-dadata'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { db } from '../../../firebase'
import { calcCrow } from '../../Cart/FunctionsAndTypes/functions'
import { AddAdress, DeliviryAddress1 } from '../FunctionsAndTypes/types'
import ModalWindow from '../../Other/ModalWindow/ModalWindow'
const MyAdresses = () => {
  const [loading, setLoading] = useState(true)
  const [addAdress, setAddAdress] = useState(false)
  const [active, setActive] = useState(false)
  const [modal, setModal] = useState({ type: "", itemName: "" })
  const [deliviryAdresses, setDeliviryAdresses] = useState<DeliviryAddress1[]>([{ city: "321312", isDefault: false }])
  const dadataRef = useRef<AddressSuggestions>(null)
  const { register, formState: { isValid, errors }, setValue, control, handleSubmit, trigger, clearErrors, setError, reset } = useForm<AddAdress>({ mode: "onChange" })

  useEffect(() => {
    try {
      const getAdresses = async () => {
        const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
        const userRef = doc(db, 'users', q.docs[0].id);
        const docSnap = await getDoc(userRef);
        setDeliviryAdresses(docSnap.data()?.profileInformation?.otherInformation?.deliviryAdresses)
        setLoading(false)
      }
      getAdresses()
    }
    catch (error) {
      console.log(error);
    }
  }, [active === false])

  const validateAdressSuggestions = (e: DaDataSuggestion<DaDataAddress> | undefined) => {
    if (e) {
      const { region, city_with_type, street_with_type, house_type_full, house, geo_lat, geo_lon } = e.data
      const { value } = e
      setValue("adress", value)
      if (region === "Санкт-Петербург" || region === "Москва") {
        if ((city_with_type && street_with_type && house_type_full && house) !== null) {
          const lengthBetweenPoints = calcCrow(59.93578, 30.3078, geo_lat, geo_lon)
          if (lengthBetweenPoints < 13) {
            const checkTown = deliviryAdresses.find((el) => el.city === value)
            if (checkTown?.city) {
              setError("adress", { type: "custom", message: "Данный адрес есть в списке адресов!" })
            } else {
              clearErrors("adress")
              trigger("adress")
            }
          } else {
            setError("adress", { type: "custom", message: "На данный адрес невозможна доставка!" })
          }
        }
        else {
          setError("adress", { type: "custom", message: "Укажите адрес в формате:город,улица,дом,номер дома!" })
        }
      } else {
        setError("adress", { type: "custom", message: "Адрес осуществляется только по г.Санкт-Петербург и по г.Москва!" })
      }
    }
  }

  const onSubmit: SubmitHandler<AddAdress> = async (data) => {
    setLoading(true)
    try {
      const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
      const { adress, comment } = data
      const adresses = deliviryAdresses.map((el) => el)
      const userRef = doc(db, 'users', q.docs[0].id);
      await setDoc(userRef, {
        profileInformation: {
          otherInformation: {
            deliviryAdresses: [...adresses, { city: adress, comment, isDefault: false }]
          },
        }
      }, { merge: true });
      const docSnap = await getDoc(userRef);
      //@ts-ignore
      const newData = docSnap.data()?.profileInformation?.otherInformation?.deliviryAdresses?.map((el) => el)
      setDeliviryAdresses([...newData])
    } catch (error) {
      console.log(error)
    }
    reset()
    dadataRef.current?.setInputValue("")
    setAddAdress(false)
    setLoading(false)
  };

  const deleteAdress = (idx: number) => {
    setModal({ type: "confirmDeleteAdress", itemName: deliviryAdresses[idx].city })
    setActive(true)
  }

  const makeMain = (idx: number) => {
    setModal({ type: "makeMain", itemName: deliviryAdresses[idx].city })
    setActive(true)
  }

  return (
    <>
      {loading ?
        <div className="container__loader-absolute">
          <div className="lds-ring" ><div></div><div></div><div></div><div></div></div>
        </div>
        :
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="profile__adress" >
            <div className="profile__adress__inner">
              <div className="profile__adress__inner-top">
                <h1 className='bold'>Адрес по умолчанию</h1>
                <h1>{deliviryAdresses.find((el) => el.isDefault === true)?.city}</h1>
              </div>
              <div className="profile__adress__inner-bottom">
                {addAdress ?
                  <>
                    <div className="profile__adress__inner-bottom-element auth__form-parent">
                      <p className="bold">Адрес:</p>
                      <Controller
                        control={control}
                        name="adress"
                        render={({ fieldState: { error }, }) => (
                          <>
                            <AddressSuggestions ref={dadataRef} onChange={(e) => { validateAdressSuggestions(e) }}
                              highlightClassName="react-dadata__suggestions-liHelp" suggestionClassName="react-dadata__suggestions-li"
                              token='fa4b2c103c0b276d9f833e9a1351f45d3a8beda3' delay={300} count={3} minChars={2} inputProps={{ "placeholder": "Ввести" }}
                            />
                            {error && <p className="errorAuth" style={{ whiteSpace: "normal", bottom: -30 }}>{error.message || "Ошибка!"}</p>}
                          </>
                        )}
                        rules={{
                          required: "Поле обязательно к заполнению!"
                        }}
                      />
                    </div>
                    <div className="profile__adress__inner-bottom-element auth__form-parent">
                      <p className="bold">Комментарии к адресу:</p>
                      <input type="text" className="input" placeholder='Написать комментарии' {...register("comment", {
                        maxLength: {
                          value: 50,
                          message: "Комментарий не может более 50 символов!"
                        }
                      })} />
                      {errors.comment && <p className='error'>{errors.comment.message || "Ошибка!"}</p>}
                    </div>
                  </>
                  :
                  <div className='profile__adressParent'>
                    {
                      deliviryAdresses ?
                        deliviryAdresses.map((el, idx) => (
                          !el.isDefault &&
                          <div className="profile__adressParent-element" key={idx}>
                            <div className="profile__adressParent-element-parent adress">
                              <p className="bold">Адрес:</p>
                              <p>{el.city}</p>
                            </div>
                            <div className="profile__adressParent-element-parent comment">
                              <p className="bold">Комментарии к адресу:</p>
                              <p>{el.comment ? el.comment : "Отсутсвует"}</p>
                            </div>
                            <div className="profile__adressParent-element-parent" style={{ display: "flex", flexDirection: 'row', gap: 24 }}>
                              <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg" onClick={() => makeMain(idx)}>
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8.86193 0.528758C9.12228 0.268409 9.54439 0.268409 9.80474 0.528758L12.4714 3.19543C12.7318 3.45577 12.7318 3.87788 12.4714 4.13823L3.80474 12.8049C3.67971 12.9299 3.51014 13.0002 3.33333 13.0002H0.666667C0.298477 13.0002 0 12.7017 0 12.3335V9.66683C0 9.49002 0.0702379 9.32045 0.195262 9.19543L6.86179 2.5289L8.86193 0.528758ZM7.33333 3.94297L1.33333 9.94297V11.6668H3.05719L9.05719 5.66683L7.33333 3.94297ZM10 4.72402L11.0572 3.66683L9.33333 1.94297L8.27614 3.00016L10 4.72402Z" fill="#FF6600" />
                                </svg>
                              </div>
                              <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg" onClick={() => deleteAdress(idx)}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M3.66732 1.66683C3.66732 0.93045 4.26427 0.333496 5.00065 0.333496H9.00065C9.73703 0.333496 10.334 0.93045 10.334 1.66683V3.00016H11.6604C11.6646 3.00012 11.6687 3.00012 11.6728 3.00016H13.0007C13.3688 3.00016 13.6673 3.29864 13.6673 3.66683C13.6673 4.03502 13.3688 4.3335 13.0007 4.3335H12.2881L11.7099 12.4285C11.66 13.1262 11.0794 13.6668 10.3799 13.6668H3.6214C2.92188 13.6668 2.34129 13.1262 2.29145 12.4285L1.71324 4.3335H1.00065C0.632461 4.3335 0.333984 4.03502 0.333984 3.66683C0.333984 3.29864 0.632461 3.00016 1.00065 3.00016H2.32848C2.33262 3.00012 2.33674 3.00012 2.34087 3.00016H3.66732V1.66683ZM5.00065 3.00016H9.00065V1.66683H5.00065V3.00016ZM3.04997 4.3335L3.6214 12.3335H10.3799L10.9513 4.3335H3.04997Z" fill="#FF6600" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        ))
                        :
                        <p className="prompt">Здесь нет других адресов</p>
                    }
                  </div>
                }
              </div>
            </div>
            <div className="profile__adress__bottom">
              {addAdress ?
                <button type='submit' disabled={!isValid} className={`button-submit${!isValid ? "-false" : ""} profileButton`} >Сохранить</button>
                :
                <button className={`button-submit profileButton`} onClick={() => { setAddAdress(true) }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.99935 0.666504C6.36754 0.666504 6.66602 0.964981 6.66602 1.33317V5.33317H10.666C11.0342 5.33317 11.3327 5.63165 11.3327 5.99984C11.3327 6.36803 11.0342 6.66651 10.666 6.66651H6.66602V10.6665C6.66602 11.0347 6.36754 11.3332 5.99935 11.3332C5.63116 11.3332 5.33268 11.0347 5.33268 10.6665V6.66651H1.33268C0.964492 6.66651 0.666016 6.36803 0.666016 5.99984C0.666016 5.63165 0.964492 5.33317 1.33268 5.33317H5.33268V1.33317C5.33268 0.964981 5.63116 0.666504 5.99935 0.666504Z" fill="#FF6600" />
                  </svg>
                  Добавить адрес
                </button>
              }
            </div>
          </form>
          <ModalWindow active={active} setActive={setActive} type={modal.type} itemName={modal.itemName} setLoading={setLoading} deliviryAdresses={deliviryAdresses} />
        </>
      }
    </>
  )
}


export default MyAdresses