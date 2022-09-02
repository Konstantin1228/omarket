import "./scss/index.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Auth/Login/Login";
import Registration from "./Components/Auth/Registration/Registration";
import RegistarationCode from "./Components/Auth/Registration/RegistarationCode/RegistarationCode";
import CreateAPassword from "./Components/Auth/Registration/CreateAPassword/CreateAPassword";
import PasswordRecovery from "./Components/Auth/Login/PasswordRecovery/PasswordRecovery";

const App:React.FC=()=> {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/code" element={<RegistarationCode />} />
        <Route path="/create-a-password" element={<CreateAPassword />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
    </Routes>
  );
}

export default App;
