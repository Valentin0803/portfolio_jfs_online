import Link from "next/link";

export const Contact = () => {
  return (
    <section
      id="Contact"
      className="font-leagueSpartan grid grid-cols-1 lg:grid-cols-3 gap-4 place-content-center bg-[#918C79] h-fit px-5 py-5 lg:px-36 lg:py-auto"
    >
      <div className="flex flex-col justify-center content-center">
        <h2 className="font-akira">Nous contacter</h2>
        <span className="text-xl">
          Vous souhaitez en savoir plus sur nos méthodes de travail et nos
          services ?
        </span>
      </div>
      <div className="flex flex-col mx-auto lg:content-center lg:justify-between">
        <Link href="/contact">
          <button className="flex gap-4 px-12 py-4 rounded-full bg-jaune font-bold border-jaune border text-black tracking-widest uppercase transform hover:scale-105 hover:bg-[#918C79] hover:border-jaune hover:text-white transition-colors duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            Envoie un mail
          </button>
        </Link>
      </div>
      <div className="flex flex-col mx-auto lg:content-center lg:justify-between">
        <Link href="https://zcal.co/martin-ribot/30min" target="_blank">
          <button className="flex gap-4 px-12 py-4 rounded-full bg-jaune font-bold border-jaune border text-black tracking-widest uppercase transform hover:scale-105 hover:bg-[#918C79] hover:border-jaune hover:text-white transition-colors duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
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
