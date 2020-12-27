import {
  StoreSpeechRecognition,
  initalStoreSpeechRecognition,
} from "../Store/Store";
import {
  AllActionsSpeechRecognition,
  IN_IMAGES,
  IS_LISTENING,
  BACK_TO_HOME,
  NEXT_IMAGE,
  PREVIOUS_IMAGE,
  PAUSE_AUTO_SLIDER,
  PLAY_AUTO_SLIDER,
  RECOGNITION,
} from "../Actions/actionsSpeechRecognition";

const reducerSpeechRecognition = (
  state: StoreSpeechRecognition = initalStoreSpeechRecognition,
  action: AllActionsSpeechRecognition
) => {
  switch (action.type) {
    case RECOGNITION:
      return {
        ...state,
        recognition: action.payload,
      };
    case IN_IMAGES:
      return {
        ...state,
        inImages: action.payload,
      };
    case IS_LISTENING:
      return {
        ...state,
        isListening: action.payload,
      };
    case BACK_TO_HOME:
      return {
        ...state,
        backToHome: action.payload,
      };
    case NEXT_IMAGE:
      return {
        ...state,
        nextImage: action.payload,
      };
    case PREVIOUS_IMAGE:
      return {
        ...state,
        previousImage: action.payload,
      };
    case PAUSE_AUTO_SLIDER:
      return {
        ...state,
        pauseAutoSlider: action.payload,
      };
    case PLAY_AUTO_SLIDER:
      return {
        ...state,
        playAutoSlider: action.payload,
      };
    default:
      return state;
  }
};

export default reducerSpeechRecognition;
