import React, { FC, useEffect, useState } from "react";
import "../Home/Home.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { firestore } from "../../Firebase/Firebase";
import { AppType } from "../../Type/Type";
import {
  isImageAction,
  setImages,
  setUserAction,
  setUserIsLoggedAction,
} from "../../Actions/actionsApp";
import DefaultAlbums from "../DefaultAlbums/DefaultAlbums";
import DefaultVidoes from "../DefaultVideos/DefaultVideos";
import Tabs from "../UI/Tabs/Tabs";
import Tab from "../UI/Tab/Tab";
import HowItWorks from "../HowItWorks/HowItWorks";
import Accordion from "../UI/Accordion/Accordion";
import Spinner from "../UI/Spinner/Spinner";

const Home: FC = () => {
  const [isOpenAccordion, setIsOpenAccordion] = useState<boolean>(false);
  const [indexTab, setIndexTab] = useState<number>(0);

  //state redux
  const selectIsLoading = (state: AppType) => state.appState.isLoading;
  const isLoading = useSelector(selectIsLoading);
  const selectCurrentUser = (state: AppType) => state.appState.currentUser;
  const currentUser = useSelector(selectCurrentUser);
  const selectUserIsLogged = (state: AppType) => state.appState.userIsLogged;
  const userIsLogged = useSelector(selectUserIsLogged);

  //actions redux
  const dispatch = useDispatch();

  //onClickBtn
  const onClickBtn = (index: number) => {
    setIndexTab(index);
  };

  //handleClickIsOpen
  const handleClickIsOpen = () => {
    setIsOpenAccordion(!isOpenAccordion);
  };

  //useEffect
  useEffect(() => {
    const localUser = window.localStorage.getItem("userIsLogged");
    if (localUser) {
      dispatch(setUserIsLoggedAction(JSON.parse(localUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(setImages([]));
  }, []);

  useEffect(() => {
    dispatch(isImageAction(false));
    if (currentUser?.uid !== undefined) {
      const unmount = firestore
        .collection("users")
        .doc(currentUser?.uid)
        .onSnapshot((snapshot) => {
          dispatch(setUserAction(snapshot.data()));
          dispatch(setUserIsLoggedAction(snapshot.data()));
          const dataUser: any = snapshot.data();
          window.localStorage.setItem("userIsLogged", JSON.stringify(dataUser));
        });
      return unmount;
    }
  }, [dispatch, currentUser]);

  return (
    <>
      {isLoading && <Spinner />}
      <div className="home">
        <Accordion
          title="How it works"
          isOpen={isOpenAccordion}
          handleClick={handleClickIsOpen}
        >
          <HowItWorks />
        </Accordion>
        {currentUser !== null ? (
          <div style={{ display: "flex" }}>
            <div className="sign_in_info_home">
              <h2 className="sign_in_info_home_w_back">Welcome:</h2>
              <h2 className="sign_in_info_home_title_user">
                {userIsLogged?.first_name}
              </h2>
              <Link
                to={`/users/${currentUser?.uid}`}
                className="sign_in_info_home_link"
              >
                View profile
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <div className="sign_in_info_home">
              <h2 className="sign_in_info_home_title">
                You can also run your collection connecting with your account.
              </h2>
              <Link to={`/signup`} className="sign_in_info_home_link">
                Sign Up
              </Link>
              <Link to={`/signin`} className="sign_in_info_home_link">
                Sign in
              </Link>
            </div>
          </div>
        )}
        <Tabs activeIndex={indexTab} onClick={onClickBtn}>
          <Tab label="Albums">
            <DefaultAlbums />
          </Tab>
          <Tab label="Videos">
            <DefaultVidoes />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Home;
