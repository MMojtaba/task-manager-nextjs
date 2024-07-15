"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { getImages } from "../getImages";

export default function Page() {
  const imagePaths = getImages();
  return (
    <div className="tmpDiv">
      <Carousel
        className="tmpC"
        autoPlay={false}
        centerMode={true}
        centerSlidePercentage={40}
        axis="horizontal"
        showStatus={true}
        showIndicators={true}
        showThumbs={true}
        swipeable={false}
        width={"100%"}
      >
        {imagePaths.map((image, index) => {
          return (
            <div key={index} className="tmpDiv2">
              <img src={image} className="tmpI" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
