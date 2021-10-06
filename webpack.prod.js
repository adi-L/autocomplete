const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require('webpack');
module.exports = (env, argv) => {
  return merge(common(env, argv), {
    mode: 'production',
    plugins: [
      new webpack.DefinePlugin({ //<--key to reduce React's size
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
    ],
  })
};

