import React, { useState } from 'react';
import Webcam from 'react-webcam';
import uuid from 'react-uuid';
import './Order.css';
import { useStateValue } from './Auth';

import Food from './component/Food';
import Desktop from './component/Desktop';

import { db } from './firebase';

function Order() {
  const [{ menu, shoppingbasket, selDesktop }, dispatch] = useStateValue();
  const [menuchose, setMenuchose] = useState('hamburg');
  const handle_menu_chick = (cm) => {
    setMenuchose(cm)
  }
  const hanleMeals = () => {
    shoppingbasket.order_date = new Date();
    shoppingbasket.basket_number = uuid();
    shoppingbasket.desktop_name = selDesktop;
    shoppingbasket.waiter = '01';
    shoppingbasket.is_checkout = false;

    db.collection("order").doc(shoppingbasket.basket_number).set({
      ...shoppingbasket
    })
      .then(function () {
        console.log("Document successfully written!");
        dispatch({
          type: 'ORDER_ADD_ORDER',
        })
        dispatch({
          type: 'DESKTOP_ORDER',
          payload: {
            basket_number: shoppingbasket.basket_number
          }
        })
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }
  return (
    <div className="order__container">
      <div className="order__menulist">
        <div className="order__menulisttitle">菜單總類</div>
        <div className="order__menulistcontent">
          {/*menu.map((menu)=>(
          <div>{menu.menu_name}</div>
        ))*/}
          {/*menu.map((m)=>(
          <div onClick={(e)=>{handle_menu_chick(Object.keys(m)[0])}}>{Object.keys(m)[0]}</div>
        ))*/}
          {Object.keys(menu).map((menu_name) => (
            //console.log('order',menu[menu_name])
            <div onClick={(e) => { handle_menu_chick(menu_name) }}>{menu_name}</div>
          ))}

        </div>
      </div>
      <div>
        <div>選擇桌號 {selDesktop ? ('已選擇' + selDesktop) : ''}</div>
        <Desktop />
      </div>
      <div className="order__mealscontent">
        {
          menu[menuchose].meals.map(({ meal_name, meal_cname, meal_price, meal_image_url }) => (
            <Food
              imgUrl={meal_image_url}
              name={meal_name}
              cname={meal_cname}
              price={meal_price}
              order={true}
            />
          ))
        }
      </div>
      <div className="order__shoppingbasketcontent">
        {shoppingbasket.meals.map(({ meal_name, meal_qty }) => {
          return (
            <div>{meal_name} {meal_qty}</div>
          )
        })}
        <h3>總金額</h3>
        <div>{shoppingbasket.tot_amount}</div>
        <button onClick={(e) => { hanleMeals() }}>菜單確認</button>
      </div>
    </div>
  )

}

export default Order;