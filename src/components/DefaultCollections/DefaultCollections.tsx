import React, { FC, useEffect } from "react";
import "../DefaultCollections/DefaultCollections.css";
import { useDispatch, useSelector } from "react-redux";
import Search from "../UI/Search/Search";
import { setSearchAction } from "../../Actions/actionsSearch";
import {
  setUnsplashCollectionsAction,
  searchUnsplashCollectionsAction,
} from "../../Actions/actionsUnsplash";
import { SearchType, AppType } from "../../Type/Type";
import NoContent from "../UI/NoContent/NoContent";
import DefaultCollection from "../DefaultCollection/DefaultCollection";
import Pagination from "../UI/Pagination/Pagination";
import Spinner from "../UI/Spinner/Spinner";

const DefaultCollections: FC = () => {
  //state redux
  const selectSearch = (state: SearchType) => state.search.search;
  const search = useSelector(selectSearch);
  const selectNoContent = (state: AppType) => state.appState.noContent;
  const noContent = useSelector(selectNoContent);
  const selectDefaultCollections = (state: AppType) =>
    state.appState.defaultCollections;
  const defaultCollections = useSelector(selectDefaultCollections);
  const selectIsLoading = (state: AppType) => state.appState.isLoading;
  const isLoading = useSelector(selectIsLoading);

  //actions redux
  const dispatch = useDispatch();

  //onSubmitSearch
  const onSubmitSearchCollections = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    dispatch(searchUnsplashCollectionsAction(search, 1));
  };

  useEffect(() => {
    dispatch(setUnsplashCollectionsAction(1));
  }, [dispatch]);

  return (
    <>
      {isLoading && <Spinner />}
      <div className="default_collections_wrapper">
        <Search
          placeholder="Search collections"
          value={search}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setSearchAction(event.target.value))
          }
          onSubmit={onSubmitSearchCollections}
        />
        {!!noContent && <NoContent title={noContent} />}
        <div className="defaultCollections_container">
          {!!defaultCollections &&
            defaultCollections.map((defaultCollection) => {
              return (
                <DefaultCollection
                  key={defaultCollection.id}
                  {...defaultCollection}
                />
              );
            })}
        </div>
        {defaultCollections.length !== 0 && <Pagination />}
      </div>
    </>
  );
};

export default DefaultCollections;
