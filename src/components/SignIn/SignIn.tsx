import React, { FC } from "react";
import Google from "../Google/Google";
import "./SignIn.css";
import { useSelector, useDispatch } from "react-redux";
import logoGoogle from "../../ImagesPngSvg/btn_google_signin_light_normal_web.png";
import DefaultAlbums from "../DefaultAlbums/DefaultAlbums";
import DefaultVidoes from "../DefaultVideos/DefaultVideos";
import Tabs from "../UI/Tabs/Tabs";
import Tab from "../UI/Tab/Tab";
import { setIndexTabAction } from "../../Actions/actionsApp";
import { AppType } from "../../Type/Type";
import { Link } from "react-router-dom";

const SignIn: FC = () => {
  const selectIndexTab = (state: AppType) => state.appState.indexTab;
  const indexTab = useSelector(selectIndexTab);

  //actions redux
  const dispatch = useDispatch();

  //onClickBtn
  const onClickBtn = (index: number) => {
    dispatch(setIndexTabAction(index));
  };

  return (
    <div className="sign_in">
      <Google />
      <h2 className="sign_in_title">Sign In With:</h2>
      <button id="sign-in-button-google">
        <img src={logoGoogle} alt={logoGoogle} />{" "}
      </button>
      <p className="sign_in_description">
        Click “Sign In” to agree to ImagesSlider acknowledge that ImagesSlider{" "}
        <Link to="/privacy-policy" className="footer_privacy-policy">
          Privacy Policy
        </Link>{" "}
        applies to you.
      </p>
      <Tabs activeIndex={indexTab} onClick={onClickBtn}>
        <Tab label="Albums">
          <DefaultAlbums />
        </Tab>
        <Tab label="Videos">
          <DefaultVidoes />
        </Tab>
      </Tabs>
    </div>
  );
};

export default SignIn;
