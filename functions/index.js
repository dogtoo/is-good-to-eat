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
  const queryQ = async (question, basket_number) => {
    return Promise.all(
      question.map(async(q)=>{
        imageUrl = q.pic_url;
        //console.log(imageUrl);
        try {
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
          //console.log(response.data[0].faceAttributes);
          q.ai_value = 0;
          q.ai_procdate = new Date();
          q.ai_data = {};
          response.data.map(({faceAttributes})=>{
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
            q.ai_data = faceAttributes;
          });
          question_[basket_number] = [...question_[basket_number], q];
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
      queryQ(docs.data().question, basket_number).then(()=>{
        console.log(basket_number, 'need after axios', question_[basket_number].length);
        admin
        .firestore()
        .collection("order")
        .doc(basket_number).update({
          ai_date: new Date(),
          question: question_[basket_number],
        });
      });
      
      /**/
    })
    response.send("Hello from Firebase!");
  });

  //const bucket = admin.storage().bucket();

  /*bucket.getFiles().then(function (data) {
    data.map((f) => {
      console.log(f);
      imageUrl = f[0].metadata.mediaLink;
    })
  });*/
  
  
});
