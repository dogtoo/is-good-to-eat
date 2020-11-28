import React from "react";
import { useReducer, useContext, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ reducer, initialState, children }) => {
  return (
    <AuthContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AuthContext.Provider>
  );
};

export const useStateValue = () => useContext(AuthContext);