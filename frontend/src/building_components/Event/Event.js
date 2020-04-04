import React, { useState, useEffect } from "react";
import "./style.css";
import moment from "moment-timezone";
import Button from "../Button";
import { AuthUserContext } from "../../components/Session";
import * as ROLES from "../../constants/roles";

const Event = props => {
  console.log(props);
  const [state, setState] = useState({ eventOpen: false });
  const [rsvp, setRSVP] = useState("");

  const viewDetails = () => {
    setState({ eventOpen: !state.eventOpen });
  };

  function setNewRSVP(event) {
    console.log("setNewRSVP");
    console.log(event.target.value);
    setRSVP(event.target.value);
    console.log(rsvp);
  }

  useEffect(() => {
    console.log(rsvp);
  }, [rsvp]);

  function newEventRSVP(event) {
    console.log("RSVP clicked");
    const rsvpToEvent = {
      eventId: props.id,
      rsvp,
      MemberId
    };
    console.log(rsvp);
    event.preventDefault();
    props.handleRSVP(rsvpToEvent);
  }
  return (
    <div className="eventBox" onClick={viewDetails}>
      <span className="displayDate">
        {moment.tz(props.displayDate, "America/New_York").format("MMM DD")}
      </span>
      <h1 className="eventHeader">{props.title}</h1>

      <hr className="eventHr" />
      <h6>
        <strong>Event Type:</strong> {props.type}
      </h6>
      <form className="rsvpForm" onSubmit={e => newEventRSVP(e)}>
        <label className="formTitle">RSVP:</label>
        <input
          type="radio"
          id="yes"
          name={"rsvp" + props.index}
          value="yes"
          checked={rsvp === "yes"}
          onChange={setNewRSVP}
        />
        <label>Yes</label>

        <input
          type="radio"
          id="no"
          name={"rsvp" + props.index}
          value="no"
          checked={rsvp === "no"}
          onChange={setNewRSVP}
        />
        <label>No</label>

        <input
          type="radio"
          id="maybe"
          name={"rsvp" + props.index}
          value="maybe"
          checked={rsvp === "maybe"}
          onChange={setNewRSVP}
        />
        <label>Maybe</label>

        <input
          className="open btn rsvpBtn"
          type="submit"
          value="Submit RSVP"
        ></input>
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
  return <Button>Update Event</Button>;
};
const CancelEventButton = () => {
  return <Button>Cancel Event</Button>;
};

let MemberId;
const AdminButtons = props => {
  console.log("render admin buttons");
  return (
    <AuthUserContext.Consumer>
      {authUser => {
        {
          authUser ? (MemberId = authUser.members.id) : (MemberId = null);
        }
        return authUser && authUser.members.role === ROLES.ADMIN ? (
          <>
            <p>admin buttons</p>
            <UpdateEventButton />
            <CancelEventButton />
          </>
        ) : null;
      }}
    </AuthUserContext.Consumer>
  );
};

export default Event;
