import React from "react";
import { Link } from "react-router-dom"
import "./style.css";

const CarouselItem = props => {
  // console.log(props);
  return (
    <Link to={props.route}>
      <div className="carouselItemDiv">
        <img
          src={props.src}
          alt={props.alt}
          title={props.title}
          className="carouselImg"
        />
      </div>
    </Link>
  );
};

export default CarouselItem;
