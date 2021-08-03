import React, { useState, useEffect } from "react";
import "./ImagesSlider.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearImagesAction,
  setTotalPagesAction,
  setNoContentAction,
  setTotalPagesCollectionsAction,
  setCollectionsPrivate,
  setNextPageToken,
  setFullScreenAction,
  isImageAction,
} from "../../../Actions/actionsApp";
import {
  autoSliderAction,
  intervalTimeSliderAction,
} from "../../../Actions/actionsSlider";
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
import SpeechRecognition from "../../SpeechRecognition/SpeechRecognition";

type ImagesSliderProps = {
  children?: React.ReactNode;
  imagesArray?: any;
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
  //Mouse event
  const [mouseDown, setMouseDown] = useState<number>(0);
  const [mouseMove, setMouseMove] = useState<number>(0);
  const [isMouseMove, setIsMouseMove] = useState<boolean>(false);
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false);
  //Touch event
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchMove, setTouchMove] = useState<number>(0);
  const [isTouchMove, setIsTouchMove] = useState<boolean>(false);
  //state redux
  const selectAutoSlider = (state: SliderType) => state.slider.autoSlider;
  const autoSlider = useSelector(selectAutoSlider);
  const selectIntervalTime = (state: SliderType) => state.slider.intervalTime;
  const intervalTime = useSelector(selectIntervalTime);
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

  //SpeechRecognition and inImage
  useEffect(() => {
    dispatch(inImagesAction(true));
    dispatch(isImageAction(true));
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
    } else {
      setTransitionImgage(true);
      setIndexImage(indexImage + 1);
    }
  };

  //onMouseDownPrev
  const onMouseDownNext = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpPrev
  const onMouseUpNext = (event: any) => {
    event.stopPropagation();
    onClickNext();
  };

  //onClickPrev
  const onClickPrev = () => {
    setIndexImage(indexImage - 1);
  };

  //onMouseDownPrev
  const onMouseDownPrev = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpPrev
  const onMouseUpPrev = (event: any) => {
    event.stopPropagation();
    onClickPrev();
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
    dispatch(setCollectionsPrivate([]));
    dispatch(setNextPageToken(""));
    dispatch(setFullScreenAction(false));
    dispatch(inImagesAction(false));
    dispatch(isImageAction(false));
    history.push("/");
  };

  //onMouseDownBack
  const onMouseDownBack = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpBack
  const onMouseUpBack = (event: any) => {
    event.stopPropagation();
    onClickBack();
  };

  //onClickPause
  const onClickPause = () => {
    dispatch(autoSliderAction(false));
  };

  //onMouseDownPause
  const onMouseDownPause = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpPause
  const onMouseUpPause = (event: any) => {
    event.stopPropagation();
    onClickPause();
  };

  //onClickPlay
  const onClickPlay = () => {
    dispatch(autoSliderAction(true));
  };

  //onMouseDownPlay
  const onMouseDownPlay = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpPlay
  const onMouseUpPlay = (event: any) => {
    event.stopPropagation();
    onClickPlay();
  };

  //onDragStart
  const onDragStart = (event: any) => {
    event.preventDefault();
  };

  //onMouseDown
  const onMouseDown = (event: any) => {
    setMouseDown(event.pageX);
    setIsGrabbing(true);
  };

  //onMouseMove
  const onMouseMove = (event: any) => {
    setMouseMove(event.pageX);
    setIsMouseMove(true);
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

  //onMouseUp
  const onMouseUp = () => {
    if (
      mouseDown > mouseMove &&
      indexImage === imagesArray.length - 1 &&
      isMouseMove
    ) {
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
    } else if (
      mouseDown > mouseMove &&
      indexImage !== imagesArray.length - 1 &&
      isMouseMove
    ) {
      setTransitionImgage(true);
      setIndexImage(indexImage + 1);
    } else if (mouseDown < mouseMove && indexImage !== 0 && isMouseMove) {
      setTransitionImgage(true);
      setIndexImage(indexImage - 1);
    }
    setIsMouseMove(false);
    setIsGrabbing(false);
  };

  //onMouseEnterButton
  const onMouseEnterButton = () => {
    setButtonHover(true);
  };

  //onMouseLeaveButton
  const onMouseLeaveButton = () => {
    setButtonHover(false);
  };

  //onTouchStart
  const onTouchStart = (event: any) => {
    event.stopPropagation();
    setTouchStart(event.touches[0].clientX);
    setHover(true);
    setButtonHover(true);
  };

  //onTouchMove
  const onTouchMove = (event: any) => {
    event.stopPropagation();
    setTouchMove(event.touches[0].clientX);
    setIsTouchMove(true);
  };

  //onTouchEnd
  const onTouchEnd = (event: any) => {
    event.stopPropagation();
    if (
      touchStart > touchMove &&
      indexImage === imagesArray.length - 1 &&
      isTouchMove
    ) {
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
    } else if (
      touchStart > touchMove &&
      indexImage !== imagesArray.length - 1 &&
      isTouchMove
    ) {
      setTransitionImgage(true);
      setIndexImage(indexImage + 1);
    } else if (touchStart < touchMove && indexImage !== 0 && isTouchMove) {
      setTransitionImgage(true);
      setIndexImage(indexImage - 1);
    }
    setIsTouchMove(false);
    setHover(false);
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

  //onMouseDownOpenFullscreen
  const onMouseDownOpenFullscreen = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpOpenFullscreen
  const onMouseUpOpenFullscreen = (event: any) => {
    event.stopPropagation();
    openFullscreen();
  };

  /* Close fullscreen */
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      dispatch(setFullScreenAction(false));
    }
  };

  //onMouseDownCloseFullscreen
  const onMouseDownCloseFullscreen = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpCloseFullscreen
  const onMouseUpCloseFullscreen = (event: any) => {
    event.stopPropagation();
    closeFullscreen();
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

  //onMouseDownRangeSlider
  const onMouseDownRangeSlider = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpRangeSlider
  const onMouseUpRangeSlider = (event: any) => {
    event.stopPropagation();
  };

  //hoverStyles
  const hoverStyles = {
    opacity: hover || buttonHover || isListening ? "1" : "0",
  };

  return (
    <div
      className="images__wrapper"
      onDragStart={onDragStart}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      style={{
        cursor: isGrabbing ? "grabbing" : "grab",
      }}
    >
      {inImages && <SpeechRecognition style={hoverStyles} />}
      {!isListening && (
        <i
          className="fas fa-arrow-left back  fa-2x"
          onMouseEnter={onMouseEnterButton}
          onMouseLeave={onMouseLeaveButton}
          onMouseDown={onMouseDownBack}
          onMouseUp={onMouseUpBack}
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
          onMouseDown={onMouseDownRangeSlider}
          onMouseUp={onMouseUpRangeSlider}
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
          onMouseDown={onMouseDownPause}
          onMouseUp={onMouseUpPause}
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
          onMouseDown={onMouseDownPlay}
          onMouseUp={onMouseUpPlay}
          style={hoverStyles}
          title="Play auto slider"
        >
          <i className="far fa-play-circle fa-2x"></i>
        </button>
      )}
      <button
        onMouseEnter={onMouseEnterButton}
        onMouseLeave={onMouseLeaveButton}
        onMouseDown={onMouseDownPrev}
        onMouseUp={onMouseUpPrev}
        className={indexImage === 0 ? "isDisabled" : "button prev"}
        style={hoverStyles}
      >
        <i className="fas fa-chevron-left fa-2x"></i>
      </button>
      <button
        onMouseEnter={onMouseEnterButton}
        onMouseLeave={onMouseLeaveButton}
        onMouseDown={onMouseDownNext}
        onMouseUp={onMouseUpNext}
        className={images.length !== 1 ? "button next" : "isDisabled"}
        style={hoverStyles}
      >
        <i className="fas fa-chevron-right fa-2x"></i>
      </button>
      {!fullscreen ? (
        <button
          onMouseEnter={onMouseEnterButton}
          onMouseLeave={onMouseLeaveButton}
          onMouseDown={onMouseDownOpenFullscreen}
          onMouseUp={onMouseUpOpenFullscreen}
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
          onMouseDown={onMouseDownCloseFullscreen}
          onMouseUp={onMouseUpCloseFullscreen}
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
