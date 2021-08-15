import React from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Notfound from "./components/Notfound";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import PostsContent from "./components/Postscontent";
function App() {
  return (
      <>
      <Router>
      <Navbar/>
      <Switch>
      <Route exact path = "/">
        <Home/>
      </Route>
     
      <Route exact path = "/signin">
        <Signin/>
      </Route>
      <Route exact path = "/signup">
        <Signup/>
      </Route>
      <Route exact path = "/profile" >
        <Profile/>
      </Route>
      <Route exact path = "/logout" >
        <Logout/>
      </Route>
      <Route >
        <Notfound/>
      </Route>
      <Route path = "/posts/:id">
          <PostsContent/>
        </Route>
      </Switch>
      </Router>
     
      </>
 
  );
}

export default App;
