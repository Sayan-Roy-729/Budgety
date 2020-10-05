const signinbtn = document.querySelector('#sign_in_btn');
const signupbtn = document.querySelector('#sign_up_btn');
const container = document.querySelector('.container');

signupbtn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");
});
signinbtn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode");
});
// _____________________________________________________
// document.querySelector('#add_expense').addEventListener('clck',function(){
//     alert("hello")
// })
