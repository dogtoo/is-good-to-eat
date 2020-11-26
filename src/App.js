import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Main from "./Main";
import Order from "./Order";
import Login from "./Login";

import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import reducer, { initialState } from './reducer';

import "./App.css";

function App() {
  return (
    <AuthProvider initialState={initialState} reducer={reducer} className="app__container">
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Main} title="Main" />
          <PrivateRoute exact path="/order" component={Order} title="Order" />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
