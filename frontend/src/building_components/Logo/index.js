
import React from 'react';
import logo from "../../images/MSU Howard County Alumni Chapter logo_NEW.png";
import { Link } from "react-router-dom"
import {HOME} from "../../constants/routes"
const Logo = () => {
  return (
    <div className="lowerNav">
      <div className="logoDiv">
          <Link to={HOME}>
            <img src={logo} alt="MSU Logo" className="logo"></img>
          </Link>
      </div>
    </div>
  )
}

export default Logo;