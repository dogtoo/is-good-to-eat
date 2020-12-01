import React, { useEffect, useState } from "react";
import "./Food.css";
import { useStateValue } from '../Auth';

function Food({ imgUrl, name, cname, price, order }) {
  const [Qty, setQty] = useState(0);
  const [Price, setPrice] = useState(price);

  useEffect(() => {
    setPrice(price * Qty);
  }, [Qty]);

  /*const setOrder = (e) => {
    order(Qty);
    setQty(0);
  };*/
  const [{ shoppingbasket }, dispatch] = useStateValue();

  const setOrder = (e) => {
    //console.log('setOrder')
    dispatch({
      type: 'FOOD_ADD_PRODUCT',
      payload: {
        meal_name: name,
        meal_cname: cname,
        meal_qty: Qty,
        meal_price: price,
      }
    })

    let totamount = shoppingbasket?.tot_amount ? shoppingbasket.tot_amount : 0
    dispatch({
      type: 'FOOD_ADD_AMOUNT',
      payload: totamount + Price
    })
    setQty(0);
  }
  return (
    <div className="food__container">
      {/* img */} {/* name */}
      <div className="food__product">
        <img className="food__img" src={imgUrl} alt="" />
        <div className="food__product__context">
          <div className="food__name">
            <h2><strong>{name}</strong></h2>
            <h3>{cname}</h3>
          </div>
          <h2 className="food__price">{price}</h2>
        </div>
      </div>
      {order && (
        <div className="food__qtybottom">
          <h4 className="food__qty">{Qty}</h4>
          <button className="food__qtycontrol" onClick={() => setQty(Qty + 1)}>
            +
          </button>
          <button
            className="food__qtycontrol"
            onClick={() => {
              if (Qty > 0) setQty(Qty - 1);
            }}
          >
            -
          </button>
          <button className="food__order" onClick={(e) => setOrder(e)}>
            購買
          </button>
        </div>
      )}
    </div>
  );
}

export default Food;
