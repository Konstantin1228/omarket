import { getDocs, query, collection, where, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../config/firebase'
import { useAppDispatch } from '../../../../hooks/hooks'
import { addToCart } from '../../../../redux/cart/slice'
import { addStatusToasts } from '../../../../redux/toasts/slice'
import { SearchAdressOrCard } from '../../FunctionsAndTypes/types'
import ModalWindowCheck from '../ModalWindowCheck/ModalWindowCheck'
import { Orders } from '../../FunctionsAndTypes/types'
import { CartIconSmall, EyeIcon, ListIcon } from '../../Icons'
import Loader from '../../../Other/Loader/Loader'
const MyOrders: React.FC<SearchAdressOrCard> = ({ setFilterOrders, filterOrders }) => {
  const dispatch = useAppDispatch()
  const [active, setActive] = useState({ condition: false, itemIdx: 0 })
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Orders[]>()
  const [filteredOrders, setFilteredOrders] = useState<Orders[]>()

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
    const array: Orders[] = []
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
        <Loader />
        :
        orders !== undefined ?
          <div className="profile__myOrders">
            < ModalWindowCheck active={active} setActive={setActive} orderDetails={orders[active.itemIdx]} />
            {!((filterOrders.adresses.reduce((current, previous) => current + Number(previous.isActive), 0) !== 0 ||
              filterOrders.payment.reduce((current, previous) => current + Number(previous.isActive), 0) !== 0) && filteredOrders && filteredOrders.length === 0) ?
              <div className="profile__myOrders-element">
                <span className="profile__myOrders-text bold">Номер</span>
                <span className="profile__myOrders-text bold">Сумма</span>
                <span className="profile__myOrders-text bold">Дата и время</span>
                <span className="profile__myOrders-text bold">Статус</span>
                <span className="profile__myOrders-text bold">Адрес</span>
                <span className="profile__myOrders-text bold">Комментарий</span>
                <span className="profile__myOrders-text bold">Всего товаров</span>
                <span className="profile__myOrders-text bold"></span>
              </div>
              :
              <span className="prompt" style={{ padding: "0.6rem" }}>Не найдено заказов по указанным фильтрам!</span>
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
                        <CartIconSmall />
                      </div>
                      <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg"><ListIcon /></div>
                      <div className="cart__inner-notEmpty-left-ordering-orderNumber-right-svg" onClick={() => setActive({ condition: true, itemIdx: idx })}>
                        <EyeIcon />
                      </div>
                    </div>
                  </div>)
                )
            }
          </div >
          :
          <div className="profile__myOrders">
            <p className="prompt" style={{ padding: 20 }}>Вы не оформляли заказы!</p>
          </div>
      }
    </>
  )
}

export default MyOrders