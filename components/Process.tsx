const differentiators = [
  {
    title: "Suivi collaboratif",
    description:
      "Un espace Notion partagé avec vous pour planifier le contenu et les scripts — vous savez toujours où en est votre production, sans avoir à demander.",
  },
  {
    title: "Réactivité terrain",
    description:
      "Vos idées et celles de vos équipes remontent directement via WhatsApp — un vol drone sur un bien, une envie de contenu — sans attendre le prochain rendez-vous.",
  },
  {
    title: "Drone en toute légalité",
    description:
      "Notifications préfecture, autorisations de vol, démarches administratives : on s'occupe de tout. Vous n'avez rien à gérer, rien à risquer.",
  },
];

export const Process = () => {
  return (
    <section className="py-24 lg:py-40 bg-charcoal border-y border-white/5">
      <div className="max-w-xl mx-auto mb-16 lg:mb-20 text-center px-6">
        <div className="font-dmSans text-xs tracking-[0.25em] uppercase text-or mb-5">
          Pourquoi nous
        </div>
        <h2 className="font-unbounded font-bold text-3xl lg:text-5xl text-creme leading-tight mb-5">
          Ce qui nous différencie
        </h2>
        <p className="font-dmSans text-creme/70">
          Au-delà de la caméra, une méthode pensée pour que vous n&apos;ayez
          rien à gérer.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
        {differentiators.map((item, index) => (
          <div
            key={item.title}
            className="rounded-lg border border-white/10 bg-[rgba(20,18,14,0.7)] p-8"
          >
            <div className="font-unbounded font-bold text-sm text-or mb-5">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="font-unbounded font-bold text-xl text-creme mb-3">
              {item.title}
            </h3>
            <p className="font-dmSans text-sm text-creme/60 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
