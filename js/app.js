alert("Email authentication is having some trouble in this moment, click on the signup button and get signin via Google . Sorry for the inconvinence we will resolve the bug soon. Thank You")
const signinbtn = document.querySelector('#sign_in_btn');
const signupbtn = document.querySelector('#sign_up_btn');
const container = document.querySelector('.container');

signupbtn.addEventListener('click',function() {
    container.classList.add("sign-up-mode");
});
signinbtn.addEventListener('click', function() {
    container.classList.remove("sign-up-mode");
});



