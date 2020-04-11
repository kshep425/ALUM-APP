import React from "react";
import "./card.css";

function Card(props) {
  return (
    <div className="card">
      <div className="card-body" style={{ float: "left" }}>
        <h5 className="card-title">{props.name}</h5>
        <p className="card-subtitle">{props.title}</p>
        <p className="card-stext">{props.position}</p>
      </div>
    </div>
  );
}

export default Card;