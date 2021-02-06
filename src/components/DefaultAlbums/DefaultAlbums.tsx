import React, { FC, useEffect } from "react";
import "./DefaultAlbums.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchAction } from "../../Actions/actionsSearch";
import DefaultAlbum from "../DefaultAlbum/DefaultAlbum";
import Search from "../UI/Search/Search";
import { SearchType, AppType, SpeechRecognitionType } from "../../Type/Type";
import { useHistory, Redirect } from "react-router-dom";
import NoContent from "../../components/UI/NoContent/NoContent";
import {
  setAlbumsFirebaseAction,
  setImagesFirebaseAction,
} from "../../Actions/actionsFirebase";
import Spinner from "../UI/Spinner/Spinner";

const DefaultAlbums: FC = () => {
  //state redux
  const selectSearch = (state: SearchType) => state.search.search;
  const search = useSelector(selectSearch);
  const selectNoContent = (state: AppType) => state.appState.noContent;
  const noContent = useSelector(selectNoContent);
  const selectIsListening = (state: SpeechRecognitionType) =>
    state.speechRecognition.isListening;
  const isListening = useSelector(selectIsListening);
  const selectRedirect = (state: AppType) => state.appState.redirect;
  const redirect = useSelector(selectRedirect);
  const selectImages = (state: AppType) => state.appState.images;
  const images = useSelector(selectImages);
  const selectDefaultAlbums = (state: AppType) => state.appState.defaultAlbums;
  const defaultAlbums = useSelector(selectDefaultAlbums);
  const selectIsLoading = (state: AppType) => state.appState.isLoading;
  const isLoading = useSelector(selectIsLoading);

  //actions redux
  const dispatch = useDispatch();

  //react router dom
  const history = useHistory();

  //onSubmitSearch
  const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!!search && !isListening) {
      dispatch(setImagesFirebaseAction(search.toLowerCase()));
    }
  };

  //useEffect
  useEffect(() => {
    dispatch(setAlbumsFirebaseAction());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Spinner />}
      {redirect && !!images && !isListening ? <Redirect to="/images" /> : null}
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
          {defaultAlbums.map((defaultAlbum) => {
            return (
              <DefaultAlbum
                key={defaultAlbum.id}
                onClick={() => {
                  !isListening &&
                    dispatch(setImagesFirebaseAction(defaultAlbum.id)) &&
                    history.push("/images");
                }}
                src={defaultAlbum.images ? defaultAlbum.images[0].url : ""}
                title={defaultAlbum.name}
                imagesLenght={defaultAlbum.images}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DefaultAlbums;
