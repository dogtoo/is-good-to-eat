import React from "react";
import Webcam from "react-webcam";
import "./Questionnaire.css";
import { useState, useRef, useEffect } from "react";

import { useStateValue } from "../Auth";

function Questionnaire({ content, index }) {
  const [{ question }, dispatch] = useStateValue();
  const [fraction, setFraction] = useState(null);
  const [imgSrc, setImgSrc] = useState();
  const setAnser = (ans) => {
    setFraction(ans);
    capture();
  };

  useEffect(() => {
    dispatch({
      type: "QUESTION_UPDATE",
      payload: {
        idx: index,
        data: {
          ...question[index],
          value: fraction,
          pic_url: imgSrc ? imgSrc : "",
        },
      },
    });
    //console.log(index, question[index]);
  }, [imgSrc]);

  const videoConstraints = {
    width: 1024,
    facingMode: "user",
  };
  const webcamRef = useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  return (
    <div className="questionnaire__container">
      <Webcam
        className="order__webcame"
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      {imgSrc && <img className="order__imgShow" src={imgSrc} />}
      <div className="questionnaire__context">
        請給 {Object.values(content)} 個分數
      </div>
      <div className="questionnaire__ansercontainer">
        <div className="questionnaire__anser">
          <div>😍</div>
          <div>
            <input
              type="radio"
              value="5"
              onChange={() => setAnser("5")}
              checked={fraction === "5"}
            />
          </div>
        </div>
        <div className="questionnaire__anser">
          <div>😀</div>
          <div>
            <input
              type="radio"
              value="3"
              onChange={() => setAnser("4")}
              checked={fraction === "4"}
            />
          </div>
        </div>
        <div className="questionnaire__anser">
          <div>😐</div>
          <div>
            <input
              type="radio"
              value="2"
              onChange={() => setAnser("3")}
              checked={fraction === "3"}
            />
          </div>
        </div>
        <div className="questionnaire__anser">
          <div>😟</div>
          <div>
            <input
              type="radio"
              value="1"
              onChange={() => setAnser("2")}
              checked={fraction === "2"}
            />
          </div>
        </div>
        <div className="questionnaire__anser">
          <div>😫</div>
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
