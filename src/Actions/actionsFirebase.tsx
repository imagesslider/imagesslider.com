import {
  isLoadingAction,
  redirectAction,
  setDefaultAlbums,
  setDefaultVideos,
  setImages,
  setNoContentAction,
} from "./actionsApp";
import { setproviderSearchAction, setQueryAction } from "./actionsSearch";

//fetch and set Firebase albums
export const setAlbumsFirebaseAction = () => {
  return (dispatch: any) => {
    dispatch(isLoadingAction(true));
    return fetch(
      `https://${process.env.REACT_APP_FIREBASE_ID}.firebaseio.com/albums.json`
    )
      .then((response) => response.json())
      .then((data) =>
        dispatch(
          setDefaultAlbums(
            Object.keys(data).map((key) => ({ ...data[key], id: key })) || []
          )
        )
      )
      .then(() => dispatch(isLoadingAction(false)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
  };
};

//fetch and set Firebase images
export const setImagesFirebaseAction = (query: string | undefined) => {
  return (dispatch: any) => {
    dispatch(isLoadingAction(true));
    dispatch(redirectAction(false));
    dispatch(setQueryAction(query));
    dispatch(setproviderSearchAction("firebase-images"));
    return fetch(
      `https://${process.env.REACT_APP_FIREBASE_ID}.firebaseio.com/albums/${query}/images.json`
    )
      .then((response) => response.json())
      .then((data) => dispatch(setDataImagesActionFirebase(data)))
      .then(() => dispatch(isLoadingAction(false)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
  };
};

//set data Firebase
export const setDataImagesActionFirebase = (data: any) => {
  return (dispatch: any) => {
    if (data === null) {
      dispatch(setNoContentAction("No content available"));
    } else {
      dispatch(
        setImages(
          data.map((imageFirebase: ImageFirebaseProps) => {
            return {
              id: imageFirebase.id,
              src: `${imageFirebase.url}`,
              alt: `${imageFirebase.url}`,
              user: `${imageFirebase.user}`,
              description: `${imageFirebase.description}`,
              userLink: `${imageFirebase.userLink}`,
            };
          })
        )
      );
      dispatch(redirectAction(true));
      dispatch(setNoContentAction(""));
    }
  };
};

//ImageFirebaseProps
export type ImageFirebaseProps = {
  id?: string;
  url?: string;
  user?: string;
  description?: string;
  userLink?: string;
};

//fetch and set Firebase videos
export const setVideosFirebaseAction = () => {
  return (dispatch: any) => {
    dispatch(isLoadingAction(true));
    return fetch(
      `https://${process.env.REACT_APP_FIREBASE_ID}.firebaseio.com/videos.json`
    )
      .then((response) => response.json())
      .then((data) =>
        dispatch(
          setDefaultVideos(
            Object.keys(data).map((key) => ({ ...data[key], id: key })) || []
          )
        )
      )
      .then(() => dispatch(isLoadingAction(false)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
  };
};

//fetch and set Firebase images videos
export const setImagesVideosFirebaseAction = (query: string | undefined) => {
  return (dispatch: any) => {
    dispatch(isLoadingAction(true));
    dispatch(redirectAction(false));
    dispatch(setQueryAction(query));
    dispatch(setproviderSearchAction("firebase-videos"));
    return fetch(
      `https://${process.env.REACT_APP_FIREBASE_ID}.firebaseio.com/videos/${query}/images.json`
    )
      .then((response) => response.json())
      .then((data) => dispatch(setDataImagesVideosActionFirebase(data)))
      .then(() => dispatch(isLoadingAction(false)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
  };
};

//set data Firebase
export const setDataImagesVideosActionFirebase = (data: any) => {
  return (dispatch: any) => {
    if (data === null) {
      dispatch(setNoContentAction("No content available"));
    } else {
      dispatch(
        setImages(
          data.map((videoFirebase: VideoFirebaseProps) => {
            return {
              id: videoFirebase.id,
              srcVideo: `${videoFirebase.url}`,
              alt: `${videoFirebase.url}`,
              user: `${videoFirebase.user}`,
              description: `${videoFirebase.description}`,
              userLink: `${videoFirebase.userLink}`,
              videoType: `${videoFirebase.videoType}`,
            };
          })
        )
      );
      dispatch(redirectAction(true));
      dispatch(setNoContentAction(""));
    }
  };
};

//ImageFirebaseProps
export type VideoFirebaseProps = {
  id?: string;
  url?: string;
  user?: string;
  description?: string;
  userLink?: string;
  videoType?: string;
};
