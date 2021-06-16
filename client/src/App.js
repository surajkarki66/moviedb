import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./components/UI/Navbar/NavBar";
import SignUp from "./containers/Auth/SignUp/SignUp";
import SignIn from "./containers/Auth/SignIn/SignIn";
import HomePage from "./containers/HomePage/HomePage";
import DetailPage from "./containers/MovieDetail/MovieDetail";
import FavoritePage from "./containers/FavoritePage/FavoritePage";
import Footer from "./components/UI/Footer/Footer";
import Auth from "./hoc/Auth";

const App = () => {
  const routes = (
    <Switch>
      <Route exact path="/" component={Auth(HomePage, null)} />
      <Route exact path="/register" component={Auth(SignUp, false)} />
      <Route exact path="/login" component={Auth(SignIn, false)} />
      <Route exact path="/favorite" component={Auth(FavoritePage, null)} />
      <Route exact path="/movie/:movieId" component={Auth(DetailPage, null)} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <React.Fragment>
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Navbar />
        {routes}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default App;
