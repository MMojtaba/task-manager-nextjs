"use client";

export default function MyCarousel({ images }: { images: string[] }) {
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
