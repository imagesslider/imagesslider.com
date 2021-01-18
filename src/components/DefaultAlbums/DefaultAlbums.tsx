import React, { FC } from "react";
import "./DefaultAlbums.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchAction } from "../../Actions/actionsSearch";
import { setImagesPXAction } from "../../Actions/actionsPX";
import DefaultAlbum from "../DefaultAlbum/DefaultAlbum";
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

  //actions redux
  const dispatch = useDispatch();

  //react router dom
  const history = useHistory();

  //onSubmitSearch
  const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!!search && !isListening) {
      dispatch(setImagesPXAction(search));
    }
  };

  return (
    <>
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
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("all")) &&
                history.push("/images");
            }}
            src={All}
            title="All"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Animals")) &&
                history.push("/images");
            }}
            src={Animals}
            title="Animals"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Architecture")) &&
                history.push("/images");
            }}
            src={Architecture}
            title="Architecture"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Backgrounds")) &&
                history.push("/images");
            }}
            src={Backgrounds}
            title="Backgrounds"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Fashion")) &&
                history.push("/images");
            }}
            src={Fashion}
            title="Fashion"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Business")) &&
                history.push("/images");
            }}
            src={Business}
            title="Business"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Computer")) &&
                history.push("/images");
            }}
            src={Computer}
            title="Computer"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Education")) &&
                history.push("/images");
            }}
            src={Education}
            title="Education"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Feelings")) &&
                history.push("/images");
            }}
            src={Feelings}
            title="Feelings"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Food")) &&
                history.push("/images");
            }}
            src={Food}
            title="Food"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Health")) &&
                history.push("/images");
            }}
            src={Health}
            title="Health"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Industry")) &&
                history.push("/images");
            }}
            src={Industry}
            title="Industry"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Music")) &&
                history.push("/images");
            }}
            src={Music}
            title="Music"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Nature")) &&
                history.push("/images");
            }}
            src={Nature}
            title="Nature"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("People")) &&
                history.push("/images");
            }}
            src={People}
            title="People"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Places")) &&
                history.push("/images");
            }}
            src={Places}
            title="Places"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Science")) &&
                history.push("/images");
            }}
            src={Science}
            title="Science"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Sports")) &&
                history.push("/images");
            }}
            src={Sports}
            title="Sports"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Transportation")) &&
                history.push("/images");
            }}
            src={Transport}
            title="Transportation"
          />
          <DefaultAlbum
            onClick={() => {
              !isListening &&
                dispatch(setImagesPXAction("Travel")) &&
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

export default DefaultAlbums;
