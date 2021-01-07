import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./Main";
import Order from "./Order";
import CheckOut from "./CheckOut";
import Question from "./Question";
import Login from "./Login";
import MealsAnalysis from "./MealsAnalysis";
import AuthStateChanged from "./AuthStateChanged";

import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import reducer, { initialState } from "./reducer";

import "./App.css";

function App() {
  return (
    <AuthProvider
      initialState={initialState}
      reducer={reducer}
      className="app__container"
    >
      <Router>
        <div>
          {/*<AuthStateChanged />*/}
          <PrivateRoute exact path="/" component={Main} title="Main" />
          <PrivateRoute exact path="/order" component={Order} title="Order" />
          <PrivateRoute
            exact
            path="/checkout"
            component={CheckOut}
            title="CheckOut"
          />
          <PrivateRoute
            exact
            path="/question/:basket_number"
            component={Question}
            title="Question"
          />
          <PrivateRoute
            exact
            path="/mealsAnalysis"
            component={MealsAnalysis}
            title="MealsAnalysis"
          />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
