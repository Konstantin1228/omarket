import React, { useEffect, useState } from 'react'
import Header from '../Components/Other/Header/Header'
import Footer from '../Components/Other/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { getDocs, query, collection, where, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAppDispatch, useAppSelector } from './hooks'
import { setCanEditProfile, setIsUserAuth } from '../redux/user/slice'
import CatalogItemBig from '../Components/Catalog/CatalogItemBig'
export interface setSearchValue {
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}
const MainLayout: React.FC<setSearchValue> = ({ setSearchValue }) => {
    const dispatch = useAppDispatch()
    const { isActivePopup } = useAppSelector(state => state.cartSlice)
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
                {
                    isActivePopup &&
                    <CatalogItemBig />
                }
                <Outlet />
            </div>
            <Footer />
        </>

    )
}

export default MainLayout