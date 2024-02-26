import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

let emailInputRef = useRef();
let passwordInputRef = useRef();
let navigate = useNavigate();
let dispatch = useDispatch();

axios.defaults.baseURL = '';
axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

useEffect(()=>{
  validateToken();
},[]);

let validateLogin = async ()=>{
  let dataTOSend = new FormData();
  dataTOSend.append("email",emailInputRef.current.value);
  dataTOSend.append("password",passwordInputRef.current.value);

  let reqOptions = {
    method:"POST",
    body:dataTOSend,
  };

let JSONData = await fetch("/login",reqOptions);

let JSOData = await JSONData.json();

if(JSOData.status == "failure"){
  alert(JSOData.msg);
}else{
  localStorage.setItem("token",JSOData.data.token);
  // localStorage.setItem("email",emailInputRef.current.value);
  // localStorage.setItem("password",passwordInputRef.current.value);
 dispatch({type:"login",data:JSOData.data}); 
navigate("/home");
}
console.log(JSOData);

};

let validateLoginThruAxios = async ()=>{
  let dataTOSend = new FormData();
  dataTOSend.append("email",emailInputRef.current.value);
  dataTOSend.append("password",passwordInputRef.current.value);

let response = await axios.post("/login",dataTOSend);

if(response.data.data.status == "failure"){
  alert(response.data.data.msg);
}else{
  localStorage.setItem("token",response.data.data.token);
  
 dispatch({type:"login",data:response.data.data}); 
navigate("/home");
}

console.log(response);
};

let validateCredentials = ()=>{
  return async ()=>{
    let dataTOSend = new FormData();
    dataTOSend.append("email",emailInputRef.current.value);
    dataTOSend.append("password",passwordInputRef.current.value);
  
    let reqOptions = {
      method:"POST",
      body:dataTOSend,
    };
  
  let JSONData = await fetch("/login",reqOptions);
  
  let JSOData = await JSONData.json();
  
  if(JSOData.status == "failure"){
    alert(JSOData.msg);
  }else{
    localStorage.setItem("token",JSOData.data.token);
    
   dispatch({type:"login",data:JSOData.data}); 
  navigate("/home");
  }
  console.log(JSOData);
  

  }
};

let validateToken = async()=>{

  if(localStorage.getItem("token")){
    let dataTOSend = new FormData();
    dataTOSend.append("token",localStorage.getItem("token"));
    
    let reqOptions = {
      method:"POST",
      body: dataTOSend,
    };
    
    let JSONData = await fetch("/loginWithToken",reqOptions);
    
    let JSOData = await JSONData.json();
    
    
    if(JSOData.status == "failure"){
      alert(JSOData.msg);
    }else{
     dispatch({type:"login",data:JSOData.data}); 
    navigate("/home");
    }

    console.log(JSOData);
  }

};

  return (
    <div className="App">
        <form>
        <h2>Login</h2>
            <div>
                <label>Email</label>
                <input ref={emailInputRef}></input>
            </div>
            <div>
                <label>Password</label>
                <input ref={passwordInputRef}></input>
            </div>
            <div>
              <button type="button" onClick={()=>{
               // validateLogin();
               //dispatch(validateCredentials());
               validateLoginThruAxios();
              }}>Login</button>
            </div>
        </form>
        <br></br>
        <Link to="/signup">Sign up</Link>
    </div>
  );
}

export default Login