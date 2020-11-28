import React, { useState, useEffect } from 'react';
import './CheckOut.css';
import { useStateValue } from './Auth';

import {db} from './firebase';

function CheckOut() {
  const [{order}, dispatch] = useStateValue();
  const [orderList, setOrderList] = useState([]);
  let list = []
  useEffect(() => {
    db.collection("order").where('is_checkout', '==', false)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          list = [...list, doc.data()]
        });
      })
      .then(()=>{
        setOrderList(list)
      })
      .catch(function(error) {
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
  }, []);
  //console.log('orderValue', orderValue)
  return (<div>
    {orderList?.map(({tot_amount})=>{
      return <div>{tot_amount}</div>
    })}
  </div>)
}

export default CheckOut;