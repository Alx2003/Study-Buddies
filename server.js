// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();


var http = require('http');
var url = require('url');

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
