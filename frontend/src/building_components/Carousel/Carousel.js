import React from "react";
import Slider from "react-slick";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselItem from "./CarouselItem";

const photos = [
  {
    key: "2",
    alt: "msu north garage",
    title: "msu image",
    src:
      "https://www.hfurrer.com/wp-content/uploads/2017/11/msu_north_garage_nite-2-web.jpg",
    description: "msu north garage"
  },
  {
    key: "3",
    alt: "msu image logo",
    title: "msu image",
    src:
      "https://pbs.twimg.com/profile_images/961705793191112704/y3QjIHWn_400x400.jpg",
    description: "msu logo"
  },
  {
    key: "4",
    alt: "Holmes Hall",
    title: "msu image",
    src: "https://news.morgan.edu/wp-content/uploads/news-SPrating-660x330.jpg",
    description: "Holmes Hall"
  }
];

const Carousel = () => {
  return (
    <Slider
      speed={1000}
      slidesToShow={1}
      slidesToScroll={1}
      infinite={true}
      dots={false}
      autoplay={true}
      autoplaySpeed={5000}
    >
      {photos.map(photo => (
        <CarouselItem
          key={photo.key}
          src={photo.src}
          title={photo.title}
          alt={photo.alt}
        >
          Event Description 1
        </CarouselItem>
      ))}
    </Slider>
  );
};

export default Carousel;
