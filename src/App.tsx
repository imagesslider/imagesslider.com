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
        {!isLogged ? (
          <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/images" exact component={Images} />
            <Route path="/privacy-policy" exact component={PrivacyPolicy} />
          </Switch>
        ) : (
          <>
            <Switch>
              <Route path="/" exact component={Albums} />
              <Route path="/images" exact component={Images} />
              <Route path="/privacy-policy" exact component={PrivacyPolicy} />
            </Switch>
          </>
        )}
        {images.length === 0 && <Footer />}
      </div>
    </Router>
  );
};

export default App;
