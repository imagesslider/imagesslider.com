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

export type AllActionsSpeechRecognition =
  | ActionIN_IMAGES
  | ActionIS_LISTENING
  | ActionNEXT_IMAGE;
