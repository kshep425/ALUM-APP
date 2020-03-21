import React, { useRef, useEffect, useState } from "react";
import Event from "../building_components/Event/Event";
import Footer from "../building_components/Footer/Footer";
import Button from "../building_components/Button";
import AddressInput from "../building_components/AddressInput";
import Modal from "../building_components/Modal";
import ReactCalendar from "../building_components/Calendar/Calendar";
import { useStoreContext } from "../utils/GlobalState";
import { ADD_EVENT, REMOVE_EVENT, UPDATE_EVENTS } from "../utils/actions";
import API from "../utils/API";
import "./style.css";

const Events = () => {
  const [state, dispatch] = useStoreContext();

  const getEvents = () => {
    API.getEvents()
      .then(results => {
        console.log("GETTING EVENTS (RESULTS.DATA BELOW)");
        console.log(results.data);
        if (results.data.length > 0) {
          dispatch({
            type: UPDATE_EVENTS,
            events: results.data
          });
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getEvents();
  }, []);

  const eventTitleRef = useRef();
  const eventDescriptionRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const eventTypeRef = useRef();
  let addressRef;
  const venueNameRef = useRef();
  const ticketTypeRef = useRef();

  const handleAddressChange = value => {
    // let eventLocation = event.target;
    addressRef = value;
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("CLICKED SUBMIT");

    API.addEvent({
      title: eventTitleRef.current.value,
      description: eventDescriptionRef.current.value,
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value,
      type: eventTypeRef.current.value,
      address: addressRef,
      venueName: venueNameRef.current.value,
      ticketType: ticketTypeRef.current.value
    })
      .then(result => {
        console.log("ADDING EVENT (RESULT BELOW)");
        console.log(result);
        dispatch({
          type: ADD_EVENT,
          event: result.data
        });
      })
      .catch(err => console.log(err));

    addressRef = "";
    eventTitleRef.current.value = "";
    eventDescriptionRef.current.value = "";
    startDateRef.current.value = "";
    endDateRef.current.value = "";
    venueNameRef.current.value = "";
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

  console.log(state.events);
  return (
    <div className="mainPage">
      <div className="eventPageDiv">
        <h2>Event Calendar</h2>
        <p>
          Strengthen your ties to the MSU family by participating in an MSU
          Alumni event near you!
        </p>
        <hr className="lineDivider" />

        <div className="row">
          <div className="col-md-12">
            <h4>Upcoming Events</h4>
            <Button
              className="btn btn-primary addEventBtn"
              onClick={showEventModal}
            >
              Create New Event
            </Button>
            <ReactCalendar />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 eventList">
            {state.events.map(event => {
              const newEvent = Object.assign({}, event);

              console.log("EVENT TITLE BELOW!");
              console.log(newEvent.title);
              return (
                <div className="newEventDiv">
                  <Event
                    title={newEvent.title}
                    start={newEvent.startDate}
                    end={newEvent.endDate}
                    type={newEvent.type}
                    venueName={newEvent.venueName}
                    address={newEvent.address}
                  ></Event>
                </div>
              );
            })}
          </div>
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
              ></input>

              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="startTime">Start Time</label>
                  <input
                    name="startTime"
                    type="datetime-local"
                    className="titleInput"
                    ref={startDateRef}
                  ></input>
                </div>

                <div className="col-md-6">
                  <label htmlFor="endTime">End Time</label>
                  <input
                    name="endTime"
                    type="datetime-local"
                    className="titleInput"
                    ref={endDateRef}
                  ></input>
                </div>
              </div>

              <label htmlFor="eventTitle">Venue Name</label>
              <input
                type="text"
                name="venueName"
                className="titleInput"
                ref={venueNameRef}
              ></input>

              <label htmlFor="address">Address</label>
              <AddressInput onChange={handleAddressChange} />

              <label htmlFor="eventType">Event Type</label>
              <select id="eventType" className="titleInput" ref={eventTypeRef}>
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
              >
                <option>Open to Public - Free to Attend</option>
                <option>Open to Public - Available for Purchase </option>
                <option>Members Only - Free to Attend</option>
                <option>Members Only - Available for Purchase </option>
                <option>Board Members Only - Free to Attend</option>
                <option>Board Members Only - Available for Purchase</option>
              </select>

              <label htmlFor="message">Describe Your Event!</label>
              <textarea
                name="message"
                type="text"
                className="descriptionInput"
                ref={eventDescriptionRef}
              ></textarea>
              <div className="row">
                <div className="col">
                  <Button
                    className="btn btn-primary submitEventBtn"
                    onClick={handleSubmit}
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

      <Footer />
    </div>
  );
};

export default Events;
