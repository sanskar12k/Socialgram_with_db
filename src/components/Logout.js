import React, {useEffect} from "react";
import {useHistory} from 'react-router-dom';

const Logout = () => {
    const history = useHistory();
    const logOut =  async() => {
        try{
           const res = await fetch('/api/users/logout', {
               method: "GET",
               headers: {
                   Accept:"application/json",
                   "Content-Type": "application/json"
               },
               credentials:"include" // To share cookies
           });
           history.push('/signin');
           if(res.status === 200){
               throw new Error(res.error);
               
           }

        }
        catch(err){
            console.log(err);
          
        }
    } 
    useEffect(()=> {
        logOut();
    }, [] );
 

    return ( 
        <>
        <h1>Logout Page</h1>
        </>
   )
     
     
}
 


export default Logout;
