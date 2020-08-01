import reducerApp from "./reducerApp";
import reducerSlider from "../Reducer/reducerSlider";
import reducerSearch from "../Reducer/reducerSearch";

import { combineReducers } from "redux";

const allReducer = combineReducers({
  appState: reducerApp,
  slider: reducerSlider,
  search: reducerSearch,
});

export default allReducer;
