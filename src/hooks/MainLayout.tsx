import React from 'react'
import Header from '../Components/Other/Header'
import Footer from '../Components/Other/Footer'
import { Outlet } from 'react-router-dom'
export interface setSearchValue {
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}
const MainLayout: React.FC<setSearchValue> = ({ setSearchValue }) => {

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