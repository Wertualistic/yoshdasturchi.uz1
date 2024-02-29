/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@ant-design",
    "@rc-component",
    "antd",
    "rc-cascader",
    "rc-checkbox",
    "rc-collapse",
    "rc-dialog",
    "rc-drawer",
    "rc-dropdown",
    "rc-field-form",
    "rc-image",
    "rc-input",
    "rc-input-number",
    "rc-mentions",
    "rc-menu",
    "rc-motion",
    "rc-notification",
    "rc-pagination",
    "rc-picker",
    "rc-progress",
    "rc-rate",
    "rc-resize-observer",
    "rc-segmented",
    "rc-select",
    "rc-slider",
    "rc-steps",
    "rc-switch",
    "rc-table",
    "rc-tabs",
    "rc-textarea",
    "rc-tooltip",
    "rc-tree",
    "rc-tree-select",
    "rc-upload",
    "rc-util",
  ],
  images: {
    domains: ['img.youtube.com'],
  },

  // TOD
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.stats = {
        all: false,
        builtAt: true,
        errors: true,
        warnings: true,
        timings: true,
      };
    }
    config.module.rules.push({
      test: /\.mp3$/,
      loader: 'file-loader',
      options: {
        publicPath: '/_next/',
        outputPath: 'static/media/',
        name: '[name].[hash].[ext]',
        emitFile: !isServer,
      },
    });
    return config;
  },
};

export default nextConfig;
