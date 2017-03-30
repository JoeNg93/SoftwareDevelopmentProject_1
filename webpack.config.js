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
        exclude: ['node_modules', 'src/back_end', 'src/test_layout'],
        loader: 'babel-loader'
      }
    ]
  }
};