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
document.getElementById('googleSignup').addEventListener('click', function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (data) {
        window.localStorage.setItem("name", data.additionalUserInfo.profile.name);
        window.localStorage.setItem("picture", data.additionalUserInfo.profile.picture);
        window.localStorage.setItem("userId", firebase.auth().currentUser.uid);
        window.location.href = "index.html"


    });
})

//----------------------------------Get Elements-----------------------------------------------------
const txtEmail = document.querySelector('.txtEmail');
const txtPassword = document.querySelector('.txtPassword');
const LoginBtn = document.querySelector('#LoginBtn');
const SignupBtn = document.querySelector('#SignupBtn');

// ----------------------------------Add login email---------------------------------------------------
LoginBtn.addEventListener('click', function () {
    alert("working")
    console.log("login");
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth(firebase.auth());
   firebase.auth().signInWithEmailAndPassword(email, password).then(function (data) {
    window.localStorage.setItem("name", data.additionalUserInfo.profile.name);
    window.localStorage.setItem("picture", data.additionalUserInfo.profile.picture);
    window.localStorage.setItem("userId", firebase.auth().currentUser.uid);
    window.location.href = "index.html"


});


});
SignupBtn.addEventListener('click', function () {
    alert("working")
    console.log("signin");
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password).then(function (data) {
        window.localStorage.setItem("name", data.additionalUserInfo.profile.name);
        window.localStorage.setItem("picture", data.additionalUserInfo.profile.picture);
        window.localStorage.setItem("userId", firebase.auth().currentUser.uid);
        window.location.href = "index.html"


    });

});
// firebase.auth.onAuthStateChanged(firebase,function() {
//     if (firebaseUser) {
//         console.log(firebaseUser);
//         window.localStorage.setItem("name", data.additionalUserInfo.profile.name);
//         window.localStorage.setItem("picture", data.additionalUserInfo.profile.picture);
//         window.localStorage.setItem("userId", firebase.auth().currentUser.uid);
//         window.location.href = 'index.html'
//     } else {
//         console.log("not logged in");
//     }
// });







// Custom signin 
// document.querySelector('#signInButton').addEventListener('click', function () {

//     signInEmail = document.querySelector('#signInEmail').value;
//     signInPassword = document.querySelector('#signInPassword').value;

//     let userlogin = firebase.auth().signInWithEmailAndPassword(signInEmail, signInPassword).catch(function (error) {
//         // Handle Errors here.
//         var errorCodeSignIn = error.code.split('/')[1];
//         var errorMessageSignIn = error.message;

//         if (errorCodeSignIn === 'wrong-password') {
//             alert("Entered password incorrect. Try again");
//             document.querySelector('#signInPassword').value = "";

//         } else if (errorCodeSignIn === 'user-not-found') {
//             alert("User not found. Please SignUp.");
//             document.querySelector('#signInEmail').value = "";
//             document.querySelector('#signInPassword').value = "";

//         } else {
//             alert("There was an error. Please try again.");
//             document.querySelector('#signInEmail').value = "";
//             document.querySelector('#signInPassword').value = "";
//         }
//     });



//     // for fetching uid from firebase.auth().

//     firebase.auth().onAuthStateChanged((userlogin) => {
//         uid = userlogin.uid;

//         if (uid !== null) {
//             localStorage.setItem('UserId', uid);

//             window.location.href = 'dashboard.html';
//         }
        
//     });
// })



// // custom SignUp 

// document.querySelector('#signUPButton').addEventListener('click', function () {

//     signUpEmail = document.querySelector('#signUpEmail').value;
//     signUpPassword = document.querySelector('#signUpPassword').value;

//     if (signUpPassword.length >= 8){
//         let userSignUp = firebase.auth().createUserWithEmailAndPassword(signUpEmail, signUpPassword).catch(function (error) {
//             // Handle Errors here.
//             var errorCodeSignUp = error.code;
//             var errorMessageSignUp = error.message;
    
//             // alert("Some error occurred. Please try again. 1");
    
//             console.log(errorCodeSignUp);
//             console.log(errorMessageSignUp);
    
//             if(errorCodeSignUp.split('/')[1] === "email-already-in-use"){
//                 alert(errorMessageSignUp);
//                 $('.modal').modal('hide');
    
//             } else {
//                 alert("Some error occured. Try again");
//             }
    
    
    
//         });
    
    
//         firebase.auth().onAuthStateChanged((userSignUp) => {
//             uid = userSignUp.uid;
    
//             if (uid != null){
//                 localStorage.setItem('UserId', uid);
    
//                 window.location.href = 'dashboard.html';
//             }
            
//         })
//     } else{
//         alert("Password must have minimum 8 characters");
//     }


    

// })
