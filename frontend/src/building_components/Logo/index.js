
import React from 'react';
import logo from "../../images/MSULNO1C.svg";
const Logo = () => {
  return (
  <div className="lowerNav">
    <div className="row logoDiv">
      <div className="col">
        <a href="/">
          <img src={logo} alt="MSU Logo" className="logo"></img>
        </a>
        <h2 className="alumniText">ALUMNI</h2>
      </div>
    </div>
  </div>
)
  }

export default Logo;