import React, { FC, useEffect, useState } from "react";
import "./EditModalCollectionPrivate.css";
import Modal from "../../UI/Modal/Modal";
import { firestore } from "../../../Firebase/Firebase";

type EditModalCollectionPrivateType = {
  title?: any;
  userID?: any;
  userCollectionId?: any;
};

const EditModalCollectionPrivate: FC<EditModalCollectionPrivateType> = ({
  title,
  userID,
  userCollectionId,
}) => {
  //state
  const [isOpen, setIsOpen] = useState(false);
  // single expense
  const [titleCollection, setTitleCollection] = useState("");

  //onMouseDownEdit
  const onMouseDownEdit = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpEdit
  const onMouseUpEdit = (event: any) => {
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
    setTitleCollection(title);
    setIsOpen(false);
  };

  //onClickSave
  const onClickSave = async () => {
    if (title !== titleCollection) {
      await firestore
        .collection("collections_private")
        .doc(userID)
        .collection("collections_private")
        .doc(userCollectionId)
        .update({
          title: titleCollection,
        })
        .then(() => {
          setIsOpen(false);
        });
    } else {
      setIsOpen(false);
    }
  };

  //onClickClose
  const onClickClose = () => {
    setTitleCollection(title);
    setIsOpen(false);
  };

  //handleChangeTitle
  const handleChangeTitle = (e: any) => {
    setTitleCollection(e.target.value);
  };

  //useEffect
  useEffect(() => {
    setTitleCollection(title);
  }, [title]);

  return (
    <div>
      <button
        onMouseUp={onMouseUpEdit}
        onMouseDown={onMouseDownEdit}
        className="edit_modal_button_collection_private"
        title="Edit Collection"
      >
        <i className="fas fa-pen edit_modal_fa-pen"></i>
      </button>
      {isOpen && (
        <Modal
          onMouseDownBackDrop={onMouseDownBackDrop}
          onMouseUpBackDrop={onMouseUpBackDrop}
        >
          <div className="edit_modal_header_collection_private">
            <h2>Edit Collection Private</h2>
          </div>
          <div className="form_group_edit_collection_private">
            <label htmlFor="expense">Collection Name:</label>
            <input
              type="text"
              className="form_control_edit_collection_private"
              id="titleCollection"
              name="titleCollection"
              placeholder="Title"
              value={titleCollection}
              onChange={handleChangeTitle}
            />
          </div>
          <div className="edit_modal_footer_collection_private">
            <button
              className="edit_modal_button_close_collection_private"
              onClick={onClickClose}
            >
              Close
            </button>
            <button
              className="edit_modal_button_save_collection_private"
              onClick={onClickSave}
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EditModalCollectionPrivate;
