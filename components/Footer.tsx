import Link from "next/link";
import Magnetic from "./Magnetic";

function Footer() {
  return (
    <footer className="z-50 fixed bottom-10 left-10 h-fit justify-between cursor-pointer hidden lg:grid">
      <div className="">
        <Magnetic>
          <Link href="https://www.instagram.com/jfsvisual/" target="_blank">
            <svg
              className="m-5 fill-white hover:fill-jaune hover:transition hover:duration-200"
              width="23"
              height="23"
              viewBox="0 0 28 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 4C0 1.79083 1.79086 0 4 0H24C26.2091 0 28 1.79083 28 4V24C28 26.2092 26.2091 28 24 28H4C1.79086 28 0 26.2092 0 24V4ZM21.875 14C21.875 18.3492 18.3492 21.875 14 21.875C9.65076 21.875 6.125 18.3492 6.125 14C6.125 9.65076 9.65076 6.125 14 6.125C18.3492 6.125 21.875 9.65076 21.875 14ZM23.5 7C24.8807 7 26 5.88074 26 4.5C26 3.11926 24.8807 2 23.5 2C22.1193 2 21 3.11926 21 4.5C21 5.88074 22.1193 7 23.5 7Z"
              />
            </svg>
          </Link>
        </Magnetic>
      </div>
      <div>
        <Magnetic>
          <Link
            href="https://www.linkedin.com/company/jfs-visual/posts/?feedView=all&viewAsMember=true"
            target="_blank"
          >
            <svg
              className="m-5 fill-white hover:fill-jaune hover:transition hover:duration-200"
              width="23"
              height="23"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.4 20V7.2H3.5125V20H0.4ZM1.9625 4.575C1.62083 4.575 1.30417 4.49167 1.0125 4.325C0.729167 4.15 0.5 3.92083 0.325 3.6375C0.158333 3.34583 0.0750001 3.025 0.0750001 2.675C0.0750001 2.33333 0.158333 2.02083 0.325 1.7375C0.5 1.45417 0.729167 1.22917 1.0125 1.0625C1.30417 0.887499 1.62083 0.8 1.9625 0.8C2.3125 0.8 2.625 0.887499 2.9 1.0625C3.18333 1.22917 3.40833 1.45417 3.575 1.7375C3.75 2.02083 3.8375 2.33333 3.8375 2.675C3.8375 3.025 3.75 3.34583 3.575 3.6375C3.40833 3.92083 3.18333 4.15 2.9 4.325C2.625 4.49167 2.3125 4.575 1.9625 4.575ZM7.34707 20V7.2H10.4596V8.7375C10.9012 8.17083 11.4887 7.70833 12.2221 7.35C12.9637 6.98333 13.8096 6.8 14.7596 6.8C15.7429 6.8 16.6012 7.0125 17.3346 7.4375C18.0762 7.85417 18.6512 8.44583 19.0596 9.2125C19.4679 9.97917 19.6721 10.8875 19.6721 11.9375V20H16.5596V12.5875C16.5596 11.5208 16.2929 10.7 15.7596 10.125C15.2346 9.54167 14.5054 9.25 13.5721 9.25C12.9304 9.25 12.3762 9.38333 11.9096 9.65C11.4429 9.90833 11.0846 10.2583 10.8346 10.7C10.5846 11.1333 10.4596 11.6167 10.4596 12.15V20H7.34707Z" />
            </svg>
          </Link>
        </Magnetic>
      </div>
      <div>
        <Magnetic>
          <Link
            target="_blank"
            href="https://www.tiktok.com/@jfs_visual?is_from_webapp=1&sender_device=pc"
          >
            <svg
              className="m-5 fill-white hover:fill-jaune hover:transition hover:duration-200"
              width="22"
              height="27"
              viewBox="0 0 19 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.4118 0H9.5V18C9.5 18.5455 8.38235 19.6364 7.26471 19.6364C6.14706 19.6364 4.47059 19.0909 4.47059 16.9091C4.47059 14.7273 5.77451 14.5455 6.70588 14.1818V10.3636C2.79412 10.3636 0 13.0909 0 16.9091C0 19.0909 1.67647 24 7.26471 24C12.8529 24 13.9706 19.6364 13.9706 18V9.27273C14.5294 10.9091 16.7647 11.4545 19 11.4545V7.09091C16.2059 7.09091 13.4118 3.27273 13.4118 0Z" />
            </svg>
          </Link>
        </Magnetic>
      </div>
      <div>
        <Magnetic>
          <Link target="_blank" href="https://www.youtube.com/@jfsvisual8964">
            <svg
              className="m-5 fill-white hover:fill-jaune hover:transition hover:duration-200"
              width="16"
              height="19"
              viewBox="0 0 13 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 6.26795C13.3333 7.03775 13.3333 8.96225 12 9.73205L3 14.9282C1.66667 15.698 -7.31543e-07 14.7358 -6.64245e-07 13.1962L-2.09983e-07 2.80385C-1.42685e-07 1.26425 1.66667 0.301995 3 1.0718L12 6.26795Z" />
            </svg>
          </Link>
        </Magnetic>
      </div>
    </footer>
  );
}

export default Footer;
