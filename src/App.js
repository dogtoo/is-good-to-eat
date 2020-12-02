import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Main from "./Main";
import Order from "./Order";
import CheckOut from './CheckOut';
import Question from './Question';
import Login from "./Login";
import AuthStateChanged from './AuthStateChanged';

import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import reducer, { initialState } from './reducer';

import "./App.css";

function App() {
  return (
    <AuthProvider initialState={initialState} reducer={reducer} className="app__container">
      <Router>
        <div>
          <AuthStateChanged />
          <PrivateRoute exact path="/" component={Main} title="Main" />
          <PrivateRoute exact path="/order" component={Order} title="Order" />
          <PrivateRoute exact path="/checkout" component={CheckOut} title="CheckOut" />
          <PrivateRoute exact path="/question" component={Question} title="Question" />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
