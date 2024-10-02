import Link from "next/link";

export const PiedPage = () => {
  return (
    <div className="font-leagueSpartan text-jaune flex flex-col gap-3 mx-5 my-10 lg:mx-36">
      <span>
        <Link
          className="hover:text-white hover:size-5/6 duration-150"
          href="/mentionsLegales"
        >
          Mentions Légales
        </Link>
      </span>
      <span>
        <Link
          className="hover:text-white hover:size-5/6 duration-150"
          href="/cgv"
        >
          Conditions de ventes générales
        </Link>
      </span>
      <span>
        <Link
          className="hover:text-white hover:size-5/6 duration-150"
          href="/politiqueDeConfidentialite"
        >
          Politique de confidentialité
        </Link>
      </span>
    </div>
  );
};
