import React from "react";
import "./Desktop.css";
import { useStateValue } from "../Auth";

function Desktop({ setIsChoseDest }) {
  const [{ desktop }, dispatch] = useStateValue();
  const setSelCheckOutDestop = (desktop_name) => {
    dispatch({
      type: "DESKTOP_SELECT",
      payload: desktop_name,
    });
  };
  const setIsChoseDest_ = () => {
    setIsChoseDest.apply();
  };

  return (
    <div className="desktop__container">
      {desktop?.map(({ desktop_name, enabled, basket_number }) => {
        return (
          <div
            className={enabled ? "desktop__order" : "desktop__number"}
            key={desktop_name}
            onClick={() => setSelCheckOutDestop(desktop_name)}
          >
            <div>{desktop_name}</div>
          </div>
        );
      })}
      <div></div>
      <div></div>
      <div onClick={() => setIsChoseDest_()}>確認</div>
    </div>
  );
}

export default Desktop;
