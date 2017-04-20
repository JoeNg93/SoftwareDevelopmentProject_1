const path = require('path');

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
  devServer: {
    contentBase: path.resolve(__dirname, 'src', 'front_end'),
    compress: true
  }
};