alert("email authentication is having some trouble in this moment, click on the signup button and get signin via Google . Sorry for the inconvinence we will resolve the bug soon. Thank You")
const signinbtn = document.querySelector('#sign_in_btn');
const signupbtn = document.querySelector('#sign_up_btn');
const container = document.querySelector('.container');

signupbtn.addEventListener('click',function() {
    container.classList.add("sign-up-mode");
});
signinbtn.addEventListener('click', function() {
    container.classList.remove("sign-up-mode");
});
// _____________________________________________________
// if(localStorage.getItem("name")===null){
//     window.location.href="login.html";
// }
// document.querySelector("#user_dp").setAttribute("src",localStorage.getItem("picture").innerHTML=`style:height=100px; margin-top:50px;border:2px solid red`);
// document.querySelector("#user_name").textContent=localStorage.getItem("name");
// document.querySelector("logout").addEventListener('click',function(){
//     firebase.auth().signOut().then(function(){
//         localStorage.removeItem("name");
//         localStorage.removeItem("picture");
//         localStorage.removeItem("userId");
//        window.location.href="login.html";
//     }).catch(function(error){
//         alert("some error occured")
//     });
// })


