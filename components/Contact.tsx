import Link from "next/link";

export const Contact = () => {
  return (
    <section
      id="Contact"
      className="font-dmSans text-center bg-charcoal border-t border-white/5 py-24 lg:py-40 px-6"
    >
      <h2 className="font-unbounded font-bold text-3xl lg:text-6xl text-creme max-w-[16ch] mx-auto mb-5 leading-tight">
        Vous souhaitez en savoir plus ?
      </h2>
      <p className="text-creme/65 max-w-[46ch] mx-auto mb-11">
        Nos méthodes de travail, nos services, ou juste discuter de votre
        projet.
      </p>
      <div className="flex flex-wrap gap-5 justify-center">
        <Link href="/contact">
          <button className="flex gap-3 items-center px-9 py-[18px] rounded-full bg-or font-bold text-xs tracking-[0.1em] uppercase border-or border text-charcoal transform hover:scale-105 hover:bg-charcoal hover:border-or hover:text-or transition-colors duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            Envoyez un mail
          </button>
        </Link>
        <Link href="https://zcal.co/martin-ribot/30min" target="_blank">
          <button className="flex gap-3 items-center px-9 py-[18px] rounded-full font-bold text-xs tracking-[0.1em] uppercase border border-or/40 text-creme hover:border-or hover:text-or transition-colors duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            Prenez rendez-vous
          </button>
        </Link>
      </div>
    </section>
  );
};
