import React from "react";
import Slider from "react-slick";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "../Image/Image";
import CarouselItem from "./CarouselItem";
import photo1 from "../../images/football.jpg";
import photo2 from "../../images/meeting.jpg";
import photo3 from "../../images/studying.jpg";

const Carousel = () => {
  return (
    <div>
      <Slider
        speed={1000}
        slidesToShow={1}
        slidesToScroll={1}
        infinite={true}
        dots={false}
        autoplay={true}
        autoplaySpeed={5000}
      >
        <CarouselItem src={photo1} title="Title1">
          Event Description 1
        </CarouselItem>
        <CarouselItem src={photo2} title="Title2">
          Event Description 2
        </CarouselItem>
        <CarouselItem src={photo3} title="Title3">
          Event Description 3
        </CarouselItem>
      </Slider>
    </div>
  );
};

export default Carousel;
