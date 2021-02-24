// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var text = document.getElementById('output');
var pos = {x:"none",y:0};
var offset = {x:0,y:0};
var oldPos = {x:0, y:0};
var mousePos = 0;
var circles = [];
var mouse = {x:0,y:0};
var circleX = 0;
var circleY = 0;
var name = "You";
var selectProfile;
window.setInterval(function(){checkMessage()}, 1000);



// Initialize Firebase  **************WRITTING INTO THE DATABASE********************
firebase.initializeApp(firebase.credential.applicationDefault());
 // Database reference
var firebaseRef = firebase.database().ref('messages');

var url = "https://us-central1-study-buddies-88.cloudfunctions.net/getpeople";

var users = JSON.parse(httpGet(url)).People;

for (var i = 0;i < users.length;i++){
  circles.push(createProfile({name:users[i].name,tags:users[i].tag}));
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.response;
}

function checkMessage(){
  var messageBox = document.getElementById('messages');
  while (messageBox.firstChild){
    messageBox.removeChild(messageBox.lastChild);
  }
  var messages = JSON.parse(httpGet("https://us-central1-study-buddies-88.cloudfunctions.net/updatemessage")).messages;
  for (var i = 0; i<messages.length;i++){
    var m = JSON.parse(messages[i].message);
    if (m.sender == name){
      sentMe({text:m.text});
    }
    else if (m.sender == selectProfile){
      recieveMessage(m);
    }
  }
}

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

function sentMe(input){
  var msg = {sender:"You",text:input.text, reciever:""};
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
}

function sendMessage(input){
  var msg = {sender:name,text:input.value, reciever:selectProfile};
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

function createProfile(data){
  image = {img:document.createElement("img"), x:circleX,y:circleY,scale:50,name:data.name,tags:data.tags};
  circleX+=50;
  if (circleX > 200){
    circleX = 0;
    circleY+=50;
  }
  image.img.src = "https://i.redd.it/lhogxfo3rf151.png";
  image.img.draggable = false;
  image.img.style.position = "absolute";
  image.img.style.width = image.scale+"px";
  image.img.style.height = "auto";
  image.img.style.left = image.x+"px";
  image.img.style.top = image.y+"px";
  console.log(image.x+" "+image.y);
  image.img.onclick = function(){profileClicked(this);};
  image.img.id = "C"+circles.length;
  circles.push(image);
  var name = document.createElement("p");
  name.innerHTML = image.name;
  image.img.appendChild(name);
  document.getElementById("square").appendChild(image.img);

  return image;
}

function profileClicked(profileImg){
  profileImg.style.backgroundColor = "red";
  selectProfile = circles[parseInt((profileImg.id).slice(1))].name;
  text.innerHTML = selectProfile;
  document.getElementById("messageBox").style.display = "block";
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

username = document.cookie;
