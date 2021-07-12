import React, { FC, useEffect, useState } from "react";
import "../AddToCollectionPrivate/AddToCollectionPrivate.css";
import { AppType } from "../../../Type/Type";
import { useSelector, useDispatch } from "react-redux";
import { firestore } from "../../../Firebase/Firebase";
import {
  setCollectionsPrivate,
  setIndexTabAction,
} from "../../../Actions/actionsApp";
import { CollectionsPrivateType } from "../../../Store/Store";
import Modal from "../../UI/Modal/Modal";

type AddToCollectionPrivateType = {
  user_id?: string;
  image?: any;
};

const AddToCollectionPrivate: FC<AddToCollectionPrivateType> = ({
  user_id,
  image,
}) => {
  //state
  const [isOpen, setIsOpen] = useState(false);
  const [saveToCollectionId, setSaveToCollectionId] = useState<string>("");
  const [imagesCollection, setImagesCollection] = useState<any>([]);

  // console.log("imagesCollection", imagesCollection);

  //state redux
  const selectCurrentUser = (state: AppType) => state.appState.currentUser;
  const currentUser = useSelector(selectCurrentUser);
  const selectCollectionsPrivate = (state: AppType) =>
    state.appState.collectionsPrivate;
  const collectionsPrivate = useSelector(selectCollectionsPrivate);

  //actions redux
  const dispatch = useDispatch();

  //onMouseDownAdd
  const onMouseDownAdd = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpAdd
  const onMouseUpAdd = (event: any) => {
    event.stopPropagation();
    setIsOpen(true);
  };

  //onMouseDownBackDrop
  const onMouseDownBackDrop = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpBackDrop
  const onMouseUpBackDrop = (event: any) => {
    event.stopPropagation();
    setIsOpen(false);
  };

  //onClickClose
  const onClickClose = () => {
    setIsOpen(false);
  };

  //onClickSaveAddToCollectionPrivate
  const onClickSaveAddToCollectionPrivate = async (
    collectionPrivateId: any,
    collectionPrivateTitle: any
  ) => {
    await firestore
      .collection("collections_private")
      .doc(user_id)
      .collection("collections_private")
      .doc(collectionPrivateId)
      .collection("images")
      .doc(image?.id)
      .set({
        id: image?.id,
        type: image?.type,
        url: image?.url,
        image: image?.image,
        owner_id: image?.owner_id,
        created_at: image?.created_at,
        name: image?.name,
        user: image?.user,
      })
      .then(() => {
        setSaveToCollectionId(collectionPrivateId);
      });
  };

  //onClickViewYourCollectionsPrivate
  const onClickViewYourCollectionsPrivate = () => {
    dispatch(setIndexTabAction(1));
    onClickClose();
  };

  //useEffect
  useEffect(() => {
    if (user_id === currentUser?.uid) {
      const unmount = firestore
        .collection("collections_private")
        .doc(user_id)
        .collection("collections_private")
        .onSnapshot((snapshot) => {
          let userCollections = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          dispatch(setCollectionsPrivate(userCollections));
        });
      return unmount;
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (user_id === currentUser?.uid && saveToCollectionId?.length !== 0) {
      const unmount = firestore
        .collection("collections_private")
        .doc(user_id)
        .collection("collections_private")
        .doc(saveToCollectionId)
        .collection("images")
        .onSnapshot((snapshot) => {
          let userCollections = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setImagesCollection(userCollections);
        });
      return unmount;
    }
  }, [saveToCollectionId]);

  useEffect(() => {
    if (user_id === currentUser?.uid && saveToCollectionId?.length !== 0) {
      firestore
        .collection("collections_private")
        .doc(user_id)
        .collection("collections_private")
        .doc(saveToCollectionId)
        .update({
          images_length: imagesCollection?.length,
        });
    }
  }, [saveToCollectionId, imagesCollection]);

  return (
    <div>
      <button
        onMouseUp={onMouseUpAdd}
        onMouseDown={onMouseDownAdd}
        className="modal_button_add_to_collections_private"
        title="Add to Collection Private"
      >
        <i className="fas fa-plus-square" style={{ fontSize: "32px" }}></i>
      </button>
      {isOpen && (
        <Modal
          onMouseUpBackDrop={onMouseUpBackDrop}
          onMouseDownBackDrop={onMouseDownBackDrop}
        >
          <div className="modal_header_add_to_collection_private">
            <h2>Add To Collection Private</h2>
          </div>
          <div className="modal_content_add_to_collection_private">
            {collectionsPrivate.length === 0 ? (
              <button
                className="modal_button_view_your_collections_private"
                onClick={onClickViewYourCollectionsPrivate}
              >
                Please, create collection private
              </button>
            ) : (
              <>
                {collectionsPrivate.map(
                  (collectionPrivate: CollectionsPrivateType) => {
                    return (
                      <div
                        key={collectionPrivate?.id}
                        className="modal_content_inner_add_to_collection_private"
                      >
                        <div>
                          <h2 className="modal_content_inner_add_to_collection_private_title">
                            {collectionPrivate?.title}
                          </h2>
                          <h4>
                            {collectionPrivate?.images_length === 1
                              ? `${collectionPrivate?.images_length} Image`
                              : `${collectionPrivate?.images_length} Images`}
                          </h4>
                        </div>
                        {saveToCollectionId === collectionPrivate?.id ? (
                          <i
                            className="fas fa-check-square fa-2x"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <button
                            className="modal_button_add_to_collection_private"
                            onClick={() =>
                              onClickSaveAddToCollectionPrivate(
                                collectionPrivate?.id,
                                collectionPrivate?.title
                              )
                            }
                          >
                            {" "}
                            <i className="fas fa-plus-square fa-2x"></i>
                          </button>
                        )}
                      </div>
                    );
                  }
                )}
              </>
            )}
          </div>
          {collectionsPrivate.length !== 0 && (
            <button
              className="modal_button_view_your_collections_private"
              onClick={onClickViewYourCollectionsPrivate}
            >
              View your collections private
            </button>
          )}
          <div className="modal_footer_add_to_collection_private">
            <button
              className="modal_button_close_add_to_collection_private"
              onClick={onClickClose}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AddToCollectionPrivate;
