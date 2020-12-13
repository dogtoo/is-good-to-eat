import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./Question.css";
import { useStateValue } from "./Auth";
import Questionnaire from "./component/Questionnaire";

import { db, storage } from "./firebase";

function Question() {
  const { basket_number } = useParams();
  const [{ question }, dispatch] = useStateValue();
  const [testimg, setTestimg] = useState();
  //console.log("basket_number", basket_number);
  const history = useHistory();

  const handleUpload = async () => {
    let qs = [];
    await question.map((q, index) => {
      //console.log(q.pic_url.match(/data:image\/jpeg;base64,(.*)/)[1]);
      //console.log(qs);
      storage
        .ref("/azurefaceapi")
        .child(`${basket_number}_${index}`)
        .putString(
          q.pic_url.match(/data:image\/jpeg;base64,(.*)/)[1],
          "base64",
          {
            contentType: "image/jpg",
          }
        )
        .then((snapshot) => {
          //console.log(snapshot, "Uploaded a base64url string!");
          storage
            .ref(`/azurefaceapi/${basket_number}_${index}`)
            .getDownloadURL()
            .then((url) => {
              q.pic_url = url;
              q.ai_value = 0;
              q.ai_data = {};
              q.ai_procdate = null;
              qs.push(q);
              //console.log("question:", qs.length, index);
              //if (qs.length === index + 1) {
              //console.log("question:", qs);
              db.collection("order")
                .doc(basket_number)
                .update({
                  question: qs,
                })
                .then(() => {
                  dispatch({
                    type: "QUESTION_INIT",
                    payload: [],
                  });
                })
                .catch(function (error) {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                });
              //}
            });
        });
    });
  };

  const handleQuestion = () => {
    handleUpload().then(() => {
      //console.log("after upload");
      history.goBack();
    });
  };
  return (
    <div className="question__container">
      New Question
      <div className="question__content">
        {question?.map(({ content }, index) => {
          return (
            <div className="question__row">
              <Questionnaire content={content} index={index} />
            </div>
          );
        })}
        <div onClick={() => handleQuestion()}>送出💌</div>
      </div>
    </div>
  );
}

export default Question;
