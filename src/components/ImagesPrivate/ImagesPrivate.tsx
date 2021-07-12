import React, { FC, useEffect, useState } from "react";
import "../ImagesPrivate/ImagesPrivate.css";
import { firestore, storage } from "../../Firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { setImages } from "../../Actions/actionsApp";
import { AppType } from "../../Type/Type";
import { useHistory } from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";
import AddToCollectionPrivate from "../Modals/AddToCollectionPrivate/AddToCollectionPrivate";
import DeleteButton from "../UI/DeleteButton/DeleteButton";
import NewImageFormPrivate from "../NewImageFormPrivate/NewImageFormPrivate";

type ImagesPrivateType = {
  user_id?: string;
};

const ImagesPrivate: FC<ImagesPrivateType> = ({ user_id }) => {
  //state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //state redux
  const selectImages = (state: AppType) => state.appState.images;
  const images = useSelector(selectImages);

  //actions redux
  const dispatch = useDispatch();

  //react-router-dom
  const history = useHistory();

  //onMouseDownLink
  const onMouseDownLink = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpLink
  const onMouseUpLink = (event: any, imageId: any, index: any) => {
    event.stopPropagation();
    history.push(`/users/${user_id}/images_private/${imageId}/${index}`);
  };

  //onMouseDownDelete
  const onMouseDownDelete = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpDelete
  const onMouseUpDelete = async (
    event: any,
    imageId: any,
    imageUrl: any,
    user_id: string | undefined
  ) => {
    event.stopPropagation();
    var r = window.confirm("Really delete?");
    if (r === true) {
      await firestore
        .collection("images_private")
        .doc(user_id)
        .collection("images")
        .doc(imageId)
        .delete();
      let pictureRef = await storage.refFromURL(imageUrl);
      await pictureRef.delete();
    }
  };

  //useEffect
  useEffect(() => {
    const unmount = firestore
      .collection("images_private")
      .doc(user_id)
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
  }, [dispatch, user_id]);

  //isLoading
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="images_private">
      <NewImageFormPrivate userId={user_id} />
      {images?.map((image, index) => {
        return (
          <div
            className="images_private_link"
            key={image?.id}
            onMouseDown={onMouseDownLink}
            onMouseUp={(event) => onMouseUpLink(event, image?.id, index)}
          >
            <img
              src={image?.url}
              alt={image?.url}
              className="images_private_img"
            />
            <div className="images_private_add_to_collection_private">
              <AddToCollectionPrivate user_id={user_id} image={image} />
            </div>
            <div className="images_private_delete_button">
              <DeleteButton
                title="Delete image"
                onMouseDown={onMouseDownDelete}
                onMouseUp={(event: any) =>
                  onMouseUpDelete(event, image?.id, image?.url, user_id)
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImagesPrivate;
