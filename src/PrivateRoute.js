import React, { useState, useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useStateValue } from "./Auth";
import { auth } from "./firebase";
import Header from "./component/Header";

function PrivateRoute({ component: RouteComponent, ...rest }) {
  let location = useLocation();
  const [{ currentUser }, dispatch] = useStateValue();
  //const { currentUser } = useContext(AuthContext);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch({
        type: "LOGIN",
        payload: user,
      });
      setPending(false);
    });
  }, [auth]);

  /*if (`/${rest.title}` !== location.pathname) {
    if (rest.title === "Main" && location.pathname !== "/") return <div></div>;
  }*/

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser?.email ? (
          <div>
            <Header currentUser={currentUser.email} title={rest.title} />
            <RouteComponent {...routeProps} />
          </div>
        ) : pending ? (
          <div>Loading...</div>
        ) : (
          <Redirect
            to={{
              pathname: "/login" /*, state: { dogfrom: routeProps.location }*/,
            }}
          />
        )
      }
    ></Route>
  );
}

export default PrivateRoute;
