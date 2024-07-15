"use client";

import { getImages } from "../getImages";
import MyCarousel from "./myCarousel";

export default function Page() {
  const imagePaths = getImages();
  return (
    <>
      <div className="h-[80vh]">
        <MyCarousel images={imagePaths} />
      </div>
    </>
  );
}
