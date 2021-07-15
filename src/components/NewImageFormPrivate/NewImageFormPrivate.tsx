import React, { FC, useEffect, useState } from "react";
import "../NewImageFormPrivate/NewImageFormPrivate.css";
import { firestore, storage } from "../../Firebase/Firebase";
import Error from "../UI/Error/Error";
import ProgressBar from "../UI/ProgressBar/ProgressBar";
import { useSelector } from "react-redux";
import { AppType } from "../../Type/Type";

type NewImageFormPrivateType = {
  userId?: string;
};

const NewImageFormPrivate: FC<NewImageFormPrivateType> = ({ userId }) => {
  //state
  const [file, setFile] = useState<any>(null);
  const [percentage, setPercentage] = useState<any>(null);
  const [onClickSave, setOnClickSave] = useState<any>(false);
  const [error, setError] = useState<any>(null);
  const [id, setId] = useState<string>();

  //types
  const types = ["image/png", "image/jpeg"];

  //state redux
  const selectUserIsLogged = (state: AppType) => state.appState.userIsLogged;
  const userIsLogged = useSelector(selectUserIsLogged);

  //onFileChange
  const onFileChange = (e: any) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpg)");
    }
  };

  //onSave
  const onSave = async () => {
    setOnClickSave(true);
    const storageRef = storage.ref(`/${userId}`);
    const fileRef = storageRef.child(file.name);

    fileRef.put(file).on(
      "state_changed",
      (snap: any) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setPercentage(percentage);
      },
      (err: any) => {
        setError(err);
      },
      async () => {
        await firestore
          .collection("images_private")
          .doc(userId)
          .collection("images")
          .add({
            name: file.name,
            url: await fileRef.getDownloadURL(),
            type: file.type,
            owner_id: userId,
            created_at: new Date(),
            image: "private",
            user: userIsLogged,
          })
          .then((docRef) => {
            setId(docRef.id);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        setFile(null);
        setOnClickSave(false);
      }
    );
  };

  //useEffect
  useEffect(() => {
    if (id) {
      firestore
        .collection("images_private")
        .doc(userId)
        .collection("images")
        .doc(id)
        .update({
          id: id,
        });
    }
  }, [id, userId]);

  return (
    <div className="new_image_form_private">
      <label>
        <input
          type="file"
          onChange={onFileChange}
          style={{ display: "none" }}
        />
        <i
          className="fas fa-plus-circle new_image_form_private_fa-plus-circle fa-3x"
          title="Add image"
        ></i>
      </label>
      {file && <h4>{file.name}</h4>}
      {file && onClickSave && (
        <ProgressBar percentage={percentage} bgColor="#000" />
      )}
      {file && (
        <button onClick={onSave} className="new_image_form_private_button">
          Save image
        </button>
      )}
      {error && <Error title={error} />}
    </div>
  );
};

export default NewImageFormPrivate;
