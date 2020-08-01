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
  SET_DEFAULTCOLLECTIONS,
  SET_TOTALPAGES_COLLECTIONS,
  SET_INDEX_TAB,
  SET_NEXTPAGE_TOKEN,
  SET_FULLSCREEN,
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
        login: {
          ...state.login,
          user: action.payload,
        },
      };
    case SET_ALBUMS:
      return {
        ...state,
        albums: [...action.payload],
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
    case SET_DEFAULTCOLLECTIONS:
      return {
        ...state,
        defaultCollections: [...action.payload],
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
