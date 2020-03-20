
import React from 'react';
import logo from "../../images/MSULNO1C.svg";
import { Link } from "react-router-dom"
const Logo = () => {
  return (
    <div className="lowerNav">
      <div className="row logoDiv">
        <div className="col">
          <Link to="/">
            <img src={logo} alt="MSU Logo" className="logo"></img>
            <h2 className="alumniText">ALUMNI</h2>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Logo;