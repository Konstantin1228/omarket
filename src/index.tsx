import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Provider } from "react-redux";
import { store } from "./redux/store";
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <div className="app">
          <Header />
          <App />
        </div>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
}
