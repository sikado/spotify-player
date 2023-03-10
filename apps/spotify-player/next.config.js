// @ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('./with-nx.js');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 * */
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/image/*',
      },
    ],
  },
  transpilePackages: ['@spotify-player/feat-player', '@spotify-player/feat-display-playlist'],
  reactStrictMode: true,
};

module.exports = withNx(nextConfig);
