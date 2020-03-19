import React from "react";
import "./style.css";

const CarouselItem = props => {
  console.log(props);
  return (
    <div className="carouselItemDiv">
      <div className="textBox">
        <h4 className="carouselItemTitle">{props.title}</h4>
        <p className="carouselItemDescription">{props.children}</p>
      </div>
      <img src={props.src} alt={props.alt} title={props.title} width="100%" />
    </div>
  );
};

export default CarouselItem;
