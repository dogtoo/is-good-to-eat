import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./Header.css";

import { auth } from "../firebase";
import { useStateValue } from '../Auth';

export default function Header({ title }) {
  const [{ currentUser }, dispatch] = useStateValue();
  useEffect(() => {
    document.title = title;
  }, [title]);
  const logout = (e) => {
    e.preventDefault();
    auth
      .signOut()
      .then(() => {
        dispatch({
          type: 'LOGOUT',
          payload: {},
        })
        return <Redirect to="/login" />;
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="header__container">
      <div>
        Is good to eat <span>🍽</span>
        <h3>Wellcome: {currentUser?.email}</h3>
      </div>

      <div>
        {{ currentUser } ? (
          <div>
            <button onClick={logout}>logout</button>
          </div>
        ) : (
            <div>{currentUser}</div>
          )}
      </div>
    </div>
  );
}
