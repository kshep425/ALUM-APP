import React from "react";
import {Link} from "react-router-dom";
import "./style.css";
import logo from "../../images/MSULNO1C.svg";
import Navitem from "./NavItem";
import Button from "../Button";
import TopNavBar from "./TopNavBar"
import Logo from '../Logo/index'
import LowerNav from './LowerNav'

import { AuthUserContext } from '../../components/Session';

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
    <TopNavBar />
    <Logo />
    <LowerNav />
    </div>
  );
}

export default Navbar;
