import React, { useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; import "./toast.scss"
import CancelIcon from '@mui/icons-material/Cancel';
import { useTransition, animated } from '@react-spring/web'
import { useAppDispatch } from '../../../../hooks/hooks';
import { closeToast } from '../../../../redux/toasts/slice';
interface ToastStatus {
  message: string
  isComplete: boolean
  id: number
}
const ToastStatus: React.FC<ToastStatus> = ({ message, isComplete, id }) => {
  const dispatch = useAppDispatch()
  const deleteItem = () => dispatch(closeToast(id))
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    progress !== 100 ? setTimeout(() => setProgress((prev) => prev + 1), 40) : setIsVisible(false)
  }, [progress]);

  const transition = useTransition(isVisible, {
    from: { transform: `translateX(100%)`, opacity: 0, },
    enter: { transform: `translateX(0%)`, opacity: 1, },
    leave: { opacity: 0 },
    onDestroyed: () => deleteItem(),
    config: { duration: 300 }
  })

  return (
    <>
      {transition((style, isVisible) =>
        <>
          {isVisible && (
            <animated.div style={style} className={isComplete ? "toast__wrapper-status" : "toast__wrapper-status-error"}>
              <div className="toast__wrapper-status-top">
                <div className="toast__wrapper-status-top-right">
                  {isComplete ? <CheckCircleOutlineIcon color={"success"} fontSize={"large"} /> : <CancelIcon color={"error"} fontSize={"large"} />}
                  <h1>{message}</h1>
                </div>
                <button className="toast__wrapper-status-top-left" onClick={() => dispatch(closeToast(id))}><ClearIcon /></button>
              </div>
            </animated.div>
          )}
        </>
      )}
    </>
  )
}

export default ToastStatus