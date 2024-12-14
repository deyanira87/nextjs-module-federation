import { NextFederationPlugin } from '@module-federation/nextjs-mf';
import { Configuration } from 'webpack';

const remotes = (isServer: boolean) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    products: `products@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
    checkout: `checkout@http://localhost:3003/_next/static/${location}/remoteEntry.js`,
    shop: `shop@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
  };
};

const nextConfig = {
  webpack: (config: Configuration, options: { isServer: boolean }) => {
    config.plugins!.push(
      new NextFederationPlugin({
        name: 'shell',
        filename: 'static/chunks/remoteEntry.js',
        remotes: remotes(options.isServer),
        shared: {},
        extraOptions: {
        },
      })
    );

    return config;
  },

};

export default nextConfig;
