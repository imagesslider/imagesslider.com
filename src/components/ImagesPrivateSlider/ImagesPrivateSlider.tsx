import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  isImageAction,
  setFullScreenAction,
  setImages,
} from "../../Actions/actionsApp";
import { autoSliderAction } from "../../Actions/actionsSlider";
import { AppType, SliderType } from "../../Type/Type";
import { firestore } from "../../Firebase/Firebase";
import Video from "../UI/Video/Video";
import Spinner from "../UI/Spinner/Spinner";
import NotFound404 from "../NotFound404/NotFound404";

type ImagesPrivateSliderType = {
  match?: any;
};

const ImagesPrivateSlider: FC<ImagesPrivateSliderType> = ({ match }) => {
  //state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [image, setImage] = useState<any>();
  const [onClickIsTrue, setOnClickIsTrue] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  let [hoverTimeout, setHoverTimeout] = useState<number>(0);
  //types
  const types = ["video/mp4", "video/webm", "video/ogg", "video/avi"];

  //state redux
  const selectImages = (state: AppType) => state.appState.images;
  const images = useSelector(selectImages);
  const selectAutoSlider = (state: SliderType) => state.slider.autoSlider;
  const autoSlider = useSelector(selectAutoSlider);
  const selectFullScreen = (state: AppType) => state.appState.fullscreen;
  const fullscreen = useSelector(selectFullScreen);
  const selectIntervalTime = (state: SliderType) => state.slider.intervalTime;
  const intervalTime = useSelector(selectIntervalTime);
  const selectCurrentUser = (state: AppType) => state.appState.currentUser;
  const currentUser = useSelector(selectCurrentUser);

  //state
  const [imageIndex, setImageIndex] = useState<number>(
    parseInt(match?.params?.image_index)
  );

  //actions redux
  const dispatch = useDispatch();

  //react-router-dom
  const history = useHistory();

  //onClickNext
  const onClickNext = () => {
    if (imageIndex === images?.length - 1) {
      setImageIndex(0);
    } else {
      setImageIndex((prevState) => prevState + 1);
    }
    setOnClickIsTrue(true);
  };

  //onClickPrev
  const onClickPrev = () => {
    setImageIndex((prevState) => prevState - 1);
    setOnClickIsTrue(true);
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
  const onMouseMove = (event: any) => {
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

  //onClickBack
  const onClickBack = () => {
    clearTimeout(hoverTimeout);
    dispatch(setFullScreenAction(false));
    dispatch(isImageAction(false));
    if (match?.params?.userID === currentUser?.uid) {
      history.push(`/users/${match?.params?.userID}`);
    } else {
      history.push("/");
    }
  };

  //onPlay
  const onPlay = () => {
    dispatch(autoSliderAction(false));
  };

  //onEnded
  const onEnded = () => {
    dispatch(autoSliderAction(true));
  };

  //useEffect
  useEffect(() => {
    if (images?.length === 0) {
      setImageIndex(parseInt(match?.params?.image_index));
      const unmount = firestore
        .collection("images_private")
        .doc(match?.params?.userID)
        .collection("images")
        .onSnapshot((snapshot) => {
          let images = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          dispatch(setImages(images));
          setIsLoading(false);
        });
      return unmount;
    }
  }, []);

  useEffect(() => {
    if (onClickIsTrue) {
      history.push(
        `/users/${match?.params?.userID}/images_private/${images[imageIndex]?.id}/${imageIndex}`
      );
      setOnClickIsTrue(false);
    }
  }, [onClickIsTrue]);

  useEffect(() => {
    dispatch(isImageAction(true));
    const unmount = firestore
      .collection("images_private")
      .doc(match?.params?.userID)
      .collection("images")
      .doc(match?.params?.image_id)
      .onSnapshot((snapshot) => {
        setImage(snapshot.data());
        setIsLoading(false);
      });
    return unmount;
  }, [match?.params?.image_id]);

  //useEffect auto slider
  useEffect(() => {
    let sliderInterval: any;
    if (autoSlider && !hover) {
      sliderInterval = setInterval(onClickNext, intervalTime);
    }
    return () => {
      clearInterval(sliderInterval);
    };
  }, [autoSlider, imageIndex, hover]);

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

  //hoverStyles
  const hoverStyles = {
    opacity: hover ? "1" : "0",
  };

  //isLoading
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {image !== undefined ? (
        <div className="image_slider_wrapper" onMouseMove={onMouseMove}>
          {types.includes(image?.type) ? (
            <Video
              srcVideo={image?.url}
              onPlay={onPlay}
              onEnded={onEnded}
              autoPlay={true}
              muted={true}
            />
          ) : (
            <img
              src={image?.url}
              alt={image?.url}
              className="image_slider_img"
            />
          )}
          <button
            onClick={() => onClickPrev()}
            className={
              imageIndex === 0 ? "isDisabled" : "button_image_slider prev"
            }
            title="Previous"
            style={hoverStyles}
          >
            <i className="fas fa-chevron-left fa-2x"></i>
          </button>
          <button
            onClick={() => onClickNext()}
            className={
              images.length !== 1 ? "button_image_slider next" : "isDisabled"
            }
            title="Next"
            style={hoverStyles}
          >
            <i className="fas fa-chevron-right fa-2x"></i>
          </button>
          {autoSlider ? (
            <button
              className={images.length !== 1 ? "button-pause" : "isDisabled"}
              style={hoverStyles}
              title="Pause auto slider"
              onClick={() => onClickPause()}
            >
              <i className="far fa-pause-circle fa-2x"></i>
            </button>
          ) : (
            <button
              className={images.length !== 1 ? "button-pause" : "isDisabled"}
              style={hoverStyles}
              title="Play auto slider"
              onClick={() => onClickPlay()}
            >
              <i className="far fa-play-circle fa-2x"></i>
            </button>
          )}
          <i
            className="fas fa-arrow-left back  fa-2x"
            onClick={() => onClickBack()}
            style={hoverStyles}
            title="Back"
          ></i>
          {!fullscreen ? (
            <button
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
              onMouseDown={onMouseDownCloseFullscreen}
              onMouseUp={onMouseUpCloseFullscreen}
              className="fullscreen exitFullscreen"
              style={hoverStyles}
              title="Exit full screen"
            >
              <i className="fas fa-compress fa-2x"></i>
            </button>
          )}
        </div>
      ) : (
        <NotFound404 />
      )}
    </>
  );
};

export default ImagesPrivateSlider;
