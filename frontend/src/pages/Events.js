import React, { useRef, useEffect } from "react";
import Event from "../building_components/Event/Event";
import Footer from "../building_components/Footer/Footer";
import Button from "../building_components/Button";
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
        console.log("GETTING EVENTS");
        console.log(results.data);
        console.log(results.data[0].id);
        dispatch({
          type: UPDATE_EVENTS,
          events: results.data
        });
      })
      .catch(err => console.log(err));
  };

  // useEffect(() => {
  //   getEvents();
  // }, []);
  getEvents();

  const eventTitleRef = useRef();
  const eventDescriptionRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    console.log("CLICKED SUBMIT");
    console.log(ADD_EVENT);
    dispatch({ type: ADD_EVENT });
    API.addEvent({
      title: eventTitleRef.current.value,
      description: eventDescriptionRef.current.value,
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value
    })

      .then(result => {
        console.log("ADDING EVENT");
        console.log(result);
        dispatch({
          type: ADD_EVENT,
          event: result.data
        });
      })
      .catch(err => console.log(err));

    eventTitleRef.current.value = "";
    eventDescriptionRef.current.value = "";
    startDateRef.current.value = "";
    endDateRef.current.value = "";
  };

  //function to handle click on "create new event" button:
  //1. on click, if user hasnt selected a date (tile on calendar will have class="active")
  //then they will be prompted to select one.
  //2. Else, grab the date that the user selected and show div with inputs for title and description
  //3. On Submit, generate new <Event>
  //4. Bonus: if there is an event on that day, change the calendar tile color.
  //5. Bonus Pt 2: If a tile is "active" show only the events held on that day off to the side (maybe have "View Events" button)

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
          <form className="col-md-4 calendarDiv">
            <Button className="btn btn-primary addEventBtn">
              Create New Event
            </Button>
            <div className="createEventDiv">
              <label for="eventTitle">Event Name</label>
              <input
                type="text"
                name="eventTitle"
                className="titleInput"
                ref={eventTitleRef}
                required
              ></input>
              <div className="row">
                <div className="col-md-6">
                  <label for="startTime">Start Time</label>
                  <input
                    name="startTime"
                    type="datetime-local"
                    className="titleInput"
                    ref={startDateRef}
                    required
                  ></input>
                </div>
                <div className="col-md-6">
                  <label for="endTime">End Time</label>
                  <input
                    name="endTime"
                    type="datetime-local"
                    className="titleInput"
                    ref={endDateRef}
                    required
                  ></input>
                </div>
              </div>

              <label for="eventType">Event Type</label>
              <select id="eventType" className="titleInput">
                <option>Meeting</option>
                <option>Party </option>
                <option>Performance/Concert </option>
                <option>Dinner/Gala</option>
                <option>Fair/Festival</option>
                <option>Other</option>
              </select>
              <label for="message">Describe Your Event!</label>
              <textarea
                name="message"
                type="text"
                className="descriptionInput"
                ref={eventDescriptionRef}
                required
              ></textarea>
              <Button
                className="btn btn-primary submitEventBtn"
                onClick={handleSubmit}
              >
                Save Event
              </Button>
            </div>
            <ReactCalendar />
          </form>
          <div className="eventList col-md-8">
            <h4>Upcoming Events</h4>
            {state.events.map(event => {
              const newEvent = Object.assign({}, event);
              console.log("EVENT BELOW!");
              console.log(newEvent.title);
              console.log("EVENT TITLE BELOW!");
              console.log(newEvent.title);
              return (
                <Event
                  title={newEvent.title}
                  start={newEvent.startDate}
                  end={newEvent.endDate}
                  // key={event.title}
                ></Event>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;
