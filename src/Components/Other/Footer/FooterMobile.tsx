import React from 'react'
import { Badge } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/hooks'
import { HomeIcon, CartIcon, ProfileIcon } from '../Header/HeaderIcons'
import { CategoriesIcon, ScannerIcon } from './Icons'
const FooterMobile = () => {
    const { itemsInCart } = useAppSelector(state => state.cartSlice)
    const location = useLocation()
    return (
        <footer>
            <Link to={"/home"} className={location.pathname === "/home" ? "footer__component-active" : "footer__component"}>
                <HomeIcon />
                <span>Главная</span>
            </Link>
            <Link to={"/catalog/all"} className={location.pathname.includes("/catalog/") ? "footer__component-active" : "footer__component"}>
                <CategoriesIcon />
                <span>Категории</span>
            </Link>
            <div className={"footer__component"}>
                <ScannerIcon />
                <span>Узнать цену</span>
            </div>
            <Link to={"/cart"} className={location.pathname === "/cart" ? "footer__component-active" : "footer__component"}>
                <Badge badgeContent={itemsInCart.length} color="primary" max={99} anchorOrigin={{
                    horizontal: "left",
                    vertical: "top"
                }}>
                    <CartIcon />
                </Badge >
                <span>Корзина</span>
            </Link>
            <Link to={"/profile"} className={location.pathname === "/profile" ? "footer__component-active" : "footer__component"}>
                <ProfileIcon />
                <span>Профиль</span>
            </Link>
        </footer>
    )
}

export default FooterMobile