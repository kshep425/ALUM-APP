import React from "react";
import "./style.css";

const Event = props => {
  return (
    <div className="eventDiv">
      <h4 className="eventTitle">{props.title}</h4>
      <h2 className="eventStart">{props.start}</h2>
      <h2 className="eventEnd">{props.end}</h2>
      <p className="eventDescription">{props.children}</p>
    </div>
  );
};

export default Event;
