/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // L'ancienne page de réservation est fusionnée dans /contact, où le
      // paramètre rdv=1 ouvre le calendrier zcal en modale.
      {
        source: "/rendez-vous",
        destination: "/contact?rdv=1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
