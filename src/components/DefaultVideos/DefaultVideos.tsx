import React, { FC, useEffect } from "react";
import "./DefaultVideos.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchAction } from "../../Actions/actionsSearch";
import DefaultVideo from "../DefaultVideo/DefaultVideo";
import Search from "../UI/Search/Search";
import { SearchType, AppType, SpeechRecognitionType } from "../../Type/Type";
import { useHistory, Redirect } from "react-router-dom";
import NoContent from "../../components/UI/NoContent/NoContent";
import {
  setImagesVideosFirebaseAction,
  setVideosFirebaseAction,
} from "../../Actions/actionsFirebase";
import Spinner from "../UI/Spinner/Spinner";

const DefaultVideos: FC = () => {
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
  const selectDefaultVideos = (state: AppType) => state.appState.defaultVideos;
  const defaultVideos = useSelector(selectDefaultVideos);
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
      dispatch(setImagesVideosFirebaseAction(search.toLowerCase()));
    }
  };

  useEffect(() => {
    dispatch(setVideosFirebaseAction());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Spinner />}
      {redirect && !!images && !isListening ? <Redirect to="/images" /> : null}
      <div className="default_videos_wrapper">
        <Search
          placeholder="Search videos"
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
        <div className="default_videos">
          {defaultVideos.map((defaultVideo) => {
            return (
              <DefaultVideo
                key={defaultVideo.id}
                onClick={() => {
                  !isListening &&
                    dispatch(setImagesVideosFirebaseAction(defaultVideo.id)) &&
                    history.push("/images");
                }}
                src={defaultVideo.videoImage ? defaultVideo.videoImage : ""}
                title={defaultVideo.name}
                imagesLenght={defaultVideo.images}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DefaultVideos;
