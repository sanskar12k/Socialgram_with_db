import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
const Signin  = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser= async(e) => {
    e.preventDefault();
    
    const res = await fetch("/api/users/login" , {
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body:JSON.stringify({    //Converting data into a string
        email,password
      })
    });
    const data = await res.json();
    if(res.status === 400 || !data ){     //Checking for Error
      window.alert("Login  Failed");
      console.log("Login Failed");
    }
    else {
      window.alert("Login Succesful");
      console.log("Login Succesful");
      history.push('/')
    }

    

  }

    return (
        <div className="page">
          <div className="signin">
            <h1> Socialgram </h1>
              <form method="POST" className="sigininform" id="signinform">
                <div className="input-box">
                    <label htmlFor="email"><i class="zmdi zmdi-email"></i> </label>
                   <input type="email" name="email" id="email" autoCapitalize = "off" required value = {email} onChange={(e) => setEmail(e.target.value)} placeholder = "Email" /> <br />
                </div>
                <div className="input-box">
                 <label htmlFor="password"><i class="zmdi zmdi-lock"></i></label>
                 <input type="password" name="password" id="password"  required value = {password} onChange={(e) => setPassword(e.target.value)} placeholder = "Password"/> <br />
                </div>
                 <div className="input-submit">
                 <input type = "submit" onClick={loginUser} className = "loginButton" value="Log In"/> <br />
                 </div>
                 <a href="google.com" className = "forgot"> Forgotten Password?</a>
                 <hr />
                 <Link to = "/Signup" className= "Create">Create New Account</Link>
              </form>
           </div>
        </div>
      );
}
 
export default Signin;