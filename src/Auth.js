import React from "react";
import { useState, useEffect, useReducer, useContext, createContext } from "react";
import { auth } from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ reducer, initialState, children }) => {
  //const [currentUser, setCurrentUser] = useState(null);
  /*const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      initialState = { ...initialState, currentUser: { user } }
      //setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }*/

  return (
    <AuthContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AuthContext.Provider>
  );
};

export const useStateValue = () => useContext(AuthContext);