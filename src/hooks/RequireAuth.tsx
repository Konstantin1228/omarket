import { collection, doc, Firestore, getDoc, getDocs, query, where } from 'firebase/firestore'
import React, { Children, ComponentType, FC, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Login from '../Components/Auth/Login'
import { db } from '../firebase'
import { setCanEditProfile } from '../redux/user/slice'
import { useAppDispatch, useAppSelector } from './hooks'
interface RequireAuth {
    isAuth: boolean
}
const RequireAuth: FC = () => {
    const dispatch = useAppDispatch()
    const [checkAuth, setCheckAuth] = useState(false)
    useEffect(() => {
        const getData = async () => {
            try {
                const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
                setCheckAuth(q.empty)
                const userRef = doc(db, 'users', q.docs[0].id);
                const docSnap = await getDoc(userRef)
                //@ts-ignore
                dispatch(setCanEditProfile(!!docSnap.data().profileInformation.otherInformation.deliviryAdresses))
                return q.empty
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, []);
    return !checkAuth ? <Outlet /> : <Login />
}

export default RequireAuth


