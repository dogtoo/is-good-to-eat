import React, { useEffect, useState } from "react";
import "./Food.css";

function Food({ imgUrl, name, id, price, order, qty }) {
  const [Qty, setQty] = useState(0);
  const [Price, setPrice] = useState(price);

  useEffect(() => {
    if (qty > 0) setPrice(price * qty);
  }, [qty]);

  const setOrder = (e) => {
    order(Qty);
    setQty(0);
  };

  return (
    <div className="food__container">
      {/* img */} {/* name */}
      <div className="food__product">
        <img className="food__img" src={imgUrl} alt="" />
        <div className="food__product__context">
          <h2 className="food__name">
            <strong>{name}</strong>
          </h2>
          <h2 className="food__price">${Price}</h2>
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
