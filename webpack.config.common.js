const path = require('path');
const webpack = require('webpack');
const glob = require('glob');

const src = "_src";

const entries = glob
  .sync('js/**/{common,index}.ts', {
    cwd: src,
  })
  .map((key) => {
    const replaceKeyStr = key.replace(/.ts$/,'.js');
    return [replaceKeyStr, path.resolve(src, key)];
  });

const entryObj = Object.fromEntries(entries);

const config = {
  entry: entryObj,
  target: ['web', 'es5'],
  output: {
    filename: '[name]',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js', '.ts'
    ],
    alias: {
      '@Modules': path.resolve(__dirname, '../../_src/js/modules'),
    },
  },
};

module.exports = config;