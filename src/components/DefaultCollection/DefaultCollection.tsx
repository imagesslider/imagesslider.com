import React, { FC } from "react";
import "../DefaultCollection/DefaultCollection.css";
import { useDispatch, useSelector } from "react-redux";
import { DefaultCollectionType } from "../../Store/Store";
import { SearchType, SpeechRecognitionType } from "../../Type/Type";
import { setImagesActionUnsplashCollection } from "../../Actions/actionsUnsplash";
import { setTotalPagesAction } from "../../Actions/actionsApp";
import { setproviderSearchAction } from "../../Actions/actionsSearch";
import { useHistory } from "react-router-dom";

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
  const selectIsListening = (state: SpeechRecognitionType) =>
    state.speechRecognition.isListening;
  const isListening = useSelector(selectIsListening);

  //actions redux
  const dispatch = useDispatch();

  //react-router-dom
  const history = useHistory();

  //on click album
  const onClickDefaultCollection = (id: string) => {
    if (!isListening) {
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
      history.push("/images");
    }
  };

  return (
    <div
      className="defaultCollection_wrapper"
      key={id}
      onClick={() => onClickDefaultCollection(id as string)}
      title={`${
        isListening
          ? "Click the Microphone to turn it off and click collection"
          : ""
      }`}
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
  );
};

export default DefaultCollection;
