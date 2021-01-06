import {
  isLoadingAction,
  redirectAction,
  setNoContentAction,
  setImages,
} from "../Actions/actionsApp";
import {
  setproviderSearchAction,
  setQueryAction,
} from "../Actions/actionsSearch";

//fetch and set PX images
export const setImagesPXAction = (query: string) => {
  return (dispatch: any) => {
    dispatch(isLoadingAction(true));
    dispatch(redirectAction(false));
    dispatch(setQueryAction(query));
    dispatch(setproviderSearchAction("px-images"));
    return fetch(
      `https://pixabay.com/api/?key=19773468-36586d7055b9f64e4a25bd312&q=${query}&image_type=photo&per_page=200`
    )
      .then((response) => response.json())
      .then((data) => dispatch(setDataImagesActionPX(data)))
      .then(() => dispatch(isLoadingAction(false)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
  };
};

//set data PX
export const setDataImagesActionPX = (data: any) => {
  return (dispatch: any) => {
    if (data.hits.length === 0) {
      dispatch(setNoContentAction("No content available"));
    } else {
      dispatch(
        setImages(
          data.hits.map((imagePX: ImagePXProps) => {
            return {
              id: imagePX.id,
              src: `${imagePX.largeImageURL}`,
              alt: `${imagePX.largeImageURL}`,
            };
          })
        )
      );
      dispatch(redirectAction(true));
      dispatch(setNoContentAction(""));
    }
  };
};

//ImagePXProps
export type ImagePXProps = {
  id?: string;
  largeImageURL?: string;
};

//fetch and set PX videos
export const setVideosPXAction = (query: string) => {
  return (dispatch: any) => {
    dispatch(isLoadingAction(true));
    dispatch(redirectAction(false));
    dispatch(setQueryAction(query));
    dispatch(setproviderSearchAction("px-videos"));
    return fetch(
      `https://pixabay.com/api/videos/?key=19773468-36586d7055b9f64e4a25bd312&q=${query}`
    )
      .then((response) => response.json())
      .then((data) => dispatch(setDataVideosActionPX(data)))
      .then(() => dispatch(isLoadingAction(false)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
  };
};

//set data PX
export const setDataVideosActionPX = (data: any) => {
  return (dispatch: any) => {
    if (data.hits.length === 0) {
      dispatch(setNoContentAction("No content available"));
    } else {
      dispatch(
        setImages(
          data.hits.map((videoPX: VideosPXProps) => {
            return {
              id: videoPX.id,
              src: videoPX.videos.large.url,
              alt: videoPX.videos.large.url,
              videoType: "video/mp4",
              srcVideo: videoPX.videos.large.url,
            };
          })
        )
      );
      dispatch(redirectAction(true));
      dispatch(setNoContentAction(""));
    }
  };
};

//VideosPXProps
export type VideosPXProps = {
  id?: string;
  videos?: any;
  videoType?: string;
};
