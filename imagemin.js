const imagemin = require('imagemin-keep-folder');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const gifsicle = require('imagemin-gifsicle');
const svgo = require('imagemin-svgo');
const path = require('path');

const imagesSrc = path.resolve(__dirname, '_src/assets/images/**/*.{jpg,jpeg,png,svg,ico,gif}').replace(/\\/g, '/');
const devOutputPath = '_public/';
const prodOutputPath = '_dist/';
const isDev = process.env.NODE_ENV === 'development';

imagemin([imagesSrc], {
  plugins: [
    mozjpeg({
      quality: 80
    }),
    pngquant({
      quality: [.7, .8], speed: 1
    }),
    gifsicle(),
    svgo()
  ],
  replaceOutputDir: output => {
    const relativeOutputPathFromCWD = path.relative(process.cwd(), output);
    const outputPath = path.resolve(process.cwd(), relativeOutputPathFromCWD.replace(/_src\//, isDev ? devOutputPath : prodOutputPath ));
    return outputPath;
  }
});