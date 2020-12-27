import React, { FC } from "react";
import "../Header/Header.css";
import { useSelector } from "react-redux";
import DarkAndLightMode from "../UI/DarkAndLightMode/DarkAndLightMode";
import DropDown from "../UI/DropDown/DropDown";
import Logo from "../UI/Logo/Logo";
import SignOut from "../SignOut/SignOut";
import User from "../UI/User/User";
import UserImage from "../UI/UserImage/UserImage";
import { AppType, SpeechRecognitionType } from "../../Type/Type";
import { Link, NavLink } from "react-router-dom";

const Header: FC = () => {
  //state redux
  const selectIsLogged = (state: AppType) => state.appState.login.isLogged;
  const isLogged = useSelector(selectIsLogged);
  const selectUser = (state: AppType) => state.appState.login.user;
  const user = useSelector(selectUser);
  const selectRecognition = (state: SpeechRecognitionType) =>
    state.speechRecognition.recognition;
  const recognition = useSelector(selectRecognition);

  return (
    <header className="header">
      <div className="header_wrapper">
        <Link to="/">
          <Logo />
        </Link>
        {!!recognition && (
          <NavLink
            to="/speech-recognition-commands"
            className="header_navLInk"
            activeClassName="header_selected-navLink"
            exact
          >
            Speech Recognition Commands
          </NavLink>
        )}
        <DropDown
          buttonTitle={
            isLogged ? (
              <UserImage
                image={user.image}
                src={user.image}
                alt={user.image}
                title="Account"
              />
            ) : (
              <i className="fas fa-adjust" title="Theme"></i>
            )
          }
        >
          <div className="header_dropDown_wrapper">
            {isLogged && (
              <User
                image={user.image}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
              />
            )}
            <DarkAndLightMode />
            <SignOut />
          </div>
        </DropDown>
      </div>
    </header>
  );
};

export default Header;
