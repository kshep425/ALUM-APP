import React, { useState } from "react";
import "./style.css";

const Event = props => {
  const [state, setState] = useState({ eventOpen: false });

  const viewDetails = () => {
    setState({ eventOpen: !state.eventOpen });
  };

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
    <div className="eventBox">
      <h1>{props.title}</h1>

      <hr className="eventHr" />
      <h6>{props.type}</h6>

      <button
        className={state.eventOpen ? "hidden" : "open btn detailsBtn"}
        onClick={viewDetails}
      >
        View Details
      </button>
      <div className={state.eventOpen ? "open" : "hidden"}>
        <h1>{props.description}</h1>
        <p>Starts: {props.start}</p>
        <p>Ends: {props.end}</p>
        <p>{props.venueName}</p>
        <p>{props.address}</p>
        <div className="buttonDiv">
          <button
            className={state.eventOpen ? "open btn detailsBtn" : "hidden"}
            onClick={viewDetails}
          >
            Hide Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event;
