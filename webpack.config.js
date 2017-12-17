const path = require('path');
const packageData = require('./package.json');
const externals = []
  .concat(Object.keys(packageData.dependencies))
  .concat(Object.keys(packageData.devDependencies));

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist', 'cjs'),
    libraryTarget: 'commonjs2',
    filename: 'react-converse.js',
  },
  module: {
    rules: [{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }],
  },
  resolve: {
    alias: {
      'react-converse': path.resolve(__dirname, 'src'),
    },
  },
  externals,
};
