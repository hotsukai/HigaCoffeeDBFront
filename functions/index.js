const functions = require("firebase-functions");
const https = functions.region("asia-northeast1").https;
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.secretWordValid = https.onRequest((request, response) => {
    isValid=(request.query.word=="sample")
    console.log(request.query.word)
    response.send(isValid);
  });