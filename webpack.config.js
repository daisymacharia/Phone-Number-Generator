const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

let babelOptions = JSON.parse(fs.readFileSync('./.babelrc'))

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname),
  entry: path.resolve(__dirname, './src/index.js'),

  devtool: 'inline-source-map',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },

  // webpack-dev-server config, see: https://webpack.github.io/docs/webpack-dev-server.html
  devServer: {
    contentBase: './',
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: [{ loader: 'babel-loader', options: babelOptions }],
        exclude: /node_modules/,
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      // use 'development' unless process.env.NODE_ENV is defined
      NODE_ENV: 'development',
    }),
  ],
}
