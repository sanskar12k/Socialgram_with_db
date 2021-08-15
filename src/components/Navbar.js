import React ,{useEffect, useState} from 'react';
import {Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../logo192.png'


const Navbar = () => {
  const [usersData, setUsersData] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const callProfilePage =  async() => {
    try{
       const res = await fetch('/api/users/profile', {
           method: "GET",
           headers: {
             //   Accept:"application/json",
               "Content-Type": "application/json"
           },
         //   credentials:"include" // To share cookies
       });
       const data = await res.json();
       console.log(data);

       setUsersData(data);
       setIsLogin(true);
       if(!res.status === 200){
           throw new Error(res.error);
       }

    }
    catch(err){
        console.log(err);

    }
} 
useEffect(()=> {
    callProfilePage();
}, [] );

    return (



        <nav className="navbar navbar-expand-lg navbar-light bg-light fs-4 ">
        <div className="container-fluid pb-2 " >
     <img src={logo} alt="Logo" />
          <Link className="navbar-brand fs-2 fw-bold" href="#">Socialgram</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              
              <li className="nav-item px-2">
                <Link className="nav-link " aria-current="page" to="/">Home</Link>
              </li>
          <li className="nav-item px-2">
                <Link className="nav-link" to="/signin">Sign In </Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li> 
              <li className="nav-item px-2">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li> 
              <li className="nav-item px-2">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li> 
      </ul>
      </div>
   
        </div>
      </nav>
      );
}
 
export default Navbar;