"use client";

import { getImages } from "../getImages";
import MyCarousel from "./myCarousel";

export default function Page() {
  const imagePaths = getImages();
  return (
    <>
      <div className="h-full">
        <MyCarousel images={imagePaths} />
      </div>
    </>
  );
}
