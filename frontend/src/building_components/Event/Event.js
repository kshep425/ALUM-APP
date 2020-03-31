import React, { useState } from "react";
import "./style.css";
import moment from "moment-timezone";
import Button from "../Button";
import { AuthUserContext } from "../../components/Session";
import * as ROLES from "../../constants/roles"

const Event = props => {
  const [state, setState] = useState({ eventOpen: false });

  const viewDetails = () => {
    setState({ eventOpen: !state.eventOpen });
  };

  return (
    <div className="eventBox">
      <h1>{props.title}</h1>

      <hr className="eventHr" />
      <h6>
        <strong>Event Type:</strong> {props.type}
      </h6>
      <form className="rsvpForm" onSubmit={props.handleRSVP}>
        <label className="formTitle">RSVP:</label>
        <input type="radio" id="yes" name={"rsvp" + props.index} value="yes" />
        <label>Yes</label>

        <input type="radio" id="no" name={"rsvp" + props.index} value="no" />
        <label>No</label>

        <input
          type="radio"
          id="maybe"
          name={"rsvp" + props.index}
          value="maybe"
        />
        <label>Maybe</label>

        <input className="open btn rsvpBtn" type="submit" value="Submit RSVP" />
      </form>
      <button
        className={state.eventOpen ? "hidden" : "open btn detailsBtn"}
        onClick={viewDetails}
      >
        Show Details
      </button>
      <div className={state.eventOpen ? "open" : "hidden"}>
        <p>
          <strong>About:</strong> {props.description}
        </p>
        <p>
          <strong>Starts:</strong>{" "}
          {moment
            .tz(props.start, "America/New_York")
            .format("MM/DD/YYYY hh:mm a")}
        </p>
        <p>
          <strong>Ends:</strong>{" "}
          {moment
            .tz(props.end, "America/New_York")
            .format("MM/DD/YYYY hh:mm a")}
        </p>
        <p>
          <strong>Location:</strong>
        </p>
        <p>
          {props.venueName}: {props.address}
        </p>

        <div className="buttonDiv">
          <button
            className={state.eventOpen ? "open btn detailsBtn" : "hidden"}
            onClick={viewDetails}
          >
            Hide Details
          </button>
          <AdminButtons />
        </div>
      </div>
    </div>
  );
};

const UpdateEventButton = () => {
  return (
    <Button>Update Event</Button>
  )
}
const CancelEventButton = () => {
  return (
    <Button>Cancel Event</Button>
  )
}

const AdminButtons = (props) =>{
  console.log("render admin buttons")
  return (
    <AuthUserContext.Consumer>
      {authUser => {
        return (authUser.members.role=== ROLES.ADMIN)
      ? (
        <>
        <p>admin buttons</p>
          <UpdateEventButton />
          <CancelEventButton />
        </>
      )
      : null
    }}
    </AuthUserContext.Consumer>
  )
}

export default Event;
