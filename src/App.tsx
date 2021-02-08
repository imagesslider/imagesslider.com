import React, { FC } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Albums from "./components/Albums/Albums";
import Images from "./components/Images/Images";
import Header from "./components/Header/Header";
import SignIn from "./components/SignIn/SignIn";
import { AppType } from "./Type/Type";
import Footer from "./components/Footer/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import SpeechRecognition from "./components/SpeechRecognition/SpeechRecognition";
import SpeechRecognitionCommands from "./components/SpeechRecognitionCommands/SpeechRecognitionCommands";
import NotFound404 from "./components/NotFound404/NotFound404";
import Artist from "./components/Artist/Artist";

const App: FC = () => {
  //state redux
  const selectIsLogged = (state: AppType) => state.appState.login.isLogged;
  const isLogged = useSelector(selectIsLogged);
  const selectImages = (state: AppType) => state.appState.images;
  const images = useSelector(selectImages);

  return (
    <Router>
      <div className="App">
        {images.length === 0 && <Header />}
        <Switch>
          <Route path="/" exact component={!isLogged ? SignIn : Albums} />
          <Route path="/images" exact component={Images} />
          <Route path="/privacy-policy" exact component={PrivacyPolicy} />
          <Route
            path="/speech-recognition-commands"
            exact
            component={SpeechRecognitionCommands}
          />
          <Route component={NotFound404} />
        </Switch>
        {images.length === 0 && <SpeechRecognition />}
        {images.length === 0 && <Artist />}
        {images.length === 0 && <Footer />}
      </div>
    </Router>
  );
};

export default App;
