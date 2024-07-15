"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

interface Props {
  images: string[];
  single: boolean;
}

export default function MyCarousel({ images, single = false }: Props) {
  return (
    <div className="tmpDiv">
      <Carousel
        className="tmpC"
        autoPlay={false}
        centerMode={!single}
        centerSlidePercentage={40}
        axis="horizontal"
        showStatus={true}
        showIndicators={true}
        showThumbs={single}
        swipeable={false}
        width={"100%"}
      >
        {images.map((image, index) => {
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
