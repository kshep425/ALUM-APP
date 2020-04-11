import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Navitem = props => {
  return (
    <Link to={props.href} className="navItemDiv">
      <div className="row navItemRow">
        <i className="fa fa-caret-right"></i>
        <div className="navLink">{props.children}</div>
      </div>
    </Link>
  );
};

export default Navitem;
