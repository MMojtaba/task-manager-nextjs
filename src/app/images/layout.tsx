import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mb-2">
        <Link className="btn btn-primary mx-2" href="/images/responsive">
          Responsive
        </Link>

        <Link className="btn btn-primary mx-2" href="/images/responsive-detail">
          Responsive Detail
        </Link>
        {/* <Link className="btn btn-primary mx-2" href="/images/slickc">
        Slick Carousel
      </Link> */}
        <Link className="btn btn-primary mx-2" href="/images/reactslick">
          React Slick
        </Link>
      </div>
      {children}
    </>
  );
}
