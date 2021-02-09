import React, { FC, useState } from "react";
import "../Pagination/Pagination.css";
import { useDispatch, useSelector } from "react-redux";
import { SearchType, AppType } from "../../../Type/Type";

const Pagination: FC = () => {
  //state
  const [indexPage, setIndexPage] = useState<number>(1);
  const [lastPage] = useState<number>(999);
  //state redux
  const selectProviderSearch = (state: SearchType) =>
    state.search.providerSearch;
  const providerSearch = useSelector(selectProviderSearch);
  const selectQuery = (state: SearchType) => state.search.query;
  const query = useSelector(selectQuery);
  const selectTotalPagesCollections = (state: AppType) =>
    state.appState.totalPagesCollections;
  const totalPagesCollections = useSelector(selectTotalPagesCollections);

  //actions redux
  const dispatch = useDispatch();

  //onClickPrev
  const onClickPrev = () => {
    setIndexPage(indexPage - 1);
  };

  //onClickNext
  const onClickNext = () => {
    if (
      indexPage ===
      (totalPagesCollections !== 0 ? totalPagesCollections : lastPage)
    ) {
      setIndexPage(1);
    } else {
      setIndexPage(indexPage + 1);
    }
  };

  return (
    <div className="pagination_wrapper">
      <button
        onClick={onClickPrev}
        className={
          indexPage === 1
            ? "pagination_button_prev isDisabled"
            : "pagination_button_prev"
        }
      >
        {" "}
        <i className="fas fa-chevron-left fa-2x"></i>
      </button>
      <p className="pagination_page_container">
        <span className="pagination_indexPage">{indexPage}</span> ...{" "}
        {totalPagesCollections !== 0 ? totalPagesCollections : lastPage}
      </p>
      <button onClick={onClickNext} className="pagination_button_next">
        {" "}
        <i className="fas fa-chevron-right fa-2x"></i>
      </button>
    </div>
  );
};

export default Pagination;
