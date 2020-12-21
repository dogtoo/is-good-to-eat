import React, { useState, useEffect, PureComponent } from "react";
import "./MealsAnalysis.css";
import { useStateValue } from "./Auth";
import {
  BarChart, Bar, Cell,
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
  /*const dataL = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
  ];*/

  const [data, setData] = useState({});
  const [line, setLine] = useState([]);
  const [dataL, setDataL] = useState();
  const [dataA, setDataA] = useState();
  let data_ = {};
  let dataL_ = [];
  let dataA_ = [];
  let line_ = [];
  useEffect(() => {
    db.collection("statistics")
      //.where("my", ">=", "202012")
      .onSnapshot(
        (docSnapshot) => {
          docSnapshot.docs.map((doc) => {
            let meals = doc.data().meals;
            let my = doc.data().my;
            console.log('call snapshot')
            Object.keys(meals).map((meal) => {
              if (meals[meal].content != 'waiter') {
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
                  men: meals[meal].genderQty[1] ? meals[meal].gender[1] / meals[meal].genderQty[1] : 0,
                  female: meals[meal].genderQty[0] ? meals[meal].gender[0] / meals[meal].genderQty[0] : 0,
                });
                dataA_.push({
                  name: meal,
                  T1: meals[meal].ageQty[0] ? parseInt(meals[meal].age[0] / meals[meal].ageQty[0]) : 0,
                  T2: meals[meal].ageQty[1] ? parseInt(meals[meal].age[1] / meals[meal].ageQty[1]) : 0,
                  T3: meals[meal].ageQty[2] ? parseInt(meals[meal].age[2] / meals[meal].ageQty[2]) : 0,
                  T4: meals[meal].ageQty[3] ? parseInt(meals[meal].age[3] / meals[meal].ageQty[3]) : 0,
                  T5: meals[meal].ageQty[4] ? parseInt(meals[meal].age[4] / meals[meal].ageQty[4]) : 0,
                  T6: meals[meal].ageQty[5] ? parseInt(meals[meal].age[5] / meals[meal].ageQty[5]) : 0,
                  T7: meals[meal].ageQty[6] ? parseInt(meals[meal].age[6] / meals[meal].ageQty[6]) : 0,
                });
              }
            });
            line_.push({
              name: my,
            });
          });
          setData(data_);
          setDataL(dataL_);
          setDataA(dataA_);
        },
        (error) => {
          console.log("Error getting document", error);
        }
      );
  }, [])


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
                <div key={index} className="mealsAnalysis__gridRow">
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
          <BarChart
            width={500}
            height={300}
            data={dataL}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
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
            width={500}
            height={300}
            data={dataA}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="T1" stackId="a" fill="#8884d8" />
            <Bar dataKey="T2" stackId="a" fill="#82ca9d" />
            <Bar dataKey="T3" stackId="a" fill="#00FFFF" />
            <Bar dataKey="T4" stackId="a" fill="#5F9EA0" />
            <Bar dataKey="T5" stackId="a" fill="#FF7F50" />
            <Bar dataKey="T6" stackId="a" fill="#BDB76B" />
            <Bar dataKey="T7" stackId="a" fill="#FF1493" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default MealsAnalysis;
