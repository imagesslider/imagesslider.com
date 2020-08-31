import {
  setAlbums,
  setImages,
  isLoadingAction,
  redirectAction,
  setNextPageToken,
  selelctedAlbumId,
  fetchAllImagesAction,
} from "../Actions/actionsApp";

import { setproviderSearchAction } from "../Actions/actionsSearch";

//sign in with google
export type ActionSIGN_IN_GOOGLE = {
  type: "SIGN_IN_GOOGLE";
  payload: string | null;
};

export const SIGN_IN_GOOGLE = "SIGN_IN_GOOGLE";
export const signInActionGoogle = (
  token: string | null
): ActionSIGN_IN_GOOGLE => ({
  type: SIGN_IN_GOOGLE,
  payload: token,
});

//sign out with google
export type ActionSIGN_OUT_GOOGLE = {
  type: "SIGN_OUT_GOOGLE";
  payload: string | null;
};

export const SIGN_OUT_GOOGLE = "SIGN_OUT_GOOGLE";
export const signOutActionGoogle = (
  token: string | null
): ActionSIGN_OUT_GOOGLE => ({
  type: SIGN_OUT_GOOGLE,
  payload: token,
});

//fetch and set albums google
export const setAlbumsActionGoogle = (token: string) => {
  return (dispatch: any) => {
    dispatch(isLoadingAction(true));
    return fetch(
      `https://photoslibrary.googleapis.com/v1/albums?key=AIzaSyCq9IBDkMGuXmbdUkLM-FLTBY7zBp_hI9k`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: `application/json`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(setAlbums(data.albums));
      })
      .then(() => dispatch(isLoadingAction(false)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
  };
};

//set images google
export type ImageGoogleProps = {
  id?: string;
  baseUrl?: string;
  mimeType?: string;
};

//fetch and set images google
export const setImagesActionGoogle = (
  id: string | null,
  token: string | null,
  nextPageToken: string
) => {
  let requestBody = {
    albumId: `${id}`,
    pageToken: `${nextPageToken}`,
  };
  return (dispatch: any) => {
    dispatch(isLoadingAction(true));
    dispatch(setproviderSearchAction("google-albumImages"));
    dispatch(selelctedAlbumId(id));
    return fetch(
      `https://content-photoslibrary.googleapis.com/v1/mediaItems:search?alt=json&key=AIzaSyCq9IBDkMGuXmbdUkLM-FLTBY7zBp_hI9k`,
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: `application/json`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(setDataAlbumImagesGoogleAction(data));
      })
      .then(() => dispatch(isLoadingAction(false)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
  };
};

//set data album images google
export const setDataAlbumImagesGoogleAction = (data: any) => {
  return (dispatch: any) => {
    let dataMediaItems = data.mediaItems.map((imageG: ImageGoogleProps) => {
      return {
        id: imageG.id,
        src: `${imageG.baseUrl}=w2048-h1024`,
        alt: `${imageG.baseUrl}=w2048-h1024`,
        videoType: imageG.mimeType,
        srcVideo: `${imageG.baseUrl}=dv`,
      };
    });
    dispatch(setImages(dataMediaItems));
    if (!!data.nextPageToken) {
      dispatch(setNextPageToken(data.nextPageToken));
    } else {
      dispatch(setNextPageToken(""));
    }
  };
};

//fetch and set all google images
export const setAllImagesActionGoogle = (
  token: string | null,
  nextPageToken: string
) => {
  return (dispatch: any) => {
    dispatch(isLoadingAction(true));
    dispatch(redirectAction(false));
    dispatch(setproviderSearchAction("google-allImages"));
    fetch(
      `https://photoslibrary.googleapis.com/v1/mediaItems?pageToken=${nextPageToken}&key=AIzaSyCq9IBDkMGuXmbdUkLM-FLTBY7zBp_hI9k`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: `application/json`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(setDataAllImagesGoogleAction(data));
      })
      .then(() => dispatch(redirectAction(true)))
      .then(() => dispatch(isLoadingAction(false)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
  };
};

//set data all images google
export const setDataAllImagesGoogleAction = (data: any) => {
  return (dispatch: any) => {
    let dataMediaItems = data.mediaItems.map((imageG: ImageGoogleProps) => {
      return {
        id: imageG.id,
        src: `${imageG.baseUrl}=w2048-h1024`,
        alt: `${imageG.baseUrl}=w2048-h1024`,
        videoType: imageG.mimeType,
        srcVideo: `${imageG.baseUrl}=dv`,
      };
    });
    dispatch(setImages(dataMediaItems));
    if (!!data.nextPageToken) {
      dispatch(setNextPageToken(data.nextPageToken));
    } else {
      dispatch(setNextPageToken(""));
    }
  };
};

//fetch all google images
export const fetchAllImagesActionGoogle = (
  token: string | null,
  nextPageToken: string
) => {
  return (dispatch: any) => {
    dispatch(isLoadingAction(true));
    dispatch(setproviderSearchAction("google-allImages"));
    fetch(
      `https://photoslibrary.googleapis.com/v1/mediaItems?pageToken=${nextPageToken}&key=AIzaSyCq9IBDkMGuXmbdUkLM-FLTBY7zBp_hI9k`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: `application/json`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!!data.mediaItems) {
          dispatch(fetchAllImagesAction(true));
        } else {
          dispatch(fetchAllImagesAction(false));
        }
      })
      .then(() => dispatch(isLoadingAction(false)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
  };
};

export type AllActionsGoogle = ActionSIGN_IN_GOOGLE | ActionSIGN_OUT_GOOGLE;
