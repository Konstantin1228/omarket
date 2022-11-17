import React, { useState } from 'react'
import ToastItem from './ToastItem'
import "./toast.scss"
import { useAppSelector } from '../../../hooks/hooks';
import ToastStatus from './ToastStatus';

const Toasts = () => {
  const { toasts } = useAppSelector(state => state.toastSlice)
  return (
    <div className="toasts">
      {toasts.map((el) => (
        el.type === "ToastItem" ?
          <ToastItem key={el.id} {...el} />
          :
          <ToastStatus key={el.id} />
      ))}
    </div>
  )
}

export default Toasts  