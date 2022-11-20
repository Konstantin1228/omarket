import React, { useState } from 'react'
import ToastItem from './ToastItems/ToastItem'
import { useAppSelector } from '../../../hooks/hooks';
import ToastStatus from './ToastItems/ToastStatus';
import "./ToastItems/toast.scss"

const Toasts = () => {
  const { toasts } = useAppSelector(state => state.toastSlice)
  return (
    <div className="toasts" >
      {
        toasts.map(({ title, id, typeOfUnit, weight, img, count, message, isComplete }) => (
          title && typeOfUnit && weight && img && count ?
            <ToastItem key={id} id={id} title={title} count={count} img={img} typeOfUnit={typeOfUnit} weight={weight} />
            : message && isComplete ? <ToastStatus key={id} message={message} isComplete={isComplete} id={id} /> : null
        ))
      }
    </div >
  )
}

export default Toasts  