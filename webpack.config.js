const path = require('path');

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, 'src', 'front_end', 'main', 'index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'src', 'front_end', 'assets', 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src', 'front_end')
        ],
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'src', 'front_end'),
    compress: true
  }
};