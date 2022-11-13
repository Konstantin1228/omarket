import React, { useEffect, useState } from 'react'
import Header from '../Components/Other/Header/Header'
import Footer from '../Components/Other/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { getDocs, query, collection, where, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAppDispatch } from './hooks'
import { setCanEditProfile, setIsUserAuth } from '../redux/user/slice'
export interface setSearchValue {
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}
const MainLayout: React.FC<setSearchValue> = ({ setSearchValue }) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const getData = async () => {
            try {
                const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
                if (q.docs.length >= 1) {
                    const userRef = doc(db, 'users', q.docs[0].id);
                    const docSnap = await getDoc(userRef)
                    //@ts-ignore
                    dispatch(setIsUserAuth(true))
                    //@ts-ignore
                    dispatch(setCanEditProfile(!!docSnap.data().profileInformation.otherInformation.deliviryAdresses !== undefined))
                    console.log("helloF")
                    return q.empty
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, []);
    return (
        <>
            <div className="app">
                <Header setSearchValue={setSearchValue} />
                <Outlet />
            </div>
            <Footer />
        </>

    )
}

export default MainLayout