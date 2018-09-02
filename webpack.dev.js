const webpack = require('webpack');
const buildPath = './build';
const path = require('path');
const PACKAGE = require('./package.json');
const PACKAGE_NAME = PACKAGE.name;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
  mode: 'development',
  entry: './src/App.js',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
              convertToAbsoluteUrls: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: PACKAGE_NAME + '.js',
    publicPath: '/'
  },
  stats: {
    colors: true,
    performance: true
  },
  devtool: 'source-map',
  devServer: {
    port: 3000,
    host: 'localhost',
    publicPath: '/',
    historyApiFallback: true,
    open: true,
    openPage: ''
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/template.html',
      inject: 'body',
      hash: true,
      cache: true,
      showErrors: true
    })
  ]
};

module.exports = config;
