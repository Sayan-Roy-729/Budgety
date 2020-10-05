var firebaseConfig = {
    apiKey: "AIzaSyAWyZGfrajvUfHKK8etvybSiLx_flRtArc",
    authDomain: "budgety-expense-tracker-app.firebaseapp.com",
    databaseURL: "https://budgety-expense-tracker-app.firebaseio.com",
    projectId: "budgety-expense-tracker-app",
    storageBucket: "budgety-expense-tracker-app.appspot.com",
    messagingSenderId: "984944601949",
    appId: "1:984944601949:web:f01675a83730cf5df8d6b4"
};
firebase.initializeApp(firebaseConfig);

//<------------------------ SignUp with Google--------------------->
document.querySelector('#googleSignup').addEventListener('click',function(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(data) {
        window.localStorage.setItem("name",data.additionalUserInfo.profile.name);
        window.localStorage.setItem("picture",data.additionalUserInfo.profile.picture);
        window.localStorage.setItem("userId",firebase.auth().currentUser.uid);
        window.location.href ="index.html"
  
        
      });
})