// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const firebase = require('firebase-database');
var firebaseConfig = {
    apiKey: "AIzaSyDEoiQ8N9DNsakYRCOgHiClO6J_WbhRs2M",
    authDomain: "study-buddies-88.firebaseapp.com",
    databaseURL: "https://study-buddies-88-default-rtdb.firebaseio.com",
    projectId: "study-buddies-88",
    storageBucket: "study-buddies-88.appspot.com",
    messagingSenderId: "532691385679",
    appId: "1:532691385679:web:38a0424b56ae1b650e193a",
    measurementId: "G-718FP2KPNC"
  };

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();


var http = require('http');
var url = require('url');

firebase.initializeApp(firebaseConfig);
 // Database reference
var ref = firebase.database().ref();
ref.on("value", function(snapshot) {
      console.log(snapshot.val());   //snapshot contains the data
    }, function (error) {
      console.log("Error: " + error.code);
});

function all(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var q = url.parse(req.url,true).query;
  var data;
  switch(q.task){
    case "createuser":
      data = createUser(q);
      break;
    case "getpeople":
      data = getPeople(q);
      break;
    case "sendMessage":
      data = sendMessage(q);
      break;
    case "updateMessage":
      data = updateMessage(q)
      break;
  }
  res.write(JSON.stringify(data,null,3)+"");
  res.end();
}

function createUser(data){
  return {Username:data.username};
}

function getPeople(data){
  var list = [
    {name:"Sarah",relation:"Food",pos:{x:5,y:5}},
    {name:"Doug",relation:"Games",pos:{x:25,y:15}}
  ];
  return {People:list};
}

function sendMessage(data){
  return {Username:data.username};
}

function updateMessage(data){
  return {Username:data.username};
}
