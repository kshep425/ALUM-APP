import React from "react";
import Navbar from "../building_components/Navbar/Navbar";
import Event from "../building_components/Event/Event";
import Footer from "../building_components/Footer/Footer";
import Button from "../building_components/Button";
import ReactCalendar from "../building_components/Calendar/Calendar";
import "./style.css";

const Events = () => {
  return (
    <div className="mainPage">
      <Navbar />
      <div className="eventPageDiv">
        <h2>Event Calendar</h2>
        <p>
          Strengthen your ties to the MSU family by participating in an MSU
          Alumni event near you!
        </p>
        <hr className="lineDivider" />
        <div className="row">
          <div className="col-md-4 calendarDiv">
            <Button className="btn btn-primary addEventBtn">
              Create New Event
            </Button>
            <ReactCalendar />
          </div>
          <div className="eventList col-md-8">
            <h4>Upcoming Events</h4>
            <Event title="Event Title 1">Event description 1</Event>
            <Event title="Event Title 2">Event description 2</Event>
            <Event title="Event Title 3">Event description 3</Event>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;
