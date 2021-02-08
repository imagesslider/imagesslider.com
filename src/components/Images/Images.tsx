import React, { FC, useState } from "react";
import "../Images/Images.css";
import { useSelector, useDispatch } from "react-redux";
import ImagesSlider from "../UI/ImagesSlider/ImagesSlider";
import Spinner from "../UI/Spinner/Spinner";
import Image from "../UI/Image/Image";
import Video from "../UI/Video/Video";
import { autoSliderAction } from "../../Actions/actionsSlider";
import { AppType } from "../../Type/Type";
import NoContent from "../UI/NoContent/NoContent";

const Images: FC = () => {
  //state
  const [videotype] = useState<string>(
    "video/mp4" || "video/webm" || "video/ogg" || "video/avi"
  );
  //state redux
  const selectImages = (state: AppType) => state.appState.images;
  const images = useSelector(selectImages);
  const selectIsLoading = (state: AppType) => state.appState.isLoading;
  const isLoading = useSelector(selectIsLoading);

  //actions redux
  const dispatch = useDispatch();

  //onPlay
  const onPlay = () => {
    dispatch(autoSliderAction(false));
  };

  //onEnded
  const onEnded = () => {
    dispatch(autoSliderAction(true));
  };

  return (
    <>
      {isLoading && <Spinner />}
      {images.length === 0 ? (
        <NoContent title="No content available" showLinkBack />
      ) : (
        <ImagesSlider imagesArray={images}>
          {images.length === 0
            ? null
            : images.map((image) => {
                return (
                  <div key={image.id} className="images_wrapper">
                    <div className="images_content">
                      {image.userLink?.length !== 0 ? (
                        <a
                          href={image.userLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="images_link"
                        >
                          {image.user}
                        </a>
                      ) : (
                        <p className="images_description">{image.user}</p>
                      )}
                      {!!image.description && (
                        <p className="images_description">
                          {image.description}
                        </p>
                      )}
                    </div>
                    {image.videoType === videotype ? (
                      <Video
                        srcVideo={image.srcVideo}
                        onPlay={onPlay}
                        onEnded={onEnded}
                      />
                    ) : (
                      <Image src={image.src} alt={image.alt} />
                    )}
                  </div>
                );
              })}
        </ImagesSlider>
      )}
    </>
  );
};

export default Images;
