import "./scss/index.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Cart from "./Components/Cart/Cart";
import Auth from "./Components/Auth/Auth";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
