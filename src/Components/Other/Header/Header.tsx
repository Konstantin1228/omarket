import React, { ChangeEvent, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { setStateProps } from "../../../hooks/MainLayout";
import { CarrotIcon, CoffeIcon, FrozenIcon, GroceryIcon, HomeIcon, MilkIcon, BonusIcon, ProfileIcon, CartIcon } from "./HeaderIcons/index";
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./header.scss"
export const linkSettings = [
  { path: "drink", text: "Напитки" },
  { path: "milkProducts", text: "Молочные продукты" },
  { path: "grocery", text: "Бакалея" },
  { path: "NONE", text: "Гастрономия" },
  { path: "frozen", text: "Замороженная продукция" },
  { path: "NONE", text: "Кондитерские изделия" },
  { path: "natural", text: "Овощи и фрукты " },
  { path: "NONE", text: "Бытовая химия" },
  { path: "home", text: "Все для дома" },
  { path: "NONE", text: "Товары для животных" },
]
const Header: React.FC<setStateProps> = ({ setSearchValue }) => {
  const navigate = useNavigate()
  const location = useLocation().pathname
  const [dropDown, setDropDown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null)

  const debounced = useDebouncedCallback((e) => {
    setSearchValue(e.nativeEvent.target.value)
    if (location !== "/home") navigate("/home")
  }, 500);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <header className="header">
      <div className="header__top">
        <ul className="header__top-left">
          <li className="header__top-left-stock ">Акции</li>
          <li className="header__top-left-sets ">Сеты</li>
          <li className="header__top-left-item ">Новости</li>
          <li className="header__top-left-item ">Доставка</li>
          <li className="header__top-left-item ">Условия</li>
        </ul>
        <div className="header__top-right">
          <span>Москва</span>
          <ExpandMoreIcon />
        </div>
      </div>
      {isMobile ?
        <div className="header__center">
          <div className="header__center-left">
            <Link to="/home">
              <img
                className="header__center-img "
                src={require("../images/logo.jpg")}
                alt="Логотип компании"
              />
            </Link>
            <div className="header__center-element">
              <span>2600</span>
              <BonusIcon />
            </div>
          </div>
          <div className="header__center-right">
            <div className="header__center-right-burgerMenu">
              <span className="burgerLine"></span>
              <span className="burgerLine"></span>
              <span className="burgerLine"></span>
            </div>
            <div className="header-input">
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) => debounced(e)}
                ref={inputRef}
                type="text"
                className="header-input"
                placeholder="Какой товар вы ищете?"
              />
              <button>
                <svg
                  onClick={() => inputRef.current?.focus()}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 9.84871 15.3729 11.551 14.3199 12.9056L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12.9056 14.3199C11.551 15.3729 9.84871 16 8 16C3.58172 16 0 12.4183 0 8Z"
                    fill="#FF6600"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        :
        <div className="header__center">
          <div className="header__center-left">
            <Link to="/home">
              <img
                className="header__center-img "
                src={require("../images/logo.jpg")}
                alt="Логотип компании"
              />
            </Link>
            <div className="header-input">
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) => debounced(e)}
                ref={inputRef}
                type="text"
                className="header__center-input-input"
                placeholder="Какой товар вы ищете?"
              />
              <button>
                <svg
                  onClick={() => inputRef.current?.focus()}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 9.84871 15.3729 11.551 14.3199 12.9056L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12.9056 14.3199C11.551 15.3729 9.84871 16 8 16C3.58172 16 0 12.4183 0 8Z"
                    fill="#FF6600"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="header__center-right">
            <Link to="/profile" className="header__center-element">
              <span className="header__center-profile-text">Профиль</span>
              <ProfileIcon />
            </Link>
            <div className="header__center-element">
              <span>2600</span>
              <BonusIcon />
            </div>
            <Link to="/cart" className="header__center-element" >
              <CartIcon />
            </Link>
          </div>
        </div>
      }
      <ul className="header__bottom">
        <Link onClick={() => setDropDown(false)} to={"/catalog/all"} className={dropDown ? "header__bottom-component active" : "header__bottom-component"}
          onMouseLeave={() => setDropDown(false)} onMouseEnter={() => setDropDown(true)}>
          <MenuIcon sx={{ fontSize: "1rem" }} />
          <span>Все категории</span>
          {dropDown &&
            <ul >
              {linkSettings.map(({ path, text }, idx) =>
                <Link key={idx} onClick={() => setDropDown(false)} to={`/catalog/${path}`}>{text}</Link>)
              }
            </ul>
          }
        </Link >
        <Link to={"/catalog/drink"} className="header__bottom-component">
          <CoffeIcon />
          <span>Напитки</span>
        </Link>
        <Link to={"/catalog/grocery"} className="header__bottom-component">
          <GroceryIcon />
          <span>Бакалея</span>
        </Link>
        <Link to={"/catalog/frozen"} className="header__bottom-component">
          <FrozenIcon />
          <span>Замороженная продукция</span>
        </Link>
        <Link to={"/catalog/natural"} className="header__bottom-component">
          <CarrotIcon />
          <span>Овощи и фрукты</span>
        </Link>
        <Link to={"/catalog/home"} className="header__bottom-component">
          <HomeIcon />
          <span>Все для дома</span>
        </Link>
        <Link to={"/catalog/milkProducts"} className="header__bottom-component">
          <MilkIcon />
          <span>Молочные продукты</span>
        </Link>
      </ul>
    </header >
  );
};

export default Header;
