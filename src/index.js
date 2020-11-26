import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Route, Link, Switch } from "react-router-dom";
//import Login from "./Login";
//import Order from "./Order";

ReactDOM.render(
  <React.StrictMode>
    {/*<Route>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/order">
          <Order />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Route>*/}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
