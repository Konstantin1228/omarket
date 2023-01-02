import React, { useEffect } from 'react'
import GetSmsCode from './Components/GetSmsCode'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { clearAuthLoginFields } from '../../redux/user/slice'
import NewPassword from './Components/NewPassword'
import RegIndex from './Components/RegIndex'
import PasswordRecovery from './Components/PasswordRecovery'
import LoginIndex from './Components/LoginIndex'
import "./auth.scss"
const Login = () => {
    const dispach = useAppDispatch()
    const { stage, type } = useAppSelector((state) => state.userSlice.authorizationOrLogin)

    useEffect(() => {
        dispach(clearAuthLoginFields())
    }, [])


    return (
        <>
            {stage === 0 && type === "" && <LoginIndex />}
            {stage === 1 && type === "recoveryPass" && <PasswordRecovery />}
            {stage === 1 && type === "registration" && <RegIndex />}
            {stage === 2 && <GetSmsCode />}
            {stage === 3 && <NewPassword />}
        </>
    )
}

export default Login