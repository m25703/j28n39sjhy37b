import axios from "axios";
import React, { useRef } from "react";
import { useHistory, Link } from "react-router-dom";

function Registration() {
  const unam = useRef();
  const pass = useRef();
  let history = useHistory();

  const onSubmit = () => {
    const data = { username: unam.current.value, password: pass.current.value };
    if(data.username === "" || data.password === "") return;
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
    history.push("/login");
  };

class RegistrationForm extends React.Component{
  render(){
    return(
      <div id="loginform">
        <FormHeader title="Sign Up" />
        <Form />
        <center>
        Already a user? <Link to="/login"> <span style={{color:"deepskyblue"}}>Log in</span></Link> <div>   &nbsp;</div>
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
   <FormButton title="Register"/>
 </div>
);

const FormButton = props => (
<div id="button" className="row">
  <button onClick={onSubmit}>{props.title}</button>
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
    <div style={{width:"100%", height:"100%", background: "-webkit-linear-gradient(left, #003366,#004080,#0059b3,#0073e6)"}}>
        <RegistrationForm /> 
    </div>
  );
}

export default Registration;
