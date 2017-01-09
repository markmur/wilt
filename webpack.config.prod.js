'use strict';

const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV;
const SaveAssetsJson = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: '#source-map',

  // Capture timing information for each module
  profile: false,

  // Switch loaders to debug mode
  debug: false,

  // Report the first error as a hard error instead of tolerating it
  bail: true,

  entry: [
    'babel-polyfill',
    './src/main.jsx',
  ],

  output: {
    path: 'public/dist/',
    pathInfo: true,
    publicPath: '/dist/',
    filename: 'bundle.min.js', // bundle.[hash].min.js
  },

  resolve: {
    root: path.join(__dirname, ''),
    modulesDirectories: [
      'node_modules',
      'src',
      'src/images',
      'src/actions',
      'src/reducers',
      'src/components',
      'src/components/presentational',
      'src/components/container',
      'src/styles'
    ],
    extensions: ['', '.js', '.jsx'],
  },

  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },

  plugins: [
    new CleanWebpackPlugin(['public/dist'], {
      verbose: true,
      dry: false,
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    new SaveAssetsJson({
      path: process.cwd(),
      filename: 'assets.json',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.scss$/, // sass files
        loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded',
      },
      {
        test: /\.(ttf|eot|svg|woff)(\?[a-z0-9]+)?$/, // fonts files
        loader: 'file-loader?name=[path][name].[ext]',
      },
      {
        test: /.(jpg|png|jpeg)$/,
        loader: 'file?name=[path][name].[hash].[ext]'
      },
      {
        test: /\.(js|jsx)?$/, // react files
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?' + JSON.stringify({
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'stage-0', 'react']
        })],
        include: path.join(__dirname, 'src'),
      }
    ],

    noParse: /\.min\.js/,
  },
};
