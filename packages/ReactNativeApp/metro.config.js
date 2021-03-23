/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const Resolver = require('metro-resolver');

module.exports = {
  projectRoot: path.resolve(__dirname, '../../'),
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    resolveRequest: (context, realModuleName, platform, moduleName) => {
      const mapped = new Map([
        ['./index', path.resolve(__dirname, 'index.js')],
        ['./App', path.resolve(__dirname, 'App.tsx')],
        ['./app.json', path.resolve(__dirname, 'app.json')],
      ]);
      // Resolve file path logic...
      let filePath = mapped.get(realModuleName);
      if (filePath) {
        return {
          filePath,
          type: 'sourceFile',
        };
      }
      const clearContext = {...context, resolveRequest: undefined};
      return Resolver.resolve(clearContext, moduleName, platform);
    },
  },
};
