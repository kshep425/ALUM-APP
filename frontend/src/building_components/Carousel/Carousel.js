import React from "react";
import Slider from "react-slick";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselItem from "./CarouselItem";
//import image from "../../images/carouselAnnouncements/"
import scholarshipFlyer from "../../images/carouselAnnouncements/scholarshipFlyer.png"
import * as ROUTES from "../../constants/routes"
import eventFlyer from "../../images/carouselAnnouncements/eventsFlyer.png"
import aboutFlyer from "../../images/carouselAnnouncements/aboutFlyer.png"
const photos = [
  // {
  //   key: '2',
  //   alt: 'msu north garage',
  //   title: 'msu image',
  //   src: 'https://www.hfurrer.com/wp-content/uploads/2017/11/msu_north_garage_nite-2-web.jpg',
  //   description: 'msu north garage'
  // },
  // {
  //   key: '3',
  //   alt: 'msu image logo',
  //   title: 'msu image',
  //   src: 'https://pbs.twimg.com/profile_images/961705793191112704/y3QjIHWn_400x400.jpg',
  //   description: 'msu logo'
  // },
  // {
  //   key: '4',
  //   alt: 'Holmes Hall',
  //   title: 'msu image',
  //   src: 'https://news.morgan.edu/wp-content/uploads/news-SPrating-660x330.jpg',
  //   description: 'Holmes Hall'
  // },
  {
    key: '5',
    alt: 'Scholarship Announcements',
    title: 'scholarship announcement',
    src: scholarshipFlyer,
    description: 'Scholarship Announcement',
    route: ROUTES.SCHOLARSHIPS
  },
  {
    key: '6',
    alt: 'Event Announcements',
    title: 'Event announcement',
    src: eventFlyer,
    description: 'Event Announcement',
    route: ROUTES.EVENTS
  },
  {
    key: '7',
    alt: 'About Announcements',
    title: 'About announcement',
    src: aboutFlyer,
    description: 'About Announcement',
    route: ROUTES.ABOUT
  },

]

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
        {photos.map(photo =>
        <CarouselItem key={photo.key} src={photo.src} title={photo.title} alt={photo.alt} route={photo.route}>
          Event Description 1
        </CarouselItem>
        )}
      </Slider>
    </div>
  );
};

export default Carousel;
