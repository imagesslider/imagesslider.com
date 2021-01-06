import React, { FC } from "react";
import "./DefaultAlbum.css";
import { useSelector } from "react-redux";
import { SpeechRecognitionType } from "../../Type/Type";

export type DefaultAlbumType = {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  src: string;
  title?: string;
  width?: string;
  height?: string;
};

const DefaultAlbum: FC<DefaultAlbumType> = ({
  onClick,
  src,
  title,
  width,
  height,
}) => {
  //state redux
  const selectIsListening = (state: SpeechRecognitionType) =>
    state.speechRecognition.isListening;
  const isListening = useSelector(selectIsListening);

  return (
    <div
      className="default_album"
      onClick={onClick}
      title={`${
        isListening ? "Click the Microphone to turn it off and click image" : ""
      }`}
    >
      <img
        src={src}
        alt={src}
        className="default_album_img"
        width={width}
        height={height}
      />
      <h2 className="default_album_title">{title}</h2>
    </div>
  );
};

export default DefaultAlbum;
