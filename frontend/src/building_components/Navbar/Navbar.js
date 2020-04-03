import React from "react";
import TopNavBar from "./TopNavBar";

import LowerNav from "./LowerNav";

const Navbar = () => {
  let navbar = document.getElementsByClassName("navbar");
  window.onscroll = function () {
    let sticky = navbar.offsetTop;
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky");
    }
  };

  return (
    <div className="navbarDiv">
      <TopNavBar />
      <LowerNav />
    </div>
  );
};

export default Navbar;
