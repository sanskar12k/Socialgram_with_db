import React, { useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {useHistory} from 'react-router-dom';
import Loading from "./loading";

const Profile = () => {

    const history = useHistory();
    const [usersData, setUsersData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
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
              setIsLoading(false);
              if(!res.status === 200){
                  throw new Error(res.error);
              }

           }
           catch(err){
               console.log(err);
               history.push('/signin');
           }
       } 
       useEffect(()=> {
           callProfilePage();
       }, [] );
    

    return ( 
    <>
      <div className="profilePage">
      <form method="GET">
          {isLoading && <Loading/>}
          <div className="profileContent" >
            <div >
                <div id="profileContent">
                    <div className="rows">
                        <div className="cols">
                            <label>Name - </label>
                        </div>
                        <div className="cols">
                            <p>{usersData.fname}</p>
                        </div>
                        </div>
                        <div className="rows">
                        <div className="cols">
                            <label>E-Mail - </label>
                        </div>
                        <div className="cols">
                            <p>{usersData.email}</p>
                        </div>
                        </div>
                        <div className="rows">
                        <div className="cols">
                            <label>Contact - </label>
                        </div>
                        <div className="cols">
                            <p>{usersData.phone}</p>
                        </div>
                    
                </div>
            </div>
          </div>
      </div>
     </form>
      </div>
        </>

     );
}
 
export default Profile;

