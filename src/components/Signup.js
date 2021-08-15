import React , {useState} from "react";
import {Link, useHistory } from "react-router-dom";

const Signup  = () => {
   const history = useHistory();
    const [user, setUser] = useState({
      fname:"",  email:"",phone:"",password:""
    });

    let name, value
     
    const handleData = (e) => {
      console.log(e);
      name = e.target.name;  //Stores the data which give as input
      value = e.target.value;

      setUser({...user, [name]:value}) //spread data used to require all data of user and name contains the value entered by users
    }

     const addUser = async (e) => {
      e.preventDefault();

      const {fname,  email, phone, password} = user;
 
    const res = await fetch("/api/users/register" , {
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body:JSON.stringify({
        fname,  email, phone, password
      })
    });

      const data = await res.json();
      if(res.status === 422 || !data ){
        window.alert("Registration Failed");
        console.log("Registration Failed");
      }
      else {
        window.alert("Registration Succesful");
        console.log("Registration Succesful");
        history.push('/signin')
      }
    }

    return (
        <div className="page">
         <div className="signup">
          <h1> Socialgram </h1> <br /><br /> <br />
           <form method="POST" className = "signupform" id = "signupform">
                <div className="input-box">
                    <label htmlFor="fname"><i class="zmdi zmdi-account"></i></label>
                    <input type="text" name="fname" id="fname" required value= {user.fname} onChange={handleData} placeholder = "First Name"  /> <br />
                 </div>
                 <div className="input-box">
                   <label htmlFor="email"> <i className="zmdi zmdi-email"></i> </label>
                   <input type="email" name="email" id= "email" autoCapitalize = "off" required value= {user.email} onChange={handleData} placeholder = "Email"  /> <br />
                  </div>
                 <div className="input-box">
                   <label htmlFor="phone"><i className="zmdi zmdi-phone"></i></label>
                   <input type="tel" name="phone" id = "phone" required value= {user.phone} onChange={handleData} placeholder = "Contact No."   /> <br />
                 </div>
                 <div className="input-box">
                  <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                  <input type="password" id ="password" name = "password" value= {user.password} onChange={handleData} placeholder = "Password"   /> <br /> 
                 </div>
                 {/* <div className="input-box">
                  <label htmlFor="cpassword"><i className="zmdi zmdi-lock"></i></label>
                 <input type="password" name="cpassword" id="cpassword" value= {user.cpassword} onChange={handleData} placeholder = "Confirm Your Password"  /> <br />
                 </div>  */}
                  <div className="input-submit">
                  <input type = "submit" className = "signupButton" onClick={addUser} value="Sign Up"/> 
                </div>
                   <p>By signing you agree to our <a href="google.com">Terms and Conditons</a></p>
                     <hr />
                   <p>Already have an account? <Link to = "./Signin"> Log In</Link></p>
           </form>
          </div>
        </div>
      );
}
 
export default Signup;