import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MyAdresses, MyBankCards, MyPatterns, MyOrders, ProfileIndex } from "./Components/Profile/ProfileIndex"
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import RequireAuth from "./hooks/RequireAuth";
import CanEditProfile from "./hooks/CanEditProfile";
import MainLayout from "./hooks/MainLayout";
import Catalog from "./Components/Catalog/Catalog";
import "./scss/index.scss";
const App: React.FC = () => {
  const [searchValue, setSearchValue] = useState("")
  return (
    <Routes>
      <Route element={<MainLayout setSearchValue={setSearchValue} />}>
        <Route path="/home" element={<Home searchValue={searchValue} />} />
        <Route path="/catalog/:sortTag" element={<Catalog />} />
        <Route element={<RequireAuth />}>
          <Route path="/cart" element={<Cart />} />
          <Route element={<CanEditProfile />}>
            <Route path="/profile" element={<ProfileIndex />} >
              {/* @ts-ignore */}
              <Route path="myOrders" element={<MyOrders />} />
              <Route path="myPatterns" element={<MyPatterns />} />
              <Route path="myAdress" element={<MyAdresses />} />
              <Route path="myBankCards" element={<MyBankCards />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={"/home"} replace />} />
    </Routes >
  );
}

export default App;
