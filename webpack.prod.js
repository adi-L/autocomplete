const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => {
  return merge(common(env, argv), {
    mode: 'production',
    plugins: [
      new webpack.optimize.AggressiveMergingPlugin(),
      new UglifyJsPlugin()
    ],
  })
};

