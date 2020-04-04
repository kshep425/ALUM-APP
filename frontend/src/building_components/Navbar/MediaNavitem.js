import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const MediaNavitem = props => {
  return (
    <Link to={props.href} className="mediaNavlink">
      {props.children}
    </Link>
  );
};

export default MediaNavitem;
