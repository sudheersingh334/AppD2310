import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

function TopNavigation() {

 let navigate = useNavigate(); 

let storeObj = useSelector((store)=>{
  return store;
});

useEffect(()=>{
  if(storeObj.loginReducer.userDetails.email){

  }else{
  navigate("/");
  }
},[]);

let onDeleteAccount = async()=>{
localStorage.clear();
  let dataTOSend = new FormData();
  dataTOSend.append("email",storeObj.loginReducer.userDetails.email); 
 
 let reqOptions = {
   method:"delete",
   body:dataTOSend,
 };
 
 let JSONData = await fetch("http://localhost:4321/deleteProfile",reqOptions);

 let JSOData = await JSONData.json();
 
 if(JSOData.status == "success"){
   alert(JSOData.msg);
 }else{
   alert(JSOData.msg);
 }
 
 };

  return (
  <nav>
    <NavLink to="/home">Home</NavLink>
    <NavLink to="/About">About</NavLink>
    <NavLink to="/Tasks">Tasks</NavLink>
    <NavLink to="/Leaves">Leaves</NavLink>
    <NavLink to="/editProfile">Edit Profile</NavLink>
    <NavLink to="/" onClick={()=>{
     onDeleteAccount();
    }}>Delete Profile</NavLink>
    <NavLink to="/" onClick={()=>{
      localStorage.clear();
    }}>Logout</NavLink>
   
  </nav>
  
  )
}

export default TopNavigation