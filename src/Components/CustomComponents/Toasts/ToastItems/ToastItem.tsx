import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../../hooks/hooks'
import { clearToasts, closeToast } from '../../../../redux/toasts/slice'
import { Item } from '../../../../redux/toasts/types'
import { LinearProgress } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import { useTransition, animated, Transition } from '@react-spring/web'
import { closePopup } from '../../../../redux/cart/slice'
const ToastItem: FC<Item> = ({ title, img, id, typeOfUnit, weight, count }) => {
  console.log(title, img, id, typeOfUnit, weight, count);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const deleteItem = () => dispatch(closeToast(id))
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [timer, setTimer] = useState(true)

  useEffect(() => {
    if (progress === 110) setIsVisible(false)
    if (timer) setTimeout(() => setProgress((prev) => prev + 1), 40);
  }, [progress, timer, isVisible]);


  const goToCart = () => {
    dispatch(closePopup())
    navigate("/cart")
    dispatch(clearToasts())
  }

  const transition = useTransition(isVisible, {
    from: { transform: `translateX(100%)`, opacity: 0, },
    enter: { transform: `translateX(0%)`, opacity: 1, },
    leave: { transform: `translateX(30%)`, opacity: 0 },
    onDestroyed: () => deleteItem(),
    config: { duration: 400 }
  })

  return (
    <>
      {/* <button className="toast__wrapper-top-button" onClick={() => setIsVisible(v => !v)}><ClearIcon /></button> */}
      {transition((style, isVisible) =>
        <>
          {isVisible ? (
            <animated.div style={{ ...style }} className='toast__wrapper' onMouseEnter={() => setTimer(false)} onMouseLeave={() => setTimer(true)} onClick={() => deleteItem()}>
              <div className="toast__wrapper-top">
                <h1 className="toast__wrapper-top-title">Товар успешно добавлен в корзину!</h1>
                <button className="toast__wrapper-top-button" onClick={() => setIsVisible(v => !v)}><ClearIcon /></button>
              </div>
              <div className="toast__wrapper-bottom">
                <img className="toast__wrapper-bottom-img" src={img} />
                <div className="toast__wrapper-bottom-right">
                  <h1 className="toast__wrapper-bottom-right-title">{`${title} ${weight}${typeOfUnit}. ${count}шт.`}</h1>
                  <button className='button-toCart' onClick={goToCart}>Перейти в корзину</button>
                </div>
              </div>
              <LinearProgress variant="determinate" value={progress} color={"success"} sx={{ backgroundColor: "#FF6600" }} />
            </animated.div>
          ) : ""}
        </>
      )}
    </>
  )
}

export default ToastItem
