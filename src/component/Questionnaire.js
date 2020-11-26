import React from "react";
import "./Questionnaire.css";

import { useState, useEffect } from "react";

function Questionnaire({id, question, capture }) {
  const [fraction, setFraction] = useState(null);

  const setAnser = (ans) => {
    setFraction(ans);
    capture(id, ans);
  }

  return (
    <div className="questionnaire__container">
      {id}
      <div className="questionnaire__context">{question}</div>
      <div className="questionnaire__ansercontainer">
        <div className="questionnaire__anser">
          <div>😍</div>
          <div>
            <input
              type="radio"
              value="4"              
              onChange={() => setAnser("4")}
              checked={fraction === "4"}
            />
          </div>
        </div>
        <div className="questionnaire__anser">
          <div>😀</div>
          <div>
          <input
              type="radio"
              value="3"
              onChange={() => setAnser("3")}
              checked={fraction === "3"}
            />
          </div>
        </div>
        <div className="questionnaire__anser">
          <div>😐</div>
          <div>
          <input
              type="radio"
              value="2"
              onChange={() => setAnser("2")}
              checked={fraction === "2"}
            />
          </div>
        </div>
        <div className="questionnaire__anser">
          <div>😟</div>
          <div>
          <input
              type="radio"
              value="1"
              
              onChange={() => setAnser("1")}
              checked={fraction === "1"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;
