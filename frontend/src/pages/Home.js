import React from "react";
import { Navbar } from "../building_components/Navbar/Navbar";
import { Carosel } from "../building_components/Carosel/Carosel";
import { Footer } from "../building_components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Carosel />
      <Footer />
    </div>
  );
};

export default Home;
