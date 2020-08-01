import { StoreSearch, initalStoreSearch } from "../Store/Store";
import {
  AllSearchActions,
  SET_PROVIDER_SEARCH,
  SET_SEARCH,
  SET_QUERY,
} from "../Actions/actionsSearch";

const reducerSearch = (
  state: StoreSearch = initalStoreSearch,
  action: AllSearchActions
) => {
  switch (action.type) {
    case SET_PROVIDER_SEARCH:
      return {
        ...state,
        providerSearch: action.payload,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default reducerSearch;
