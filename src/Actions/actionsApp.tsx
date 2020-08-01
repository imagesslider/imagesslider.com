import {
  UserType,
  AlbumType,
  ImageType,
  DefaultCollectionType,
} from "../Store/Store";

//set user object
export type ActionSET_USER = {
  type: "SET_USER";
  payload: UserType;
};

export const SET_USER = "SET_USER";
export const setUserAction = (user: UserType): ActionSET_USER => ({
  type: SET_USER,
  payload: user,
});

//set albums
export type ActionALBUMS = {
  type: "SET_ALBUMS";
  payload: Array<AlbumType>;
};

export const SET_ALBUMS = "SET_ALBUMS";
export const setAlbums = (albums: Array<AlbumType>): ActionALBUMS => {
  return {
    type: SET_ALBUMS,
    payload: albums,
  };
};

//selelcted Album Id
export type ActionSELECTED_ALBUM_ID = {
  type: "SELECTED_ALBUM_ID";
  payload: string | null;
};

export const SELECTED_ALBUM_ID = "SELECTED_ALBUM_ID";
export const selelctedAlbumId = (
  id: string | null
): ActionSELECTED_ALBUM_ID => ({
  type: SELECTED_ALBUM_ID,
  payload: id,
});

//set images
export type ActionIMAGES = {
  type: "SET_IMAGES";
  payload: Array<ImageType>;
};

export const SET_IMAGES = "SET_IMAGES";
export const setImages = (images: Array<ImageType>): ActionIMAGES => {
  return {
    type: SET_IMAGES,
    payload: images,
  };
};

//clear images
export type ActionCLEAR_IMAGES = {
  type: "CLEAR_IMAGES";
};

export const CLEAR_IMAGES = "CLEAR_IMAGES";
export const clearImagesAction = (): ActionCLEAR_IMAGES => {
  return {
    type: CLEAR_IMAGES,
  };
};

//is Loading
export type ActionIS_LOADING = {
  type: "IS_LOADING";
  payload: boolean;
};

export const IS_LOADING = "IS_LOADING";
export const isLoadingAction = (isLoading: boolean): ActionIS_LOADING => ({
  type: IS_LOADING,
  payload: isLoading,
});

//redirect
export type ActionREDIRECT = {
  type: "REDIRECT";
  payload: boolean;
};

export const REDIRECT = "REDIRECT";
export const redirectAction = (redirect: boolean): ActionREDIRECT => ({
  type: REDIRECT,
  payload: redirect,
});

//set totalPages
export type ActionSET_TOTALPAGES = {
  type: "SET_TOTALPAGES";
  payload: number;
};

export const SET_TOTALPAGES = "SET_TOTALPAGES";
export const setTotalPagesAction = (
  totalPages: number
): ActionSET_TOTALPAGES => ({
  type: SET_TOTALPAGES,
  payload: totalPages,
});

//set noContent
export type ActionNOCONTENT = {
  type: "SET_NOCONTENT";
  payload: string;
};

export const SET_NOCONTENT = "SET_NOCONTENT";
export const setNoContentAction = (noContent: string): ActionNOCONTENT => ({
  type: SET_NOCONTENT,
  payload: noContent,
});

//set defaultCollections
export type ActionDEFAULTCOLLECTIONS = {
  type: "SET_DEFAULTCOLLECTIONS";
  payload: Array<DefaultCollectionType>;
};

export const SET_DEFAULTCOLLECTIONS = "SET_DEFAULTCOLLECTIONS";
export const setDefaultCollections = (
  defaultCollections: Array<DefaultCollectionType>
): ActionDEFAULTCOLLECTIONS => {
  return {
    type: SET_DEFAULTCOLLECTIONS,
    payload: defaultCollections,
  };
};

//set totalPages collections
export type ActionSET_TOTALPAGES_COLLECTIONS = {
  type: "SET_TOTALPAGES_COLLECTIONS";
  payload: number;
};

export const SET_TOTALPAGES_COLLECTIONS = "SET_TOTALPAGES_COLLECTIONS";
export const setTotalPagesCollectionsAction = (
  totalPagesCollections: number
): ActionSET_TOTALPAGES_COLLECTIONS => ({
  type: SET_TOTALPAGES_COLLECTIONS,
  payload: totalPagesCollections,
});

//set index tab
export type ActionSET_INDEX_TAB = {
  type: "SET_INDEX_TAB";
  payload: number;
};

export const SET_INDEX_TAB = "SET_INDEX_TAB";
export const setIndexTabAction = (indexTab: number): ActionSET_INDEX_TAB => ({
  type: SET_INDEX_TAB,
  payload: indexTab,
});

//selelcted nextPage Token
export type ActionNEXTPAGE_TOKEN = {
  type: "SET_NEXTPAGE_TOKEN";
  payload: string;
};

export const SET_NEXTPAGE_TOKEN = "SET_NEXTPAGE_TOKEN";
export const setNextPageToken = (
  nextPageToken: string
): ActionNEXTPAGE_TOKEN => ({
  type: SET_NEXTPAGE_TOKEN,
  payload: nextPageToken,
});

//is Loading
export type ActionSET_FULLSCREEN = {
  type: "SET_FULLSCREEN";
  payload: boolean;
};

export const SET_FULLSCREEN = "SET_FULLSCREEN";
export const setFullScreenAction = (
  fullscreen: boolean
): ActionSET_FULLSCREEN => ({
  type: SET_FULLSCREEN,
  payload: fullscreen,
});

export type AllActionsApp =
  | ActionSET_USER
  | ActionALBUMS
  | ActionSELECTED_ALBUM_ID
  | ActionIMAGES
  | ActionCLEAR_IMAGES
  | ActionIS_LOADING
  | ActionREDIRECT
  | ActionSET_TOTALPAGES
  | ActionNOCONTENT
  | ActionDEFAULTCOLLECTIONS
  | ActionSET_TOTALPAGES_COLLECTIONS
  | ActionSET_INDEX_TAB
  | ActionNEXTPAGE_TOKEN
  | ActionSET_FULLSCREEN;
