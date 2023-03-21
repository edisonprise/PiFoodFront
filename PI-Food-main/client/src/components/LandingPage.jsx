import React from "react";
import { Link } from "react-router-dom";
import './css/landingpage.css'


export default function Landingpage(){
    return (
      <div className="landing">
        <h1 className="welcomeMsg">Do you like cooking? This is your place!</h1>
        <Link to="/home" id="click">
          <button className="homeButton">Let's go</button>
        </Link>
      </div>
    );
}