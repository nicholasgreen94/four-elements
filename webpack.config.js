const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//> File paths
const SRC_DIR = path.resolve(__dirname + '/src')
const DIST_DIR = path.resolve(__dirname + '/dist')

let config = {
  entry: SRC_DIR + '/app/index.js',
  output: {
    path: DIST_DIR + '/app',
    filename: 'bundle.js',
    publicPath: '/app/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 9000
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /(node_modules)/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-2']
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
            'postcss-loader',
          ],
        }),
      },
      {
       test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
       test: /\.(woff|woff2|eot|ttf|svg)$/,
       use: [
         'file-loader'
       ]
     }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].bundle.css'),
    require('postcss-cssnext'),
    require('lost')
  ]
}

module.exports = config
