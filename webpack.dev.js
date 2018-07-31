const webpack = require('webpack');
const buildPath = './build';
const path = require('path');
const PACKAGE = require('./package.json');
const PACKAGE_NAME = PACKAGE.name;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  watch: true,
  entry: './src/Analyzer.js',
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: PACKAGE_NAME + '.js',
    publicPath: '/', //Where the js gets loaded from
    library: 'WebRTCAnalyzer',
    libraryTarget: 'window',
    libraryExport: 'default'
  },
  stats: {
    colors: true,
    performance: true
  },
  mode: 'development'
};

module.exports = config;
