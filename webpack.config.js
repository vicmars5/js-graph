const path = require('path');

const config = {
  entry: './lib/graph.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'graph.js',
    library: 'jsGraph',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
};

module.exports = config;

