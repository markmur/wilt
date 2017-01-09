'use strict';

const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  target: 'web',

  devtool: 'cheap-module-eval-source-map',

  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    './src/main.jsx',
  ],

  output: {
    path: path.join(__dirname, '/public/dist/'),
    filename: 'bundle.js',
    pathInfo: true,
    publicPath: 'http://localhost:3000/dist/',
    hot: true,
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
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __ENV__: NODE_ENV,
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
        test: /\.(js|jsx)?$/, // react files
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?' + JSON.stringify({
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'stage-0', 'react']
        })],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /.(jpg|png|jpeg)$/,
        loader: 'file?name=[path][name].[hash].[ext]'
      }
    ],

    noParse: /\.min\.js/,
  },
};
