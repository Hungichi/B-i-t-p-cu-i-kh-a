import app from "./index.js";
import Login from "./login.js"
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
let popup = document.querySelector('.popup')
let iconclose = document.querySelector('.popup__header i')
let emailemtp = document.querySelector('.popup__body h2');
let creatsuccess = document.querySelector('.popup__body h2');
let useremp = document.querySelector('.popup__body h2');
let passemp = document.querySelector('.popup__body h2');
let CFpassemt = document.querySelector('.popup__body h2');
let wrongcf = document.querySelector('.popup__body h2');
class Register {
  $containerDiv
  $titleHeader
  $signupForm
  $emailInputEmail
  $nameInputTxt
  $passInputPass
  $confirmPassInputPass
  $submitBtn
  $gotoSigninLink
  constructor() {
    this.$emailInputEmail = document.createElement("input"); // <input> </input>
    this.$emailInputEmail.type = "email"; // <input type="email"> </input>
    this.$emailInputEmail.placeholder = "Enter your email ..."; // <input type="email" placeholder="Enter your email ..."> </input>
    
    this.$nameInputTxt = document.createElement("input");
    this.$nameInputTxt.type = "text";
    this.$nameInputTxt.placeholder = "Enter your name ...";
    
    this.$passInputPass = document.createElement("input");
    this.$passInputPass.type = "password";
    this.$passInputPass.placeholder = "Enter your password ...";
   
    this.$confirmPassInputPass = document.createElement("input");
    this.$confirmPassInputPass.type = "password";
    this.$confirmPassInputPass.placeholder = "Confirm your password ...";
   
    this.$submitBtn = document.createElement("button");
    this.$submitBtn.type = "submit";
    this.$submitBtn.innerHTML = "Register"; // <button> Register </button>
    this.$submitBtn.addEventListener("click", this.handleSubmit);
   
    this.$gotoSigninLink = document.createElement("a");
    this.$gotoSigninLink.innerHTML = "You already have account? Signin now";
    this.$gotoSigninLink.addEventListener("click", this.gotoSignin);
   
    this.$containerDiv = document.createElement("div");
    this.$containerDiv.classList.add("center", "app");
   
    this.$titleHeader = document.createElement("h2");
    this.$titleHeader.innerHTML = "Create your account";
    this.$signupForm = document.createElement("form");
  }
  initRender = (container) => {
    this.$signupForm.appendChild(this.$emailInputEmail);
    this.$signupForm.appendChild(this.$nameInputTxt);
    this.$signupForm.appendChild(this.$passInputPass);
    this.$signupForm.appendChild(this.$confirmPassInputPass);
    this.$signupForm.appendChild(this.$submitBtn);
    this.$containerDiv.appendChild(this.$titleHeader);
    this.$containerDiv.appendChild(this.$signupForm);
    this.$containerDiv.appendChild(this.$gotoSigninLink);
    container.appendChild(this.$containerDiv);
  }
  // bat su kien khi nhan nut submit
  handleSubmit = (e) => {
    // validation
     e.preventDefault(); // can lai cac su mac dinh de xem co dung yeu cau nhap du lieu chua 
     const email = this.$emailInputEmail.value;
     const password = this.$passInputPass.value;
     const confirmPass = this.$confirmPassInputPass.value;
     const userName = this.$nameInputTxt.value;
     if(email == "") {
      emailemtp.innerHTML="Email empty"
      toggle()
    return ;
     }
     if(password.length < 6) {
      alert("Password must be least 6 letters!");
      return;
     }
     if(userName == "") {
      useremp.innerHTML="User empty"
    toggle()
    return ;

     }
     if(password == ""){
      passemp.innerHTML="Password empty"
      toggle()
    return ;
     }
     if(confirmPass == "") {
      CFpassemt.innerHTML="Please confirm your password"
      toggle()
    return ;
     }
     if(password != confirmPass) {
      wrongcf.innerHTML="Your Password Not Macth "
      toggle()
    return ;
     }
    // if(email != " " && userName != " " && password.length >= 6 && confirmPass == password ){
    //   creatsuccess.innerHTML="Create Successfull"
    //   toggle()
    //   return true;
    // }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  }
  gotoSignin = () => {
    const login = new Login();
    // change active section
    app.changeActiveScreen(login); 
  }
}

function toggle(e){
  popup.classList.toggle('hide')
}
iconclose.addEventListener('click', toggle)
popup.addEventListener('click' , function(e)  {
  if(e.target == e.currentTarget){
    toggle()
  }
})
export default Register;
