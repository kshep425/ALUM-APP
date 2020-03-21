import React from "react";
import "./style.css";

const Event = props => {
  return (
    // <div className="eventDiv">
    //   <h4 className="eventTitle">{props.title}</h4>
    //   <h2 className="eventStart">{props.start}</h2>
    //   <h2 className="eventEnd">{props.end}</h2>
    //   <h2 className="eventEnd">{props.type}</h2>
    //   <h2 className="eventEnd">{props.venueName}</h2>
    //   <h2 className="eventEnd">{props.address}</h2>
    //   <p className="eventDescription">{props.children}</p>
    // </div>

    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h1>{props.title}</h1>
          <hr />
          <h6>{props.type}</h6>
          <p>Starts: {props.start}</p>
          <p>Ends: {props.end}</p>
          <p>{props.venueName}</p>
          <p>{props.address}</p>
        </div>
        <div className="flip-card-back">
          <h1>{props.description}</h1>
        </div>
      </div>
    </div>
  );
};

export default Event;
