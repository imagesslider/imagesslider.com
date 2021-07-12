import React, { FC, useEffect, useState } from "react";
import "../CollectionPrivate/CollectionPrivate.css";
import { firestore } from "../../Firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  isImageAction,
  setCollectionPrivate,
  setImages,
} from "../../Actions/actionsApp";
import { AppType } from "../../Type/Type";
import Spinner from "../UI/Spinner/Spinner";
import DeleteButton from "../UI/DeleteButton/DeleteButton";

type CollectionPrivateType = {
  match: any;
};

const CollectionPrivate: FC<CollectionPrivateType> = ({ match }) => {
  //state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //state redux
  const selectCollectionPrivate = (state: AppType) =>
    state.appState.collectionPrivate;
  const collectionPrivate = useSelector(selectCollectionPrivate);
  const selectImages = (state: AppType) => state.appState.images;
  const images = useSelector(selectImages);

  //types
  const types = ["video/mp4", "video/webm", "video/ogg", "video/avi"];

  //actions redux
  const dispatch = useDispatch();

  //react-router-dom
  const history = useHistory();

  //onClickBack
  const onClickBack = () => {
    history.push(`/users/${match?.params?.userID}`);
  };

  //onMouseDownLink
  const onMouseDownLink = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpLink
  const onMouseUpLink = (
    event: any,
    collectionPrivateImageId: any,
    index: any
  ) => {
    event.stopPropagation();
    history.push(
      `/users/${match?.params?.userID}/collection_private/${match?.params?.collection_private_id}/image/${collectionPrivateImageId}/${index}`
    );
  };

  //onMouseDownDelete
  const onMouseDownDelete = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpDelete
  const onMouseUpDelete = async (event: any, imageId: any) => {
    event.stopPropagation();
    var r = window.confirm("Really delete?");
    if (r === true) {
      await firestore
        .collection("collections_private")
        .doc(match?.params?.userID)
        .collection("collections_private")
        .doc(match?.params?.collection_private_id)
        .collection("images")
        .doc(imageId)
        .delete();
    }
  };

  //useEffect
  useEffect(() => {
    dispatch(isImageAction(false));
    const unmount = firestore
      .collection("collections_private")
      .doc(match?.params?.userID)
      .collection("collections_private")
      .doc(match?.params?.collection_private_id)
      .onSnapshot((snapshot) => {
        let data = Object.assign(snapshot.data(), {
          id: match?.params?.collection_private_id,
        });
        dispatch(setCollectionPrivate(data));
        setIsLoading(false);
      });
    return unmount;
  }, [dispatch, match]);

  useEffect(() => {
    const unmount = firestore
      .collection("collections_private")
      .doc(match?.params?.userID)
      .collection("collections_private")
      .doc(match?.params?.collection_private_id)
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
  }, [dispatch, match]);

  useEffect(() => {
    const updated = async () => {
      await firestore
        .collection("collections_private")
        .doc(match?.params?.userID)
        .collection("collections_private")
        .doc(match?.params?.collection_private_id)
        .update({
          images_length: images?.length,
        });
    };
    updated();
  }, [dispatch, match, images]);

  //isLoading
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="collection_private">
      <div className="collection_private_back">
        <i
          className="fas fa-chevron-circle-left collection_private_back_i fa-2x"
          title="Back"
          onClick={() => onClickBack()}
        ></i>
      </div>
      <div className="collection_private_container">
        <div>
          <h1 className="collection_private_title">
            {collectionPrivate?.title}
          </h1>
          <h4 className="collection_private_imagesLength">
            {images?.length === 1
              ? `${images?.length} Image`
              : `${images?.length} Images`}
          </h4>
        </div>
      </div>
      <div className="collection_private_images">
        {images?.map((collectionPrivateImage: any, index: number) => {
          return (
            <div
              className="collection_private_link"
              key={collectionPrivateImage?.id}
              onMouseDown={onMouseDownLink}
              onMouseUp={(event) =>
                onMouseUpLink(event, collectionPrivateImage?.id, index)
              }
            >
              <div className="collection_private_link">
                {types.includes(collectionPrivateImage?.type) ? (
                  <div className="collection_private_video_type">
                    <div>
                      <i className="fas fa-video fa-2x"></i> is:
                      <h2 className="collection_private_video_type_description">
                        {collectionPrivateImage?.description}
                      </h2>
                    </div>
                  </div>
                ) : (
                  <img
                    src={collectionPrivateImage?.url}
                    alt={collectionPrivateImage?.url}
                    className="collection_private_img"
                  />
                )}
                <div className="collection_private_inner">
                  <h2 className="collections_private_description">
                    {types.includes(collectionPrivateImage?.type)
                      ? `Video is: ${collectionPrivateImage?.description}`
                      : collectionPrivateImage?.description}
                  </h2>
                </div>
                <div className="collection_private_inner_button_wrapper">
                  <DeleteButton
                    title="Remove from collection private"
                    onMouseDown={onMouseDownDelete}
                    onMouseUp={(event: any) =>
                      onMouseUpDelete(event, collectionPrivateImage?.id)
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionPrivate;
