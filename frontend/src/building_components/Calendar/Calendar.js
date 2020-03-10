import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./style.css";

const ReactCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
        onClickDay={value => console.log(value + " clicked")}
      />
      {console.log(date)}
      {date.toString()}
    </div>
  );
};

export default ReactCalendar;
