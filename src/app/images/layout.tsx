import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link className="btn btn-primary mx-2" href="/images/responsive">
        React Responsive
      </Link>
      {/* <Link className="btn btn-primary mx-2" href="/images/slickc">
        Slick Carousel
      </Link> */}
      <Link className="btn btn-primary mx-2" href="/images/reactslick">
        React Slick
      </Link>
      {children}
    </>
  );
}
