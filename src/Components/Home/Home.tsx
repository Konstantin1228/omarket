import axios from "axios";
import React, { useEffect, useState } from "react";
import CatalogItem from "./CatalogItem/CatalogItem";
import Slider from "../Other/Slider/Slider";
import Skeleton from "../CustomComponents/Skeleton";
import Chapter from "./Chapter/Chapter";
import { useMediaQuery } from "react-responsive";
import { CatalogItemProps } from "./Types/types";
interface Home {
  searchValue: string
}
const Home: React.FC<Home> = ({ searchValue }) => {
  const [active, setActive] = useState(true)
  const [searchedProducts, setSearchedProducts] = useState<CatalogItemProps[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getSearchedValue = async () => {
      setLoading(true)
      await axios.get(`https://636a3f3db10125b78fd50f7d.mockapi.io/goods/goods/?title=${searchValue}`)
        .then((res) => {
          setSearchedProducts(res.data)
          setLoading(false)
        })
        .catch((error) => console.log(error))
    }
    getSearchedValue()
  }, [searchValue])

  return (
    <>
      {searchValue.length !== 0 ?
        loading ?
          [...new Array(4)].map((el, idx) => <Skeleton key={idx} />)
          :
          <div className="chapter-bottom">
            {
              searchedProducts?.length !== 0 && searchedProducts ?
                searchedProducts.map((obj: CatalogItemProps) =>
                  <CatalogItem key={obj.id + obj.title} {...obj} />
                )
                :
                < p className="prompt" style={{ minHeight: 430, fontSize: 30 }}>По вашим параметрам не найдено товаров!</p>
            }
          </div>
        :
        <>
          <Slider />
          <Chapter title={"Новинки"} titleTheme={"green"} tagSorting={"Новинка"} />
          {/* <Chapter title={"Для новогоднего стола"} titleTheme={"default"} /> */}
          <Chapter title={"Акция"} titleTheme={"red"} tagSorting={"discount"} />
          {/* <Chapter title={"Напитки к новогоднему столу"} titleTheme={"default"} /> */}
          <Chapter title={"Хиты продаж"} titleTheme={"orange"} tagSorting={"Хит"} />
        </>
      }
    </>
  );
};

export default Home;
