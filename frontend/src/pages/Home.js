import React from "react";
import Carousel from "../building_components/Carousel/Carousel";
import "./style.css";

const Home = () => {
  return (
    <div className="mainPage">
      <div className="eventPageDiv">
        <Carousel />
      </div>
    </div>
  );
};

export default Home;
