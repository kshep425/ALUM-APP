import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./style.css";
//import global state
//import

const ReactCalendar = props => {
  // const [date, setDate] = useState(new Date());

  // const onChange = date => {
  //   console.log("DATE BELOW!");
  //   console.log(date);
  //   setDate(date);
  // };

  return (
    <div>
      <Calendar onChange={props.updateDate} />
      {/* {console.log(date)}
      {date.toString()} */}
    </div>
  );
};

export default ReactCalendar;
