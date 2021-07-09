import React, { FC, useEffect, useState } from "react";
import "../NewCollectionFormPrivate/NewCollectionFormPrivate.css";
import { firestore } from "../../Firebase/Firebase";
import { useSelector } from "react-redux";
import { AppType } from "../../Type/Type";
import Error from "../UI/Error/Error";

type NewCollectionFormPrivateType = {
  userId?: string;
};

const NewCollectionFormPrivate: FC<NewCollectionFormPrivateType> = ({
  userId,
}) => {
  //state
  const [collectionPrivateName, setCollectionPrivateName] =
    useState<string>("");
  //collectionPrivateNameBlured
  const [collectionPrivateNameBlured, setCollectionPrivateNameBlured] =
    useState(false);
  //form submited
  const [formSubmitted, setFormSubmitted] = useState(false);
  //id
  const [id, setId] = useState<string>();

  //state redux
  const selectUserIsLogged = (state: AppType) => state.appState.userIsLogged;
  const userIsLogged = useSelector(selectUserIsLogged);

  //onCollectionPrivateNameChange
  const onCollectionPrivateNameChange = (e: any) => {
    setCollectionPrivateName(e.target.value);
  };

  //valid
  const collectionPrivateNameIsValid = () => {
    return collectionPrivateName && collectionPrivateName.length > 0;
  };

  //isError
  const isErrorCollectionPrivateName = () => {
    return (
      (formSubmitted || collectionPrivateNameBlured) &&
      !collectionPrivateNameIsValid()
    );
  };

  //handleSubmit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (collectionPrivateNameIsValid()) {
      try {
        await firestore
          .collection("collections_private")
          .doc(userId)
          .collection("collections_private")
          .add({
            ownner_id: userId,
            title: collectionPrivateName,
            created_at: new Date(),
            user: userIsLogged,
          })
          .then((docRef) => {
            setId(docRef.id);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        setFormSubmitted(false);
        setCollectionPrivateNameBlured(false);
        setCollectionPrivateName("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  //useEffect
  useEffect(() => {
    if (id) {
      firestore
        .collection("collections_private")
        .doc(userId)
        .collection("collections_private")
        .doc(id)
        .update({
          id: id,
        });
    }
  }, [id]);

  return (
    <form onSubmit={handleSubmit} className="new_collection_form_private">
      <input
        value={collectionPrivateName}
        onChange={onCollectionPrivateNameChange}
        onBlur={() => setCollectionPrivateNameBlured(true)}
        type="text"
        placeholder="Collection Name"
        className="new_collection_form_private_input"
      />
      {isErrorCollectionPrivateName() && (
        <Error title="The collection name is required" />
      )}
      <button
        type="submit"
        className="new_collection_form_private_button_submit"
      >
        Create collection
      </button>
    </form>
  );
};

export default NewCollectionFormPrivate;
