import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./Header.css";

import { auth } from "../firebase";

export default function Header({ currentUser, title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  const logout = (e) => {
    e.preventDefault();
    auth
      .signOut()
      .then(() => {
        return <Redirect to="/login" />;
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="header__container">
      <h4>
        Is good to eat <span>🍽</span>
        <h6>Wellcome: {currentUser?.email}</h6>
      </h4>

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
