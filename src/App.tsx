import Header from "./Components/Header";
import Chapter from "./Components/Catalog/Chapter";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import "./scss/index.scss";
function App() {
  return (
    <div>
      <Header />
      <div className="slider"></div>
      <Home />
      <Footer />
    </div>
  );
}

export default App;
