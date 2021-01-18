import React, { FC } from "react";
import "./DefaultVideos.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchAction } from "../../Actions/actionsSearch";
import { setVideosPXAction } from "../../Actions/actionsPX";
import DefaultVideo from "../DefaultVideo/DefaultVideo";
import Search from "../UI/Search/Search";
import { SearchType, AppType, SpeechRecognitionType } from "../../Type/Type";
import { useHistory, Redirect } from "react-router-dom";
import NoContent from "../../components/UI/NoContent/NoContent";
import Travel from "../../ImagesPX/Travel.jpg";
import Transport from "../../ImagesPX/Transport.jpg";
import Sports from "../../ImagesPX/Sports.jpg";
import Science from "../../ImagesPX/Science.jpg";
import Places from "../../ImagesPX/Places.jpg";
import People from "../../ImagesPX/People.jpg";
import Nature from "../../ImagesPX/Nature.jpg";
import Music from "../../ImagesPX/Music.jpg";
import Industry from "../../ImagesPX/Industry.jpg";
import Health from "../../ImagesPX/Health.jpg";
import Food from "../../ImagesPX/Food.jpg";
import Feelings from "../../ImagesPX/Feelings.jpg";
import Education from "../../ImagesPX/Education.jpg";
import Computer from "../../ImagesPX/Computer.jpg";
import Business from "../../ImagesPX/Business.jpg";
import Fashion from "../../ImagesPX/Fashion.jpg";
import Backgrounds from "../../ImagesPX/Backgrounds.jpg";
import Architecture from "../../ImagesPX/Architecture.jpg";
import Animals from "../../ImagesPX/Animals.jpg";
import All from "../../ImagesPX/All.jpg";

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

  //actions redux
  const dispatch = useDispatch();

  //react router dom
  const history = useHistory();

  //onSubmitSearch
  const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!!search && !isListening) {
      dispatch(setVideosPXAction(search));
    }
  };

  return (
    <>
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
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("all")) &&
                history.push("/images");
            }}
            src={All}
            title="All"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Animals")) &&
                history.push("/images");
            }}
            src={Animals}
            title="Animals"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Architecture")) &&
                history.push("/images");
            }}
            src={Architecture}
            title="Architecture"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Backgrounds")) &&
                history.push("/images");
            }}
            src={Backgrounds}
            title="Backgrounds"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Fashion")) &&
                history.push("/images");
            }}
            src={Fashion}
            title="Fashion"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Business")) &&
                history.push("/images");
            }}
            src={Business}
            title="Business"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Computer")) &&
                history.push("/images");
            }}
            src={Computer}
            title="Computer"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Education")) &&
                history.push("/images");
            }}
            src={Education}
            title="Education"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Feelings")) &&
                history.push("/images");
            }}
            src={Feelings}
            title="Feelings"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Food")) &&
                history.push("/images");
            }}
            src={Food}
            title="Food"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Health")) &&
                history.push("/images");
            }}
            src={Health}
            title="Health"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Industry")) &&
                history.push("/images");
            }}
            src={Industry}
            title="Industry"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Music")) &&
                history.push("/images");
            }}
            src={Music}
            title="Music"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Nature")) &&
                history.push("/images");
            }}
            src={Nature}
            title="Nature"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("People")) &&
                history.push("/images");
            }}
            src={People}
            title="People"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Places")) &&
                history.push("/images");
            }}
            src={Places}
            title="Places"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Science")) &&
                history.push("/images");
            }}
            src={Science}
            title="Science"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Sports")) &&
                history.push("/images");
            }}
            src={Sports}
            title="Sports"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Transportation")) &&
                history.push("/images");
            }}
            src={Transport}
            title="Transportation"
          />
          <DefaultVideo
            onClick={() => {
              !isListening &&
                dispatch(setVideosPXAction("Travel")) &&
                history.push("/images");
            }}
            src={Travel}
            title="Travel"
          />
        </div>
      </div>
    </>
  );
};

export default DefaultVideos;
