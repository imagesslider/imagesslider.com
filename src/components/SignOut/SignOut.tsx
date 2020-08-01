import React, { FC } from "react";
import "../SignOut/SignOut.css";
import { useSelector } from "react-redux";
import Google from "../Google/Google";
import { AppType } from "../../Type/Type";

const SignOut: FC = () => {
  //state redux
  const selectProvider = (state: AppType) => state.appState.login.provider;
  const provider = useSelector(selectProvider);
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
    </>
  );
};

export default SignOut;
