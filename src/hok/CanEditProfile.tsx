import React from 'react'
import { Outlet } from 'react-router-dom';
import RegistrationProfileIndex from '../Components/Profile/Components/RegProfile/RegistrationIndex';
import { useAppSelector } from '../hooks/hooks';

const CanEditProfile = () => {
    const { canEditProfile } = useAppSelector((state) => state.userSlice)
    return canEditProfile ? <Outlet /> : <RegistrationProfileIndex />
}

export default CanEditProfile