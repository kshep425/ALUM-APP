import React from "react";
import Navbar from "../building_components/Navbar/Navbar";
import Event from "../building_components/Event/Event";
import Footer from "../building_components/Footer/Footer";
import "./style.css";

const Events = () => {
  return (
    <div className="mainPage">
      <Navbar />
      <div className="eventPageDiv">
        <h2>Event Calendar</h2>
        <p>
          Strengthen your ties to the MSU Family by participating in an MSU
          Alumni Association event near you!
        </p>
        <hr className="lineDivider" />
        <Event title="Event Title 1">Event description 1</Event>
        <Event title="Event Title 2">Event description 2</Event>
        <Event title="Event Title 3">Event description 3</Event>
      </div>
      <Footer />
    </div>
  );
};

export default Events;
