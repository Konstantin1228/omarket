import { getDocs, query, collection, where, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import { useAppDispatch } from '../../../hooks/hooks'
import { addToCart } from '../../../redux/cart/slice'
import { ItemsInCart } from '../../../redux/cart/types'
import { addStatusToasts } from '../../../redux/toasts/slice'
import { SearchAdressOrCard } from './SelectBar'
import ModalWindowCheck from './ModalWindowCheck'
interface MyOrders {
  itemsInCart: ItemsInCart[]
  orderInformation: {
    adress: string
    comment: string
    deliviryCost: string
    orderDate: string
    orderNumber: string
    status: string
  }
  bankCardInformation: {
    bankCard: string
    scheme: string
  }
}

const MyOrders: React.FC<SearchAdressOrCard> = ({ setFilterOrders, filterOrders }) => {
  const dispatch = useAppDispatch()
  const [active, setActive] = useState({ condition: false, itemIdx: 0 })
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<MyOrders[]>()
  const [filteredOrders, setFilteredOrders] = useState<MyOrders[]>()

  useEffect(() => {
    try {
      const getData = async () => {
        const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
        const userRef = doc(db, 'users', q.docs[0].id);
        const docSnap = await getDoc(userRef)
        const data = docSnap.data()?.profileInformation?.userOrders
        setOrders(data)
        if (setFilterOrders && data) {
          const table = {};
          //@ts-ignore
          const uniqueAdresses = data.map((el) => { return { adress: el.orderInformation.adress, isActive: false } }).filter(({ adress }) => (!table[adress] && (table[adress] = 1)))
          const newTable = {};
          //@ts-ignore
          const uniquePayment = data.map((el) => { return { paymentType: el.bankCardInformation.scheme, isActive: false } }).filter(({ paymentType }) => (!newTable[paymentType] && (newTable[paymentType] = 1)))
          if ((uniqueAdresses.length || uniquePayment.length) > 1) setFilterOrders({ adresses: uniqueAdresses, payment: uniquePayment })
        }
        setLoading(false)
      }
      getData()
    } catch (error) {
      console.log(error)
    }
    return () => {
      setFilterOrders({ adresses: [{ adress: "", isActive: false }], payment: [{ paymentType: "", isActive: false }] })
    }
  }, [])

  useEffect(() => {
    const array: MyOrders[] = []
    orders?.filter((element, idx) => {
      if (filterOrders.payment.reduce((previous, current) => previous + Number(current.isActive === true), 0) === 0) {
        filterOrders.adresses.filter((adress) => (adress.adress === element.orderInformation.adress && adress.isActive === true) ? array.push(element) : false)
      } else if (filterOrders.adresses.reduce((previous, current) => previous + Number(current.isActive), 0) === 0) {
        filterOrders.payment.find((payment) => payment.paymentType === element.bankCardInformation.scheme && payment.isActive === true ? array.push(element) : false)
      } else {
        const adress = filterOrders.adresses.find((adress) => adress.adress === element.orderInformation.adress && adress.isActive === true)
        const payment = filterOrders.payment.find((payment) => payment.paymentType === element.bankCardInformation.scheme && payment.isActive === true)
        if (adress !== undefined && payment !== undefined) array.push(element)
      }
    })
    setFilteredOrders(array)
  }, [filterOrders])

  return (
    <>
      {loading ?
        <div className="container__loader-absolute">
          < div className="lds-ring" ><div></div><div></div><div></div><div></div></div >
        </div > :
        orders !== undefined ?
          <div className='profile__parent'>
            <div className="profile__myOrders">
              < ModalWindowCheck active={active} setActive={setActive} orderDetails={orders[active.itemIdx]} />
              {!((filterOrders.adresses.reduce((current, previous) => current + Number(previous.isActive), 0) !== 0 ||
                filterOrders.payment.reduce((current, previous) => current + Number(previous.isActive), 0) !== 0) && filteredOrders && filteredOrders.length === 0) ?
                < div className="profile__myOrders-element">
                  <div className="profile__myOrders-text bold">Номер</div>
                  <div className="profile__myOrders-text bold">Сумма</div>
                  <div className="profile__myOrders-text bold">Дата и время</div>
                  <div className="profile__myOrders-text bold">Статус</div>
                  <div className="profile__myOrders-text bold">Адрес</div>
                  <div className="profile__myOrders-text bold">Комментарий</div>
                  <div className="profile__myOrders-text bold">Всего товаров</div>
                  <div className="profile__myOrders-text bold"></div>
                </div>
                :
                <p className="prompt" style={{ padding: 10 }}>Не найдено заказов по указанным фильтрам!</p>
              }
              {
                ((filterOrders.adresses.reduce((current, previous) => current + Number(previous.isActive), 0) !== 0 ||
                  filterOrders.payment.reduce((current, previous) => current + Number(previous.isActive), 0) !== 0)
                  && filteredOrders ? filteredOrders : orders).map((order, idx) => (
                    <div className="profile__myOrders-element" key={idx}>
                      <div className="profile__myOrders-text-left">{order.orderInformation.orderNumber}</div>
                      <div className="profile__myOrders-text-left">{order.itemsInCart.reduce((previous, current) => previous + current.count * current.price, 0)}₽</div>
                      <div className="profile__myOrders-text-left">{order.orderInformation.orderDate}</div>
                      <div className={`profile__myOrders-text-left-${order.orderInformation.status === "Доставлен" ? "green" : "red"} bold`}>{order.orderInformation.status}</div>
                      <div className="profile__myOrders-text-left">{order.orderInformation.adress}</div>
                      <div className="profile__myOrders-text-left">{order.orderInformation.comment.length >= 5 ? order.orderInformation.comment : "Отсутствует"}</div>
                      <div className="profile__myOrders-text-left">{order.itemsInCart.reduce((previous, current) => previous + current.count, 0)}</div>
                      <div className="profile__myOrders-text-left">
                        <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg" onClick={() => {
                          order.itemsInCart.map((el) => dispatch((addToCart(el))))
                          dispatch(addStatusToasts({ message: "Товары добавлены в корзину!", isComplete: true }))
                        }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.76205 1.66643L3.00674 9.75688C3.01579 9.82366 3.03474 9.8873 3.06205 9.94628C3.14427 10.1238 3.30229 10.2591 3.49457 10.3105C3.55331 10.3263 3.61487 10.3342 3.67784 10.3331H11.0007C11.2951 10.3331 11.5546 10.14 11.6392 9.858L13.6392 3.19133C13.6998 2.98948 13.6613 2.77089 13.5355 2.60181C13.4097 2.43274 13.2114 2.3331 13.0007 2.3331H3.21363L2.99437 0.907894C2.98616 0.848306 2.97007 0.791231 2.94719 0.737753C2.90566 0.640369 2.84207 0.556014 2.76351 0.489894C2.69063 0.428433 2.60439 0.382315 2.50976 0.356518C2.45021 0.340208 2.38772 0.332039 2.32378 0.333099H1.00065C0.632461 0.333099 0.333984 0.631576 0.333984 0.999766C0.333984 1.36796 0.632461 1.66643 1.00065 1.66643H1.76205ZM4.23928 8.99977L3.41876 3.66643H12.1046L10.5046 8.99977H4.23928Z" fill="#FF6600" />
                            <path d="M5.66732 12.3331C5.66732 13.0695 5.07036 13.6664 4.33398 13.6664C3.5976 13.6664 3.00065 13.0695 3.00065 12.3331C3.00065 11.5967 3.5976 10.9998 4.33398 10.9998C5.07036 10.9998 5.66732 11.5967 5.66732 12.3331Z" fill="#FF6600" />
                            <path d="M11.6673 12.3331C11.6673 13.0695 11.0704 13.6664 10.334 13.6664C9.5976 13.6664 9.00065 13.0695 9.00065 12.3331C9.00065 11.5967 9.5976 10.9998 10.334 10.9998C11.0704 10.9998 11.6673 11.5967 11.6673 12.3331Z" fill="#FF6600" />
                          </svg>
                        </div>
                        <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg">
                          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.666992 1.66634C0.666992 0.929962 1.26395 0.333008 2.00033 0.333008H7.33366C7.51047 0.333008 7.68004 0.403246 7.80506 0.52827L11.1384 3.8616C11.2634 3.98663 11.3337 4.1562 11.3337 4.33301V12.333C11.3337 13.0694 10.7367 13.6663 10.0003 13.6663H2.00033C1.26395 13.6663 0.666992 13.0694 0.666992 12.333V1.66634ZM9.72418 4.33301L7.33366 1.94248V4.33301H9.72418ZM6.00033 1.66634L2.00033 1.66634V12.333H10.0003V5.66634H6.66699C6.2988 5.66634 6.00033 5.36786 6.00033 4.99967V1.66634ZM3.33366 7.66634C3.33366 7.29815 3.63214 6.99967 4.00033 6.99967H8.00033C8.36852 6.99967 8.66699 7.29815 8.66699 7.66634C8.66699 8.03453 8.36852 8.33301 8.00033 8.33301H4.00033C3.63214 8.33301 3.33366 8.03453 3.33366 7.66634ZM3.33366 10.333C3.33366 9.96482 3.63214 9.66634 4.00033 9.66634H8.00033C8.36852 9.66634 8.66699 9.96482 8.66699 10.333C8.66699 10.7012 8.36852 10.9997 8.00033 10.9997H4.00033C3.63214 10.9997 3.33366 10.7012 3.33366 10.333Z" fill="#FF6600"></path></svg>
                        </div>
                        <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg" onClick={() => setActive({ condition: true, itemIdx: idx })}>
                          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.00065 4.99967C9.00065 6.10424 8.10522 6.99967 7.00065 6.99967C5.89608 6.99967 5.00065 6.10424 5.00065 4.99967C5.00065 3.89511 5.89608 2.99967 7.00065 2.99967C8.10522 2.99967 9.00065 3.89511 9.00065 4.99967Z" fill="#FF6600" />
                            <path d="M13.5969 4.70153C12.1581 1.82391 9.60274 0.333008 7.00065 0.333008C4.39857 0.333008 1.84318 1.82391 0.404366 4.70153C0.310524 4.88922 0.310524 5.11013 0.404366 5.29782C1.84318 8.17544 4.39857 9.66634 7.00065 9.66634C9.60274 9.66634 12.1581 8.17544 13.5969 5.29782C13.6908 5.11013 13.6908 4.88922 13.5969 4.70153ZM7.00065 8.33301C5.02146 8.33301 2.99935 7.25249 1.75376 4.99967C2.99935 2.74686 5.02146 1.66634 7.00065 1.66634C8.97984 1.66634 11.0019 2.74686 12.2475 4.99967C11.0019 7.25249 8.97984 8.33301 7.00065 8.33301Z" fill="#FF6600" />
                          </svg>
                        </div>
                      </div>
                    </div>)
                  )
              }
            </div >
          </div >
          :
          <div className='profile__parent'>
            <div className="profile__myOrders">
              <p className="prompt" style={{ padding: 20 }}>Вы не оформляли заказы!</p>
            </div>
          </div>
      }
    </>
  )

}

export default MyOrders