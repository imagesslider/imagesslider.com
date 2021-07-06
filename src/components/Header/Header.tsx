import React, { FC, useEffect } from "react";
import "../Header/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DarkAndLightMode from "../UI/DarkAndLightMode/DarkAndLightMode";
import DropDown from "../UI/DropDown/DropDown";
import Logo from "../UI/Logo/Logo";
import SignOut from "../SignOut/SignOut";
import { AppType } from "../../Type/Type";
import { setUserIsLoggedAction } from "../../Actions/actionsApp";

const Header: FC = () => {
  //state redux
  // const selectRecognition = (state: SpeechRecognitionType) =>
  //   state.speechRecognition.recognition;
  // const recognition = useSelector(selectRecognition);
  const selectCurrentUser = (state: AppType) => state.appState.currentUser;
  const currentUser = useSelector(selectCurrentUser);
  const selectUserIsLogged = (state: AppType) => state.appState.userIsLogged;
  const userIsLogged = useSelector(selectUserIsLogged);

  //actions redux
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    const localUser = window.localStorage.getItem("userIsLogged");
    if (localUser) {
      dispatch(setUserIsLoggedAction(JSON.parse(localUser)));
    }
  }, [dispatch]);

  return (
    <header className="header">
      <div className="header_wrapper">
        <Link to="/">
          <Logo />
        </Link>
        <DropDown
          buttonTitle={
            userIsLogged !== null ? (
              userIsLogged?.first_name
            ) : (
              <i className="fas fa-ellipsis-v"></i>
            )
          }
        >
          <div className="header_dropDown_wrapper">
            <Link to="/users" className="header_link">
              Users
            </Link>
            {currentUser?.uid && (
              <Link to={`/users/${currentUser?.uid}`} className="header_link">
                View profile
              </Link>
            )}
            {/* {!!recognition && (
              <Link to="/speech-recognition-commands" className="header_link">
                Speech Recognition Commands
              </Link>
            )} */}
            <DarkAndLightMode />
            <SignOut />
          </div>
        </DropDown>
      </div>
    </header>
  );
};

export default Header;
