import React from "react";
import { Link } from "react-router-dom";


export default function Landingpage(){
    return (
      <div>
        <h1>Do you like cooking? This is your place!</h1>
        <Link to="/home">
          <button>Let's go</button>
        </Link>
      </div>
    );
}