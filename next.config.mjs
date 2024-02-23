/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.youtube.com'],
  },
  server: {
    port: 3001, // Change to the port you want
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/src/assets/sounds',
          name: 'static/media/[name].[hash].[ext]',
          emitFile: !isServer,
        },
      },
    });

    return config;
  },
};

export default nextConfig;
