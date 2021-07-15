import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firestore, storage } from "../../Firebase/Firebase";
import { AppType } from "../../Type/Type";
import {
  isImageAction,
  setUserAction,
  setUserIsLoggedAction,
} from "../../Actions/actionsApp";
import "../EditProfile/EditProfile.css";
import ProgressBar from "../UI/ProgressBar/ProgressBar";
import Error from "../UI/Error/Error";
import Spinner from "../UI/Spinner/Spinner";
import UserPro from "../UI/UserPro/UserPro";

type EditProfileType = {
  match: any;
};

const EditProfile: FC<EditProfileType> = ({ match }) => {
  //ref
  const firstNameRef = useRef<any>();
  const lastNameRef = useRef<any>();

  //state
  const [file, setFile] = useState<any>(null);
  const [percentage, setPercentage] = useState<any>(null);
  const [onClickSave, setOnClickSave] = useState<any>(false);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userVisibility, setUserVisibility] = useState<string>("");
  const [isLoadingButtonSubmit, setIsLoadingButtonSubmit] =
    useState<boolean>(false);

  //types
  const types = ["image/png", "image/jpeg"];

  //state redux
  const selectUserIsLogged = (state: AppType) => state.appState.userIsLogged;
  const userIsLogged = useSelector(selectUserIsLogged);

  //actions redux
  const dispatch = useDispatch();

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
    const storageRef = storage.ref(`/${match?.params?.userID}`);
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
          .collection("users")
          .doc(match?.params?.userID)
          .update({
            user_image: await fileRef.getDownloadURL(),
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        setFile(null);
        setOnClickSave(false);
      }
    );
  };

  const onClickSubmit = async () => {
    if (
      firstNameRef.current.value !== userIsLogged?.first_name ||
      lastNameRef.current.value !== userIsLogged?.last_name ||
      userVisibility !== userIsLogged?.user_visibility
    ) {
      setIsLoadingButtonSubmit(true);
      await firestore
        .collection("users")
        .doc(match?.params?.userID)
        .update({
          first_name: firstNameRef.current.value,
          last_name: lastNameRef.current.value,
          user_visibility: userVisibility,
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      setIsLoadingButtonSubmit(false);
    }
  };

  //useEffect
  useEffect(() => {
    dispatch(isImageAction(false));
    const unmount = firestore
      .collection("users")
      .doc(match?.params?.userID)
      .onSnapshot((snapshot) => {
        dispatch(setUserAction(snapshot.data()));
        dispatch(setUserIsLoggedAction(snapshot.data()));
        const dataUser: any = snapshot.data();
        window.localStorage.setItem("userIsLogged", JSON.stringify(dataUser));
        setIsLoading(false);
      });
    return unmount;
  }, [
    userIsLogged?.user_image,
    userIsLogged?.first_name,
    userIsLogged?.last_name,
    userIsLogged?.user_visibility,
  ]);

  useEffect(() => {
    const localUser = window.localStorage.getItem("userIsLogged");
    if (localUser) {
      dispatch(setUserIsLoggedAction(JSON.parse(localUser)));
    }
  }, [dispatch]);

  //isLoading
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="edit_profile">
      <h2 className="edit_profile_title">Edit profile</h2>
      <div className="edit_profile_img_wrapper">
        {userIsLogged?.user_image?.length === 0 ? (
          <i
            className="fas fa-user-circle fa-8x"
            id="fa-user-circle_edit_profile"
          ></i>
        ) : (
          <img
            src={userIsLogged?.user_image}
            alt={userIsLogged?.user_image}
            className="edit_profile_img"
          />
        )}
        {file === null && (
          <label className="edit_profile_label_file">
            <input
              type="file"
              onChange={onFileChange}
              style={{ display: "none" }}
            />
            Change profile image
          </label>
        )}
        {file && <h4 className="edit_profile_file_name">{file.name}</h4>}
        {file && onClickSave && (
          <ProgressBar percentage={percentage} bgColor="#ffc107" />
        )}
        {file && (
          <button onClick={onSave} className="edit_profile_form_button_save">
            Save image
          </button>
        )}
        {error && <Error title={error} />}
      </div>
      <div className="edit_profile_input_group">
        <label className="edit_profile_label">First Name:</label>
        <input
          name="first_name"
          type="text"
          placeholder="First Name"
          className="edit_profile_input"
          ref={firstNameRef}
          defaultValue={userIsLogged?.first_name}
        />
      </div>
      <div className="edit_profile_input_group">
        <label className="edit_profile_label">Last Name:</label>
        <input
          name="last_name"
          type="text"
          placeholder="Last Name"
          className="edit_profile_input"
          ref={lastNameRef}
          defaultValue={userIsLogged?.last_name}
        />
      </div>
      <div className="user_visibility_select_wrapper">
        {userIsLogged?.user_pro ? (
          <>
            <label
              htmlFor="user_visibility_select"
              className="user_visibility_select_label"
            >
              User visibility:
            </label>
            <select
              name="pets"
              id="user_visibility_select"
              defaultValue={userIsLogged?.user_visibility}
              onChange={(event) => setUserVisibility(event?.target.value)}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </>
        ) : (
          <div>
            <h4 style={{ color: "#ffc107", textAlign: "center" }}>
              User visibility is a <UserPro /> feature.
            </h4>
            <h4 style={{ color: "#ffc107", textAlign: "center" }}>
              Contact us: contact@imagesslider.com
            </h4>
          </div>
        )}
      </div>
      {isLoadingButtonSubmit ? (
        <button
          className="edit_profile_buttonSubmit"
          disabled={isLoadingButtonSubmit}
        >
          Loading...
        </button>
      ) : (
        <button
          className="edit_profile_buttonSubmit"
          onClick={() => onClickSubmit()}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default EditProfile;
