const isProd = process.env.NODE_ENV === 'production';
const assetPrefix = isProd ? '/ashwin-rajakannan.github.io/' : '/';

const nextConfig = {
  output: 'export',
  assetPrefix,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  }
};

export default nextConfig;