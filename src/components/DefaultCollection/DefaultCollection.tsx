import React, { FC } from "react";
import "../DefaultCollection/DefaultCollection.css";
import { useDispatch, useSelector } from "react-redux";
import { DefaultCollectionType } from "../../Store/Store";
import { SearchType } from "../../Type/Type";
import { setImagesActionUnsplashCollection } from "../../Actions/actionsUnsplash";
import { setTotalPagesAction } from "../../Actions/actionsApp";
import { setproviderSearchAction } from "../../Actions/actionsSearch";
import { Link } from "react-router-dom";

const DefaultCollection: FC<DefaultCollectionType> = ({
  id,
  title,
  coverPhoto,
  totalPhotos,
}) => {
  //state redux
  const selectProviderSearch = (state: SearchType) =>
    state.search.providerSearch;
  const providerSearch = useSelector(selectProviderSearch);

  //actions redux
  const dispatch = useDispatch();

  //on click album
  const onClickDefaultCollection = (id: string) => {
    if (!!totalPhotos) {
      dispatch(setTotalPagesAction(totalPhotos / 10));
    }
    if (providerSearch === "unsplash-collections") {
      dispatch(setproviderSearchAction("unsplash-collections"));
      dispatch(setImagesActionUnsplashCollection(id, 1, 10));
    }
    if (providerSearch === "unsplash-collections-search") {
      dispatch(setproviderSearchAction("unsplash-collections-search"));
      dispatch(setImagesActionUnsplashCollection(id, 1, 10));
    }
  };

  return (
    <Link to="/images" style={{ textDecoration: "none" }}>
      <div
        className="defaultCollection_wrapper"
        key={id}
        onClick={() => onClickDefaultCollection(id as string)}
      >
        <img
          src={coverPhoto}
          alt={coverPhoto}
          className="defaultCollection_image"
        />
        <p className="defaultCollection_title">{title}</p>
        <p className="defaultCollection_totalPhotos">
          {" "}
          {totalPhotos !== 1 ? `${totalPhotos} items` : `${totalPhotos} item`}
        </p>
      </div>
    </Link>
  );
};

export default DefaultCollection;
