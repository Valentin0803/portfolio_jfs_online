export default function Contact() {
  return (
    <section className="">
      <div className="flex flex-col px-5 pt-32 lg:mx-36">
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="flex flex-col"
        >
          <input
            type="hidden"
            name="access_key"
            value="805924a7-d418-4dab-8b62-dc64d3227d9a"
          />
          <input
            type="hidden"
            name="redirect"
            value="https://web3forms.com/success"
          />
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Formulaire de contact
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="nom"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  NOM
                </label>
                <div className="mt-2">
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-jaune sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="prenom"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Prénom
                </label>
                <div className="mt-2">
                  <input
                    id="prenom"
                    name="prenom"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-jaune sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  E-mail <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-jaune sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="societe"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Société
                </label>
                <div className="mt-2">
                  <input
                    id="societe"
                    name="societe"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-jaune sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    pattern="^(\+33|0)[1-9](\d{2}){4}$"
                    placeholder="06 12 34 56 78"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-jaune sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    id="message"
                    name="message"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-jaune sm:text-sm sm:leading-6"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="px-12 py-4 rounded-full bg-jaune font-bold border-jaune border text-black tracking-widest uppercase transform hover:scale-105 hover:bg-gris hover:border-jaune hover:text-white transition-colors duration-500"
            >
              <div className="flex gap-2">
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
                Envoyer
              </div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
