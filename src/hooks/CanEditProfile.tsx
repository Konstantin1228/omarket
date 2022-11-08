import React, {  } from 'react'
import { Outlet, Route } from 'react-router-dom';
import ProfileIndex from '../Components/Profile/ProfileIndex';
import { useAppSelector } from './hooks';

const CanEditProfile = () => {
    const { canEditProfile } = useAppSelector((state) => state.userSlice)
    return canEditProfile ? <Outlet /> : <ProfileIndex />
}

export default CanEditProfile