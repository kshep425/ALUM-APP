import React from "react";
import Navbar from "../building_components/Navbar/Navbar";
import Carousel from "../building_components/Carousel/Carousel";
import Footer from "../building_components/Footer/Footer";
import "./style.css";
import RegistrationMemberType from "../form_components/RegistrationMemberType";
import { render } from "react-dom";

const Home = () => {

  function registrationClicked(){
    return true;
  }

  return (
    <div className="mainPage">
      <Navbar handleRegistrationButton={registrationClicked}>
          {/* {registrationButtonClicked ? <RegistrationMemberType />: <div hidden/>} */}
      </Navbar>
      <Carousel />
      <Footer />
    </div>
  );
};

export default Home;
