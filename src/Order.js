import React from "react";
import Webcam from "react-webcam";
import { useState, useRef, useEffect, useContext } from "react";
import "./Order.css";

import Food from "./component/Food";
import Questionnaire from "./component/Questionnaire";
import db from "./firebase";
import { AuthContext } from "./Auth";

function Order() {
  //const [imgSrc, setImgSrc] = useState(null);
  const [summerprice, setSummerprice] = useState(0);
  const [foods, setFoods] = useState([
    {
      imgUrl:
        "https://t1.gstatic.com/images?q=tbn:ANd9GcRjXJ5muZViMyCONwo80Hu-wIuCfpxzrvFz3cKtzHZVayPKGJ0THyUP-4k5Jw6AJGGCINPyEoh7xXFA_fXjB1U",
      name: "Hamburg",
      id: "1",
      price: 123,
    },
    {
      imgUrl:
        "https://t1.gstatic.com/images?q=tbn:ANd9GcRjXJ5muZViMyCONwo80Hu-wIuCfpxzrvFz3cKtzHZVayPKGJ0THyUP-4k5Jw6AJGGCINPyEoh7xXFA_fXjB1U",
      name: "Hamburg Beef good to eat",
      id: "2",
      price: 555,
    },
    {
      imgUrl:
        "https://t1.gstatic.com/images?q=tbn:ANd9GcRjXJ5muZViMyCONwo80Hu-wIuCfpxzrvFz3cKtzHZVayPKGJ0THyUP-4k5Jw6AJGGCINPyEoh7xXFA_fXjB1U",
      name: "Hamburg Beef good to eat",
      id: "2",
      price: 555,
    },
    {
      imgUrl:
        "https://t1.gstatic.com/images?q=tbn:ANd9GcRjXJ5muZViMyCONwo80Hu-wIuCfpxzrvFz3cKtzHZVayPKGJ0THyUP-4k5Jw6AJGGCINPyEoh7xXFA_fXjB1U",
      name: "Hamburg Beef good to eat",
      id: "2",
      price: 555,
    },
    {
      imgUrl:
        "https://t1.gstatic.com/images?q=tbn:ANd9GcRjXJ5muZViMyCONwo80Hu-wIuCfpxzrvFz3cKtzHZVayPKGJ0THyUP-4k5Jw6AJGGCINPyEoh7xXFA_fXjB1U",
      name: "Hamburg Beef good to eat",
      id: "2",
      price: 555,
    },
    {
      imgUrl:
        "https://t1.gstatic.com/images?q=tbn:ANd9GcRjXJ5muZViMyCONwo80Hu-wIuCfpxzrvFz3cKtzHZVayPKGJ0THyUP-4k5Jw6AJGGCINPyEoh7xXFA_fXjB1U",
      name: "Hamburg Beef good to eat",
      id: "2",
      price: 555,
    },
    {
      imgUrl:
        "https://t1.gstatic.com/images?q=tbn:ANd9GcRjXJ5muZViMyCONwo80Hu-wIuCfpxzrvFz3cKtzHZVayPKGJ0THyUP-4k5Jw6AJGGCINPyEoh7xXFA_fXjB1U",
      name: "Hamburg Beef good to eat",
      id: "2",
      price: 555,
    },
    {
      imgUrl:
        "https://t1.gstatic.com/images?q=tbn:ANd9GcRjXJ5muZViMyCONwo80Hu-wIuCfpxzrvFz3cKtzHZVayPKGJ0THyUP-4k5Jw6AJGGCINPyEoh7xXFA_fXjB1U",
      name: "Hamburg Beef good to eat",
      id: "2",
      price: 555,
    },
  ]);
  const [orders, setOrders] = useState([]);
  const [modeltype, setModeltype] = useState("select");
  const [questions, setQuestions] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [show, setShow] = useState("");

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    let sum_ = 0;
    orders.map((order) => {
      sum_ += order.qty * order.price;
    });
    setSummerprice(sum_);
  }, [orders]);

  const addproduct = (food, qty) => {
    let order = {
      ...food,
      qty: qty,
    };
    setOrders([...orders, order]);
  };

  const videoConstraints = {
    width: 1024,
    facingMode: "user",
  };
  const webcamRef = useRef(null);
  const capture = React.useCallback(
    (id, ans) => {
      const imageSrc = webcamRef.current.getScreenshot();
      setQuestionnaires([
        ...questionnaires,
        {
          id: id,
          fraction: ans,
          imgUrl: "",
          imageSrc: imageSrc,
        },
      ]);
      //setImgSrc(imageSrc);
    },
    [webcamRef]
  );
  /*const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  };*/

  return (
    <div className="order__container">
      <div className="order__title">
        <h4 className="order__checkout">
          {modeltype !== "questionnaire" ? (
            <div className="order__checkout">
              <span>💸</span>
              {summerprice}
            </div>
          ) : (
            <div>
              <h4>Questionnaire</h4>
            </div>
          )}
          <div>
            {modeltype === "select" ? (
              <buttion
                className="order__capture"
                onClick={() => setModeltype("checkout")}
              >
                訂餐<span>🛒</span>
              </buttion>
            ) : modeltype === "checkout" ? (
              <div>
                <buttion
                  className="order__capture"
                  onClick={() => setModeltype("questionnaire")}
                >
                  確認<span>📲</span>
                </buttion>
                <buttion
                  className="order__capture"
                  onClick={() => setModeltype("select")}
                >
                  取消<span>🗑</span>
                </buttion>
              </div>
            ) : (
              <div>📃</div>
            )}
          </div>
        </h4>
      </div>
      <Webcam
        className="order__webcame"
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      {modeltype === "select" ? (
        foods.map((food) => (
          <Food
            imgUrl={food.imgUrl}
            name={food.name}
            id={food.id}
            price={food.price}
            order={(qty) => addproduct(food, qty)}
          />
        ))
      ) : modeltype === "checkout" ? (
        orders.map((food) => (
          <Food
            imgUrl={food.imgUrl}
            name={food.name}
            id={food.id}
            price={food.price}
            qty={food.qty}
          />
        ))
      ) : (
        <Questionnaire
          id="1"
          question="好吃嗎？好吃嗎？好吃嗎？好吃嗎？好吃嗎？好吃嗎？好吃嗎？好吃嗎？好吃嗎？"
          capture={(id, ans) => capture(id, ans)}
        />
      )}
      {/*<button className="order__capture" onClick={capture}>
        Capture photo
      </button>
      imgSrc && <img className="order__imgShow" src={imgSrc} />*/}
      <button
        onClick={() => {
          questionnaires.map((questionnaire) =>
            setShow(
              <div className="order__test">
                <div>{questionnaire.id}</div>
                <div>{questionnaire.fraction}</div>
                <img className="order__imgShow" src={questionnaire.imageSrc} />
              </div>
            )
          );
        }}
      >
        show
      </button>
      <div>{show}</div>
    </div>
  );
}

export default Order;
