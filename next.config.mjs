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
                destination: '/satelite/CP',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
