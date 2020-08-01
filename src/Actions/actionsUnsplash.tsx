import {
  isLoadingAction,
  setImages,
  redirectAction,
  setTotalPagesAction,
  setNoContentAction,
  setDefaultCollections,
  setTotalPagesCollectionsAction,
} from "../Actions/actionsApp";
import {
  setproviderSearchAction,
  setQueryAction,
} from "../Actions/actionsSearch";

//fetch and set unsplash images albums
export const setImagesUnsplashAlbumsAction = (query: string, page: number) => {
  return (dispatch: any) => {
    dispatch(isLoadingAction(true));
    dispatch(redirectAction(false));
    dispatch(setQueryAction(query));
    dispatch(setproviderSearchAction("unsplash-albums"));
    return fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => dispatch(setDataActionUnsplash(data)))
      .then(() => dispatch(isLoadingAction(false)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
  };
};

//set data unpsplash
export const setDataActionUnsplash = (data: any) => {
  return (dispatch: any) => {
    if (data.results.length === 0) {
      dispatch(setNoContentAction("No content available"));
    } else {
      dispatch(
        setImages(
          data.results.map((imageU: ImageUnsplashProps) => {
            return {
              id: imageU.id,
              src: `${imageU.urls?.regular}`,
              alt: `${imageU.urls?.regular}`,
              description: imageU.description,
            };
          })
        )
      );
      dispatch(redirectAction(true));
      dispatch(setNoContentAction(""));
    }
    dispatch(setTotalPagesAction(data.total_pages));
  };
};

//ImageUnsplashProps
export type ImageUnsplashProps = {
  id?: string;
  urls?: {
    full?: string;
    raw?: string;
    regular?: string;
    small?: string;
    thumb?: string;
  };
  description?: string;
};

//fetch and set unsplash images collection
export const setImagesActionUnsplashCollection = (
  query: string,
  page: number,
  perPage: number
) => {
  return (dispatch: any) => {
    dispatch(isLoadingAction(true));
    dispatch(redirectAction(false));
    dispatch(setQueryAction(query));
    return fetch(
      `https://api.unsplash.com/collections/${query}/photos?page=${page}&per_page=${perPage}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          dispatch(setNoContentAction(data.errors));
        } else {
          dispatch(setDataActionUnsplashCollection(data));
        }
      })
      .then(() => dispatch(isLoadingAction(false)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
  };
};

//set data unpsplash collection
export const setDataActionUnsplashCollection = (data: any) => {
  return (dispatch: any) => {
    dispatch(
      setImages(
        data.map((imageU: ImageUnsplashProps) => {
          return {
            id: imageU.id,
            src: `${imageU.urls?.regular}`,
            alt: `${imageU.urls?.regular}`,
            description: imageU.description,
          };
        })
      )
    );
    dispatch(redirectAction(true));
    dispatch(isLoadingAction(false));
  };
};

//fetch and set unsplash collections
export const setUnsplashCollectionsAction = (page: number) => {
  return (dispatch: any) => {
    dispatch(isLoadingAction(true));
    dispatch(setproviderSearchAction("unsplash-collections"));
    return fetch(
      `https://api.unsplash.com/collections/featured?page=${page}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) =>
        dispatch(
          setDefaultCollections(
            data.map((defaultCollection: DefaultCollectionType) => {
              return {
                id: defaultCollection.id,
                title: defaultCollection.title,
                coverPhoto: defaultCollection.cover_photo?.urls?.small,
                totalPhotos: defaultCollection.total_photos,
              };
            })
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

export type DefaultCollectionType = {
  id?: string | number;
  title?: string;
  cover_photo?: DefaultCollectionCoverPhotoType;
  total_photos?: number;
};

export type DefaultCollectionCoverPhotoType = {
  urls?: {
    full?: string;
    raw?: string;
    regular?: string;
    small?: string;
    thumb?: string;
  };
};

//search Unsplash Collections Action
export const searchUnsplashCollectionsAction = (
  query: string,
  page: number
) => {
  return (dispatch: any) => {
    dispatch(isLoadingAction(true));
    dispatch(setQueryAction(query));
    dispatch(setproviderSearchAction("unsplash-collections-search"));
    return fetch(
      `https://api.unsplash.com/search/collections?page=${page}&query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => dispatch(setDataUnsplashCollectionSearchAction(data)))
      .then(() => dispatch(isLoadingAction(false)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
  };
};

//set data unpsplash collection
export const setDataUnsplashCollectionSearchAction = (data: any) => {
  return (dispatch: any) => {
    if (data.results.length === 0) {
      dispatch(setNoContentAction("No content available"));
    } else {
      dispatch(
        setDefaultCollections(
          data.results.map((defaultCollection: DefaultCollectionType) => {
            return {
              id: defaultCollection.id,
              title: defaultCollection.title,
              coverPhoto: defaultCollection.cover_photo?.urls?.small,
              totalPhotos: defaultCollection.total_photos,
            };
          })
        )
      );
      dispatch(setNoContentAction(""));
      dispatch(setTotalPagesCollectionsAction(data.total_pages));
    }
  };
};
