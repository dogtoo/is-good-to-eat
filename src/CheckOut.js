import React, { useState, useEffect } from 'react';
import './CheckOut.css';
import { useStateValue } from './Auth';

import Desktop from './component/Desktop'

import { db } from './firebase';

function CheckOut() {
  const [{ order, desktop, selDesktop }, dispatch] = useStateValue();
  const [orderList, setOrderList] = useState([]);
  let list = []
  useEffect(() => {
    selDesktop > 0 &&
      db.collection("order").where('is_checkout', '==', false).where('desktop_name', '==', selDesktop)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log('doc:', doc.data())
            list = [...list, doc.data()]
          });
        })
        .then(() => {
          setOrderList(list)
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    /*db
    .collection('order')
    .where('is_checkout', '==', false)
    .onSnapshot(snapshot=>(
      setOrderList(snapshot.docs.map(doc => ({
        tot_amount: doc.tot_amount
      })))
    ))*/
  }, [selDesktop]);
  //console.log('orderValue', orderValue)
  return (
    <div>
      <div>
        {/*desktop?.map(({ desktop_name, enabled, basket_number }) => {
          return (
            <div>
              <div onClick={() => setSelCheckOutDestop(desktop_name)}>{desktop_name} {enabled && 'order'}</div>
            </div>
          )
        })*/}
        <Desktop />
      </div>
      {orderList?.map(({ tot_amount, meals, waiter }) => {
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
      <div>結帳💸</div>
    </div>)
}

export default CheckOut;