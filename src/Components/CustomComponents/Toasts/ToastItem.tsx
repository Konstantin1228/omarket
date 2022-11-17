import { LinearProgress } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/hooks'
import { closeToast } from '../../../redux/toasts/slice'
import { Item } from '../../../redux/toasts/types'
import { animated } from '@react-spring/web'
const ToastItem: FC<Item> = ({ title, img, id, typeOfUnit, weight }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const deleteItem = () => dispatch(closeToast(id))
  const [progress, setProgress] = useState(0);
  const [isAcitve, setIsActive] = useState(true)

  useEffect(() => {
    if (isAcitve) {
      setTimeout(() => {
        setProgress((prev) => prev + 1)
      }, 50);
      if (progress === 100) deleteItem()
    }
  }, [progress, isAcitve]);

  return (
    <div className='toast__wrapper' onMouseEnter={() => setIsActive(false)} onMouseLeave={() => setIsActive(true)}>
      <div className="toast__wrapper-top">
        <h1 className="toast__wrapper-top-title">Товар успешно добавлен в корзину!</h1>
        <button className="toast__wrapper-top-button" onClick={deleteItem}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="#0D0D0D" />
          </svg>
        </button>
      </div>
      <div className="toast__wrapper-bottom">
        <img className="toast__wrapper-bottom-img" src={img} />
        <div className="toast__wrapper-bottom-right">
          <h1 className="toast__wrapper-bottom-right-title">{`${title} ${weight}${typeOfUnit}.`}</h1>
          <button className='button-toCart' onClick={() => navigate("/cart")}>Перейти в корзину</button>
          {/* <button className='button-cancel' onClick={deleteItem} >Отмена</button> */}
        </div>
      </div>
      <LinearProgress variant="determinate" value={progress} color={"success"} sx={{ backgroundColor: "#FF6600" }} />
    </div>
  )
}

export default ToastItem

function useSpring(arg0: { opacity: number; from: { opacity: number } }) {
  throw new Error('Function not implemented.')
}
