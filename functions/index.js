const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require('axios').default;
//import * as functions from "firebase-functions";
//import * as admin from "firebase-admin";
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.batchAzure = functions.https.onRequest((request, response) => {
  // Add a valid subscription key and endpoint to your environment variables.
  let subscriptionKey = '2afb002a86874f1483f68d7d50fb0cc4'
  let endpoint = 'https://is-good-to-eat.cognitiveservices.azure.com' + '/face/v1.0/detect'

  // Optionally, replace with your own image URL (for example a .jpg or .png URL).
  let imageUrl = ''
  let question_ = {};
  let statistics = {};
  let content = '';
  const calculation = ({ anger, contempt, disgust, fear, happiness, neutral, sadness, surprise }) => {
    /*
      "contempt": 鄙視
      "surprise": 吃驚
      "happiness": 幸福
      "neutral": 自然
      "sadness": 悲傷
      "disgust": 厭惡
      "anger": 憤怒
      "fear": 恐懼
    */
    if (neutral >= 0.8) {
      return 1;
    } else if (disgust >= 0.8 || anger >= 0.8 || fear >= 0.8) {
      return -2;
    } else if (happiness >= 0.8) {
      return 2;
    } else if (neutral >= 0.5) {
      if (sadness > 0.1)
        return 1;
      if (contempt > 0.1)
        return 1;
      if (surprise > 0.1)
        return 1;
    } else if (neutral < 0.5) {
      if (sadness > 0.1)
        return -1;
      if (contempt > 0.1)
        return -1;
      if (surprise > 0.1)
        return -1;
    } else
      return 0;

  }

  const queryQ = async (question, basket_number) => {
    return Promise.all(
      question.map(async (q, index) => {
        imageUrl = q.pic_url;
        try {
          console.log(basket_number, 'run imageUrl', index, content);
          const response = await axios({
            method: 'post',
            url: endpoint,
            params: {
              detectionModel: 'detection_01',
              returnFaceAttributes: 'age,gender,smile,emotion,blur,exposure,noise',
              returnFaceId: true
            },
            data: {
              url: imageUrl,
            },
            headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
          })
          //console.log(response.data[0]);
          response.data[0] &&
            console.log(basket_number, 'run age', index, response.data[0].faceAttributes.age);

          q.ai_value = 0;
          q.ai_procdate = new Date();
          q.ai_data = {};
          //let meal_name = q.content.meal_name;
          response.data.map(({ faceAttributes }) => {
            /*
            age:22,
            blur: {
              blurLevel:"low",
              value:0,
            },
            emotion: {
              anger:0.001,
              contempt:0.023,
              disgust:0.001,
              fear:0,
              happiness:0.001,
              neutral:0.651,
              sadness:0.324,
              surprise:0,
            exposure: {
              exposureLevel:"overExposure",
              value:0.78,
              gender:"male",
            },
            noise: {
              noiseLevel:"low",
              value:0,
            },
            smile:0.001,
            */
            //console.log(faceAttributes);
            content = q.content.meal_name ? q.content.meal_name : q.content.waiter;
            contentName = q.content.meal_name ? 'meal' : 'waiter';
            q.ai_data = faceAttributes;
            q.ai_value = calculation(faceAttributes.emotion)
            console.log(faceAttributes.age);
            let TN = 0;
            let age = faceAttributes ? parseInt(faceAttributes.age) : 20;
            if (age >= 20 && age < 30)
              TN = 1;
            else if (age >= 30 && age < 40)
              TN = 3;
            else if (age >= 40 && age < 50)
              TN = 4;
            else if (age >= 50 && age < 60)
              TN = 5;
            else if (age > 60)
              TN = 6;
            else
              TN = 0;

            let gd = 0;
            if (faceAttributes && faceAttributes.gender === 'male')
              gd = 1;

            if (!statistics[content]) {
              let oj = {}
              oj[content] =
              {
                age: [0, 0, 0, 0, 0, 0, 0],
                ageQty: [0, 0, 0, 0, 0, 0, 0],
                aivalue: 0,
                gender: [0, 0],
                genderQty: [0, 0],
                qty: 0,
                question: 0,
                content: contentName,
              }
              statistics = { ...statistics, ...oj }
            }
            //console.log(TN, 'statistics', statistics[content].age[TN], q.ai_value);
            statistics[content].age[TN] = statistics[content].age[TN] + parseInt(q.value) + parseInt(q.ai_value);
            statistics[content].ageQty[TN] = statistics[content].ageQty[TN] + 1;
            statistics[content].aivalue = statistics[content].aivalue + parseInt(q.ai_value);
            statistics[content].gender[gd] = statistics[content].gender[gd] + parseInt(q.value) + parseInt(q.ai_value);
            statistics[content].genderQty[gd] = statistics[content].genderQty[gd] + 1;
            statistics[content].qty = statistics[content].qty + 1;
            statistics[content].question = statistics[content].question + parseInt(q.value);
            statistics[content].content = contentName;
          });
          question_[basket_number][index] = q;
        } catch (error) {
          console.log(error)
        };

      })
    )
  }

  const promise = admin
    .firestore()
    .collection("order")
    .where("is_checkout", "==", true)
    .where("ai_date", "==", null)
    .get();
  promise.then((snapshot) => {
    snapshot.forEach((docs) => {
      //console.log(docs.data().question.pic_url)
      const basket_number = docs.data().basket_number;
      question_[basket_number] = [];
      console.log('begin queryQ', basket_number)
      queryQ(docs.data().question, basket_number).then(() => {
        console.log(basket_number, 'need after axios', question_[basket_number].length);
        docs.ref.update({ question: question_[basket_number], ai_date: new Date() });
        /*await admin
          .firestore()
          .collection("order")
          .doc(basket_number).update({
            //ai_date: new Date(),
            question: question_[basket_number],
          });*/
        //admin.firestore().collection("statistics")
      }).then(() => {
        console.log('after queryQ', basket_number);
        const p = admin
          .firestore()
          .collection("statistics")
          .where("my", "==", '202012')
          .get();
        p.then((snapshot) => {
          snapshot.forEach((docs_stat) => {
            Object.keys(docs_stat.data().meals).map((meal) => {
              let meal_ = docs_stat.data().meals[meal];
              if (statistics[meal]) {
                statistics[meal].age.map((T, index) => {
                  statistics[meal].age[index] = T + (meal_.age[index] ? parseInt(meal_.age[index]) : 0);
                  statistics[meal].ageQty[index] = T + (meal_.ageQty[index] ? parseInt(meal_.ageQty[index]) : 0);
                })
                statistics[meal].qty = statistics[meal].qty + meal_.qty;
                statistics[meal].aivalue = statistics[meal].aivalue + meal_.aivalue;
                statistics[meal].gender.map((G, index) => {
                  statistics[meal].gender[index] = G + (meal_.gender[index] ? parseInt(meal_.gender[index]) : 0);
                  statistics[meal].genderQty[index] = G + (meal_.genderQty[index] ? parseInt(meal_.genderQty[index]) : 0);
                })
                statistics[meal].question = statistics[meal].question + meal_.question;
              } else {
                statistics[meal] = meal_
              }

            })
            console.log('statistics', statistics)
            docs_stat.ref.update({ meals: { ...statistics } })
          });
        });
      });

      /**/
    })
  });
  console.log('after promise');
  response.send("Hello from Firebase!");
  //const bucket = admin.storage().bucket();

  /*bucket.getFiles().then(function (data) {
    data.map((f) => {
      console.log(f);
      imageUrl = f[0].metadata.mediaLink;
    })
  });*/


});

/*測試用
        statistics = {
          beefburg: {
            age: [
              6, 0, 0, 0,
              0, 0, 0
            ],
            ageQty: [
              1, 0, 0, 0,
              0, 0, 0
            ],
            aivalue: 6,
            gender: [0, 6],
            genderQty: [0, 1],
            qty: 1,
            question: 5
          },
          beefpizza: {
            age: [
              5, 0, 0, 0,
              0, 0, 0
            ],
            ageQty: [
              1, 0, 0, 0,
              0, 0, 0
            ],
            aivalue: 5,
            gender: [0, 5],
            genderQty: [0, 1],
            qty: 1,
            question: 4
          },
          '03': {
            age: [
              6, 0, 0, 0,
              0, 0, 0
            ],
            ageQty: [
              1, 0, 0, 0,
              0, 0, 0
            ],
            aivalue: 6,
            gender: [0, 6],
            genderQty: [0, 1],
            qty: 1,
            question: 5
          },
          porkpizza: {
            age: [
              6, 0, 0, 0,
              0, 0, 0
            ],
            ageQty: [
              1, 0, 0, 0,
              0, 0, 0
            ],
            aivalue: 6,
            gender: [0, 6],
            genderQty: [0, 1],
            qty: 1,
            question: 5
          }
        }
        */