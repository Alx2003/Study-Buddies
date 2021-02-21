const firebaseConfig = {
  apiKey: "AIzaSyDEoiQ8N9DNsakYRCOgHiClO6J_WbhRs2M",
  authDomain: "study-buddies-88.firebaseapp.com",
  projectId: "study-buddies-88",
  storageBucket: "study-buddies-88.appspot.com",
  messagingSenderId: "532691385679",
  appId: "1:532691385679:web:38a0424b56ae1b650e193a",
  measurementId: "G-718FP2KPNC"
};

// Initialize Firebase  **************WRITTING INTO THE DATABASE********************
firebase.initializeApp(firebaseConfig);
 // Database reference
var firebaseRef = firebase.database().ref('users');
console.log(firebaseRef);

function setCookie(name){
    document.cookie = name;
}

function createUser(){
  var name = document.getElementById("nameform").value;
  var tags = document.getElementById("tagform").value;
  firebaseRef.child(name).push(tags.split(",").toString());
}

function signUp(cName){
  setCookie(cName);
  createUser();
  window.location.replace("home.html");
}
