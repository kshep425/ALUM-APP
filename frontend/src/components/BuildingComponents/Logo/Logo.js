import React from "react";
import logo from "../../../images/NEW_logo.png";
import { Link } from "react-router-dom";
import { HOME } from "../../../constants/routes";
import "../Navbar/style.css";

const Logo = () => {
  return (
    <Link to={HOME}>
      <img src={logo} alt="MSU Logo" className="logo"></img>
    </Link>
  );
};

export default Logo;
