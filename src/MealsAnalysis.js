import React, { useState, PureComponent } from "react";
import "./MealsAnalysis.css";
import { useStateValue } from "./Auth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { db } from "./firebase";

function MealsAnalysis() {
  const [data, setData] = useState({});
  const [line, setLine] = useState([]);
  let data_ = {};
  let line_ = [];
  db.collection("statistics")
    //.where("my", ">=", "202012")
    .onSnapshot(
      (docSnapshot) => {
        docSnapshot.docs.map((doc) => {
          let meals = doc.data().meals;
          let my = doc.data().my;
          Object.keys(meals).map((meal) => {
            data_[meal] = {
              aivalue: data_[meal]?.aivalue
                ? data_[meal].aivalue
                : 0 + meals[meal].aivalue,
              question: data_[meal]?.question
                ? data_[meal].question
                : 0 + meals[meal].question,
            };
          });
          line_.push({
            name: my,
          });
          setData(data_);
        });
      },
      (error) => {
        console.log("Error getting document", error);
      }
    );
  return (
    <div>
      <div>New MealsAnalysis</div>
      <div className="mealsAnalysis__container">
        <div className="mealsAnalysis__search">
          <div>strM</div>
          to
          <div>endM</div>
        </div>
        <div className="mealsAnalysis__grid">
          <div className="mealsAnalysis__gridTitle">
            <div>seq</div>
            <div>mealsName</div>
            <div>questionValue</div>
            <div>aiValue</div>
            <div>Weighted</div>
          </div>

          {data &&
            Object.keys(data).map((k, index) => {
              return (
                <div className="mealsAnalysis__gridRow">
                  <div>{index + 1}</div>
                  <div>{k}</div>
                  <div>{data[k].question}</div>
                  <div>{data[k].aivalue}</div>
                  <div>
                    {data[k]?.question ? data[k].question + data[k].aivalue : 0}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MealsAnalysis;
