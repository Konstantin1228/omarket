import React, { useEffect, useState } from 'react'
import Header from '../Components/Other/Header/Header'
import Footer from '../Components/Other/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { getDocs, query, collection, where, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAppDispatch, useAppSelector } from './hooks'
import { setCanEditProfile, setIsUserAuth } from '../redux/user/slice'
import Toasts from '../Components/CustomComponents/Toasts/Toasts'
import CatalogItemBig from '../Components/Home/CatalogItemBig'
import { useMediaQuery } from 'react-responsive'
import FooterMobile from '../Components/Other/Footer/FooterMobile'
export interface setStateProps {
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}
const MainLayout: React.FC<setStateProps> = ({ setSearchValue }) => {
    const dispatch = useAppDispatch()
    const { isActivePopup } = useAppSelector(state => state.cartSlice)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    useEffect(() => {
        const getData = async () => {
            try {
                const q = await (getDocs(query(collection(db, "users"), where("telephone", '==', localStorage.getItem("telephone")))))
                if (q.docs.length >= 1) {
                    const userRef = doc(db, 'users', q.docs[0].id);
                    const docSnap = await getDoc(userRef)
                    dispatch(setIsUserAuth(true))
                    dispatch(setCanEditProfile(docSnap.data()?.profileInformation?.otherInformation?.deliviryAdresses))
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
                <Toasts />
                <Header setSearchValue={setSearchValue} />
                {isActivePopup && <CatalogItemBig />}
                <Outlet />
                {isMobile && <FooterMobile />}
            </div>
            {!isMobile && <Footer />}
            {/* {isMobile ? <FooterMobile /> : <Footer />} */}
        </>

    )
}

export default MainLayout