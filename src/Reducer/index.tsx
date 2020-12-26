import reducerApp from "./reducerApp";
import reducerSlider from "../Reducer/reducerSlider";
import reducerSearch from "../Reducer/reducerSearch";
import reducerSpeechRecognition from "../Reducer/reducerSpeechRecognition";

import { combineReducers } from "redux";

const allReducer = combineReducers({
  appState: reducerApp,
  slider: reducerSlider,
  search: reducerSearch,
  speechRecognition: reducerSpeechRecognition,
});

export default allReducer;
