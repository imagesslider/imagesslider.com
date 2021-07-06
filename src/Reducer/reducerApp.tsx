import { Store, initalStore } from "../Store/Store";
import {
  AllActionsApp,
  SET_USER,
  SET_ALBUMS,
  SELECTED_ALBUM_ID,
  SET_IMAGES,
  CLEAR_IMAGES,
  IS_LOADING,
  REDIRECT,
  SET_TOTALPAGES,
  SET_NOCONTENT,
  SET_COLLECTIONS_PRIVATE,
  SET_TOTALPAGES_COLLECTIONS,
  SET_INDEX_TAB,
  SET_NEXTPAGE_TOKEN,
  SET_FULLSCREEN,
  FETCH_ALLIMAGES,
  SHOW_DROP_DOWN,
  DARK_AND_LIGHT_MODE,
  SIGN_IN_AND_OUT,
  SET_DEFAULT_ALBUMS,
  SET_DEFAULT_VIDEOS,
  SET_CURRENT_USER,
  SET_COLLECTION_PRIVATE,
  IN_IMAGE,
  SET_USER_IS_LOGGED,
} from "../Actions/actionsApp";
import {
  SIGN_IN_GOOGLE,
  SIGN_OUT_GOOGLE,
  AllActionsGoogle,
} from "../Actions/actionsGoogle";

const reducerApp = (
  state: Store = initalStore,
  action: AllActionsApp | AllActionsGoogle
) => {
  switch (action.type) {
    //actions app
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_ALBUMS:
      return {
        ...state,
        albums: [...action.payload],
      };
    case SET_DEFAULT_ALBUMS:
      return {
        ...state,
        defaultAlbums: [...action.payload],
      };
    case SET_DEFAULT_VIDEOS:
      return {
        ...state,
        defaultVideos: [...action.payload],
      };
    case SELECTED_ALBUM_ID:
      return {
        ...state,
        selelctedAlbumId: action.payload,
      };
    case SET_IMAGES:
      return {
        ...state,
        images: [...action.payload],
      };
    case CLEAR_IMAGES:
      return {
        ...state,
        selelctedAlbumId: null,
        images: [],
        redirect: false,
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case REDIRECT:
      return {
        ...state,
        redirect: action.payload,
      };
    case SET_TOTALPAGES:
      return {
        ...state,
        totalPages: action.payload,
      };
    case SET_NOCONTENT:
      return {
        ...state,
        noContent: action.payload,
      };
    case SET_COLLECTIONS_PRIVATE:
      return {
        ...state,
        collectionsPrivate: [...action.payload],
      };
    case SET_COLLECTION_PRIVATE:
      return {
        ...state,
        collectionPrivate: action.payload,
      };
    case SET_TOTALPAGES_COLLECTIONS:
      return {
        ...state,
        totalPagesCollections: action.payload,
      };
    case SET_INDEX_TAB:
      return {
        ...state,
        indexTab: action.payload,
      };
    case SET_NEXTPAGE_TOKEN:
      return {
        ...state,
        nextPageToken: action.payload,
      };
    case SET_FULLSCREEN:
      return {
        ...state,
        fullscreen: action.payload,
      };
    case FETCH_ALLIMAGES:
      return {
        ...state,
        fetchAllImages: action.payload,
      };
    case SHOW_DROP_DOWN:
      return {
        ...state,
        showDropDown: action.payload,
      };
    case DARK_AND_LIGHT_MODE:
      return {
        ...state,
        theme: action.payload,
      };
    case SIGN_IN_AND_OUT:
      return {
        ...state,
        signInAndOut: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case IN_IMAGE:
      return {
        ...state,
        inImage: action.payload,
      };
    case SET_USER_IS_LOGGED:
      return {
        ...state,
        userIsLogged: action.payload,
      };
    //google actions
    case SIGN_IN_GOOGLE:
      return {
        ...state,
        login: {
          ...state.login,
          isLogged: true,
          provider: "google",
          token: action.payload,
        },
      };
    case SIGN_OUT_GOOGLE:
      return {
        ...state,
        login: {
          ...state.login,
          isLogged: false,
          provider: null,
          token: null,
        },
        albums: [],
        selelctedAlbumId: null,
        images: [],
      };
    default:
      return state;
  }
};

export default reducerApp;
