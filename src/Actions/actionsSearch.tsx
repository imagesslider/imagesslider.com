//SET_PROVIDER_SEARCH
export type ActionSET_PROVIDER_SEARCH = {
  type: "SET_PROVIDER_SEARCH";
  payload: string;
};

export const SET_PROVIDER_SEARCH = "SET_PROVIDER_SEARCH";
export const setproviderSearchAction = (
  providerSearch: string
): ActionSET_PROVIDER_SEARCH => {
  return {
    type: SET_PROVIDER_SEARCH,
    payload: providerSearch,
  };
};

//search
export type ActionSET_SEARCH = {
  type: "SET_SEARCH";
  payload: string;
};

export const SET_SEARCH = "SET_SEARCH";
export const setSearchAction = (search: string): ActionSET_SEARCH => {
  return {
    type: SET_SEARCH,
    payload: search,
  };
};

//set query
export type ActionSET_QUERY = {
  type: "SET_QUERY";
  payload: string;
};

export const SET_QUERY = "SET_QUERY";
export const setQueryAction = (query: string): ActionSET_QUERY => ({
  type: SET_QUERY,
  payload: query,
});

export type AllSearchActions =
  | ActionSET_PROVIDER_SEARCH
  | ActionSET_SEARCH
  | ActionSET_QUERY;
