import React, { useState } from "react";
import "./style.css";
import Button from "../Button";
import { AuthUserContext } from "../../components/Session";
import * as ROLES from "../../constants/roles"

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
