import {
  StoreSpeechRecognition,
  initalStoreSpeechRecognition,
} from "../Store/Store";
import {
  AllActionsSpeechRecognition,
  IN_IMAGES,
  IS_LISTENING,
  NEXT_IMAGE,
} from "../Actions/actionsSpeechRecognition";

const reducerSpeechRecognition = (
  state: StoreSpeechRecognition = initalStoreSpeechRecognition,
  action: AllActionsSpeechRecognition
) => {
  switch (action.type) {
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
    case NEXT_IMAGE:
      return {
        ...state,
        nextImage: action.payload,
      };
    default:
      return state;
  }
};

export default reducerSpeechRecognition;
