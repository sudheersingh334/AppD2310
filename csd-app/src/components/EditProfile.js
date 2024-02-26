import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';

function EditProfile() {

let firstNameInputRef = useRef();
let lastNameInputRef = useRef();
let ageInputRef = useRef();
let emailInputRef = useRef();
let passwordInputRef = useRef();
let mobileNOInputRef = useRef();
let profilePicInputRef = useRef();
let [profilePicPath,setProfilePicPath] = useState("./images/noImage.jpg");

let storeObj = useSelector((store)=>{return store;

});
useEffect(()=>{
firstNameInputRef.current.value = storeObj.loginReducer.userDetails.firstName;
lastNameInputRef.current.value = storeObj.loginReducer.userDetails.lastName;
ageInputRef.current.value = storeObj.loginReducer.userDetails.age;
emailInputRef.current.value = storeObj.loginReducer.userDetails.email;
mobileNOInputRef.current.value = storeObj.loginReducer.userDetails.mobileNo;
let profilePicPath = `/${storeObj.loginReducer.userDetails.profilePic}`;
setProfilePicPath(profilePicPath);

},[]);

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

let JSONData = await fetch("/signup",reqOptions);
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

 let JSONData = await fetch("/signup",reqOptions);
 let JSOData = await JSONData.json();
 console.log(JSOData);

};

let onUpdateProfile = async()=>{
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
    method:"PUT",
    body:dataTOSend
   };

   let JSONData = await fetch("/updateProfile",reqOptions);

   let JSOData = await JSONData.json();
   
if(JSOData.status == "success"){
    alert(JSOData.msg);
}

console.log(JSOData);
};

  return (
    <div className="App">
        <TopNavigation></TopNavigation>
        <form>
            <h2>Edit Profile</h2>
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
                <input ref={ageInputRef} type="number"></input>
            </div>
            <div>
                <label>Email</label>
                <input ref={emailInputRef} readOnly></input>
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
            
            
                {/* <button type="button" onClick={()=>{
               onSignupUsingFormData();
                }}>Sign up(FormData)</button> */}

              <button type="button" onClick={()=>{
               onUpdateProfile();
                }}>Update Profile</button>
            
        </form>
        <br></br>
        <Link to="/">Login</Link>
    </div>
  );
}

export default EditProfile;