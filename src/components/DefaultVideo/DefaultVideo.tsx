import React, { FC } from "react";
import "./DefaultVideo.css";
import { useSelector } from "react-redux";
import { SpeechRecognitionType } from "../../Type/Type";

export type DefaultVideoType = {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  src: string;
  title?: string;
  width?: string;
  height?: string;
  imagesLenght?: string;
};

const DefaultVideo: FC<DefaultVideoType> = ({
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
      className="default_video"
      onClick={onClick}
      title={`${
        isListening ? "Click the Microphone to turn it off and click video" : ""
      }`}
    >
      <img
        src={src}
        alt={src}
        className="default_video_img"
        width={width}
        height={height}
      />
      <div className="default_video_content">
        <h2 className="default_video_title">{title}</h2>
        <h4 className="default_video_imagesLength">
          {imagesLenght?.length === 1
            ? `${imagesLenght?.length} Video`
            : `${imagesLenght?.length} Videos`}
        </h4>
      </div>
    </div>
  );
};

export default DefaultVideo;
