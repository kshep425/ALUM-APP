import React from "react";
import "./style.css";

const Navitem = props => {
  console.log(props);
  return (
    <div className="navItemDiv">
      <i class="fa fa-caret-right"> </i>
      <a href={props.href} className="navLink">
        {props.children}
      </a>
    </div>
  );
};

export default Navitem;
