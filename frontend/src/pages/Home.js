import React from "react";
import Navbar from "../building_components/Navbar/Navbar";
import Carousel from "../building_components/Carousel/Carousel";
import Footer from "../building_components/Footer/Footer";
import "./style.css";

const Home = () => {
  return (
    <div className="mainPage">
      <Navbar />
      <Carousel />
      <Footer />
    </div>
  );
};

export default Home;
