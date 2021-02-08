import React, { FC } from "react";
import { ImageType } from "../../../Store/Store";

const Image: FC<ImageType> = ({ src, alt }) => {
  //Disable right click
  const onContextMenu = (event: any) => {
    event.preventDefault();
    alert(`Sorry can't do that!!!`);
  };

  return <img src={src} alt={alt} onContextMenu={onContextMenu} />;
};

export default Image;
