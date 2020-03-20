import React from "react";
import { Link } from "react-router-dom"
import "./style.css";

const Navitem = props => {
  return (
    <Link to={props.href} className="navItemDiv">
      <div className="navLink">
        <i className="fa fa-caret-right"></i>
        {props.children}
      </div>
    </Link>
  );
};

export default Navitem;
