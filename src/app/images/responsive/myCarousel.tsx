"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

interface Props {
  images: string[];
  single?: boolean;
}

export default function MyCarousel({ images, single = false }: Props) {
  return (
    <Carousel
      className=""
      autoPlay={false}
      centerMode={!single}
      centerSlidePercentage={80}
      axis="horizontal"
      showStatus={true}
      showIndicators={true}
      showThumbs={single}
      swipeable={false}
      width={"100%"}
      infiniteLoop={true}
    >
      {images.map((image, index) => {
        return (
          //   <div key={index} className="tmpDiv2">
          <img
            key={index}
            src={image}
            className={single ? "object-contain" : "object-cover"}
          />
          //   </div>
        );
      })}
    </Carousel>
  );
}
