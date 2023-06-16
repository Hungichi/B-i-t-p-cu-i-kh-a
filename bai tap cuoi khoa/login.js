
import app from "./index.js";
import Register from "./register.js"
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

class Login {
  $containerDiv
  $titleHeader
  $signinForm
  $emailInputEmail
  $passInputPass
  $submitBtn
  $gotoSignupLink
  constructor() {
    this.$emailInputEmail = document.createElement("input"); // <input> </input>
    this.$emailInputEmail.type = "email"; // <input type="email"> </input>
    this.$emailInputEmail.placeholder = "Enter your email ..."; // <input type="email" placeholder="Enter your email ..."> </input>
    this.$passInputPass = document.createElement("input");
    this.$passInputPass.type = "password";
    this.$passInputPass.placeholder = "Enter your password ...";
    this.$submitBtn = document.createElement("button");
    this.$submitBtn.type = "submit";
    this.$submitBtn.innerHTML = "Login"; // <button> Register </button>
    this.$submitBtn.addEventListener("click", this.handleSubmit);
    this.$gotoSignupLink = document.createElement("a");
    this.$gotoSignupLink.innerHTML = "Register your new account here";
    this.$gotoSignupLink.addEventListener("click", this.gotoSignup);
    this.$containerDiv = document.createElement("div");
    this.$containerDiv.classList.add("center", "app");
    this.$titleHeader = document.createElement("h2");
    this.$titleHeader.innerHTML = "Login";
    this.$signinForm = document.createElement("form");
  }
  initRender = (container) => {
    this.$signinForm.appendChild(this.$emailInputEmail);
    this.$signinForm.appendChild(this.$passInputPass);
    this.$signinForm.appendChild(this.$submitBtn);
    this.$containerDiv.appendChild(this.$titleHeader);
    this.$containerDiv.appendChild(this.$signinForm);
    this.$containerDiv.appendChild(this.$gotoSignupLink);
    container.appendChild(this.$containerDiv);
  }
  // bat su kien khi nhan nut submit
  handleSubmit = (e) => {
    // validation
    e.preventDefault(); // can lai cac su mac dinh de xem co dung yeu cau nhap du lieu chua 
    const email = this.$emailInputEmail.value;
    const password = this.$passInputPass.value;
    if (email == "") {
      alert("Email cannot be empty!");
      return;
    }
    if (password.length < 6) {
      alert("Password must be least 6 letters!");
      return;
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  gotoSignup = () => {
    const signup = new Register();
    // change active section 
    app.changeActiveScreen(signup);
  }
}
export default Login;