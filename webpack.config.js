var path = require('path');
var webpack = require('webpack');

const PATHS = {
  images: './src/images'
};

module.exports = {
  devtool: '#source-map',

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/main.js'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    root: path.join(__dirname, 'src'),
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

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'autoprefixer?' + JSON.stringify({
          browsers: 'last 2 versions'
        }), 'sass?' + JSON.stringify({ outputStyle: 'expanded' })]
      },
      {
        test: /\.(ttf|eot|svg|woff)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=[path][name].[ext]',
      },
      {
        test: /.(jpg|png|jpeg)$/,
        loader: 'file?name=[path][name].[hash].[ext]'
      }
    ],

    noParse: /\.min\.js/
  }
};
