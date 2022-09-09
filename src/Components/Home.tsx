import { useEffect, useState } from "react";
import Chapter from "./Catalog/Chapter";
import axios from "axios";
import Characteristics from "./Cart/Characteristics/Categories";

const Home = () => {
  useEffect(() => {
    const getRes = async () => {
      await axios.get(`http://localhost:3001/goods`).then((res) => {
        // res.data.length !== 0 && setGoods(res.data);
      });
    };
    getRes();
  }, []);
  return (
    <div>
      {/* databaseName */}
      <div>
        <Characteristics />
      </div>
      <Chapter title={"Новинки"} titleTheme={"green"} tagSorting={"Новинка"} />
      <Chapter title={"Для новогоднего стола"} titleTheme={"default"} />
      <Chapter title={"Акция"} titleTheme={"red"} tagSorting={"discount|bonus"} />
      <Chapter title={"Напитки к новогоднему столу"} titleTheme={"default"} />
      <Chapter title={"Хиты продаж"} titleTheme={"orange"} tagSorting={"Хит"} />
    </div>
  );
};

export default Home;
