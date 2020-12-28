import React from "react";
import "./Desktop.css";
import { useStateValue } from "../Auth";

function Desktop({ setIsChoseDest, choseModel }) {
  const [{ desktop, selDesktop }, dispatch] = useStateValue();
  const setSelCheckOutDestop = (desktop_name_) => {
    let ischosed = desktop.find(({ desktop_name, enabled }) => {
      return enabled && desktop_name === desktop_name_ ? true : false;
    });
    (choseModel || !ischosed) &&
      dispatch({
        type: "DESKTOP_SELECT",
        payload: desktop_name_,
      });
  };
  const setIsChoseDest_ = () => {
    setIsChoseDest.apply();
  };

  return (
    <div>
      <div
        className="desktop__plane"
        onClick={() => {
          setIsChoseDest.apply();
        }}
      ></div>
      <div className="desktop__container">
        {desktop?.map(({ desktop_name, enabled, basket_number }) => {
          return (
            <div
              className={
                enabled
                  ? "desktop__order"
                  : selDesktop === desktop_name
                  ? "desktop__selected"
                  : "desktop__number"
              }
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
    </div>
  );
}

export default Desktop;
