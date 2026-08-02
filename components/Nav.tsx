"use client";
import Link from "next/link";

function Nav() {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => {
    e.preventDefault();
    document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header className="nav flex fixed items-start z-30">
      <div className="logo ml-5 mt-10 lg:mt-10 lg:ml-10">
        <Link
          href="/"
          className="font-unbounded font-extrabold text-lg lg:text-xl tracking-wide text-creme duration-300 hover:text-or"
        >
          JFS VISUAL
        </Link>
      </div>
      <div className="">
        <ul className="font-dmSans flex flex-col fixed  text-sm lg:right-10 md:right-10 right-5 top-5 mt-5">
          <li>
            <a
              href="#APropos"
              onClick={(e) => handleScroll(e, "#APropos")}
              className="hover:text-or duration-300"
            >
              À PROPOS
            </a>
          </li>
          <li>
            <a
              href="#Offres"
              onClick={(e) => handleScroll(e, "#Offres")}
              className="hover:text-or duration-300"
            >
              OFFRES
            </a>
          </li>
          <li>
            <a
              href="#NotreTravail"
              onClick={(e) => handleScroll(e, "#NotreTravail")}
              className="hover:text-or duration-300"
            >
              NOTRE TRAVAIL
            </a>
          </li>
          <li>
            <a
              href="#NosServices"
              onClick={(e) => handleScroll(e, "#NosServices")}
              className="hover:text-or duration-300"
            >
              NOS SERVICES
            </a>
          </li>

          <li>
            <a
              href="#Contact"
              onClick={(e) => handleScroll(e, "#Contact")}
              className="hover:text-or duration-300"
            >
              CONTACT
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Nav;
