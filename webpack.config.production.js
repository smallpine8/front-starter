const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');

const outputPath = path.resolve(__dirname, './_dist');

module.exports = merge(common, {
  mode: 'production',
  output: {
    ...common.output,
    path: outputPath,
  },
});