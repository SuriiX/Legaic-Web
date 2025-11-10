

/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**', // Permite todas las imágenes de este dominio
      },
    ],
  },
};

export default nextConfig;