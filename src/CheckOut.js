import React, { useState, useEffect } from "react";
import { useLocation, Redirect, useHistory } from "react-router-dom";
import "./CheckOut.css";
import { useStateValue } from "./Auth";

import Desktop from "./component/Desktop";

import { db } from "./firebase";

function CheckOut() {
  const [{ order, selDesktop }, dispatch] = useStateValue();
  const [isChoseDest, setIsChoseDest] = useState(false);
  const history = useHistory();
  let question = [];
  useEffect(() => {
    selDesktop > 0 &&
      db
        .collection("order")
        .where("is_checkout", "==", false)
        .where("desktop_name", "==", selDesktop)
        .get()
        .then((querySnapshot) => {
          dispatch({
            type: "CHECKOUT_SEL_ORDER",
            payload: [],
          });
          querySnapshot.forEach((doc) => {
            dispatch({
              type: "CHECKOUT_SEL_ORDER",
              payload: [doc.data()],
            });
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
  }, [selDesktop]);
  const handleSelDesktop = () => {
    //e.preventDefault();
    setIsChoseDest(isChoseDest ? false : true);
  };

  const checkOut = () => {
    //console.log('checkout', order)
    order.map(({ basket_number, meals, waiter }) => {
      meals.map(({ meal_cname, meal_name }) => {
        question = [
          ...question,
          {
            content: { meal_name, meal_cname },
            value: 0,
            pic_url: "",
          },
        ];
      });
      question = [
        ...question,
        {
          content: { waiter },
          value: 0,
          pic_url: "",
        },
      ];

      db.collection("order")
        .doc(basket_number)
        .update({
          is_checkout: true,
          //is_checkout: false,
          question: question,
          ai_date: null,
        })
        .then(() => {
          console.log("Document successfully updated!");
          dispatch({
            type: "CHECKOUT_A_ORDER",
          });
        })
        .then(() => {
          dispatch({
            type: "QUESTION_INIT",
            payload: question,
          });
        })
        .then(() => {
          history.push(`/question/${basket_number}`);
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    });
  };
  //console.log('orderValue', orderValue)
  return (
    <div className="checkout__container">
      <div className="order__desktopselect" onClick={() => handleSelDesktop()}>
        選擇桌號 {selDesktop ? "已選擇" + selDesktop : ""}
      </div>
      {isChoseDest && <Desktop setIsChoseDest={() => handleSelDesktop()} />}
      {order?.map(({ tot_amount, meals, waiter }) => {
        return (
          <div>
            <h3>{`服務員 ${waiter}`}</h3>
            {meals?.map(({ meal_name, meal_cname, meal_qty, meal_price }) => {
              return (
                <div className="checkout__basketrow">
                  <div>{meal_name}</div>
                  <div>{meal_cname}</div>
                  <div className="checkout__basketnumber">{meal_qty}</div>
                  <div className="checkout__basketnumber">
                    {meal_qty * meal_price}
                  </div>
                </div>
              );
            })}
            <div className="checkout__basketbottom">
              <h3>總金額</h3>
              <div>{tot_amount}</div>
            </div>
          </div>
        );
      })}
      {selDesktop ? (
        <div className="checkout__basketbottom" onClick={() => checkOut()}>
          結帳💸
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CheckOut;
