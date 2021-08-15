import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./loading";


const Home  = () => {
  
    const [usersData, setUsersData] = useState({});
    const [userLogin, setUserLogin] = useState(false);
    const [postData, setPostData] = useState();
    const [isLoading, setLoading] = useState (true);
    const [post, setPost] = useState('');
  
       const callProfilePage =  async() => {
           try{
              const res = await fetch('/api/users/profile', {
                  method: "GET",
                  headers: {
                      Accept:"application/json",
                      "Content-Type": "application/json"
                  },
                  credentials:"include" // To share cookies
              });
              const data = await res.json();
              console.log(data);
              setUsersData(data);
              setUserLogin(true);

              if(!res.status === 200){
                  throw new Error(res.error);
              }

           }
           catch(err){
               console.log(err);
              
           }
       } 
       let name = usersData.fname;
       let likes;
       const addPost = async (e) => {
            e.preventDefault();
              const res = await fetch("/api/posts/post" , {
                   method:"POST",
                   headers: {"Content-Type":"application/json"},
                   body:JSON.stringify({
                   name,post,likes:0
                   })
               });
  
               const datas = await res.json();
               if(res.status === 422 || !datas ){
                 window.alert("Could Not Post");
                 console.log("Could Not Post");
               }
               else {
                //  window.alert("Post Successfull");
                //  console.log("Post  Succesful");
               window.location.reload();
              
               }
               
        }
       useEffect(()=> {
           callProfilePage();
       },[]);
      const callPosts =  async() => {
        try{
           const res = await fetch('/api/posts/posts', {
               method: "GET",
               headers: {
                   "Content-Type": "application/json"
               },
              
           });
           const datas = await res.json();
           console.log(datas);
           setPostData(datas);
           setLoading(false);

           if(!res.status === 200){
               throw new Error(res.error);
           }
        }
        catch(err){
            console.log(err);
           
        }
    } 
    useEffect(()=> {
        callPosts();
    },[]);
    
    return (
        <div className = "Homepage"> 
        {!userLogin && <div className="notLogin">
        <h1>Welcome</h1>
         <h6>  Login and get connected to your friends</h6> 
        </div> }
        {userLogin && postData && 
             <div className="home">
             
             <div className="posting">
             <form method="POST">
            <textarea name="postss" id="postss" cols="20" rows="6" value= {post} onChange={(e) => setPost(e.target.value)} placeholder = "What's on your mind??" />
            <input type="submit" className = "postButton" value="Post"onClick={addPost}  />
        </form>
        </div>
        {isLoading && <Loading/>}
        
                 {/* <form method="GET">
                     <p>User login</p>
                     <p>{usersData.fname}</p>
                     </form> */}
                     {postData.map ((post) => (
          
          <div className="post-content" key = {post.id}>
          <div className="firstline">
           <h4>{post.name}</h4>
           <div className="buttons">
            <button  className = "del"  ><i className="material-icons">delete</i></button>
           </div>
           
            </div>
        
           <p> {post.post }</p>
           
           <div className="likes">
             <i className="fa fa-thumbs-up"></i>
          
           </div> 

            <div className="comments">
            <form action="">
               
              <input type="text" placeholder = "Add Comments..."/>
              <button> <i class="material-icons">&#xe163;</i></button>
            </form>
            </div>
          </div>
                  ) ) }
            </div>
        }
            </div>
      );
}
 
export default Home;