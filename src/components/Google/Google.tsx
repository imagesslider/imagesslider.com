import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserAction, signInAndOutAction } from "../../Actions/actionsApp";
import {
  signInActionGoogle,
  signOutActionGoogle,
  setAlbumsActionGoogle,
  fetchAllImagesActionGoogle,
} from "../../Actions/actionsGoogle";
import { AppType } from "../../Type/Type";

const Google: FC = () => {
  //state redux
  const selectIsLogged = (state: AppType) => state.appState.login.isLogged;
  const isLogged = useSelector(selectIsLogged);
  const selectToken = (state: AppType) => state.appState.login.token;
  const token = useSelector(selectToken);
  const selectProvider = (state: AppType) => state.appState.login.provider;
  const provider = useSelector(selectProvider);
  const selectNextPageToken = (state: AppType) => state.appState.nextPageToken;
  const nextPageToken = useSelector(selectNextPageToken);
  const selectSignInAndOut = (state: AppType) => state.appState.signInAndOut;
  const signInAndOut = useSelector(selectSignInAndOut);
  //actions redux
  const dispatch = useDispatch();
  //state component
  let [GoogleAuth] = useState<any>();
  let [SCOPE] = useState<string>(
    "https://www.googleapis.com/auth/photoslibrary.readonly"
  );
  let [discoveryUrl] = useState<string>(
    "https://photoslibrary.googleapis.com/$discovery/rest?version=v1"
  );
  let [clientID] = useState<string>(
    "881637514135-ui7k8fcqiutlorlbad9dav1ovdvb34ij.apps.googleusercontent.com"
  );

  //gapi
  useEffect(() => {
    handleClientLoad();
  }, [signInAndOut]);

  const handleClientLoad = () => {
    window.gapi.load("client:auth2", initClient);
  };

  const initClient = () => {
    window.gapi.client
      .init({
        apiKey: process.env.REACT_APP_GOOGLE_APIKEY,
        clientId: clientID,
        discoveryDocs: [discoveryUrl],
        scope: SCOPE,
      })
      .then(() => {
        GoogleAuth = window.gapi.auth2.getAuthInstance();
        GoogleAuth.isSignedIn.listen(updateSigninStatus);
        setSigninStatus();
        const authSignInClick = document.getElementById(
          "sign-in-button-google"
        );
        authSignInClick?.addEventListener("click", () => {
          handleSignIn();
        });
        const authSignOutClick = document.getElementById(
          "sign-out-button-google"
        );
        authSignOutClick?.addEventListener("click", () => {
          handleSignOut();
        });
        if (signInAndOut === false) {
          handleSignOut();
        }
        if (signInAndOut === true) {
          handleSignIn();
        }
      });
  };

  const handleSignIn = () => {
    if (!GoogleAuth.isSignedIn.get()) {
      GoogleAuth.signIn();
    }
  };

  const handleSignOut = () => {
    if (GoogleAuth.isSignedIn.get()) {
      GoogleAuth.signOut();
      dispatch(signInAndOutAction(null));
    }
  };

  const setSigninStatus = () => {
    let user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
      dispatch(signInActionGoogle(user.tc.access_token));
      let userObject = {
        // image: user.wt.SJ,
        firstName: user.Qs.oT,
        lastName: user.Qs.kR,
        email: user.Qs.zt,
      };
      if (!!userObject) {
        dispatch(setUserAction(userObject));
      }
    } else {
      dispatch(signOutActionGoogle(null));
    }
  };

  const updateSigninStatus = () => {
    setSigninStatus();
  };

  useEffect(() => {
    if (isLogged && provider === "google") {
      dispatch(fetchAllImagesActionGoogle(token, nextPageToken));
      dispatch(setAlbumsActionGoogle(token as string));
    }
  }, [isLogged, provider, token, nextPageToken, dispatch]);

  return <></>;
};

export default Google;
