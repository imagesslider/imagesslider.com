import React, { FC } from "react";
import "./DefaultAlbums.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchAction } from "../../Actions/actionsSearch";
import { setImagesUnsplashAlbumsAction } from "../../Actions/actionsUnsplash";
import DefaultAlbum from "../DefaultAlbum/DefaultAlbum";
import Search from "../UI/Search/Search";
import { SearchType, AppType, SpeechRecognitionType } from "../../Type/Type";
import { Redirect } from "react-router-dom";
import NoContent from "../../components/UI/NoContent/NoContent";

const DefaultAlbums: FC = () => {
  //state redux
  const selectSearch = (state: SearchType) => state.search.search;
  const search = useSelector(selectSearch);
  const selectRedirect = (state: AppType) => state.appState.redirect;
  const redirect = useSelector(selectRedirect);
  const selectImages = (state: AppType) => state.appState.images;
  const images = useSelector(selectImages);
  const selectNoContent = (state: AppType) => state.appState.noContent;
  const noContent = useSelector(selectNoContent);
  const selectIsListening = (state: SpeechRecognitionType) =>
    state.speechRecognition.isListening;
  const isListening = useSelector(selectIsListening);

  //actions redux
  const dispatch = useDispatch();

  //onSubmitSearch
  const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!!search && !isListening) {
      dispatch(setImagesUnsplashAlbumsAction(search, 1));
    }
  };

  return (
    <>
      {redirect && !!images ? <Redirect to="/images" /> : null}
      <div className="default_albums_wrapper">
        <Search
          placeholder="Search albums"
          value={search}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setSearchAction(event.target.value))
          }
          onSubmit={onSubmitSearch}
          title={`${
            isListening
              ? "Click the Microphone to turn it off and click search"
              : "Search"
          }`}
        />
        {!!noContent && <NoContent title={noContent} />}
        <div className="default_albums">
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesUnsplashAlbumsAction("nature", 1));
            }}
            src="https://source.unsplash.com/250x250/?nature"
            title="Nature"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesUnsplashAlbumsAction("travel", 1));
            }}
            src="https://source.unsplash.com/250x250/?travel"
            title="Travel"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesUnsplashAlbumsAction("animals", 1));
            }}
            src="https://source.unsplash.com/250x250/?animals"
            title="Animals"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesUnsplashAlbumsAction("wallpapers", 1));
            }}
            src="https://source.unsplash.com/250x250/?wallpapers"
            title="Wallpapers"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesUnsplashAlbumsAction("architecture", 1));
            }}
            src="https://source.unsplash.com/250x250/?architecture"
            title="Architecture"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesUnsplashAlbumsAction("technology", 1));
            }}
            src="https://source.unsplash.com/250x250/?technology"
            title="Technology"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesUnsplashAlbumsAction("food-drink", 1));
            }}
            src="https://source.unsplash.com/250x250/?food-drink"
            title="Food"
          />
        </div>
      </div>
    </>
  );
};

export default DefaultAlbums;
