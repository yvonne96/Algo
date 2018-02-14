require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

// noinspection Annotator
module.exports = {
  devtool: 'eval',
  devServer: {
    env: process.env.NODE_ENV,
    hot: true,
    quiet: true,
    historyApiFallback: true,
    contentBase: './'
  },
  entry: {
    client: [
      'webpack-hot-middleware/client',
      './app/app.js'
    ],
  },
  output: {
    path: path.join(__dirname, 'client'),
    filename: '[name].bundle.js',
    publicPath: '/js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      env: process.env.NODE_ENV
    })
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
       },
      {
        test: /\.js$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        exclude: '/node_modules',
        include: path.join(__dirname, './app')
      },
      {
        test: /\.js$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        exclude: '/node_modules',
        include: path.join(__dirname, './adminApp')
      }
    ]
  }
};
