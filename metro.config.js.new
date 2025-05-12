// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// 1. Make sure we can resolve .web.js files properly
config.resolver.sourceExts = process.env.RN_SRC_EXT
  ? [...process.env.RN_SRC_EXT.split(',').concat(config.resolver.sourceExts), 'web.js', 'web.jsx', 'web.ts', 'web.tsx']
  : [...config.resolver.sourceExts, 'web.js', 'web.jsx', 'web.ts', 'web.tsx'];

// 2. Make sure web platform can find Platform in the right place
config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules || {}),
  // Map react-native to react-native-web for web platform
  'react-native': path.resolve(__dirname, 'node_modules/react-native-web')
};

// 3. Add alias for Platform resolution
config.resolver.alias = {
  ...(config.resolver.alias || {}),
  // Explicitly map the Platform module
  '../Utilities/Platform': path.resolve(__dirname, 'node_modules/react-native-web/dist/exports/Platform')
};

module.exports = config;
