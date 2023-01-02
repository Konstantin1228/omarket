import React, { useEffect, useState } from 'react'
import { getDocs, query, collection, where, doc, setDoc, getDoc } from 'firebase/firestore';
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format';
import { db } from '../../../../config/firebase';
import { BankCard, } from '../../../../redux/user/types';
import ModalWindow from '../../../Other/ModalWindow/ModalWindow';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { CardExpiry } from '../../FunctionsAndTypes/functions';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import Loader from '../../../Other/Loader/Loader';


const MyBankCards = () => {
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(false)
  const [modal, setModal] = useState({ type: "", itemName: "" })
  const [canAddBankCard, setCanAddBankCard] = useState(false)
  const [bankCardData, setBankCardData] = useState<BankCard[]>([{ CVC: "", bankCard: "", date: "", scheme: "" }])
  const { formState: { isValid, errors }, setValue, control, handleSubmit, trigger, setError } = useForm<BankCard>({ mode: "onChange" })

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
        if (docSnap.data()?.profileInformation?.otherInformation?.bankCards) {
          setBankCardData(docSnap.data()?.profileInformation?.otherInformation?.bankCards)
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
        setBankCardData(docSnap.data()?.profileInformation?.otherInformation?.bankCards)
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
          const newData = docSnap.data()?.profileInformation?.otherInformation?.bankCards?.map((el) => el)
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
        <Loader />
        :
        <form className="profile__adress" onSubmit={handleSubmit(onSubmit)}>
          <div className="profile__adress__inner">
            {/* <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2C20 0.895431 19.1046 0 18 0H2C0.89543 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H18C19.1046 16 20 15.1046 20 14V2ZM18 4H2L2 2L18 2V4ZM2 7H18V14L2 14L2 7Z" fill="#0D0D0D" />
            </svg>
            вставить в инпут svg */}
            {canAddBankCard ?
              <div className="profile__adress__inner-bottom" style={{ alignItems: "center" }}>
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
                          }}
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
                <div className="auth__form-parent">
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
                          className={`input${error ? "-error" : ""}`} format="###" />
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
                      {(el.scheme === "Visa" || el.scheme === "Mastercard" || el.scheme === "Jcb" || el.scheme === "Amex") ?
                        <img src={require(`../../../../images/cards/${el.scheme}.png`)} alt={el.scheme} /> :
                        <img src={require(`../../../../images/cards/unkownCard.png`)} alt={el.scheme} />}
                      <div className="profile__adress__inner-bottom-bankCardElement-center">
                        <FiberManualRecordIcon sx={{ fontSize: "0.5rem" }} />
                        <FiberManualRecordIcon sx={{ fontSize: "0.5rem" }} />
                        <FiberManualRecordIcon sx={{ fontSize: "0.5rem" }} />
                        <FiberManualRecordIcon sx={{ fontSize: "0.5rem" }} />
                      </div>
                      <div className="profile__adress__inner-bottom-bankCardElement-left">
                        <p className='text bold'>{el.bankCard.slice(-4)}</p>
                      </div>
                    </div>
                  )
                  :
                  <p className="prompt bold">Вы не добавляли банковские карты</p>
                }
              </div>
            }
          </div>
          <div className="profile__adress__bottom">
            {canAddBankCard ?
              <button className={`button-submit${!isValid ? "-false" : ""} profileButton`}>Сохранить</button>
              :
              <button className={`button-submit profileButton`} onClick={(e): void => { e.preventDefault(); setCanAddBankCard(true) }}>
                <AddIcon fontSize="small" />
                <span>Добавить карту</span>
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