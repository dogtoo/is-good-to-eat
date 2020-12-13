import React from "react";
import "./Main.css";

import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="main__container">
      <div className="main__itemlink">
        <Link to="/order">order</Link>
      </div>
      <div className="main__itemlink">
        <Link to="/checkout">checkout</Link>
      </div>
      <div className="main__itemlink">create meals</div>
      <div className="main__itemlink">
        <Link to="/mealsAnalysis">meals analysis</Link>
      </div>
      <div className="main__itemlink">custom analysis</div>
      <div className="main__itemlink">staff analysis</div>
      <div className="main__itemlink">face analysis data</div>
    </div>
  );
}

export default Main;
