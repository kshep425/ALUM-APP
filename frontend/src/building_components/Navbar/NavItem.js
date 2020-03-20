import React from "react";
import Link from "react-router-dom"
import "./style.css";

const Navitem = props => {
  // console.log(props);
  return (
    <Link to={props.href} className="navLink">
      <div className="navItemDiv">
        <i className="fa fa-caret-right"> </i>
          {props.children}
      </div>
    </Link>
  );
};

export default Navitem;
