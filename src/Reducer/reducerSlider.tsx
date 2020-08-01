import { StoreSlider, initalStoreSlider } from "../Store/Store";
import {
  AllActionsSlider,
  AUTO_SLIDER,
  INTERVAL_TIME_SLIDER,
} from "../Actions/actionsSlider";

const reducerSlider = (
  state: StoreSlider = initalStoreSlider,
  action: AllActionsSlider
) => {
  switch (action.type) {
    case AUTO_SLIDER:
      return {
        ...state,
        autoSlider: action.payload,
      };
    case INTERVAL_TIME_SLIDER:
      return {
        ...state,
        intervalTime: action.payload,
      };
    default:
      return state;
  }
};

export default reducerSlider;
