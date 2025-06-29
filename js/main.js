"use strict"
let email_login=document.getElementById("email_login");
let pass_login=document.getElementById("password_login");
let email_signup=document.getElementById("email_signup");
let pass_signup=document.getElementById("password_signup");
let user_name=document.getElementById("name_signup");
let name_home=document.getElementById("home");
let users=[];



if(localStorage.getItem("Users")!=null){
    users=JSON.parse(localStorage.getItem("Users"));
}




function signup(){
    if(!validateName()){
      Swal.fire({
      icon: 'error',
      title: 'Invalid Name',
      text: 'The min number of characters is 3!',
    });
    console.log("name error")
    return;
    }else if(!validateEmail()){
      Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please enter a valid email',
    });
    console.log("email error")
    return;  
    }else if(!validatePassword()){
     Swal.fire({
      icon: 'error',
      title: 'Invalid password',
      text: 'Password must be at least 8 characters with at least one uppercase letter ,lowercase letter, digit and a special character',
    });
    console.log("password error")
    return;
    }else if(users.findIndex((element) => element.email == email_signup.value.trim()) !== -1){
     Swal.fire({
      icon: 'error',
      title: 'Duplicate Email',
      text: 'This email already exists!',
    });
    console.log("duplicate error")
    return;
    }
   let user={
        username: user_name.value.trim(),
        email: email_signup.value.trim(),
        pass: pass_signup.value.trim()
   }
   users.push(user);
   localStorage.setItem("Users",JSON.stringify(users));
  Swal.fire({
  title: "Success",
  text: "You've been added as a user",
  icon: "success",
  showConfirmButton: false,
  timer: 1500 
}).then(() => {
  window.location.href = "../index.html";
});
   clearSignup();
}


function validateName(){
  let name_regex=/^[a-zA-Z0-9\s]{3,}$/;
     if (name_regex.test(user_name.value.trim())) {
    user_name.classList.add("is-valid");
    user_name.classList.remove("is-invalid");
    return true;
  } else {
    user_name.classList.add("is-invalid");
    user_name.classList.remove("is-valid");
    return false;
  }
}

function validateEmail(){
    let mail_regex=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
   if(mail_regex.test(email_signup.value.trim())){
    email_signup.classList.add("is-valid");
    email_signup.classList.remove("is-invalid");
    return true;
   }else{
    email_signup.classList.add("is-invalid");
    email_signup.classList.remove("is-valid");
    return false;
   }
}


function validatePassword(){
    let pass_regex= /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(pass_regex.test(pass_signup.value.trim())){
     pass_signup.classList.add("is-valid");
     pass_signup.classList.remove("is-invalid");
    return true;
    }else{
    pass_signup.classList.add("is-invalid");
     pass_signup.classList.remove("is-valid");
    return false;
    }


}


function clearSignup(){
    user_name.value=""
    email_signup.value=""
    pass_signup.value=""
}


function login(){
  
  const user = users.find(
    (element) =>
      element.email === email_login.value.trim() &&
      element.pass === pass_login.value.trim()
  );
  console.log(user);
if(user)
{

    email_login.classList.remove("is-invalid");
    email_login.classList.add("is-valid");
    pass_login.classList.remove("is-invalid");
    pass_login.classList.add("is-valid");
    localStorage.setItem("currentUser",user.username);
 //   displayData();
    clearLogin();
    window.location.href="./pages/home.html";

}else if(users.findIndex((element)=> element.email===email_login.value.trim())==-1){
  Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Your email was not found.',
    });
    email_login.classList.remove("is-valid");
    email_login.classList.add("is-invalid");
    return;
}else if(users.findIndex((element)=> element.pass===pass_login.value.trim())==-1){
  Swal.fire({
      icon: 'error',
      title: 'Invalid Password',
      text: 'Your password is incorrect.',
    });
    pass_login.classList.remove("is-valid");
    pass_login.classList.add("is-invalid");
    return;
}
    
}

function logOut() {
  localStorage.removeItem("currentUser");
  window.location.href = "../index.html";
}

function clearLogin(){
  email_login.value="";
  pass_login.value="";
}