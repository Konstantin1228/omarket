import axios from "axios";
import React, { useEffect, useState } from "react";
import Item from "./Catalog/Catalog_item";
import { itemType } from "./Catalog/Catalog_item";
import Chapter, { GoodsType } from "./Catalog/Chapter";
import Skeleton from "./CustomComponents/Skeleton";
interface Home {
  searchValue: string
}
const Home: React.FC<Home> = ({ searchValue }) => {
  const [searchedProducts, setSearchedProducts] = useState<GoodsType[]>()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getSearchedValue = async () => {
      setLoading(true)
      // https://636a3f3db10125b78fd50f7d.mockapi.io/goods/goods/?title=
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
          searchedProducts?.length !== 0 && searchedProducts ?
            <div className="chapter-bottom">
              {searchedProducts.map((obj: itemType) =>
                <Item key={obj.id + obj.title}  {...obj} />
              )}
            </div>
            :
            < p className="prompt" style={{ minHeight: 430, fontSize: 30 }}>По вашим параметрам не найдено товаров!</p>
        :
        <>
          {/* databaseName */}
          < Chapter title={"Новинки"} titleTheme={"green"} tagSorting={"Новинка"} />
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
