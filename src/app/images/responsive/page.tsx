"use client";

import { getImages } from "../getImages";
import MyCarousel from "./myCarousel";

export default function Page() {
  const imagePaths = getImages();
  return (
    <>
      <MyCarousel images={imagePaths} />
    </>
  );
}
