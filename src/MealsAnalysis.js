import React, { useState, useEffect } from "react";
import "./MealsAnalysis.css";
//import { useStateValue } from "./Auth";
import {
  BarChart,
  Bar,
  //Cell,
  //LineChart,
  //Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

import { db } from "./firebase";

function MealsAnalysis() {
  /*const dataL = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
  ];*/

  const [data, setData] = useState({});
  /*const [line, setLine] = useState([]);
  const [dataL, setDataL] = useState();
  const [dataA, setDataA] = useState();*/
  let D = new Date();
  let y = D.getFullYear();
  let m = D.getMonth() + 1;
  const [strM, setStrM] = useState({
    year: 2020,
    month: 12,
    day: 1,
  });
  const [endM, setEndM] = useState({
    year: y,
    month: m,
    day: 31,
  });
  //let line_ = [];
  useEffect(() => {
    db.collection("statistics")
      .where(
        "my",
        "<=",
        parseInt(`${endM.year}${endM.month.toString().padStart(2, "0")}`)
      )
      .where(
        "my",
        ">=",
        parseInt(`${strM.year}${strM.month.toString().padStart(2, "0")}`)
      )

      .onSnapshot(
        (docSnapshot) => {
          setData(
            docSnapshot.docs.map((doc) => {
              let meals = doc.data().meals;
              //let my = doc.data().my;
              let data_ = {};
              let dataL_ = [];
              let dataA_ = [];
              //console.log("call snapshot");
              Object.keys(meals).map((meal) => {
                if (meals[meal].content !== "waiter") {
                  data_[meal] = {
                    aivalue: data_[meal]?.aivalue
                      ? data_[meal].aivalue
                      : 0 + meals[meal].aivalue,
                    question: data_[meal]?.question
                      ? data_[meal].question
                      : 0 + meals[meal].question,
                  };
                  dataL_.push({
                    name: meal,
                    men: meals[meal].genderQty[1]
                      ? meals[meal].gender[1] / meals[meal].genderQty[1]
                      : 0,
                    female: meals[meal].genderQty[0]
                      ? meals[meal].gender[0] / meals[meal].genderQty[0]
                      : 0,
                  });
                  dataA_.push({
                    name: meal,
                    "~20": meals[meal].ageQty[0]
                      ? parseInt(meals[meal].age[0] / meals[meal].ageQty[0])
                      : 0,
                    "20~29": meals[meal].ageQty[1]
                      ? parseInt(meals[meal].age[1] / meals[meal].ageQty[1])
                      : 0,
                    "30~39": meals[meal].ageQty[2]
                      ? parseInt(meals[meal].age[2] / meals[meal].ageQty[2])
                      : 0,
                    "40~49": meals[meal].ageQty[3]
                      ? parseInt(meals[meal].age[3] / meals[meal].ageQty[3])
                      : 0,
                    "50~59": meals[meal].ageQty[4]
                      ? parseInt(meals[meal].age[4] / meals[meal].ageQty[4])
                      : 0,
                    "60~": meals[meal].ageQty[5]
                      ? parseInt(meals[meal].age[5] / meals[meal].ageQty[5])
                      : 0,
                  });
                }
                return 0;
              });
              return {
                grid: data_,
                gender: dataL_,
                age: dataA_,
              };
            })
          );
          /*docSnapshot.docs.map((doc) => {
            
            setData(data_);
            setDataL(dataL_);
            setDataA(dataA_);
          });*/
        },
        (error) => {
          console.log("Error getting document", error);
        }
      );
  }, [db, strM, endM]);

  /*const calendarInput = ({ ref }) => {
    return (
      <input
        style={{ "z-index": "-1" }}
        readOnly
        ref={ref}
        placeholder="select a Month"
      />
    );
  };*/

  return (
    <div className="mealsAnalysis__container">
      <div className="mealsAnalysis__content">
        <div className="mealsAnalysis__search">
          <div>
            <span>strM</span>
            <DatePicker
              value={strM}
              onChange={setStrM}
              shouldHighlightWeekends
              inputPlaceholder="select a Month"
            />
          </div>
          <div>
            <span>to</span>
          </div>
          <div>
            <span>endM</span>
            <DatePicker
              value={endM}
              onChange={setEndM}
              shouldHighlightWeekends
              inputPlaceholder="select a Month"
            />
          </div>
        </div>
        <div className="mealsAnalysis__analysisContent">
          <div className="mealsAnalysis__grid mealsAnalysis__analysisContentItem">
            <div className="mealsAnalysis__gridTitle">
              <div>seq </div>
              <div>mealsName</div>
              <div>questionValue</div>
              <div>aiValue</div>
              <div>Weighted</div>
            </div>
            <div className="mealsAnalysis__gridContent">
              {data[0]?.grid &&
                Object.keys(data[0]?.grid).map((k, index) => {
                  let meal = data[0].grid[k];
                  if (meal.content !== "waiter") {
                    return (
                      <div key={index} className="mealsAnalysis__gridRow">
                        <div className="mealsAnalysis__gridRowCharacter">
                          {index + 1}
                        </div>
                        <div className="mealsAnalysis__gridRowCharacter">
                          {k}
                        </div>
                        <div className="mealsAnalysis__gridRowNumber">
                          {meal.question}
                        </div>
                        <div className="mealsAnalysis__gridRowNumber">
                          {meal.aivalue}
                        </div>
                        <div className="mealsAnalysis__gridRowNumber">
                          {meal?.question ? meal.question + meal.aivalue : 0}
                        </div>
                      </div>
                    );
                  }
                  return 0;
                })}
            </div>
          </div>
          <BarChart
            className="mealsAnalysis__analysisContentItem"
            width={450}
            height={300}
            data={data[0]?.gender}
            margin={{
              top: 20,
              right: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="men" fill="#8884d8" />
            <Bar dataKey="female" fill="#82ca9d" />
          </BarChart>

          <BarChart
            className="mealsAnalysis__analysisContentItem"
            width={450}
            height={300}
            data={data[0]?.age}
            margin={{
              top: 20,
              right: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="~20" stackId="a" fill="#8884d8" label="~19" />
            <Bar dataKey="20~29" stackId="a" fill="#82ca9d" label="20~29" />
            <Bar dataKey="30~39" stackId="a" fill="#00FFFF" label="30~39" />
            <Bar dataKey="40~49" stackId="a" fill="#5F9EA0" label="40~49" />
            <Bar dataKey="50~59" stackId="a" fill="#FF7F50" label="50~59" />
            <Bar dataKey="60~" stackId="a" fill="#BDB76B" label="60~" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default MealsAnalysis;
