import React, { useState } from "react";
import "./Login.css";
import { Redirect, useHistory } from "react-router-dom";
import { auth } from "./firebase";
//import { AuthContext } from "./Auth";
import { useStateValue } from "./Auth";

function Login() {
  const history = useHistory();
  //let location = useLocation();
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [{ currentUser }, dispatch] = useStateValue();

  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, passwd)
      .then((UserCredential) => {
        dispatch({
          type: "LOGIN",
          payload: UserCredential.user,
        });
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const signUp = (e) => {
    e.preventDefault();
    alert(auth);
    auth.createUserWithEmailAndPassword(email, passwd).then((auth) => {
      if (auth) {
        history.push("/");
      }
    });
  };

  //const { currentUser } = useContext(AuthContext);
  if (currentUser?.email) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      {/* <h4>Login from {location.state.from.pathname}</h4>*/}
      <div className="login__container">
        <div className="login__body">
          <div className="login__title">
            <span>Is Good To eat</span>
          </div>
          <div className="login__input">
            <h3>E-mail:</h3>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-MAIL"
            />
          </div>
          <div className="login__input">
            <h3>Password:</h3>
            <input
              type="password"
              vaue={passwd}
              onChange={(e) => setPasswd(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="login__button">
            <button onClick={login}>Login</button>
          </div>
          <div className="login__button">
            <button onClick={signUp}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
