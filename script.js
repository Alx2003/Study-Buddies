// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEoiQ8N9DNsakYRCOgHiClO6J_WbhRs2M",
  authDomain: "study-buddies-88.firebaseapp.com",
  projectId: "study-buddies-88",
  storageBucket: "study-buddies-88.appspot.com",
  messagingSenderId: "532691385679",
  appId: "1:532691385679:web:38a0424b56ae1b650e193a",
  measurementId: "G-718FP2KPNC"
};

var text = document.getElementById('output');
var pos = {x:"none",y:0};
var offset = {x:0,y:0};
var oldPos = {x:0, y:0};
var mousePos = 0;
var circles = [];
var mouse = {x:0,y:0};

recieveMessage({text:"Goo goo gaa gaa",sender:"Fahim"});
recieveMessage({text:"booga wooga",sender:"Fahim"});
recieveMessage({text:"swigga",sender:"Fahim"});
recieveMessage({text:"Test",sender:"Fahim"});



// Initialize Firebase  **************WRITTING INTO THE DATABASE********************
firebase.initializeApp(firebaseConfig);
 // Database reference
var firebaseRef = firebase.database().ref('messages');

document.addEventListener('keydown', function (event){
  var box = document.getElementById('square');
  text.innerHTML = event.keyCode;
  if (event.keyCode == 36){
    oldPos.x = 0;
    oldPos.y = 0;

    box.style.left = 0+"px";
    box.style.top = 0+"px";
  }
  else if (event.keyCode == 13){
    var input = document.getElementById("messageInput");
    if(input.value != ""){
      sendMessage(input);
    }
  }
});

document.addEventListener('wheel', function(event) {
  var dir = 1.0+0.05*event.deltaY/-100;
  var i;
  var circle;
  for (i = 0;i<circles.length;i++){
    circle = circles[i];
    moveProfile(circle,{x:circle.x - (mouse.x-pos.x), y:circle.y - (mouse.y-pos.y)});
    moveProfile(circle,{x:circle.x *dir,y:circle.y * dir});
    scaleProfile(circle,circle.scale*dir);
    moveProfile(circle,{x:circle.x + (mouse.x-pos.x), y:circle.y + (mouse.y-pos.y)});
  }
});

function recieveMessage(msg){
  var messageDiv = document.createElement("div");
  var messageBody = document.createElement("p");
  var messageUsername = document.createElement("p");

  messageDiv.className="message";

  messageUsername.innerHTML = msg.sender;
  messageUsername.style.fontWeight = "bold";
  messageUsername.style.top = "0px";

  messageBody.innerHTML = msg.text
  messageBody.style.top = "20px";

  messageDiv.appendChild(messageUsername);
  messageDiv.appendChild(messageBody);
  document.getElementById('messages').appendChild(messageDiv);
}

function sendMessage(input){
  var msg = {sender:"You",text:input.value, reciever:""};
  var messageDiv = document.createElement("div");
  var messageBody = document.createElement("p");
  var messageUsername = document.createElement("p");

  messageDiv.className="message";

  messageUsername.innerHTML = msg.sender;
  messageUsername.style.fontWeight = "bold";
  messageUsername.style.top = "0px";

  messageBody.innerHTML = msg.text;
  messageBody.style.top = "20px";
  messageUsername.style.left = "auto";
  messageUsername.style.right = "0px";
  messageBody.style.left = "auto";
  messageBody.style.right = "0px";

  messageDiv.appendChild(messageUsername);
  messageDiv.appendChild(messageBody);
  document.getElementById('messages').appendChild(messageDiv);
  firebaseRef.push(JSON.stringify(msg));
  input.value=""
}

function createProfile(pos){
  image = {img:document.createElement("img"), x:0,y:0,scale:50};
  image.img.src = "https://i.redd.it/lhogxfo3rf151.png";
  image.img.draggable = false;
  image.img.style.position = "absolute";
  image.img.style.width = image.scale+"px";
  image.img.style.height = "auto";
  image.x = pos.x;
  image.y = pos.y;
  image.img.style.left = image.x+"px";
  image.img.style.top = image.y+"px";
  image.img.onclick = function(){profileClicked(this);};
  image.img.id = "C"+circles.length;
  circles.push(image);
  document.getElementById("square").appendChild(image.img);

  return image;
}

function profileClicked(profileImg){
  text.innerHTML = profileImg.id;
  profileImg.style.backgroundColor = "red";
  var profile = circles[parseInt((profileImg.id).slice(1))];



}

function moveProfile(profile, pos){
  profile.x = pos.x;
  profile.y = pos.y;
  profile.img.style.left = profile.x+"px";
  profile.img.style.top = profile.y+"px";
}

function scaleProfile(profile, newScale){
  profile.scale = newScale;
  profile.img.style.width = profile.scale+"px";
}

document.getElementById('map').onmousedown = function mouseDown(event){
  mousePos++;
  pos.x = event.clientX;
  pos.y = event.clientY;
}
document.getElementById('map').onmouseup = function mouseUp(event){
  var box = document.getElementById('square');
  mousePos--;
  oldPos.x = oldPos.x+offset.x;
  oldPos.y = oldPos.y+offset.y;
  pos.x = event.clientX;
  pos.y = event.clientY;
}

document.getElementById('map').onmousemove = function drag(event){
  var box = document.getElementById('square');

  if (pos.x == "none"){
    pos.x = event.clientX;
    pos.y = event.clientY;
  }
  if (mousePos == 1){
    offset.x = event.clientX - pos.x;
    offset.y = event.clientY - pos.y;

    box.style.left = oldPos.x+offset.x+"px";
    box.style.top = oldPos.y+offset.y+"px";
  }
  mouse.x = event.clientX;
  mouse.y = event.clientY;
}

function randomNum(max){
  return Math.floor(Math.random() * Math.floor(max));
}

function checkCookie() {
  var cookie = getCookie("username");
  if (username != "") {
    window.location.replace("signup.html"); //Change to live link
  } else {
      //Read users data from database using "username"
    }
  }
}
