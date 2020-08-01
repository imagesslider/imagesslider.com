import React, { FC } from "react";
import { ImageType } from "../../../Store/Store";

const Image: FC<ImageType> = ({ src, alt }) => {
  return <img src={src} alt={alt} />;
};

export default Image;
