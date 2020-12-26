import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selelctedAlbumId } from "../../Actions/actionsApp";
import { setImagesActionGoogle } from "../../Actions/actionsGoogle";
import { useHistory } from "react-router-dom";
import { AlbumType } from "../../Store/Store";
import "../Album/Album.css";
import { AppType, SpeechRecognitionType } from "../../Type/Type";

export type AlbumProps = {
  onClickAlbum?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Album: FC<AlbumType & AlbumProps> = ({
  id,
  title,
  mediaItemsCount,
  coverPhotoBaseUrl,
}) => {
  //state redux
  const selectProvider = (state: AppType) => state.appState.login.provider;
  const provider = useSelector(selectProvider);
  const selectToken = (state: AppType) => state.appState.login.token;
  const token = useSelector(selectToken);
  const selectNextPageToken = (state: AppType) => state.appState.nextPageToken;
  const nextPageToken = useSelector(selectNextPageToken);
  const selectIsListening = (state: SpeechRecognitionType) =>
    state.speechRecognition.isListening;
  const isListening = useSelector(selectIsListening);

  //actions redux
  const dispatch = useDispatch();

  //react-router-dom
  const history = useHistory();

  //on click album
  const onClickAlbum = (id: string) => {
    if (!isListening) {
      dispatch(selelctedAlbumId(id as string));
      if (provider === "google") {
        dispatch(setImagesActionGoogle(id, token, nextPageToken));
      }
      history.push("/images");
    }
  };

  return (
    <div
      key={id}
      onClick={() => onClickAlbum(id as string)}
      className="album_wrapper"
      title={`${
        isListening ? "Click the Microphone to turn it off and click album" : ""
      }`}
    >
      <img
        src={coverPhotoBaseUrl}
        alt={coverPhotoBaseUrl}
        className="album_image"
      />
      <p className="album_title">{title}</p>
      <p className="album_mediaItemsCount">
        {mediaItemsCount !== 1
          ? `${mediaItemsCount} items`
          : `${mediaItemsCount} item`}
      </p>
    </div>
  );
};

export default Album;
