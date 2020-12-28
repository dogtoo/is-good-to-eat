import React from "react";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./Auth";

function AuthStateChanged() {
  const [{}, dispatch] = useStateValue();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch({
        type: "LOGIN",
        payload: user,
      });
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return <div></div>;
}

export default AuthStateChanged;
