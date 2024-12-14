import { NextFederationPlugin } from '@module-federation/nextjs-mf';
import { Configuration } from 'webpack';

const remotes = (isServer: boolean) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    shop: `shop@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
    checkout: `checkout@http://localhost:3003/_next/static/${location}/remoteEntry.js`,
  };
};

const nextConfig = {
  webpack: (config: Configuration, { isServer }: { isServer: boolean }) => {
    config.plugins!.push(
      new NextFederationPlugin({
        name: 'products',
        filename: 'static/chunks/remoteEntry.js',
        dts: false,
        exposes: {
          './products': './pages/index.tsx',
          './productDetail': './pages/[id].tsx',
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
