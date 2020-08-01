import React, { FC } from "react";
import "./DefaultAlbum.css";
import { Link } from "react-router-dom";

export type DefaultAlbumType = {
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  src: string;
  title?: string;
};

const DefaultAlbum: FC<DefaultAlbumType> = ({ onClick, src, title }) => {
  return (
    <Link to="/images" className="default_album" onClick={onClick}>
      <img src={src} alt={src} className="default_album_img" />
      <h2 className="default_album_title">{title}</h2>
    </Link>
  );
};

export default DefaultAlbum;
