import React, { FC } from "react";
import "../AllImages/AllImages.css";
import { useSelector, useDispatch } from "react-redux";
import { setAllImagesActionGoogle } from "../../Actions/actionsGoogle";
import { Redirect } from "react-router-dom";
import logoGooglePng from "../../ImagesPngSvg/kisspng-google-logo-logo-logo-5ade7dc784e2a0.4068700815245306315443.png";
import { AppType } from "../../Type/Type";

export type AllImagesType = {
  onClickAllGoogleImages?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const AllImages: FC<AllImagesType> = () => {
  //state redux
  const selectProvider = (state: AppType) => state.appState.login.provider;
  const provider = useSelector(selectProvider);
  const selectToken = (state: AppType) => state.appState.login.token;
  const token = useSelector(selectToken);
  const selectRedirect = (state: AppType) => state.appState.redirect;
  const redirect = useSelector(selectRedirect);
  const selectImages = (state: AppType) => state.appState.images;
  const images = useSelector(selectImages);
  const selectNextPageToken = (state: AppType) => state.appState.nextPageToken;
  const nextPageToken = useSelector(selectNextPageToken);
  //actions redux
  const dispatch = useDispatch();

  //onClickAllGoogleImages
  const onClickAllGoogleImages = () => {
    dispatch(setAllImagesActionGoogle(token, nextPageToken));
  };

  return (
    <>
      {redirect && !!images ? <Redirect to="/images" /> : null}
      {provider === "google" && (
        <div className="all_images">
          <button
            className="button_google_all_images"
            onClick={onClickAllGoogleImages}
          >
            <p className="button_google_all_title">All</p>
            <img
              src={logoGooglePng}
              alt={logoGooglePng}
              width="100px"
              height="100px"
            />
            <p className="button_google_all_title">images </p>
          </button>
        </div>
      )}
    </>
  );
};

export default AllImages;
