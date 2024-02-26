import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";

function Signup() {

let firstNameInputRef = useRef();
let lastNameInputRef = useRef();
let ageInputRef = useRef();
let emailInputRef = useRef();
let passwordInputRef = useRef();
let mobileNOInputRef = useRef();
let profilePicInputRef = useRef();
let [profilePicPath,setProfilePicPath] = useState("./images/noImage.jpg");

let onSignupUsingJSON = async()=>{
   let dataTOSend = {
    fn:firstNameInputRef.current.value,
    ln:lastNameInputRef.current.value,
    age:ageInputRef.current.value,
    email:emailInputRef.current.value,
    password:passwordInputRef.current.value,
    mobileNo:mobileNOInputRef.current.value,
    profilePic:profilePicInputRef.current.value,
   };

   let JSONDataTOSend = JSON.stringify(dataTOSend);
   let myHeader = new Headers();
   myHeader.append("content-type","application/json");

 let reqOptions = {
    method:"POST",
    body: JSONDataTOSend,
    headers:myHeader,
 };

let JSONData = await fetch("http://localhost:4321/signup",reqOptions);
let JSOData = await JSONData.json();
console.log(JSOData);
};

let onSignupUsingURLE = async()=>{
  
 let myHeader = new Headers();
 myHeader.append("Content-type","application/x-www-form-urlencoded") 

 let dataTOSend = new URLSearchParams();
 dataTOSend.append("fn",firstNameInputRef.current.value);
dataTOSend.append("ln",lastNameInputRef.current.value);
dataTOSend.append("age",ageInputRef.current.value);
dataTOSend.append("email",emailInputRef.current.value);
dataTOSend.append("password",passwordInputRef.current.value);
dataTOSend.append("mobileNo",mobileNOInputRef.current.value);
dataTOSend.append("profilePic",profilePicInputRef.current.value);
 
 let reqOptions = {
    method:"POST",
   header:myHeader,
   body:dataTOSend
 } 

 let JSONData = await fetch("http://localhost:4321/signup",reqOptions);
 let JSOData = await JSONData.json();
 console.log(JSOData);

};

let onSignupUsingFormData = async()=>{
   let dataTOSend = new FormData();


   dataTOSend.append("fn",firstNameInputRef.current.value);
   dataTOSend.append("ln",lastNameInputRef.current.value);
   dataTOSend.append("age",ageInputRef.current.value);
   dataTOSend.append("email",emailInputRef.current.value);
   dataTOSend.append("password",passwordInputRef.current.value);
   dataTOSend.append("mobileNo",mobileNOInputRef.current.value);
   dataTOSend.append("profilePic",profilePicInputRef.current.value);

   for(let i=0;i<profilePicInputRef.current.files.length;i++){
    dataTOSend.append("profilePic",profilePicInputRef.current.files[i]);
   }

 
   
   let reqOptions = {
    method:"POST",
    body:dataTOSend
   };

   let JSONData = await fetch("http://localhost:4321/signup",reqOptions);


   let JSOData = await JSONData.json();
   
if(JSOData.status == "success"){
    alert(JSOData.msg);
}

console.log(JSOData);
};

  return (
    <div className="App">
        <form>
            <h2>Sign up</h2>
            <div>
                <label>First Name</label>
                <input ref={firstNameInputRef}></input>
            </div>
            <div>
                <label>Last Name</label>
                <input ref={lastNameInputRef}></input>
            </div>
            <div>
                <label>Age</label>
                <input ref={ageInputRef}></input>
            </div>
            <div>
                <label>Email</label>
                <input ref={emailInputRef}></input>
            </div>
            <div>
                <label>Password</label>
                <input ref={passwordInputRef}></input>
            </div>
            <div>
                <label>Mobile NO</label>
                <input ref={mobileNOInputRef}></input>
            </div>
            <div>
                <label>Profile Pic</label>
                <input ref={profilePicInputRef} type="file"  onChange={(e)=>{
              let selectedImagePath = URL.createObjectURL(e.target.files[0]);

             setProfilePicPath(selectedImagePath);

                }}></input>
                <br></br>
                <img src={profilePicPath} className="profilePicPreview"></img>
            </div>
            
                {/* <button type="button" onClick={()=>{
               onSignupUsingJSON();
                }}>Login(JSON)</button>
            
            
                <button type="button" onClick={()=>{
               onSignupUsingURLE();
                }}>Login(URLE)</button> */}
            
            
                <button type="button" onClick={()=>{
               onSignupUsingFormData();
                }}>Sign up(FormData)</button>
            
        </form>
        <br></br>
        <Link to="/">Login</Link>
    </div>
  );
}

export default Signup