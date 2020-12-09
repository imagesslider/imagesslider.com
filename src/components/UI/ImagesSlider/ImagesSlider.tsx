import React, { useState, useEffect } from "react";
import "./ImagesSlider.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearImagesAction,
  setTotalPagesAction,
  setNoContentAction,
  setTotalPagesCollectionsAction,
  setDefaultCollections,
  setNextPageToken,
  setFullScreenAction,
} from "../../../Actions/actionsApp";
import {
  autoSliderAction,
  intervalTimeSliderAction,
} from "../../../Actions/actionsSlider";
import {
  setImagesUnsplashAlbumsAction,
  setImagesActionUnsplashCollection,
} from "../../../Actions/actionsUnsplash";
import {
  setproviderSearchAction,
  setSearchAction,
  setQueryAction,
} from "../../../Actions/actionsSearch";
import {
  setAllImagesActionGoogle,
  setImagesActionGoogle,
} from "../../../Actions/actionsGoogle";
import {
  inImagesAction,
  nextImageAction,
  backToHomeAction,
  previousImageAction,
  pauseAutoSliderAction,
  playAutoSliderAction,
} from "../../../Actions/actionsSpeechRecognition";
import {
  SliderType,
  SearchType,
  AppType,
  SpeechRecognitionType,
} from "../../../Type/Type";
import RangeSlider from "../RangeSlider/RangeSlider";
import { getRandomInt } from "../../../HelperFunctions/index";
import SpeechRecognition from "../../SpeechRecognition/SpeechRecognition";

type ImagesSliderProps = {
  onClickNext?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onClickPrev?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  openFullscreen?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  closeFullscreen?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onMouseEnterButton?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onMouseLeaveButton?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onMouseMove?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onTouchStart?: (event: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd?: (event: React.TouchEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
  imagesArray?: any;
  onClickBack?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onClickPause?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onClickPlay?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const ImagesSlider: React.FC<ImagesSliderProps> = ({
  children,
  imagesArray,
}) => {
  const [indexImage, setIndexImage] = useState<number>(0);
  const [transitionImgage, setTransitionImgage] = useState<boolean>(true);
  //hover
  const [hover, setHover] = useState<boolean>(false);
  let [hoverTimeout, setHoverTimeout] = useState<number>(0);
  const [buttonHover, setButtonHover] = useState<boolean>(false);
  //total pages random
  const [totalPagesRandom, setTotalPagesRandom] = useState<number>(10);
  //state redux
  const selectAutoSlider = (state: SliderType) => state.slider.autoSlider;
  const autoSlider = useSelector(selectAutoSlider);
  const selectIntervalTime = (state: SliderType) => state.slider.intervalTime;
  const intervalTime = useSelector(selectIntervalTime);
  const selectQuery = (state: SearchType) => state.search.query;
  const query = useSelector(selectQuery);
  const selectProviderSearch = (state: SearchType) =>
    state.search.providerSearch;
  const providerSearch = useSelector(selectProviderSearch);
  const selectTotalPages = (state: AppType) => state.appState.totalPages;
  const totalPages = useSelector(selectTotalPages);
  const selectToken = (state: AppType) => state.appState.login.token;
  const token = useSelector(selectToken);
  const selectNextPageToken = (state: AppType) => state.appState.nextPageToken;
  const nextPageToken = useSelector(selectNextPageToken);
  const selectSelelctedAlbumId = (state: AppType) =>
    state.appState.selelctedAlbumId;
  const selelctedAlbumId = useSelector(selectSelelctedAlbumId);
  const selectFullScreen = (state: AppType) => state.appState.fullscreen;
  const fullscreen = useSelector(selectFullScreen);
  const selectImages = (state: AppType) => state.appState.images;
  const images = useSelector(selectImages);
  const selectInImages = (state: SpeechRecognitionType) =>
    state.speechRecognition.inImages;
  const inImages = useSelector(selectInImages);
  const selectIsListening = (state: SpeechRecognitionType) =>
    state.speechRecognition.isListening;
  const isListening = useSelector(selectIsListening);
  const selectBackToHome = (state: SpeechRecognitionType) =>
    state.speechRecognition.backToHome;
  const backToHome = useSelector(selectBackToHome);
  const selectNextImage = (state: SpeechRecognitionType) =>
    state.speechRecognition.nextImage;
  const nextImage = useSelector(selectNextImage);
  const selectPreviousImage = (state: SpeechRecognitionType) =>
    state.speechRecognition.previousImage;
  const previousImage = useSelector(selectPreviousImage);
  const selectPauseAutoSlider = (state: SpeechRecognitionType) =>
    state.speechRecognition.pauseAutoSlider;
  const pauseAutoSlider = useSelector(selectPauseAutoSlider);
  const selectPlayAutoSlider = (state: SpeechRecognitionType) =>
    state.speechRecognition.playAutoSlider;
  const playAutoSlider = useSelector(selectPlayAutoSlider);

  //react-router-dom
  const history = useHistory();

  //actions redux
  const dispatch = useDispatch();

  //useEffect auto slider
  useEffect(() => {
    let sliderInterval: any;
    if (
      autoSlider &&
      !hover &&
      !buttonHover &&
      !isListening &&
      images.length !== 1
    ) {
      sliderInterval = setInterval(onClickNext, intervalTime);
    }
    return () => {
      clearInterval(sliderInterval);
    };
  }, [indexImage, autoSlider, intervalTime, hover, buttonHover, isListening]);

  //total pages random
  useEffect(() => {
    if (totalPages <= 10) {
      setTotalPagesRandom(totalPages);
    } else {
      setTotalPagesRandom(10);
    }
  }, [totalPagesRandom, totalPages]);

  //SpeechRecognition
  useEffect(() => {
    dispatch(inImagesAction(true));
  }, [dispatch]);

  useEffect(() => {
    if (backToHome) {
      onClickBack();
      dispatch(backToHomeAction(false));
    } else if (nextImage) {
      onClickNext();
      dispatch(nextImageAction(false));
    } else if (previousImage) {
      onClickPrev();
      dispatch(previousImageAction(false));
    } else if (pauseAutoSlider) {
      onClickPause();
      dispatch(pauseAutoSliderAction(false));
    } else if (playAutoSlider) {
      onClickPlay();
      dispatch(playAutoSliderAction(false));
    }
  }, [backToHome, nextImage, previousImage, pauseAutoSlider, playAutoSlider]);

  //onClickNext
  const onClickNext = () => {
    if (indexImage === imagesArray.length - 1) {
      setTransitionImgage(false);
      setIndexImage(0);
      if (providerSearch === "google-allImages") {
        if (!!nextPageToken) {
          dispatch(setAllImagesActionGoogle(token, nextPageToken));
        } else {
          dispatch(setAllImagesActionGoogle(token, nextPageToken));
        }
      }
      if (providerSearch === "google-albumImages") {
        if (!!nextPageToken) {
          dispatch(
            setImagesActionGoogle(selelctedAlbumId, token, nextPageToken)
          );
        } else {
          dispatch(
            setImagesActionGoogle(selelctedAlbumId, token, nextPageToken)
          );
        }
      }
      if (providerSearch === "unsplash-albums") {
        dispatch(
          setImagesUnsplashAlbumsAction(query, getRandomInt(totalPagesRandom))
        );
      }
      if (providerSearch === "unsplash-collections") {
        dispatch(
          setImagesActionUnsplashCollection(
            query,
            getRandomInt(totalPagesRandom),
            10
          )
        );
      }
      if (providerSearch === "unsplash-collections-search") {
        dispatch(
          setImagesActionUnsplashCollection(
            query,
            getRandomInt(totalPagesRandom),
            10
          )
        );
      }
    } else {
      setTransitionImgage(true);
      setIndexImage(indexImage + 1);
    }
  };

  //onClickPrev
  const onClickPrev = () => {
    setIndexImage(indexImage - 1);
  };

  //onClickBack
  const onClickBack = () => {
    clearTimeout(hoverTimeout);
    dispatch(clearImagesAction());
    dispatch(setQueryAction(""));
    dispatch(setSearchAction(""));
    dispatch(setproviderSearchAction(""));
    dispatch(setTotalPagesAction(0));
    dispatch(setNoContentAction(""));
    dispatch(setTotalPagesCollectionsAction(0));
    dispatch(setDefaultCollections([]));
    dispatch(setNextPageToken(""));
    dispatch(setFullScreenAction(false));
    dispatch(inImagesAction(false));
    history.push("/");
  };

  //onClickPause
  const onClickPause = () => {
    dispatch(autoSliderAction(false));
  };

  //onClickPlay
  const onClickPlay = () => {
    dispatch(autoSliderAction(true));
  };

  //onMouseMove
  const onMouseMove = () => {
    setHover(true);
    if (hoverTimeout >= 0) {
      clearTimeout(hoverTimeout);
    }
    setHoverTimeout(
      setTimeout(() => {
        setHover(false);
      }, 3000) as any
    );
  };

  //onMouseEnterButton
  const onMouseEnterButton = () => {
    setButtonHover(true);
  };

  //onMouseLeaveButton
  const onMouseLeaveButton = () => {
    setButtonHover(false);
  };

  /* Get the documentElement (<html>) to display the page in fullscreen */
  let elem = document.documentElement;
  /* View in fullscreen */
  const openFullscreen = () => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
      dispatch(setFullScreenAction(true));
    }
  };

  /* Close fullscreen */
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      dispatch(setFullScreenAction(false));
    }
  };

  //useEffect fullscreenchange
  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        dispatch(setFullScreenAction(true));
      } else {
        dispatch(setFullScreenAction(false));
      }
    });
  }, [fullscreen, dispatch]);

  //onTouchStart
  const onTouchStart = () => {
    setHover(true);
    setButtonHover(true);
  };

  const onTouchEnd = () => {
    setHover(false);
    setButtonHover(false);
  };

  //hoverStyles
  const hoverStyles = {
    opacity: hover || buttonHover || isListening ? "1" : "0",
  };

  return (
    <div
      className="images__wrapper"
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {inImages && <SpeechRecognition style={hoverStyles} />}
      {!isListening && (
        <i
          className="fas fa-arrow-left back  fa-2x"
          onMouseEnter={onMouseEnterButton}
          onMouseLeave={onMouseLeaveButton}
          onClick={onClickBack}
          style={hoverStyles}
          title="Back"
        ></i>
      )}
      {images.length !== 1 && (
        <RangeSlider
          title="Interval Time"
          value={intervalTime}
          onMouseEnter={onMouseEnterButton}
          onMouseLeave={onMouseLeaveButton}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(intervalTimeSliderAction(parseInt(event.target.value)))
          }
          style={hoverStyles}
        />
      )}
      {autoSlider ? (
        <button
          className={images.length !== 1 ? "button-pause" : "isDisabled"}
          onMouseEnter={onMouseEnterButton}
          onMouseLeave={onMouseLeaveButton}
          onClick={onClickPause}
          style={hoverStyles}
          title="Pause auto slider"
        >
          <i className="far fa-pause-circle fa-2x"></i>
        </button>
      ) : (
        <button
          className={images.length !== 1 ? "button-pause" : "isDisabled"}
          onMouseEnter={onMouseEnterButton}
          onMouseLeave={onMouseLeaveButton}
          onClick={onClickPlay}
          style={hoverStyles}
          title="Play auto slider"
        >
          <i className="far fa-play-circle fa-2x"></i>
        </button>
      )}
      <button
        onMouseEnter={onMouseEnterButton}
        onMouseLeave={onMouseLeaveButton}
        onClick={onClickPrev}
        className={indexImage === 0 ? "isDisabled" : "button prev"}
        style={hoverStyles}
      >
        <i className="fas fa-chevron-left fa-2x"></i>
      </button>
      <button
        onMouseEnter={onMouseEnterButton}
        onMouseLeave={onMouseLeaveButton}
        onClick={onClickNext}
        className={images.length !== 1 ? "button next" : "isDisabled"}
        style={hoverStyles}
      >
        <i className="fas fa-chevron-right fa-2x"></i>
      </button>
      {!fullscreen ? (
        <button
          onMouseEnter={onMouseEnterButton}
          onMouseLeave={onMouseLeaveButton}
          onClick={openFullscreen}
          className="fullscreen openFullscreen"
          style={hoverStyles}
          title="Full Screen"
        >
          <i className="fas fa-expand fa-2x"></i>
        </button>
      ) : (
        <button
          onMouseEnter={onMouseEnterButton}
          onMouseLeave={onMouseLeaveButton}
          onClick={closeFullscreen}
          className="fullscreen exitFullscreen"
          style={hoverStyles}
          title="Exit full screen"
        >
          <i className="fas fa-compress fa-2x"></i>
        </button>
      )}
      <div
        className="images__container"
        style={{
          transform: `translateX(-${indexImage * 100}%)`,
          transition: transitionImgage ? `all 0.4s ease-in-out` : "",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ImagesSlider;
