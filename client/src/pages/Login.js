import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const { setAuthState } = useContext(AuthContext);
  const unam = useRef();
  const pass = useRef();
  let history = useHistory();

  const login = () => {
    const data = { username: unam.current.value, password: pass.current.value };
    if (data.username === "" || data.password === "") return;
    axios
      .post("http://localhost:3001/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          // Set the access token in the request header for future authenticated requests
          axios.defaults.headers.common['accessToken'] = response.data.token;
          history.push("/");
        }
      });
  };
  
const LoginForm = () => {
  return (
      <div id="loginform">
        <FormHeader title="Login" />
        <Form />
        <center>
        Not a user? <Link to="/registration"> <span style={{color:"deepskyblue"}}>Register</span></Link> <div>   &nbsp;</div>
        </center>
      </div> )
}

const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);

const Form = props => (
   <div>
     <FormInputU description="Username" placeholder="Enter your username" type="text"   />
     <FormInputP description="Password" placeholder="Enter your password" type="password"  />
     <FormButton title="Log in"/>
   </div>
);

const FormButton = props => (
  <div id="button" className="row">
    <button onClick={login}>{props.title}</button>
  </div>
);

const FormInputU = props => (
  <div className="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} ref={unam}/>
  </div>  
);

const FormInputP = props => (
  <div className="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} ref={pass}/>
  </div>  
);

  return (
    <>
    <div style={{width:"100%", height:"100%", background: "-webkit-linear-gradient(left, #003366,#004080,#0059b3,#0073e6)"}}>
    <LoginForm />
    </div>
    </>
  );
}

export default Login;