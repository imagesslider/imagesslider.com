//inImages
export type ActionIN_IMAGES = {
  type: "IN_IMAGES";
  payload: boolean;
};

export const IN_IMAGES = "IN_IMAGES";
export const inImagesAction = (inImages: boolean): ActionIN_IMAGES => ({
  type: IN_IMAGES,
  payload: inImages,
});

//isListening
export type ActionIS_LISTENING = {
  type: "IS_LISTENING";
  payload: boolean;
};

export const IS_LISTENING = "IS_LISTENING";
export const isListeningAction = (
  isListening: boolean
): ActionIS_LISTENING => ({
  type: IS_LISTENING,
  payload: isListening,
});

//backToHome
export type ActionBACK_TO_HOME = {
  type: "BACK_TO_HOME";
  payload: boolean;
};

export const BACK_TO_HOME = "BACK_TO_HOME";
export const backToHomeAction = (backToHome: boolean): ActionBACK_TO_HOME => ({
  type: BACK_TO_HOME,
  payload: backToHome,
});

//nextImage
export type ActionNEXT_IMAGE = {
  type: "NEXT_IMAGE";
  payload: boolean;
};

export const NEXT_IMAGE = "NEXT_IMAGE";
export const nextImageAction = (nextImage: boolean): ActionNEXT_IMAGE => ({
  type: NEXT_IMAGE,
  payload: nextImage,
});

//previousImage
export type ActionPREVIOUS_IMAGE = {
  type: "PREVIOUS_IMAGE";
  payload: boolean;
};

export const PREVIOUS_IMAGE = "PREVIOUS_IMAGE";
export const previousImageAction = (
  previousImage: boolean
): ActionPREVIOUS_IMAGE => ({
  type: PREVIOUS_IMAGE,
  payload: previousImage,
});

//pauseAutoSlider
export type ActionPAUSE_AUTO_SLIDER = {
  type: "PAUSE_AUTO_SLIDER";
  payload: boolean;
};

export const PAUSE_AUTO_SLIDER = "PAUSE_AUTO_SLIDER";
export const pauseAutoSliderAction = (
  pauseAutoSlider: boolean
): ActionPAUSE_AUTO_SLIDER => ({
  type: PAUSE_AUTO_SLIDER,
  payload: pauseAutoSlider,
});

//playAutoSlider
export type ActionPLAY_AUTO_SLIDER = {
  type: "PLAY_AUTO_SLIDER";
  payload: boolean;
};

export const PLAY_AUTO_SLIDER = "PLAY_AUTO_SLIDER";
export const playAutoSliderAction = (
  playAutoSlider: boolean
): ActionPLAY_AUTO_SLIDER => ({
  type: PLAY_AUTO_SLIDER,
  payload: playAutoSlider,
});

export type AllActionsSpeechRecognition =
  | ActionIN_IMAGES
  | ActionIS_LISTENING
  | ActionBACK_TO_HOME
  | ActionNEXT_IMAGE
  | ActionPREVIOUS_IMAGE
  | ActionPAUSE_AUTO_SLIDER
  | ActionPLAY_AUTO_SLIDER;
