import React, { useState } from "react";
import uuid from "react-uuid";
import "./Order.css";
import { useStateValue } from "./Auth";

import Food from "./component/Food";
import Desktop from "./component/Desktop";
import Employee from "./component/Employee";

import { db } from "./firebase";

function Order() {
  const [
    { menu, shoppingbasket, selDesktop, selWaiter },
    dispatch,
  ] = useStateValue();
  const [menuchose, setMenuchose] = useState("hamburg");
  const [isChoseDest, setIsChoseDest] = useState(false);
  const [isChoseEmployee, setIsChoseEmployee] = useState(false);
  const handleSelDesktop = () => {
    //e.preventDefault();
    setIsChoseDest(isChoseDest ? false : true);
  };
  const handleSelWaiter = () => {
    setIsChoseEmployee(isChoseEmployee ? false : true);
  };
  const handle_menu_chick = (cm) => {
    setMenuchose(cm);
  };
  const hanleMeals = () => {
    if (selDesktop === null || selDesktop === 0) return alert("請選擇桌號");
    if (selWaiter === null || selWaiter === 0) return alert("請選擇服務生");
    if (shoppingbasket?.meals?.length === 0) return alert("請選擇餐點");
    console.log("selDesktop:", selDesktop);
    shoppingbasket.order_date = new Date();
    shoppingbasket.basket_number = uuid();
    shoppingbasket.desktop_name = selDesktop;
    shoppingbasket.waiter = selWaiter;
    shoppingbasket.is_checkout = false;
    let tot = shoppingbasket.tot_amount;
    db.collection("order")
      .doc(shoppingbasket.basket_number)
      .set({
        ...shoppingbasket,
      })
      .then(function () {
        console.log("Document successfully written!");
        dispatch({
          type: "ORDER_ADD_ORDER",
        });
        dispatch({
          type: "DESKTOP_ORDER",
          payload: {
            basket_number: shoppingbasket.basket_number,
          },
        });
        alert(`餐點確認，總金額:${tot}`);
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };
  return (
    <div className="order__container">
      <div className="order__menulist">
        <div className="order__menulisttitle">菜單總類</div>
        <div className="order__menulistcontent">
          {Object.keys(menu).map((menu_name) => {
            //console.log('order', menu_name)
            return (
              <div
                className="order__menulistrow"
                onClick={(e) => {
                  handle_menu_chick(menu_name);
                }}
              >
                {menu_name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="order__main">
        <div className="order__conf">
          <div className="order__desktopselect">
            <div onClick={() => handleSelDesktop()}>
              選擇桌號 {selDesktop ? "已選擇" + selDesktop : ""}
            </div>
            {isChoseDest && (
              <Desktop setIsChoseDest={() => handleSelDesktop()} />
            )}
          </div>
          <div>
            <div onClick={() => handleSelWaiter()}>
              選擇服務生 {selWaiter ? "已選擇" + selWaiter : ""}
            </div>
            {isChoseEmployee && (
              <Employee setIsChoseEmployee={() => handleSelWaiter()} />
            )}
          </div>
        </div>
        <div className="order__content">
          {menu[menuchose].meals.map(
            ({ meal_name, meal_cname, meal_price, meal_image_url }) => (
              <Food
                imgUrl={meal_image_url}
                name={meal_name}
                cname={meal_cname}
                price={meal_price}
                order={true}
              />
            )
          )}
        </div>
      </div>
      <div className="order__shoppingbasketcontent">
        {shoppingbasket.meals.map(({ meal_name, meal_qty, meal_price }) => {
          return (
            <div className="order__basketlist">
              <div className="order__basketname">{meal_name}</div>
              <div className="order__basketnumber">{meal_qty}</div>
              <div className="order__basketnumber">{meal_price * meal_qty}</div>
            </div>
          );
        })}
        <h3>總金額</h3>
        <div>{shoppingbasket.tot_amount}</div>
        <button
          onClick={(e) => {
            hanleMeals();
          }}
        >
          菜單確認
        </button>
      </div>
    </div>
  );
}

export default Order;
