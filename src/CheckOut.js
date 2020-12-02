import React, { useState, useEffect } from 'react';
import { useLocation, Redirect, useHistory } from "react-router-dom";
import './CheckOut.css';
import { useStateValue } from './Auth';

import Desktop from './component/Desktop'

import { db } from './firebase';

function CheckOut() {
  const [{ order, selDesktop }, dispatch] = useStateValue();
  const history = useHistory();
  let question = [];
  useEffect(() => {
    selDesktop > 0 &&
      db.collection("order").where('is_checkout', '==', false).where('desktop_name', '==', selDesktop)
        .get()
        .then((querySnapshot) => {
          dispatch({
            type: 'CHECKOUT_SEL_ORDER',
            payload: []
          })
          querySnapshot.forEach((doc) => {
            dispatch({
              type: 'CHECKOUT_SEL_ORDER',
              payload: [doc.data()]
            })
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
  }, [selDesktop]);

  const checkOut = () => {
    console.log('checkout', order)
    order.map(({ basket_number, meals, waiter }) => {
      meals.map(({ meal_cname, meal_name }) => {
        question = [...question, {
          content: { meal_name, meal_cname },
          value: 0,
          pic_url: '',
          //ai 處理後寫的資料
          ai_value: 0,
          ai_data: {},
          ai_procdate: null
        }]
      })
      question = [...question, {
        content: { waiter },
        value: 0,
        pic_url: '',
        //ai 處理後寫的資料
        ai_value: 0,
        ai_data: {},
        ai_procdate: null
      }]

      db.collection("order").doc(basket_number).update({
        //is_checkout: true,
        is_checkout: false,
        question: question
      })
        .then(() => {
          console.log("Document successfully updated!");
          dispatch({
            type: 'CHECKOUT_A_ORDER'
          })
        })
        .then(() => {
          dispatch({
            type: 'QUESTION_INIT',
            payload: question,
          })
        })
        .then(() => {
          history.push("/question")
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    })


  }
  //console.log('orderValue', orderValue)
  return (
    <div>
      <div>
        <Desktop />
      </div>
      {order?.map(({ tot_amount, meals, waiter }) => {
        return (
          <div>
            <div>{tot_amount}</div>
            {meals?.map(({ meal_name, meal_cname, meal_qty, meal_price }) => {
              return (
                <div>
                  <div>{meal_name}</div>
                  <div>{meal_cname}</div>
                  <div>{meal_qty}</div>
                  <div>{meal_qty * meal_price}</div>
                </div>
              )
            })}
            <div>{waiter}</div>
          </div>)
      })}
      <div onClick={() => checkOut()}>結帳💸</div>
    </div>)
}

export default CheckOut;