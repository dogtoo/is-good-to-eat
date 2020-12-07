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
    await question.map((q, index) => {
      //console.log(pic_url.match(/data:image\/jpeg;base64,(.*)/)[1]);
      storage
        .ref("/azurefaceapi")
        .child(`${basket_number}_${index}`)
        .putString(q.pic_url.match(/data:image\/jpeg;base64,(.*)/)[1], "base64", {
          contentType: "image/jpg",
        })
        .then((snapshot) => {
          console.log(snapshot, "Uploaded a base64url string!");
          storage
          .ref(`/azurefaceapi/${basket_number}_${index}`).getDownloadURL()
          .then((url) => {        
            q.pic_url = url;
            q.ai_value = 0;
            q.ai_data = {};
            q.ai_procdate = null;
            //console.log(question);
            db.collection("order")
              .doc(basket_number)
              .update({
                question: q,
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
        })
        });
    });
    //return question_;
  };

  const handleQuestion = () => {
    //let question_ = handleUpload();

    //console.log(question_);
    handleUpload().then(() => {
      history.goBack();
    });
  };
  return (
    <div>
      New Question
      {testimg && <img className="order__imgShow" src={testimg} />}
      {question?.map(({ content }, index) => {
        return (
          <div>
            <Questionnaire content={content} index={index} />
          </div>
        );
      })}
      <div onClick={() => handleQuestion()}>送出💌</div>
    </div>
  );
}

export default Question;
