const moduleResolverPlugin = [
  require.resolve('babel-plugin-module-resolver'),
  {
    alias: {
      '@ui': './src/ui',
      '@core': './src/core',
      '@util': './src/util',
      '@screens': './src/screens',
      '@components': './src/components',
      '@navigation': './src/navigation',
    },
  },
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [moduleResolverPlugin],
};
