import axios from "axios";
import React, { useEffect, useState } from "react";
import Item, { itemType } from "./Catalog_item";
type ChapterProps = {
  title: string;
  titleTheme: string;
  databaseName?: string;
  tagSorting?: string;
};
const Chapter: React.FC<ChapterProps> = ({
  title,
  titleTheme,
  databaseName,
  tagSorting,
}) => {
  const [goods, setGoods] = useState([]);
  const [page, setPage] = useState(1);
  const totalPages = useState(0);
  useEffect(() => {
    if (databaseName) {
      const getRes = async () => {
        await axios
          .get(`http://localhost:3001/${databaseName}?_limit=4&_page=${page}`)
          .then((res) => {
            res.data.length !== 0 && setGoods(res.data);
          });
      };

      getRes();
    } else if (tagSorting) {
      const getRes = async () => {
        await axios
          .get(
            `http://localhost:3001/goods?_limit=4&_page=${page}&tags_like=${tagSorting}`
          )
          .then((res) => {
            res.data.length !== 0 && setGoods(res.data);
          });
      };
      getRes();
    }
  }, [page]);
  return (
    <div className="chapter">
      <div className="chapter-top">
        <div className={`chapter-title-${titleTheme}`}>{title}</div>
        <div className="chapter-top-pagination">
          <div className="chapter-top-pagination-svg" onClick={() => page !== 1 && setPage(page - 1)}>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.44635 0.251051C6.73924 0.585787 6.73924 1.1285 6.44635 1.46323L2.47668 6L6.44635 10.5368C6.73924 10.8715 6.73924 11.4142 6.44635 11.7489C6.15345 12.0837 5.67858 12.0837 5.38569 11.7489L0.885689 6.60609C0.592797 6.27136 0.592797 5.72864 0.885689 5.39391L5.38569 0.251051C5.67858 -0.0836839 6.15345 -0.0836838 6.44635 0.251051Z" fill="#FF6600" />
            </svg>
          </div>
          <div className="chapter-top-pagination-svg" onClick={() => goods.length > 3 && setPage(page + 1)}>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path d="M0.553654 11.7489C0.260761 11.4142 0.260761 10.8715 0.553654 10.5368L4.52332 6L0.553654 1.46323C0.260761 1.1285 0.260761 0.585785 0.553654 0.25105C0.846547 -0.0836859 1.32142 -0.0836859 1.61431 0.25105L6.11431 5.39391C6.4072 5.72864 6.4072 6.27136 6.11431 6.60609L1.61431 11.7489C1.32142 12.0837 0.846547 12.0837 0.553654 11.7489Z" fill="#FF6600" />
            </svg>
          </div>
        </div>
      </div>
      <div className="chapter-bottom">
        {tagSorting
          ? goods.map((obj: itemType) => <Item key={obj.id} {...obj} />)
          : goods.map((obj: itemType) => <Item key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Chapter;
