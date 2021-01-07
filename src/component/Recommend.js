import React from "react";
import "./Recommend.css";
import { useStateValue } from "../Auth";
import Food from "./Food";

function Recommend({ setIsChoseRecommend }) {
  const [{ menu }, dispatch] = useStateValue();

  const setIsChoseRecommend_ = () => {
    setIsChoseRecommend.apply();
  };

  return (
    <div>
      <div
        className="recommend__plane"
        onClick={() => {
          setIsChoseRecommend.apply();
        }}
      ></div>

      <div className="recommend__container">
        <div className="recommend__content">我們推薦這位20歲小姐</div>
        {menu["pizza"].meals.map(
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
        <div></div>
        <div onClick={() => setIsChoseRecommend_()}>確認</div>
      </div>
    </div>
  );
}

export default Recommend;
