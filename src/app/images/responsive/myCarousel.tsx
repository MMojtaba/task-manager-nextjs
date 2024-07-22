"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";

interface Props {
  images: string[];
  single?: boolean;
}

export default function MyCarousel({ images, single = false }: Props) {
  const [openedImage, setOpenedImage] = useState<number>(0);

  function handleImageClick(index: number) {
    console.log("got clicked", index);
    setOpenedImage(index);
    document.getElementById("image_view_modal").showModal();
  }
  return (
    <>
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
            <div
              key={index}
              className=""
              onClick={() => handleImageClick(index)}
            >
              <img
                key={index}
                src={image}
                className={single ? "object-contain" : "object-cover"}
              />
            </div>
          );
        })}
      </Carousel>

      <dialog id="image_view_modal" className="modal">
        <div className="max-h-5xl modal-box h-full max-w-5xl">
          <img
            className="max-h-[80vh] w-full object-contain"
            src={images[openedImage]}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
