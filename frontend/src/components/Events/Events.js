import React, { useRef, useEffect, useState } from "react";
import Event from "../BuildingComponents/Event";
import Button from "../BuildingComponents/Button";
import {GoogleAddressForm, AddressForm} from "../FormComponents";
import Modal from "../BuildingComponents/Modal";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_EVENT, UPDATE_EVENTS } from "../../utils/actions";
import API from "../../utils/API";
import "./style.css";
import { AuthUserContext } from "../Session";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";

const Events = (props) => {
  const [state, dispatch] = useStoreContext();
  const [eventLength, setEventLength] = useState(state.events.length)

  useEffect(() => {
    const getEvents = () => {
      API.getEvents()
        .then(results => {
          if (results.data.length > 0) {
            dispatch({
              type: UPDATE_EVENTS,
              events: results.data
            });
            setEventLength(results.data.length)
          }
        })
        .catch(err => console.log(err));
    };

    getEvents();
  }, [eventLength, dispatch]);

  const eventTitleRef = useRef();
  const eventDescriptionRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const eventTypeRef = useRef();
  let addressRef;
  const venueNameRef = useRef();
  const ticketTypeRef = useRef();
  const hostNameRef = useRef();
  const hostEmailRef = useRef();
  const creatorIdRef = useRef();
  const handleAddressChange = value => {
    // let eventLocation = event.target;
    addressRef = value;
  };

  const addNewEvent = e => {
    e.preventDefault();

    API.addEvent({
      title: eventTitleRef.current.value,
      description: eventDescriptionRef.current.value,
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value,
      // displayDate: displayDate,
      type: eventTypeRef.current.value,
      address: addressRef,
      venueName: venueNameRef.current.value,
      ticketType: ticketTypeRef.current.value,
      hostName: hostNameRef.current.value,
      hostEmail: hostEmailRef.current.value,
      creatorId: creatorIdRef.current.value
    })
      .then(result => {
        dispatch({
          type: ADD_EVENT,
          event: result.data
        });
        // getEvents();
      })
      .catch(err => console.log(err));

    addressRef = "";
    eventTitleRef.current.value = "";
    eventDescriptionRef.current.value = "";
    startDateRef.current.value = "";
    endDateRef.current.value = "";
    venueNameRef.current.value = "";
    hostNameRef.current.value = "";
    hostEmailRef.current.value = "";
    creatorIdRef.current.value = "";
    hideEventModal();
  };

  const [modalState, setModalState] = useState({ show: false });

  const showEventModal = () => {
    setModalState({ show: true });
  };

  const hideEventModal = event => {
    setModalState({ show: false });
  };

  const cancelBtnFunction = event => {
    event.preventDefault();
    setModalState({ show: false });
  };

  /**
   *
   * @param {*} newEventRSVP {memberId, eventId, RSVP}
   */
  const handleRSVP = newEventRSVP => {
    if (token) {
      API.newEventRSVP(newEventRSVP, token);
    } else {
      props.history.push(ROUTES.SIGN_IN);
    }
  };

  return (
    <div className="mainPage">
      <div className="eventPageDiv">
        <h2>
          <strong>MSU Howard County Alumni Events</strong>
        </h2>
        <p>
          Strengthen your ties to the MSU family by participating in an MSU
          Alumni event near you!
        </p>
        <CreateEventButton onClick={showEventModal} />
        <Button
          className="btn btn-primary viewPastEventBtn"
          onClick={showEventModal}
        >
          View Past Events
        </Button>
        <hr className="lineDivider" />
        <div className="row">
          <div className="col-md-12" style={{ textAlign: "center" }}>
            <h4>Upcoming Events</h4>
          </div>
        </div>
        <div className="row" style={{ textAlign: "center" }}>
          {state.events.map((event, index) => {

            return (
              <div key={event.id} className="col-md-6">
                <Event
                  key={event.id}
                  index={index}
                  id={event.id}
                  title={event.title}
                  displayDate={event.startDate}
                  start={event.startDate}
                  end={event.endDate}
                  type={event.type}
                  venueName={event.venueName}
                  address={event.address}
                  description={event.description}
                  handleRSVP={handleRSVP}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        show={modalState.show}
        handleClose={hideEventModal}
        title="Host an MSU Alumni Event!"
      >
        <div className="row">
          <form className="col-md-12 calendarDiv">
            <div className="createEventDiv">
              <label htmlFor="eventTitle">Event Name</label>
              <input
                type="text"
                name="eventTitle"
                className="titleInput"
                ref={eventTitleRef}
                defaultValue="Event Title"
              ></input>

              <EventHost
                hostNameRef={hostNameRef}
                hostEmailRef={hostEmailRef}
                creatorIdRef={creatorIdRef}
              />
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="startTime">Start Time</label>
                  <input
                    name="startTime"
                    type="datetime-local"
                    className="titleInput"
                    ref={startDateRef}
                    defaultValue={Date.now()}
                  ></input>
                </div>

                <div className="col-md-6">
                  <label htmlFor="endTime">End Time</label>
                  <input
                    name="endTime"
                    type="datetime-local"
                    className="titleInput"
                    ref={endDateRef}
                    defaultValue={Date.now()}
                  ></input>
                </div>
              </div>

              <label htmlFor="eventTitle">Venue Name</label>
              <input
                type="text"
                name="venueName"
                className="titleInput"
                ref={venueNameRef}
                defaultValue="Kahler Hall"
              ></input>

              {/* <label htmlFor="address">Address</label> */}
              {/* <GoogleAddressForm onChange={handleAddressChange} /> */}
              <AddressForm />

              <label htmlFor="eventType">Event Type</label>
              <select
                id="eventType"
                className="titleInput"
                ref={eventTypeRef}
                defaultValue="Meeting"
              >
                <option>Meeting</option>
                <option>Party </option>
                <option>Performance/Concert </option>
                <option>Dinner/Gala</option>
                <option>Fair/Festival</option>
                <option>Other</option>
              </select>

              <label htmlFor="ticketType">Ticket Type</label>
              <select
                id="ticketType"
                className="titleInput"
                ref={ticketTypeRef}
                defaultValue="Free"
              >
                <option>Free</option>
                <option>Available for Purchase </option>
                <option>Donate</option>
              </select>

              <label htmlFor="message">Describe Your Event!</label>
              <textarea
                name="message"
                type="text"
                className="descriptionInput"
                ref={eventDescriptionRef}
                defaultValue="Event Description"
              ></textarea>
              <div className="row">
                <div className="col">
                  <Button
                    className="btn btn-primary submitEventBtn"
                    onClick={addNewEvent}
                  >
                    Save Event
                  </Button>
                  <Button
                    className="btn btn-primary cancelBtn"
                    onClick={cancelBtnFunction}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
let token;
const CreateEventButton = props => {
  return (
    <AuthUserContext.Consumer>
      {authUser => {
        authUser ? (token = authUser.token) : (token = null);
        return authUser && authUser.members.role === ROLES.ADMIN ? (
          <Button
            className="btn btn-primary addEventBtn"
            onClick={props.onClick}
          >
            Create New Event
          </Button>
        ) : null;
      }}
    </AuthUserContext.Consumer>
  );
};

const EventHost = props => {
  return (
    <AuthUserContext.Consumer>
      {authUser => {
        return authUser ? (
          <>
            <label htmlFor="hostName">Host Name</label>
            <input
              id="hostName"
              type="text"
              name="HostName"
              className="titleInput"
              ref={props.hostNameRef}
              defaultValue={authUser.providerData[0].displayName}
            />
            <label htmlFor="hostEmail">Host Email</label>
            <input
              id="hostEmail"
              type="text"
              name="hostEmail"
              className="titleInput"
              ref={props.hostEmailRef}
              defaultValue={authUser.email}
            />
            <input
              ref={props.creatorIdRef}
              defaultValue={authUser.uid}
              hidden
            ></input>
          </>
        ) : null;
      }}
    </AuthUserContext.Consumer>
  );
};

export default Events;
