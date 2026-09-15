/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Les anciens liens de réservation mènent aux moyens de contact.
      {
        source: "/rendez-vous",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
