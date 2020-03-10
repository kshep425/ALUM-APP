import React from "react";
import "./style.css";
import logo from "../../images/MSULNO1C.svg";
import Navitem from "./NavItem";
import Button from "../Button";

const Navbar = () => {
  let navbar = document.getElementsByClassName("navbar");
  window.onscroll = function() {
    let sticky = navbar.offsetTop;
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky");
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="loginBtnDiv">
          <Button className="btn btn-secondary loginBtn">LOGIN</Button>
          <Button className="btn btn-secondary registerBtn">REGISTER</Button>
        </div>
        <button className="btn btn-success donateBtn">GIVE</button>
      </div>
      <div className="lowerNav">
        <div className="row logoDiv">
          <div className="col">
            <a href="/">
              <img src={logo} alt="Logo" className="logo"></img>
            </a>
            <h2 className="alumniText">ALUMNI</h2>
          </div>
        </div>

        <div className="row navRow">
          <Navitem href="/events">events</Navitem>
          <Navitem href="/about">about</Navitem>
          <Navitem href="/scholarships">Scholarships</Navitem>
          <Navitem href="/profile">my msu</Navitem>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
