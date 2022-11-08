import { useEffect, useState } from "react";
import Chapter from "./Catalog/Chapter";

const Home = () => {
  return (
    <>
      {/* databaseName */}
      <Chapter title={"Новинки"} titleTheme={"green"} tagSorting={"Новинка"} />
      {/* <Chapter title={"Для новогоднего стола"} titleTheme={"default"} /> */}
      <Chapter title={"Акция"} titleTheme={"red"} tagSorting={"discount"} />
      {/* <Chapter title={"Напитки к новогоднему столу"} titleTheme={"default"} /> */}
      <Chapter title={"Хиты продаж"} titleTheme={"orange"} tagSorting={"Хит"} />
    </>
  );
};

export default Home;
