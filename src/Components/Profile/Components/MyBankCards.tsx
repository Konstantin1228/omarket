import axios from 'axios';
import { getDocs, query, collection, where, doc, setDoc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { NumberFormatBase, PatternFormat } from 'react-number-format';
import { db } from '../../../firebase';
import { BankCard, } from '../../../redux/user/types';
import ModalWindow from '../../Other/ModalWindow';

function CardExpiry(props: any) {
  const format = (val: string) => {
    if (val === "") return "";
    let month = val.substring(0, 2);
    let year = val.substring(2, 4);
    if (month.length === 1 && Number(month[0]) > 1) {
      month = `0${month[0]}`;
    } else if (month.length === 2) {
      if (Number(month) === 0) {
        month = `01`;
      } else if (Number(month) > 12) {
        month = "12";
      }
    }
    if (year.length === 1 && Number(year[0]) >= 0) {
      year = `2`;
    } else if (year.length === 2) {
      if (Number(year) === 0) {
        year = `20`;
      } else if (Number(year) >= 29) {
        year = "29";
      }
      else if (Number(year) <= 22) {
        year = "22"
      }
    }
    return `${month}/${year}`;
  };
  return <NumberFormatBase placeholder='ММ/ГГ'  {...props} format={format} />;
}

const MyBankCards = () => {
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(false)
  const [modal, setModal] = useState({ type: "", itemName: "" })
  const [canAddBankCard, setCanAddBankCard] = useState(false)
  const [bankCardData, setBankCardData] = useState<BankCard[]>([{ CVC: "", bankCard: "", date: "", scheme: "" }])
  const { formState: { isValid, errors }, setValue, control, handleSubmit, watch, trigger, clearErrors, setError, reset } = useForm<BankCard>({ mode: "onChange" })

  const deleteBankCard = (idx: number) => {
    setActive(true)
    setModal({ type: "confirmDeleteBankCard", itemName: bankCardData[idx].bankCard })
  }

  useEffect(() => {
    try {
      setLoading(true)
      const getBankCards = async () => {
        const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
        const userRef = doc(db, 'users', q.docs[0].id);
        const docSnap = await getDoc(userRef);
        //@ts-ignore
        if (docSnap.data().profileInformation.otherInformation.bankCards) {
          //@ts-ignore
          setBankCardData(docSnap.data().profileInformation.otherInformation.bankCards)
        } else {
          setBankCardData([])
        }
        setLoading(false)
      }
      getBankCards()
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    try {
      const getAdresses = async () => {
        const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
        const userRef = doc(db, 'users', q.docs[0].id);
        const docSnap = await getDoc(userRef);
        //@ts-ignore
        setBankCardData(docSnap.data().profileInformation.otherInformation.bankCards)
        setLoading(false)
      }
      getAdresses()
    }
    catch (error) {
      console.log(error);
    }
  }, [active === false])

  const onSubmit: SubmitHandler<BankCard> = async (data) => {
    const BIN = data.bankCard.slice(0, 6)
    const { CVC, date, bankCard } = data
    const getData = async () => {
      try {
        let axiosAnswer: any = ""
        await axios.get(`https://lookup.binlist.net/${BIN}`).then((res) => axiosAnswer = res.data).catch((status) => axiosAnswer = status.message)
        setLoading(true)
        if (typeof axiosAnswer === "object") {
          const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
          const userRef = doc(db, 'users', q.docs[0].id);
          const scheme = axiosAnswer.scheme.charAt(0).toUpperCase() + axiosAnswer.scheme.slice(1, axiosAnswer.scheme.length)
          if (bankCardData) {
            const bankCards = bankCardData.map((el) => el)
            await setDoc(userRef, {
              profileInformation: {
                otherInformation: {
                  bankCards: [...bankCards, { bankCard, CVC, date, scheme }]
                },
              }
            }, { merge: true });
          } else {
            await setDoc(userRef, {
              profileInformation: {
                otherInformation: {
                  bankCards: [{ bankCard, CVC, date, scheme }]
                },
              }
            }, { merge: true });
          }
          const docSnap = await getDoc(userRef);
          //@ts-ignore
          const newData = docSnap.data().profileInformation.otherInformation.bankCards.map((el) => el)
          setBankCardData([...newData])
          setCanAddBankCard(false)
        } else {
          setError("bankCard", { type: "custom", message: "Проверьте правильность ввода!" })
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    if (bankCardData.find((el) => el.bankCard === bankCard)?.bankCard === undefined) {
      getData()
    } else {
      setError("bankCard", { type: "custom", message: "Вы уже зарегестрировали эту банковскую карточку" })
    }
  };

  return (
    <>
      {loading ?
        <div className="container__loader-absolute">
          <div className="lds-ring" ><div></div><div></div><div></div><div></div></div>
        </div>
        :
        <form className="profile__adress" onSubmit={handleSubmit(onSubmit)}>
          <div className="profile__adress__inner">
            {/* <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2C20 0.895431 19.1046 0 18 0H2C0.89543 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H18C19.1046 16 20 15.1046 20 14V2ZM18 4H2L2 2L18 2V4ZM2 7H18V14L2 14L2 7Z" fill="#0D0D0D" />
            </svg>
            вставить в инпут svg */}
            {canAddBankCard ?
              <div className="profile__adress__inner-bottom">
                <div className="auth__form-parent">
                  <p className="bold">Номер карты:</p>
                  <Controller
                    control={control}
                    name="bankCard"
                    render={({ fieldState: { error } }) => (
                      <>
                        <PatternFormat onValueChange={(e) => {
                          setValue("bankCard", e.value)
                          trigger("bankCard")
                        }} placeholder='0000 0000 0000 0000'
                          className={`input${error ? "-error" : ""}`} format="#### #### #### ####" />
                        {error && <p className="error">{error.message || "Ошибка!"}</p>}
                      </>
                    )}
                    rules={{
                      required: "Поле обязательно к заполнению!",
                      minLength: {
                        value: 16,
                        message: "Введите корректные данные!"
                      }
                    }}
                  />
                </div>
                <div className="auth__form-parent">
                  <p className="bold">ММ/ГГ:</p>
                  <Controller
                    render={({ fieldState: { error } }) => (
                      <>
                        <CardExpiry
                          className={`input${error ? "-error" : ""}`}
                          onValueChange={(values: any) => {
                            setValue("date", values.formattedValue)
                            trigger("date")
                          }} style={{ width: 200 }}
                        />
                        {errors.date && <p className="error">{errors.date.message || "Ошибка!"}</p>}
                      </>
                    )}
                    control={control}
                    name="date"
                    rules={{
                      required: "Поле обязательно к заполнению!",
                      minLength: {
                        value: 5,
                        message: "Введите корректные данные!"
                      }
                    }}
                  />
                </div>
                <div className="profile__adress__inner-bottom-element auth__form-parent">
                  <p className="bold">CVV:</p>
                  <Controller
                    control={control}
                    name="CVC"
                    render={({ fieldState: { error } }) => (
                      <>
                        <PatternFormat onValueChange={(e) => {
                          setValue("CVC", e.value)
                          trigger("CVC")
                        }} placeholder='CVC'
                          className={`input${error ? "-error" : ""}`} style={{ width: 200 }} format="###" />
                        {error && <p className="error">{error.message || "Ошибка!"}</p>}
                      </>
                    )}
                    rules={{
                      required: "Поле обязательно к заполнению!"
                      , minLength: {
                        value: 3,
                        message: "Введите корректные данные!"
                      }
                    }}
                  />
                </div>
              </div>
              :
              <div className="profile__adress__inner-bottom" style={{ marginTop: 0, gap: 12 }}>
                {bankCardData.length >= 1 ?
                  bankCardData.map((el, idx) =>
                    <div className="profile__adress__inner-bottom-bankCardElement" key={idx} onClick={() => deleteBankCard(idx)}>
                      {/* {el.scheme} */}
                      <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" width={38} alt={el.scheme} />
                      <div className="profile__adress__inner-bottom-bankCardElement-center">
                        <svg width="5" height="5" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="2" cy="2" r="2" fill="#0D0D0D" />
                        </svg>
                        <svg width="5" height="5" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="2" cy="2" r="2" fill="#0D0D0D" />
                        </svg>
                        <svg width="5" height="5" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="2" cy="2" r="2" fill="#0D0D0D" />
                        </svg>
                        <svg width="5" height="5" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="2" cy="2" r="2" fill="#0D0D0D" />
                        </svg>
                      </div>
                      <div className="profile__adress__inner-bottom-bankCardElement-left">
                        <p className='text bold'>{el.bankCard.slice(-4)}</p>
                      </div>
                    </div>
                  )
                  :
                  <p className="prompt bold">Здесь нет карты</p>
                }
              </div>
            }
          </div>
          <div className="profile__adress__bottom">
            {canAddBankCard ?
              <button className={`button-submit${!isValid ? "-false" : ""} profileButton`}>Сохранить</button>
              :
              <button className={`button-submit profileButton`} onClick={(e): void => { e.preventDefault(); setCanAddBankCard(true) }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" >
                  <path d="M5.99935 0.666504C6.36754 0.666504 6.66602 0.964981 6.66602 1.33317V5.33317H10.666C11.0342 5.33317 11.3327 5.63165 11.3327 5.99984C11.3327 6.36803 11.0342 6.66651 10.666 6.66651H6.66602V10.6665C6.66602 11.0347 6.36754 11.3332 5.99935 11.3332C5.63116 11.3332 5.33268 11.0347 5.33268 10.6665V6.66651H1.33268C0.964492 6.66651 0.666016 6.36803 0.666016 5.99984C0.666016 5.63165 0.964492 5.33317 1.33268 5.33317H5.33268V1.33317C5.33268 0.964981 5.63116 0.666504 5.99935 0.666504Z" fill="#FF6600" />
                </svg>
                Добавить карту
              </button>
            }
          </div>
          <ModalWindow active={active} setActive={setActive} type={modal.type} itemName={modal.itemName} setLoading={setLoading} bankCards={bankCardData} />
        </form>
      }
    </>
  )
}

export default MyBankCards