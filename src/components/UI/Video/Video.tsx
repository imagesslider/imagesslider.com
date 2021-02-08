import React, { FC } from "react";
import { ImageType } from "../../../Store/Store";

export type VideoType = {
  onPlay?: (event: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
  onEnded?: (event: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
};

const Video: FC<ImageType & VideoType> = ({ srcVideo, onPlay, onEnded }) => {
  //Disable right click
  const onContextMenu = (event: any) => {
    event.preventDefault();
    alert(`Sorry can't do that!!!`);
  };

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
      onContextMenu={onContextMenu}
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
