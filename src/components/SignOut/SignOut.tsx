import React, { FC } from "react";
import "../SignOut/SignOut.css";
import { useDispatch, useSelector } from "react-redux";
import Google from "../Google/Google";
import { auth } from "../../Firebase/Firebase";
import { AppType } from "../../Type/Type";
import {
  setCollectionPrivate,
  setCollectionsPrivate,
  setImages,
  setUserAction,
  setUserIsLoggedAction,
} from "../../Actions/actionsApp";
import { useHistory } from "react-router-dom";

const SignOut: FC = () => {
  //state redux
  const selectProvider = (state: AppType) => state.appState.login.provider;
  const provider = useSelector(selectProvider);
  const selectCurrentUser = (state: AppType) => state.appState.currentUser;
  const currentUser = useSelector(selectCurrentUser);

  //actions redux
  const dispatch = useDispatch();

  //react-router-dom
  const history = useHistory();

  //logout
  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
    dispatch(setCollectionsPrivate([]));
    dispatch(setCollectionPrivate([]));
    dispatch(setImages([]));
    dispatch(setUserAction(null));
    dispatch(setUserIsLoggedAction(null));
    window.localStorage.removeItem("userIsLogged");
    history.push("/");
  };

  return (
    <>
      {provider === "google" && (
        <>
          <Google />
          <button id="sign-out-button-google">
            <i className="fas fa-sign-out-alt fa-2x"></i> <p>Sign Out</p>
          </button>
        </>
      )}
      {currentUser?.uid && (
        <button onClick={() => logout()} id="sign-out-button">
          {" "}
          <i className="fas fa-sign-out-alt fa-2x"></i> <p>Sign Out</p>
        </button>
      )}
    </>
  );
};

export default SignOut;
