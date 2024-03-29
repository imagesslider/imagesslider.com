import React, { FC, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Images from "./components/Images/Images";
import Header from "./components/Header/Header";
import { AppType } from "./Type/Type";
import Footer from "./components/Footer/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
// import SpeechRecognition from "./components/SpeechRecognition/SpeechRecognition";
import SpeechRecognitionCommands from "./components/SpeechRecognitionCommands/SpeechRecognitionCommands";
import NotFound404 from "./components/NotFound404/NotFound404";
import Artist from "./components/Artist/Artist";
import SignIn from "./components/SignIn/SignIn";
import Home from "./components/Home/Home";
import { auth } from "./Firebase/Firebase";
import { setCurrentUserAction } from "./Actions/actionsApp";
import Users from "./components/Users/Users";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import CollectionPrivate from "./components/CollectionPrivate/CollectionPrivate";
import ImageSlider from "./components/ImageSlider/ImageSlider";
import ImagesPrivateSlider from "./components/ImagesPrivateSlider/ImagesPrivateSlider";
import SignUp from "./components/SignUp/SignUp";
import EditProfile from "./components/EditProfile/EditProfile";

const App: FC = () => {
  //state redux
  // const selectImages = (state: AppType) => state.appState.images;
  // const images = useSelector(selectImages);
  const selectCurrentUser = (state: AppType) => state.appState.currentUser;
  const currentUser = useSelector(selectCurrentUser);
  const selectInImage = (state: AppType) => state.appState.inImage;
  const inImage = useSelector(selectInImage);
  const selectUserIsLogged = (state: AppType) => state.appState.userIsLogged;
  const userIsLogged = useSelector(selectUserIsLogged);

  //actions redux
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(setCurrentUserAction(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        {!inImage && <Header />}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/users" exact component={Users} />
          <Route path="/users/:userID" exact component={UserDashboard} />
          <Route
            path="/users/:userID/edit-profile"
            exact
            component={userIsLogged ? EditProfile : SignIn}
          />
          <Route
            path="/users/:userID/images_private/:image_id/:image_index"
            component={ImagesPrivateSlider}
            exact
          />
          <Route
            path="/users/:userID/collection_private/:collection_private_id"
            component={CollectionPrivate}
            exact
          />
          <Route
            path="/users/:userID/collection_private/:collection_private_id/image/:image_id/:image_index"
            component={ImageSlider}
            exact
          />
          <Route path="/images" exact component={Images} />
          <Route path="/privacy-policy" exact component={PrivacyPolicy} />
          <Route
            path="/speech-recognition-commands"
            exact
            component={SpeechRecognitionCommands}
          />
          {!currentUser && <Route path="/signin" exact component={SignIn} />}
          <Route path="/signup" component={SignUp} />
          <Route path="/*" component={NotFound404} />
        </Switch>
        {/* {!inImage && <SpeechRecognition />} */}
        {!inImage && <Artist />}
        {!inImage && <Footer />}
      </div>
    </Router>
  );
};

export default App;
