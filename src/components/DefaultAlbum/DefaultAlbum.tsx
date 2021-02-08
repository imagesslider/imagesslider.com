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
  imagesLenght?: string;
};

const DefaultAlbum: FC<DefaultAlbumType> = ({
  onClick,
  src,
  title,
  width,
  height,
  imagesLenght,
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
      <div className="default_album_content">
        <h2 className="default_album_title">{title}</h2>
        <h4 className="default_album_imagesLength">
          {imagesLenght?.length === 1
            ? `${imagesLenght?.length} Photo`
            : `${imagesLenght?.length} Photos`}
        </h4>
      </div>
    </div>
  );
};

export default DefaultAlbum;
