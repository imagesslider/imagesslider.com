import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selelctedAlbumId } from "../../Actions/actionsApp";
import { setImagesActionGoogle } from "../../Actions/actionsGoogle";
import { Link } from "react-router-dom";
import { AlbumType } from "../../Store/Store";
import "../Album/Album.css";
import { AppType } from "../../Type/Type";

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
  //actions redux
  const dispatch = useDispatch();

  //on click album
  const onClickAlbum = (id: string) => {
    dispatch(selelctedAlbumId(id as string));
    if (provider === "google") {
      dispatch(setImagesActionGoogle(id, token, nextPageToken));
    }
  };

  return (
    <Link to="/images" style={{ textDecoration: "none" }}>
      <div
        key={id}
        onClick={() => onClickAlbum(id as string)}
        className="album_wrapper"
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
    </Link>
  );
};

export default Album;
