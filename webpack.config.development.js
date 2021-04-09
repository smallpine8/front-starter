const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');

const outputPath = path.resolve(__dirname, './_public');

module.exports =  merge(common, {
  mode: 'development',
  output: {
    ...common.output,
    path: outputPath,
  },
});