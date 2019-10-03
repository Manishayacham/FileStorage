import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import ListUser from "./components/ListUser";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  AutheticatedRoute
} from "react-router-dom";
import UploadFilePage from "./components/UploadFilePage";
import amplify from "aws-amplify";
import config from "./config";
import Loginpage from "./components/LoginPage";
import { Auth } from "aws-amplify";
import "bootstrap/dist/css/bootstrap.min.css";

amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});
ReactDOM.render(
  <BrowserRouter>
    <Route exact path="/" component={Loginpage} />
    <Route exact path="/list" component={ListUser} />
    <Route exact path="/upload" component={UploadFilePage} />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
