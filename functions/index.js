const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require('axios').default;
//import * as functions from "firebase-functions";
//import * as admin from "firebase-admin";
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  /*const promise = admin
    .firestore()
    .collection("order")
    .where("is_checkout", "==", true)
    .get();
  promise.then((snapshot) => {
    snapshot.forEach((docs) => {
      console.log(docs.data())
    })
    response.send("Hello from Firebase!");
  });*/

  const bucket = admin.storage().bucket();
  //bucket.exists(function (err, exists) { });

  // Add a valid subscription key and endpoint to your environment variables.
  let subscriptionKey = '2afb002a86874f1483f68d7d50fb0cc4'
  let endpoint = 'https://is-good-to-eat.cognitiveservices.azure.com' + '/face/v1.0/detect'

  // Optionally, replace with your own image URL (for example a .jpg or .png URL).
  let imageUrl = ''
  bucket.getFiles().then(function (data) {
    data.map((f) => {
      //f.map(({ metadata }) => {
      console.log(f[0].metadata.mediaLink);
      imageUrl = f[0].metadata.mediaLink;
      axios({
        method: 'post',
        url: endpoint,
        params: {
          detectionModel: 'detection_01',
          returnFaceId: true
        },
        data: {
          url: imageUrl,
        },
        headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
      }).then(function (response) {
        console.log('Status text: ' + response.status)
        console.log('Status text: ' + response.statusText)
        console.log()
        console.log(response.data)
      }).catch(function (error) {
        console.log(error)
      });
      //})

    })
  });
  //console.log(storage.bucket())
  /*storageRef.child('azurefaceapi/1ed3d7-cef8-5478-a02-ae880c4cf_0').getDownloadURL().then(function (url) {
    console.log(url)
  }).catch(function (error) {
    // Handle any errors
  });*/
});
