// Older one
"use client";

import { getImages } from "../getImages";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";

export default function Page() {
  const imagePaths = getImages();

  useEffect(() => {
    console.log("in useffect");
    const element = document.getElementById("slick-c");
    if (element) {
      console.log("got element");
      // $(element).slick();
    } else {
      console.log("no element");
    }
  }, []);

  return (
    <>
      <div id="slick-c" data-slick='{"slidesToShow": 4, "slidesToScroll": 4}'>
        {imagePaths.map((image, index) => {
          return (
            <div key={index}>
              <img src={image} />
            </div>
          );
        })}
      </div>
    </>
  );
}
