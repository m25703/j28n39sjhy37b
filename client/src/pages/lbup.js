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
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        history.push("/");
      }
    });
  };

class LoginForm extends React.Component{
  render(){
    return(
      <div id="loginform">
        <FormHeader title="Login" />
        <Form />
        <center>
        Not a user? <Link to="/registration"> <span style={{color:"deepskyblue"}}>Register</span></Link> <div>   &nbsp;</div>
        </center>
      </div>
    )
  }
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
  <div id="button" class="row">
    <button onClick={login}>{props.title}</button>
  </div>
);

const FormInputU = props => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} ref={unam}/>
  </div>  
);

const FormInputP = props => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} ref={pass}/>
  </div>  
);

  return (
    <>
    <LoginForm />
    </>
  );
}

export default Login;