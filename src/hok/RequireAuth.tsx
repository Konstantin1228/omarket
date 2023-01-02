import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Login from '../Components/Auth/Login'
import { useAppSelector } from '../hooks/hooks'
const RequireAuth: FC = () => {
    const { isUserAuth } = useAppSelector(state => state.userSlice)
    return isUserAuth ? <Outlet /> : <Login />
}

export default RequireAuth


