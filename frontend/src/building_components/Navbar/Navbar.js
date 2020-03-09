import React from "react";
import "./style.css";
import logo from "../../images/MSU_Logo.JPG";
import Navitem from "./NavItem";
import Button from "../Button";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <div className="loginBtnDiv">
          <Button className="btn btn-secondary loginBtn">LOGIN</Button>
          <Button className="btn btn-secondary registerBtn">REGISTER</Button>
        </div>
        <button className="btn btn-success donateBtn">DONATE</button>
      </div>
      <div className="lowerNav">
        <div className="logoDiv">
          <img src={logo} alt="Logo" className="logo"></img>
        </div>
        <div className="row">
          <Navitem href="google.com">EVENTS</Navitem>
          <Navitem href="google.com">ABOUT</Navitem>
          <Navitem href="google.com">MY MSU</Navitem>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
