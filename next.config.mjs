/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
    },
    images: {
        domains: ['storage.googleapis.com'],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/previsao-de-chuva/1h/v1/mapa',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
