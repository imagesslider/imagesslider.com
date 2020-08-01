import React, { FC } from "react";
import { ImageType } from "../../../Store/Store";

export type VideoType = {
  onPlay?: (event: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
  onEnded?: (event: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
};

const Video: FC<ImageType & VideoType> = ({ srcVideo, onPlay, onEnded }) => {
  return (
    <video
      controls
      onPlay={onPlay}
      onEnded={onEnded}
      style={{
        maxHeight: "100%",
        maxWidth: "100%",
        zIndex: 3,
        border: "none",
        outline: "none",
      }}
    >
      <source src={srcVideo} type="video/mp4" />
      <source src={srcVideo} type="video/webm" />
      <source src={srcVideo} type="video/ogg" />
      <source src={srcVideo} type="video/avi" />
      <p>Sorry, your browser doesn't support embedded videos.</p>
    </video>
  );
};

export default Video;
