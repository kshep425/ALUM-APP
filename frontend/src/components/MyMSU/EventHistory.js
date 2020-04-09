import React from "react";
import "./mymsupage.css";

const EventHistory = props => {
  console.log(props);
  const events = props.authUser.events || [];

  function formatDate(date) {
    let d = new Date(date);
    return d.toLocaleDateString();
  }
  console.log(events);
  return (
    <div className="container historyContainer" ref={props.eventsLength} value={events.length}>
      <h1 className="card-title">Event History</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Title</th>
            <th scope="col">Type</th>
            <th scope="col">Venue Name</th>
            <th scope="col">Description</th>
            <th scope="col">RSVP</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.eventId}>
              <td>{formatDate(event.start)}</td>
              <td>{event.title}</td>
              <td>{event.type}</td>
              <td>{event.venueName}</td>
              <td>{event.description}</td>
              <td>{event.rsvp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventHistory;
