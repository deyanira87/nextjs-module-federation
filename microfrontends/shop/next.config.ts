import { NextFederationPlugin } from '@module-federation/nextjs-mf';
import { Configuration } from 'webpack';

const remotes = (isServer: boolean) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    products: `products@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
    checkout: `checkout@http://localhost:3003/_next/static/${location}/remoteEntry.js`,
  };
};

const nextConfig = {
  webpack: (config: Configuration, { isServer }: { isServer: boolean }) => {
    config.plugins!.push(
      new NextFederationPlugin({
        name: 'shop',
        filename: 'static/chunks/remoteEntry.js',
        dts: false,
        exposes: {
          './shop': './pages/shop',
        },
        remotes: remotes(isServer),
        shared: {},
        extraOptions: {
          exposePages: true,
        },
      })
    );

    return config;
  },
};

export default nextConfig;
