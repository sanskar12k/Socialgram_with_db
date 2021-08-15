import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
    return (
        <>
        <div className="notfound">
            <h1>Page Not Found</h1>
         <p>   Back to   <Link to="/">Homepage</Link> </p>
        </div>
        </>
      );
}
 
export default Notfound;