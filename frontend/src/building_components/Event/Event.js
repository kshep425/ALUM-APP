import React from "react";
import "./style.css";

const Event = props => {
  return (
    <div className="eventDiv">
      <h4 className="eventTitle">{props.title}</h4>
      <p className="eventDescription">{props.children}</p>
    </div>
  );
};

export default Event;
