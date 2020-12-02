import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
//import { AuthContext } from "./Auth";
import { useStateValue } from './Auth';
import Header from "./component/Header";

function PrivateRoute({ component: RouteComponent, ...rest }) {
  const [{ currentUser, selDesktop }, dispatch] = useStateValue();
  //const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser?.email ? (
          <div>
            <Header currentUser={currentUser.email} title={rest.title} />
            <RouteComponent {...routeProps} />
          </div>
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
