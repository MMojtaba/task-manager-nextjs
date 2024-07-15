"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getImages } from "../getImages";

export default function Page() {
  const images = getImages();
  console.log("got images in react slick");

  const settings = {
    dots: true,
    infinite: true,
    autoPlay: true,
    centerMode: true,
    autoPlaySpeed: 2000,
    speed: 500,
    // centerPadding: "10px",
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => {
        return (
          <div key={index}>
            <img src={image} />
          </div>
        );
      })}
    </Slider>
  );
}
