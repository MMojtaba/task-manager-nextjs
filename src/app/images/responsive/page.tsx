"use client";

import { getImages } from "../getImages";
import MyCarousel from "./myCarousel";

export default function Page() {
  const imagePaths = getImages();
  return (
    <>
      <div>
        <MyCarousel images={imagePaths} />
      </div>
    </>
  );
}
