const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require("cors");
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

var url = require('url');
admin.initializeApp({
  credential: admin.credential.cert("servicekey.json"),
  databaseURL: "https://study-buddies-88-default-rtdb.firebaseio.com"
});
 // Database reference
var ref = admin.database();

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  var q = url.parse(req.url,true).query;
  var data;
  switch(q.task){
    case "createuser":
      data = createUser(q);
      break;
    case "getpeople":
      data = getPeople(q);
      break;
    case "sendmessage":
      data = sendMessage(q);
      break;
    case "updatemessage":
      data = updateMessage(q)
      break;
  }
  res.write(JSON.stringify(data,null,3)+"");
  res.end();
});

function createUser(data){
  return {Username:data.username};
}

function getPeople(data){
  console.log(ref);
  var data;
  var list = [];
  ref.ref('users').on("value", function(snapshot) {
        data = snapshot.val();   //snapshot contains the data
        for (var key in data){
          list.push({name:key,tags:(data[key])});
        }

        console.log(list);
      }, function (error) {
        console.log("Error: " + error.code);
  });

  return {People:list};
}

function sendMessage(data){
  return {Username:data.username};
}

function updateMessage(data){
  var data;
  var list = [];
  ref.ref('messages').on("value", function(snapshot) {
        data = snapshot.val();   //snapshot contains the data
        for (var key in data){
          list.push({messageId:key,message:(data[key])});
        }

        console.log(list);
      }, function (error) {
        console.log("Error: " + error.code);
  });

  return {messages:list};
}
