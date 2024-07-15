import { getImages } from "../getImages";
import MyCarousel from "../responsive/myCarousel";

export default function Page() {
  const images = getImages();

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="w-1/2">
          <MyCarousel images={images} single={true} />
        </div>
        <div className="w-1/2">
          <h1>First item</h1>
          <p>Very good item</p>
        </div>
      </div>
    </>
  );
}
