import React from "react";
import Carousel from "../building_components/Carousel/Carousel";
import Footer from "../building_components/Footer/Footer";
import "./style.css";

const Home = () => {

  return (
    <div className="mainPage">
      <h1>Scholarship Information</h1>
      <Carousel />
      <Footer />
    </div>

  );
};

export default Home;
