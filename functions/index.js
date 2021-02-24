const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require("cors");

var url = require('url');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://study-buddies-88-default-rtdb.firebaseio.com"
});
 // Database reference
var ref = admin.database();

exports.getpeople = functions.https.onRequest((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  var q = url.parse(req.url,true).query;
  var data;
  var people = [];
  ref.ref('users').on("value", function(snapshot) {
        data = snapshot.val();   //snapshot contains the data
        for (var key in data){
          people.push({name:key,tags:(data[key])});
        }
      }, function (error) {
        console.log("Error: " + error.code);
  });

  data = {People:people};
  res.write(JSON.stringify(data,null,3)+"");
  res.end();
});

exports.updatemessage = functions.https.onRequest((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  var q = url.parse(req.url,true).query;
  var data;

  var messages = [];
  ref.ref('messages').on("value", function(snapshot) {
        data = snapshot.val();   //snapshot contains the data
        for (var key in data){
          messages.push({messageId:key,message:(data[key])});
        }
      }, function (error) {
        console.log("Error: " + error.code);
  });

  data = {messages:messages};
  res.write(JSON.stringify(data,null,3)+"");
  res.end();
});

exports.createuser = functions.https.onRequest((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  var q = url.parse(req.url,true).query;


  if("name" in q && "tags" in q){
    var tags = decodeURIComponent(q.tags).split(",").toString();
    console.log(tags);
    ref.ref('users').child(q.name).push(tags);
    res.write(JSON.stringify({success:true},null,3)+"");
  } else {
    res.write(JSON.stringify({success:false},null,3)+"");
  }

  res.end();
});

exports.sendmessage = functions.https.onRequest((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  var q = url.parse(req.url,true).query;


  if("sender" in q && "text" in q && "reciever" in q){
    var tags = decodeURIComponent(q.tags).split(",").toString();
    console.log(tags);
    ref.ref('messages').push(JSON.stringify({
      sender:q.sender,
      text:q.text,
      reciever:q.reciever}));
    res.write(JSON.stringify({success:true},null,3)+"");
  } else {
    res.write(JSON.stringify({success:false},null,3)+"");
  }

  res.end();
});
